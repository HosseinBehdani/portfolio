import { createContext } from 'react';

import type { Translation } from '@portfolio/types';

export type Language = 'fa' | 'en';

export interface LanguageContextValue {
    language: Language;
    translations: Translation;
    changeLanguage: (language: Language) => void;
    toLocaleNumber: (value: number | string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export default LanguageContext;