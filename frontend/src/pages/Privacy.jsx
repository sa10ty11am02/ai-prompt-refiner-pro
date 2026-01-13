import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Privacy = () => {
    return (
        <div className="min-h-screen bg-luxuryDark relative overflow-hidden">
            <Header />
            <main className="container mx-auto px-4 py-24 text-gray-300">
                <div className="max-w-4xl mx-auto glass-panel p-8">
                    <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
                    <p className="mb-4">Last Updated: January 13, 2026</p>

                    <h2 className="text-xl font-semibold text-white mt-6 mb-2">1. Introduction</h2>
                    <p className="mb-4">
                        Welcome to PromptMaster AI ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share your personal information when you use our AI Prompt Improver tool.
                    </p>

                    <h2 className="text-xl font-semibold text-white mt-6 mb-2">2. Information We Collect</h2>
                    <ul className="list-disc ml-6 mb-4 space-y-2">
                        <li><strong>Input Data:</strong> The text prompts you enter into our tool are sent to our backend and third-party AI providers (Google Gemini) for processing.</li>
                        <li><strong>Usage Data:</strong> We may collect anonymous data about how you access and use the Service, including your device type, browser, and pages visited.</li>
                        <li><strong>Cookies:</strong> We use cookies to enhance your experience and deliver personalized content.</li>
                    </ul>

                    <h2 className="text-xl font-semibold text-white mt-6 mb-2">3. How We Use Your Information</h2>
                    <p className="mb-4">
                        We use the collected information to:
                        <ul className="list-disc ml-6 mt-2">
                            <li>Provide and maintain our Service.</li>
                            <li>Improve our AI models and user experience.</li>
                            <li>Monitor usage trends and prevent abuse.</li>
                        </ul>
                    </p>

                    <h2 className="text-xl font-semibold text-white mt-6 mb-2">4. Third-Party Services</h2>
                    <p className="mb-4">
                        We utilize Google Gemini API for prompt processing. Please review Google's Privacy Policy to understand how they handle data. We may also use Google AdSense to display advertisements. AdSense uses cookies to serve ads based on your prior visits to our website or other websites.
                    </p>

                    <h2 className="text-xl font-semibold text-white mt-6 mb-2">5. Contact Us</h2>
                    <p className="mb-4">
                        If you have any questions about this Privacy Policy, please contact us at support@promptmaster.ai.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Privacy;
