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

## 2026-09-17: Recruiter-focused SSAFY implementation stories

- Implemented the approved Netflix-style project detail layout as React components: service purpose, responsibility, four contribution groups per project, selectable implementation cases, interactive diagrams, and concrete outcomes.
- Added 12 cases and 24 diagram views: five for ssFinder (collection, preprocessing, map search, index recovery, matching), four for CheckMate (file security, OCR, test-mode signature, news cache), and three for MyFairy (deployment, runtime routing, members).
- Replaced the old SSAFY code snapshots, placeholder sections and unsupported metrics with reviewed content from the supplied PDF, draft and authored source changes. Public pages omit commit hashes and remaining-work sections; docs/PROJECT_SOURCES.md records provenance and expression boundaries.
- Corrected SSAFY dates and team composition from the PDF detail pages. Lists, search, previews and detail pages now share the revised purpose, technologies and contribution text. Preserved the requested company/SSAFY ordering and both company records.
- Added typed diagram data and a recursive renderer without raw HTML or new dependencies. Numbered native buttons support keyboard selection and announce the selected explanation. Project, case and view changes reset selection to a valid step.
- Added three compressed WebP detail covers from the approved prototype, about 140 KB combined. Scoped styles preserve the shared header and adapt diagrams to a vertical flow on small screens.

Routes: /projects/checkmate, /projects/sumsum-finder, /projects/my-fairy. Existing /projects/khope and /projects/tlatfarm continue using their existing detail renderer.

Modules: FE/src/assets/projectStories.ts, FE/src/types/projectStory.ts, FE/src/components/ProjectStoryDetail.tsx, FE/src/styles/project-story.css. Integration: FE/src/assets/projects.ts and FE/src/pages/ProjectDetail.tsx.

Validation:

- ESLint, TypeScript project build, Vite production build and git diff --check passed. Invoked the installed CLI entry points with the bundled Node runtime.
- Content integrity check passed for all 12 cases and 24 views, valid step references, existing covers and shared metadata; both company records matched origin/master exactly.
- Browser checked all 24 views at desktop width and 320 px: no horizontal overflow or clipped diagram text. A 390 px visual check and keyboard Enter confirmed the selected explanation updates correctly. Browser error log was empty.
- Verified project list ordering, updated CheckMate preview metadata, preview-to-detail navigation, browser Back, the existing K-HOPE detail, and SSAFY search returning three projects. Reset the temporary viewport override afterward.

Preview: http://127.0.0.1:5174/projects/checkmate. These checks cover the local application and production build; this change does not publish a deployment.


## 2026-09-17: K-HOPE contribution stories

- Replaced the generic K-HOPE responsibilities with four contribution groups and five implementation cases: research conditions, shared output formatting, execution cancellation, AI streaming, and asynchronous results/notifications.
- Compared the owner's committed changes and authorship locally. Published only generalized engineering descriptions and diagrams. Internal repository identifiers, source excerpts, endpoints, schemas, actual records and detailed business rules are not included in the page, public documentation or PR. The reviewed work repositories were not modified.
- Added FE/src/assets/khopeStory.ts with ten diagram views, and registered it in the existing project story data. Shared the updated technologies and responsibilities with the catalog preview and experience page.
- Updated the common story renderer to support an official public reference and an unknown team size. Existing SSAFY repository links and team metadata remain intact.
- Added a direct K-HOPE implementation link in the work experience entry. Recorded public content boundaries in docs/KHOPE_CONTENT.md and updated the career source notes.

Routes: /projects/khope, /projects, /experience. No new runtime dependencies or deployment changes.

Validation: ESLint, TypeScript and Vite production build passed. Content checks verified diagram explanation references, shared metadata, public-only references and a focused scan for internal identifiers. Desktop and 320px browser checks covered all ten new diagram views with no horizontal overflow or clipped text; keyboard selection updated the explanation. Visually checked the cover and mobile layout. Confirmed career-to-detail and preview-to-detail navigation, updated preview text, and CheckMate's existing team metadata and repository link. Browser error log was empty; temporary viewport override reset. git diff --check passed.

