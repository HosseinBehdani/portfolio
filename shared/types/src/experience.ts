import type { DateRange, EntityId } from './common';

export interface Experience {
    id: EntityId;
    company: string;
    roleKey: string;
    descriptionKey: string;
    startDate: DateRange['start'];
    endDate?: DateRange['end'];
    technologies: string[];
}