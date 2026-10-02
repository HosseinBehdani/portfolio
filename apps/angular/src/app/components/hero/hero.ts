import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { socials } from '@shared/data';
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

    socials = socials;

    get directionClass(): string {
        return this.languageService.language() === 'fa'
            ? 'lg:translate-x-24'
            : 'lg:-translate-x-24';
    }
}