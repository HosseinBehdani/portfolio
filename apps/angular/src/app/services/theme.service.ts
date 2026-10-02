import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    theme = signal<Theme>('light');

    constructor() {

        const savedTheme = localStorage.getItem('theme') as Theme | null;

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

        localStorage.setItem('theme', theme);
    }

    toggleTheme(): void {

        this.setTheme(
            this.theme() === 'dark'
                ? 'light'
                : 'dark'
        );
    }
}