import { useEffect, useState } from 'react';
import fa from '@portfolio/translations/fa';
import en from '@portfolio/translations/en';
import { toEnglishDigits, toPersianDigits } from '@portfolio/utils';
import LanguageContext from './LanguageContext';
import type { ReactNode } from 'react';
import type { Language, LanguageContextValue } from './LanguageContext';

const translations = {
    fa,
    en
};

function getStoredLanguage(): Language {
    try {
        const storedLanguage = localStorage.getItem('language');

        if (storedLanguage === 'fa' || storedLanguage === 'en') {
            return storedLanguage;
        }

        if (storedLanguage !== null) {
            localStorage.removeItem('language');
        }
    } catch {
        // Ignore localStorage errors and use the default language.
    }

    return 'fa';
}

interface LanguageProviderProps {
    children: ReactNode;
}

function LanguageProvider({ children }: LanguageProviderProps) {
    const [language, setLanguage] = useState<Language>(getStoredLanguage);

    const changeLanguage = (newLanguage: Language) => {
        setLanguage(newLanguage);

        try {
            localStorage.setItem('language', newLanguage);
        } catch {
            // Language change should work even if storage is unavailable.
        }
    };

    const toLocaleNumber = (value: number | string): string => {
        const normalizedValue = toEnglishDigits(String(value)).replace(/٪/g, '%');

        return language === 'fa'
            ? toPersianDigits(normalizedValue).replace(/%/g, '٪')
            : normalizedValue;
    };

    useEffect(() => {
        const direction = language === 'fa' ? 'rtl' : 'ltr';

        document.documentElement.lang = language;
        document.documentElement.dir = direction;

        document.title = language === 'fa'
            ? 'حسین بهدانی | توسعه‌دهنده فرانت‌اند'
            : 'Hossein Behdani | Front-End Developer';
    }, [language]);

    const contextValue: LanguageContextValue = {
        language,
        translations: translations[language],
        changeLanguage,
        toLocaleNumber
    };

    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    );
}

export default LanguageProvider;