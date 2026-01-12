package com.example.promptimprover;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PromptImproverApplication {

	public static void main(String[] args) {
		// Load .env file into System properties
		Dotenv dotenv = Dotenv.configure()
				.directory("../") // Look in root directory (since we are in backend/src...) Wait, local run runs
									// from backend folder usually.
				// If I put .env in C:\Users\shiva\OneDrive\Desktop\ai promt generator (ROOT),
				// and run from backend folder, it is one level up.
				// If I run from ROOT, it is in current dir.
				// Safer to ignore error if not found? No, security.
				.ignoreIfMissing()
				.load();

		dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));

		SpringApplication.run(PromptImproverApplication.class, args);
	}

}
