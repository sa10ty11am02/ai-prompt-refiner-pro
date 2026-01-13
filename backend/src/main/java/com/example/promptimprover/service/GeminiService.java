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
        System.out.println("Starting Reliable Prompt Improvement...");
        if (apiKey == null || apiKey.isEmpty()) {
            System.err.println("CRITICAL: API KEY IS MISSING");
            try {
                emitter.send("Error: API Key is missing.");
                emitter.complete();
            } catch (Exception e) {
            }
            return;
        }

        // Use standard generateContent (NOT streamGenerateContent) for reliability
        // URL is already ...:generateContent in properties, so we use it directly.
        String targetUrl = apiUrl + "?key=" + apiKey;
        System.out.println("Using Reliable URL: " + apiUrl);

        String systemInstruction = """
                You are an expert Prompt Engineer. Your task is to take a simple user input and refine it into a detailed, high-quality prompt for Midjourney, ChatGPT, or Stable Diffusion. Be concise, use professional keywords, and structure the output clearly. Do not talk to the user, only output the refined prompt.

                INPUT: %s
                """
                .formatted(originalPrompt);

        // Build Request Body
        Map<String, String> part = Collections.singletonMap("text", systemInstruction);
        Map<String, List<Map<String, String>>> content = Collections.singletonMap("parts",
                Collections.singletonList(part));
        Map<String, List<Map<String, List<Map<String, String>>>>> requestBody = Collections.singletonMap("contents",
                Collections.singletonList(content));

        try {
            String jsonBody = mapper.writeValueAsString(requestBody);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(targetUrl))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                    .build();

            System.out.println("Sending Synchronous Request...");

            // Send Async but parse as full JSON object
            client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                    .thenAccept(response -> {
                        System.out.println("Response Status: " + response.statusCode());
                        if (response.statusCode() != 200) {
                            try {
                                emitter.send("Error from AI: " + response.statusCode() + " - " + response.body());
                                emitter.complete();
                            } catch (Exception e) {
                            }
                            return;
                        }

                        try {
                            // Parse FULL JSON response
                            JsonNode root = mapper.readTree(response.body());
                            // Navigate: candidates[0].content.parts[0].text
                            JsonNode candidates = root.path("candidates");
                            if (candidates.isArray() && candidates.size() > 0) {
                                JsonNode parts = candidates.get(0).path("content").path("parts");
                                if (parts.isArray() && parts.size() > 0) {
                                    String fullText = parts.get(0).path("text").asText();

                                    // Send to frontend (simulating a stream or just sending it)
                                    // We split by newlines to send "chunks" so frontend doesn't choke or to give a
                                    // slight delay feel
                                    String[] lines = fullText.split("\\n");
                                    for (String line : lines) {
                                        emitter.send(line + "\n");
                                        // Tiny delay to help tokenizer/buffer
                                        Thread.sleep(50);
                                    }
                                    emitter.complete();
                                    return;
                                }
                            }
                            emitter.send("Error: No text generated.");
                            emitter.complete();
                        } catch (Exception e) {
                            System.err.println("Parsing Error: " + e.getMessage());
                            try {
                                emitter.completeWithError(e);
                            } catch (Exception ex) {
                            }
                        }
                    })
                    .exceptionally(e -> {
                        System.err.println("Request Error: " + e.getMessage());
                        try {
                            emitter.completeWithError(e);
                        } catch (Exception ex) {
                        }
                        return null;
                    });

        } catch (Exception e) {
            try {
                emitter.completeWithError(e);
            } catch (Exception ex) {
            }
        }
    }
}
