package com.example.promptimprover.controller;

import com.example.promptimprover.model.PromptRequest;
import com.example.promptimprover.model.PromptResponse;
import com.example.promptimprover.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = { "http://localhost:5173", "https://eclectic-raindrop-5d73f3.netlify.app" }) // Allow requests
                                                                                                    // from only
                                                                                                    // frontend (React)
public class PromptController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/improve")
    public PromptResponse improvePrompt(@RequestBody PromptRequest request) {
        if (request.getText() == null || request.getText().trim().isEmpty()) {
            return new PromptResponse("Please enter a sentence to improve.");
        }

        String improved = geminiService.improvePrompt(request.getText());
        return new PromptResponse(improved);
    }
}
