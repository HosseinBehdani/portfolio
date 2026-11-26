import { useEffect } from 'react';
import fa from '@portfolio/translations/fa';
import en from '@portfolio/translations/en';
import useLanguage from '../../providers/language/useLanguage';

const SITE_URL = 'https://portfolio-one-teal-25.vercel.app';
const APP_URL = `${SITE_URL}/react/`;
const OG_IMAGE_URL = `${SITE_URL}/assets/images/My%20photo%20hero.webp`;

function Seo() {
    const { language, translations } = useLanguage();

    useEffect(() => {
        const { meta, profile } = translations;
        const alternateProfile = language === 'fa' ? en.profile : fa.profile;

        const setMeta = (
            selector: string,
            attribute: 'content',
            value: string
        ) => {
            document.querySelector<HTMLMetaElement>(selector)?.setAttribute(attribute, value);
        };

        const setCanonical = (url: string) => {
            let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

            if (!link) {
                link = document.createElement('link');
                link.setAttribute('rel', 'canonical');
                document.head.appendChild(link);
            }

            link.setAttribute('href', url);
        };

        document.title = meta.title;

        setMeta('meta[name="description"]', 'content', meta.description);
        setMeta('meta[name="author"]', 'content', profile.name);
        setMeta('meta[name="robots"]', 'content', 'index, follow');
        setMeta('meta[name="theme-color"]', 'content', '#050816');

        setMeta('meta[property="og:type"]', 'content', 'website');
        setMeta(
            'meta[property="og:locale"]',
            'content',
            language === 'fa' ? 'fa_IR' : 'en_US'
        );
        setMeta('meta[property="og:url"]', 'content', APP_URL);
        setMeta('meta[property="og:site_name"]', 'content', meta.siteName);
        setMeta('meta[property="og:title"]', 'content', meta.ogTitle);
        setMeta('meta[property="og:description"]', 'content', meta.ogDescription);
        setMeta('meta[property="og:image"]', 'content', OG_IMAGE_URL);
        setMeta(
            'meta[property="og:image:alt"]',
            'content',
            `${profile.name} - ${profile.role}`
        );

        setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
        setMeta('meta[name="twitter:title"]', 'content', meta.ogTitle);
        setMeta('meta[name="twitter:description"]', 'content', meta.ogDescription);
        setMeta('meta[name="twitter:image"]', 'content', OG_IMAGE_URL);

        setCanonical(APP_URL);

        const structuredData = {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: profile.name,
            alternateName: alternateProfile.name,
            url: APP_URL,
            image: OG_IMAGE_URL,
            jobTitle: profile.role,
            description: meta.description,
            email: 'mailto:behdanihosain@gmail.com',
            sameAs: [
                'https://t.me/Hos3sein_B',
                'https://www.instagram.com/hosein_behdani/',
                'https://github.com/HosseinBehdani'
            ],
            knowsAbout: [
                'Angular',
                'React',
                'Next.js',
                'TypeScript',
                'Front-End Development'
            ]
        };

        const jsonLd = document.getElementById('portfolio-json-ld');

        if (jsonLd) {
            jsonLd.textContent = JSON.stringify(structuredData);
        }
    }, [language, translations]);

    return null;
}

export default Seo;