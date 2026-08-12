import React, { useEffect, useState } from 'react'
import { startFacebookOAuth, publishPost, publishPhoto } from '../services/facebookClient'
import { startInstagramOAuth, publishInstagram, verifyInstagram } from '../services/instagramClient'
import { startThreadsOAuth, publishThreads, verifyThreads } from '../services/threadsClient'
import { startXOAuth, publishX, verifyX } from '../services/xClient'
import TikTokCard from '../components/TikTokCard'
import FacebookLogo from '../assets/fb_logo.webp'
import instaLogo from '../assets/insta_logo.png'
import threadsLogo from '../assets/threads_logo.png'

const SocialAccounts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentUserId, setCurrentUserId] = useState(null)
  const [message, setMessage] = useState('')
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false)
  const [photoUrl, setPhotoUrl] = useState('')
  const [photoCaption, setPhotoCaption] = useState('')
  const [pageId, setPageId] = useState(null)
  const [pageName, setPageName] = useState(null)
  const [status, setStatus] = useState('')
  const [photoStatus, setPhotoStatus] = useState('')
  const [isInstagramModalOpen, setIsInstagramModalOpen] = useState(false)
  const [igImageUrl, setIgImageUrl] = useState('')
  const [igCaption, setIgCaption] = useState('')
  const [igStatus, setIgStatus] = useState('')
  const [instagramUsername, setInstagramUsername] = useState(null)
  const [instagramVerified, setInstagramVerified] = useState(false)
  const [instagramStatus, setInstagramStatus] = useState('Not connected')
  const [threadsConnected, setThreadsConnected] = useState(false)
  const [threadsStatus, setThreadsStatus] = useState('Not connected')
  const [threadsUserId, setThreadsUserId] = useState(null)
  const [threadsPostType, setThreadsPostType] = useState('TEXT')
  const [threadsText, setThreadsText] = useState('')
  const [threadsImageUrl, setThreadsImageUrl] = useState('')
  const [threadsPublishStatus, setThreadsPublishStatus] = useState('')
  const [threadsLoading, setThreadsLoading] = useState(false)
  const [xConnected, setXConnected] = useState(false)
  const [xUsername, setXUsername] = useState(null)
  const [xName, setXName] = useState(null)
  const [xStatus, setXStatus] = useState('')
  const [xText, setXText] = useState('')
  const [xLoading, setXLoading] = useState(false)

  useEffect(() => {
    const loadStoredUser = async () => {
      try {
        const stored = localStorage.getItem('user');
        if (!stored) return
        const parsed = JSON.parse(stored)
        setPageId(parsed?.facebook?.pageId || null)
        setPageName(parsed?.facebook?.pageName || null)
        setInstagramUsername(parsed?.instagram?.username || null)
        setThreadsUserId(parsed?.threads?.userId || null)
        setThreadsConnected(!!parsed?.threads?.userId)
        setXUsername(parsed?.x?.username || null)
        setXName(parsed?.x?.name || null)
        setXConnected(!!parsed?.x?.userId)

        const userId = parsed._id || parsed.id || parsed.userId || null
        setCurrentUserId(userId)
        if (userId) {
          try {
            const verification = await verifyInstagram(userId)
            setInstagramVerified(verification?.valid === true)
            setInstagramUsername(verification?.instagramProfile?.username || parsed?.instagram?.username || null)
            setInstagramStatus(verification?.valid ? 'Connected' : 'Not connected')
          } catch (err) {
            setInstagramVerified(false)
            setInstagramStatus('Not connected')
          }

          try {
            const verification = await verifyThreads(userId)
            setThreadsConnected(verification?.valid === true)
            setThreadsStatus(verification?.valid ? 'Connected' : 'Not connected')
            setThreadsUserId(verification?.profile?.id || parsed?.threads?.userId || null)
          } catch (err) {
            setThreadsConnected(false)
            setThreadsStatus('Not connected')
          }
          try {
            const verification = await verifyX(userId)
            setXConnected(verification?.valid === true)
            setXUsername(verification?.profile?.username || null)
            setXName(verification?.profile?.name || parsed?.x?.name || null)
          } catch (err) {
            setXConnected(false)
          }
        }
      } catch (e) {
        console.error('Error reading stored user:', e)
      }
    }

    loadStoredUser()
  }, [])

  const getCurrentUserId = () => {
    try {
      const stored = localStorage.getItem('user')
      if (!stored) return null
      const parsed = JSON.parse(stored)
      return parsed._id || parsed.id || parsed.userId || null
    } catch (e) {
      return null
    }
  }

  const connectedPlatformsCount = [pageId || pageName, instagramUsername, threadsConnected, xConnected].filter(Boolean).length

  const handleOpenModal = () => {
    setMessage('')
    setStatus('')
    setIsModalOpen(true)
  }

  const handlePublish = async () => {
    if (!message.trim()) {
      setStatus('Post message cannot be empty.')
      return
    }

    const stored = localStorage.getItem('user')
    if (!stored) {
      setStatus('Please login again before publishing.')
      return
    }

    const parsed = JSON.parse(stored)
    const userId = parsed._id || parsed.id || parsed.userId
    if (!userId) {
      setStatus('Cannot determine user id. Please login again.')
      return
    }

    try {
      const result = await publishPost(userId, message)
      console.log('Published post using connected PageId:', result.pageId)
      setStatus(`Post published! ID: ${result.postId}`)
      setMessage('')
      setIsModalOpen(false)
    } catch (err) {
      console.error('publish error', err)
      setStatus('Publish failed. Check console for details.')
    }
  }

  const handlePublishPhoto = async () => {
    if (!photoUrl.trim()) {
      setPhotoStatus('Photo URL cannot be empty.')
      return
    }

    const stored = localStorage.getItem('user')
    if (!stored) {
      setPhotoStatus('Please login again before publishing.')
      return
    }

    const parsed = JSON.parse(stored)
    const userId = parsed._id || parsed.id || parsed.userId
    if (!userId) {
      setPhotoStatus('Cannot determine user id. Please login again.')
      return
    }

    try {
      const result = await publishPhoto(userId, photoUrl, photoCaption)
      console.log('Published photo using connected PageId:', result.pageId)
      setPhotoStatus(`Photo published! ID: ${result.photoId}`)
      setPhotoUrl('')
      setPhotoCaption('')
      setIsPhotoModalOpen(false)
    } catch (err) {
      console.error('photo publish error', err)
      setPhotoStatus('Photo publish failed. Check console for details.')
    }
  }

  const handlePublishInstagram = async () => {
    if (!igImageUrl.trim()) {
      setIgStatus('Image URL cannot be empty.')
      return
    }

    const userId = getCurrentUserId()
    if (!userId) {
      setIgStatus('Please login to the dashboard first.')
      return
    }

    try {
      const verification = await verifyInstagram(userId)
      if (!verification?.valid) {
        setIgStatus('Instagram connection is not valid. Please reconnect the account.')
        setInstagramVerified(false)
        return
      }
      setInstagramVerified(true)
    } catch (verifyErr) {
      console.error('Instagram verify error', verifyErr)
      setIgStatus('Instagram connection could not be verified. Please reconnect the account.')
      return
    }

    try {
      const result = await publishInstagram(userId, igImageUrl, igCaption)
      console.log('Instagram publish result:', result)
      setIgStatus(`Instagram post published! Media ID: ${result.mediaId}`)
      setIgImageUrl('')
      setIgCaption('')
      setIsInstagramModalOpen(false)
    } catch (err) {
      console.error('Instagram publish error', err)
      setIgStatus(err.response?.data?.error || 'Instagram publish failed. Check console for details.')
    }
  }

  const handleThreadsConnect = () => {
    const userId = getCurrentUserId()
    if (!userId) {
      setThreadsStatus('Please log in to the app first.')
      return
    }
    setThreadsStatus('Redirecting to Threads authorization...')
    startThreadsOAuth(userId)
  }

  const handleThreadsPublish = async () => {
    setThreadsPublishStatus('')
    const userId = getCurrentUserId()
    if (!userId) {
      setThreadsPublishStatus('Please log in to the app first.')
      return
    }

    if (threadsPostType === 'TEXT' && !threadsText.trim()) {
      setThreadsPublishStatus('Text cannot be empty.')
      return
    }

    if (threadsPostType === 'IMAGE' && !threadsImageUrl.trim()) {
      setThreadsPublishStatus('Image URL is required for photo posts.')
      return
    }

    setThreadsLoading(true)
    try {
      const result = await publishThreads(userId, threadsPostType, threadsText, threadsImageUrl)
      setThreadsPublishStatus(`Published to Threads! Post ID: ${result.postId}`)
      setThreadsText('')
      setThreadsImageUrl('')
      setThreadsConnected(true)
    } catch (err) {
      console.error('Threads publish error', err)
      setThreadsPublishStatus(err.response?.data?.error || 'Threads publish failed. Check console for details.')
    } finally {
      setThreadsLoading(false)
    }
  }

  const handleXConnect = () => {
    const userId = getCurrentUserId()
    if (!userId) {
      setXStatus('Please log in to the app first.')
      return
    }
    startXOAuth(userId)
  }

  const handleXPublish = async () => {
    const userId = getCurrentUserId()
    if (!userId) {
      setXStatus('Please log in to the app first.')
      return
    }
    if (!xText.trim()) {
      setXStatus('Post text cannot be empty.')
      return
    }
    setXLoading(true)
    setXStatus('')
    try {
      const result = await publishX(userId, xText)
      setXStatus(`Published to X! Post ID: ${result.postId}`)
      setXText('')
      setXConnected(true)
    } catch (err) {
      setXStatus(err.response?.data?.error || 'X publish failed. Check console for details.')
    } finally {
      setXLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* SideNavBar */}

      {/* Main Content Wrapper (account content) */}
      <div>
        <main className="flex-1 mt-[var(--topbar-height)] p-4 md:p-[40px] max-w-[1440px] mx-auto w-full flex flex-col gap-[40px]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h2 className="font-headline-xl text-headline-xl font-bold text-on-surface mb-2">Social Connections</h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full border border-outline-variant">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Platform Health: Optimal</span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">{connectedPlatformsCount} Platform{connectedPlatformsCount === 1 ? '' : 's'} Connected</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px]">
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-[24px]">
              {/* Facebook Card */}
              <div className="glass-panel rounded-xl p-6 flex flex-col gap-6 relative overflow-hidden bg-surface-container-lowest">
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                      <img src={FacebookLogo} alt="Facebook Logo" className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-headline-md text-[20px] font-semibold text-on-surface">{pageName || 'Facebook Page'}</h3>
                      <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Facebook</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-2 py-1 rounded ${pageId || pageName ? 'bg-emerald-50 border border-emerald-500/20' : 'bg-surface-container border border-outline-variant'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${pageId || pageName ? 'bg-emerald-500' : 'bg-on-surface-variant'}`} />
                    <span className={`font-label-sm text-[10px] font-bold uppercase tracking-wider ${pageId || pageName ? 'text-emerald-500' : 'text-on-surface-variant'}`}>
                      {pageId || pageName ? 'Connected' : 'Not Connected'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-outline-variant pt-4 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px]">smart_toy</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">AI Agent Idle</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button onClick={startFacebookOAuth} className="px-4 py-1.5 bg-primary text-on-primary rounded-lg font-label-sm text-label-sm hover:bg-primary/90 transition-colors shadow-sm">{"Connect"}</button>
                  <button onClick={handleOpenModal} className="px-4 py-1.5 bg-surface-container text-on-surface-variant rounded-lg font-label-sm text-label-sm border border-outline-variant hover:bg-surface-variant/70 transition-colors">Create Post</button>
                  <button onClick={() => { setPhotoUrl(''); setPhotoCaption(''); setPhotoStatus(''); setIsPhotoModalOpen(true) }} className="px-4 py-1.5 bg-surface text-on-surface rounded-lg font-label-sm text-label-sm border border-outline-variant hover:bg-surface-variant transition-colors">Upload Photo</button>
                </div>
              </div>

              {/* Instagram Card */}
              <div className="glass-panel rounded-xl p-6 flex flex-col gap-6 relative overflow-hidden bg-surface-container-lowest">
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center border border-outline-variant">
                      <img src={instaLogo} alt="Instagram Logo" className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-headline-md text-[20px] font-semibold text-on-surface">{instagramUsername ? `@${instagramUsername}` : 'Instagram account'}</h3>
                      <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Instagram</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-2 py-1 rounded border ${instagramStatus === 'Connected' ? 'bg-emerald-50 border border-emerald-500/20' : 'bg-surface-container border border-outline-variant'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${instagramStatus === 'Connected' ? 'bg-emerald-500' : 'bg-on-surface-variant'}`} />
                    <span className={`font-label-sm text-[10px] font-bold uppercase tracking-wider ${instagramStatus === 'Connected' ? 'text-emerald-500' : 'text-on-surface-variant'}`}>{instagramStatus === 'Connected' ? 'Connected' : 'Not connected'}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-outline-variant pt-4 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">smart_toy</span>
                    <span className="font-label-sm text-label-sm text-primary">AI Agent Active</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      const userId = getCurrentUserId()
                      if (!userId) {
                        setStatus('Please login to the dashboard first.')
                        return
                      }
                      startInstagramOAuth(userId)
                    }}
                    className="px-4 py-1.5 bg-primary text-on-primary rounded-lg font-label-sm text-label-sm hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    {instagramUsername ? 'Reconnect' : 'Connect'}
                  </button>
                  <button
                    onClick={() => {
                      setIgImageUrl('')
                      setIgCaption('')
                      setIgStatus('')
                      setIsInstagramModalOpen(true)
                    }}
                    className="px-4 py-1.5 bg-surface-container text-on-surface-variant rounded-lg font-label-sm text-label-sm border border-outline-variant hover:bg-surface-variant/70 transition-colors"
                  >
                    Create Post
                  </button>
                </div>
              </div>

              {/* Threads Card */}
              <div className="glass-panel rounded-xl p-6 flex flex-col gap-6 relative overflow-hidden bg-surface-container-lowest">
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center border border-outline-variant">
                      <img src={threadsLogo} alt="Threads Logo" className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-headline-md text-[20px] font-semibold text-on-surface">Threads</h3>
                      <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">{threadsUserId ? `Connected as ${threadsUserId}` : 'Meta Threads'}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-2 py-1 rounded ${threadsConnected ? 'bg-emerald-50 border border-emerald-500/20' : 'bg-surface-container border border-outline-variant'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${threadsConnected ? 'bg-emerald-500' : 'bg-on-surface-variant'}`} />
                    <span className={`font-label-sm text-[10px] font-bold uppercase tracking-wider ${threadsConnected ? 'text-emerald-500' : 'text-on-surface-variant'}`}>
                      {threadsStatus || (threadsConnected ? 'Connected' : 'Not Connected')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-outline-variant pt-4 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px]">smart_toy</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">AI Agent Idle</span>
                  </div>
                  <button onClick={handleThreadsConnect} className="px-4 py-1.5 bg-primary text-on-primary rounded-lg font-label-sm text-label-sm hover:bg-primary/90 transition-colors shadow-sm">
                    {threadsConnected ? 'Reconnect' : 'Connect'}
                  </button>
                </div>
                <div className="flex flex-col gap-3 pt-4">
                  <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                    <span className="material-symbols-outlined text-[16px]">info</span>
                    <span>Only public HTTPS image URLs work for Threads photo posts.</span>
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center gap-3">
                      <label className="font-label-sm text-label-sm text-on-surface-variant">Post Type</label>
                      <select
                        value={threadsPostType}
                        onChange={(event) => setThreadsPostType(event.target.value)}
                        className="rounded-lg border border-outline-variant bg-surface p-2 text-on-surface"
                      >
                        <option value="TEXT">Text</option>
                        <option value="IMAGE">Photo</option>
                      </select>
                    </div>
                    <textarea
                      value={threadsText}
                      onChange={(event) => setThreadsText(event.target.value)}
                      rows={4}
                      className="w-full bg-surface border border-outline-variant rounded-lg p-4 text-on-surface focus:outline-none focus:border-primary"
                      placeholder="What’s on your mind?"
                    />
                    {threadsPostType === 'IMAGE' && (
                      <input
                        type="url"
                        value={threadsImageUrl}
                        onChange={(event) => setThreadsImageUrl(event.target.value)}
                        placeholder="Public image HTTPS URL"
                        className="w-full bg-surface border border-outline-variant rounded-lg p-4 text-on-surface focus:outline-none focus:border-primary"
                      />
                    )}
                    {threadsPublishStatus ? <div className="text-sm text-on-surface-variant">{threadsPublishStatus}</div> : null}
                    <button
                      onClick={handleThreadsPublish}
                      disabled={threadsLoading}
                      className="px-4 py-2 bg-primary text-on-primary rounded-lg font-label-sm text-label-sm hover:bg-primary/90 transition-colors shadow-sm"
                    >
                      {threadsLoading ? 'Publishing...' : 'Publish to Threads'}
                    </button>
                  </div>
                </div>
              </div>

              <TikTokCard userId={currentUserId} />


              {/* X Card */}
              <div className="glass-panel rounded-xl p-6 flex flex-col gap-6 relative overflow-hidden bg-surface-container-lowest">
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center border border-outline-variant">
                      <span className="text-xl font-bold text-on-surface">X</span>
                    </div>
                    <div>
                      <h3 className="font-headline-md text-[20px] font-semibold text-on-surface">{xUsername ? `@${xUsername}` : 'X account'}</h3>
                      <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">{xName ? xName : 'X'}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-2 py-1 rounded border ${xConnected ? 'bg-emerald-50 border-emerald-500/20' : 'bg-surface-container border-outline-variant'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${xConnected ? 'bg-emerald-500' : 'bg-on-surface-variant'}`} />
                    <span className={`font-label-sm text-[10px] font-bold uppercase tracking-wider ${xConnected ? 'text-emerald-500' : 'text-on-surface-variant'}`}>{xConnected ? 'Connected' : 'Disconnected'}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-outline-variant pt-4 relative z-10">
                  <div className="flex items-center gap-2 opacity-60">
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px]">smart_toy</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">AI Agent Idle</span>
                  </div>
                  <button onClick={handleXConnect} className="px-4 py-1.5 bg-primary text-on-primary rounded-lg font-label-sm text-label-sm hover:bg-primary/90 transition-colors shadow-sm">{xConnected ? 'Reconnect' : 'Connect'}</button>
                </div>
                <div className="flex flex-col gap-3 pt-4">
                  <textarea value={xText} onChange={(event) => setXText(event.target.value)} rows={3} maxLength={280} placeholder="Post to X..." className="w-full bg-surface border border-outline-variant rounded-lg p-4 text-on-surface focus:outline-none focus:border-primary" />
                  {xStatus ? <div className="text-sm text-on-surface-variant">{xStatus}</div> : null}
                  <button onClick={handleXPublish} disabled={xLoading} className="px-4 py-2 bg-primary text-on-primary rounded-lg font-label-sm text-label-sm hover:bg-primary/90 transition-colors shadow-sm">{xLoading ? 'Publishing...' : 'Publish to X'}</button>
                </div>
              </div>
            </div>




            {/* Right Column */}
            <div className="flex flex-col gap-[24px]">
              <div className="glass-panel rounded-xl p-6 flex flex-col gap-4 bg-surface-container-lowest">
                <div className="flex items-center justify-between">
                  <h3 className="font-headline-md text-[18px] font-semibold text-on-surface">Auth Health</h3>
                  <span className="material-symbols-outlined text-on-surface-variant">monitoring</span>
                </div>
                <div className="h-32 w-full relative border-b border-l border-outline-variant mt-2">
                  <img alt="Auth Health Chart" className="w-full h-full object-cover opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk9niGgwjuiJBAeuZqPzwrLWmR15Wfh3eYvkzohy-1hr83hrfM9l_2r5rGAyYR1GXrkvtLVyh_Qrbehsqu6Z9UXO-fHIKm4NbFbM23m-oC1sws_E5elyWTZ-G3Jq75hcvtsB7Dt8DB6xWgfCk9KD4StFarEHk_s-K9h8UCvL7qJKL31tMyWHh1R4qzwptOEtNdwnhVOXb2vH_xcjw3G_Us__kZ1NzOOxTI3Wdu9AgFVM0dquTi-ZtA" />
                </div>
                <div className="flex justify-between font-label-sm text-[10px] text-on-surface-variant mt-1">
                  <span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span>
                </div>
              </div>

              <div className="glass-panel rounded-xl p-6 flex flex-col gap-4 flex-1 bg-surface-container-lowest">
                <h3 className="font-headline-md text-[18px] font-semibold text-on-surface mb-2">API & Webhooks</h3>
                <div className="flex flex-col gap-3">
                  <div className="bg-surface rounded-lg p-3 border border-outline-variant flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-label-md text-[13px] text-on-surface">OpenAI</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      </div>
                      <p className="font-label-sm text-[11px] text-on-surface-variant mt-1 font-mono">sk-proj-...8x9z</p>
                    </div>
                    <button className="text-on-surface-variant hover:text-on-surface"><span className="material-symbols-outlined text-[16px]">content_copy</span></button>
                  </div>
                  <div className="bg-surface rounded-lg p-3 border border-outline-variant flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-label-md text-[13px] text-on-surface">Meta Graph API</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      </div>
                      <p className="font-label-sm text-[11px] text-on-surface-variant mt-1 font-mono">EAAG...m2qQ</p>
                    </div>
                    <button className="text-on-surface-variant hover:text-on-surface"><span className="material-symbols-outlined text-[16px]">content_copy</span></button>
                  </div>
                </div>
                <button className="mt-auto w-full py-2 border border-dashed border-outline rounded-lg text-on-surface-variant font-label-sm text-label-sm hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  Add Connection
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-surface-container-lowest border border-outline-variant shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface">Create Facebook Post</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">This will publish to the connected Facebook Page.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:text-on-surface">Close</button>
            </div>
            <div className="flex flex-col gap-4">
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={5}
                className="w-full bg-surface border border-outline-variant rounded-lg p-4 text-on-surface focus:outline-none focus:border-primary"
                placeholder={pageId ? `Post to connected page ${pageId}` : 'Post message...'}
              />
              {status ? <div className="text-sm text-on-surface-variant">{status}</div> : null}
              <div className="flex justify-end gap-3">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg border border-outline-variant bg-surface text-on-surface hover:bg-surface-variant">Cancel</button>
                <button onClick={handlePublish} className="px-4 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary/90">Publish</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {isInstagramModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-surface-container-lowest border border-outline-variant shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface">Create Instagram Post</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">This will publish to the connected Instagram account.</p>
              </div>
              <button onClick={() => setIsInstagramModalOpen(false)} className="text-on-surface-variant hover:text-on-surface">Close</button>
            </div>
            <div className="flex flex-col gap-4">
              <input
                value={igImageUrl}
                onChange={(event) => setIgImageUrl(event.target.value)}
                className="w-full bg-surface border border-outline-variant rounded-lg p-4 text-on-surface focus:outline-none focus:border-primary"
                placeholder="Image URL"
                type="url"
              />
              <textarea
                value={igCaption}
                onChange={(event) => setIgCaption(event.target.value)}
                rows={4}
                className="w-full bg-surface border border-outline-variant rounded-lg p-4 text-on-surface focus:outline-none focus:border-primary"
                placeholder="Optional caption"
              />
              {igStatus ? <div className="text-sm text-on-surface-variant">{igStatus}</div> : null}
              <div className="flex justify-end gap-3">
                <button onClick={() => setIsInstagramModalOpen(false)} className="px-4 py-2 rounded-lg border border-outline-variant bg-surface text-on-surface hover:bg-surface-variant">Cancel</button>
                <button onClick={handlePublishInstagram} className="px-4 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary/90">Publish</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {isPhotoModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-surface-container-lowest border border-outline-variant shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface">Upload Facebook Photo</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Enter an image URL and optional caption for the connected page.</p>
              </div>
              <button onClick={() => setIsPhotoModalOpen(false)} className="text-on-surface-variant hover:text-on-surface">Close</button>
            </div>
            <div className="flex flex-col gap-4">
              <input
                value={photoUrl}
                onChange={(event) => setPhotoUrl(event.target.value)}
                className="w-full bg-surface border border-outline-variant rounded-lg p-4 text-on-surface focus:outline-none focus:border-primary"
                placeholder={pageId ? `Image URL for page ${pageId}` : 'Image URL'}
                type="url"
              />
              <textarea
                value={photoCaption}
                onChange={(event) => setPhotoCaption(event.target.value)}
                rows={4}
                className="w-full bg-surface border border-outline-variant rounded-lg p-4 text-on-surface focus:outline-none focus:border-primary"
                placeholder="Optional caption"
              />
              {photoStatus ? <div className="text-sm text-on-surface-variant">{photoStatus}</div> : null}
              <div className="flex justify-end gap-3">
                <button onClick={() => setIsPhotoModalOpen(false)} className="px-4 py-2 rounded-lg border border-outline-variant bg-surface text-on-surface hover:bg-surface-variant">Cancel</button>
                <button onClick={handlePublishPhoto} className="px-4 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary/90">Publish Photo</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default SocialAccounts

