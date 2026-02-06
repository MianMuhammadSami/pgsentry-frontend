"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check local storage on mount
        const storedUser = localStorage.getItem('pgs_user');
        const storedToken = localStorage.getItem('pgs_token');
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
        setLoading(false);
    }, []);

    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('pgs_user', JSON.stringify(userData));
        localStorage.setItem('pgs_token', authToken);
    };

    const logout = async () => {
        // Call logout endpoint to clear refresh token cookie
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });
        } catch (error) {
            console.error('Logout error:', error);
        }

        setUser(null);
        setToken(null);
        localStorage.removeItem('pgs_user');
        localStorage.removeItem('pgs_token');
        router.push('/');
    };

    // Helper function to get auth headers for API calls
    const getAuthHeaders = () => {
        if (!token) {
            return {};
        }
        return {
            'Authorization': `Bearer ${token}`,
        };
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading, getAuthHeaders }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
