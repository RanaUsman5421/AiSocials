import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function XCallback() {
  const callbackParams = new URLSearchParams(window.location.search)
  const connected = callbackParams.get('connected') === 'true'
  const callbackError = callbackParams.get('error')
  const [status] = useState(connected ? 'X connected successfully. Redirecting...' : callbackError || 'X connection failed. Please try again.')
  const navigate = useNavigate()

  useEffect(() => {
    if (connected) {
      setTimeout(() => navigate('/socialaccounts'), 1200)
    }
  }, [connected, navigate])

  return (
    <div className="p-6 max-w-lg mx-auto mt-20">
      <h2 className="text-xl font-semibold mb-4">X Connect</h2>
      <div className="p-4 bg-surface-container-lowest border border-outline-variant rounded">{status}</div>
    </div>
  )
}