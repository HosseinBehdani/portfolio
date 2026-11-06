
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { socials } from '@portfolio/data';
import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './hero.html',
    styleUrl: './hero.css'
})
export class HeroComponent {

    private readonly languageService = inject(LanguageService);

    get currentTranslations() {
        return this.languageService.translations;
    }

    get resumeUrl(): string {
        return this.languageService.language() === 'fa'
            ? '/resume/Hossein-Behdani-Resume-fa.pdf'
            : '/resume/Hossein-Behdani-Resume-en.pdf';
    }

    get resumeFileName(): string {
        return this.languageService.language() === 'fa'
            ? 'Hossein-Behdani-Resume-fa.pdf'
            : 'Hossein-Behdani-Resume-en.pdf';
    }

    socials = socials;

    get directionClass(): string {
        return this.languageService.language() === 'fa'
            ? 'lg:translate-x-24'
            : 'lg:-translate-x-24';
    }
}