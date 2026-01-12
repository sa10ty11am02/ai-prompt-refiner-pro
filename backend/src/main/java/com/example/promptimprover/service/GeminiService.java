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

        // SEQUENTIAL THINKING LOGIC (Viva Explanation):
        // 1. Intent Analysis: We first ask the model to explicitly identify WHAT the
        // user wants (Code, Essay, Data).
        // 2. Structural Skeleton: We force the model to draft a bullet-point outline
        // (The "Skeleton-of-Thought" framework).
        // 3. Iterative Refinement: The model uses the skeleton to fill in the details.
        // 4. Final Output: We extract ONLY the polished, high-fidelity prompt.

        String systemInstruction = """
                You are 'PromptMaster Pro', an advanced AI Prompt Engineer using Sequential Thinking.

                YOUR PROCESS:
                1. [Analyze Intent]: Identify the user's core goal, target audience, and constraint requirements.
                2. [Draft Skeleton]: Create a structural outline for the perfect prompt (Role, Context, Task, Constraints, Output Format).
                3. [Refine]: Convert the skeleton into a cohesive, high-performance prompt optimized for GPT-4/Gemini Ultra.

                INPUT:
                %s

                OUTPUT INSTRUCTION:
                Return ONLY the final Improved Prompt. Do not output the internal reasoning steps in the final response.
                """
                .formatted(originalPrompt);

        // Build the Request Body strictly following Gemini API structure
        // { "contents": [{ "parts": [{"text": "..."}] }] }
        Map<String, String> part = Collections.singletonMap("text", systemInstruction);
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
