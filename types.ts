
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
    passion: string | null;
    activities: Activity[];
    reflections: Reflection[];
    email: string | null;
    theme: Theme;
    password?: string;
}