import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-luxuryDark relative overflow-hidden">
            <Header />
            <main className="container mx-auto px-4 py-24 relative z-10 text-gray-300">
                <div className="glass-panel p-8 max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
                    <p className="mb-4">At PromptMaster AI, the privacy of our visitors is of extreme importance to us.</p>

                    <h2 className="text-xl font-semibold text-white mt-6 mb-3">Log Files</h2>
                    <p className="mb-4">Like many other Web sites, PromptMaster AI makes use of log files. The information inside the log files includes internet protocol ( IP ) addresses, type of browser, Internet Service Provider ( ISP ), date/time stamp, referring/exit pages, and number of clicks to analyze trends, administer the site, track user’s movement around the site, and gather demographic information.</p>

                    <h2 className="text-xl font-semibold text-white mt-6 mb-3">Cookies and Web Beacons</h2>
                    <p className="mb-4">PromptMaster AI does use cookies to store information about visitors preferences, record user-specific information on which pages the user access or visit, customize Web page content based on visitors browser type or other information that the visitor sends via their browser.</p>

                    <h2 className="text-xl font-semibold text-white mt-6 mb-3">DoubleClick DART Cookie</h2>
                    <p className="mb-4">.:: Google, as a third party vendor, uses cookies to serve ads on PromptMaster AI.<br />
                        .:: Google's use of the DART cookie enables it to serve ads to users based on their visit to PromptMaster AI and other sites on the Internet.<br />
                        .:: Users may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy at the following URL - http://www.google.com/privacy_ads.html</p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
