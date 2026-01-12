package com.example.promptimprover.model;

public class PromptRequest {
    private String text;

    public PromptRequest() {
    }

    public PromptRequest(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
