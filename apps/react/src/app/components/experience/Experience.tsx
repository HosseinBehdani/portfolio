import './experience.css';
import useLanguage from '../../providers/language/useLanguage';

export default function Experience() {
    const { translations } = useLanguage();

    return (
        <section className="lg:py-3 scroll-mt-25 lg:scroll-mt-22" aria-labelledby="experience-title" id="experience" data-aos="fade-up">
            <div className="px-3 lg:px-6">
                <div className="p-3 rounded-md border-2 border-[#12345A] dark:border-[#1D4F7A]">
                    <div className="flex items-center justify-between gap-2 sm:gap-3">
                        <div className="flex items-center gap-x-1">
                            <span className="size-4 lg:size-5 shrink-0 rounded-full bg-purple-500"></span>
                            <h2 id="experience-title" className="pt-1 rtl:pt-0 text-xl sm:text-xl md:text-xl lg:text-2xl font-bold text-slate-900 dark:text-white">
                                {translations.experience.title}
                            </h2>
                        </div>
                        <span className="px-2 sm:px-3 pt-1 text-sm lg:text-[15px] rounded-full border-2 border-purple-500/90 dark:border-purple-400/40 text-purple-600 dark:text-purple-400">
                            {translations.experience.employmentType}
                        </span>
                    </div>
                    <div className="grid grid-cols-[auto_1fr] gap-3 sm:gap-4 md:gap-5 lg:grid-cols-[100px_1fr_auto] lg:gap-5 xl:grid-cols-[120px_1fr_auto] xl:gap-6 py-4">
                        <div className="flex flex-col items-end mt-1">
                            <time dateTime="2024-10" className="text-sm md:text-base font-semibold text-slate-600 dark:text-white">
                                {translations.experience.startDate}
                            </time>
                            <span className="text-sm md:text-base font-semibold text-slate-600 dark:text-white">
                                {translations.experience.present}
                            </span>
                        </div>
                        <div className="relative">
                            <span className="absolute left-0 rtl:left-auto rtl:right-0 top-0 bottom-0 w-0.5 bg-purple-500/60"></span>
                            <span className="absolute left-[-3px] rtl:left-auto rtl:right-[-3px] top-0 size-2 rounded-full bg-purple-500"></span>
                            <span className="absolute left-[-3px] rtl:left-auto rtl:right-[-3px] bottom-0 size-2 rounded-full bg-purple-500"></span>
                            <div className="relative pl-7 sm:pl-8 md:pl-9 lg:pl-10 rtl:pr-7 rtl:sm:pr-8 rtl:md:pr-9 rtl:lg:pr-10">
                                <span className="absolute left-[-11.5px] rtl:left-auto rtl:right-[-11.5px] sm:left-[-15px] sm:rtl:left-auto sm:rtl:right-[-15px] md:left-[-15px] md:rtl:left-auto md:rtl:right-[-15px] top-[11.5px] sm:top-[11px] md:top-[12px] size-6 sm:size-8 rounded-full border-2 border-purple-500/60"></span>
                                <span className="absolute left-[-8.5px] rtl:left-auto rtl:right-[-8.5px] sm:left-[-11px] sm:rtl:left-auto sm:rtl:right-[-11px] top-[14.5px] sm:top-[15px] md:top-4 size-4.5 sm:size-6 rounded-full bg-purple-500"></span>
                                <div className="flex flex-col justify-center">
                                    <div className="flex items-center gap-2">
                                        <img src="assets/images/daneshjooyar-logo.webp" alt="Daneshjooyar" loading="lazy" decoding="async" className="size-9 md:size-10 object-contain" width="96" height="97" />
                                        <h3 className="text-base sm:text-xl mt-1 font-bold text-slate-600 dark:text-white">
                                            {translations.experience.company}
                                        </h3>
                                    </div>
                                    <p className="text-sm md:text-[15px] lg:text-[17px] font-semibold ms-2 sm:ms-3 mt-1 text-purple-400">
                                        {translations.experience.role}
                                    </p>
                                </div>
                                <ul className="mt-3 space-y-2 sm:space-y-1.5 text-slate-600 dark:text-slate-300">
                                    {translations.experience.responsibilities.map((responsibility, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="mt-1 lg:mt-1.5 xl:mt-1.5 rtl:mt-1.5 rtl:sm:mt-2 rtl:lg:mt-2.5 rtl:xl:mt-2.5 size-2.5 sm:size-3 shrink-0 rounded-full bg-purple-500"></span>
                                            <span className="text-[15px] sm:text-base lg:text-lg text-slate-600 dark:text-white">
                                                {responsibility}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-span-2 flex items-center justify-center pt-4 sm:pt-5 md:pt-6 lg:col-span-1 lg:pt-0">
                            <img src="assets/images/Portfolio.webp" alt="Front-end development illustration" loading="lazy" decoding="async" className="size-45 sm:size-55 md:size-65 lg:size-45 xl:size-50 rtl:-scale-x-100" width="400" height="400" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}