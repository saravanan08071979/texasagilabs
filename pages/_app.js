import '../styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [cookieAccepted, setCookieAccepted] = useState(null)

  // Page transition
  useEffect(() => {
    const start = () => setLoading(true)
    const end = () => {
      setLoading(false)
      setVisible(false)
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
    }
    router.events.on('routeChangeStart', start)
    router.events.on('routeChangeComplete', end)
    router.events.on('routeChangeError', end)
    setVisible(true)
    return () => {
      router.events.off('routeChangeStart', start)
      router.events.off('routeChangeComplete', end)
      router.events.off('routeChangeError', end)
    }
  }, [router])

  // Cookie consent
  useEffect(() => {
    try {
      const stored = localStorage.getItem('txagi_cookie_consent')
      if (stored) setCookieAccepted(stored)
    } catch {}
  }, [])

  function acceptCookies() {
    try { localStorage.setItem('txagi_cookie_consent', 'accepted') } catch {}
    setCookieAccepted('accepted')
  }

  function declineCookies() {
    try { localStorage.setItem('txagi_cookie_consent', 'declined') } catch {}
    setCookieAccepted('declined')
  }

  return (
    <>
      {loading && (
        <div style={{
          position:'fixed',top:0,left:0,right:0,height:'2px',
          background:'linear-gradient(90deg,#3b82f6,#8b5cf6,#06b6d4)',
          zIndex:9999,animation:'progress-bar 1.2s ease-in-out',
        }} />
      )}

      <div style={{opacity:visible?1:0,transition:'opacity 0.25s ease'}}>
        <Component {...pageProps} />
      </div>

      {cookieAccepted === null && (
        <div style={{
          position:'fixed',bottom:'1.5rem',left:'50%',
          transform:'translateX(-50%)',
          width:'calc(100% - 3rem)',maxWidth:'640px',
          background:'#0f1525',
          border:'1px solid rgba(59,130,246,0.3)',
          borderRadius:'12px',padding:'1.25rem 1.5rem',
          display:'flex',alignItems:'center',gap:'1.5rem',flexWrap:'wrap',
          zIndex:9000,
          boxShadow:'0 8px 40px rgba(0,0,0,0.6),0 0 0 1px rgba(255,255,255,0.05)',
          animation:'slide-up 0.4s ease',
        }}>
          <div style={{flex:1,minWidth:'200px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'0.6rem',marginBottom:'0.4rem'}}>
              <span style={{fontSize:'1rem'}}>🍪</span>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',letterSpacing:'0.12em',textTransform:'uppercase',color:'#3b82f6'}}>Privacy Notice</span>
            </div>
            <p style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',color:'#6b7a94',lineHeight:1.6,margin:0}}>
              We use essential cookies to keep the site running. No tracking, no ads, no third-party analytics.
            </p>
          </div>
          <div style={{display:'flex',gap:'0.75rem',flexShrink:0}}>
            <button onClick={declineCookies} style={{
              fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.1em',
              textTransform:'uppercase',padding:'8px 16px',borderRadius:'6px',
              border:'1px solid rgba(255,255,255,0.1)',background:'transparent',
              color:'#6b7a94',cursor:'pointer',
            }}>Decline</button>
            <button onClick={acceptCookies} style={{
              fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.1em',
              textTransform:'uppercase',padding:'8px 16px',borderRadius:'6px',
              border:'1px solid #3b82f6',background:'#3b82f6',
              color:'#fff',cursor:'pointer',
            }}>Accept</button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes progress-bar {
          0%   { transform: scaleX(0) translateX(0); transform-origin: left; }
          100% { transform: scaleX(1) translateX(0); transform-origin: left; }
        }
        @keyframes slide-up {
          from { transform: translateX(-50%) translateY(20px); opacity: 0; }
          to   { transform: translateX(-50%) translateY(0);    opacity: 1; }
        }
      `}</style>
    </>
  )
}
