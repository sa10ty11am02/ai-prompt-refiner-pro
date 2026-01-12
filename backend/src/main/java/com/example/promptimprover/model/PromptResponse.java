package com.example.promptimprover.model;

public class PromptResponse {
    private String improvedPrompt;

    public PromptResponse() {
    }

    public PromptResponse(String improvedPrompt) {
        this.improvedPrompt = improvedPrompt;
    }

    public String getImprovedPrompt() {
        return improvedPrompt;
    }

    public void setImprovedPrompt(String improvedPrompt) {
        this.improvedPrompt = improvedPrompt;
    }
}
