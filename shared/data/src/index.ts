import type {
    Certificate,
    Experience,
    Navigation,
    Profile,
    Project,
    Skill,
    Social,
    StatusStats
} from '@portfolio/types';

import certificatesJson from '../certificates.json';
import experienceJson from '../experience.json';
import navigationJson from '../navigation.json';
import profileJson from '../profile.json';
import projectsJson from '../projects.json';
import skillsJson from '../skills.json';
import socialsJson from '../socials.json';
import statusJson from '../status.json';

export const profile: Profile = profileJson;
export const navigation: Navigation = navigationJson;
export const skills: Skill[] = skillsJson as Skill[];
export const socials: Social[] = socialsJson;
export const experience: Experience[] = experienceJson;
export const projects: Project[] = projectsJson;
export const certificates: Certificate[] = certificatesJson;
export const statusStats: StatusStats = statusJson as StatusStats;
