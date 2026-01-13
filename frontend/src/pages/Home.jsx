

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PromptForm from '../components/PromptForm';
import ResultDisplay from '../components/ResultDisplay';
import AdPlaceholder from '../components/AdPlaceholder';

const Home = () => {
    const [originalPrompt, setOriginalPrompt] = useState("");
    const [improvedPrompt, setImprovedPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);

    // Usage Limit Logic
    const checkUsage = () => {
        const today = new Date().toDateString();
        const storedDate = localStorage.getItem('usage_date');
        let count = parseInt(localStorage.getItem('usage_count') || '0');

        if (storedDate !== today) {
            // New day, reset count
            count = 0;
            localStorage.setItem('usage_date', today);
            localStorage.setItem('usage_count', '0');
        }

        if (count >= 5) {
            setIsLimitModalOpen(true);
            return false;
        }

        // Increment usage
        localStorage.setItem('usage_count', (count + 1).toString());
        return true;
    };

    const handleImprovePrompt = async () => {
        if (!originalPrompt.trim()) return;

        // Check Limit FIRST
        if (!checkUsage()) return;

        setIsLoading(true);
        setImprovedPrompt(""); // Clear previous result
        try {
            // Call Backend
            // Call Backend - Hardcoded for reliability
            const apiUrl = 'https://ai-prompt-refiner-pro.onrender.com';

            const response = await fetch(`${apiUrl}/api/improve`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            if (!response.body) {
                throw new Error("ReadableStream not supported by browser.");
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let done = false;
            let buffer = '';

            while (!done) {
                const { value, done: readerDone } = await reader.read();
                done = readerDone;
                if (value) {
                    const chunk = decoder.decode(value, { stream: true });
                    buffer += chunk;

                    const lines = buffer.split('\n');
                    // The last element might be an incomplete line
                    buffer = lines.pop() || '';

                    for (const line of lines) {
                        if (line.trim().startsWith('data:')) {
                            const data = line.replace(/^data:/, '');
                            setResult((prev) => prev + data);
                        }
                    }
                }
            }
            // Process any remaining buffer
            if (buffer && buffer.trim().startsWith('data:')) {
                const data = buffer.replace(/^data:/, '');
                setResult((prev) => prev + data);
            }
        } catch (error) {
            console.error("Error:", error);
            // Don't alert if we have partial result
            if (!result) alert("Server is updating, please wait.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-luxuryDark relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[128px] pointer-events-none"></div>

            <Header />

            <main className="container mx-auto px-4 py-24 relative z-10 flex flex-col items-center">
                {/* Hero Section */}
                <div className="text-center mb-10 w-full max-w-2xl">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Transform Your Ideas into <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Masterpieces</span>
                    </h2>
                    <p className="text-lg text-gray-400">
                        Use our AI-powered prompt improver to get the best results from ChatGPT, Midjourney, and Gemini.
                    </p>
                </div>

                <AdPlaceholder label="Top Ad" size="h-24" />

                <PromptForm onSubmit={handleImprovePrompt} isLoading={isLoading} />
                <ResultDisplay result={result} />

                <AdPlaceholder label="Middle Ad" />

                {/* SEO Content Section */}
                <div className="w-full max-w-4xl mt-16 text-gray-300">
                    <div className="glass-panel p-8">
                        <h3 className="text-2xl font-bold text-white mb-6">Why You Need Professional Prompt Engineering</h3>
                        <div className="prose prose-invert max-w-none space-y-4">
                            <p>
                                In the rapidly evolving world of artificial intelligence, the quality of your output is directly dependent on the quality of your input. This is where <strong>Prompt Engineering</strong> comes into play. It is the art and science of crafting precise, effective instructions for AI models.
                            </p>
                            <h4 className="text-xl font-semibold text-white">The Power of Context</h4>
                            <p>
                                A simple request like "write a story" produces generic results. However, adding context—style, tone, length, and constraints—can transform that potential output into a bestseller-worthy narrative. Our tool analyzes your intent and injects the necessary context automatically.
                            </p>
                            <h4 className="text-xl font-semibold text-white">Optimizing for Different Models</h4>
                            <p>
                                Whether you are using GPT-4, Gemini, or Claude, each model has its own nuances. Our AI fine-tunes your prompt to ensure maximum compatibility and comprehension by the underlying model, saving you hours of trial and error.
                            </p>
                            <h4 className="text-xl font-semibold text-white">Conclusion</h4>
                            <p>
                                Don't settle for average AI responses. Use <strong>PromptMaster AI</strong> to unlock the full potential of large language models today. It's free, fast, and constantly learning.
                            </p>
                        </div>
                    </div>
                </div>

                <AdPlaceholder label="Bottom Ad" />
            </main>

            <Footer />
            <LimitModal isOpen={isLimitModalOpen} onClose={() => setIsLimitModalOpen(false)} />
        </div>
    );
};

// Limit Modal Component
const LimitModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(5px)'
        }}>
            <div style={{
                background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                padding: '2rem',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                maxWidth: '90%',
                width: '400px',
                textAlign: 'center',
                color: 'white'
            }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', background: 'linear-gradient(to right, #60a5fa, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Daily Limit Reached
                </h2>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: '1.6' }}>
                    You've used your <strong>5 free AI refinements</strong> for today! AdSense keeps us free for everyone.
                    <br /><br />
                    See you tomorrow for more creative magic! ✨
                </p>
                <button
                    onClick={onClose}
                    style={{
                        background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                        color: 'white',
                        padding: '0.75rem 2rem',
                        borderRadius: '9999px',
                        border: 'none',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'opacity 0.2s'
                    }}
                >
                    Got it!
                </button>
            </div>
        </div>
    );
};

export default Home;
