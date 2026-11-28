import { useEffect, useRef } from 'react';
import { navigation } from '@portfolio/data';
import type { TranslationKey } from '@portfolio/types';
import useLanguage from '../../../providers/language/useLanguage';
import useTheme from '../../../providers/theme/useTheme';
import './mobile-menu.css';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    angularAppUrl: string;
}

const navigationItems = [...navigation.items].sort((a, b) => a.order - b.order);

function NavigationIcon({ name }: { name: string }) {
    const common = {
        className: 'size-7',
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'currentColor',
        viewBox: '0 0 256 256',
        'aria-hidden': true as const
    };

    switch (name) {
        case 'home':
            return <svg {...common}><path d="M240,208H224V136l2.34,2.34A8,8,0,0,0,237.66,127L139.31,28.68a16,16,0,0,0-22.62,0L18.34,127a8,8,0,0,0,11.32,11.31L32,136v72H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM48,120l80-80,80,80v88H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48Zm96,88H112V160h32Z" /></svg>;
        case 'about':
            return <svg {...common}><path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z" /></svg>;
        case 'skills':
            return <svg {...common}><path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z" /></svg>;
        case 'experience':
            return <svg {...common}><path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,72v41.61A184,184,0,0,1,128,136a184.07,184.07,0,0,1-88-22.38V72Zm0,128H40V131.64A200.19,200.19,0,0,0,128,152a200.25,200.25,0,0,0,88-20.37V200ZM104,112a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H112A8,8,0,0,1,104,112Z" /></svg>;
        case 'projects':
            return <svg {...common}><path d="M216,72H131.31L104,44.69A15.86,15.86,0,0,0,92.69,40H40A16,16,0,0,0,24,56V200.62A15.4,15.4,0,0,0,39.38,216H216.89A15.13,15.13,0,0,0,232,200.89V88A16,16,0,0,0,216,72ZM40,56H92.69l16,16H40ZM216,200H40V88H216Z" /></svg>;
        case 'certificates':
            return <svg {...common}><path d="M216,96A88,88,0,1,0,72,163.83V240a8,8,0,0,0,11.58,7.16L128,225l44.43,22.21A8.07,8.07,0,0,0,176,248a8,8,0,0,0,8-8V163.83A87.85,87.85,0,0,0,216,96ZM56,96a72,72,0,1,1,72,72A72.08,72.08,0,0,1,56,96ZM168,227.06l-36.43-18.21a8,8,0,0,0-7.16,0L88,227.06V174.37a87.89,87.89,0,0,0,80,0ZM128,152A56,56,0,1,0,72,96,56.06,56.06,0,0,0,128,152Zm0-96A40,40,0,1,1,88,96,40,40,0,0,1,128,56Z" /></svg>;
        case 'contact':
            return <svg {...common}><path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z" /></svg>;
        default:
            return null;
    }
}

function CloseIcon() {
    return (
        <svg className="size-8" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
        </svg>
    );
}

