# 🧠 PromptMaster AI: The Enterprise Prompt Engineering Suite

![Version](https://img.shields.io/badge/version-v1.0.0--stable-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-production-active)

> **Unlock the full potential of Large Language Models.** Transform vague ideas into high-fidelity, actionable prompts using our proprietary **Sequential Thinking Engine**.

---

## 🚀 Why PromptMaster AI?

In the era of Generative AI, the quality of your output defines your competitive edge. PromptMaster AI isn't just a wrapper; it's a cognitive layer that sits between you and the LLM.

### 💎 The "Intellectual Edge" Architecture
We don't just "improve" text. We orchestrate a sophisticated reasoning process:
1.  **Intent Recognition**: Deep analysis of user goals (coding, creative, data).
2.  **Strategic Skeleton**: Drafting a high-level structural outline ("Skeleton-of-Thought").
3.  **Iterative Refinement**: Polishing the structure into a cohesive, multi-shot prompt.
4.  **Final Synthesis**: Delivering a prompt optimized for GPT-4, Claude 3.5, and Gemini Ultra.

---

## 🛠️ Technical Stack (v1.0.0)

### **Backend Core (Spring Boot 3.2)**
-   **Engine**: Java 17 + Spring Boot Web
-   **AI Integration**: **Google Gemini 2.0 Flash** (Optimized for speed/quality balance)
-   **Security**: `java-dotenv` integration for military-grade secret management.
-   **Architecture**: RESTful API with strict CORS and Rate Limiting.

### **Frontend Interface (React 18)**
-   **Design System**: Glassmorphism UI (Tailwind CSS v4).
-   **UX**: Mobile-First, Responsive, and Accessible.
-   **Routing**: React Router v6 with dedicated Legal Compliance pages.
-   **Monetization**: AdSense-ready architecture with non-intrusive placeholders.

---

## 📦 Installation & Deployment

### 1. Secure Setup
This project uses **Environment Variables** for security. Create a `.env` file in the root:
\`\`\`env
GEMINI_API_KEY=your_secure_api_key_here
\`\`\`

### 2. Launch the Brain (Backend)
\`\`\`bash
cd backend
./mvnw spring-boot:run
\`\`\`
*Server initializes on Port 8080.*

### 3. Launch the Interface (Frontend)
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`
*Access Dashboard: http://localhost:5173*

*Access Dashboard: http://localhost:5173*

## 🌩️ Backend Deployment (Render)
To connect your live Frontend to the Cloud, you must deploy the Backend.

1.  **Click to Deploy**:
    [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/sa10ty11am02/ai-prompt-refiner-pro)
    
2.  **Configuration**:
    *   **Root Directory**: `backend`
    *   **Environment Variables**: Add `GEMINI_API_KEY` (copy from your local .env).

3.  **Finalize**:
    *   Copy the **Render URL** (e.g., `https://my-app.onrender.com`).
    *   Go to **Netlify Site Settings** -> **Environment Variables**.
    *   Add `VITE_API_URL` = `YOUR_RENDER_URL`.

## ☁️ Cloud Deployment (Netlify)
**Recommended for AdSense Support.**
You can deploy the frontend directly to Netlify.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/sa10ty11am02/ai-prompt-refiner-pro&base=frontend)

### Netlify Setup Steps
1.  Click the button above.
2.  Connect your GitHub.
3.  **Base directory**: `frontend`
4.  **Build command**: `npm run build`
5.  **Publish directory**: `dist`
6.  **Environment Variables**: Add `VITE_API_URL` pointing to your Backend URL.


---

## ⚖️ Legal & Compliance
We are fully compliant with modern web standards.
-   **Privacy Policy**: Transparent data handling (Prompt data is stateless).
-   **Terms of Service**: Standard usage guidelines included.

---

## 🤝 Contributing
Join us in building the future of Prompt Engineering.
1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---
*© 2026 PromptMaster AI. Built with ❤️ and Sequential Thinking.*