Preview: http://127.0.0.1:5174/projects/khope.


## 2026-09-17: Airflow data preparation and aggregation

- Added the owner's separately supplied DAG work to K-HOPE after static source inspection. Kept the backend-first case order and four contribution groups; the Airflow case has separate data-loading and daily-aggregation diagrams with eight selectable explanations.
- Data-loading description covers manual full replacement, a server-side cursor, chunked reads, bulk insertion, per-chunk commits and row-count comparison. It does not claim incremental replication or whole-run atomicity.
- Daily-aggregation description covers target selection, existing-result filtering, explicit rebuild, dynamic task mapping, bounded concurrency, result validation and task outcome summaries. It does not claim production execution verification or complete idempotency.
- Added Python, Airflow and PostgreSQL to shared project technologies and added the data work to the career entry. Updated source notes to distinguish supplied DAGs from previously inspected authored API commits.
- DAG files were read only, not imported, executed, copied into this repository or modified. Internal identifiers, schedules, settings, SQL and business rules were omitted from public content.

Validation: ESLint, TypeScript and Vite build passed. All story explanation references and shared metadata passed the content check; a scoped scan found none of the reviewed internal identifiers in the public content. Browser verified both Airflow views and all eight step explanations on desktop, both views at 320px, keyboard selection, and career-to-detail navigation. No horizontal overflow, clipped text or browser errors. Temporary viewport override reset; git diff --check passed.

Preview: /projects/khope → Airflow 데이터 적재·집계. K-HOPE now contains six cases and twelve diagram views.


## 2026-09-17: Text-to-SQL training-data preparation tool

- Added the data-authoring tool to K-HOPE using the owner's stated project relationship and purpose. Read the supplied site and corresponding local implementation to verify concept/expression management, relationship visualization, validation and JSON/ZIP output. Did not claim commit attribution for this separately supplied tool.
- Added a case between research APIs and Airflow: concept/expression input and persistence, hierarchy/group visualization, missing/duplicate/reference checks, and file preview/export. The diagram describes the author's workflow, not a mandatory export approval gate.
- Extended the shared contribution summary, technologies and career entry. Preserved the four contribution groups and existing layout. K-HOPE now contains seven cases and fourteen views.
- Described the output as concept, expression and relationship data used to prepare Text-to-SQL training materials. Did not claim automatic question/SQL-pair generation, model training or measured model accuracy gains.
- No live data edits, dataset downloads, source copies, actual domain data, source-site screenshots or internal identifiers were added to the portfolio. Reviewed application files were not modified.

Validation: ESLint, TypeScript and Vite production build passed. All diagram explanation references and shared metadata passed the content check; focused public-content scan passed. Browser verified the two new views at desktop and 320px, all four explanations via keyboard, and career-to-detail navigation. No overflow, clipped text or browser errors. Temporary viewport override reset; git diff --check passed.

Preview: /projects/khope → Text-to-SQL 학습 데이터.


## 2026-09-17: TlatFarm historical contribution stories

- Replaced the sparse TlatFarm detail with the shared project-story layout: service purpose, responsibilities, four contribution groups, three cases and six diagram views. Kept the existing cover and company/SSAFY ordering.
- Led with the Cloud Run background-execution issue and Cloud Tasks request separation. Included the build/runtime overview, Pub/Sub drone-data receiving, and BigQuery energy aggregation/service integration. Nine selectable explanations distinguish personal backend work from the overall drone/AI product flow.
- Used the owner's historical account, their public technical article and deployment diagram, the existing PDF, and Google CPU allocation/Cloud Tasks documentation. Read the provided production site only to understand visible product functions; did not change settings, schedule flights or alter records. No private access details, live records or new production screenshots were added.
- Kept the blog's Contact-email reproduction distinct from the separately reported drone-reservation contribution. Did not equate CPU throttling with scale-to-zero or invent data schemas, ingestion protocols, exact aggregation schedules, measured results or delivery guarantees. No source-code audit is claimed for this company project.
- Removed unverified legacy team counts and GCS/webhook/entity-mapping copy. Shared metadata and contribution summaries across preview/detail/career; added the TlatFarm career-to-detail link and preserved the official CES project reference.
- Added docs/TLATFARM_CONTENT.md and updated docs/CAREER_SOURCES.md with source and attribution boundaries.

