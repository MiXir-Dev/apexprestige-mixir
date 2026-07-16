# Repository Guidelines

## Project Structure & Module Organization
- `src/` contains the React + TypeScript app. Key entry points live in `src/main.tsx` and `src/App.tsx`.
- Page-level routes are in `src/pages/` (e.g., `Index.tsx`, `Quote.tsx`).
- Reusable UI pieces are in `src/components/`, with Radix/shadcn-style primitives under `src/components/ui/`.
- Static assets (images, icons, robots, redirects) live in `public/`.
- Build configuration is in `vite.config.ts`, `tailwind.config.ts`, `tsconfig*.json`, and `eslint.config.js`.

## Build, Test, and Development Commands
- `npm install`: install dependencies.
- `npm run dev`: start the Vite dev server for local development.
- `npm run build`: create a production build in `dist/`.
- `npm run build:dev`: create a development-mode build (useful for debugging build issues).
- `npm run preview`: serve the production build locally.
- `npm run lint`: run ESLint over the codebase.

## Coding Style & Naming Conventions
- Use TypeScript + React with functional components and hooks.
- Indentation follows existing files: 2 spaces in TS/TSX, with semicolons.
- Favor single quotes in TS/TSX unless a file is already using double quotes.
- Component and file names use PascalCase (e.g., `QuoteForm.tsx`, `ServiceAreaTemplate.tsx`).
- Linting is handled by ESLint (`eslint.config.js`); run `npm run lint` before pushing.

## Testing Guidelines
- No automated test framework or test scripts are configured.
- There are no `*.test.*` or `*.spec.*` files currently.
- Validate changes via manual QA in the dev server and run `npm run lint`.

## Commit & Pull Request Guidelines
- Recent commit messages are short, lowercase, and direct (e.g., “google analytics setup”). Keep messages concise and action-oriented.
- Pull requests should include a clear description of changes, affected pages/routes, and screenshots for visual updates (desktop + mobile).
- Link relevant issues or tickets when applicable, and call out any SEO or analytics impacts.

## Configuration & Deployment Notes
- The project uses Vite + Tailwind CSS + Radix UI/shadcn components. Tailwind styles are in `src/index.css` and `src/App.css`.
- Netlify configuration lives in `netlify.toml` and redirects in `public/_redirects`.
