# Recruiter portfolio

## Review path

The previous Netflix-inspired site made the reviewer pass through an intro/profile choice and a cinematic billboard before reviewing the candidate. Its self-rated skill levels did not directly show the evidence behind each technology.

The recruiter version opens at the candidate's name, backend role, current company and contact links. The home page follows this order:

1. Recent professional experience and personal responsibility.
2. Company projects, then SSAFY team projects in the existing chronological order.
3. Technologies paired with links to implementation cases.
4. Education, qualifications, awards and proof documents.
5. Contact details.

Each project summary distinguishes the service purpose from the author's contribution. Project detail pages keep the existing interactive implementation diagrams, with a visible case index and shareable `?case=<id>#implementation` URLs. Existing content attribution remains documented in PROJECT_SOURCES.md, KHOPE_CONTENT.md, TLATFARM_CONTENT.md and CAREER_SOURCES.md. This change does not re-audit the company repositories or establish new performance measurements.

## Visual decisions

- Warm offwhite background, dark text, quiet green accents and ruled document sections.
- Smaller static project covers; no intro gate, profile picker or autoplay media in mounted routes.
- Actual use of technologies replaces self-assessed proficiency labels.
- Desktop project navigation sits beside the selected case; small screens stack controls and diagram steps.
- Keyboard focus, a skip link, empty search state, missing-page state and print styles are provided.
- Print/PDF buttons invoke the browser's print dialog; they are not links to a separately authored resume PDF. Project detail printing includes the currently selected case.

## Branches and recovery

- `codex/netflix-portfolio-archive` preserves the merged Netflix implementation, its five video previews and the owner's K-HOPE description edit at commit `1fe5ec5`.
- `codex/recruiter-portfolio` contains this redesign. It branches from the preserved snapshot.
- The remote default branch remains `master`. Neither this work nor the archive operation merges or deploys a release.
- To return to the previous version after saving current work: `git switch codex/netflix-portfolio-archive`.

Old Netflix components and media remain available in source, but are not mounted by the recruiter router. No new frontend dependencies were introduced.

## Modules and routes

- `RecruiterLayout.tsx`: common navigation, anchor focus/scroll and footer.
- `RecruiterHome.tsx`: candidate overview, career, projects, evidence-linked skills and records.
- `RecruiterProjectList.tsx`: shared project rows and URL-backed local search.
- `RecruiterProject.tsx`: detail lookup and missing-page handling.
- `recruiterData.ts`: concise summaries and case links over existing project data.
- `ProjectStoryDetail.tsx`: responsibility summary, case selection and existing diagram interactions.
- `recruiter.css`: document layout, responsive styles, light diagram overrides and printing.

Routes: `/`, `/projects`, `/projects/:slug`, `/search`. Legacy `/portfolio/:profileId` and `/browse` redirect home; `/experience`, `/skills`, `/certs` and `/contact` redirect to the matching home section. Unrecognized routes display a visible recovery link.

## Validation

- ESLint, TypeScript and Vite production build passed.
- Data checks: five project/story/brief mappings, 25 direct case links, five cover files and eight certificate assets passed.
- Browser: desktop home/project index and case detail; 320px home and CheckMate case; 768px TlatFarm, ssFinder and MyFairy details. No horizontal overflow in the inspected views.
- Search returns ssFinder for Kafka and a recovery action for no match.
- Direct case links, CheckMate view switching, keyboard case selection and project selection passed. Existing profile URL redirects home; the skills shortcut focuses its section. Missing project displays the 404 recovery view.
- Static images loaded and the mounted home contains no video element. Browser error log checked after navigation.
- Print stylesheet reviewed in source; an exported PDF was not visually tested.

Possible later work: replace conceptual project covers with approved product screenshots if desired, and write a separate short resume PDF. Neither is required to use this portfolio.
