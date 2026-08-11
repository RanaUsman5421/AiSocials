import axios from 'axios'
import { apiBase } from '../lib/apiBase'

const appOrigin = window.location.origin

export function startInstagramOAuth(userId) {
  const fbAppId = import.meta.env.VITE_FB_APP_ID
  if (!fbAppId) {
    console.error('Missing Facebook App ID for Instagram OAuth')
    return
  }

  const redirectUri = import.meta.env.VITE_IG_CLIENT_REDIRECT_URI || `${appOrigin}/auth/instagram/callback`
  const scopes = [
    'pages_show_list',
    'pages_read_engagement',
    'pages_manage_posts',
    'instagram_basic',
    'instagram_content_publish',
  ].join(',')
  const state = encodeURIComponent(userId || '')
  const authUrl = `https://www.facebook.com/v26.0/dialog/oauth?client_id=${fbAppId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scopes)}&response_type=code&state=${state}`

  window.location.href = authUrl
}

export async function exchangeCodeForInstagram(code, userId, redirect_uri) {
  const res = await axios.post(`${apiBase}/api/auth/instagram/callback`, {
    code,
    userId,
    redirect_uri,
  })
  return res.data
}

export async function publishInstagram(userId, imageUrl, caption) {
  const res = await axios.post(`${apiBase}/api/instagram/publish`, {
    userId,
    imageUrl,
    caption,
  })
  return res.data
}

export async function verifyInstagram(userId) {
  const res = await axios.get(`${apiBase}/api/instagram/verify/${userId}`)
  return res.data
}
