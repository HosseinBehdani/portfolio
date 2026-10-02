import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { LanguageService } from '../../services/language.service';

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

    toLocalePhone(phone: string): string {
        return this.languageService.language() === 'fa'
            ? phone.replace(/\d/g, digit => '۰۱۲۳۴۵۶۷۸۹'[+digit])
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

    onSubmit(): void {
        if (this.contactForm.invalid || this.submitting) {
            this.contactForm.markAllAsTouched();
            return;
        }

        this.submitting = true;
        this.submitted = false;
        this.error = false;
        this.alertClosing = false;

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

                setTimeout(() => {
                    this.alertClosing = true;

                    this.changeDetectorRef.markForCheck();

                    setTimeout(() => {
                        this.submitted = false;
                        this.error = false;
                        this.alertClosing = false;

                        this.changeDetectorRef.markForCheck();
                    }, 400);
                }, 5000);
            },
            error: () => {
                this.submitting = false;
                this.submitted = false;
                this.error = true;
                this.alertClosing = false;

                this.changeDetectorRef.markForCheck();

                setTimeout(() => {
                    this.alertClosing = true;

                    this.changeDetectorRef.markForCheck();

                    setTimeout(() => {
                        this.submitted = false;
                        this.error = false;
                        this.alertClosing = false;

                        this.changeDetectorRef.markForCheck();
                    }, 400);
                }, 5000);
            }
        });
    }
}