Routes: /projects/tlatfarm, /projects, /experience. New data module: FE/src/assets/tlatfarmStory.ts. No new dependencies or runtime component changes.

Validation: ESLint, TypeScript and Vite production build passed. Content checks covered all story step references, existing covers, shared metadata, the TlatFarm dates and removed unknown team fields. Browser verified all six views on desktop and at 320px with no horizontal overflow or clipped diagram text, all nine explanations by keyboard, career-to-detail and preview-to-detail navigation, and the five-project order. Desktop/mobile visuals and existing cover were checked; browser error log was empty. Temporary viewport override reset; git diff --check passed.

Preview: http://127.0.0.1:5174/projects/tlatfarm. Local verification does not claim a production deployment.


## 2026-09-17: TlatFarm cover replacement

- Replaced the legacy application screenshot with a generated cinematic drone-and-crop-field cover, matching the photographic direction of the other project posters. Kept title text in the existing HTML overlays.
- Saved FE/public/artwork/tlatfarm-cover.webp at 1672 × 941 (219,510 bytes), encoded from the generated PNG without changing dimensions. Home/list artwork, preview and detail now share the new asset; removed the unreferenced old screenshot.
- Added an optional image-position setting to the shared story metadata and applied it in the preview/detail renderers so narrow mobile crops and wide detail banners retain the drone. Other projects keep their existing positioning.
- Recorded the built-in generation mode, exact prompt and conceptual nature of the artwork in docs/TLATFARM_ARTWORK.md; updated the project source note.

Validation: ESLint, TypeScript and Vite production build passed. Visually checked desktop list, preview and detail and 320px preview/detail; the drone remains visible and title text readable. Mobile preview loaded the new asset with no horizontal overflow. Browser error log empty; viewport override reset. git diff --check passed. No new dependencies.


## 2026-09-17: All-project home billboard

- Replaced the ssFinder-only home billboard and hard-coded copy with the five projects in catalog order: K-HOPE, TlatFarm, CheckMate, ssFinder, MyFairy. Image, title, tagline, description, category and destination now come from the selected project.
- Added previous/next, direct project selectors, current position and an explicit rotation toggle. Automatic rotation advances every eight seconds; manual selection and keyboard interaction stop it. Effects suspend the timer on pointer hover, when the tab/banner is not visible, or while a preview is open. Reduced-motion preference disables automatic playback by default and CSS fades; an explicit play action remains available.
- The primary link and details dialog both use the displayed project's slug. Existing company/SSAFY rows and their ordering remain intact.
- Added FE/src/styles/portfolio-hero.css for the responsive controls and title styles. Added a title-free variant of the existing K-HOPE SVG for the billboard to avoid duplicate baked-in text; adjusted TlatFarm's tall-banner crop separately from its card/detail crop. No new dependency or image-generation call.

Routes: /portfolio/leeyj and its existing project-preview/detail links. Modules: PortfolioHero.tsx, Portfolio.tsx, catalog.ts, portfolio-hero.css.

Validation: ESLint, TypeScript and Vite build passed. Browser checked all five slides at 1280px and 320px: images loaded, one selector active, matching titles and destinations, no horizontal overflow, clipped text or CTA/control overlap. Keyboard selection, previous/next wraparound and all five matching detail dialogs passed. Observed automatic advancement and explicit pause remaining stable beyond the rotation interval. Reviewed hover/visibility/reduced-motion guards in source; the automation did not reliably establish native pointer hover, so no browser hover-pass claim is made. Browser error log empty. Temporary viewport override reset; git diff --check passed.
