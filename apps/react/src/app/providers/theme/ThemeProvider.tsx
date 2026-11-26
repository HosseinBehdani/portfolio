import { useEffect, useState } from 'react';

import ThemeContext from './ThemeContext';

import type { ReactNode } from 'react';
import type { Theme } from './ThemeContext';

function isValidTheme(value: string | null): value is Theme {
    return value === 'light' || value === 'dark';
}

function getStoredTheme(): Theme | null {
    try {
        const storedTheme = localStorage.getItem('theme');

        if (isValidTheme(storedTheme)) {
            return storedTheme;
        }

        if (storedTheme !== null) {
            localStorage.removeItem('theme');
        }

        return null;
    } catch {
        return null;
    }
}

function getInitialTheme(): Theme {
    const savedTheme = getStoredTheme();

    if (savedTheme) {
        return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
}

interface ThemeProviderProps {
    children: ReactNode;
}

function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>(getInitialTheme);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
    };

    const toggleTheme = () => {
        setTheme(
            theme === 'dark' ? 'light' : 'dark'
        );
    };

    useEffect(() => {
        document.documentElement.classList.toggle(
            'dark',
            theme === 'dark'
        );

        try {
            localStorage.setItem('theme', theme);
        } catch {
            // Theme changes still work when storage is unavailable.
        }
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
                toggleTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;