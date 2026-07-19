# 🏆 The 100/100 Hackathon Playbook
*A definitive checklist for scoring 98-100 across all automated CI/CD and AI Evaluator parameters (Hack2Skill / PromptWars).*

---

## 1. Code Quality & Maintainability (Target: 100)
Automated scanners do not just read your logic; they read your formatting, types, and documentation.
- [ ] **Squash All Lint Warnings:** A single "unused variable" or "missing dependency in useEffect" will drop your score. Ensure `npm run lint` returns `0 warnings`.
- [ ] **Format Line Endings (CRLF vs LF):** Prettier throws invisible errors if files are edited across Windows/Mac. Run `npx prettier --write .` before submission to avoid hidden "Delete \r" penalties.
- [ ] **JSDoc Everything:** Exported functions, interfaces, and React components **must** have `/** JSDoc */` comments. Evaluators use this to gauge maintainability.
- [ ] **Strict TypeScript:** Avoid `any` types at all costs. Use `unknown` or strictly defined interfaces. Ensure `tsconfig.json` has `"strict": true`, `"noUnusedLocals": true`, and `"noUnusedParameters": true`.

## 2. Testing Coverage (Target: 100)
- [ ] **Test Auto-Generated Files:** If you use scaffolding tools like Lovable or Vercel v0, **do not ignore the files they generate** (e.g., `lovable-error-reporting.ts`). Scanners check the *entire* `src` directory. If generated files lack tests, your coverage average drops.
- [ ] **Full-Stack Testing:** Do not just test utility functions. Mount React UI components in your tests using `@testing-library/react` (e.g., checking if a badge renders correctly).
- [ ] **Mock External APIs:** If your code uses AI APIs (like Groq) or `import.meta.env`, mock them in your tests using `vi.stubEnv` or `vi.stubGlobal` so tests pass reliably in the CI/CD pipeline where those keys don't exist.

## 3. Problem Statement Alignment (Target: 100)
AI Evaluators use RAG (Retrieval-Augmented Generation) to compare your codebase against the hackathon prompt.
- [ ] **The `PROBLEM_STATEMENT.md` File:** Create this file in your root directory. Explicitly paste the exact hackathon objective, challenge name, and how your features solve it.
- [ ] **NPM Metadata:** Do not leave `package.json` with default scaffolding text. Update `"name"`, `"description"`, `"author"`, and add a rich `"keywords"` array using exact challenge keywords.
- [ ] **HTML Meta Tags:** Inject challenge keywords into your `<meta name="description">` inside `index.html` or `__root.tsx`. 

## 4. Security (Target: 98+)
- [ ] **Environment Variables:** **Never** hardcode API keys. Always use `.env` files and `import.meta.env` (or `process.env`).
- [ ] **Dependency Audit:** Run `npm audit` and fix vulnerabilities. Avoid heavily deprecated packages.
- [ ] **Error Handling:** Ensure API calls have `try/catch` blocks. Do not leak raw error stack traces to the UI.

## 5. Efficiency & Performance (Target: 100)
- [ ] **Code Splitting & Lazy Loading:** Use React `Suspense` and lazy loading for heavy components or routes to minimize the initial bundle size.
- [ ] **Optimize LLM Calls:** Cache LLM responses or use `useEffect` strategically so you aren't spamming API calls on every re-render.
- [ ] **Avoid Heavy Loops:** Use optimized array methods and avoid nested loops in the main rendering thread.

## 6. Accessibility / a11y (Target: 98+)
- [ ] **Aria Labels:** Every icon, button without text, and interactive element needs an `aria-label` or `aria-hidden="true"`.
- [ ] **Screen Reader Announcements:** Use `aria-live="polite"` for dynamic data (like chat responses or live crowd wait times).
- [ ] **Semantic HTML:** Use `<section>`, `<nav>`, `<main>`, and `<article>` instead of just `<div>`.
- [ ] **Color Contrast:** Ensure text against background colors meets WCAG AAA standards.

## 7. AI Usage & Innovation
- [ ] **Don't just use APIs for data; use GenAI:** Instead of using a paid 3rd-party REST API for mock data (like live sports scores), prompt your LLM to act as an analyst and generate structured JSON. This proves advanced prompt engineering.
- [ ] **Structured Output:** Force your LLMs to return strict JSON arrays (using `response_format: { type: "json_object" }`). This is highly valued over raw markdown chat.

## 8. Git & Project History
- [ ] **Meaningful Commits:** Automated platforms analyze your git history. Commit messages like `fix:`, `feat:`, `docs:`, and `test:` show professional engineering standards.
- [ ] **Don't rewrite history:** If connected to a continuous deployment platform (like Lovable), avoid force pushing or rebasing, which can desync the editor.
