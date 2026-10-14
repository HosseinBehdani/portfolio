import { DestroyRef, Injectable, afterNextRender, afterRenderEffect, inject } from '@angular/core';

import { LanguageService } from './language.service';

function prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

type AosInstance = {
    init(options?: { once?: boolean; disable?: boolean | (() => boolean) }): void;
    refresh(): void;
};

function resolveAos(mod: { default?: AosInstance } | AosInstance): AosInstance {
    if ('init' in mod && typeof mod.init === 'function') {
        return mod;
    }

    if ('default' in mod && mod.default) {
        return mod.default;
    }

    throw new Error('AOS module did not export init.');
}

@Injectable({
    providedIn: 'root'
})
export class AosService {
    private readonly language = inject(LanguageService).language;
    private aos: AosInstance | null = null;
    private destroyed = false;

    constructor() {
        const destroyRef = inject(DestroyRef);

        afterNextRender({
            write: () => {
                void this.init();
            }
        });

        afterRenderEffect({
            read: () => this.language(),
            mixedReadWrite: () => {
                this.aos?.refresh();
            }
        });

        destroyRef.onDestroy(() => {
            this.destroyed = true;
            this.aos = null;
        });
    }

    private async init(): Promise<void> {
        const AOS = resolveAos(await import('aos'));

        if (this.destroyed) {
            return;
        }

        this.aos = AOS;
        AOS.init({
            once: true,
            disable: prefersReducedMotion
        });

        void document.fonts?.ready.then(() => {
            if (!this.destroyed) {
                this.aos?.refresh();
            }
        });
    }
}
