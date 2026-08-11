import axios from 'axios';
import { apiBase } from '../lib/apiBase';

export function startThreadsOAuth(userId) {
  const url = `${apiBase}/api/threads/auth?userId=${encodeURIComponent(userId)}`;
  window.location.href = url;
}

export async function verifyThreads(userId) {
  const res = await axios.get(`${apiBase}/api/threads/verify/${encodeURIComponent(userId)}`);
  return res.data;
}

export async function publishThreads(userId, mediaType, text, imageUrl) {
  const payload = { userId, mediaType, text, imageUrl };
  const res = await axios.post(`${apiBase}/api/threads/post`, payload);
  return res.data;
}
