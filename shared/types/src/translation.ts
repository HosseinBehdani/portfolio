export type TranslationKey =
    | 'home'
    | 'about'
    | 'skills'
    | 'experience'
    | 'projects'
    | 'certificates'
    | 'contact';

export interface Translation {

    meta: {
        language: string;
        direction: string;
    };

    common: {
        downloadResume: string;
        viewProject: string;
        viewCode: string;
        liveDemo: string;
        readMore: string;
        contactMe: string;
        sendMessage: string;
        seeAll: string;
        menu: string;
        language: string;
        theme: string;
        frameworks: string;
    };

    navigation: {
        home: string;
        about: string;
        skills: string;
        experience: string;
        projects: string;
        certificates: string;
        contact: string;
    };

    profile: {
        name: string;
        role: string;
        availability: string;
    };

    language: {
        persian: string;
        english: string;
    };

    hero: {
        greeting: string;
        firstName: string;
        lastName: string;
        role: string;
        nameSuffix: string;
        description: string;
        downloadResume: string;
        buildWith: string;
        angular: string;
    };

    about: {
        title: string;
        paragraph1: string;
        paragraph2: string;
    };

    status: {
        title: string;
        projectsCompleted: string;
        yearsExperience: string;
        responsiveDesign: string;
        gitRepositories: string;
    };

    skills: {
        title: string;
    };

    experience: {
        title: string;
        employmentType: string;
        company: string;
        startDate: string;
        present: string;
        role: string;
        responsibilities: string[];
    };

    projects: {
        title: string;
        liveSite: string;
        github: string;
        scienceAndTechnologyPark: {
            title: string;
        };
        aliAkbarRehabilitation: {
            title: string;
        };
        ahmadiSpareParts: {
            title: string;
        };
    };

    certificates: {
        title: string;
        credential: string;
        items: {
            name: string;
            year: number;
            logo: string;
            credentialUrl: string;
        }[];
    };

    contact: {
        title: string;
        email: string;
        phone: string;
        location: string;
        locationValue: string;
        linkedin: string;
        github: string;
        namePlaceholder: string;
        emailPlaceholder: string;
        subjectPlaceholder: string;
        messagePlaceholder: string;
        sendMessage: string;
        submitting: string;
        successMessage: string;
        errorMessage: string;
    };

    footer: {
        role: string;
        description: string;
        techStack: string;
        copyright: string;
    };
}