package com.example.promptimprover.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.io.InputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URI;

@Service
public class GeminiService {

    @Value("${GEMINI_API_KEY}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final ObjectMapper mapper = new ObjectMapper();
    private final HttpClient client = HttpClient.newHttpClient();

    public void streamImprovePrompt(String originalPrompt, SseEmitter emitter) {
        System.out.println("Starting streamImprovePrompt...");
        if (apiKey == null || apiKey.isEmpty()) {
            System.err.println("CRITICAL: API KEY IS MISSING OR NULL");
            try {
                emitter.send("Error: API Key is missing on Server.");
                emitter.complete();
            } catch (Exception e) {
            }
            return;
        }
        System.out
                .println("API Key Present: " + (apiKey.length() > 5 ? "Yes (Length: " + apiKey.length() + ")" : "No"));

        String streamUrl = apiUrl.replace("generateContent", "streamGenerateContent") + "?key=" + apiKey;
        System.out.println("Target URL: " + apiUrl);

        String systemInstruction = """
                You are 'PromptMaster Pro'. Refine this prompt using Sequential Thinking (Intent -> Skeleton -> Refine).
                Return ONLY the final Improved Prompt.

                INPUT: %s
                """.formatted(originalPrompt);

        // Build Request Body
        Map<String, String> part = Collections.singletonMap("text", systemInstruction);
        Map<String, List<Map<String, String>>> content = Collections.singletonMap("parts",
                Collections.singletonList(part));
        Map<String, List<Map<String, List<Map<String, String>>>>> requestBody = Collections.singletonMap("contents",
                Collections.singletonList(content));

        try {
            String jsonBody = mapper.writeValueAsString(requestBody);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(streamUrl))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                    .build();

            System.out.println("Sending Request to Gemini...");
            client.sendAsync(request, HttpResponse.BodyHandlers.ofInputStream())
                    .thenAccept(response -> {
                        System.out.println("Received Response. Status: " + response.statusCode());
                        if (response.statusCode() != 200) {
                            try {
                                String errorBody = new String(response.body().readAllBytes());
                                System.err.println("Gemini Error: " + errorBody);
                                emitter.send("Error from AI: " + response.statusCode() + " - " + errorBody);
                                emitter.complete();
                            } catch (Exception e) {
                                emitter.completeWithError(e);
                            }
                            return;
                        }

                        try (InputStream stream = response.body();
                                BufferedReader reader = new BufferedReader(new InputStreamReader(stream))) {

                            String line;
                            while ((line = reader.readLine()) != null) {
                                line = line.trim();
                                if (line.isEmpty())
                                    continue;
                                // Gemini sends "data: { ... }" lines
                                if (line.startsWith("data: ")) {
                                    String dataJson = line.substring(6);
                                    if (dataJson.equals("[DONE]"))
                                        break;

                                    try {
                                        JsonNode node = mapper.readTree(dataJson);
                                        if (node.has("candidates")) {
                                            JsonNode candidates = node.get("candidates");
                                            if (candidates.isArray() && candidates.size() > 0) {
                                                JsonNode contentNode = candidates.get(0).get("content");
                                                if (contentNode != null && contentNode.has("parts")) {
                                                    JsonNode parts = contentNode.get("parts");
                                                    if (parts.isArray() && parts.size() > 0) {
                                                        String textChunk = parts.get(0).get("text").asText();
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
                            System.err.println("Stream Processing Error: " + e.getMessage());
                            emitter.completeWithError(e);
                        }
                    })
                    .exceptionally(e -> {
                        System.err.println("Async HTTP Error: " + e.getMessage());
                        emitter.completeWithError(e);
                        return null;
                    });

        } catch (Exception e) {
            System.err.println("Setup Error: " + e.getMessage());
            emitter.completeWithError(e);
        }
    }
}
