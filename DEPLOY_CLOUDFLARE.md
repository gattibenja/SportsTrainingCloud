Checklist y pasos para desplegar en Cloudflare Pages + Functions

Resumen
-------
Este documento contiene los pasos y ajustes necesarios para desplegar `SportsTraining - Copy` en Cloudflare Pages usando Pages Functions (ubicadas en `functions/`). El objetivo es que las auth requests sean proxyeadas por Functions y que las cookies de sesión se creen como first‑party en el dominio de Pages.

Archivos importantes ya añadidos
- `functions/api/auth/*.js` — Functions que proxyean `/api/auth/login`, `/api/auth/refresh`, `/api/auth/logout`.
- `wrangler.toml` — archivo de configuración para `wrangler` (rellenar `account_id`).

Requisitos previos
- Tener una cuenta Cloudflare y `wrangler` instalado (`npm i -g @cloudflare/wrangler`).
- Backend funcionando y accesible (local: `http://localhost:4000` o URL pública). Asegúrate que tu backend no fuerza `Domain` en `Set-Cookie` (o que lo configure dinámicamente).

Variables de entorno importantes (backend)
- `CORS_ALLOWED_ORIGINS` — debe incluir la URL de Pages (ej. `https://<project>.pages.dev`) además de `http://localhost:3000` si lo usas en desarrollo.
 - `CORS_ALLOWED_ORIGINS` — debe incluir la URL de Pages (ej. `https://<project>.pages.dev`) además de `http://localhost:3000` si lo usas en desarrollo. En Render (o donde esté tu backend) configura esta variable de entorno con una lista coma-separada de orígenes permitidos.
  
	Ejemplo en Render (Environment Variables):
	```
	CORS_ALLOWED_ORIGINS=https://mi-proyecto.pages.dev,https://app.mi-dominio.com
	```
- `JWT_SECRET`, `DB_*` — como ya tienes en `.env` del backend.

Recomendaciones de cookies (backend)
- Cuando el backend haga `res.cookie('token', token, options)`, usar: `{ httpOnly: true, secure: true, sameSite: 'None' }` y evitar pasar `domain` fijo. Si backend agrega `domain=localhost` la cookie no funcionará cuando Pages esté en otro dominio.

Pasos locales (dev)
1. Instala wrangler si no lo tienes:

```bash
npm i -g @cloudflare/wrangler
```

2. Construye la app cliente (desde el root del proyecto copy):

```bash
cd "SportsTraining - Copy/client"
npm install
npm run build
```

3. Ejecuta `wrangler pages dev` desde el root del proyecto (o usa la CLI para pasar bindings). Ejemplo:

```bash
cd "SportsTraining - Copy"
wrangler pages dev "./client/dist" --bindings BACKEND_URL=http://localhost:4000
```

Esto levantará un servidor local que sirve la carpeta `client/dist` y monta las Functions en `/api/*` (según la estructura `functions/`).

Pasos para deploy (producción)
1. Rellenar `wrangler.toml` con tu `account_id` y nombre del proyecto.
2. En Cloudflare Pages UI crear un nuevo proyecto apuntando al repo (o usar `wrangler` para publicar).
3. Configurar variables en Pages: `BACKEND_URL` (p. ej. la URL pública del backend si la tienes), y el resto de env vars necesarias para el backend si lo despliegas en otra infra.

Notas sobre CORS y seguridad
- Asegura que `CORS_ALLOWED_ORIGINS` en el backend incluye el dominio de Pages y que `cors` está configurado con `credentials: true` (ya en `server.js`).
- Verifica que las responses de tu backend devuelvan `Set-Cookie` sin `Domain` o con el domain correcto. Las Functions reenvían `Set-Cookie` para que la cookie quede en el dominio Pages.

Próximos pasos sugeridos
- Probar el flujo de login local con `wrangler pages dev` y observar si la cookie aparece en el dominio dev.
- Añadir manejo robusto de errores y sanitización de headers en las Functions (actualmente son POC).
- Cambiar el frontend para apuntar a las rutas relativas `/api/auth/*` (en lugar de `VITE_REACT_APP_API_URL`) cuando esté desplegado en Pages.

Variable adicional para Functions
- `ALLOWED_ORIGINS` — lista de orígenes permitidos (coma separada) que las Pages Functions validarán antes de reflejar el `Origin` en `Access-Control-Allow-Origin`. Ejemplo:

```
ALLOWED_ORIGINS=https://mi-proyecto.pages.dev,https://app.mi-dominio.com
```

Si no se define `ALLOWED_ORIGINS`, las Functions devolverán el `Origin` recibido (útil en desarrollo), pero en producción es recomendable definirla explícitamente.
