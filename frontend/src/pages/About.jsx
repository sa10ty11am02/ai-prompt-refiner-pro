import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
    return (
        <div className="min-h-screen bg-luxuryDark relative overflow-hidden">
            <Header />
            <main className="container mx-auto px-4 py-24 text-gray-300">
                <div className="max-w-4xl mx-auto glass-panel p-8">
                    <h1 className="text-3xl font-bold text-white mb-6">About PromptMaster AI</h1>

                    <div className="prose prose-invert max-w-none">
                        <p className="text-lg mb-6 leading-relaxed">
                            PromptMaster AI is a state-of-the-art tool designed to bridge the gap between human intent and artificial intelligence. We believe that the key to unlocking the full potential of Large Language Models (LLMs) lies in the art of <strong>Prompt Engineering</strong>.
                        </p>

                        <h2 className="text-2xl font-bold text-white mb-4">Our Technology</h2>
                        <p className="mb-4">
                            Powered by Google's Gemini 1.5 Flash model, our "Human-like AI Prompting" engine uses a proprietary <strong>Sequential Thinking</strong> process:
                        </p>
                        <ul className="list-disc ml-6 mb-6 space-y-2">
                            <li><strong>Intent Analysis:</strong> We decode the underlying goal of your request.</li>
                            <li><strong>Skeleton Creation:</strong> We structure the prompt logically before filling in details.</li>
                            <li><strong>Refinement:</strong> We polish the language to ensure high-fidelity outputs from GPT-4, Claude, and Gemini.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
                        <p>
                            To empower creators, developers, and writers by eliminating the frustration of "trial and error" with AI. We want to make professional-grade prompt engineering accessible to everyone, for free.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default About;
