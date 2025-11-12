
import { ref, get, set } from 'firebase/database';
import { database } from './firebase.ts';

// WARNING: This is a simplified password handling for demonstration purposes only.
// Storing passwords, even transformed like this, in a client-readable database is insecure.
// DO NOT use this method in a production environment. Use a secure authentication provider like Firebase Authentication.
const transformPassword = (password: string) => btoa(`p@ssw0rd_s@lt_${password}`);

export const signUp = async (username: string, password: string, email?: string): Promise<{ success: boolean; message: string }> => {
    if (!username || !password) {
        return { success: false, message: "Username and password cannot be empty." };
    }
    if (username.toLowerCase() === 'admin') {
        return { success: false, message: "This username is reserved." };
    }
    if (username.length < 3) {
        return { success: false, message: "Username must be at least 3 characters long." };
    }
     if (password.length < 6) {
        return { success: false, message: "Password must be at least 6 characters long." };
    }
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
        return { success: false, message: "Please enter a valid email address." };
    }

    const userRef = ref(database, `users/${username}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
        return { success: false, message: 'Username already taken.' };
    }

    const newUser = {
        password: transformPassword(password), // Unsafe, for demo only
        email: email || null,
        theme: 'light',
        passion: null,
        activities: [],
        reflections: []
    };

    await set(userRef, newUser);
    return { success: true, message: 'Account created successfully!' };
};

export const login = async (username: string, password: string): Promise<{ success: boolean; message: string }> => {
    if (!username || !password) {
        return { success: false, message: "Username and password cannot be empty." };
    }

    // Handle admin login separately from database users
    if (username === 'Admin' && password === 'Admin6767') {
        return { success: true, message: 'Admin login successful!' };
    }

    const userRef = ref(database, `users/${username}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
        return { success: false, message: 'User not found.' };
    }

    const userData = snapshot.val();
    if (userData.password !== transformPassword(password)) {
        return { success: false, message: 'Incorrect password.' };
    }

    return { success: true, message: 'Login successful!' };
};
