export type StatusStatId =
    | 'projectsCompleted'
    | 'yearsExperience'
    | 'responsiveDesign'
    | 'gitRepositories';

export type StatusStatFormat = 'integer' | 'percent';

export interface StatusStat {
    id: StatusStatId;
    value: number;
    format: StatusStatFormat;
}

export type StatusStats = StatusStat[];
