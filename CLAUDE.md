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

**Production deployment:** GitHub Pages via `.github/workflows/deploy.yml`. Production `baseHref` is `/vobaquan/` — this affects asset paths and router links. Built output lands in `dist/vobaquan/browser/`.

**Bundle budgets:** 500 KB initial warning / 1 MB error; 4 KB / 8 KB per component stylesheet. Keep lazy-loaded routes to stay within budget.

**Testing:** Tests live alongside source files (`*.spec.ts`). Use `TestBed.configureTestingModule` with standalone component imports. Run a single test file with:
```bash
npx vitest run src/app/app.spec.ts
```

## Styling & Design System

**Tailwind CSS 4 (CSS-first):** No `tailwind.config.js`. Theme tokens are declared inside a `@theme { }` block in `src/styles.css`, which overrides Tailwind defaults. Do not create a JS config file.

**Design tokens** live in `:root` custom properties inside `src/styles.css` — a vintage autumn palette (deep espresso, warm cream, burnt orange, gold), four Google Fonts (Playfair Display, Lora, IM Fell English, Courier Prime), and a full spacing/animation library. Always use these tokens (`var(--color-*)`, `var(--font-*)`, etc.) rather than hard-coding values.

**Scroll-reveal pattern:** Add `#reveal` template reference variable to any element you want to animate on scroll. The `Home` component wires an `IntersectionObserver` (threshold 0.12) via `@ViewChildren('reveal')` to add the `.revealed` class, which triggers the `fadeUp` CSS animation defined in `styles.css`.

## Code Style

Prettier is configured (`.prettierrc`): 100-char print width, single quotes, Angular HTML parser. Run `npx prettier --write .` to format.
