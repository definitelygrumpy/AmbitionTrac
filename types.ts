/*
 * ==============================================================================
 *
 *   WARNING: THIS FILE IS IN THE ROOT DIRECTORY AND IS NOT DEPLOYED.
 *
 *   To make changes to the application, please edit the corresponding file
 *   in the '/public' directory. For this file, edit:
 *
 *   '/public/types.ts'
 *
 * ==============================================================================
 */
export type Theme = 'light' | 'dark';

export interface Activity {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

export interface Reflection {
    id: number;
    activityId: number;
    activityTitle: string;
    text: string;
    date: string;
}

export interface UserData {
    ambition: string | null;
    activities: Activity[];
    reflections: Reflection[];
    email: string | null;
    theme: Theme;
    password?: string;
}