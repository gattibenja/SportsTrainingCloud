Functions POC for Cloudflare Pages (project copy)

Purpose
-------
This folder contains a small Proof Of Concept to proxy authentication calls from Cloudflare Pages Functions to your existing backend (localhost:4000 by default). The Functions forward requests to the backend and forward `Set-Cookie` headers so the cookie can be set on the Pages domain (first-party).

Files
-----
- `api/auth/login.js` - proxies `/api/auth/login` to backend
- `api/auth/refresh.js` - proxies `/api/auth/refresh` to backend
- `api/auth/logout.js` - proxies `/api/auth/logout` to backend

Usage (local testing)
---------------------
1. Install Cloudflare CLI (`wrangler`) if you don't have it:

```bash
npm i -g @cloudflare/wrangler
```

2. From the project root run Pages dev (from Cloudflare SDK v3+):

```bash
wrangler pages dev "./client/dist" --bindings BACKEND_URL=http://localhost:4000
```

or if your Pages project uses a different command, ensure `BACKEND_URL` is provided as an environment variable. The Functions will forward requests to that backend.

3. In the copy project's client, point auth requests to the Pages origin `/api/auth/login` etc. For local dev the Pages dev server will serve those routes.

Notes & security
----------------
- Ensure your backend sets `Set-Cookie` with `HttpOnly; Secure; SameSite=None` to allow the cookie to be usable for cross-site requests if needed. When served from Pages domain the cookie becomes first-party relative to the Pages origin.
- Test Storage Access API / iOS fallback separately — this POC avoids third‑party cookies by setting cookies on the Pages origin.
- This is a POC: add proper error handling, logging and header sanitization before production.
