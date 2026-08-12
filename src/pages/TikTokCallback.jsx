import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TikTokCallback() {
  const [status, setStatus] = useState('Connecting TikTok...');
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');

    if (error) {
      setStatus('TikTok connection failed. Please try again.');
      setTimeout(() => navigate('/socialaccounts'), 1500);
      return;
    }

    const code = params.get('code');
    const state = params.get('state');
    if (!code || !state) {
      setStatus('Invalid TikTok callback response.');
      setTimeout(() => navigate('/socialaccounts'), 1500);
      return;
    }

    setStatus('TikTok connected successfully. Redirecting...');
    setTimeout(() => navigate('/socialaccounts'), 1500);
  }, [navigate]);

  return (
    <div className="p-6 max-w-lg mx-auto mt-20">
      <h2 className="text-xl font-semibold mb-4">TikTok Connect</h2>
      <div className="p-4 bg-surface-container-lowest border border-outline-variant rounded">{status}</div>
    </div>
  );
}
