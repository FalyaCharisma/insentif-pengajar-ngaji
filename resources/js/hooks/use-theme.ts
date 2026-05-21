import { useEffect, useState } from 'react';

export function useTheme() {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        // Prevent transition flash on initial load
        document.body.classList.add('preload');

        // Check initial theme state
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialDarkMode = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);

        setIsDarkMode(initialDarkMode);
        applyTheme(initialDarkMode);

        // Remove preload class after a short delay
        setTimeout(() => {
            document.body.classList.remove('preload');
        }, 100);

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem('theme')) {
                setIsDarkMode(e.matches);
                applyTheme(e.matches);
            }
        };
        mediaQuery.addEventListener('change', handleSystemThemeChange);

        return () => {
            mediaQuery.removeEventListener('change', handleSystemThemeChange);
        };
    }, []);

    const applyTheme = (darkMode: boolean) => {
        const htmlElement = document.documentElement;
        if (darkMode) {
            htmlElement.setAttribute('data-bs-theme', 'dark');
        } else {
            htmlElement.setAttribute('data-bs-theme', 'light');
        }
    };

    const toggleTheme = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        applyTheme(newDarkMode);

        // Save to localStorage
        localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    };

    const setTheme = (darkMode: boolean) => {
        setIsDarkMode(darkMode);
        applyTheme(darkMode);
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    };

    return {
        isDarkMode,
        toggleTheme,
        setTheme
    };
}