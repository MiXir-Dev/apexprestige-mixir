# SEO Audit and Strategy B Rollout Plan - mrclear.ca

Date: 2026-04-10  
Scope: Technical SEO audit + implemented migration hardening + phased local SEO rollout config.

## Executive Summary
Two issues were active:
1. Migration consistency: old domain/path URLs were not all taking a direct one-hop route to final URLs.
2. Indexing strategy conflict: localized pages were mixed between duplicate-containment and local-ranking intent.

This update implements a safe **Strategy B phase rollout**:
- `/` stays broad homepage.
- Top 5 priority town pages are now configured to be indexable/self-canonical/in sitemap.
- Remaining 5 towns stay in containment mode temporarily (`noindex,follow`, canonical to homepage).
- High-value legacy redirect one-hop rules were added.
- Unknown `/lavage-de-vitres-*` slugs now return HTTP 404 (not HTTP 200 soft-404 behavior) in Netlify.

---

## What Was Implemented (Code)

### 1) One-hop redirect hardening for legacy URLs
File: `public/_redirects`

Implemented:
- Direct 301 for old domain + legacy sector pattern:
  - `https://mr-clear.com/secteurs/:slug -> https://mrclear.ca/lavage-de-vitres-:slug`
  - `https://www.mr-clear.com/secteurs/:slug -> https://mrclear.ca/lavage-de-vitres-:slug`
- Direct 301 for known high-value old short city paths (`/laval`, `/montreal`, etc.) on both old host variants.
- Canonicalization rules kept (`mr-clear.com`, `www.mr-clear.com`, `www.mrclear.ca` -> `mrclear.ca`).
- Legacy path redirect kept (`/secteurs/:slug -> /lavage-de-vitres-:slug`).
- Trailing slash normalization for localized pages.

### 2) Soft-404 mitigation for invalid localized slugs
File: `public/_redirects`

Implemented:
- Explicit 200 rewrites for all known localized URLs.
- Catch rule for unknown localized URLs:
  - `/lavage-de-vitres-* /index.html 404`

Result:
- Known localized pages: normal 200 SPA behavior.
- Unknown localized pages: HTTP 404 (not HTTP 200), while app can still render NotFound.

### 3) Strategy B phased indexability configuration
Files:
- `src/consts/service-areas.ts`
- `src/components/home/getHomeSeo.ts`
- `vite.config.ts`

Implemented:
- Added `STRATEGY_B_PHASE1_SERVICE_AREA_SLUGS` and `INDEXABLE_SERVICE_AREA_SLUGS`.
- Phase 1 indexable towns: `montreal`, `laval`, `terrebonne`, `repentigny`, `mascouche`.
- SEO behavior now depends on rollout set:
  - Phase 1 towns: `index,follow`, **self-canonical**, schema `url` = page URL.
  - Phase 2 towns: `noindex,follow`, canonical = homepage, schema `url` = homepage.
- Sitemap now includes only indexable localized towns (plus core URLs).

Build status: `npm run build` passes.

---

## Task 1 - Top 10 Town Audit and Minimum Differentiation Work

Current top 10 towns in code:
- Montreal, Laval, Terrebonne, Repentigny, Mascouche, Assomption, Boisbriand, Lorraine, Rosemere, Bois-des-Filion.

### Current uniqueness level
All 10 already have localized:
- meta title
- meta description
- hero title/subtitle
- about intro
- service intro
- CTA text
- FAQ intro and localized FAQ set
- contact supporting copy
- nearby areas block

But all still share the same page template and several identical sections/components.

### Minimum changes required per town to be meaningfully distinct
Apply these minimum additions to each town page (same framework, city-specific data):
1. Add one real city-specific proof block (before/after + neighborhood + date or season).
2. Add one city-specific testimonial (name/area/business type).
3. Add one city-specific service constraints paragraph (parking/access/building-type realities).
4. Add one city-specific pricing/estimate guidance snippet (range logic, not fixed quote promises).
5. Expand FAQ with 2 city-specific operational questions (seasonality, municipal constraints, condo/commercial specifics).

### Town-by-town minimum focus
| Town | Existing localized strength | Minimum unique content to add first |
|---|---|---|
| Montreal | Strong title/H1 + localized copy | Add borough-level examples (Anjou, Rosemont, etc.) + condo/plex access cases |
| Laval | Strong localized fields | Add district-specific proof (Chomedey/Vimont) + recurring commercial plan example |
| Terrebonne | Strong localized fields | Add seasonal pollen/road-dust scenario + residential ladder-access case |
| Repentigny | Strong localized fields | Add riverside/weathering context + one commerce storefront case |
| Mascouche | Strong localized fields | Add suburban lot/access patterns + one repeat-customer story |
| Assomption | Localized text present | Add local service radius specifics + one municipal timing example |
| Boisbriand | Localized text present | Add strip-mall/commercial frontage cleaning example |
| Lorraine | Localized text present | Add residential premium-home window detail example |
| Rosemere | Localized text present | Replace generic “Secteur 1..5” nearby labels with real locality names |
| Bois-des-Filion | Localized text present | Add mixed residential/commercial route efficiency proof |

---

## Task 2 - Exact Strategy B Technical Requirements (and Status)

