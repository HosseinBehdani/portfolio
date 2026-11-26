import { useEffect, useRef } from 'react';
import { statusStats } from '@portfolio/data';
import type { StatusStatId } from '@portfolio/types';
import useLanguage from '../../providers/language/useLanguage';

const COUNT_UP_DURATION = 5000;

function StatIcon({ id }: { id: StatusStatId }) {
    const commonClassName = 'size-15 lg:size-17 xl:size-20 text-[#9B2FE8]';

    const paths: Record<StatusStatId, string> = {
        projectsCompleted: 'M223.85,47.12a16,16,0,0,0-15-15c-12.58-.75-44.73.4-71.41,27.07L132.69,64H74.36A15.91,15.91,0,0,0,63,68.68L28.7,103a16,16,0,0,0,9.07,27.16l38.47,5.37,44.21,44.21,5.37,38.49a15.94,15.94,0,0,0,10.78,12.92,16.11,16.11,0,0,0,5.1.83A15.91,15.91,0,0,0,153,227.3L187.32,193A15.91,15.91,0,0,0,192,181.64V123.31l4.77-4.77C223.45,91.86,224.6,59.71,223.85,47.12ZM74.36,80h42.33L77.16,119.52,40,114.34Zm74.41-9.45a76.65,76.65,0,0,1,59.11-22.47,76.46,76.46,0,0,1-22.42,59.16L128,164.68,91.32,128ZM176,181.64,141.67,216l-5.19-37.17L176,139.31Zm-74.16,9.5C97.34,201,82.29,224,40,224a8,8,0,0,1-8-8c0-42.29,23-57.34,32.86-61.85a8,8,0,0,1,6.64,14.56c-6.43,2.93-20.62,12.36-23.12,38.91,26.55-2.5,36-16.69,38.91-23.12a8,8,0,1,1,14.56,6.64Z',
        yearsExperience: 'M216,96A88,88,0,1,0,72,163.83V240a8,8,0,0,0,11.58,7.16L128,225l44.43,22.21A8.07,8.07,0,0,0,176,248a8,8,0,0,0,8-8V163.83A87.85,87.85,0,0,0,216,96ZM56,96a72,72,0,1,1,72,72A72.08,72.08,0,0,1,56,96ZM168,227.06l-36.43-18.21a8,8,0,0,0-7.16,0L88,227.06V174.37a87.89,87.89,0,0,0,80,0ZM128,152A56,56,0,1,0,72,96,56.06,56.06,0,0,0,128,152Zm0-96A40,40,0,1,1,88,96,40,40,0,0,1,128,56Z',
        responsiveDesign: 'M215.79,118.17a8,8,0,0,0-5-5.66L153.18,90.9l14.66-73.33a8,8,0,0,0-13.69-7l-112,120a8,8,0,0,0,3,13l57.63,21.61L88.16,238.43a8,8,0,0,0,13.69,7l112-120A8,8,0,0,0,215.79,118.17ZM109.37,214l10.47-52.38a8,8,0,0,0-5-9.06L62,132.71l84.62-90.66L136.16,94.43a8,8,0,0,0,5,9.06l52.8,19.8Z',
        gitRepositories: 'M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z'
    };

    return (
        <svg
            className={commonClassName}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 256 256"
            aria-hidden="true"
        >
            <path d={paths[id]} />
        </svg>
    );
}

function Status() {
    const { language, translations } = useLanguage();
    const statRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const animationFrameRef = useRef<number | null>(null);
    const phaseRef = useRef<'pending' | 'animating' | 'done'>('pending');

    const formatValue = (value: number, format: string) => {
        const number = new Intl.NumberFormat(
            language === 'fa' ? 'fa-IR' : 'en-US',
            { maximumFractionDigits: 0, useGrouping: false }
        ).format(Math.floor(value));

        return format === 'percent'
            ? `${number}${language === 'fa' ? '٪' : '%'}`
            : number;
    };

    const writeValues = (useFinalValues: boolean) => {
        statusStats.forEach((stat, index) => {
            const element = statRefs.current[index];

            if (element) {
                element.textContent = formatValue(
                    useFinalValues ? stat.value : 0,
                    stat.format
                );
            }
        });
    };

    useEffect(() => {
        if (phaseRef.current === 'animating') {
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }

            phaseRef.current = 'done';
            writeValues(true);
            return;
        }

        writeValues(phaseRef.current === 'done');
    }, [language]);

    useEffect(() => {
        const startAnimation = () => {
            if (phaseRef.current !== 'pending') return;

            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                phaseRef.current = 'done';
                writeValues(true);
                return;
            }

            phaseRef.current = 'animating';
            const startTime = performance.now();

            const animate = (currentTime: number) => {
                const progress = Math.min((currentTime - startTime) / COUNT_UP_DURATION, 1);
                const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

                statusStats.forEach((stat, index) => {
                    const element = statRefs.current[index];

                    if (element) {
                        element.textContent = formatValue(
                            stat.value * easedProgress,
                            stat.format
                        );
                    }
                });

                if (progress < 1) {
                    animationFrameRef.current = requestAnimationFrame(animate);
                } else {
                    animationFrameRef.current = null;
                    phaseRef.current = 'done';
                    writeValues(true);
                }
            };

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        const element = document.getElementById('status');

        if (!element) return;

        if (!('IntersectionObserver' in window)) {
            startAnimation();
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    startAnimation();
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();

            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    const labels: Record<StatusStatId, string> = {
        projectsCompleted: translations.status.projectsCompleted,
        yearsExperience: translations.status.yearsExperience,
        responsiveDesign: translations.status.responsiveDesign,
        gitRepositories: translations.status.gitRepositories
    };

    return (
        <div
            id="status"
            data-aos="fade-up"
            className="p-3 rounded-md border-2 border-[#12345A] dark:border-[#1D4F7A] h-full scroll-mt-25 lg:scroll-mt-22"
        >
            <div className="flex items-center gap-x-1">
                <span className="size-4 lg:size-5 shrink-0 rounded-full bg-purple-500" />
                <h2 className="pt-1 rtl:pt-0 text-xl sm:text-xl md:text-xl lg:text-2xl font-bold text-slate-900 dark:text-white">
                    {translations.status.title}
                </h2>
            </div>
            <div className="grid grid-cols-2 xl:grid-cols-4 items-stretch py-4 gap-3">
                {statusStats.map((stat, index) => (
                    <div
                        key={stat.id}
                        className="flex flex-col justify-center items-center py-6 w-full h-full rounded-md border-2 border-[#12345A] dark:border-[#1D4F7A]"
                    >
                        <StatIcon id={stat.id} />
                        <span
                            ref={(element) => {
                                statRefs.current[index] = element;
                            }}
                            className="text-2xl xl:text-3xl mt-3 lg:mt-5"
                        />
                        <span className="block text-center text-base lg:text-lg font-medium mt-1 lg:mt-3 w-[65%] lg:w-[45%] xl:w-[75%] rtl:w-[100%]">
                            {labels[stat.id]}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Status;