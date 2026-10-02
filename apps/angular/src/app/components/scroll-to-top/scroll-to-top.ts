import { Component, HostListener, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-scroll-to-top',
    standalone: true,
    imports: [],
    templateUrl: './scroll-to-top.html',
    styleUrl: './scroll-to-top.css'
})
export class ScrollToTopComponent {

    readonly languageService = inject(LanguageService);

    isVisible = false;

    @HostListener('window:scroll')
    onWindowScroll(): void {
        this.isVisible = window.scrollY > 300;
    }

    scrollToTop(): void {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

}