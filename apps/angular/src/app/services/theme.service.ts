import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

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

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    theme = signal<Theme>('light');

    constructor() {
        const savedTheme = getStoredTheme();

        if (savedTheme) {
            this.setTheme(savedTheme);
            return;
        }

        const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches;

        this.setTheme(
            prefersDark ? 'dark' : 'light'
        );
    }

    setTheme(theme: Theme): void {
        this.theme.set(theme);

        document.documentElement.classList.toggle(
            'dark',
            theme === 'dark'
        );

        try {
            localStorage.setItem('theme', theme);
        } catch {
            // Theme changes still work when storage is unavailable.
        }
    }

    toggleTheme(): void {
        this.setTheme(
            this.theme() === 'dark'
                ? 'light'
                : 'dark'
        );
    }
}