function MobileMenu({ isOpen, onClose, angularAppUrl }: MobileMenuProps) {
    const { language, translations, changeLanguage } = useLanguage();
    const { theme, setTheme } = useTheme();
    const panelRef = useRef<HTMLElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const previouslyFocusedRef = useRef<HTMLElement | null>(null);
    const isRtl = language === 'fa';
    const getTranslationKey = (key: string): TranslationKey => key as TranslationKey;

    useEffect(() => {
        if (!isOpen) return;

        previouslyFocusedRef.current = document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const focusFrame = window.requestAnimationFrame(() => {
            closeButtonRef.current?.focus();
        });

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                onClose();
                return;
            }

            if (event.key !== 'Tab' || !panelRef.current) return;

            const focusableElements = Array.from(
                panelRef.current.querySelectorAll<HTMLElement>(
                    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
                )
            ).filter(
                (element) =>
                    !element.hasAttribute('disabled') &&
                    element.getAttribute('aria-hidden') !== 'true'
            );

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (!firstElement || !lastElement) {
                event.preventDefault();
                return;
            }

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            window.cancelAnimationFrame(focusFrame);
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = previousOverflow;
            previouslyFocusedRef.current?.focus();
            previouslyFocusedRef.current = null;
        };
    }, [isOpen, onClose]);

    const handleLanguageChange = (newLanguage: 'fa' | 'en') => {
        if (language !== newLanguage) changeLanguage(newLanguage);
    };

    return (
        <div
            className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-500 lg:hidden ${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
            aria-hidden={!isOpen}
            inert={!isOpen}
            onClick={onClose}
        >
            <aside
                ref={panelRef}
                id="mobile-menu-panel"
                role="dialog"
                aria-modal="true"
                aria-label={translations.common.menu}
                onClick={(event) => event.stopPropagation()}
                className={`absolute top-0 h-full w-[88%] max-w-[420px] overflow-y-auto bg-white p-6 shadow-2xl shadow-violet-500/10 transform transition-transform duration-500 ease-out dark:bg-[#050816] border-black/10 dark:border-white/10 ${isRtl ? 'left-0 border-r' : 'right-0 border-l'} ${isOpen ? 'translate-x-0' : isRtl ? '-translate-x-full' : 'translate-x-full'}`}
            >
                <div className="flex items-center justify-between">
                    <a href="#home" onClick={onClose}>
                        <img className="w-25 h-auto" src="/assets/images/Logo.webp" width="240" height="120" alt={translations.common.logoAlt} />
                    </a>
                    <button
                        ref={closeButtonRef}
                        type="button"
                        onClick={onClose}
                        aria-label={translations.common.closeMenu}
                        className="flex items-center justify-center size-10 text-gray-700 dark:text-white/80 hover:text-black dark:hover:text-white transition-all duration-300 hover:scale-110"
                    >
                        <CloseIcon />
                    </button>
                </div>

                <div className="mt-10 flex items-center gap-5">
                    <div className="relative size-28 shrink-0 rounded-full p-[2px]">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 via-blue-500 to-violet-600 animate-border-spin blur-[2px]" />
                        <div className="relative size-full rounded-full bg-white dark:bg-[#050816]">
                            <img
                                src="/assets/images/My photo offcanvas.webp"
                                width="256"
                                height="256"
                                alt={translations.profile.name}
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="min-w-0">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {translations.profile.name}
                        </h2>
                        <p className="mt-1 text-gray-500 dark:text-gray-400">
                            {translations.profile.role}
                        </p>
                        <div className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1 text-sm text-gray-600 dark:text-gray-300">
                            <span className="size-3 rounded-full bg-green-400 animate-pulse mb-1" aria-hidden="true" />
                            {translations.profile.availability}
                        </div>
                    </div>
                </div>

                <div className="my-8 h-px bg-black/10 dark:bg-white/20" />

                <span className="text-base text-violet-500">
                    {translations.common.menu}
                </span>
                <div className="mt-3 space-y-2">
                    {navigationItems.map((item) => (
                        <a
                            key={item.key}
                            href={item.href}
                            onClick={onClose}
                            className="flex items-center w-full gap-4 rounded-xl py-3 text-gray-800 dark:text-white transition-all duration-300 hover:bg-violet-600/10"
                        >
                            <span className="text-violet-500" aria-hidden="true">
                                <NavigationIcon name={item.key} />
                            </span>
                            <span className="text-base mt-1 text-gray-800 dark:text-white">
                                {translations.navigation[getTranslationKey(item.key)]}
                            </span>
                        </a>
                    ))}
                </div>

                <div className="my-8 h-px bg-black/10 dark:bg-white/20" />

                <span className="text-base text-violet-500">
                    {translations.common.language}
                </span>
                <div className="mt-5 flex gap-3">
                    <button
                        type="button"
                        onClick={() => handleLanguageChange('en')}
                        className={`flex flex-1 items-center justify-center py-3 rounded-xl border bg-black/5 dark:bg-white/5 backdrop-blur text-gray-800 dark:text-white transition-all duration-300 hover:bg-violet-600/10 ${language === 'en' ? 'border-violet-600' : 'border-white/10'}`}
                        aria-pressed={language === 'en'}
                    >
                        <span className="me-3">EN</span>
                        <span>{translations.language.english}</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => handleLanguageChange('fa')}
                        className={`flex flex-1 items-center justify-center py-3 rounded-xl border bg-black/5 dark:bg-white/5 backdrop-blur text-gray-800 dark:text-white transition-all duration-300 hover:bg-violet-600/10 ${language === 'fa' ? 'border-violet-600' : 'border-white/10'}`}
                        aria-pressed={language === 'fa'}
                    >
                        <span className="me-3">FA</span>
                        <span className="font-persian">{translations.language.persian}</span>
                    </button>
                </div>

                <div className="my-8 h-px bg-black/10 dark:bg-white/20" />

                <span className="text-base text-violet-500">
                    {translations.common.theme}
                </span>
                <div className="mt-5 flex gap-3">
                    <button
                        type="button"
                        onClick={() => setTheme('light')}
                        className={`flex flex-1 items-center justify-center gap-2 py-3 rounded-xl border bg-black/5 dark:bg-white/5 backdrop-blur text-gray-800 dark:text-gray-200 transition-all duration-300 ${theme === 'light' ? 'border-violet-500' : 'border-black/10 dark:border-white/10'}`}
                        aria-pressed={theme === 'light'}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-5 text-amber-500" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true">
                            <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z" />
                        </svg>
                        <span>{translations.theme.light}</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setTheme('dark')}
                        className={`flex flex-1 items-center justify-center gap-2 py-3 rounded-xl border text-gray-800 dark:text-white bg-black/5 dark:bg-white/5 backdrop-blur transition-all duration-300 ${theme === 'dark' ? 'border-violet-500' : 'border-black/10 dark:border-white/10'}`}
                        aria-pressed={theme === 'dark'}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-5 text-slate-700 dark:text-slate-200" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true">
                            <path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z" />
                        </svg>
                        <span>{translations.theme.dark}</span>
                    </button>
                </div>

                <div className="my-8 h-px bg-black/10 dark:bg-white/20" />

                <span className="text-base text-violet-500">
                    {translations.common.frameworks}
                </span>
                <div className="mt-5 flex gap-3">
                    <span
                        title="React - نسخه فعلی"
                        className="relative flex h-14 flex-1 items-center justify-center rounded-xl border border-cyan-400/50 bg-cyan-400/10 backdrop-blur text-[#61DAFB] shadow-[0_0_20px_rgba(97,218,251,0.15)] cursor-default after:absolute after:bottom-1 after:size-1.5 after:rounded-full after:bg-cyan-400 after:shadow-[0_0_8px_rgba(97,218,251,0.8)]"
                    >
                        <span className="sr-only">React - نسخه فعلی</span>
                        <svg className="size-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <g stroke="currentColor" strokeWidth="1.2">
                                <ellipse cx="12" cy="12" rx="10.5" ry="4" />
                                <ellipse cx="12" cy="12" rx="10.5" ry="4" transform="rotate(60 12 12)" />
                                <ellipse cx="12" cy="12" rx="10.5" ry="4" transform="rotate(120 12 12)" />
                            </g>
                            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                        </svg>
                    </span>
                    <span
                        title="Next.js - به‌زودی"
                        className="flex h-14 flex-1 items-center justify-center rounded-xl border backdrop-blur text-slate-400 dark:text-slate-500 opacity-40 cursor-not-allowed bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10"
                    >
                        <span className="sr-only">Next.js - به‌زودی</span>
                        <svg className="size-8" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 600 600" aria-hidden="true">
                            <path d="M466.6 549.5A300.1 300.1 0 0 1 0 300C0 134.4 134.4 0 300 0a300.1 300.1 0 0 1 198.3 525L230.5 180H180v239.9h40.4V231.3zM383.3 336l40 51.5V180h-40z" />
                        </svg>
                    </span>
                    <a
                        href={angularAppUrl}
                        aria-label="Angular"
                        title="Angular"
                        className={`flex h-14 flex-1 items-center justify-center rounded-xl border backdrop-blur text-[#C300E5] transition-all duration-300 hover:border-red-500/50 hover:bg-red-500/10 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(221,0,49,0.35)] ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-gray-200'}`}
                    >
                        <svg className="size-8 transition-transform duration-300 hover:scale-110" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 600 600" aria-hidden="true">
                            <path d="M583.4 100 563 421.4 367.3 0zM448 515.6 300 600l-147.9-84.4 30.1-72.9h235.6zM300 160l77.5 188.3h-155zM36.8 421.4 16.6 100 232.7 0z" />
                        </svg>
                    </a>
                </div>
            </aside>
        </div>
    );
}

export default MobileMenu;