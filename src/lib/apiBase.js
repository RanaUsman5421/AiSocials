const envBase = import.meta.env.VITE_API_BASE || import.meta.env.VITE_API_URL;
const defaultBase = window.location.hostname === 'localhost' ? 'http://localhost:3000' : window.location.origin;

let resolvedBase = envBase || defaultBase;

if (
  envBase?.startsWith('http://localhost') &&
  window.location.protocol === 'https:' &&
  window.location.hostname !== 'localhost'
) {
  console.warn(
    'Ignoring insecure localhost API base from a secure external origin. Using same-origin /api requests so Vite can proxy to the local backend.'
  );
  resolvedBase = window.location.origin;
}

export const apiBase = resolvedBase;
