
import React, { useState } from 'react';
import { SparklesIcon } from './icons.tsx';

interface AmbitionInputProps {
    onSetAmbition: (ambition: string) => void;
}

const AmbitionInput: React.FC<AmbitionInputProps> = ({ onSetAmbition }) => {
    const [ambition, setAmbition] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (ambition.trim()) {
            onSetAmbition(ambition.trim());
        }
    };

    return (
        <div className="text-center p-8 bg-white dark:bg-dark-card rounded-xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">What is your ambition?</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Let's turn your ambition into achievable steps.</p>
            <form onSubmit={handleSubmit} className="mt-8 max-w-lg mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        value={ambition}
                        onChange={(e) => setAmbition(e.target.value)}
                        placeholder="e.g., Learn to play the guitar"
                        className="flex-grow w-full px-4 py-3 text-lg bg-cream dark:bg-dark-bg border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
                        required
                    />
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-brand-purple rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-purple dark:ring-offset-dark-card transition-colors"
                    >
                        <SparklesIcon className="w-5 h-5" />
                        Start My Journey
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AmbitionInput;
