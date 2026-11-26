import { useCallback, useEffect, useRef, useState } from 'react';
import { navigation } from '@portfolio/data';
import type { TranslationKey } from '@portfolio/types';
import useLanguage from '../../providers/language/useLanguage';
import useTheme from '../../providers/theme/useTheme';
import MobileMenu from './mobile-menu/MobileMenu';

const navigationItems = [...navigation.items].sort((a, b) => a.order - b.order);
const angularAppUrl = import.meta.env.DEV ? 'http://localhost:4200/angular/' : '/angular/';

function Navbar() {
    const { language, translations, changeLanguage } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const [isChangingLanguage, setIsChangingLanguage] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const languageChangeTimer = useRef<number | null>(null);

    const closeMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    useEffect(() => {
        return () => {
            if (languageChangeTimer.current !== null) {
                window.clearTimeout(languageChangeTimer.current);
            }
        };
    }, []);

    const getTranslationKey = (key: string): TranslationKey => key as TranslationKey;

    const handleLanguageChange = (newLanguage: 'fa' | 'en') => {
        if (language === newLanguage) return;

        if (languageChangeTimer.current !== null) {
            window.clearTimeout(languageChangeTimer.current);
        }

        setIsChangingLanguage(true);

        languageChangeTimer.current = window.setTimeout(() => {
            changeLanguage(newLanguage);
            setIsChangingLanguage(false);
            languageChangeTimer.current = null;
        }, 200);
    };

    return (
        <>
            <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200/80 border-b-gray-300 bg-white/80 px-3 py-1 shadow-[0_0_40px_rgba(59,130,246,0.08)] backdrop-blur-xl transition-all duration-500 ease-in-out dark:border-b-white/50 dark:border-b-[#1A2744] dark:bg-[#050816]/60 lg:py-0">
                <a href="#home">
                    <img className="h-auto w-23 md:w-23 lg:w-25 xl:w-30" width="240" height="120" src="/assets/images/Logo.webp" alt={translations.common.logoAlt} />
                </a>
                <div className={`hidden transition-all duration-500 ease-in-out lg:block ${isChangingLanguage ? 'opacity-0' : 'opacity-100'}`}>
                    <ul className="flex h-full lg:gap-x-3 xl:gap-x-6">
                        {navigationItems.map((item) => (
                            <li key={item.key} className="group relative flex h-19 items-end">
                                <a href={item.href} className="flex h-full items-end pb-5 text-lg font-normal text-gray-700 transition-all duration-300 group-hover:text-violet-600 dark:text-white">
                                    {translations.navigation[getTranslationKey(item.key)]}
                                </a>
                                <span className="absolute inset-inline-start-0 -bottom-0.5 h-1 w-0 rounded-full bg-violet-600 transition-all duration-300 group-hover:w-full" />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="hidden lg:flex lg:gap-x-3 xl:gap-x-6">
                    <div className="flex items-center justify-center gap-1 rounded-xl border border-black/10 bg-black/5 backdrop-blur dark:border-white/10 dark:bg-white/5 lg:h-11 lg:w-33 lg:px-2 xl:h-12 xl:w-40">
                        <span aria-label="React" aria-current="page" title="React - Current version" className="relative flex cursor-default items-center justify-center rounded-lg bg-cyan-400/10 text-[#61DAFB] shadow-[0_0_16px_rgba(97,218,251,0.18)] transition-all duration-300 after:absolute after:-bottom-1.5 after:left-1/2 after:size-1.5 after:-translate-x-1/2 after:rounded-full after:bg-[#61DAFB] after:shadow-[0_0_8px_rgba(97,218,251,0.8)] after:content-[''] lg:size-8 xl:size-10">
                            <svg className="drop-shadow-[0_0_8px_rgba(97,218,251,0.45)] lg:size-7 xl:size-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 600 600" aria-hidden="true">
                                <path fill="#00D8FF" d="M493.3 206.1q-9.3-3.2-19.3-6l3-13.2c14.6-71 5-128.2-27.6-147-31.3-18-82.5.7-134.2 45.7q-7.5 6.6-15 13.7l-9.9-9.1c-54.1-48.1-108.5-68.4-141-49.5-31.3 18-40.6 71.8-27.4 139q1.8 9.8 4.4 20-11.5 3.2-22.2 7C40.6 228.6 0 263.4 0 299.4c0 37.2 43.6 74.5 109.7 97q7.9 2.8 16.2 5.2-2.7 11-4.7 21.4c-12.5 66-2.7 118.6 28.5 136.5 32.2 18.6 86.2-.5 138.9-46.5q6.2-5.4 12.5-11.5 8.1 7.8 16.2 14.8c51 43.8 101.4 61.6 132.5 43.5 32.2-18.6 42.7-75 29.1-143.6q-1.5-7.9-3.6-16l11.2-3.5C555.2 374 600 337.2 600 299.5c0-36.1-41.9-71-106.7-93.4m-14.9 166.4-10 3.1q-11.7-36.2-30.5-76a601 601 0 0 0 29.2-74.9q9.3 2.7 17.9 5.6c55.5 19.2 89.4 47.4 89.4 69.2 0 23.2-36.6 53.3-96 73m-24.6 48.8a217 217 0 0 1 2.8 79.2c-3.5 19.3-10.7 32.1-19.6 37.2-19 11-59.3-3.2-103-40.8q-7.5-6.5-15-13.7 25.4-27.9 50.3-63.9c29-2.6 56.4-6.8 81.2-12.5zM204.6 536c-18.5 6.5-33.2 6.7-42.1 1.5-19-10.9-26.8-53-16-109.5q1.7-9.8 4.3-20a603 603 0 0 0 80.8 11.7 624 624 0 0 0 51.6 63.7q-5.8 5.5-11.5 10.5a217 217 0 0 1-67.1 42M118 372.3a217 217 0 0 1-70-37.1c-14.9-12.8-22.4-25.4-22.4-35.7 0-21.9 32.6-49.7 87-68.7q9.8-3.4 20.6-6.5 11.3 37 29.2 75.8c-12 26.2-22 52.2-29.6 76.9q-7.5-2.2-14.8-4.7M147 175c-11.3-57.7-3.8-101.1 15-112 20.1-11.7 64.5 4.9 111.3 46.4l9 8.3a614 614 0 0 0-51 63.3 626 626 0 0 0-80.2 12.4q-2.3-9.3-4-18.4m258.8 63.9q-9-15.5-18.2-30 28.8 3.6 54.7 9.5A548 548 0 0 1 423 270a892 892 0 0 0-17.3-31.2M300.3 136a548 548 0 0 1 35.3 42.6 755 755 0 0 0-71 0 566 566 0 0 1 35.7-42.6M194 239a757 757 0 0 0-17 31 566 566 0 0 1-19-52q25.6-5.8 54.4-9.3Q203 223.5 194 239m19 153a545 545 0 0 1-55.4-8.9 576 576 0 0 1 19.5-53 754 754 0 0 0 35.8 62m87.9 72.7a576 576 0 0 1-36.1-43.2 895 895 0 0 0 71.3 0 545 545 0 0 0-35.2 43.2m122.3-135.5q12 27.5 20.2 52.8-26.2 6-56 9.5a896 896 0 0 0 35.8-62.3m-39.6 19q-14 24.4-28.8 46.5a772 772 0 0 1-109.2.2 727 727 0 0 0-55-94.9 720 720 0 0 1 54.6-94.7 726 726 0 0 1 109.4 0 772 772 0 0 0 54.8 94.3q-11.7 24.2-25.8 48.6m53-286.2c20 11.6 27.8 58.3 15.2 119.6l-2.7 12a614 614 0 0 0-80.2-12.8 602 602 0 0 0-50.8-63.3l14-12.6c44.3-38.6 85.7-53.8 104.6-43M300 245.9a53.6 53.6 0 1 1 0 107.2 53.6 53.6 0 0 1 0-107.2" />
                            </svg>
                        </span>
                        <span className="h-6 w-px bg-black/20 dark:bg-white/20" aria-hidden="true" />
                        <span aria-label="Next.js" aria-disabled="true" title="Next.js - Coming soon" className="flex cursor-not-allowed items-center justify-center rounded-lg text-black/40 opacity-40 dark:text-white/40 lg:size-8 xl:size-10">
                            <svg className="lg:size-7 xl:size-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 600 600" aria-hidden="true">
                                <path fill="currentColor" d="M466.6 549.5A300.1 300.1 0 0 1 0 300C0 134.4 134.4 0 300 0a300.1 300.1 0 0 1 198.3 525L230.5 180H180v239.9h40.4V231.3zM383.3 336l40 51.5V180h-40z" />
                            </svg>
                        </span>
                        <span className="h-6 w-px bg-black/20 dark:bg-white/20" aria-hidden="true" />
                        <a href={angularAppUrl} aria-label="Angular" title="Angular" className="group flex items-center justify-center rounded-lg text-[#DD0031] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-red-500/10 hover:shadow-[0_0_20px_rgba(221,0,49,0.35)] lg:size-8 xl:size-10">
                            <svg className="transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(221,0,49,0.8)] lg:size-7 xl:size-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 600 600" aria-hidden="true">
                                <path fill="url(#react-navbar-angular-gradient-main)" d="M583.4 100 563 421.4 367.3 0zM448 515.6 300 600l-147.9-84.4 30.1-72.9h235.6zM300 160l77.5 188.3h-155zM36.8 421.4 16.6 100 232.7 0z" />
                                <path fill="url(#react-navbar-angular-gradient-light)" d="M583.4 100 563 421.4 367.3 0zM448 515.6 300 600l-147.9-84.4 30.1-72.9h235.6zM300 160l77.5 188.3h-155zM36.8 421.4 16.6 100 232.7 0z" />
                                <defs>
                                    <linearGradient id="react-navbar-angular-gradient-main" x1="14227.8" x2="55401" y1="54557.5" y2="34991.3" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#E40035" />
                                        <stop offset=".2" stopColor="#F60A48" />
                                        <stop offset=".4" stopColor="#F20755" />
                                        <stop offset=".5" stopColor="#DC087D" />
                                        <stop offset=".7" stopColor="#9717E7" />
                                        <stop offset="1" stopColor="#6C00F5" />
                                    </linearGradient>
                                    <linearGradient id="react-navbar-angular-gradient-light" x1="12409.1" x2="40564.6" y1="7234.5" y2="39352.1" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#FF31D9" />
                                        <stop offset="1" stopColor="#FF5BE1" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </a>
                    </div>
                    <div className="flex items-center justify-center gap-1 rounded-xl border border-black/10 bg-black/5 p-1 backdrop-blur transition-all duration-300 dark:border-white/10 dark:bg-white/5 lg:h-11 lg:w-20 xl:h-12 xl:w-23" role="group" aria-label={translations.common.language}>
                        <button type="button" onClick={() => handleLanguageChange('en')} className={`cursor-pointer rounded-lg text-sm font-semibold transition-all duration-300 lg:size-9 xl:size-10 ${language === 'en' ? 'bg-violet-600 text-white shadow-lg' : 'text-gray-700 dark:text-gray-300'}`} aria-pressed={language === 'en'} aria-label={translations.language.english}>
                            EN
                        </button>
                        <button type="button" onClick={() => handleLanguageChange('fa')} className={`cursor-pointer rounded-lg text-sm font-semibold transition-all duration-300 lg:size-9 xl:size-10 ${language === 'fa' ? 'bg-violet-600 text-white shadow-lg' : 'text-gray-700 dark:text-gray-300'}`} aria-pressed={language === 'fa'} aria-label={translations.language.persian}>
                            FA
                        </button>
                    </div>
                    <button type="button" onClick={toggleTheme} className="flex cursor-pointer items-center justify-center rounded-xl border border-black/10 bg-black/5 backdrop-blur transition hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 lg:size-11 xl:size-12" aria-label={theme === 'light' ? translations.theme.switchToDark : translations.theme.switchToLight} aria-pressed={theme === 'dark'}>
                        {theme === 'light' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-slate-700 lg:size-5 xl:size-6" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true">
                                <path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-amber-500 lg:size-5 xl:size-6" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true">
                                <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0-8-16Z" />
                            </svg>
                        )}
                    </button>
                </div>
                <button type="button" id="mobile-menu-button" onClick={() => setIsMobileMenuOpen(true)} className="flex size-11 items-center justify-center rounded-xl text-violet-600 transition-all duration-300 hover:scale-110 lg:hidden" aria-label={translations.common.openMenu} aria-expanded={isMobileMenuOpen} aria-controls="mobile-menu-panel">
                    <svg className="size-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                        <path d="M4 6h16" />
                        <path d="M4 12h16" />
                        <path d="M4 18h16" />
                    </svg>
                </button>
            </nav>
            <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} angularAppUrl={angularAppUrl} />
        </>
    );
}

export default Navbar;