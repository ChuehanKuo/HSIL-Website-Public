# HSIL Hackathon Taiwan website

React, TypeScript and Vite website for HSIL Hackathon Taiwan.

## Local development

Use Node.js 24 and npm:

```sh
npm ci
npm run dev
npm run check
```

The production build is written to `dist/`. Vercel uses the Vite preset.

`src/content/` holds edition data and route metadata. `/` is the 2027 landing page; `/2026` is the historical edition. Confirm event details with the event owner before publishing changes.

## Publishing

The website uses the existing `hsil-clean` Vercel project. Work on a branch
within this repository, run `npm run check`, and open a pull request. Vercel's
Git integration builds branch previews; merging to `main` publishes production.
Repository collaborators can manage this workflow through GitHub. Vercel
account settings remain with the hosting account owner.

Use branches in this repository for team work. Pull requests from forks can
require separate Vercel approval. Keep credentials and internal planning
documents outside this repository.

## Provenance

Website source snapshot: `bd6e8e7a8ce5b72893dd903025b5cb951160d607`.
The original private repository retains prior commit history and contributor records.
This snapshot does not introduce a new license or change existing rights to code, photographs, logos or other assets.
