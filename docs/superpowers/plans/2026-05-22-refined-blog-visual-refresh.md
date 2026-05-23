# Refined Blog Visual Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the Java backend knowledge blog into a clean, premium, content-first Docusaurus experience with a refined homepage and a polished docs reading surface.

**Architecture:** Keep the current Docusaurus content architecture intact. Use `src/pages/index.js` for the homepage content rhythm and `src/css/custom.css` as the single visual system layer for theme tokens, homepage styling, navigation, docs, blog, and responsive behavior.

**Tech Stack:** Docusaurus 3, React 18, CSS variables and theme overrides, local Docusaurus search, GitHub Pages static build.

---

## File Map

- Modify `src/pages/index.js`: refine homepage semantic structure and supporting content blocks.
- Modify `src/css/custom.css`: replace the current warm dramatic theme with a bright refined system and style homepage/docs/blog/navigation/footer states.
- Verify `docusaurus.config.js`: keep navigation and footer structure unless a theme hook needs a small wording or metadata adjustment during QA.
- Verify routes with the current docs content:
  - `/java-backend-knowledge-blog/`
  - `/java-backend-knowledge-blog/docs`
  - `/java-backend-knowledge-blog/docs/java-foundation/jvm-memory-model`
  - `/java-backend-knowledge-blog/blog`

## Task 1: Refine Homepage Structure

**Files:**
- Modify: `src/pages/index.js`

- [ ] **Step 1: Inspect the existing homepage before editing**

Run:

```bash
sed -n '1,260p' src/pages/index.js
```

Expected: the current hero, pillar cards, stack wall, and writing flow are visible in one file.

- [ ] **Step 2: Replace the homepage metadata arrays with refined content helpers**

Update the homepage helpers so the lead section can surface personal positioning and topic scale without adding marketing copy:

```jsx
const pillars = [
  {
    title: '底层原理',
    text: 'JVM、并发、MySQL、Redis、RocketMQ，从原理判断到项目落点。',
    to: '/docs/java-foundation',
  },
  {
    title: '线上排查',
    text: 'Full GC、OOM、CPU100%、慢 SQL，把故障定位沉淀成路径。',
    to: '/docs/troubleshooting/oom-cpu100',
  },
  {
    title: '架构设计',
    text: '围绕一致性、稳定性和扩展性，复盘系统设计中的取舍。',
    to: '/docs/architecture/design-methodology',
  },
];

const stack = ['Java', 'Spring Boot', 'Spring Cloud', 'MySQL', 'Redis', 'RocketMQ', 'JVM', 'Linux'];

const signals = [
  {label: '主线', value: 'Java 后端'},
  {label: '内容', value: '笔记 / 排查 / 复盘'},
  {label: '更新', value: 'Markdown + Git'},
];
```

- [ ] **Step 3: Replace the current hero section with a refined lead section**

Use a quieter content-first hero that still leaves the existing knowledge-map visual available as a secondary anchor:

```jsx
<section className="heroPanel">
  <div className="heroPanel__content">
    <p className="eyebrow">Java Backend Notes</p>
    <h1>张龙的 Java 后端知识库</h1>
    <p className="heroPanel__lead">
      持续整理 Java 后端学习笔记、工程复盘和线上问题定位，把经验写成可以检索、复用和继续迭代的公开资产。
    </p>
    <div className="heroPanel__actions">
      <Link className="button button--primary button--lg" to="/docs">
        进入知识库
      </Link>
      <Link className="button button--secondary button--lg" to="/blog">
        阅读博客
      </Link>
    </div>
    <dl className="signalRail" aria-label="知识库概览">
      {signals.map((signal) => (
        <div key={signal.label}>
          <dt>{signal.label}</dt>
          <dd>{signal.value}</dd>
        </div>
      ))}
    </dl>
  </div>
  <div className="heroPanel__visual" aria-label="Java 后端知识地图">
    <img src={imageUrl} alt="Java 后端知识地图" />
  </div>
</section>
```

- [ ] **Step 4: Keep the existing section order and tighten headings**

Preserve the three downstream content sections, but keep their headings aligned to the new tone:

```jsx
<section className="sectionBand sectionBand--tight">
  <div className="sectionHeader">
    <p className="eyebrow">Knowledge System</p>
    <h2>把知识放进体系里，再持续写下去</h2>
  </div>
  <div className="pillarGrid">
    {pillars.map((pillar) => (
      <PillarCard key={pillar.title} {...pillar} />
    ))}
  </div>
</section>
```

