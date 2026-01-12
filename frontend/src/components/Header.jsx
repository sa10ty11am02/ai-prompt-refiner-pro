import React from 'react';

const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass-panel m-4 mt-2 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg animate-pulse"></div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-fuchsia-300">
                    PromptMaster AI
                </h1>
            </div>
            <div>
                {/* Placeholder for future user login or menu */}
            </div>
        </header>
    );
};

export default Header;
