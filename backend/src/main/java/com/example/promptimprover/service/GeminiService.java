package com.example.promptimprover.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;

@Service
public class GeminiService {

    @Value("${GEMINI_API_KEY}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate;

    public GeminiService() {
        this.restTemplate = new RestTemplate();
    }

    public void streamImprovePrompt(String originalPrompt, org.springframework.web.servlet.mvc.method.annotation.SseEmitter emitter) {
        String fullUrl = apiUrl + "?key=" + apiKey + "&alt=sse"; // Enable SSE from Gemini if supported, or just normal stream
        // Note: Google Gemini REST API 'streamGenerateContent' returns a stream of JSONs. 
        // We will simple use the standard generateContent and simulate streaming if genuine upstream streaming is complex without a library,
        // OR better, use the streamGenerateContent endpoint.
        // Let's use the standard `streamGenerateContent` endpoint which gives chunked JSON.
        
        String streamUrl = apiUrl.replace("generateContent", "streamGenerateContent") + "?key=" + apiKey;

        String systemInstruction = """
                You are 'PromptMaster Pro'. Refine this prompt using Sequential Thinking (Intent -> Skeleton -> Refine).
                Return ONLY the final Improved Prompt.
                
                INPUT: %s
                """.formatted(originalPrompt);

        // Build Request Body
        Map<String, String> part = Collections.singletonMap("text", systemInstruction);
        Map<String, List<Map<String, String>>> content = Collections.singletonMap("parts", Collections.singletonList(part));
        Map<String, List<Map<String, List<Map<String, String>>>>> requestBody = Collections.singletonMap("contents", Collections.singletonList(content));

        ObjectMapper mapper = new ObjectMapper();

        try {
            String jsonBody = mapper.writeValueAsString(requestBody);
            
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(java.net.URI.create(streamUrl))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                    .build();

            java.net.http.HttpClient client = java.net.http.HttpClient.newHttpClient();

            client.sendAsync(request, HttpResponse.BodyHandlers.ofInputStream())
                    .thenAccept(response -> {
                        try (java.io.InputStream stream = response.body();
                             java.io.BufferedReader reader = new java.io.BufferedReader(new java.io.InputStreamReader(stream))) {
                            
                            String line;
                            while ((line = reader.readLine()) != null) {
                                line = line.trim();
                                if (line.isEmpty()) continue;
                                // Gemini sends "data: { ... }" lines
                                if (line.startsWith("data: ")) {
                                     String dataJson = line.substring(6);
                                     if (dataJson.equals("[DONE]")) break; // Should not happen with Gemini REST usually, but good practice
                                     
                                     try {
                                         JsonNode node = mapper.readTree(dataJson);
                                         // Extract text from candidates[0].content.parts[0].text
                                         if (node.has("candidates")) {
                                             JsonNode candidates = node.get("candidates");
                                             if (candidates.isArray() && candidates.size() > 0) {
                                                 JsonNode contentNode = candidates.get(0).get("content");
                                                  if (contentNode != null && contentNode.has("parts")) {
                                                      JsonNode parts = contentNode.get("parts");
                                                      if (parts.isArray() && parts.size() > 0) {
                                                          String textChunk = parts.get(0).get("text").asText();
                                                          // Send chunk to client
                                                          emitter.send(textChunk);
                                                      }
                                                  }
                                             }
                                         }
                                     } catch (Exception e) {
                                         // Ignore parsing errors for intermediate lines
                                     }
                                }
                            }
                            emitter.complete();
                        } catch (Exception e) {
                            emitter.completeWithError(e);
                        }
                    })
                    .exceptionally(e -> {
                        emitter.completeWithError(e);
                        return null;
                    });

        } catch (Exception e) {
            emitter.completeWithError(e);
        }
    }
