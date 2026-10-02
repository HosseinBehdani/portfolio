import type { Asset } from './common';

export interface Profile {
    nameKey: string;
    roleKey: string;
    bioKey: string;
    location: string;
    email: string;
    phone?: string;
    avatar?: Asset;
}