import './scroll-to-top.css';
import { useEffect, useState } from 'react';
import useLanguage from '../../providers/language/useLanguage';

function ScrollToTop() {
    const { language, translations } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    if (!isVisible) {
        return null;
    }

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label={translations.meta.scrollToTop}
            className={`fixed bottom-4 z-40 flex size-11 items-center justify-center rounded-full border border-black/10 bg-white/90 text-violet-600 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-violet-600 hover:text-white dark:border-white/10 dark:bg-[#050816]/90 dark:text-violet-400 dark:hover:bg-violet-600 dark:hover:text-white sm:bottom-5 sm:size-11 ${language === 'en' ? 'right-4' : 'left-4'}`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 15l7-7 7 7"
                />
            </svg>
        </button>
    );
}

export default ScrollToTop;