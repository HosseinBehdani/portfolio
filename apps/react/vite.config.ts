import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const BASE = '/react/';

// Components and CSS reference shared files as "/assets/...".
// In production those exist at the site root. In dev the app is served under
// BASE, so forward "/assets/..." to "BASE/assets/..." to keep them working.
function devAssetsRewrite(): Plugin {
    return {
        name: 'dev-assets-rewrite',
        apply: 'serve',
        configureServer(server) {
            server.middlewares.use((req, _res, next) => {
                if (req.url?.startsWith('/assets/')) {
                    req.url = `${BASE}${req.url.slice(1)}`;
                }
                next();
            });
        }
    };
}

export default defineConfig({
    base: BASE,
    plugins: [react(), devAssetsRewrite()],
    build: {
        outDir: '../../dist/deploy/react',
        emptyOutDir: true
    }
});
