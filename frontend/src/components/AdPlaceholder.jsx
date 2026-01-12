import React from 'react';

const AdPlaceholder = ({ label, size = "h-32" }) => {
    return (
        <div className={`w-full ${size} bg-black/20 border-2 border-dashed border-gray-700 rounded-xl flex flex-col justify-center items-center my-6 relative overflow-hidden group`}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
            <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">{label}</p>
            <p className="text-xs text-gray-600 mt-1">Google AdSense Space</p>
        </div>
    );
};

export default AdPlaceholder;
