import { useEffect, useRef } from 'react';

import useLanguage from '../language/useLanguage';

import type { ReactNode } from 'react';

interface AosProviderProps {
    children: ReactNode;
}

function prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function AosProvider({ children }: AosProviderProps) {
    const { language } = useLanguage();
    const initialized = useRef(false);

    useEffect(() => {
        let active = true;

        async function initializeAos() {
            const { default: AOS } = await import('aos');

            if (!active) {
                return;
            }

            if (!initialized.current) {
                AOS.init({
                    once: true,
                    disable: prefersReducedMotion
                });

                initialized.current = true;
            } else {
                AOS.refresh();
            }

            void document.fonts?.ready.then(() => {
                if (active) {
                    AOS.refresh();
                }
            });
        }

        void initializeAos();

        return () => {
            active = false;
        };
    }, [language]);

    return <>{children}</>;
}

export default AosProvider;