import { AfterViewInit, Component, inject } from '@angular/core';
import AOS from 'aos';
import { RouterOutlet } from '@angular/router';
import profile from '@portfolio/data/profile';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from './components/hero/hero';
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
        RouterOutlet,
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
export class App implements AfterViewInit {
    readonly themeService = inject(ThemeService);
    profile = profile;

    title() {
        return 'Portfolio';
    }

    constructor() {
        console.log(this.profile);
    }

    ngAfterViewInit(): void {
        AOS.init();
    }
}