import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Terms = () => {
    return (
        <div className="min-h-screen bg-luxuryDark relative overflow-hidden">
            <Header />
            <main className="container mx-auto px-4 py-24 relative z-10 text-gray-300">
                <div className="glass-panel p-8 max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-6">Terms of Service</h1>
                    <p className="mb-4">Welcome to PromptMaster AI. By using our website, you agree to these Terms of Service.</p>

                    <h2 className="text-xl font-semibold text-white mt-6 mb-3">1. Use of Service</h2>
                    <p className="mb-4">You agree to use our prompt improvement tool only for lawful purposes. You normally are allowed to use the generated prompts for personal or commercial use.</p>

                    <h2 className="text-xl font-semibold text-white mt-6 mb-3">2. Disclaimer</h2>
                    <p className="mb-4">The AI-generated content is provided "as is". We make no warranties regarding accuracy or suitability for any specific purpose.</p>

                    <h2 className="text-xl font-semibold text-white mt-6 mb-3">3. Changes</h2>
                    <p className="mb-4">We reserve the right to modify these terms at any time.</p>

                    <p className="mt-8 text-sm text-gray-500">Last Updated: January 12, 2026</p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Terms;
