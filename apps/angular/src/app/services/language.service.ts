import { Injectable, signal } from '@angular/core';

import fa from '@portfolio/translations/fa';
import en from '@portfolio/translations/en';

import type { Translation } from '@portfolio/types';


export type Language = 'fa' | 'en';



const translations: Record<Language, Translation> = {
    fa,
    en
};



@Injectable({
    providedIn: 'root'
})
export class LanguageService {


    private currentLanguage = signal<Language>(
        (localStorage.getItem('language') as Language) || 'fa'
    );



    language = this.currentLanguage.asReadonly();



    constructor() {

        this.applyLanguage(
            this.currentLanguage()
        );

    }



    get translations(): Translation {

        return translations[
            this.currentLanguage()
        ];

    }



    changeLanguage(lang: Language): void {


        this.currentLanguage.set(lang);


        localStorage.setItem(
            'language',
            lang
        );


        this.applyLanguage(lang);

    }



    private applyLanguage(lang: Language): void {
        document.documentElement.lang = lang;
        document.documentElement.dir =
            lang === 'fa'
                ? 'rtl'
                : 'ltr';
    }

    toLocaleNumber(value: number | string): string {
        return this.currentLanguage() === 'fa'
            ? value.toString().replace(/\d/g, digit => '۰۱۲۳۴۵۶۷۸۹'[+digit]).replace('%', '٪')
            : value.toString();
    }


}
