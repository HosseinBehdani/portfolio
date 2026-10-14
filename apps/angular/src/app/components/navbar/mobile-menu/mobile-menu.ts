import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild,
    inject
} from '@angular/core';

import { navigation } from '@portfolio/data';
import type { TranslationKey } from '@portfolio/types';

import { ThemeService } from '../../../services/theme.service';
import {
    LanguageService,
    Language
} from '../../../services/language.service';

@Component({
    selector: 'app-mobile-menu',
    standalone: true,
    imports: [],
    templateUrl: './mobile-menu.html',
    styleUrl: './mobile-menu.css'
})
export class MobileMenuComponent implements OnChanges {
    readonly themeService = inject(ThemeService);
    readonly languageService = inject(LanguageService);

    @Input()
    isOpen = false;

    @Output()
    closeMenu = new EventEmitter<void>();

    @ViewChild('panel')
    private panelRef?: ElementRef<HTMLElement>;

    @ViewChild('closeButton')
    private closeButtonRef?: ElementRef<HTMLButtonElement>;

    private previouslyFocused: HTMLElement | null = null;

    navigationItems = navigation.items.sort(
        (a, b) => a.order - b.order
    );

    get currentTranslations() {
        return this.languageService.translations;
    }

    get isRtl(): boolean {
        return this.languageService.language() === 'fa';
    }

    getTranslationKey(key: string): TranslationKey {
        return key as TranslationKey;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!changes['isOpen']) {
            return;
        }

        if (this.isOpen) {
            this.previouslyFocused =
                document.activeElement instanceof HTMLElement
                    ? document.activeElement
                    : null;
            document.body.style.overflow = 'hidden';

            queueMicrotask(() => {
                this.closeButtonRef?.nativeElement.focus();
            });

            return;
        }

        document.body.style.overflow = '';
        this.previouslyFocused?.focus();
        this.previouslyFocused = null;
    }

    @HostListener('document:keydown', ['$event'])
    onDocumentKeydown(event: KeyboardEvent): void {
        if (!this.isOpen) {
            return;
        }

        if (event.key === 'Escape') {
            event.preventDefault();
            this.close();
            return;
        }

        if (event.key === 'Tab') {
            this.trapFocus(event);
        }
    }

    close(): void {
        this.closeMenu.emit();
    }

    changeLanguage(lang: Language): void {
        if (this.languageService.language() === lang) {
            return;
        }

        this.languageService.changeLanguage(lang);
    }

    private trapFocus(event: KeyboardEvent): void {
        const panel = this.panelRef?.nativeElement;

        if (!panel) {
            return;
        }

        const focusable = this.getFocusableElements(panel);
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (!first || !last) {
            event.preventDefault();
            return;
        }

        const active = document.activeElement;

        if (event.shiftKey && active === first) {
            event.preventDefault();
            last.focus();
            return;
        }

        if (!event.shiftKey && active === last) {
            event.preventDefault();
            first.focus();
        }
    }

    private getFocusableElements(
        container: HTMLElement
    ): HTMLElement[] {
        return Array.from(
            container.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
            )
        ).filter(
            (element) =>
                !element.hasAttribute('disabled') &&
                element.getAttribute('aria-hidden') !== 'true'
        );
    }
}
