import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-experience',
    standalone: true,
    imports: [],
    templateUrl: './experience.html',
    styleUrl: './experience.css'
})
export class ExperienceComponent {
    readonly languageService = inject(LanguageService);
}