import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LanguageService } from '../../services/language.service';

type ContactField = 'name' | 'email' | 'subject' | 'message';
type ContactAlert = 'success' | 'error' | null;

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

    private readonly formspreeUrl = 'https://formspree.io/f/xeaobvrb';
    private alertHideTimeout: ReturnType<typeof setTimeout> | null = null;
    private alertCloseTimeout: ReturnType<typeof setTimeout> | null = null;

    readonly fields: ContactField[] = ['name', 'email', 'subject', 'message'];

    readonly contactForm = this.formBuilder.nonNullable.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        subject: ['', Validators.required],
        message: ['', Validators.required]
    });

    submitting = false;
    alert: ContactAlert = null;
    alertClosing = false;

    constructor() {
        this.destroyRef.onDestroy(() => this.clearAlertTimers());
    }

    toLocalePhone(phone: string): string {
        return this.languageService.toLocaleNumber(phone);
    }

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

    onSubmit(): void {
        if (this.submitting) {
            return;
        }

        if (this.contactForm.invalid) {
            this.contactForm.markAllAsTouched();
            this.focusFirstInvalid();
            return;
        }

        this.submitting = true;
        this.alert = null;
        this.alertClosing = false;
        this.clearAlertTimers();

        this.http.post(
            this.formspreeUrl,
            this.contactForm.getRawValue(),
            {
                headers: {
                    Accept: 'application/json'
                }
            }
        ).subscribe({
            next: () => {
                this.submitting = false;
                this.contactForm.reset();
                this.showAlert('success');
            },
            error: () => {
                this.submitting = false;
                this.showAlert('error');
            }
        });
    }

    private focusFirstInvalid(): void {
        const firstInvalid = this.fields.find(
            field => this.contactForm.controls[field].invalid
        );

        if (firstInvalid) {
            document.getElementById(`contact-${firstInvalid}`)?.focus();
        }
    }

    private showAlert(type: Exclude<ContactAlert, null>): void {
        this.alert = type;
        this.alertClosing = false;
        this.changeDetectorRef.markForCheck();
        this.scheduleAlertDismiss();
    }

    private scheduleAlertDismiss(): void {
        this.clearAlertTimers();

        const reducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

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
        this.alert = null;
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
}