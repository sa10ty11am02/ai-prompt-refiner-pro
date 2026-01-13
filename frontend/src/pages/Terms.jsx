import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Terms = () => {
    return (
        <div className="min-h-screen bg-luxuryDark relative overflow-hidden">
            <Header />
            <main className="container mx-auto px-4 py-24 text-gray-300">
                <div className="max-w-4xl mx-auto glass-panel p-8">
                    <h1 className="text-3xl font-bold text-white mb-6">Terms of Service</h1>
                    <p className="mb-4">Last Updated: January 13, 2026</p>

                    <h2 className="text-xl font-semibold text-white mt-6 mb-2">1. Acceptance of Terms</h2>
                    <p className="mb-4">
                        By accessing and using PromptMaster AI, you accept and agree to be bound by the terms and provision of this agreement.
                    </p>

                    <h2 className="text-xl font-semibold text-white mt-6 mb-2">2. Use License</h2>
                    <p className="mb-4">
                        Permission is granted to temporarily use this tool for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                    </p>

                    <h2 className="text-xl font-semibold text-white mt-6 mb-2">3. Disclaimer</h2>
                    <p className="mb-4">
                        The materials on PromptMaster AI's website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability.
                    </p>

                    <h2 className="text-xl font-semibold text-white mt-6 mb-2">4. Limitations</h2>
                    <p className="mb-4">
                        In no event shall PromptMaster AI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit) arising out of the use or inability to use the materials on our website.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Terms;
