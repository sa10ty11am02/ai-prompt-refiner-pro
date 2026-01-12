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

    public String improvePrompt(String originalPrompt) {
        String fullUrl = apiUrl + "?key=" + apiKey;

        // Construct the prompt for Gemini
        String systemInstruction = "You are an expert AI Prompt Engineer. Your task is to take a simple user input and transform it into a highly professional, detailed, and effective AI prompt. Return ONLY the improved prompt, no other text.";
        String finalPrompt = systemInstruction + "\n\nUser Input: " + originalPrompt + "\n\nImproved Prompt:";

        // Build the Request Body strictly following Gemini API structure
        // { "contents": [{ "parts": [{"text": "..."}] }] }
        Map<String, String> part = Collections.singletonMap("text", finalPrompt);
        Map<String, List<Map<String, String>>> content = Collections.singletonMap("parts",
                Collections.singletonList(part));
        Map<String, List<Map<String, List<Map<String, String>>>>> requestBody = Collections.singletonMap("contents",
                Collections.singletonList(content));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, List<Map<String, List<Map<String, String>>>>>> entity = new HttpEntity<>(requestBody,
                headers);

        try {
            java.net.URI uri = java.net.URI.create(fullUrl);
            ResponseEntity<Map> response = restTemplate.postForEntity(uri, entity, Map.class);
            return extractTextFromResponse(response.getBody());
        } catch (org.springframework.web.client.HttpClientErrorException e) {
            e.printStackTrace();
            return "Error: " + e.getResponseBodyAsString();
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }

    private String extractTextFromResponse(Map responseBody) {
        // Parsing the deeply nested JSON response from Gemini
        // { "candidates": [ { "content": { "parts": [ { "text": "..." } ] } } ] }
        try {
            if (responseBody == null || !responseBody.containsKey("candidates"))
                return "Error: No response from AI.";

            List candidates = (List) responseBody.get("candidates");
            if (candidates.isEmpty())
                return "Error: No candidates returned.";

            Map candidate = (Map) candidates.get(0);
            Map content = (Map) candidate.get("content");
            List parts = (List) content.get("parts");
            Map part = (Map) parts.get(0);

            return (String) part.get("text");
        } catch (Exception e) {
            return "Error parsing AI response.";
        }
    }
}
