import { Component, inject } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from './components/hero/hero';
import { AosService } from './services/aos.service';
import { LanguageService } from './services/language.service';
import { SeoService } from './services/seo.service';
import { ThemeService } from './services/theme.service';
import { AboutComponent } from './components/about/about';
import { StatusComponent } from './components/status/status';
import { SkillsComponent } from './components/skills/skills';
import { ExperienceComponent } from './components/experience/experience';
import { ProjectsComponent } from './components/projects/projects';
import { CertificatesComponent } from './components/certificates/certificates';
import { ContactComponent } from './components/contact/contact';
import { FooterComponent } from './components/footer/footer';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        NavbarComponent,
        HeroComponent,
        AboutComponent,
        StatusComponent,
        SkillsComponent,
        ExperienceComponent,
        ProjectsComponent,
        CertificatesComponent,
        ContactComponent,
        FooterComponent,
        ScrollToTopComponent
    ],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App {
    readonly languageService = inject(LanguageService);

    constructor() {
        inject(ThemeService);
        inject(SeoService);
        inject(AosService);
    }
}
