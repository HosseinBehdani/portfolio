import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { LanguageService } from '../../services/language.service';
import { toPersianDigits } from '../../utils/persian-digits';

type ContactField = 'name' | 'email' | 'subject' | 'message';

const ALERT_VISIBLE_MS = 5000;
const ALERT_EXIT_MS = 400;

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './contact.html',
    styleUrl: './contact.css'
})
export class ContactComponent {
    readonly languageService = inject(LanguageService);

    private readonly http = inject(HttpClient);
    private readonly formBuilder = inject(FormBuilder);
    private readonly changeDetectorRef = inject(ChangeDetectorRef);
    private readonly destroyRef = inject(DestroyRef);

    private alertHideTimeout: ReturnType<typeof setTimeout> | null = null;
    private alertCloseTimeout: ReturnType<typeof setTimeout> | null = null;

    constructor() {
        this.destroyRef.onDestroy(() => this.clearAlertTimers());
    }

    toLocalePhone(phone: string): string {
        return this.languageService.language() === 'fa'
            ? toPersianDigits(phone)
            : phone;
    }

    readonly contactForm = this.formBuilder.nonNullable.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        subject: ['', Validators.required],
        message: ['', Validators.required]
    });

    submitting = false;
    submitted = false;
    error = false;
    alertClosing = false;

    private readonly formspreeUrl = 'https://formspree.io/f/xeaobvrb';

    isInvalid(field: ContactField): boolean {
        const control = this.contactForm.controls[field];

        return control.invalid && (control.touched || control.dirty);
    }

    fieldError(field: ContactField): string {
        const control = this.contactForm.controls[field];
        const copy = this.languageService.translations.contact;

        if (control.hasError('required')) {
            return copy.requiredError;
        }

        if (control.hasError('email')) {
            return copy.emailError;
        }

        return '';
    }

    describedBy(field: ContactField): string | null {
        return this.isInvalid(field) ? `contact-${field}-error` : null;
    }

    onSubmit(): void {
        if (this.contactForm.invalid || this.submitting) {
            this.contactForm.markAllAsTouched();
            this.focusFirstInvalid();
            return;
        }

        this.submitting = true;
        this.submitted = false;
        this.error = false;
        this.alertClosing = false;
        this.clearAlertTimers();

        this.http.post(this.formspreeUrl, this.contactForm.getRawValue(), {
            headers: {
                Accept: 'application/json'
            }
        }).subscribe({
            next: () => {
                this.submitting = false;
                this.submitted = true;
                this.error = false;
                this.alertClosing = false;

                this.contactForm.reset();

                this.changeDetectorRef.markForCheck();
                this.scheduleAlertDismiss();
            },
            error: () => {
                this.submitting = false;
                this.submitted = false;
                this.error = true;
                this.alertClosing = false;

                this.changeDetectorRef.markForCheck();
                this.scheduleAlertDismiss();
            }
        });
    }

    private focusFirstInvalid(): void {
        const fields: ContactField[] = ['name', 'email', 'subject', 'message'];
        const firstInvalid = fields.find(field => this.contactForm.controls[field].invalid);

        if (!firstInvalid) {
            return;
        }

        document.getElementById(`contact-${firstInvalid}`)?.focus();
    }

    private scheduleAlertDismiss(): void {
        this.clearAlertTimers();

        const reducedMotion = this.prefersReducedMotion();

        this.alertHideTimeout = setTimeout(() => {
            if (reducedMotion) {
                this.dismissAlert();
                return;
            }

            this.alertClosing = true;
            this.changeDetectorRef.markForCheck();

            this.alertCloseTimeout = setTimeout(() => {
                this.dismissAlert();
            }, ALERT_EXIT_MS);
        }, ALERT_VISIBLE_MS);
    }

    private dismissAlert(): void {
        this.submitted = false;
        this.error = false;
        this.alertClosing = false;
        this.changeDetectorRef.markForCheck();
    }

    private clearAlertTimers(): void {
        if (this.alertHideTimeout !== null) {
            clearTimeout(this.alertHideTimeout);
            this.alertHideTimeout = null;
        }

        if (this.alertCloseTimeout !== null) {
            clearTimeout(this.alertCloseTimeout);
            this.alertCloseTimeout = null;
        }
    }

    private prefersReducedMotion(): boolean {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
}
