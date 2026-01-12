import React, { useState } from 'react';

const ResultDisplay = ({ result }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!result) return null;

    return (
        <div className="w-full max-w-2xl mx-auto glass-panel p-6 mt-8 animate-[fadeIn_0.5s_ease-out]">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-violet-300">✨ Improved Prompt</h3>
                <button
                    onClick={handleCopy}
                    className="text-sm px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2"
                >
                    {copied ? (
                        <span className="text-green-400">✓ Copied</span>
                    ) : (
                        <span className="text-gray-300">Copy</span>
                    )}
                </button>
            </div>
            <div className="prose prose-invert max-w-none">
                <p className="whitespace-pre-wrap leading-relaxed text-gray-200">
                    {result}
                </p>
            </div>
        </div>
    );
};

export default ResultDisplay;
