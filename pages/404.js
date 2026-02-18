import Head from 'next/head'
import { useEffect, useState } from 'react'
import { SiteNav, GLOBAL_STYLES } from '../components/Layout'

export default function NotFound() {
  const [glitch, setGlitch] = useState(false)
  const [path, setPath] = useState('/unknown')

  useEffect(() => {
    if (typeof window !== 'undefined') setPath(window.location.pathname)
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 140)
    }, 3200)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Head>
        <title>404 — Texas AGI Labs</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&family=Lora:ital,wght@0,400;1,400&display=swap" rel="stylesheet" />
      </Head>
      <SiteNav />

      <div style={{background:'#000',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',paddingTop:'64px',position:'relative',overflow:'hidden'}}>
        {/* Noise */}
        <div style={{position:'absolute',inset:0,pointerEvents:'none',opacity:0.035,backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",backgroundSize:'180px 180px'}} />
        {/* Glow */}
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'800px',height:'600px',background:'radial-gradient(ellipse,rgba(59,130,246,0.05) 0%,rgba(139,92,246,0.03) 40%,transparent 70%)',pointerEvents:'none'}} />

        <div style={{textAlign:'center',position:'relative',zIndex:1,padding:'2rem',maxWidth:'700px',width:'100%'}}>

          <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(239,68,68,0.8)',marginBottom:'2rem'}}>
            ✗ ERROR · SEGMENT FAULT · INFERENCE HALTED
          </div>

          {/* Giant 404 */}
          <div style={{position:'relative',display:'inline-block',marginBottom:'0'}}>
            <div style={{
              fontFamily:"'Bebas Neue',sans-serif",
              fontSize:'clamp(8rem,28vw,22rem)',
              lineHeight:0.85,
              letterSpacing:'0.04em',
              background:'linear-gradient(135deg,rgba(30,58,95,0.9),rgba(45,27,78,0.9),rgba(10,42,53,0.9))',
              WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
              userSelect:'none',
              filter:glitch?'blur(1px)':'none',
              transform:glitch?'translateX(4px)':'translateX(0)',
              transition:glitch?'none':'all 0.1s',
            }}>404</div>
            {glitch && (
              <div style={{
                position:'absolute',top:0,left:0,right:0,
                fontFamily:"'Bebas Neue',sans-serif",
                fontSize:'clamp(8rem,28vw,22rem)',
                lineHeight:0.85, letterSpacing:'0.04em',
                background:'linear-gradient(135deg,#3b82f6,#8b5cf6)',
                WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
                transform:'translateX(-8px)',opacity:0.35,pointerEvents:'none',
              }}>404</div>
            )}
          </div>

          <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(1.5rem,4vw,3rem)',letterSpacing:'0.04em',color:'#fff',margin:'2rem 0 1rem'}}>
            This Page Does Not Exist
          </h1>
          <p style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'1rem',color:'rgba(255,255,255,0.35)',lineHeight:1.8,maxWidth:'420px',margin:'0 auto 3rem'}}>
            The page you are looking for may have been moved, deleted, or perhaps never existed in this timeline.
          </p>

          {/* Terminal */}
          <div style={{background:'#06080f',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'8px',overflow:'hidden',fontFamily:"'DM Mono',monospace",textAlign:'left',marginBottom:'3rem'}}>
            <div style={{background:'rgba(255,255,255,0.04)',padding:'0.6rem 1.25rem',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',alignItems:'center',gap:'0.5rem'}}>
              {['#ef4444','#f59e0b','#10b981'].map(c=><div key={c} style={{width:'9px',height:'9px',borderRadius:'50%',background:c}} />)}
              <span style={{fontSize:'10px',color:'rgba(255,255,255,0.25)',marginLeft:'0.5rem',letterSpacing:'0.08em'}}>route_resolver.sh</span>
            </div>
            <div style={{padding:'1.5rem',fontSize:'11px',lineHeight:2,color:'rgba(255,255,255,0.4)'}}>
              <div><span style={{color:'rgba(59,130,246,0.7)'}}>$ </span>resolve --path {path}</div>
              <div style={{color:'rgba(255,255,255,0.2)'}}># Searching route table...</div>
              <div style={{color:'#ef4444'}}>✗ No matching route found</div>
              <div style={{color:'rgba(255,255,255,0.2)'}}># Checking archived paths...</div>
              <div style={{color:'#ef4444'}}>✗ Path not in archive</div>
              <div style={{color:'#f59e0b'}}>⚠ Suggestion: return to known coordinates</div>
              <div><span style={{color:'rgba(59,130,246,0.7)'}}>$ </span><span style={{borderRight:'1px solid rgba(255,255,255,0.4)',animation:'blink 1s step-end infinite'}}&nbsp;</span></div>
            </div>
          </div>

          {/* Nav */}
          <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap',marginBottom:'2.5rem'}}>
            <a href="/" style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',color:'#fff',background:'#3b82f6',padding:'12px 24px',borderRadius:'4px',textDecoration:'none',transition:'opacity 0.2s'}}
              onMouseEnter={e=>e.currentTarget.style.opacity='0.8'}
              onMouseLeave={e=>e.currentTarget.style.opacity='1'}>← Return Home</a>
            {[['Research','/research'],['Blog','/blog'],['Careers','/careers']].map(([l,h])=>(
              <a key={l} href={h} style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(255,255,255,0.5)',padding:'12px 24px',borderRadius:'4px',textDecoration:'none',border:'1px solid rgba(255,255,255,0.1)',transition:'border-color 0.2s'}}
                onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.3)'}
                onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'}>{l}</a>
            ))}
          </div>

          <div style={{display:'flex',gap:'2.5rem',justifyContent:'center',flexWrap:'wrap'}}>
            {[['ALPHA','/models/alpha','#3b82f6'],['OMEGA','/models/omega','#8b5cf6'],['NOVA','/models/nova','#06b6d4']].map(([l,h,c])=>(
              <a key={l} href={h} style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.1em',textTransform:'uppercase',color:c,textDecoration:'none',transition:'opacity 0.2s'}}
                onMouseEnter={e=>e.currentTarget.style.opacity='0.6'}
                onMouseLeave={e=>e.currentTarget.style.opacity='1'}>{l} →</a>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        ${GLOBAL_STYLES}
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </>
  )
}
