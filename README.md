# RDX Studios

RDX Studios - a three-wing creative house specialising in cinematic photography, high-performance web engineering, and strategic brand design.

## Development

**IMPORTANT:** This site loads shared UI components (navigation and footer) via `fetch()`. Because of browser security restrictions (CORS), these `fetch()` requests will silently fail if you open the HTML files directly from your hard drive (e.g. `file:///...`).

**To preview the site locally, you MUST use a local server. Never double-click the HTML files.**

Run the following command in your terminal to start a local server:

```bash
npm run dev
```

This will serve the site at `http://localhost:3000` (or similar) where all components will load correctly.

## Workflow

Edit `partials/nav.html` or `partials/footer.html`, then run `npm run sync-partials` before previewing or committing. Never hand-edit the nav/footer markup inside individual page files - it will be overwritten.

## The Vault (Decrypted State)

The site features a hidden "Max RED" vault (accessible via the About page). Entering valid credentials activates a global **Decrypted State** that modifies the UI theme across the entire application:

- **Dynamic Theming:** The signature RED palette seamlessly transitions into an Electric Gold (`#ffc900`) theme.
- **Asset Swapping:** Wallpapers, background patterns, and key images dynamically swap to gold equivalents using modern CSS `content` properties and variable overrides.
- **Synchronous Loading:** A custom injected script ensures the decrypted state is applied immediately before page render, avoiding any red flash on page loads.
- **Encrypted Teases:** Pages like `studio.html` include subtle gold accents and hidden quotes to tease the encrypted content.
