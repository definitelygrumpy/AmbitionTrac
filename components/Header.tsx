
import React from 'react';
import type { Theme } from '../types.ts';
import { SunIcon, MoonIcon, LogoIcon } from './icons.tsx';

interface HeaderProps {
    theme: Theme;
    toggleTheme: () => void;
    currentUser: string | null;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, currentUser, onLogout }) => {
    return (
        <header className="p-4 sm:p-6 flex justify-between items-center">
            <div className="flex items-center space-x-3">
                <LogoIcon className="w-8 h-8 text-brand-purple dark:text-purple-400" />
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">AmbitionTrac</h1>
            </div>
            <div className="flex items-center space-x-4">
                 {currentUser && (
                    <>
                        <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                            Welcome, {currentUser}
                        </span>
                        <button
                            onClick={onLogout}
                            className="px-3 py-1.5 text-sm font-medium text-brand-purple dark:text-purple-300 rounded-md hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                        >
                            Logout
                        </button>
                    </>
                )}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-card focus:outline-none focus:ring-2 focus:ring-brand-purple dark:focus:ring-purple-500 transition-colors"
                    aria-label="Toggle theme"
                >
                    {theme === 'light' ? (
                        <MoonIcon className="w-6 h-6" />
                    ) : (
                        <SunIcon className="w-6 h-6" />
                    )}
                </button>
            </div>
        </header>
    );
};

export default Header;