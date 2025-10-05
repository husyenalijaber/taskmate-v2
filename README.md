# TaskMate v2.0 — UI/UX Upgraded

## Overview
TaskMate v2.0 improves the UI/UX with modern visuals, animations, and a polished layout.
AI (IBM Granite) was used only during development to generate and suggest code snippets and documentation; it is NOT part of the deployed app.

## What's new
- Gradient hero background
- Glassmorphism main card
- Modal form with animation (Framer Motion)
- Icons from lucide-react
- Smooth list animations and state transitions
- LocalStorage persistence (key: tasks_v2)

## Quick start
Install dependencies:
```bash
npm install
```

Run dev server:
```bash
npm run dev
```

Build:
```bash
npm run build
npm run preview
```

## Dependencies
This project uses:
- react, react-dom
- framer-motion (animations)
- lucide-react (icons)
- tailwindcss (styling)
- vite (dev server + build)

## Deploy to Netlify
- Build command: `npm run build`
- Publish directory: `dist`

## IBM Granite (development)
A helper script `granite-helper.js` was used during development to call IBM Granite via Replicate API. The helper is for development-time assistance and not required for running the app.
