import { Component, inject } from '@angular/core';
import { navigation } from '@portfolio/data';
import type { TranslationKey } from '@portfolio/types';
import { ThemeService } from '../../services/theme.service';
import { LanguageService, Language } from '../../services/language.service';
import { MobileMenuComponent } from './mobile-menu/mobile-menu';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        MobileMenuComponent
    ],
    templateUrl: './navbar.html',
    styleUrl: './navbar.css'
})
export class NavbarComponent {

    readonly themeService = inject(ThemeService);

    readonly languageService = inject(LanguageService);

    isChangingLanguage = false;

    isMobileMenuOpen = false;

    navigationItems = navigation.items.sort(
        (a, b) => a.order - b.order
    );

    openMobileMenu(): void {

        this.isMobileMenuOpen = true;

    }

    closeMobileMenu(): void {

        this.isMobileMenuOpen = false;

    }

    get currentTranslations() {

        return this.languageService.translations;

    }

    getTranslationKey(key: string): TranslationKey {

        return key as TranslationKey;

    }

    changeLanguage(lang: Language): void {

        if (this.languageService.language() === lang)
            return;

        this.isChangingLanguage = true;

        setTimeout(() => {

            this.languageService.changeLanguage(lang);

            this.isChangingLanguage = false;

        }, 200);

    }

    toggleTheme(): void {

        this.themeService.toggleTheme();

    }

}