# 🧠 AI Prompt Refiner Pro

> **Enterprise-Grade AI Prompt Engineering Tool** powered by Google Gemini 2.0 Flash.
> _Transform vague ideas into production-ready LLM instructions using Sequential Thinking Logic._

![Java](https://img.shields.io/badge/Backend-Spring%20Boot-green)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Tailwind-blue)
![Gemini](https://img.shields.io/badge/AI-Gemini%202.0%20Flash-purple)
![License](https://img.shields.io/badge/License-MIT-orange)

## 🚀 The Core: Sequential Thinking Engine
This application is not just a wrapper; it employs a **Sequential Thinking Architecture** to ensure high-fidelity prompt generation. Unlike simple passthrough tools, "Refiner Pro" processes user input through distinct cognitive stages:

1.  **Intent Recognition**: The system first analyzes the raw input to understand the *core objective* (e.g., Creative Writing, Coding, Data Analysis).
2.  **Persona Injection**: It wraps the intent in an "Expert Persona" context (e.g., "Imagine you are a Senior DevOps Engineer...").
3.  **Constraint Application**: It applies strict formatting rules (JSON, Code Blocks, No Yapping) to ensure the output is actionable.
4.  **Iterative Refinement**: Using **Gemini 2.0 Flash Light/Latest**, it generates a structured, multi-shot prompt optimized for GPT-4, Claude 3, and Llama 3.

## 🛠️ Technical Architecture

### **Backend (Spring Boot 3.2)**
-   **Engine**: Java 17
-   **Security**: Enviroment-based Secret Management (`.env` protected).
-   **API Integration**: Google Gemini V1 Beta (Flash Latest).
-   **Resilience**: Custom error handling and rate-limit protection.

### **Frontend (Modern React)**
-   **UX**: Glassmorphism design system for a premium feel.
-   **Performance**: Vite-powered build with instantaneous HMR.
-   **Styling**: Tailwind CSS v4 (PostCSS optimized).
-   **Monetization**: Integrated AdSense placeholders for revenue generation.

## 📦 Installation & Setup

### Prerequisites
-   Java 17+
-   Node.js 18+
-   Google Gemini API Key

### 1. Security Setup
Create a `.env` file in the root directory:
\`\`\`env
GEMINI_API_KEY=your_secret_key_here
\`\`\`

### 2. Start the "Brain" (Backend)
\`\`\`bash
cd backend
./mvnw spring-boot:run
\`\`\`
*Server starts on Port 8080.*

### 3. Start the Interface (Frontend)
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`
*Dashboard access: http://localhost:5173*

## 🛡️ Security Note
This repository follows **DevSecOps best practices**. API keys are never hardcoded. 
-   Sensitive data is loaded via `java-dotenv`.
-   `.env` and `target/` directories are strictly git-ignored.

---
*Built by [Your Name] - 2026*
