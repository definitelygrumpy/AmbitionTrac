

import React from 'react';
import type { Reflection } from '../types.ts';
import { BookOpenIcon } from './icons.tsx';

interface JournalProps {
    reflections: Reflection[];
}

const Journal: React.FC<JournalProps> = ({ reflections }) => {
    return (
        <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-4">
                <BookOpenIcon className="w-6 h-6 text-brand-purple dark:text-purple-400"/>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Reflection Journal</h2>
            </div>
            {reflections.length === 0 ? (
                <div className="text-center py-8 px-4 bg-gray-50 dark:bg-dark-bg rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400">Complete an activity to add a reflection.</p>
                </div>
            ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {reflections.map(reflection => (
                        <div key={reflection.id} className="p-4 bg-cream dark:bg-dark-bg rounded-lg">
                            <p className="font-semibold text-gray-700 dark:text-gray-200">{reflection.activityTitle}</p>
                            <p className="text-gray-600 dark:text-gray-300 my-1">"{reflection.text}"</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">
                                {new Date(reflection.date).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Journal;