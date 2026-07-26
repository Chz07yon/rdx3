# RDX Studios

RDX Studios â€” a three-wing creative house specialising in cinematic photography, high-performance web engineering, and strategic brand design.

## Development

**IMPORTANT:** This site loads shared UI components (navigation and footer) via `fetch()`. Because of browser security restrictions (CORS), these `fetch()` requests will silently fail if you open the HTML files directly from your hard drive (e.g. `file:///...`).

**To preview the site locally, you MUST use a local server. Never double-click the HTML files.**

Run the following command in your terminal to start a local server:

```bash
npm run dev
```

This will serve the site at `http://localhost:3000` (or similar) where all components will load correctly.
## Workflow

Edit partials/nav.html or partials/footer.html, then run npm run sync-partials before previewing or committing. Never hand-edit the nav/footer markup inside individual page files — it will be overwritten.
