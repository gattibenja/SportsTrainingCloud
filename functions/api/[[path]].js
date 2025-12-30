export async function onRequest({ request, env, params }) {
  // URL de tu backend en Render
  // Debe estar definida en Cloudflare como variable de entorno
  // Ej: https://tu-backend.onrender.com
  const backend = env.BACKEND_URL;

  if (!backend) {
    return new Response("BACKEND_URL not configured", { status: 500 });
  }

  // Reconstruir el path dinámico (/api/*)
  const pathSegments = params.path || [];
  const suffix = Array.isArray(pathSegments)
    ? pathSegments.join("/")
    : pathSegments;

  const incomingUrl = new URL(request.url);
  const targetUrl = `${backend}/${suffix}${incomingUrl.search}`;

  // Crear request hacia el backend
  const init = {
    method: request.method,
    headers: request.headers,
    body:
      request.method === "GET" || request.method === "HEAD"
        ? null
        : await request.clone().arrayBuffer(),
  };

  // Llamada real al backend (Render)
  const backendResponse = await fetch(targetUrl, init);

  // Copiar headers de respuesta
  const headers = new Headers(backendResponse.headers);

  // 🔐 FIX CLAVE PARA SAFARI / iOS
  // - elimina Domain
  // - evita SameSite=None
  // - fuerza SameSite=Lax
  if (headers.has("set-cookie")) {
    const fixedCookie = headers
      .get("set-cookie")
      .replace(/Domain=[^;]+;?/gi, "")
      .replace(/SameSite=None/gi, "SameSite=Lax");

    headers.set("set-cookie", fixedCookie);
  }

  return new Response(backendResponse.body, {
    status: backendResponse.status,
    headers,
  });
}
