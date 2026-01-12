import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="w-full py-8 mt-12 border-t border-glassBorder bg-black/20">
            <div className="container mx-auto px-4 text-center">
                <p className="text-gray-400 mb-4">© 2024 PromptMaster AI. All rights reserved.</p>
                <div className="flex justify-center space-x-6 text-sm">
                    <Link to="/privacy" className="text-violet-400 hover:text-violet-300 transition-colors">Privacy Policy</Link>
                    <Link to="/terms" className="text-violet-400 hover:text-violet-300 transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
