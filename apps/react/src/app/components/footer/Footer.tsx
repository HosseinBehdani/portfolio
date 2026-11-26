import './footer.css';
import useLanguage from '../../providers/language/useLanguage';

function Footer() {
    const { translations } = useLanguage();

    return (
        <footer className="border-t border-[#12345A]/70 dark:border-[#1D4F7A]/70 mt-3 lg:mt-0">
            <div className="px-3 lg:px-6 py-4 sm:py-3">
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1fr] gap-4 sm:gap-5 md:gap-6 items-center">
                    <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-3.5 md:gap-4">
                        <div className="shrink-0">
                            <img
                                src="/assets/images/Logo.webp"
                                alt={translations.common.logoAlt}
                                className="w-22 sm:w-23 md:w-25 lg:w-25 object-contain"
                                width="240"
                                height="120"
                            />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-[15px] sm:text-base md:text-[17px] font-bold text-slate-900 dark:text-white">
                                {translations.footer.role}
                            </h2>
                            <p className="mt-0.5 text-[12px] sm:text-[13px] md:text-[14px] text-slate-500 dark:text-slate-400">
                                {translations.footer.description}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <h3 className="text-[15px] sm:text-base md:text-[17px] lg:text-base font-semibold text-slate-700 dark:text-slate-300">
                            {translations.footer.techStack}
                        </h3>
                        <div className="flex items-center justify-center gap-2 sm:gap-2.5 md:gap-2.5 mt-2">
                            <a href="https://git-scm.com/" target="_blank" rel="noopener noreferrer" aria-label="Git" className="flex items-center justify-center size-10 rounded-md border border-[#12345A] dark:border-[#1D4F7A]">
                                <svg className="size-5 sm:size-6 text-[#F05032]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 600 600" aria-hidden="true">
                                    <path fill="currentColor" d="m588.7 273.3-262-262c-15-15-39.5-15-54.6 0l-54.4 54.4 69 69a45.9 45.9 0 0 1 58 58.5l66.6 66.5a46 46 0 1 1-27.5 26l-62-62v163.1q6.5 3.3 12 8.7a46 46 0 1 1-49.9-10V220.8a46 46 0 0 1-25-60.3l-68-68L11.3 272a38.6 38.6 0 0 0 0 54.6l262 262c15 15 39.5 15 54.6 0l260.8-260.8c15-15 15-39.5 0-54.6" />
                                </svg>
                            </a>

                            <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" aria-label="Tailwind CSS" className="flex items-center justify-center size-10 rounded-md border border-[#12345A] dark:border-[#1D4F7A]">
                                <svg className="size-5 sm:size-6 text-[#06B6D4]" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 600 600" aria-hidden="true">
                                    <path d="M300 120q-120 0-150 120 45-60 105-45c22.8 5.7 39.1 22.3 57.2 40.6C341.6 265.4 375.6 300 450 300q120 0 150-120-45 60-105 45c-22.8-5.7-39.1-22.3-57.2-40.6C408.4 154.6 374.4 120 300 120M150 300Q30 300 0 420q45-60 105-45c22.8 5.7 39.1 22.3 57.2 40.6C191.6 445.4 225.6 480 300 480q120 0 150-120-45 60-105 45c-22.8-5.7-39.1-22.3-57.2-40.6C258.4 334.4 224.4 300 150 300" />
                                </svg>
                            </a>

                            <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer" aria-label="TypeScript" className="flex items-center justify-center size-10 rounded-md border border-[#12345A] dark:border-[#1D4F7A]">
                                <svg className="size-5 sm:size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" aria-hidden="true">
                                    <path fill="#3178C6" d="M46.9 0H553c26 0 46.9 21 46.9 46.9V553c0 26-21 46.9-46.9 46.9H47C20.9 600 0 579 0 553.1V47C0 20.9 21 0 46.9 0" />
                                    <path fill="#fff" d="M352.8 469.9v64.7q15.8 8 37.3 12.1 21.6 4 45.5 4 23.3 0 44.2-4.4t36.8-14.6a75 75 0 0 0 25-26.7q9.2-16.5 9.2-40.8 0-17.6-5.3-30.8a72 72 0 0 0-15.2-23.6q-9.9-10.3-23.8-18.5a255 255 0 0 0-31.2-15.5 395 395 0 0 1-23-10.2 116 116 0 0 1-17.1-10.1 44 44 0 0 1-11-11 23 23 0 0 1-3.8-13q0-6.7 3.4-12 3.5-5.4 9.8-9.2a52 52 0 0 1 15.3-6q9.2-2.1 20.3-2.1a129 129 0 0 1 35.2 5q9 2.4 17.7 6.3t16 8.9v-60.5q-15-5.7-32.4-8.4t-40.2-2.7q-23 0-43.7 5a111 111 0 0 0-36.3 15.4q-15.8 10.6-24.8 26.8a79 79 0 0 0-9.1 39q0 28.8 16.7 49.3T419 421q13.3 5.5 24.9 10.7 11.5 5.3 20 11 8.3 5.5 13.2 12.3a25 25 0 0 1 1.8 26.8 27 27 0 0 1-9.2 9.3 51 51 0 0 1-15.4 6.2 93 93 0 0 1-21.6 2.2 123 123 0 0 1-80-29.5m-108-161.1H328v-53.3H96v53.3h82.8V546h66z" />
                                </svg>
                            </a>

                            <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" aria-label="React" className="flex items-center justify-center size-10 rounded-md border border-[#12345A] dark:border-[#1D4F7A]">
                                <svg
                                    className="size-5 sm:size-6 text-[#00BFFF]"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <circle cx="256" cy="256" r="45" fill="currentColor" />
                                    <g stroke="currentColor" strokeWidth="18" fill="none">
                                        <ellipse cx="256" cy="256" rx="220" ry="85" />
                                        <ellipse cx="256" cy="256" rx="220" ry="85" transform="rotate(60 256 256)" />
                                        <ellipse cx="256" cy="256" rx="220" ry="85" transform="rotate(120 256 256)" />
                                    </g>
                                </svg>
                            </a>

                            <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" aria-label="Next.js" className="flex items-center justify-center size-10 rounded-md border border-[#12345A] dark:border-[#1D4F7A]">
                                <svg className="size-5 sm:size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" aria-hidden="true">
                                    <path className="fill-slate-900 dark:fill-white" d="M300 600a300 300 0 1 0 0-600 300 300 0 0 0 0 600" />
                                    <path className="fill-white dark:fill-slate-900" d="m498.4 525-268-345H180v239.9h40.4V231.3l246.3 318.2a301 301 0 0 0 31.7-24.4" />
                                    <path className="fill-white dark:fill-slate-900" d="M423.3 180h-40v240h40z" />
                                </svg>
                            </a>

                            <a href="https://angular.dev/" target="_blank" rel="noopener noreferrer" aria-label="Angular" className="flex items-center justify-center size-10 rounded-md border border-[#12345A] dark:border-[#1D4F7A]">
                                <svg className="size-5 sm:size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" aria-hidden="true">
                                    <path fill="url(#angular-gradient-a)" d="M583.4 100 563 421.4 367.3 0zM448 515.6 300 600l-147.9-84.4 30.1-72.9h235.6zM300 160l77.5 188.3h-155zM36.8 421.4 16.6 100 232.7 0z" />
                                    <path fill="url(#angular-gradient-b)" d="M583.4 100 563 421.4 367.3 0zM448 515.6 300 600l-147.9-84.4 30.1-72.9h235.6zM300 160l77.5 188.3h-155zM36.8 421.4 16.6 100 232.7 0z" />
                                    <defs>
                                        <linearGradient id="angular-gradient-a" x1="14227.8" x2="55401" y1="54557.5" y2="34991.3" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#E40035" />
                                            <stop offset=".2" stopColor="#F60A48" />
                                            <stop offset=".4" stopColor="#F20755" />
                                            <stop offset=".5" stopColor="#DC087D" />
                                            <stop offset=".7" stopColor="#9717E7" />
                                            <stop offset="1" stopColor="#6C00F5" />
                                        </linearGradient>
                                        <linearGradient id="angular-gradient-b" x1="12409.1" x2="40564.6" y1="7234.5" y2="39352.1" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#FF31D9" />
                                            <stop offset="1" stopColor="#FF5BE1" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center justify-center lg:justify-end gap-4">
                        <p className="text-[12px] sm:text-[13px] md:text-[14px] leading-5 text-slate-500 dark:text-slate-400 text-center md:text-right">
                            {translations.footer.copyright}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;