import React, { useState } from 'react';

const PromptForm = ({ onSubmit, isLoading }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onSubmit(input);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-4">
            <div className="relative">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="e.g. Write a blog post about coffee..."
                    className="input-field h-32 resize-none text-lg"
                    disabled={isLoading}
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                    {input.length} chars
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className={`w-full luxury-button flex justify-center items-center ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
            >
                {isLoading ? (
                    <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Thinking (Intent → Skeleton → Refine)...
                    </span>
                ) : (
                    '✨ Improve My Prompt'
                )}
            </button>
        </form>
    );
};

export default PromptForm;
