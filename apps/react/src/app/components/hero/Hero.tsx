import './hero.css';
import { socials } from '@portfolio/data';
import useLanguage from '../../providers/language/useLanguage';

function TelegramIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" className="size-7 text-[#229ED9]" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true"><path d="M228.88 26.19a9 9 0 0 0-9.16-1.57L17.06 103.93a14.22 14.22 0 0 0 2.43 27.21L72 141.45V200a15.92 15.92 0 0 0 10 14.83 15.91 15.91 0 0 0 17.51-3.73l25.32-26.26L165 220a15.88 15.88 0 0 0 10.51 4 16.3 16.3 0 0 0 5-.79 15.85 15.85 0 0 0 10.67-11.63L231.77 35a9 9 0 0 0-2.89-8.81Zm-61.14 36L78.15 126.35l-49.6-9.73ZM88 200V152.52l24.79 21.74Zm87.53 8L92.85 135.5l119-85.29Z" /></svg>;
}

function InstagramIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" className="size-7 text-[#E1306C]" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true"><path d="M128 80a48 48 0 1 0 48 48 48.05 48.05 0 0 0-48-48Zm0 80a32 32 0 1 1 32-32 32 32 0 0 1-32 32ZM176 24H80A56.06 56.06 0 0 0 24 80v96a56.06 56.06 0 0 0 56 56h96a56.06 56.06 0 0 0 56-56V80a56.06 56.06 0 0 0-56-56Zm40 152a40 40 0 0 1-40 40H80a40 40 0 0 1-40-40V80a40 40 0 0 1 40-40h96a40 40 0 0 1 40 40Zm-24-100a12 12 0 1 1-12-12 12 12 0 0 1 12 12Z" /></svg>;
}

function WhatsAppIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" className="size-7 text-[#25D366]" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true"><path d="M187.58 144.84l-32-16a8 8 0 0 0-8 .5l-14.69 9.8a40.55 40.55 0 0 1-16-16l9.8-14.69a8 8 0 0 0 .5-8l-16-32A8 8 0 0 0 104 64a40 40 0 0 0-40 40 88.1 88.1 0 0 0 88 88 40 40 0 0 0 40-40 8 8 0 0 0-4.42-7.16ZM152 176a72.08 72.08 0 0 1-72-72A24 24 0 0 1 99.29 80.46l11.48 23L101 118a8 8 0 0 0-.73 7.51 56.47 56.47 0 0 0 30.15 30.15A8 8 0 0 0 138 155l14.61-9.74 23 11.48A24 24 0 0 1 152 176ZM128 24A104 104 0 0 0 36.18 176.88L24.83 210.93a16 16 0 0 0 20.24 20.24l34.05-11.35A104 104 0 1 0 128 24Zm0 192a87.87 87.87 0 0 1-44.06-11.81 8 8 0 0 0-6.54-.67L40 216 52.47 178.6a8 8 0 0 0-.66-6.54A88 88 0 1 1 128 216Z" /></svg>;
}

function BaleIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" className="size-7 text-white" fill="currentColor" viewBox="0 0 1000 999.72" aria-hidden="true">
        <defs>
            <linearGradient id="bale-linear-gradient" x1="800.4" y1="93.39" x2="93.57" y2="800.23" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#4cebb4" />
                <stop offset="1" stopColor="#2e2e74" />
            </linearGradient>
        </defs>
        <g>
            <path d="M1010.36,547.36c-.73,17.77-2.6,36-6.85,53.41-1.54,16.48-6.36,32.54-10.76,48.52-5.14,19.5-12.48,38.33-19.9,57.17-6.77,15.66-14.35,30.91-22.26,46.08C942.92,766,934.93,779.2,926.29,792q-14.32,21-30.5,40.45c-11.18,13.13-22.68,26.09-35.15,37.92a503.68,503.68,0,0,1-51.3,43.55,453.44,453.44,0,0,1-48.44,31.56C742.06,956.74,722.16,966,702,974.6a548,548,0,0,1-65.89,21.86c-19.49,4.32-39,9.21-58.88,10.76-37,5.71-74.86,5.79-112.13,2.2-33.6-2.61-66.87-9.78-99.25-19.32l-.08-.58C210.19,944.18,82.32,816.07,34.94,661.2c-10.36-33.35-17.62-67.93-20.31-102.83-3.83-33.85-2-68-2.2-102q-.37-40.74-.08-81.64-.26-41.83,0-83.83c-.17-24-.08-47.95-.08-71.93s-.17-48.19.16-72.25c-.33-23.82-.08-47.63-.16-71.44-1.64-17.94,4.24-36.7,17.86-48.85C44.48,13.44,65.68,8.55,84,14.91c11.09,3.75,20.71,10.6,30.58,16.72,36,23.4,70.54,48.85,104.71,74.78a86.74,86.74,0,0,0,10.68-6.77A426.86,426.86,0,0,1,272.58,73.3a483.59,483.59,0,0,1,45.75-22.1c16.39-6.85,33.19-12.8,50.15-18.1,18.1-5,36.29-10.11,55-12.72a392.65,392.65,0,0,1,61.82-7.26,451.46,451.46,0,0,1,76.41,1.71A413.36,413.36,0,0,1,619,24c128.53,27,244.08,108.3,314.46,219a493,493,0,0,1,66.47,159.76c4.73,20.95,8.48,42.32,9.7,63.77A411.89,411.89,0,0,1,1010.36,547.36Z" transform="translate(-12 -12.14)" fill="url(#bale-linear-gradient)" />
            <path d="M705.69,273.2a107.59,107.59,0,0,1,62.37,1.3c25.62,9.82,46.29,29.94,57.5,54.9,8.34,22.86,9.31,48.42.91,71.44-6.06,16.2-16.76,30.09-29.4,41.74q-16.7,16.49-33.21,33.14c-11.79,11.79-23.64,23.5-35.33,35.35-11.3,11.28-22.62,22.49-33.85,33.81-12.32,12.34-24.68,24.61-36.95,37-14,14-28.06,27.94-42,42-13.24,13.29-26.55,26.49-39.8,39.78s-26.77,26.71-40.1,40.11c-12.27,11.85-23.51,24.94-37.35,35.06a106.69,106.69,0,0,1-57.95,16C417,753.28,393.79,744,376.87,727.33q-78.53-78.44-157-156.94c-12.82-12.66-21.38-29.07-26-46.38-4.75-23.86-1.94-49.51,10.31-70.75,9.37-16.54,23.79-29.65,40.19-39a107.52,107.52,0,0,1,57.86-9.73c21.38,3.21,42,13,56.91,28.76Q401.7,476,444.37,518.5c8.63-8.18,16.9-16.73,25.19-25.27q18-17.31,35.24-35.35c11.36-10.68,22.33-21.82,33.07-33.12,7.74-6.88,14.75-14.51,22.07-21.8,12-11.68,23.75-23.59,35.49-35.51,11.21-10.83,22.11-21.95,33.07-33,11.79-11.5,23.28-23.28,35-34.87a105.75,105.75,0,0,1,42.21-26.37Z" transform="translate(-12 -12.14)" fill="#fff" />
        </g>
    </svg>;
}

function JavaIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 600 600" className="size-10 sm:size-11 md:size-12 lg:size-13 xl:size-14 drop-shadow-[0_0_12px_rgba(83,130,161,0.8)]"><path fill="#5382A1" d="M221.3 464s-23 13.3 16.3 17.9c47.5 5.4 71.8 4.6 124.2-5.3 0 0 13.8 8.6 33 16.1-117.4 50.3-265.8-3-173.5-28.7M207 398.3s-25.8 19 13.5 23.1c50.8 5.3 90.9 5.7 160.3-7.7 0 0 9.6 9.8 24.7 15-142 41.6-300.2 3.4-198.6-30.4" /><path fill="#E76F00" d="M327.9 286.9c29 33.3-7.6 63.3-7.6 63.3s73.5-38 39.7-85.4c-31.5-44.3-55.7-66.4 75.2-142.3 0 0-205.4 51.3-107.3 164.4" /><path fill="#5382A1" d="M483.3 512.6s17 14-18.7 24.8c-67.8 20.5-282.2 26.7-341.8.8-21.4-9.3 18.8-22.2 31.4-25 13.2-2.8 20.7-2.3 20.7-2.3-23.8-16.7-153.9 33-66 47.2 239.4 38.8 436.5-17.5 374.4-45.5m-251-182.3s-109 25.9-38.6 35.3c29.7 4 89 3 144.2-1.6 45.1-3.8 90.5-11.9 90.5-11.9s-16 6.8-27.5 14.7c-110.7 29.1-324.6 15.6-263-14.2 52-25.2 94.4-22.3 94.4-22.3M428 439.6c112.5-58.5 60.4-114.7 24.1-107.1a84 84 0 0 0-12.9 3.4s3.3-5.1 9.6-7.4c72-25.3 127.2 74.5-23.2 114 0 0 1.8-1.5 2.3-2.9" /><path fill="#E76F00" d="M360 0s62.4 62.4-59 158.3c-97.5 76.9-22.3 120.8-.1 170.9-56.9-51.3-98.6-96.5-70.6-138.5C271.3 129 385.2 99 360 0" /><path fill="#5382A1" d="M243.3 598.1c108.1 7 274-3.8 278-55 0 0-7.6 19.4-89.3 34.8-92.3 17.4-206 15.4-273.5 4.2 0 0 13.8 11.5 84.8 16" /></svg>;
}

function ReactIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" className="size-10 sm:size-11 md:size-12 lg:size-13 xl:size-14 drop-shadow-[0_0_12px_rgba(0,216,255,0.8)]">
        <g stroke="#00D8FF" strokeWidth="4.5">
            <ellipse cx="50" cy="50" rx="44" ry="17" />
            <ellipse cx="50" cy="50" rx="44" ry="17" transform="rotate(60 50 50)" />
            <ellipse cx="50" cy="50" rx="44" ry="17" transform="rotate(120 50 50)" />
        </g>
        <circle cx="50" cy="50" r="5" fill="#00D8FF" />
    </svg>;
}

function NextIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 600 600" className="size-10 sm:size-11 md:size-12 lg:size-13 xl:size-14 drop-shadow-[0_0_12px_rgba(255,255,255,0.65)] dark:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]">
        <circle cx="300" cy="300" r="300" className="fill-black dark:fill-white" />
        <path className="fill-white dark:fill-black" d="M180 180h50l268 345a301 301 0 0 1-32 24L220 231v240h-40V180Zm203 0h40v240h-40z" />
    </svg>;
}

function AngularIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 600 600" className="size-10 sm:size-11 md:size-12 lg:size-13 xl:size-14 drop-shadow-[0_0_12px_rgba(228,0,53,0.8)]">
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
    <path fill="url(#angular-gradient-a)" d="M583.4 100 563 421.4 367.3 0zM448 515.6 300 600l-147.9-84.4 30.1-72.9h235.6zM300 160l77.5 188.3h-155zM36.8 421.4 16.6 100 232.7 0z" />
    <path fill="url(#angular-gradient-b)" d="M583.4 100 563 421.4 367.3 0zM448 515.6 300 600l-147.9-84.4 30.1-72.9h235.6zM300 160l77.5 188.3h-155zM36.8 421.4 16.6 100 232.7 0z" />
</svg>
}

function SocialIcon({ id }: { id: string }) {
    switch (id) {
        case 'telegram':
            return <TelegramIcon />;
        case 'instagram':
            return <InstagramIcon />;
        case 'whatsapp':
            return <WhatsAppIcon />;
        case 'bale':
            return <BaleIcon />;
        default:
            return null;
    }
}

