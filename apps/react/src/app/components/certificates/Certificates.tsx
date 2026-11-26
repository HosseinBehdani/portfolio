import './certificates.css';
import useLanguage from '../../providers/language/useLanguage';

export default function Certificates() {
    const { language, translations, toLocaleNumber } = useLanguage();

    const toLocaleYear = (year: number) => {
        return toLocaleNumber(language === 'fa' ? year - 621 : year);
    };

    return (
        <div className="p-3 rounded-md border-2 border-[#12345A] dark:border-[#1D4F7A] scroll-mt-25 lg:scroll-mt-22" id="certificates" data-aos="fade-up">
            <div className="flex items-center gap-x-1">
                <span className="size-4 lg:size-5 shrink-0 rounded-full bg-purple-500"></span>
                <h2 className="pt-1 rtl:pt-0 text-xl sm:text-xl md:text-xl lg:text-2xl font-bold text-slate-900 dark:text-white">
                    {translations.certificates.title}
                </h2>
            </div>
            <div className="certificate-list mt-3 sm:mt-4 max-h-[220px] sm:max-h-[240px] lg:max-h-[365px] overflow-y-auto space-y-1.5 sm:space-y-2 lg:pe-1.5">
                {translations.certificates.items.map((certificate) => (
                    <div key={certificate.credentialUrl} className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 lg:gap-3 p-1.5 sm:p-2 md:p-2.5 lg:p-2.5 rounded-md border border-slate-200 bg-white dark:border-[#1A365D] dark:bg-[#0B1224]">
                        <img src={certificate.logo} width="96" height="96" loading="lazy" decoding="async" alt={certificate.name} className="size-8 sm:size-10 md:size-11 lg:size-7 xl:size-10 shrink-0 object-contain" />
                        <span className="flex-1 min-w-0 text-[15px] sm:text-base md:text-base lg:text-[14px] xl:text-[17px] font-semibold mt-1 sm:mt-1 md:mt-1.5 lg:mt-1.5 text-slate-700 dark:text-white">
                            {certificate.name}
                        </span>
                        <time dateTime={String(certificate.year)} className="w-8 sm:w-11 md:w-12 lg:w-7 xl:w-12 shrink-0 text-sm sm:text-base md:text-base lg:text-[14px] xl:text-base mt-1 sm:mt-1 md:mt-1.5 lg:mt-1.5 font-medium text-slate-600 dark:text-slate-300">
                            {toLocaleYear(certificate.year)}
                        </time>
                        <a href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 text-sm sm:text-base md:text-base lg:text-[14px] xl:text-base mt-1 sm:mt-1 md:mt-1.5 lg:mt-1.5 font-medium text-purple-600 dark:text-purple-400">
                            {translations.certificates.credential}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}