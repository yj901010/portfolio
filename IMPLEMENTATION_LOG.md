# Netflix-inspired portfolio refinement

Date: 2026-09-16
Branch: `codex/netflix-portfolio-polish`

## Scope

Refined the existing React / TypeScript / Vite application. The main browse experience now uses a cinematic billboard, horizontal artwork rows, desktop card expansion, project preview dialogs, search, and a persisted personal list. Profile selection, navigation, intro, and footer follow the same visual language. The project detail body, skills, experience, certifications, and contact retain their existing content and page structure.

No new employment history, project measurements, performance claims, or project completion dates were introduced. Artwork is symbolic cover art, not evidence of project output. Prompts and paths are recorded in `docs/ARTWORK_PROMPTS.md`.

## Routes

- `/`: short MYFLIX intro, skip control, reduced-motion handling.
- `/browse`: profile selection and direct project entry.
- `/portfolio/leeyj`: billboard and curated project rows.
- `/projects`: all existing projects.
- `/projects/:slug`: existing technical project detail.
- `/search?q=Kafka`: search project names, descriptions, roles and technologies.
- `/my-list`: local browser saved projects; no account or server dependency.
- `/skills`, `/experience`, `/certs`, `/contact`: existing information pages under the shared navigation.

## Main modules

- `assets/catalog.ts`: artwork mapping and existing project catalog.
- `components/AppNav.tsx`: search, desktop navigation, mobile and profile menus.
- `components/PortfolioHero.tsx`, `components/Row.tsx`: billboard and horizontal browse rows.
- `components/ProjectPreview.tsx`: native dialog with Escape, focus restoration and scroll locking.
- `hooks/useMyList.ts`: storage-backed saved list shared across routes and tabs.
- `pages/Projects.tsx`: gallery, search results and saved-list views, including empty states.
- `index.css`: browse styling, responsive layouts and reduced-motion behavior.

Also fixed pre-existing build/lint issues: obsolete Project type import, conditional hook, empty catch, unnecessary quote escapes and untyped Vite environment access. Added `.gitignore` because the previous file was named `gitignore` without the leading dot.

## Verification

- `npm run lint`: passed, no errors or warnings.
- `npm run build`: passed TypeScript and Vite production build (1,727 modules).
- `git diff --check`: passed.
- Browser: desktop billboard, profile selection, project preview and detail navigation rendered successfully.
- Browser: saved a project, reloaded, confirmed persistence, removed the test item and confirmed the empty state.
- Browser: Kafka search returned the existing matching project; unmatched query showed the empty state.
- Browser: preview closed with Escape; mobile navigation opened and closed.
- Responsive: 390px home and 320px preview checked. Fixed aspect-ratio-driven cover overflow; dialog clientWidth and scrollWidth both 285px at 320px viewport. No failed home images observed. Temporary viewport override reset.

## Local preview

From `FE`, run `npm run dev -- --host 127.0.0.1 --port 5174 --strictPort`.
Open `http://127.0.0.1:5174/portfolio/leeyj`.

## Follow-up design work

This is an initial refinement of the browse experience, not a claim of pixel-identical Netflix reproduction. Technical detail pages still use the original reading layout. A later content pass can refine their structure, remove incomplete original sections, and replace symbolic covers with project-specific motion or imagery if desired. Generated PNG originals remain unmodified; image encoding and loading budgets can be optimized before deployment.

## 2026-09-16: Simplified navigation and credential records

This update supersedes the saved-list behavior described above.

- Removed saved-list buttons, menu/footer links, the saved-list route, and the unused storage hook. Existing browser data is no longer read or written.
- Replaced the three visually separate home navigation cards with a quiet row of text links.
- Renamed the credential area to 자격·수료·수상. Grouped all 8 existing records into 2 licenses, 3 courses and 3 awards, with dates descending within each group. Empty categories do not appear as filters.
- Added aligned list rows for title, issuer, technology context and dates, plus explicit evidence buttons. Existing factual values and certificate originals are unchanged.
- Replaced the evidence overlay with a native dialog: focus trap, Escape, focus restoration, scroll locking, load/error states and original-file links.
- Embedded PDFs appeared blank in the in-app browser. Rendered and visually inspected all three single-page PDFs with Poppler at 1400px into FE/public/certs/previews. The dialog now displays these previews while retaining links to the original PDF files; no PDF runtime dependency was added.
- New styles: FE/src/styles/records.css. New optional certificate property: previewImageUrl.

Validation: npm run lint, npm run build and git diff --check passed. Browser checks covered category filters, image and PDF-derived evidence, close/focus restoration, 390px and 320px layouts, document/dialog width overflow, and zero remaining home saved-list controls. All home cover images loaded successfully. Three project covers remain symbolic artwork; TlatFarm uses the existing service screenshot.

Preview: http://127.0.0.1:5174/certs

