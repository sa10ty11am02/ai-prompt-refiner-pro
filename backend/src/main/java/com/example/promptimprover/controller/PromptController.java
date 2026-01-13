package com.example.promptimprover.controller;

import com.example.promptimprover.model.PromptRequest;
import com.example.promptimprover.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api")
@RequestMapping("/api")
public class PromptController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/improve")
    public SseEmitter improvePrompt(@RequestBody PromptRequest request) {
        // Create an emitter with a long timeout (e.g., 60 seconds)
        SseEmitter emitter = new SseEmitter(60_000L);

        if (request.getText() == null || request.getText().trim().isEmpty()) {
            try {
                emitter.send("Please enter a sentence to improve.");
                emitter.complete();
            } catch (Exception e) {
                emitter.completeWithError(e);
            }
            return emitter;
        }

        // Delegate to service to stream data
        geminiService.streamImprovePrompt(request.getText(), emitter);

        return emitter;
    }

    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }
}
