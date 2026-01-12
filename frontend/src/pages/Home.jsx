import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PromptForm from '../components/PromptForm';
import ResultDisplay from '../components/ResultDisplay';
import AdPlaceholder from '../components/AdPlaceholder';

const Home = () => {
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleImprovePrompt = async (text) => {
        setIsLoading(true);
        setResult(''); // Clear previous result
        try {
            // Call Backend (Use Env Var or Default to Localhost)
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
            const response = await fetch(`${apiUrl}/api/improve`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });
            const data = await response.json();
            setResult(data.improvedPrompt);
        } catch (error) {
            console.error("Error:", error);
            alert("Server is updating, please wait.");
            setResult(""); // Clear result on error
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
        </div>
    );
};

export default Home;