function Hero() {
    const { language, translations } = useLanguage();
    const directionClass = language === 'fa' ? 'lg:translate-x-24' : 'lg:-translate-x-24';
    const resumeFileName = language === 'fa' ? 'Hossein-Behdani-Resume-fa.pdf' : 'Hossein-Behdani-Resume-en.pdf';
    const resumeUrl = `/resume/${resumeFileName}`;

    return (
        <section id="home" className="py-5 flex items-center justify-center scroll-mt-25 lg:scroll-mt-22">
            <div className="container-custom px-3 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="lg:pt-15 flex flex-col items-start sm:items-center lg:items-start">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-yellow-500 size-10" fill="currentColor" viewBox="0 0 256 256"><path d="M220.17 100 202.86 70a28 28 0 0 0-38.24-10.25 27.69 27.69 0 0 0-9 8.34L138.2 38a28 28 0 0 0-48.48 0A28 28 0 0 0 48.15 74l1.59 2.76A27.67 27.67 0 0 0 38 80.41a28 28 0 0 0-10.24 38.25l40 69.32a87.47 87.47 0 0 0 53.43 41 88.56 88.56 0 0 0 22.92 3 88 88 0 0 0 76.06-132Zm-6.66 62.64A72 72 0 0 1 81.62 180l-40-69.32a12 12 0 0 1 20.78-12L81.63 132a8 8 0 1 0 13.85-8L62 66A12 12 0 1 1 82.78 54L114 108a8 8 0 1 0 13.85-8L103.57 58h0a12 12 0 1 1 20.78-12l33.42 57.9a48 48 0 0 0-5.54 60.6 8 8 0 0 0 13.24-9A32 32 0 0 1 172.78 112a8 8 0 0 0 2.13-10.4L168.23 90A12 12 0 1 1 189 78l17.31 30a71.56 71.56 0 0 1 7.2 54.64ZM184.25 31.71A8 8 0 0 1 194 26a59.62 59.62 0 0 1 36.53 28l.33.57a8 8 0 1 1-13.85 8l-.33-.57a43.67 43.67 0 0 0-26.8-20.5 8 8 0 0 1-5.63-9.79ZM80.89 237a8 8 0 0 1-11.23 1.33A119.56 119.56 0 0 1 40.06 204a8 8 0 0 1 13.86-8 103.67 103.67 0 0 0 25.64 29.72A8 8 0 0 1 80.89 237Z" /></svg>
                        <span className="text-2xl font-semibold mt-1 ml-1 text-slate-700 dark:text-slate-200">{translations.hero.greeting}</span>
                    </div>
                    <div className="flex items-center">
                        <h1 className="flex items-center gap-2 text-[44px] md:my-1 md:text-5xl font-bold text-black dark:text-white">
                            <span>{translations.hero.firstName}</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-blue-500">{translations.hero.lastName}</span>
                        </h1>
                        <span className="text-2xl font-semibold mt-1 mr-1 text-slate-700 dark:text-slate-200">{translations.hero.nameSuffix}</span>
                    </div>
                    <span className="text-2xl font-semibold inline-block mt-4 text-slate-700 dark:text-slate-300">{translations.hero.role}</span>
                    <p className="text-lg text-start sm:text-center lg:text-start font-normal mt-4 w-[80%] md:w-[60%] text-slate-600 dark:text-slate-400">{translations.hero.description}</p>
                    <a href={resumeUrl} download={resumeFileName} className="flex justify-center items-center mt-4 w-56 rounded-lg bg-gradient-to-r from-violet-600 to-blue-500 py-2 text-white hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-500 ease-out hover:-translate-y-1">
                        <svg className="size-6 md:size-7" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><path d="M224 144v64a8 8 0 0 1-8 8H40a8 8 0 0 1-8-8v-64a8 8 0 0 1 16 0v56H208v-56a8 8 0 0 1 16 0Zm-101.66 5.66a8 8 0 0 0 11.32 0l40-40a8 8 0 0 0-11.32-11.32L136 124.69V32a8 8 0 0 0-16 0v92.69L93.66 98.34a8 8 0 0 0-11.32 11.32Z" /></svg>
                        <span className="text-base md:text-lg font-semibold mt-1 ml-1">{translations.hero.downloadResume}</span>
                    </a>
                    <ul className="mt-6 flex items-center gap-4">
                        {socials.map((social) => (
                            <li key={social.id}>
                                <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name} className="flex items-center justify-center size-11 rounded-xl border border-slate-200/80 bg-slate-100/80 text-slate-700 transition-all duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200">
                                    <SocialIcon id={social.id} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="relative flex w-full justify-center items-center overflow-visible md:justify-self-center">
                    <div className={`relative mx-auto flex justify-center items-center md:translate-x-0 ${directionClass}`}>
                        <img src="/assets/images/My photo hero.webp" width="800" height="800" fetchPriority="high" decoding="async" alt={translations.profile.name} className="relative z-10 mx-auto max-w-none w-99 h-100 sm:w-140 sm:h-110 md:w-160 md:h-120 lg:w-130 lg:h-130 xl:w-180 xl:h-140" />
                    </div>
                    <div className={`absolute inset-0 md:translate-x-0 ${directionClass}`}>
                        <div className="absolute left-[8%] top-[12%] sm:left-[17%] sm:top-[14%] md:left-[16%] md:top-[16%] lg:left-[13%] xl:left-33 xl:top-25 animate-float opacity-80 hover:scale-110 transition-transform duration-300">
                            <div className="rounded-full p-1.5 sm:p-2 bg-white/5 backdrop-blur-sm shadow-[0_0_25px_rgba(83,130,161,0.45)]"><JavaIcon /></div>
                        </div>
                        <div className="absolute left-[8%] bottom-[12%] sm:left-[14%] sm:bottom-[14%] md:left-[15%] md:bottom-[16%] lg:left-[8%] xl:left-30 xl:bottom-25 animate-float-delay opacity-80 hover:scale-110 transition-transform duration-300">
                            <div className="rounded-full p-1.5 sm:p-2 bg-white/5 backdrop-blur-sm shadow-[0_0_25px_rgba(0,216,255,0.45)]"><ReactIcon /></div>
                        </div>
                        <div className="absolute right-[8%] top-[12%] sm:right-[17%] sm:top-[14%] md:right-[16%] md:top-[16%] lg:right-[12%] xl:right-35 xl:top-25 animate-float opacity-80 hover:scale-110 transition-transform duration-300">
                            <div className="rounded-full p-1.5 sm:p-2 bg-white/5 backdrop-blur-sm shadow-[0_0_25px_rgba(255,255,255,0.35)]"><NextIcon /></div>
                        </div>
                        <div className="absolute right-[5%] bottom-[12%] sm:right-[13%] sm:bottom-[14%] md:right-[13%] md:bottom-[16%] lg:right-[3%] xl:right-20 xl:bottom-25 animate-float-delay opacity-80 hover:scale-110 transition-transform duration-300">
                            <div className="rounded-full p-1.5 sm:p-2 bg-white/5 backdrop-blur-sm shadow-[0_0_25px_rgba(228,0,53,0.45)]"><AngularIcon /></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;