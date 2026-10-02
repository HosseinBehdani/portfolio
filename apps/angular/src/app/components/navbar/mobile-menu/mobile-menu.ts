import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

import navigation from '@portfolio/data/navigation';
import type { TranslationKey } from '@portfolio/types';

import { ThemeService } from '../../../services/theme.service';
import {
    LanguageService,
    Language
} from '../../../services/language.service';


@Component({
    selector: 'app-mobile-menu',
    standalone: true,
    imports: [],
    templateUrl: './mobile-menu.html',
    styleUrl: './mobile-menu.css'
})
export class MobileMenuComponent {


    public themeService = inject(ThemeService);

    public languageService = inject(LanguageService);



    @Input() 
    isOpen = false;


    @Output()
    closeMenu = new EventEmitter<void>();



    navigationItems = navigation.items.sort(
        (a, b) => a.order - b.order
    );



    get currentTranslations() {

        return this.languageService.translations;

    }



    getTranslationKey(key: string): TranslationKey {

        return key as TranslationKey;

    }



    close(): void {

        this.closeMenu.emit();

    }



    changeLanguage(lang: Language): void {


        if (this.languageService.language() === lang) {
            return;
        }


        this.languageService.changeLanguage(lang);

    }



    toggleTheme(): void {

        this.themeService.toggleTheme();

    }


}