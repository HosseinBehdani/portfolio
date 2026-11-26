import { isDevMode } from '@angular/core';

export const reactAppUrl = isDevMode()
    ? 'http://localhost:5173/react/'
    : '/react/';