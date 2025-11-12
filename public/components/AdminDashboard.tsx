

import React from 'react';
import type { UserData } from '../types.ts';
import { UsersIcon, ClipboardListIcon, CheckCircleIcon } from './icons.tsx';

interface AdminDashboardProps {
    users: { [username: string]: UserData };
}

const StatCard: React.FC<{ icon: React.ReactNode, title: string, value: string | number, color: string }> = ({ icon, title, value, color }) => (
    <div className="p-6 bg-cream dark:bg-dark-bg rounded-lg flex items-start space-x-4">
        <div className={`p-3 rounded-full ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        </div>
    </div>
);

const AdminDashboard: React.FC<AdminDashboardProps> = ({ users }) => {
    const userList = Object.keys(users).filter(username => username !== 'Admin');
    
    const totalUsers = userList.length;

    const totalAmbitions = userList.reduce((acc, key) => {
        return users[key].ambition ? acc + 1 : acc;
    }, 0);

    const totalActivitiesCompleted = userList.reduce((acc, key) => {
        const userActivities = users[key].activities || [];
        const completed = userActivities.filter(a => a.completed).length;
        return acc + completed;
    }, 0);

    return (
        <div className="space-y-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <StatCard 
                    icon={<UsersIcon className="w-7 h-7 text-white" />} 
                    title="Total Users" 
                    value={totalUsers} 
                    color="bg-sky-500" 
                />
                <StatCard 
                    icon={<ClipboardListIcon className="w-7 h-7 text-white" />} 
                    title="Ambitions Set" 
                    value={totalAmbitions}
                    color="bg-amber-500"
                />
                <StatCard 
                    icon={<CheckCircleIcon className="w-7 h-7 text-white" />} 
                    title="Activities Completed" 
                    value={totalActivitiesCompleted} 
                    color="bg-green-500"
                />
            </div>

            <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">User List</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-dark-bg">
                            <tr>
                                <th className="p-3 text-sm font-semibold tracking-wide">Username</th>
                                <th className="p-3 text-sm font-semibold tracking-wide">Email</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {userList.length > 0 ? userList.map(username => (
                                <tr key={username}>
                                    <td className="p-3 whitespace-nowrap font-medium">{username}</td>
                                    <td className="p-3 whitespace-nowrap text-gray-500 dark:text-gray-400">
                                        {users[username].email || 'N/A'}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={2} className="p-4 text-center text-gray-500 dark:text-gray-400">
                                        No users have signed up yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;