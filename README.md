# Editorial Portfolio Template

A reusable personal portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Motion for React, and Lucide icons. Personal content lives in `src/content/` so it can be customized without changing UI components.

## Requirements

- Node.js 20.9 or newer
- npm

## Install

```bash
npm install
```

Copy `.env.example` to `.env.local` if you want to customize the API port or frontend origin. The defaults work locally.

## Run frontend and backend

Open two terminals in the project folder:

```bash
npm run frontend
```

The website runs at [http://localhost:3000](http://localhost:3000).

```bash
npm run backend
```

The API runs at [http://localhost:4000](http://localhost:4000). Check it at `/api/health`.

You can also start the production frontend with `npm run build` and `npm start`, and the API with `npm run backend:start`.

## Contact form API

`POST /api/contact` accepts JSON with `name`, `email`, and `message`. It validates the fields and acknowledges valid submissions. By default, submissions are logged to the backend terminal; to deliver email, connect a provider in `server/index.ts` and keep its credentials in environment variables.

## Personalize content

- `src/content/profile.ts` — name, title, introduction, bio, and contact details
- `src/content/projects.ts` — project cards and links
- `src/content/experience.ts` — experience entries
- `src/content/skills.ts` — skill categories and entries
- `src/content/articles.ts` — publications
- `src/content/photography.ts` — studio and media cards
- `src/content/social-links.ts` — social URLs

Replace bracketed placeholders with your own content. Leave personal fields empty if you prefer the template's placeholder states.