## Follow-up correction

- Corrected the encouragement award to September 2023 per the user; preserved the existing day value. Updated its internal ID to match the corrected year.
- Restored the previous three-card home section headed 개발자를 더 알아보는 방법 and removed the superseded text-link styles. Kept the current credential page and removed saved-list feature.

## 2026-09-16: Verified employment content and technical references

- Added ITeyes / K-HOPE employment from February 2026, with user-confirmed API implementation, WebSocket/streaming/webhook integration and Airflow collection tasks.
- Corrected Turbine Crew employment end to 2026-02-01. Added user-confirmed TlatFarm backend/infrastructure, Pub/Sub drone data, BigQuery energy aggregation and Cloud Tasks work.
- Linked the official CES project award, ITeyes project reference and the user's Cloud Run article. Kept the project award distinct from individual recognition.
- Corrected TlatFarm participation-period metadata and technology list so project previews agree with employment content.
- Kept the existing timeline layout. Added a scrollable native detail dialog with focus restoration, Escape handling and URL-derived selection so browser Back closes a detail view correctly. Added header clearance.
- Recorded provenance and unresolved differences in docs/CAREER_SOURCES.md; no original PDF edits or publication.

Validation: npm run lint and npm run build passed. git diff --check passed. Browser verified both company records, the source links, desktop and 390px detail layout with no horizontal overflow, Escape and browser Back restoring the page/scroll state. Temporary viewport override reset.
## 2026-09-16: Experience page reading layout and case study

- Replaced the alternating timeline, colored badges and glow effects with aligned company/date and responsibility columns in the existing Netflix-inspired dark theme.
- Grouped records into 실무 경력 (2), 교육·프로젝트 (4), and 이전 경험 (2), with anchor navigation. Both current and former company responsibilities are visible without opening a detail view.
- Added a TlatFarm Cloud Run case study organized by problem, CPU allocation cause, Cloud Tasks decision, and implementation, with the user's Velog source. The blog's Contact-form email example is explicitly identified; no unverified performance or cost metrics were added.
- Rewrote education descriptions around concrete project work and linked the existing Checkmate, 숨숨파인더 and MyFairy routes. Preserved factual roles, dates and GPA.
- User confirmed KOCCA internship as 2020.09–2020.12; resolved the PDF discrepancy in docs/CAREER_SOURCES.md.
- Kept URL-driven experience details, native dialog accessibility, body scroll locking and focus restoration. Preserve the current hash when opening a case; restore the reading position after browser history traversal. Scoped dark scrollbars and stable scrollbar space prevent layout shifts.
- Removed the nested main landmark. Added responsive stacked layouts and readable mobile dates. Home, credentials and project-detail pages were not modified in this pass.

Modules: FE/src/pages/ExperienceTimeline.tsx, FE/src/assets/timelineData.ts, FE/src/styles/experience.css.

Validation: npm run lint and npm run build passed. Browser verified desktop, 390px and 320px layouts; no horizontal overflow in the page or case dialog. Escape restored the trigger focus and body scrolling. Browser Back with an active section hash closed the case and preserved scrollY (1615 before/after) and button focus. Section links clear the fixed header. Browser error log was empty. Temporary viewport override reset.

Preview: http://127.0.0.1:5174/experience
## 2026-09-16: Company and SSAFY project collections

- Added K-HOPE using confirmed ITeyes responsibilities: API implementation, WebSocket/streaming/webhook integration, and Airflow collection. Unknown team size/composition and outcome metrics are omitted.
- Added project category, organization and short service summaries. Home and /projects now share company projects (K-HOPE, TlatFarm) followed by SSAFY projects (Checkmate, 숨숨파인더, MyFairy), in the order explicitly supplied by the user.
- Company projects use two columns and SSAFY uses three on desktop; the full list stacks on mobile while home retains horizontal browse rows. Preserved the existing hero and developer-navigation cards.
- Added an original SVG typography cover for K-HOPE; it is not a service screenshot or official logo. Existing other covers remain in use.
- Preview metadata identifies company/SSAFY and organization; responsibility labels replace duplicated technology-as-category labels. Search includes organization and project category.
- /projects/khope is navigable with confirmed contributions and an official business-reference link. Common details skip absent scenarios, diagrams, code and results, and no longer nest main landmarks.
- Existing SSAFY date strings remain unchanged pending the optional clarification about the PDF detail-page dates. Category ordering uses the user's explicit sequence rather than parsing those inconsistent legacy date strings.

Validation: npm run lint, npm run build and git diff --check passed. Browser verified company/SSAFY order on home and /projects; K-HOPE preview and detail navigation; no unknown team values or empty placeholders on K-HOPE; searches for SSAFY (3) and K-HOPE (1); loaded images; 390px list and 320px dialog without horizontal overflow; Escape and focus restoration. Temporary viewport reset.