# MGNOVA Freelancer Dashboard

A modern freelancer dashboard built with React, TypeScript, Vite, and Tailwind CSS. It gives freelancers a premium workspace to manage projects, proposals, contracts, wallet activity, reputation, and portfolio performance from a single interface.

## Overview

MGNOVA Freelancer Dashboard is designed for independent professionals who want a polished command center for their freelance business. The app includes a responsive sidebar navigation, analytics-focused dashboard cards, project discovery, AI-assisted proposal generation, and operational tools for managing client relationships and financial performance.

## Key Features

- Executive dashboard with earnings, project, success, and reputation metrics
- Project discovery and opportunity cards with client budgets and skill match context
- Proposal tracking and AI-assisted proposal generation workflow
- Contract and gig management overview
- Wallet and payout summary
- Reputation and client feedback tracking
- Portfolio showcase management
- Settings and account configuration pages
- Responsive, modern UI built with Tailwind-based design patterns

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Radix UI primitives
- Recharts
- Lucide React
- Sonner notifications
- Zod + React Hook Form

## Project Structure

```bash
.
├── src/
│   ├── components/
│   ├── contexts/
│   ├── data/
│   ├── hooks/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── public/
├── components.json
├── index.html
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── tsconfig.json
├── vite.config.ts
└── .gitignore
```

## Main Pages

- `/` - Dashboard overview
- `/projects` - Project pipeline and opportunity management
- `/proposals` - Proposal submissions and status tracking
- `/contracts` - Active contracts and agreement details
- `/wallet` - Finance and earnings overview
- `/reputation` - Ratings, feedback, and trust metrics
- `/portfolio` - Personal portfolio and deliverables
- `/settings` - Profile and preferences

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
npm install
```

or

```bash
pnpm install
```

### Run the app locally

```bash
npm run dev
```

or

```bash
pnpm dev
```

The application will start in development mode and is typically available at:

```bash
http://localhost:5173
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Scripts

From `package.json`:

- `dev`: starts the Vite development server
- `build`: creates a production build
- `preview`: serves the production build locally
- `lint`: runs ESLint checks

## Notes

This project uses mock data for dashboard content and UI state, making it a strong starting point for a freelancer SaaS interface or product prototype. It is well suited for extending with real backend APIs, authentication, and database integration.

## License

This project does not currently include a license file in the repository.
