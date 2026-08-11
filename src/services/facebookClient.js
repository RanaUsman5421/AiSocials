import axios from 'axios';
import { apiBase } from '../lib/apiBase';

export function startFacebookOAuth() {
  const fbAppId = import.meta.env.VITE_FB_APP_ID;
  const redirectUri = import.meta.env.VITE_FB_CLIENT_REDIRECT_URI || window.location.origin + '/facebook-callback';
  const scope = 'pages_show_list,pages_read_engagement,pages_manage_posts';
  const fbAuthUrl = `https://www.facebook.com/v26.0/dialog/oauth?client_id=${fbAppId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}`;
  window.location.href = fbAuthUrl;
}

export async function exchangeCodeForPage(code, userId, redirect_uri) {
  const res = await axios.post(`${apiBase}/api/auth/facebook/callback`, { code, userId, redirect_uri });
  return res.data;
}

export async function publishPhoto(userId, imageUrl, caption) {
  const res = await axios.post(`${apiBase}/api/facebook/publish-photo`, { userId, imageUrl, caption });
  return res.data;
}

export async function publishPost(userId, message) {
  const res = await axios.post(`${apiBase}/api/facebook/publish-post`, { userId, message });
  return res.data;
}

export async function verifyPage(userId) {
  const res = await axios.get(`${apiBase}/api/facebook/verify/${userId}`);
  return res.data;
}
