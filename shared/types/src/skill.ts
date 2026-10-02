import type { EntityId } from './common';

export interface Skill {
    id: EntityId;
    name: string;
    level: 1 | 2 | 3 | 4 | 5;
}