import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { exchangeCodeForInstagram } from '../services/instagramClient'

export default function InstagramCallback() {
  const [status, setStatus] = useState('Connecting Instagram...')
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    const error = params.get('error')
    const state = params.get('state')

    const redirectUri = import.meta.env.VITE_IG_CLIENT_REDIRECT_URI || `${window.location.origin}/auth/instagram/callback`

    if (error) {
      setStatus('Instagram login error')
      return
    }
    if (!code) {
      setStatus('Instagram callback did not receive a code.')
      return
    }

    let currentUserId = null
    try {
      const stored = localStorage.getItem('user')
      if (stored) {
        const parsed = JSON.parse(stored)
        currentUserId = parsed._id || parsed.id || parsed.userId || null
      }
    } catch (e) {
      // ignore
    }

    if (!currentUserId && state) {
      currentUserId = state
    }

    if (!currentUserId) {
      setStatus('Missing application user id. Please login to the app first.')
      return
    }

    exchangeCodeForInstagram(code, currentUserId, redirectUri)
      .then((data) => {
        if (data?.success) {
          try {
            const existing = localStorage.getItem('user')
            const merged = existing ? JSON.parse(existing) : {}
            const updated = data.user || { ...merged, instagram: data.instagram }
            localStorage.setItem('user', JSON.stringify(updated))
          } catch (e) {
            console.error('Failed to persist connected user data', e)
          }

          setStatus(`Connected Instagram as ${data.instagram?.username || data.instagram?.userId}`)
          setTimeout(() => navigate('/socialaccounts'), 1200)
          return
        }

        setStatus(data?.error || 'Instagram connection failed')
      })
      .catch((err) => {
        console.error('Instagram exchange error', err)
        const message = err.response?.data?.error || err.response?.data || err.message || 'Instagram connection failed. Check console for details.'
        setStatus(message)
      })
  }, [navigate])

  return (
    <div className="p-6 max-w-lg mx-auto mt-20">
      <h2 className="text-xl font-semibold mb-4">Instagram Connect</h2>
      <div className="p-4 bg-surface-container-lowest border border-outline-variant rounded">{status}</div>
    </div>
  )
}
