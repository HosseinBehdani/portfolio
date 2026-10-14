import {
    AfterViewInit,
    Component,
    DestroyRef,
    ElementRef,
    afterRenderEffect,
    inject,
    viewChild
} from '@angular/core';
import { statusStats } from '@portfolio/data';
import type { StatusStat, StatusStatId } from '@portfolio/types';
import { CountUp } from 'countup.js';

import { LanguageService } from '../../services/language.service';

const COUNT_UP_DURATION_SECONDS = 5;
const COUNT_UP_START_VALUE = 0;
const INTERSECTION_THRESHOLD = 0.2;

type StatPhase = 'pending' | 'animating' | 'done';

type StatTarget = {
    element: HTMLElement;
    endVal: number;
    format: (value: number) => string;
};

const statsById = Object.fromEntries(statusStats.map(stat => [stat.id, stat])) as Record<
    StatusStatId,
    StatusStat
>;

@Component({
    selector: 'app-status',
    standalone: true,
    imports: [],
    templateUrl: './status.html',
    styleUrl: './status.css'
})
export class StatusComponent implements AfterViewInit {
    readonly languageService = inject(LanguageService);

    private readonly destroyRef = inject(DestroyRef);
    private readonly host = inject(ElementRef<HTMLElement>);

    private readonly projectsCount = viewChild<ElementRef<HTMLElement>>('projectsCount');
    private readonly experienceCount = viewChild<ElementRef<HTMLElement>>('experienceCount');
    private readonly responsiveCount = viewChild<ElementRef<HTMLElement>>('responsiveCount');
    private readonly repositoriesCount = viewChild<ElementRef<HTMLElement>>('repositoriesCount');

    private phase: StatPhase = 'pending';
    private destroyed = false;
    private mutationObserver: MutationObserver | null = null;
    private intersectionObserver: IntersectionObserver | null = null;
    private countUps: CountUp[] = [];

    constructor() {
        afterRenderEffect({
            read: () => this.languageService.language(),
            write: () => {
                if (this.destroyed || this.phase === 'animating') {
                    return;
                }

                this.writeValues(this.phase === 'done' ? 'end' : 'start');
            }
        });

        this.destroyRef.onDestroy(() => this.teardown());
    }

    ngAfterViewInit(): void {
        if (this.prefersReducedMotion()) {
            this.phase = 'done';
            this.writeValues('end');
            return;
        }

        this.observeStart();
    }

    private statTargets(): StatTarget[] {
        const projects = this.projectsCount()?.nativeElement;
        const experience = this.experienceCount()?.nativeElement;
        const responsive = this.responsiveCount()?.nativeElement;
        const repositories = this.repositoriesCount()?.nativeElement;

        if (!projects || !experience || !responsive || !repositories) {
            return [];
        }

        return [
            this.toStatTarget(projects, statsById.projectsCompleted),
            this.toStatTarget(experience, statsById.yearsExperience),
            this.toStatTarget(responsive, statsById.responsiveDesign),
            this.toStatTarget(repositories, statsById.gitRepositories)
        ];
    }

    private toStatTarget(element: HTMLElement, stat: StatusStat): StatTarget {
        return {
            element,
            endVal: stat.value,
            format: value => this.formatStat(stat, value)
        };
    }

    private formatStat(stat: StatusStat, value: number): string {
        const rounded = Math.floor(value);

        if (stat.format === 'percent') {
            return this.languageService.toLocaleNumber(`${rounded}%`);
        }

        return this.languageService.toLocaleNumber(rounded);
    }

    private writeValues(which: 'start' | 'end'): void {
        for (const stat of this.statTargets()) {
            stat.element.textContent = stat.format(
                which === 'end' ? stat.endVal : COUNT_UP_START_VALUE
            );
        }
    }

    private observeStart(): void {
        const host = this.host.nativeElement;

        const tryStart = (): boolean => {
            if (this.destroyed || this.phase !== 'pending') {
                this.disconnectObservers();
                return true;
            }

            if (this.statTargets().length === 0) {
                return false;
            }

            if (host.hasAttribute('data-aos') && !host.classList.contains('aos-animate')) {
                return false;
            }

            this.disconnectObservers();
            this.startCountUps();
            return true;
        };

        if (tryStart()) {
            return;
        }

        this.mutationObserver = new MutationObserver(() => {
            tryStart();
        });
        this.mutationObserver.observe(host, {
            attributes: true,
            attributeFilter: ['class', 'data-aos']
        });

        this.intersectionObserver = new IntersectionObserver(entries => {
            if (entries.some(entry => entry.isIntersecting)) {
                tryStart();
            }
        }, { threshold: INTERSECTION_THRESHOLD });
        this.intersectionObserver.observe(host);
    }

    private startCountUps(): void {
        if (this.destroyed || this.phase !== 'pending') {
            return;
        }

        const stats = this.statTargets();

        if (stats.length === 0) {
            return;
        }

        this.phase = 'animating';
        let remaining = stats.length;
        const instances: CountUp[] = [];

        for (const stat of stats) {
            const countUp = new CountUp(stat.element, stat.endVal, {
                duration: COUNT_UP_DURATION_SECONDS,
                startVal: COUNT_UP_START_VALUE,
                useGrouping: false,
                formattingFn: value => stat.format(value)
            });

            if (countUp.error) {
                remaining -= 1;
                stat.element.textContent = stat.format(stat.endVal);
                continue;
            }

            instances.push(countUp);
            countUp.start(() => {
                remaining -= 1;

                if (this.destroyed || remaining > 0) {
                    return;
                }

                this.phase = 'done';
                this.destroyCountUps();
                this.writeValues('end');
            });
        }

        this.countUps = instances;

        if (remaining <= 0) {
            this.phase = 'done';
            this.destroyCountUps();
            this.writeValues('end');
        }
    }

    private disconnectObservers(): void {
        this.mutationObserver?.disconnect();
        this.mutationObserver = null;
        this.intersectionObserver?.disconnect();
        this.intersectionObserver = null;
    }

    private destroyCountUps(): void {
        for (const countUp of this.countUps) {
            countUp.onDestroy();
        }

        this.countUps = [];
    }

    private teardown(): void {
        this.destroyed = true;
        this.disconnectObservers();
        this.destroyCountUps();
        this.phase = 'pending';
    }

    private prefersReducedMotion(): boolean {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
}
