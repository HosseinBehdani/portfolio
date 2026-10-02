import { AfterViewInit, Component, inject } from '@angular/core';
import { CountUp } from 'countup.js';

import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-status',
    standalone: true,
    imports: [],
    templateUrl: './status.html',
    styleUrl: './status.css'
})
export class StatusComponent implements AfterViewInit {

    readonly languageService = inject(LanguageService);

    ngAfterViewInit(): void {
        const projectsCount = new CountUp('projects-count', 3, {
            duration: 5,
            formattingFn: (value) => this.languageService.toLocaleNumber(Math.floor(value))
        });

        const experienceCount = new CountUp('experience-count', 3, {
            duration: 5,
            formattingFn: (value) => this.languageService.toLocaleNumber(Math.floor(value))
        });

        const responsiveCount = new CountUp('responsive-count', 100, {
            duration: 5,
            formattingFn: (value) => `${this.languageService.toLocaleNumber(Math.floor(value))}%`
        });

        const repositoriesCount = new CountUp('repositories-count', 3, {
            duration: 5,
            formattingFn: (value) => this.languageService.toLocaleNumber(Math.floor(value))
        });

        projectsCount.start();
        experienceCount.start();
        responsiveCount.start();
        repositoriesCount.start();
    }

}