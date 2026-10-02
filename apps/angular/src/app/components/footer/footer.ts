import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [],
    templateUrl: './footer.html',
    styleUrl: './footer.css'
})
export class FooterComponent {
    readonly languageService = inject(LanguageService);
}