# Refined Blog Visual Refresh Design

## Goal

Refresh the Docusaurus knowledge blog into a polished personal technical site that feels simple, premium, and content-first. The visual direction should lean toward Apple's restraint and clarity while borrowing the sharper information hierarchy of a mature content product such as NetEase.

## Current State

The site already has the right structure for the first release:

- A personal homepage with hero, topic pillars, technology stack, and writing workflow.
- A Docusaurus docs system with a broad Java backend taxonomy.
- A blog section, local search, sidebar navigation, and GitHub Pages deployment path.

The current presentation is more dramatic than the target direction:

- The homepage hero uses a dark warm-toned treatment with strong gradients and a framed illustration.
- Cards and highlight bands carry more visual weight than the surrounding typography.
- Docs pages still rely heavily on default Docusaurus surfaces, so the homepage and reading experience do not yet feel like one designed system.

## Design Direction

### Visual Character

The redesign should feel:

- Calm and deliberate rather than decorative.
- Premium through spacing, hierarchy, alignment, and surface quality rather than large visual effects.
- Technical and personal at the same time: the site should read as Zhang Long's long-term Java backend output, not a generic documentation template.

### Palette

Use a bright neutral foundation:

- Backgrounds: white, mist gray, and a very light cool gray.
- Text: near-black graphite and softened secondary gray.
- Accent: a controlled editorial red with a restrained blue-gray support tone for interactive states and metadata.

Avoid a one-note palette, heavy gradients, oversized color fields, or loud ornamental lighting effects.

### Typography

Use an elegant, highly readable system type stack that works well for Chinese and English technical content. Hierarchy should come from weight, size, rhythm, and whitespace:

- Homepage headline: strong but not oversized for its container.
- Section headings: crisp and compact.
- Body and docs text: generous line height and comfortable paragraph spacing.
- Metadata: smaller and quieter without becoming faint.

## Experience Scope

### Homepage

Keep the current homepage content model but change the composition:

- The first viewport should clearly expose the owner, the Java backend focus, and the primary entry into the knowledge base.
- Replace the current heavy dark hero treatment with a light, refined lead section that uses whitespace, subtle borders, and a concise visual anchor.
- Keep the existing hero image only if it supports the refined direction after restyling; otherwise treat it as a secondary supporting visual rather than the dominant composition.
- Turn topic pillars into elegant content index tiles with thin boundaries, quieter surfaces, and stronger text hierarchy.
- Make the technology stack and writing workflow feel like useful content bands, not marketing cards.

### Global Navigation

Refine the navbar so it feels slim, clear, and premium:

- Keep the existing knowledge base, blog, troubleshooting, and GitHub entry points.
- Improve separation from page content with subtle translucency or tonal layering where supported by the theme.
- Keep interaction feedback visible and restrained.

### Docs Reading Experience

Docs pages should receive the same visual care as the homepage:

- Improve article width, heading rhythm, code block surfaces, tables, admonitions, and link states.
- Make the left sidebar lighter and easier to scan across the expanded taxonomy.
- Make the right table of contents quieter but still useful for long troubleshooting and architecture notes.
- Keep search and routing behavior unchanged.

### Blog and Footer

The blog listing and article pages should inherit the same typography and surface system as docs pages. The footer should remain useful for navigation but become visually simpler and less blocky.

## Component Strategy

The implementation should stay within the existing Docusaurus structure:

- Rework `src/css/custom.css` as the main visual system layer.
- Adjust `src/pages/index.js` only where homepage structure needs better semantic grouping or a more refined content rhythm.
- Change `docusaurus.config.js` only when the theme configuration needs wording, nav, or metadata refinements that support the visual system.
- Prefer CSS variables and theme-compatible selectors over broad overrides that make future Docusaurus upgrades fragile.

## Interaction and Responsive Behavior

- Hover and focus states should be clear but subtle: slight tonal movement, clean underlines, or small surface elevation.
- Mobile layouts should keep headings readable, actions comfortably tappable, and docs navigation usable.
- Avoid text overlap, cramped controls, and hero layouts that consume the whole mobile viewport without exposing the next content.
- Respect reduced-motion preferences if animations are added.

## Non-Goals

This refresh will not:

- Replace Docusaurus with another framework.
- Add a CMS, analytics stack, comment system, or new publishing workflow.
- Redesign the information architecture already established for the Java backend notes.
- Turn the homepage into a marketing landing page with oversized promotional sections.

## Verification

The visual refresh should be validated by:

- Running `npm run build` to catch Docusaurus and MDX regressions.
- Reviewing the homepage, docs landing page, at least one long docs article, and the blog listing on desktop and mobile widths.
- Checking navbar, sidebar, footer, buttons, code blocks, tables, search entry, and dark mode for obvious regressions.

## Acceptance Criteria

The redesign is successful when:

- The first screen immediately reads as a premium personal Java backend knowledge site.
- The site feels cleaner, lighter, and more intentional than the current version.
- The docs reading experience is at least as polished as the homepage.
- Existing docs structure, search, routing, and publishing workflow continue to work.
