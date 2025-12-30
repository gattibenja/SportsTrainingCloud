// Utilities for iOS Safari fallback: detect iOS, and encrypted localStorage token storage
// Uses Web Crypto AES-GCM. A per-session key is generated and stored in sessionStorage to reduce persistence of raw key.

export function isIos() {
  return /iP(hone|od|ad)/.test(navigator.platform) || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
}

async function importKey(rawKey) {
  return await window.crypto.subtle.importKey(
    'raw',
    rawKey,
    'AES-GCM',
    false,
    ['encrypt','decrypt']
  );
}

async function deriveKeyFromSession() {
  let keyBase64 = sessionStorage.getItem('session_key_b64');
  if (!keyBase64) {
    const keyBytes = window.crypto.getRandomValues(new Uint8Array(32));
    keyBase64 = btoa(String.fromCharCode(...keyBytes));
    sessionStorage.setItem('session_key_b64', keyBase64);
  }
  const raw = Uint8Array.from(atob(keyBase64), c => c.charCodeAt(0));
  return importKey(raw.buffer);
}

export async function saveTokenFallback(keyName, token, ttlSeconds = 300) {
  try {
    const key = await deriveKeyFromSession();
    const enc = new TextEncoder();
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const ct = await window.crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(token));
    const payload = {
      v: arrayBufferToBase64(ct),
      iv: arrayBufferToBase64(iv),
      e: Date.now() + ttlSeconds * 1000
    };
    localStorage.setItem(keyName, JSON.stringify(payload));
    return true;
  } catch (err) {
    console.error('Error saving token fallback', err);
    return false;
  }
}

export async function getTokenFallback(keyName) {
  try {
    const raw = localStorage.getItem(keyName);
    if (!raw) return null;
    const item = JSON.parse(raw);
    if (item.e && Date.now() > item.e) { localStorage.removeItem(keyName); return null; }
    const key = await deriveKeyFromSession();
    const iv = base64ToArrayBuffer(item.iv);
    const ct = base64ToArrayBuffer(item.v);
    const pt = await window.crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);
    const dec = new TextDecoder().decode(pt);
    return dec;
  } catch (err) {
    console.error('Error reading token fallback', err);
    return null;
  }
}

export function removeTokenFallback(keyName) {
  localStorage.removeItem(keyName);
}

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}
function base64ToArrayBuffer(b64) {
  const binary = atob(b64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}
