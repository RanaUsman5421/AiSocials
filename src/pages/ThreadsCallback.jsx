import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ThreadsCallback() {
  const [status, setStatus] = useState('Connecting Threads...')
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const error = params.get('error')

    if (error) {
      setStatus('Threads login error')
      return
    }

    const userId = params.get('state')
    if (!userId) {
      setStatus('Missing app user id in callback state. Please login first.')
      return
    }

    setStatus('Threads connected successfully. Redirecting...')
    setTimeout(() => navigate('/socialaccounts'), 1200)
  }, [navigate])

  return (
    <div className="p-6 max-w-lg mx-auto mt-20">
      <h2 className="text-xl font-semibold mb-4">Threads Connect</h2>
      <div className="p-4 bg-surface-container-lowest border border-outline-variant rounded">{status}</div>
    </div>
  )
}