- [ ] **Step 5: Commit the homepage structure change**

Run:

```bash
git add src/pages/index.js
git commit -m "refactor: refine blog homepage structure"
```

Expected: only `src/pages/index.js` is included in the commit.

## Task 2: Replace Theme Tokens and Homepage Styling

**Files:**
- Modify: `src/css/custom.css`

- [ ] **Step 1: Inspect the current stylesheet boundaries**

Run:

```bash
sed -n '1,360p' src/css/custom.css
```

Expected: theme variables appear first, followed by homepage blocks and responsive rules.

- [ ] **Step 2: Replace the color and typography token layer**

Use bright neutral tokens for light mode and a graphite dark mode that keeps contrast calm:

```css
:root {
  --ifm-color-primary: #b4232c;
  --ifm-color-primary-dark: #961c24;
  --ifm-color-primary-darker: #861820;
  --ifm-color-primary-darkest: #6e1118;
  --ifm-color-primary-light: #ca3640;
  --ifm-color-primary-lighter: #d34a53;
  --ifm-color-primary-lightest: #e37a80;
  --ifm-background-color: #f7f7f5;
  --ifm-navbar-height: 68px;
  --ifm-code-font-size: 95%;
  --ifm-font-family-base: "PingFang SC", "SF Pro Text", "Helvetica Neue", "Hiragino Sans GB", sans-serif;
  --ifm-heading-font-family: "PingFang SC", "SF Pro Display", "Helvetica Neue", "Hiragino Sans GB", sans-serif;
  --ifm-font-family-monospace: "SFMono-Regular", "Menlo", "Consolas", monospace;
  --page-paper: #ffffff;
  --page-fog: #eef1f4;
  --page-line: rgba(15, 23, 42, 0.1);
  --page-ink: #101114;
  --page-muted: #5f6672;
  --page-blue: #52657a;
  --page-shadow: 0 22px 70px rgba(15, 23, 42, 0.08);
}

[data-theme='dark'] {
  --ifm-background-color: #0f1115;
  --ifm-navbar-background-color: rgba(15, 17, 21, 0.9);
  --ifm-footer-background-color: #0b0d11;
  --ifm-card-background-color: #151922;
  --page-paper: #151922;
  --page-fog: #1c222c;
  --page-line: rgba(226, 232, 240, 0.12);
  --page-ink: #f5f7fb;
  --page-muted: #a9b1bf;
  --page-blue: #95a7bd;
  --page-shadow: 0 22px 70px rgba(0, 0, 0, 0.28);
}
```

- [ ] **Step 3: Restyle the homepage hero and content bands**

Replace the current dark promotional hero and heavier cards with light surfaces, restrained boundaries, and the new signal rail:

```css
.heroPanel {
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(320px, 0.88fr);
  gap: clamp(28px, 4vw, 64px);
  align-items: center;
  min-height: min(860px, calc(100vh - var(--ifm-navbar-height)));
  padding: clamp(52px, 8vw, 104px) max(24px, calc((100vw - 1180px) / 2)) 56px;
  color: var(--page-ink);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(247, 247, 245, 0.94)),
    radial-gradient(circle at 80% 10%, rgba(180, 35, 44, 0.08), transparent 26%);
}

.heroPanel h1 {
  max-width: 760px;
  margin: 0;
  color: var(--page-ink);
  font-size: clamp(2.7rem, 6vw, 5.2rem);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: 0;
}

.heroPanel__lead {
  max-width: 650px;
  margin: 24px 0 0;
  color: var(--page-muted);
  font-size: 1.18rem;
  line-height: 1.9;
}

.signalRail {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin: 38px 0 0;
}

.signalRail div,
.pillarCard,
.stackWall span,
.flowList li {
  border: 1px solid var(--page-line);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.82);
}
```

- [ ] **Step 4: Keep mobile layouts compact and stable**

Update the existing breakpoints so the lead section exposes downstream content and stacks content rails cleanly:

