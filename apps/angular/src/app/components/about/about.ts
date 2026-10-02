import { Component, inject } from '@angular/core';

import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [],
    templateUrl: './about.html',
    styleUrl: './about.css'
})
export class AboutComponent {
    readonly languageService = inject(LanguageService);
}