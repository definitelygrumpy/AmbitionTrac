
import React, { useState, useEffect } from 'react';
import { ref, onValue, set, update } from 'firebase/database';
import type { Activity, Reflection, Theme, UserData } from './types.ts';
import { generateActivities } from './services/geminiService.ts';
import { database } from './services/firebase.ts';
import Header from './components/Header.tsx';
import PassionInput from './components/PassionInput.tsx';
import Dashboard from './components/Dashboard.tsx';
import ActivityList from './components/ActivityList.tsx';
import Journal from './components/Journal.tsx';
import AuthPage from './components/AuthPage.tsx';
import { LoaderIcon } from './components/icons.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';

const MOTIVATIONAL_QUOTES = [
    "The secret of getting ahead is getting started.",
    "Believe you can and you're halfway there.",
    "The only way to do great work is to love what you do.",
    "A journey of a thousand miles begins with a single step.",
    "Don't watch the clock; do what it does. Keep going.",
];

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [allUsers, setAllUsers] = useState<{ [key: string]: UserData }>({});
    const [dataLoaded, setDataLoaded] = useState(false);
    const [theme, setTheme] = useState<Theme>('light');
    const [passion, setPassion] = useState<string | null>(null);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [reflections, setReflections] = useState<Reflection[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [quote, setQuote] = useState('');

    useEffect(() => {
        setQuote(MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]);
        const loggedInUser = localStorage.getItem('passionTracUser');
        if (loggedInUser) {
            setCurrentUser(loggedInUser);
            if (loggedInUser === 'Admin') {
                setIsAdmin(true);
            }
        } else {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!currentUser) {
            setPassion(null);
            setActivities([]);
            setReflections([]);
            setDataLoaded(false);
            return;
        };

        setIsLoading(true);

        if (isAdmin) {
             const usersRef = ref(database, 'users');
             const unsubscribe = onValue(usersRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setAllUsers(data);
                }
                setIsLoading(false);
             }, (dbError) => {
                console.error(dbError);
                setError("Failed to load admin data.");
                setIsLoading(false);
             });
             return () => unsubscribe();
        }

        const userRef = ref(database, `users/${currentUser}`);
        const unsubscribe = onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setTheme(data.theme || 'light');
                setPassion(data.passion || null);
                setActivities(data.activities || []);
                setReflections(data.reflections || []);
            }
            setDataLoaded(true);
            setIsLoading(false);
        }, (dbError) => {
            console.error(dbError);
            setError("Failed to load your data. Check your connection or Firebase setup.");
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [currentUser, isAdmin]);
    
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const handleAuthSuccess = (username: string) => {
        if (username === 'Admin') {
            setIsAdmin(true);
        }
        setCurrentUser(username);
        localStorage.setItem('passionTracUser', username);
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setIsAdmin(false);
        localStorage.removeItem('passionTracUser');
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        if (currentUser && !isAdmin) {
            const userRef = ref(database, `users/${currentUser}`);
            update(userRef, { theme: newTheme }).catch(err => {
                console.error("Failed to save theme", err);
                setError("Could not save your settings.");
            });
        }
    };

    const handleSetPassion = async (newPassion: string) => {
        setIsGenerating(true);
        setError(null);
        try {
            const generatedActivities = await generateActivities(newPassion);
            const newActivities = generatedActivities.map((activity, index) => ({ ...activity, id: index, completed: false }));
            setPassion(newPassion);
            setActivities(newActivities);
            setReflections([]);

            if (currentUser && !isAdmin) {
                const userRef = ref(database, `users/${currentUser}`);
                const dataToSave = {
                    passion: newPassion,
                    activities: newActivities,
                    reflections: [],
                };
                await update(userRef, dataToSave);
            }
        } catch (err) {
            setError('Failed to generate activities. Please try again.');
            console.error(err);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleToggleActivity = (id: number) => {
        const newActivities = activities.map(activity =>
            activity.id === id ? { ...activity, completed: !activity.completed } : activity
        );
        setActivities(newActivities);
        if (currentUser && !isAdmin) {
            const userRef = ref(database, `users/${currentUser}`);
            update(userRef, { activities: newActivities }).catch(err => {
                console.error("Failed to save activity status", err);
                setError("Could not save your progress.");
            });
        }
    };

    const handleAddReflection = (activityId: number, text: string) => {
        const activity = activities.find(a => a.id === activityId);
        if (!activity) return;

        const newReflection: Reflection = {
            id: Date.now(),
            activityId,
            activityTitle: activity.title,
            text,
            date: new Date().toISOString(),
        };
        const newReflections = [newReflection, ...reflections];
        setReflections(newReflections);

        if (currentUser && !isAdmin) {
            const userRef = ref(database, `users/${currentUser}`);
            update(userRef, { reflections: newReflections }).catch(err => {
                console.error("Failed to save reflection", err);
                setError("Could not save your reflection.");
            });
        }
    };

    const handleReset = () => {
        setPassion(null);
        setActivities([]);
        setReflections([]);
        setError(null);
        if (currentUser && !isAdmin) {
            const userRef = ref(database, `users/${currentUser}`);
            const dataToReset = {
                passion: null,
                activities: [],
                reflections: [],
            };
            update(userRef, dataToReset).catch(err => {
                console.error("Failed to reset passion", err);
                setError("Could not reset your passion.");
            });
        }
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center text-center p-12 bg-white/50 dark:bg-dark-card/50 rounded-xl shadow-lg">
                    <LoaderIcon className="w-12 h-12 animate-spin text-brand-purple" />
                    <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">Loading Your Journey...</h2>
                </div>
            );
        }
        
        if (!currentUser) {
            return <AuthPage onAuthSuccess={handleAuthSuccess} />;
        }
        
        if (isAdmin) {
            return <AdminDashboard users={allUsers} />;
        }

        if (isGenerating) {
            return (
                <div className="flex flex-col items-center justify-center text-center p-12 bg-white/50 dark:bg-dark-card/50 rounded-xl shadow-lg">
                    <LoaderIcon className="w-12 h-12 animate-spin text-brand-purple" />
                    <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">Crafting Your Path...</h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">Our AI is generating personalized activities to help you achieve your passion.</p>
                </div>
            );
        }
        
        if (!passion || activities.length === 0) {
            return (
                <div>
                    <PassionInput onSetPassion={handleSetPassion} />
                    {error && <p className="mt-4 text-center text-red-500">{error}</p>}
                </div>
            );
        }

        return (
            <div className="space-y-8 animate-fade-in">
                <div>
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-brand-purple dark:text-purple-400">{passion}</h1>
                            <p className="mt-2 italic text-gray-600 dark:text-gray-400">"{quote}"</p>
                        </div>
                        <button
                            onClick={handleReset}
                            className="px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-lg shadow-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 dark:bg-dark-accent dark:hover:bg-purple-800 dark:focus:ring-purple-500 dark:ring-offset-dark-bg transition-all"
                        >
                            Start New Passion
                        </button>
                    </div>
                </div>

                <Dashboard activities={activities} />

                <div className="grid md:grid-cols-2 gap-8">
                    <ActivityList
                        activities={activities}
                        onToggleActivity={handleToggleActivity}
                        onAddReflection={handleAddReflection}
                    />
                    <Journal reflections={reflections} />
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen font-sans text-gray-800 dark:text-gray-200">
            <Header theme={theme} toggleTheme={toggleTheme} currentUser={currentUser} onLogout={handleLogout}/>
            <main className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
                {renderContent()}
            </main>
        </div>
    );
};

export default App;
