#!/usr/bin/env node
// Simple tester: POST to login endpoint and print response headers
const [,, url, email='test@test.com', password='password'] = process.argv;
if (!url) {
  console.error('Usage: node tools/test_cookie.js <LOGIN_URL> [email] [password]');
  process.exit(1);
}

(async function(){
  try{
    const origin = new URL(url).origin;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Origin': origin },
      body: JSON.stringify({ email, password })
    });

    console.log('Status:', res.status);
    console.log('---- Response headers ----');
    for (const [k,v] of res.headers) {
      console.log(`${k}: ${v}`);
    }
    const text = await res.text();
    console.log('---- Body (first 1000 chars) ----');
    console.log(text.slice(0,1000));
  }catch(err){
    console.error('Request failed:', err.message || err);
    process.exit(1);
  }
})();
