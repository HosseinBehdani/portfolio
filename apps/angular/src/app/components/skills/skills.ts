import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { skills } from '@shared/data';


@Component({
    selector: 'app-skills',
    standalone: true,
    imports: [],
    templateUrl: './skills.html',
    styleUrl: './skills.css'
})
export class SkillsComponent {
    readonly languageService = inject(LanguageService);
    readonly skills = skills;
    readonly skillLevels = Object.fromEntries(this.skills.map(skill => [skill.id, skill.level]));
    readonly ratingDots = [1, 2, 3, 4, 5];
}