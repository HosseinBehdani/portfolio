import type { Asset, EntityId, ProjectLinks } from './common';

export interface Project {
    id: EntityId;
    titleKey: string;
    descriptionKey: string;
    image?: Asset;
    technologies: string[];
    links?: ProjectLinks;
    featured: boolean;
}