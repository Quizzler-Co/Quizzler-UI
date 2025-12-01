<div align="center">

# Quizzler UI

Modern, fast, and delightful quiz platform UI built with React 19, Vite 7, Tailwind CSS 4, and React Router.

[![Stars](https://img.shields.io/github/stars/Quizzler-Co/Quizzler-UI?style=flat&logo=github)](https://github.com/Quizzler-Co/Quizzler-UI/stargazers)
[![Issues](https://img.shields.io/github/issues/Quizzler-Co/Quizzler-UI)](https://github.com/Quizzler-Co/Quizzler-UI/issues)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=061e26)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=fff)
![Tailwind](https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwindcss&logoColor=fff)
![Router](https://img.shields.io/badge/React%20Router-7-CA4245?logo=reactrouter&logoColor=fff)
![License](https://img.shields.io/badge/license-TBD-lightgrey)

</div>

## Table of Contents

- Overview
- Features
- Tech Stack
- Getting Started
- Scripts
- Project Structure
- Pages & Routes
- API & Environment
- Auth Model
- Development Tips
- Contributing
- License

## Overview

Quizzler UI is the frontend for a full‑featured quiz application. It includes a public experience for discovering and playing quizzes, a rich profile with stats and achievements, and an admin dashboard for managing quizzes, users, and blog content.

## Features

- Engaging quiz play flow with loading and results screens
- Admin dashboard: quizzes, users, stats, and blog management
- Quiz builder with validation, preview, and import/export helpers
- User profile: settings, password, avatar upload, history, and achievements
- Leaderboards by quiz
- Client-side auth with JWT storage and auto header injection
- Polished UI built with Tailwind CSS 4 and Lucide icons
- Toaster feedback, animations, and modern UX touches

## Tech Stack

- React 19, React Router 7
- Vite 7 (dev, build, preview)
- Tailwind CSS 4 (via @tailwindcss/vite)
- Framer Motion, Lucide React, react-hot-toast
- ESLint (Flat config) for code quality

## Getting Started

Prerequisites:

- Node.js 18+ (LTS recommended)
- pnpm (preferred) or npm/yarn

Install dependencies:

```powershell
pnpm install
```

Start the dev server (defaults to http://localhost:5173):

```powershell
pnpm dev
```

Create a production build:

```powershell
pnpm build
```

Preview the production build locally:

```powershell
pnpm preview
```

Run linting:

```powershell
pnpm lint
```

> Note: npm and yarn work too. Replace `pnpm <cmd>` with `npm run <cmd>` or `yarn <cmd>`.

## Scripts

These are defined in `package.json`:

- dev: Vite dev server
- build: Vite production build
- preview: Preview built app
- lint: Run ESLint over the repo

## Project Structure

```
Quizzler-UI/
├─ public/
├─ src/
│  ├─ components/
│  │  ├─ dashboardUi/           # Admin dashboard UI (tabs, stats, header)
│  │  ├─ forms/                 # Shared form UIs (question builder, preview)
│  │  ├─ profile-ui/            # Profile header, settings, history
│  │  ├─ quiz-ui/               # Quiz play flow (loading, results, container)
│  │  └─ ui-components/         # Reusable UI (buttons, cards, inputs, auth)
│  ├─ models/                   # Core domain models (e.g., Question)
│  ├─ pages/                    # Route-level pages (Home, Quizzes, Profile…)
│  ├─ services/                 # API & domain services (User, Quiz API)
│  ├─ utils/                    # Helpers (auth utilities)
│  ├─ App.jsx                   # App routes and layout (NavBar/Footer)
│  └─ main.jsx                  # App entry with BrowserRouter
├─ eslint.config.js             # ESLint flat config
├─ vite.config.js               # Vite + Tailwind plugin configuration
└─ README.md
```

## Pages & Routes

Defined in `src/App.jsx`:

- `/` – Home
- `/quizzes` – Browse quizzes
- `/about` – About Us
- `/profile` – User profile
- `/leaderboard/:quizId` – Leaderboard for a specific quiz
- `/admin` – Admin Dashboard
- `/quiz-form` – Create/Edit Quiz (standalone form route)
- `/blog-form` – Create/Edit Blog (standalone form route)
- `/admin/forms/user` – Admin user form

Routes under `/*` render with `NavBar` and `Footer` automatically.

## API & Environment

The UI communicates with a backend API using **relative paths** (`/api/v1`). This ensures compatibility with both local development and Cloudflare Tunnel deployment.

### Configuration

**No environment variables needed!** The frontend uses relative API paths that work automatically:

- **Local development**: Vite proxy forwards `/api/*` to `http://localhost:8086`
- **Cloudflare Tunnel**: Both frontend and backend are served on the same domain, so relative paths work directly

The API base URL is centralized in `src/config/api.js` and set to `/api/v1`.

### Cloudflare Tunnel Deployment (Frontend Only)

When deploying with Cloudflare Tunnel:

1. **No frontend changes needed** - relative paths work automatically
2. **Backend stays on localhost** - NOT directly exposed
3. **Configure Cloudflare Tunnel** to:
   - Serve frontend static files from `dist/` (after `npm run build`)
   - Proxy `/api/*` requests to `http://localhost:8086` (backend on your machine)

**Important:** The backend is only accessible through Cloudflare Tunnel's proxy, not directly from the internet.

Example `cloudflared` configuration:
```yaml
tunnel: your-tunnel-id
credentials-file: /path/to/credentials.json

ingress:
  # Frontend static files
  - hostname: your-app.example.com
    service: file_server: /path/to/dist
  
  # Proxy API requests to localhost backend
  - path: /api/*
    service: http://localhost:8086
  
  # Catch-all
  - service: http_status:404
```

**Backend CORS:** Your backend needs to allow your Cloudflare Tunnel domain. See `BACKEND_CHANGES.md` for details.

### API Endpoints

- Auth: `POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `GET /api/v1/auth/user`, `GET /api/v1/auth/users`
- Quiz: `POST /api/v1/quiz/create`, `GET /api/v1/quiz/all`, `GET /api/v1/quiz/:id`, `PUT /api/v1/quiz/:id`, `DELETE /api/v1/quiz/:id`
- Judge: `GET /api/v1/judge/problems`, `GET /api/v1/judge/problems/:id`, `POST /api/v1/judge/submit`
- Participation: `POST /api/v1/participation/quiz/:quizId`, `POST /api/v1/participation/:id/submit`
- Leaderboard: `GET /api/v1/leaderboard/quiz/:quizId`

## Auth Model

- Email/password login and registration via the API
- JWT is stored in `localStorage` if "Remember me" is selected, otherwise `sessionStorage`
- `Authorization: <tokenType> <accessToken>` headers are auto-included by helpers
- Utilities available in `src/utils/auth.js` and `UserService`

Security note: Storing tokens in web storage is convenient but exposes them to XSS. Consider HTTP-only cookies for increased security in production.

## Development Tips

- Tailwind v4 is configured via the Vite plugin in `vite.config.js`
- UI feedback via `react-hot-toast` (see `App.jsx` for `Toaster`)
- Domain logic:
  - `Question` model: shaping, validation, serialization
  - `QuizService`: validation, stats, preview, import/export, filters, shuffling
  - `QuizAPIService`: CRUD calls with robust error handling
- Icons: `lucide-react`; animations: `framer-motion`

### Troubleshooting

- Backend unavailable (404/ECONNREFUSED): 
  - Ensure your API is running on `http://localhost:8086`
  - In development, Vite proxy automatically forwards `/api/*` requests
  - Check that the proxy is configured in `vite.config.js`
- CORS errors: 
  - In development: ensure backend CORS allows `http://localhost:5173`
  - In production: ensure backend CORS allows your Cloudflare Tunnel domain (e.g., `https://your-app.trycloudflare.com`)
  - See `BACKEND_CHANGES.md` for CORS configuration details
- Port conflicts: pass `--port <n>` to Vite dev if 5173 is in use
- Blank screen: check console errors and ensure your Node version is up to date

## Contributing

1. Fork the repo and create a feature branch
2. Commit with clear messages
3. Run `pnpm lint` and ensure no errors
4. Open a Pull Request with context and screenshots where relevant

## License

***CDAC***
---

Made with ❤️ by the Quizzler team. If this project helps you, consider giving it a ⭐.
