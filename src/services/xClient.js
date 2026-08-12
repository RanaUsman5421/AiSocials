import axios from 'axios'
import { apiBase } from '../lib/apiBase'

export function startXOAuth(userId) {
  window.location.href = `${apiBase}/api/x/connect?userId=${encodeURIComponent(userId)}`
}

export async function verifyX(userId) {
  const response = await axios.get(`${apiBase}/api/x/verify/${encodeURIComponent(userId)}`)
  return response.data
}

export async function publishX(userId, text) {
  const response = await axios.post(`${apiBase}/api/x/publish`, { userId, text })
  return response.data
}