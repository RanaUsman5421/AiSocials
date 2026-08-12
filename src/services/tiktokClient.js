import axios from 'axios';
import { apiBase } from '../lib/apiBase';

export function startTikTokOAuth(userId) {
  if (!userId) {
    throw new Error('Missing userId for TikTok OAuth');
  }
  window.location.href = `${apiBase}/api/tiktok/auth?userId=${encodeURIComponent(userId)}`;
}

export async function verifyTikTok(userId) {
  const res = await axios.get(`${apiBase}/api/tiktok/connected/${encodeURIComponent(userId)}`);
  return res.data;
}

export async function getTikTokCreatorInfo(userId) {
  const res = await axios.get(`${apiBase}/api/tiktok/creator-info`, {
    params: { userId },
  });
  return res.data;
}

export async function publishTikTokVideo(payload) {
  const res = await axios.post(`${apiBase}/api/tiktok/publish`, payload);
  return res.data;
}

export async function getTikTokPostStatus(userId, publishId) {
  const res = await axios.post(`${apiBase}/api/tiktok/status`, { userId, publishId });
  return res.data;
}
