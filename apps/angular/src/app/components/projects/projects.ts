import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
    imports: [],
    selector: 'app-projects',
    styleUrl: './projects.css',
    templateUrl: './projects.html',
})
export class ProjectsComponent {
    readonly languageService = inject(LanguageService);
}