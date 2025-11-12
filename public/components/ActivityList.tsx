

import React from 'react';
import type { Activity } from '../types.ts';
import { ListChecksIcon } from './icons.tsx';

interface ActivityListProps {
    activities: Activity[];
    onToggleActivity: (id: number) => void;
    onAddReflection: (activityId: number, text: string) => void;
}

// Fix: Moved ActivityItem component before ActivityList to fix "used before declaration" error.
const ActivityItem: React.FC<{
    activity: Activity;
    isNext: boolean;
    onToggleActivity: (id: number) => void;
    onAddReflection: (activityId: number, text: string) => void;
}> = ({ activity, isNext, onToggleActivity, onAddReflection }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [showReflection, setShowReflection] = React.useState(false);
    const [reflectionText, setReflectionText] = React.useState('');

    const handleToggle = () => {
        onToggleActivity(activity.id);
        if (!activity.completed) {
            setShowReflection(true);
        }
    };

    const handleSaveReflection = () => {
        if (reflectionText.trim()) {
            onAddReflection(activity.id, reflectionText.trim());
        }
        setShowReflection(false);
        setReflectionText('');
    };

    return (
        <div className={`p-4 rounded-lg transition-all duration-300 ${activity.completed ? 'bg-green-50 dark:bg-green-900/50' : isNext ? 'bg-purple-50 dark:bg-purple-900/40 ring-2 ring-brand-purple' : 'bg-gray-100 dark:bg-dark-bg'}`}>
            <div className="flex items-start gap-4">
                <input
                    type="checkbox"
                    checked={activity.completed}
                    onChange={handleToggle}
                    className="mt-1 h-5 w-5 rounded border-gray-300 text-brand-purple focus:ring-brand-purple"
                />
                <div className="flex-1">
                    <h3 className={`font-semibold ${activity.completed ? 'line-through text-gray-500' : 'text-gray-800 dark:text-gray-100'}`}>
                        {activity.title}
                    </h3>
                    <p className={`text-sm text-gray-600 dark:text-gray-400 mt-1 ${isExpanded ? 'block' : 'hidden'}`}>
                        {activity.description}
                    </p>
                    <button onClick={() => setIsExpanded(!isExpanded)} className="text-xs text-brand-purple dark:text-purple-400 hover:underline mt-1">
                        {isExpanded ? 'Show less' : 'Show more'}
                    </button>
                </div>
            </div>
            {showReflection && (
                <div className="mt-4 pl-9 animate-fade-in">
                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Add a reflection (optional):
                    </label>
                    <textarea
                        value={reflectionText}
                        onChange={(e) => setReflectionText(e.target.value)}
                        placeholder="What did you learn or feel?"
                        className="mt-1 w-full p-2 bg-white dark:bg-dark-card border border-gray-300 dark:border-gray-600 rounded-md focus:ring-brand-purple focus:border-brand-purple"
                        rows={2}
                    />
                    <div className="mt-2 flex justify-end gap-2">
                         <button onClick={() => setShowReflection(false)} className="px-3 py-1 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-gray-600">Skip</button>
                        <button onClick={handleSaveReflection} className="px-3 py-1 text-sm bg-brand-purple text-white rounded-md hover:bg-purple-700">Save</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const ActivityList: React.FC<ActivityListProps> = ({ activities, onToggleActivity, onAddReflection }) => {
    const nextActivityId = activities.find(a => !a.completed)?.id;

    return (
        <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-4">
                <ListChecksIcon className="w-6 h-6 text-brand-purple dark:text-purple-400"/>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Your Activities</h2>
            </div>
            <div className="space-y-3">
                {activities.map(activity => (
                    <ActivityItem
                        key={activity.id}
                        activity={activity}
                        isNext={activity.id === nextActivityId}
                        onToggleActivity={onToggleActivity}
                        onAddReflection={onAddReflection}
                    />
                ))}
            </div>
        </div>
    );
};

// Fix: Changed default export to ActivityList.
export default ActivityList;