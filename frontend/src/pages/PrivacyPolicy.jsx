import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-luxuryDark relative text-gray-300">
            <Header />
            <main className="container mx-auto px-4 py-24 relative z-10 max-w-4xl">
                <div className="glass-panel p-8 md:p-12">
                    <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
                    <div className="space-y-6">
                        <p>Last Updated: {new Date().toLocaleDateString()}</p>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
                            <p>Welcome to PromptMaster AI. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your data when you visit our website.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">2. Data Collection</h2>
                            <p>We do not store your prompt history or personal details on our servers. The prompts you enter are processed purely for the purpose of enhancement via the Gemini API and are not retained by us.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">3. Third-Party Services</h2>
                            <p>We use Google AdSense to serve ads. Third parties, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">4. Cookies</h2>
                            <p>We use essential cookies to ensure the website functions properly. By using our site, you consent to our use of these cookies.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">5. Contact</h2>
                            <p>For any privacy-related queries, please contact us at privacy@promptmaster.ai.</p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
