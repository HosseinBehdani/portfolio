import './about.css';
import useLanguage from '../../providers/language/useLanguage';

function About() {
    const { translations } = useLanguage();

    return (
        <div
            id="about"
            data-aos="fade-up"
            className="relative flex flex-col gap-3 p-3 rounded-md border-2 border-[#12345A] dark:border-[#1D4F7A] h-full scroll-mt-25 lg:scroll-mt-22"
        >
            <div className="flex items-center gap-x-1">
                <span className="size-4 lg:size-5 shrink-0 rounded-full bg-purple-500" />
                <h2 className="pt-1 rtl:pt-0 text-xl sm:text-xl md:text-xl lg:text-2xl font-bold text-slate-900 dark:text-white">
                    {translations.about.title}
                </h2>
            </div>
            <div className="flex flex-col xl:flex-row items-center gap-5 sm:gap-6 md:gap-6 lg:gap-8 xl:gap-10">
                <div className="flex-1 flex flex-col gap-3 sm:gap-4 md:gap-4 lg:gap-4 xl:gap-5 text-[15px] sm:text-base lg:text-lg text-slate-600 dark:text-white">
                    <p>{translations.about.paragraph1}</p>
                    <p>{translations.about.paragraph2}</p>
                </div>
                <img
                    className="w-3/5 sm:w-2/5 md:w-3/5 lg:w-3/5 xl:w-1/3 md:-translate-x-2 lg:-translate-x-4 xl:-translate-x-5 lg:scale-y-[1] xl:scale-y-[1.3] object-contain rtl:scale-x-[-1] rtl:md:translate-x-2 rtl:lg:translate-x-4 rtl:xl:translate-x-5"
                    width="480"
                    height="320"
                    src="/assets/images/Tech Stack.webp"
                    loading="lazy"
                    decoding="async"
                    alt="Front-end tech stack illustration"
                />
            </div>
        </div>
    );
}

export default About;