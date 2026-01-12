import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-luxuryDark relative text-gray-300">
            <Header />
            <main className="container mx-auto px-4 py-24 relative z-10 max-w-4xl">
                <div className="glass-panel p-8 md:p-12">
                    <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
                    <div className="space-y-6">
                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                            <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">2. Use License</h2>
                            <p>Permission is granted to temporarily download one copy of the materials (information or software) on PromptMaster AI's website for personal, non-commercial transitory viewing only.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">3. Disclaimer</h2>
                            <p>The materials on PromptMaster AI's website are provided "as is". PromptMaster AI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">4. Limitations</h2>
                            <p>In no event shall PromptMaster AI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on PromptMaster AI's website.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">5. Governing Law</h2>
                            <p>Any claim relating to PromptMaster AI's website shall be governed by the laws of your jurisdiction without regard to its conflict of law provisions.</p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TermsOfService;
