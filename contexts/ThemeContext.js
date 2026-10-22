import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { runThemeTransition } from '@/lib/themeTransition';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        // Check for saved theme preference or default to 'dark'
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
        setTheme(initialTheme);
        document.documentElement.setAttribute('data-theme', initialTheme);
    }, []);

    // `origin` is the element the circular reveal grows from (see lib/themeTransition.js).
    const toggleTheme = useCallback(({ origin } = {}) => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        try {
            localStorage.setItem('theme', newTheme);
        } catch (e) {
            // A theme that cannot be persisted still applies for this session.
        }
        // The view transition snapshots the page as soon as this returns, so the
        // attribute and the React render (toggle icon) must both be committed.
        runThemeTransition(
            () => {
                document.documentElement.setAttribute('data-theme', newTheme);
                flushSync(() => setTheme(newTheme));
            },
            { origin }
        );
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
