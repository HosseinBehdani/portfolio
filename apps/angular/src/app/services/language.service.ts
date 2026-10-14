import { Injectable, signal } from '@angular/core';

import fa from '@portfolio/translations/fa';
import en from '@portfolio/translations/en';

import type { Translation } from '@portfolio/types';
import { toPersianDigits } from '../utils/persian-digits';

export type Language = 'fa' | 'en';

const translations: Record<Language, Translation> = {
    fa,
    en
};

function isValidLanguage(value: string | null): value is Language {
    return value === 'fa' || value === 'en';
}

function getStoredLanguage(): Language {
    try {
        const storedLanguage = localStorage.getItem('language');

        if (isValidLanguage(storedLanguage)) {
            return storedLanguage;
        }

        if (storedLanguage !== null) {
            localStorage.removeItem('language');
        }

        return 'fa';
    } catch {
        return 'fa';
    }
}

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private currentLanguage = signal<Language>(
        getStoredLanguage()
    );

    readonly language = this.currentLanguage.asReadonly();

    constructor() {
        this.applyLanguage(this.currentLanguage());
    }

    get translations(): Translation {
        return translations[this.currentLanguage()];
    }

    changeLanguage(lang: Language): void {
        this.currentLanguage.set(lang);

        try {
            localStorage.setItem('language', lang);
        } catch {
            // Language changes still work when storage is unavailable.
        }

        this.applyLanguage(lang);
    }

    private applyLanguage(lang: Language): void {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'fa'
            ? 'rtl'
            : 'ltr';
    }

    toLocaleNumber(value: number | string): string {
        const formatted = value.toString();

        return this.currentLanguage() === 'fa'
            ? toPersianDigits(formatted).replace('%', '٪')
            : formatted;
    }
}
