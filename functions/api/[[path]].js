export async function onRequest(context) {
  const { request, env, params } = context;
  const backend = env.VITE_REACT_APP_API_URL || 'http://localhost:4000';

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': request.headers.get('origin') || '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers') || 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true'
      }
    });
  }

  // Rebuild target URL
  const pathSegments = params.path || [];
  const suffix = Array.isArray(pathSegments) ? pathSegments.join('/') : pathSegments;
  const incomingUrl = new URL(request.url);
  const targetUrl = `${backend}/${suffix}${incomingUrl.search}`;

  // Forward only safe headers
  const allowedHeaders = ['content-type','cookie','authorization','accept','user-agent','origin','referer','x-requested-with'];
  const forwarded = {};
  for (const [k,v] of request.headers) {
    const key = k.toLowerCase();
    if (allowedHeaders.includes(key)) forwarded[k] = v;
  }

  const init = {
    method: request.method,
    headers: forwarded,
    body: (request.method === 'GET' || request.method === 'HEAD') ? undefined : await request.clone().arrayBuffer()
  };

  const backendResponse = await fetch(targetUrl, init);

  // Build response headers
  const resHeaders = new Headers(backendResponse.headers);
  const origin = request.headers.get('origin');
  const allowedEnv = env.ALLOWED_ORIGINS || '';
  const allowed = allowedEnv.split(',').map(s => s.trim()).filter(Boolean);
  if (origin && allowed.length > 0 && allowed.includes(origin)) {
    resHeaders.set('Access-Control-Allow-Origin', origin);
  } else if (origin && allowed.length === 0) {
    resHeaders.set('Access-Control-Allow-Origin', origin);
  } else {
    resHeaders.set('Access-Control-Allow-Origin', '*');
  }
  resHeaders.set('Access-Control-Allow-Credentials', 'true');

  // If backend returned Set-Cookie, forward it unchanged except remove Domain attribute
  // (don't change SameSite or Secure; backend should set SameSite=None & Secure when needed)
  const setCookie = backendResponse.headers.get('set-cookie') || backendResponse.headers.get('Set-Cookie');
  if (setCookie) {
    const fixed = setCookie.replace(/Domain=[^;]+;?/gi, '');
    resHeaders.append('Set-Cookie', fixed);
  }

  const body = await backendResponse.arrayBuffer();
  return new Response(body, { status: backendResponse.status, headers: resHeaders });
}