```css
@media (max-width: 996px) {
  .heroPanel,
  .profileStrip {
    grid-template-columns: 1fr;
  }

  .heroPanel {
    min-height: auto;
    padding-top: 48px;
  }

  .signalRail,
  .pillarGrid,
  .flowList {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 5: Commit the base visual system refresh**

Run:

```bash
git add src/css/custom.css
git commit -m "style: refresh homepage visual system"
```

Expected: the commit is limited to the first-pass stylesheet refresh.

## Task 3: Polish Docusaurus Reading Surfaces

**Files:**
- Modify: `src/css/custom.css`

- [ ] **Step 1: Add global navigation and footer refinements**

Add Docusaurus-friendly selectors for slim navigation, restrained search surfaces, and a lighter footer rhythm:

```css
.navbar {
  border-bottom: 1px solid var(--page-line);
  background: rgba(255, 255, 255, 0.84);
  backdrop-filter: blur(18px);
}

.navbar__title,
.navbar__link {
  letter-spacing: 0;
}

.navbar__link:hover,
.footer__link-item:hover {
  color: var(--ifm-color-primary);
}

.footer {
  border-top: 1px solid var(--page-line);
}
```

- [ ] **Step 2: Add docs and blog typography refinements**

Style markdown surfaces, article headings, prose links, code, tables, and blog cards without changing route behavior:

```css
.markdown {
  color: var(--page-ink);
  font-size: 1rem;
  line-height: 1.9;
}

.markdown h1,
.markdown h2,
.markdown h3 {
  color: var(--page-ink);
  letter-spacing: 0;
}

.markdown h2 {
  margin-top: 2.8rem;
  padding-top: 0.45rem;
  border-top: 1px solid var(--page-line);
}

.markdown a {
  text-decoration-thickness: 1px;
  text-underline-offset: 0.18em;
}

.markdown table,
.theme-code-block,
.admonition {
  overflow: hidden;
  border: 1px solid var(--page-line);
  border-radius: 8px;
}

article.margin-bottom--xl {
  padding: clamp(18px, 2vw, 28px);
  border: 1px solid var(--page-line);
  border-radius: 8px;
  background: var(--page-paper);
}
```

- [ ] **Step 3: Lighten sidebar and table-of-contents states**

Use quiet surfaces and stronger active states for long taxonomy scans:

```css
.theme-doc-sidebar-container {
  border-right: 1px solid var(--page-line);
}

.menu__link {
  border-radius: 6px;
  color: var(--page-muted);
}

.menu__link--active,
.table-of-contents__link--active {
  color: var(--ifm-color-primary);
  font-weight: 700;
}

.table-of-contents {
  border-left: 1px solid var(--page-line);
}
```

- [ ] **Step 4: Add focus and reduced-motion safeguards**

Keep premium interactions keyboard-visible and motion-light:

```css
:focus-visible {
  outline: 2px solid rgba(180, 35, 44, 0.48);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 5: Commit the docs and blog styling**

Run:

```bash
git add src/css/custom.css
git commit -m "style: polish knowledge blog reading surfaces"
```

Expected: reading-surface styles are committed separately from the homepage CSS pass.

## Task 4: Verify Build and Browser Quality

**Files:**
- Verify: `src/pages/index.js`
- Verify: `src/css/custom.css`
- Verify if changed: `docusaurus.config.js`

- [ ] **Step 1: Build the site**

Run:

```bash
npm run build
```

Expected: Docusaurus build succeeds. Existing imported-content warnings may still appear if they are unrelated to the visual refresh.

- [ ] **Step 2: Serve the built site locally**

Run:

```bash
npm run serve -- --port 3020
```

Expected: the preview is reachable at `http://localhost:3020/java-backend-knowledge-blog/`.

- [ ] **Step 3: Review desktop routes in the in-app browser**

Open and inspect:

```text
http://localhost:3020/java-backend-knowledge-blog/
http://localhost:3020/java-backend-knowledge-blog/docs
http://localhost:3020/java-backend-knowledge-blog/docs/java-foundation/jvm-memory-model
http://localhost:3020/java-backend-knowledge-blog/blog
```

Expected: homepage, docs landing, long article, and blog listing all share the refined theme without overlap or broken navigation.

- [ ] **Step 4: Review narrow layouts and dark mode**

Inspect the same routes at mobile width and toggle dark mode.

Expected:

- Hero actions remain tappable.
- Sidebar/menu access remains clear.
- Markdown line length stays readable.
- Footer columns do not collide.
- Code blocks, tables, and search states remain legible.

- [ ] **Step 5: Make a final verification commit only if QA changes are needed**

Run only if QA produces follow-up code changes:

```bash
git add src/pages/index.js src/css/custom.css docusaurus.config.js
git commit -m "style: refine visual refresh after qa"
```

Expected: the final QA commit contains only polish needed after build and browser review.
