import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 150)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Head>
        <title>404 — Page Not Found | Texas AGI Labs</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="apple-touch-icon" href="/favicon-180.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Lora:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />
      </Head>

      <div className="grid-bg" />

      <nav>
        <a href="/" className="nav-logo">
          <img src="/texasagilabs-logo.png" alt="Texas AGI Labs" className="logo-img" />
          <span className="logo-text">Texas AGI Labs</span>
        </a>
        <ul className="nav-links">
          <li><a href="/#research">Research</a></li>
          <li><a href="/#models">Models</a></li>
          <li><a href="/#safety">Safety</a></li>
          <li><a href="/#about">About</a></li>
          <li><a href="/#contact">Contact</a></li>
        </ul>
        <a href="/#contact" className="nav-cta">Request Access</a>
      </nav>

      <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',paddingTop:'64px',position:'relative',overflow:'hidden'}}>

        {/* Glow */}
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'600px',height:'400px',background:'radial-gradient(ellipse,rgba(59,130,246,0.08) 0%,rgba(139,92,246,0.04) 40%,transparent 70%)',pointerEvents:'none'}} />

        <div style={{textAlign:'center',position:'relative',zIndex:1,padding:'2rem'}}>

          {/* Terminal-style error code */}
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',color:'#4a5568',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'1.5rem'}}>
            <span style={{color:'#ef4444'}}>ERROR</span> · SEGMENT FAULT · INFERENCE HALTED
          </div>

          {/* 404 */}
          <div style={{
            fontFamily:"'Bebas Neue',sans-serif",
            fontSize:'clamp(8rem,25vw,22rem)',
            lineHeight:0.85,
            letterSpacing:'0.04em',
            background:'linear-gradient(135deg,#1a2d4a,#2d1b4e,#0a2a35)',
            WebkitBackgroundClip:'text',
            WebkitTextFillColor:'transparent',
            backgroundClip:'text',
            userSelect:'none',
            filter: glitch ? 'blur(2px)' : 'none',
            transform: glitch ? 'translateX(3px)' : 'translateX(0)',
            transition: glitch ? 'none' : 'all 0.1s',
            position:'relative',
          }}>
            404
            {/* Glitch overlay */}
            {glitch && (
              <div style={{
                position:'absolute',top:0,left:0,right:0,bottom:0,
                fontFamily:"'Bebas Neue',sans-serif",
                fontSize:'clamp(8rem,25vw,22rem)',
                lineHeight:0.85,
                background:'linear-gradient(135deg,#3b82f6,#8b5cf6)',
                WebkitBackgroundClip:'text',
                WebkitTextFillColor:'transparent',
                backgroundClip:'text',
                transform:'translateX(-6px)',
                opacity:0.4,
                pointerEvents:'none',
              }}>404</div>
            )}
          </div>

          {/* Message */}
          <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(1.5rem,4vw,3rem)',letterSpacing:'0.04em',color:'#e8edf5',margin:'2rem 0 1rem'}}>
            This Page Does Not Exist
          </h1>
          <p style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'1.05rem',color:'#6b7a94',lineHeight:1.7,maxWidth:'480px',margin:'0 auto 3rem'}}>
            The page you are looking for may have been moved, deleted, or perhaps never existed in this timeline.
          </p>

          {/* Terminal block */}
          <div className="terminal" style={{maxWidth:'480px',margin:'0 auto 3rem',textAlign:'left'}}>
            <div className="terminal-bar">
              <div className="term-dot red"></div>
              <div className="term-dot yellow"></div>
              <div className="term-dot green"></div>
              <span className="terminal-title">route_resolver.sh</span>
            </div>
            <div className="terminal-body">
              <span className="term-line"><span className="term-prompt">$ </span><span className="term-cmd">resolve --path {typeof window !== 'undefined' ? window.location.pathname : '/unknown'}</span></span>
              <span className="term-line term-comment"># Searching route table...</span>
              <span className="term-line" style={{color:'#ef4444'}}>✗ No matching route found</span>
              <span className="term-line term-comment"># Checking archived paths...</span>
              <span className="term-line" style={{color:'#ef4444'}}>✗ Path not in archive</span>
              <span className="term-line">&nbsp;</span>
              <span className="term-line term-warn">⚠ Suggestion: return to known coordinates</span>
              <span className="term-line"><span className="term-prompt">$ </span><span className="term-cursor"></span></span>
            </div>
          </div>

          {/* Nav links */}
          <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap',marginBottom:'3rem'}}>
            <a href="/" className="btn-primary">← Return Home</a>
            <a href="/research" className="btn-ghost">Research</a>
            <a href="/blog" className="btn-ghost">Blog</a>
            <a href="/careers" className="btn-ghost">Careers</a>
          </div>

          {/* Quick links */}
          <div style={{display:'flex',gap:'2rem',justifyContent:'center',flexWrap:'wrap'}}>
            {[
              {label:'ALPHA Model',href:'/models/alpha',color:'#3b82f6'},
              {label:'OMEGA Model',href:'/models/omega',color:'#8b5cf6'},
              {label:'NOVA Model',href:'/models/nova',color:'#06b6d4'},
            ].map(l => (
              <a key={l.label} href={l.href} style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',letterSpacing:'0.08em',textTransform:'uppercase',color:l.color,textDecoration:'none',transition:'opacity 0.2s'}}
                onMouseEnter={e=>e.currentTarget.style.opacity='0.6'}
                onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
                {l.label} →
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
