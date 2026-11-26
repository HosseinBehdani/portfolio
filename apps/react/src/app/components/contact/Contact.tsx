import './contact.css';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import useLanguage from '../../providers/language/useLanguage';

type ContactField = 'name' | 'email' | 'subject' | 'message';
type ContactValues = Record<ContactField, string>;
type ContactAlert = 'success' | 'error' | null;

const initialValues: ContactValues = {
    name: '',
    email: '',
    subject: '',
    message: ''
};

const fields: ContactField[] = ['name', 'email', 'subject', 'message'];
const formspreeUrl = 'https://formspree.io/f/xeaobvrb';
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
    const { translations, toLocaleNumber } = useLanguage();
    const copy = translations.contact;

    const [values, setValues] = useState<ContactValues>(initialValues);
    const [interacted, setInteracted] = useState<Record<ContactField, boolean>>({
        name: false,
        email: false,
        subject: false,
        message: false
    });
    const [submitting, setSubmitting] = useState(false);
    const [alert, setAlert] = useState<ContactAlert>(null);
    const [alertClosing, setAlertClosing] = useState(false);

    const isInvalid = (field: ContactField) => {
        if (!interacted[field]) {
            return false;
        }

        if (!values[field].trim()) {
            return true;
        }

        return field === 'email' && !emailPattern.test(values.email.trim());
    };

    const fieldError = (field: ContactField) => {
        if (!values[field].trim()) {
            return copy.requiredError;
        }

        if (field === 'email' && !emailPattern.test(values.email.trim())) {
            return copy.emailError;
        }

        return '';
    };

    const updateField = (field: ContactField, value: string) => {
        setValues(previous => ({ ...previous, [field]: value }));
        setInteracted(previous => ({ ...previous, [field]: true }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const invalidField = fields.find(field => {
            if (!values[field].trim()) {
                return true;
            }

            return field === 'email' && !emailPattern.test(values.email.trim());
        });

        if (invalidField) {
            setInteracted({
                name: true,
                email: true,
                subject: true,
                message: true
            });
            document.getElementById(`contact-${invalidField}`)?.focus();
            return;
        }

        if (submitting) {
            return;
        }

        setSubmitting(true);
        setAlert(null);
        setAlertClosing(false);

        try {
            const response = await fetch(formspreeUrl, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });

            if (!response.ok) {
                throw new Error('Contact form submission failed');
            }

            setValues(initialValues);
            setInteracted({
                name: false,
                email: false,
                subject: false,
                message: false
            });
            setAlert('success');
        } catch {
            setAlert('error');
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        if (!alert) {
            return;
        }

        let closeTimeout: number | undefined;

        const hideTimeout = window.setTimeout(() => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                setAlert(null);
                return;
            }

            setAlertClosing(true);

            closeTimeout = window.setTimeout(() => {
                setAlert(null);
                setAlertClosing(false);
            }, 400);
        }, 5000);

        return () => {
            window.clearTimeout(hideTimeout);

            if (closeTimeout !== undefined) {
                window.clearTimeout(closeTimeout);
            }
        };
    }, [alert]);

    return (
        <>
            <div className="p-3 rounded-md border-2 border-[#12345A] dark:border-[#1D4F7A] scroll-mt-25 lg:scroll-mt-22" id="contact" data-aos="fade-up">
                <div className="flex items-center gap-x-1">
                    <span className="size-4 lg:size-5 shrink-0 rounded-full bg-purple-500" aria-hidden="true"></span>
                    <h2 id="contact-heading" className="pt-1 rtl:pt-0 text-xl sm:text-xl md:text-xl lg:text-2xl font-bold text-slate-900 dark:text-white">
                        {copy.title}
                    </h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-5 py-4">
                    <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center size-10 shrink-0 rounded-md border border-[#12345A] dark:border-[#1D4F7A]" aria-hidden="true">
                                <svg viewBox="0 0 24 24" className="size-5 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                                    <path d="m3 7 9 6 9-6"></path>
                                </svg>
                            </span>
                            <div className="min-w-0">
                                <span className="block text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                                    {copy.email}
                                </span>
                                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=behdanihosain@gmail.com" target="_blank" rel="noopener noreferrer" className="block truncate text-sm sm:text-base font-medium text-slate-700 dark:text-white">
                                    behdanihosain@gmail.com
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 mt-4">
                            <span className="flex items-center justify-center size-10 shrink-0 rounded-md border border-[#12345A] dark:border-[#1D4F7A]" aria-hidden="true">
                                <svg viewBox="0 0 24 24" className="size-5 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.79 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                            </span>
                            <div>
                                <span className="block text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                                    {copy.phone}
                                </span>
                                <a href="tel:+989038025430" dir="ltr" className="block text-sm sm:text-base font-medium text-slate-700 dark:text-white">
                                    {toLocaleNumber('09038025430')}
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 mt-4">
                            <span className="flex items-center justify-center size-10 shrink-0 rounded-md border border-[#12345A] dark:border-[#1D4F7A]" aria-hidden="true">
                                <svg viewBox="0 0 24 24" className="size-5 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"></path>
                                    <circle cx="12" cy="10" r="2.5"></circle>
                                </svg>
                            </span>
                            <div>
                                <span className="block text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                                    {copy.location}
                                </span>
                                <span className="block text-sm sm:text-base font-medium text-slate-700 dark:text-white">
                                    {copy.locationValue}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 mt-4">
                            <span className="flex items-center justify-center size-10 shrink-0 rounded-md border border-[#12345A] dark:border-[#1D4F7A]" aria-hidden="true">
                                <svg viewBox="0 0 24 24" className="size-5 text-purple-500" fill="currentColor">
                                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.3V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.48v6.27ZM5.28 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM3.5 20.45h3.56V8.99H3.5v11.46Z"></path>
                                </svg>
                            </span>
                            <div className="min-w-0">
                                <span className="block text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                                    {copy.linkedin}
                                </span>
                                <a href="https://www.linkedin.com/in/hossein-behdani" target="_blank" rel="noopener noreferrer" className="block truncate text-sm sm:text-base font-medium text-slate-700 dark:text-white">
                                    Hossein Behdani
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 mt-4">
                            <span className="flex items-center justify-center size-10 shrink-0 rounded-md border border-[#12345A] dark:border-[#1D4F7A]" aria-hidden="true">
                                <svg viewBox="0 0 24 24" className="size-5 text-purple-500" fill="currentColor">
                                    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.19-3.37-1.19-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.84c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7.98 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"></path>
                                </svg>
                            </span>
                            <div className="min-w-0">
                                <span className="block text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                                    {copy.github}
                                </span>
                                <a href="https://github.com/HosseinBehdani" target="_blank" rel="noopener noreferrer" className="block truncate text-sm sm:text-base font-medium text-slate-700 dark:text-white">
                                    Hossein Behdani
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2 sm:gap-3 w-full" noValidate aria-labelledby="contact-heading" aria-busy={submitting}>
                            <div className="col-span-1">
                                <label htmlFor="contact-name" className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
                                    {copy.nameLabel}
                                </label>
                                <input
                                    id="contact-name"
                                    type="text"
                                    name="name"
                                    value={values.name}
                                    onChange={event => updateField('name', event.target.value)}
                                    onBlur={() => setInteracted(previous => ({ ...previous, name: true }))}
                                    autoComplete="name"
                                    required
                                    placeholder={isInvalid('name') ? fieldError('name') : copy.namePlaceholder}
                                    aria-invalid={isInvalid('name')}
                                    className={`contact-field w-full px-3 py-2.5 rounded-md border border-[#12345A] dark:border-[#1D4F7A] bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400${isInvalid('name') ? ' contact-field-invalid contact-field-error-placeholder' : ''}`}
                                />
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="contact-email" className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
                                    {copy.emailLabel}
                                </label>
                                <input
                                    id="contact-email"
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={event => updateField('email', event.target.value)}
                                    onBlur={() => setInteracted(previous => ({ ...previous, email: true }))}
                                    autoComplete="email"
                                    inputMode="email"
                                    required
                                    placeholder={isInvalid('email') ? fieldError('email') : copy.emailPlaceholder}
                                    aria-invalid={isInvalid('email')}
                                    className={`contact-field w-full px-3 py-2.5 rounded-md border border-[#12345A] dark:border-[#1D4F7A] bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400${isInvalid('email') ? ' contact-field-invalid contact-field-error-placeholder' : ''}`}
                                />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="contact-subject" className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
                                    {copy.subjectLabel}
                                </label>
                                <input
                                    id="contact-subject"
                                    type="text"
                                    name="subject"
                                    value={values.subject}
                                    onChange={event => updateField('subject', event.target.value)}
                                    onBlur={() => setInteracted(previous => ({ ...previous, subject: true }))}
                                    autoComplete="off"
                                    required
                                    placeholder={isInvalid('subject') ? fieldError('subject') : copy.subjectPlaceholder}
                                    aria-invalid={isInvalid('subject')}
                                    className={`contact-field w-full px-3 py-2.5 rounded-md border border-[#12345A] dark:border-[#1D4F7A] bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400${isInvalid('subject') ? ' contact-field-invalid contact-field-error-placeholder' : ''}`}
                                />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="contact-message" className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
                                    {copy.messageLabel}
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    rows={5}
                                    value={values.message}
                                    onChange={event => updateField('message', event.target.value)}
                                    onBlur={() => setInteracted(previous => ({ ...previous, message: true }))}
                                    required
                                    placeholder={isInvalid('message') ? fieldError('message') : copy.messagePlaceholder}
                                    aria-invalid={isInvalid('message')}
                                    className={`contact-field w-full resize-none px-3 py-2.5 rounded-md border border-[#12345A] dark:border-[#1D4F7A] bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400${isInvalid('message') ? ' contact-field-invalid contact-field-error-placeholder' : ''}`}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={submitting}
                                aria-busy={submitting}
                                className="contact-submit col-span-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-purple-600 text-sm lg:text-[15px] cursor-pointer font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {submitting ? copy.submitting : copy.sendMessage}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {alert && (
                <div
                    className={`contact-alert${alert === 'error' ? ' contact-alert-error' : ' contact-alert-success'}${alertClosing ? ' contact-alert-closing' : ''}`}
                    role={alert === 'error' ? 'alert' : 'status'}
                    aria-live={alert === 'error' ? 'assertive' : 'polite'}
                    aria-atomic="true"
                >
                    <span className="contact-alert-icon" aria-hidden="true">
                        {alert === 'success' ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="m5 12 4 4L19 6"></path>
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M12 8v4"></path>
                                <path d="M12 16h.01"></path>
                                <circle cx="12" cy="12" r="9"></circle>
                            </svg>
                        )}
                    </span>
                    <span className="contact-alert-message">
                        {alert === 'success' ? copy.successMessage : copy.errorMessage}
                    </span>
                    <span className="contact-alert-timer" aria-hidden="true"></span>
                </div>
            )}
        </>
    );
}