Requirement | Status | Implementation
---|---|---
`index,follow` for rollout towns | Implemented for phase 1 only | `src/components/home/getHomeSeo.ts`
Self-canonical for rollout towns | Implemented for phase 1 only | `src/components/home/getHomeSeo.ts`
Sitemap inclusion for rollout towns | Implemented for phase 1 only | `vite.config.ts`
Structured data URL matches page URL | Implemented for phase 1 only | `src/components/home/getHomeSeo.ts`

### Key code logic now
- Rollout set definition: `src/consts/service-areas.ts`
- Conditional SEO mode:
  - If `serviceArea.slug` in `INDEXABLE_SERVICE_AREA_SLUGS`:
    - `robots = index,follow`
    - `canonical = https://mrclear.ca/lavage-de-vitres-{slug}`
    - schema `url = canonical`
  - Else:
    - `robots = noindex,follow`
    - `canonical = https://mrclear.ca`
    - schema `url = homepage`

### How to flip remaining towns
Edit one list only:
- `INDEXABLE_SERVICE_AREA_SLUGS` in `src/consts/service-areas.ts`

Add more slugs there and build/deploy. Canonical/robots/schema/sitemap will follow automatically.

---

## Task 3 - Redirect Chains and One-hop Replacements

### Redirect mapping table (important legacy URLs)
| Old URL | Final URL | Hops now |
|---|---|---:|
| `https://mr-clear.com/secteurs/laval` | `https://mrclear.ca/lavage-de-vitres-laval` | 1 |
| `https://www.mr-clear.com/secteurs/montreal` | `https://mrclear.ca/lavage-de-vitres-montreal` | 1 |
| `https://mr-clear.com/secteurs/terrebonne` | `https://mrclear.ca/lavage-de-vitres-terrebonne` | 1 |
| `https://mr-clear.com/secteurs/repentigny` | `https://mrclear.ca/lavage-de-vitres-repentigny` | 1 |
| `https://mr-clear.com/secteurs/mascouche` | `https://mrclear.ca/lavage-de-vitres-mascouche` | 1 |
| `https://mr-clear.com/laval` | `https://mrclear.ca/lavage-de-vitres-laval` | 1 |
| `https://mr-clear.com/montreal` | `https://mrclear.ca/lavage-de-vitres-montreal` | 1 |
| `https://mr-clear.com/terrebonne` | `https://mrclear.ca/lavage-de-vitres-terrebonne` | 1 |
| `https://mr-clear.com/repentigny` | `https://mrclear.ca/lavage-de-vitres-repentigny` | 1 |
| `https://mr-clear.com/mascouche` | `https://mrclear.ca/lavage-de-vitres-mascouche` | 1 |
| `https://mrclear.ca/secteurs/laval` | `https://mrclear.ca/lavage-de-vitres-laval` | 1 |
| `https://www.mrclear.ca/secteurs/laval` | `https://mrclear.ca/lavage-de-vitres-laval` | 1 |

Note: explicit one-hop rules were also added for `www.mrclear.ca/secteurs/:slug` and trailing-slash variants.

---

## Invalid Localized URL Audit (Soft-404)

### Current behavior after this update
- `GET /lavage-de-vitres-laval` -> HTTP 200 (valid localized route)
- `GET /lavage-de-vitres-unknown-city` -> HTTP 404 due Netlify rule

### Netlify SPA fallback behavior
- Global fallback remains: `/* /index.html 200`
- This means non-localized unknown routes may still return 200 unless explicitly overridden.

### Safest mitigation if you want full hard-404 coverage site-wide
1. Keep explicit 200 rules for all valid SPA routes.
2. Replace global fallback with `/* /index.html 404` (or targeted subsets) once route inventory is fully controlled.
3. Re-test all valid URLs before enabling globally.

For your current request, localized unknowns are now handled safely.

---

## Task 4 - Phased Rollout Plan (5-10 Towns First)

### Phase 1 (already configured in code)
Indexable towns:
- Montreal, Laval, Terrebonne, Repentigny, Mascouche

Actions:
1. Keep current indexability settings as deployed.
2. Add minimum unique proof/testimonial/FAQ enhancements for these 5 first.
3. Monitor Search Console: index coverage + user vs Google canonical for these 5.

Success gate before phase 2:
- Stable indexing for phase 1 URLs
- No major “Duplicate without user-selected canonical” on phase 1 set
- Early ranking recovery signals on city queries

### Phase 2 (next 5 towns)
Towns:
- Assomption, Boisbriand, Lorraine, Rosemere, Bois-des-Filion

Actions:
1. Add their slugs to `INDEXABLE_SERVICE_AREA_SLUGS`.
2. Deploy after each page gets minimum uniqueness package.
3. Re-submit sitemap and inspect each URL in Search Console.

### Operational cadence
- Roll out in small batches (2-3 towns per release) if monitoring bandwidth is limited.
- Keep redirects stable (no URL churn) during rollout window.

---

## Final Recommendation
- Keep `/` broad and strong.
- Use phased Strategy B as implemented.
- Prioritize content differentiation on phase-1 cities immediately; technical signals are now in place for those pages to be indexed/rank independently.
