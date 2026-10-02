import type { EntityId } from './common';

export interface Certificate {
    id: EntityId;
    titleKey: string;
    issuer: string;
    date: string;
    credentialUrl?: string;
}