# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server at http://localhost:4200 (auto-reloads)
npm run build      # Production build → dist/
npm run watch      # Development build in watch mode
npm test           # Run unit tests with Vitest
```

To generate Angular artifacts via CLI:
```bash
npx ng generate component path/to/component
npx ng generate service path/to/service
```

## Architecture

**Angular 21 standalone SPA** — no NgModules anywhere. All components use the standalone API.

**Bootstrap flow:** `src/main.ts` → `bootstrapApplication(App, appConfig)` → `src/app/app.config.ts` (providers/router setup) → `src/app/app.routes.ts` (route definitions).

**Key conventions:**
- Standalone components only — import dependencies directly in `@Component({ imports: [...] })`
- Tailwind CSS 4 for all styling (global import in `src/styles.css`; no SCSS)
- Signals preferred for component state (`signal()`, `computed()`)
- RxJS for async/stream operations
- Vitest + Angular TestBed for unit tests (not Karma/Jasmine)
- Strict TypeScript — all strict compiler flags enabled

**Routing:** Add routes to `src/app/app.routes.ts`. The root component renders `<router-outlet>`. Lazy-load feature components with `loadComponent`.

**Testing:** Tests live alongside source files (`*.spec.ts`). Use `TestBed.configureTestingModule` with standalone component imports. Run a single test file with:
```bash
npx vitest run src/app/app.spec.ts
```

## Code Style

Prettier is configured (`.prettierrc`): 100-char print width, Angular HTML parser. Run `npx prettier --write .` to format.
