import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { exchangeCodeForPage } from '../services/facebookClient';

export default function FacebookCallback() {
  const [status, setStatus] = useState('Connecting...');
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');
    if (error) {
      setStatus('Facebook login error');
      return;
    }
    if (!code) {
      setStatus('No code found');
      return;
    }

    // Try to detect current app user id from localStorage or token
    let currentUserId = null;
    try {
      const stored = localStorage.getItem('user');
      if (stored) {
        const parsed = JSON.parse(stored);
        currentUserId = parsed._id || parsed.id || parsed.userId || null;
      }
    } catch (e) {
      // ignore
    }

    if (!currentUserId) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          currentUserId = payload.id || payload._id || null;
        } catch (e) {
          // ignore
        }
      }
    }

    if (!currentUserId) {
      setStatus('Missing application user id. Please login to the app first.');
      return;
    }

    const redirectUri = import.meta.env.VITE_FB_CLIENT_REDIRECT_URI || (window.location.origin + window.location.pathname);
    exchangeCodeForPage(code, currentUserId, redirectUri)
      .then((data) => {
        if (data?.success) {
          console.log('Linked Facebook page access token:', data.pageAccessToken || data.user?.facebook?.pageAccessToken);
          console.log('Linked Facebook page ID:', data.pageId || data.user?.facebook?.pageId);
          if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
          }
          setStatus(`Connected to ${data.pageName}`);
          setTimeout(() => navigate('/socialaccounts'), 1000);
        } else {
          setStatus('Connection failed');
        }
      })
      .catch((err) => {
        console.error('exchange error', err);
        setStatus('Connection failed. Check console.');
      });
  }, [navigate]);

  return (
    <div className="p-6 max-w-lg mx-auto mt-20">
      <h2 className="text-xl font-semibold mb-4">Facebook Connect</h2>
      <div className="p-4 bg-surface-container-lowest border border-outline-variant rounded">{status}</div>
    </div>
  );
}
