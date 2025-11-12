/*
 * ==============================================================================
 *
 *   WARNING: THIS FILE IS IN THE ROOT DIRECTORY AND IS NOT DEPLOYED.
 *
 *   To make changes to the application, please edit the corresponding file
 *   in the '/public' directory. For this file, edit:
 *
 *   '/public/components/AuthPage.tsx'
 *
 * ==============================================================================
 */
import React, { useState } from 'react';
import { signUp, login } from '../services/authService.ts';
import { LoaderIcon } from './icons.tsx';

interface AuthPageProps {
    onAuthSuccess: (username: string) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const result = isLoginView
                ? await login(username, password)
                : await signUp(username, password, email);

            if (result.success) {
                onAuthSuccess(username);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-8 bg-white dark:bg-dark-card rounded-xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
                {isLoginView ? 'Welcome Back!' : 'Create Your Account'}
            </h2>
            <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
                {isLoginView ? 'Log in to continue your journey.' : 'Start tracking your ambitions today.'}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                    <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 block w-full px-4 py-3 bg-cream dark:bg-dark-bg border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
                        required
                    />
                </div>
                {!isLoginView && (
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Email (Optional)
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 bg-cream dark:bg-dark-bg border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
                        />
                    </div>
                )}
                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full px-4 py-3 bg-cream dark:bg-dark-bg border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
                        required
                    />
                </div>

                {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                <div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center items-center gap-2 px-6 py-3 font-semibold text-white bg-brand-purple rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-purple dark:ring-offset-dark-card transition-colors disabled:bg-purple-400 disabled:cursor-not-allowed"
                    >
                        {isLoading && <LoaderIcon className="w-5 h-5 animate-spin" />}
                        {isLoginView ? 'Login' : 'Sign Up'}
                    </button>
                </div>
            </form>

            <p className="mt-6 text-center text-sm">
                <button
                    onClick={() => {
                        setIsLoginView(!isLoginView);
                        setError(null);
                        setEmail('');
                    }}
                    className="font-medium text-brand-purple dark:text-purple-400 hover:underline"
                >
                    {isLoginView ? "Don't have an account? Sign up" : 'Already have an account? Login'}
                </button>
            </p>
        </div>
    );
};

export default AuthPage;