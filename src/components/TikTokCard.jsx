import React, { useEffect, useState } from 'react';
import {
  startTikTokOAuth,
  verifyTikTok,
  getTikTokCreatorInfo,
  publishTikTokVideo,
} from '../services/tiktokClient';

export default function TikTokCard({ userId }) {
  const [connected, setConnected] = useState(false);
  const [creatorInfo, setCreatorInfo] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [privacy, setPrivacy] = useState('SELF_ONLY');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [publishId, setPublishId] = useState('');

  useEffect(() => {
    if (!userId) return;

    async function loadConnection() {
      try {
        const result = await verifyTikTok(userId);
        setConnected(result.connected === true);

        if (result.connected) {
          const info = await getTikTokCreatorInfo(userId);
          setCreatorInfo(info.data || info);
        }
      } catch (err) {
        setConnected(false);
        setCreatorInfo(null);
      }
    }

    loadConnection();
  }, [userId]);

  const handleConnect = () => {
    if (!userId) {
      setStatus('Please login to the app before connecting TikTok.');
      return;
    }

    setStatus('Redirecting to TikTok...');
    startTikTokOAuth(userId);
  };

  const handlePublish = async (event) => {
    event.preventDefault();
    if (!userId) {
      setStatus('Please login to the app before publishing.');
      return;
    }
    if (!videoUrl.trim()) {
      setStatus('Video URL is required.');
      return;
    }

    setLoading(true);
    setStatus('Submitting video to TikTok...');

    try {
      const payload = {
        userId,
        videoUrl,
        caption,
        privacyLevel: privacy,
        disableComment: false,
        disableDuet: false,
        disableStitch: false,
      };
      const response = await publishTikTokVideo(payload);
      if (response.publishId) {
        setPublishId(response.publishId);
        setStatus(`Submitted to TikTok. Publish ID: ${response.publishId}`);
      } else {
        setStatus('Video request sent, but no publish ID returned.');
      }
    } catch (error) {
      console.error('TikTok publish error', error);
      setStatus(error.response?.data?.error || 'Video publishing failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel rounded-xl p-6 flex flex-col gap-6 relative overflow-hidden bg-surface-container-lowest">
      <div className="flex justify-between items-start relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center border border-outline-variant">
            <span className="text-lg font-bold">TT</span>
          </div>
          <div>
            <h3 className="font-headline-md text-[20px] font-semibold text-on-surface">TikTok</h3>
            <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Video publishing with Login Kit</p>
          </div>
        </div>
        <div className={`flex items-center gap-2 px-2 py-1 rounded ${connected ? 'bg-emerald-50 border border-emerald-500/20' : 'bg-surface-container border border-outline-variant'}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-emerald-500' : 'bg-on-surface-variant'}`} />
          <span className={`font-label-sm text-[10px] font-bold uppercase tracking-wider ${connected ? 'text-emerald-500' : 'text-on-surface-variant'}`}>
            {connected ? 'Connected' : 'Not connected'}
          </span>
        </div>
      </div>

      {connected && creatorInfo ? (
        <div className="rounded-xl bg-surface p-4 border border-outline-variant">
          <p className="font-label-sm text-label-sm text-on-surface-variant">Creator limits</p>
          <p className="font-body-sm text-body-sm mt-2">Max video duration: {creatorInfo.max_video_post_duration_sec ?? 'unknown'}s</p>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleConnect}
          className="px-4 py-1.5 bg-primary text-on-primary rounded-lg font-label-sm text-label-sm hover:bg-primary/90 transition-colors shadow-sm"
        >
          {connected ? 'Reconnect TikTok' : 'Connect TikTok'}
        </button>
      </div>

      {connected ? (
        <form onSubmit={handlePublish} className="grid gap-4">
          <div>
            <label className="font-label-sm text-label-sm text-on-surface-variant">Public video URL</label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://cdn.example.com/video.mp4"
              required
              className="w-full rounded-lg border border-outline-variant bg-surface p-3 text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="font-label-sm text-label-sm text-on-surface-variant">Caption</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
              placeholder="Add your caption and hashtags"
              className="w-full rounded-lg border border-outline-variant bg-surface p-3 text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="font-label-sm text-label-sm text-on-surface-variant">Privacy</label>
            <select
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value)}
              className="w-full rounded-lg border border-outline-variant bg-surface p-3 text-on-surface focus:outline-none focus:border-primary"
            >
              <option value="SELF_ONLY">Private (Self Only)</option>
              <option value="PUBLIC_TO_EVERYONE">Public</option>
              <option value="MUTUAL_FOLLOW_FRIENDS">Friends</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-black text-white rounded-lg font-label-sm text-label-sm hover:bg-gray-900 transition-colors"
          >
            {loading ? 'Publishing...' : 'Publish to TikTok'}
          </button>
        </form>
      ) : (
        <div className="rounded-xl bg-surface p-4 border border-outline-variant text-on-surface-variant">
          Connect TikTok to enable direct video publishing from this dashboard.
        </div>
      )}

      {status ? <p className="text-sm text-on-surface-variant">{status}</p> : null}
      {publishId ? <p className="text-sm text-on-surface-variant">Publish ID: {publishId}</p> : null}
    </div>
  );
}
