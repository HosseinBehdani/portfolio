import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

import AosProvider from './app/providers/aos/AosProvider';
import LanguageProvider from './app/providers/language/LanguageProvider';
import ThemeProvider from './app/providers/theme/ThemeProvider';

import './styles/index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <LanguageProvider>
                <AosProvider>
                    <App />
                </AosProvider>
            </LanguageProvider>
        </ThemeProvider>
    </StrictMode>
);