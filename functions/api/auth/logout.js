export async function onRequest(context) {
  const { request, env } = context;
  const backend = env.BACKEND_URL || 'http://localhost:4000';

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': request.headers.get('origin') || '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers') || 'Content-Type',
        'Access-Control-Allow-Credentials': 'true'
      }
    });
  }

  const url = `${backend}/api/auth/logout`;

  const allowedHeaders = ['content-type','cookie','authorization','accept','user-agent','origin','referer','x-requested-with'];
  const forwardedHeaders = {};
  for (const [k, v] of request.headers) {
    const key = k.toLowerCase();
    if (allowedHeaders.includes(key)) forwardedHeaders[k] = v;
  }

  const body = await request.text();

  const backendRes = await fetch(url, {
    method: request.method,
    headers: forwardedHeaders,
    body: body || undefined
  });

  const resHeaders = new Headers(backendRes.headers);
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

  const setCookie = backendRes.headers.get('set-cookie') || backendRes.headers.get('Set-Cookie');
  if (setCookie) resHeaders.append('Set-Cookie', setCookie);

  const text = await backendRes.text();
  return new Response(text, {
    status: backendRes.status,
    headers: resHeaders
  });
}
