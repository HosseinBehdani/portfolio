import { Injectable, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import type { Translation } from '@portfolio/types';
import { LanguageService, type Language } from './language.service';

export const SITE_URL = 'https://portfolio-one-teal-25.vercel.app';
const OG_IMAGE_PATH = '/assets/images/My photo hero.webp';

@Injectable({
    providedIn: 'root'
})
export class SeoService {
    private readonly title = inject(Title);
    private readonly meta = inject(Meta);
    private readonly languageService = inject(LanguageService);

    constructor() {
        effect(() => {
            const lang = this.languageService.language();
            this.apply(lang, this.languageService.translations);
        });
    }

    private apply(lang: Language, t: Translation): void {
        const ogImage = `${SITE_URL}${OG_IMAGE_PATH}`;

        this.title.setTitle(t.meta.title);

        this.meta.updateTag({ name: 'description', content: t.meta.description });
        this.meta.updateTag({ name: 'author', content: 'Hossein Behdani' });
        this.meta.updateTag({
            name: 'keywords',
            content: 'Hossein Behdani, Front-End Developer, Angular Developer, React Developer, Web Developer'
        });
        this.meta.updateTag({ name: 'robots', content: 'index, follow' });
        this.meta.updateTag({ name: 'theme-color', content: '#050816' });

        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({ property: 'og:locale', content: lang === 'fa' ? 'fa_IR' : 'en_US' });
        this.meta.updateTag({ property: 'og:url', content: `${SITE_URL}/` });
        this.meta.updateTag({ property: 'og:site_name', content: t.meta.siteName });
        this.meta.updateTag({ property: 'og:title', content: t.meta.ogTitle });
        this.meta.updateTag({ property: 'og:description', content: t.meta.ogDescription });
        this.meta.updateTag({ property: 'og:image', content: ogImage });
        this.meta.updateTag({ property: 'og:image:alt', content: t.meta.ogTitle });

        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: t.meta.ogTitle });
        this.meta.updateTag({ name: 'twitter:description', content: t.meta.ogDescription });
        this.meta.updateTag({ name: 'twitter:image', content: ogImage });

        this.updateCanonical(`${SITE_URL}/`);
        this.updateJsonLd(t, ogImage);
    }

    private updateCanonical(url: string): void {
        let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

        if (!link) {
            link = document.createElement('link');
            link.setAttribute('rel', 'canonical');
            document.head.appendChild(link);
        }

        link.setAttribute('href', url);
    }

    private updateJsonLd(t: Translation, ogImage: string): void {
        const payload = {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Hossein Behdani',
            alternateName: 'حسین بهدانی',
            url: `${SITE_URL}/`,
            image: ogImage,
            jobTitle: t.profile.role,
            email: 'mailto:behdanihosain@gmail.com',
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Tehran',
                addressCountry: 'IR'
            },
            sameAs: [
                'https://t.me/Hos3sein_B',
                'https://www.instagram.com/hosein_behdani/',
                'https://github.com/HosseinBehdani'
            ],
            knowsAbout: ['Angular', 'React', 'Next.js', 'TypeScript', 'Front-End Development']
        };

        let script = document.getElementById('portfolio-json-ld') as HTMLScriptElement | null;

        if (!script) {
            script = document.createElement('script');
            script.id = 'portfolio-json-ld';
            script.type = 'application/ld+json';
            document.head.appendChild(script);
        }

        script.textContent = JSON.stringify(payload);
    }
}
