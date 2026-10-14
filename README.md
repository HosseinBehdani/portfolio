# Portfolio

A multi-framework portfolio built with Angular, React, and Next.js.

## Architecture

This project uses a Monorepo architecture with shared:

- Data
- Translations
- TypeScript Types
- Assets
- Design System
- Design Tokens

## Applications

- Angular — current implementation
- React — same shared packages
- Next.js — same shared packages

React and Next.js should import content from `@portfolio/data` and `@portfolio/translations`, types from `@portfolio/types`, and styles from `@portfolio/design-system/theme`, `@portfolio/design-system/typography`, and `@portfolio/design-system/fonts`. Run `pnpm sync:assets` so each app serves fonts and images from `/assets`.

## Scripts

```bash
pnpm sync:assets      # copy shared fonts/images into each app
pnpm typecheck        # shared types + data + Angular
pnpm build            # production Angular build
pnpm ng               # Angular dev server
```

## Release checklist (Angular)

1. Confirm production URL in `apps/angular/src/index.html`, `SeoService` (`SITE_URL`), `public/robots.txt`, and `public/sitemap.xml`.
2. Run `pnpm typecheck` and `pnpm build`.
3. Serve the build (`pnpm --filter angular serve:prod` or host `dist/angular/browser`).
4. Serve the build, then run Lighthouse:
   ```bash
   pnpm --filter angular serve:prod
   # in another terminal:
   pnpm lighthouse
   ```
5. Verify `robots.txt`, `sitemap.xml`, Open Graph preview, favicon, and language/theme persistence.
6. Re-submit the sitemap in Google Search Console after the final domain is set.

### Latest local Lighthouse (desktop, production build)

| Category | Score |
|----------|-------|
| Performance | 92 |
| Accessibility | 100 |
| Best Practices | 96 |
| SEO | 100 |