# BuildCore Frontend

React application for **BuildCore** — construction project management (leads, drawings, agreements, payments, client portal).

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS 4 (UI aligned with PrecastEzy)
- React Router 7
- Auth pattern aligned with PrecastEzy frontend (token storage, private routes, API client)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5174](http://localhost:5174)

## Demo login (no backend)

When `VITE_API_URL` is empty, demo mode is enabled:

| Email | Password | Portal |
|-------|----------|--------|
| `admin@buildcore.com` | `buildcore123` | Admin dashboard |
| `client@buildcore.com` | `buildcore123` | Client home + drawing review |

## Connect to API

Copy `.env.example` to `.env` and set your backend URL:

```
VITE_API_URL=https://your-api.example.com
```

The client expects the same auth endpoints as PrecastEzy: `/login`, `/validate-session`, `/refresh-token`.

## Screens

- **Admin dashboard** — metrics, lead pipeline, projects table, activity feed
- **Client home** — project journey, payments, drawings, messages
- **Drawing review** — floor plan viewer, annotation pins, comments sidebar, zoom

## Project structure

```
src/
  components/     Shared UI + AppSidebar
  layouts/        Admin/client shell
  pages/          Login, admin, client screens
  providers/      User context
  utils/          auth + apiClient
```
