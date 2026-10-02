export type EntityId = string;

export type Locale = 'fa' | 'en';

export interface Asset {
    src: string;
    alt?: string;
}

export interface ProjectLinks {
    github?: string;
    demo?: string;
}

export interface DateRange {
    start: string;
    end?: string;
}