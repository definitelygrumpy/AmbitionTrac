

import React from 'react';
import type { Activity } from '../types.ts';
import { TargetIcon, StarIcon, TrophyIcon } from './icons.tsx';

interface DashboardProps {
    activities: Activity[];
}

const getLevel = (points: number): { name: string; color: string } => {
    if (points >= 9) return { name: "Achiever", color: "text-amber-500" };
    if (points >= 6) return { name: "Enthusiast", color: "text-indigo-500" };
    if (points >= 3) return { name: "Explorer", color: "text-sky-500" };
    return { name: "Beginner", color: "text-green-500" };
};

const Dashboard: React.FC<DashboardProps> = ({ activities }) => {
    const completedCount = activities.filter(a => a.completed).length;
    const totalCount = activities.length;
    const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
    const level = getLevel(completedCount);

    return (
        <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-lg space-y-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Your Progress</h2>
            <div>
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Overall Progress</span>
                    <span className="text-sm font-medium text-brand-purple dark:text-purple-400">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                    <div
                        className="bg-brand-purple h-4 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-cream dark:bg-dark-bg rounded-lg">
                    <TargetIcon className="w-8 h-8 mx-auto text-pink-500 dark:text-soft-pink"/>
                    <p className="mt-2 text-2xl font-bold">{completedCount} / {totalCount}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Activities Done</p>
                </div>
                <div className="p-4 bg-cream dark:bg-dark-bg rounded-lg">
                    <StarIcon className="w-8 h-8 mx-auto text-yellow-500"/>
                    <p className="mt-2 text-2xl font-bold">{completedCount}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Points</p>
                </div>
                <div className="p-4 bg-cream dark:bg-dark-bg rounded-lg">
                     <TrophyIcon className={`w-8 h-8 mx-auto ${level.color}`}/>
                    <p className="mt-2 text-2xl font-bold">{level.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Current Level</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;