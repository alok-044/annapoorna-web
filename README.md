# Annapoorna — Frontend (annapoorna-web)

This repository contains the Vite + React frontend for the Annapoorna project.

Quick deploy notes

- The frontend expects the backend base URL in the environment variable `VITE_API_BASE_URL` (e.g. `https://api.yourdomain.com/api`).
- Do NOT commit `.env` files — they are ignored.
- Builds use `npm run build` and output the `dist` directory.

Recommended deploy (Vercel)

1. Push this repository to GitHub (already done).
2. Create a new project in Vercel and select this repo. If this is a monorepo, set the project root to `annapoorna-web`.
3. Set Environment Variables in Vercel:
   - `VITE_API_BASE_URL` → `https://<your-backend>/api`
4. Build Command: `npm run build`
   Output Directory: `dist`
5. Deploy and test the site URL shown by Vercel.

Local testing

```powershell
cd "c:\Users\alok kumar\OneDrive\Desktop\fullstack-web\annapoorna-web"
npm install
npm run dev
```

If you want me to add a `vercel.json` or a GitHub Actions workflow to auto-deploy, tell me and I'll add them.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
