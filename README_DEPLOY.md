# Deployment instructions (SmartLearner)

This repository contains two apps:
- `frontend/` — Vite + React app (deploy to Vercel)
- `backend/`  — Express API (deploy to Render)

## Frontend (Vercel)
1. In Vercel, import the repository and select the `frontend` folder as the root.
2. Environment variables to set in Vercel:
   - `VITE_API_URL and VITE_API_URL_PROD (frontend uses these variables)` — e.g. https://your-backend.onrender.com
3. The included `vercel.json` sets the static build.
4. Build command: `npm run build` (Vercel detects automatically)
5. Ensure your frontend uses `import.meta.env.VITE_API_URL and VITE_API_URL_PROD (frontend uses these variables)` for API calls.

## Backend (Render)
1. Create a new Web Service on Render and connect to this repo, selecting the `backend` folder.
2. Render will use `render.yaml` if deploying via the Dashboard.
3. Environment variables to set on Render:
   - `MONGO_URI`
   - `FRONTEND_URL` (e.g. https://your-frontend.vercel.app)
   - `FRONTEND_URL_PROD` (production frontend URL)
   - `NODE_ENV=production`
   - `UPLOAD_DIR` (if using file uploads)
4. Start command: `npm start` (already configured in backend/package.json)

## CORS & Connection
- The backend reads `FRONTEND_URL` and `FRONTEND_URL_PROD` to allow requests only from those origins.
- Frontend should point to backend using `VITE_API_URL and VITE_API_URL_PROD (frontend uses these variables)` environment variable.

## Next steps I took for you
- Backend `server.js` CORS block was updated to use env vars and a safe dynamic origin check.
- Added `vercel.json` in `frontend/` and `render.yaml` in `backend/`.
- Backup of `server.js` saved as `backend/src/server.js.bak`.

If you want, I can now:
- Replace frontend API calls to use `VITE_API_URL and VITE_API_URL_PROD (frontend uses these variables)` automatically (I can scan `src` and update axios base URLs).
- Create a single ready-to-deploy zip for you to download.