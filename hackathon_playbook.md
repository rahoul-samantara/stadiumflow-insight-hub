# Hackathon Playbook: The 98%+ Standard

This playbook contains clear, precise directives for developing high-scoring hackathon projects. It outlines the pipeline from initial UI prototyping to final agentic optimization, ensuring a robust, accessible, and highly-scored final submission.

## 1. Workflow Pipeline: Lovable to Antigravity

**Phase 1: UI Prototyping (Lovable)**
- Build the initial visual prototype and UI components in Lovable.
- Focus strictly on UX design, layout, layout responsiveness, and visual polish.
- Avoid spending excessive time on complex mock data or heavy business logic; focus on the visual shell and user journey.

**Phase 2: Transition & Logic Integration (Antigravity)**
- Seamlessly transition the Lovable codebase to Antigravity for logic implementation.
- Wire up real state management, data fetching, and API integrations.
- Implement robust error boundaries, skeleton loaders, and error fallbacks to ensure the transition from a visual prototype to a functional app is flawless.

## 2. Code Quality & Compilation (Zero-Tolerance Policy)

- **Strict Type Checking:** Never merge or submit code with TypeScript errors. Run the TypeScript compiler (`npx tsc --noEmit`) to verify zero errors before proceeding.
- **No `any` Types:** Define explicit interfaces for all data payloads and external APIs. If using undocumented browser APIs, declare custom ambient interfaces locally.
- **Valid JSX Hierarchy:** Ensure all JSX tags match perfectly. Run formatters to catch structural errors early.
- **Clean Builds:** The codebase must successfully compile in a production build environment (`npm run build`). Dev-mode successes do not guarantee production stability.

## 3. Seamless Error Handling & Robustness

- **Global Error Boundaries:** Wrap all major routing endpoints and complex components in React Error Boundaries to prevent full-page crashes.
- **Graceful Fallbacks:** Implement skeleton loaders for asynchronous data and clear fallback messages when APIs fail.
- **Safe Type Casting:** Use `unknown` to strictly type mock data when necessary, avoiding bypasses that weaken the application's type safety.

## 4. Testing Excellence (Target: >95% Coverage)

- **Comprehensive Scope:** Target >95% global line and statement coverage using tools like Vitest.
- **Component Isolation:** Mock heavy external boundaries (e.g., Databases, complex Data Hooks) so tests focus purely on component behavior.
- **Safe Component Casting:** When testing lazy-loaded routing components, cast them explicitly to a React Component Type to avoid union-type errors during test renders.

## 5. Accessibility Mastery (WCAG 2.1 AA)

- **Keyboard Navigation:** Include a visually hidden "Skip to main content" link at the top of the application tree.
- **Screen Reader Support:** Use `aria-live="polite"` on any container that updates dynamically (e.g., chat interfaces, live calculators, status updates).
- **Semantic Wrappers:** Do not force `aria-*` tags onto third-party library components that do not support them. Wrap them in a semantic `div` with the necessary accessibility tags instead.

## 6. Pre-Flight Submission Checklist

Execute this checklist before any final submission:
- [ ] **Linter:** Linter yields 0 warnings or errors.
- [ ] **Formatter:** Codebase is fully formatted.
- [ ] **TS Compiler:** `npx tsc --noEmit` exits silently with 0 errors.
- [ ] **Build:** Production build completes successfully.
- [ ] **Tests:** Test suite passes with >95% coverage.
- [ ] **Alignment:** Every feature requested in the problem statement is fully functional—no "Coming Soon" or placeholder UI.
- [ ] **Security:** No hardcoded secrets exist in the source code.
