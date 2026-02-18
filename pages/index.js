import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

function NeuralCanvas({ color1 = '#3b82f6', color2 = '#8b5cf6', density = 60 }) {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let w, h, nodes

    function resize() {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
      initNodes()
    }

    function initNodes() {
      nodes = Array.from({ length: density }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 1,
      }))
    }

    function hexToRgb(hex) {
      return `${parseInt(hex.slice(1,3),16)},${parseInt(hex.slice(3,5),16)},${parseInt(hex.slice(5,7),16)}`
    }

    function draw() {
      ctx.clearRect(0, 0, w, h)
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
      })
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i+1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < 140) {
            const alpha = (1 - dist/140) * 0.25
            const rgb = (i/nodes.length) < 0.5 ? hexToRgb(color1) : hexToRgb(color2)
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${rgb},${alpha})`
            ctx.lineWidth = 0.5
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }
      nodes.forEach((n, i) => {
        const rgb = (i/nodes.length) < 0.5 ? hexToRgb(color1) : hexToRgb(color2)
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb},0.5)`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [color1, color2, density])

  return <canvas ref={canvasRef} style={{position:'absolute',inset:0,width:'100%',height:'100%',display:'block'}} />
}

function ParticleRing({ color = '#3b82f6' }) {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId, t = 0
    let w, h

    function resize() { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight }

    function draw() {
      ctx.clearRect(0, 0, w, h)
      t += 0.005
      const cx = w/2, cy = h/2
      const maxR = Math.min(w, h) * 0.38
      const rv = parseInt(color.slice(1,3),16)
      const gv = parseInt(color.slice(3,5),16)
      const bv = parseInt(color.slice(5,7),16)

      for (let ring = 0; ring < 4; ring++) {
        const r = maxR * (0.4 + ring * 0.2)
        const numDots = 40 + ring * 20
        for (let i = 0; i < numDots; i++) {
          const angle = (i / numDots) * Math.PI * 2 + t * (ring % 2 === 0 ? 1 : -1) * (0.3 + ring * 0.1)
          const x = cx + Math.cos(angle) * r
          const y = cy + Math.sin(angle) * r * 0.35
          const alpha = 0.15 + 0.2 * Math.sin(angle * 3 + t * 2)
          const size = 1 + Math.sin(angle * 5 + t) * 0.5
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${rv},${gv},${bv},${alpha})`
          ctx.fill()
        }
      }

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.3)
      grad.addColorStop(0, `rgba(${rv},${gv},${bv},0.08)`)
      grad.addColorStop(1, `rgba(${rv},${gv},${bv},0)`)
      ctx.beginPath()
      ctx.arc(cx, cy, maxR * 0.3, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()

      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [color])

  return <canvas ref={canvasRef} style={{position:'absolute',inset:0,width:'100%',height:'100%',display:'block'}} />
}

function Section({ id, bg, children, style = {} }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <section ref={ref} id={id} style={{
      position:'relative', minHeight:'100vh', display:'flex',
      alignItems:'center', overflow:'hidden', background: bg || '#000', ...style,
    }}>
      {children(vis)}
    </section>
  )
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    const btn = e.target.querySelector('button[type=submit]')
    btn.textContent = 'Sending...'
    btn.disabled = true
    try {
      const res = await fetch('https://formspree.io/f/REPLACE_WITH_YOUR_ID', {
        method: 'POST', body: new FormData(e.target),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) { btn.textContent = '✓ Sent!'; btn.style.background='#10b981'; e.target.reset() }
      else throw new Error()
    } catch { btn.textContent = '✗ Try Again'; btn.style.background='#ef4444' }
    finally { btn.disabled = false; setTimeout(() => { btn.textContent = 'Send Message →'; btn.style.background='' }, 3000) }
  }

  return (
    <>
      <Head>
        <title>Texas AGI Labs — Frontier Intelligence Research</title>
        <meta name="description" content="Texas AGI Labs is an independent research institution advancing the frontiers of Artificial General Intelligence — safely, responsibly, and openly." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.texasagilabs.com" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="apple-touch-icon" href="/favicon-180.png" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Texas AGI Labs — Frontier Intelligence Research" />
        <meta property="og:description" content="Pioneering aligned AGI systems for humanity's long-term benefit. Based in McKinney, Texas." />
        <meta property="og:url" content="https://www.texasagilabs.com" />
        <meta property="og:image" content="https://www.texasagilabs.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.texasagilabs.com/og-image.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&family=Lora:ital,wght@0,400;1,400&display=swap" rel="stylesheet" />
      </Head>

      {/* NAV */}
      <nav style={{
        position:'fixed',top:0,left:0,right:0,zIndex:1000,
        padding:'0 4vw',height:'64px',display:'flex',alignItems:'center',justifyContent:'space-between',
        background: scrolled ? 'rgba(0,0,0,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition:'all 0.4s ease',
      }}>
        <a href="/" style={{display:'flex',alignItems:'center',gap:'10px',textDecoration:'none'}}>
          <img src="/texasagilabs-logo.png" alt="Texas AGI Labs" style={{width:'28px',height:'28px'}} />
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',letterSpacing:'0.15em',textTransform:'uppercase',color:'#fff',fontWeight:500}}>Texas AGI Labs</span>
        </a>
        <div style={{display:'flex',alignItems:'center',gap:'2.5rem'}}>
          {[['/#research','Research'],['/#models','Models'],['/#safety','Safety'],['/#team','Team'],['/blog','Blog'],['/careers','Careers']].map(([href,label]) => (
            <a key={label} href={href} style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(255,255,255,0.6)',textDecoration:'none',transition:'color 0.2s'}}
              onMouseEnter={e=>e.currentTarget.style.color='#fff'}
              onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.6)'}>{label}</a>
          ))}
          <a href="/#contact" style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',color:'#fff',textDecoration:'none',border:'1px solid rgba(255,255,255,0.25)',padding:'7px 16px',borderRadius:'4px',transition:'all 0.2s'}}
            onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.08)';e.currentTarget.style.borderColor='rgba(255,255,255,0.5)'}}
            onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.borderColor='rgba(255,255,255,0.25)'}}>
            Request Access
          </a>
        </div>
      </nav>

      {/* HERO */}
      <Section id="hero" bg="#000">
        {vis => (<>
          <NeuralCanvas color1="#3b82f6" color2="#8b5cf6" density={80} />
          <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 80% 60% at 50% 40%,rgba(10,15,30,0) 0%,rgba(0,0,0,0.65) 100%)'}} />
          <div style={{position:'absolute',bottom:0,left:0,right:0,height:'25%',background:'linear-gradient(to top,#000,transparent)'}} />
          <div style={{position:'relative',zIndex:2,padding:'0 6vw',paddingBottom:'14vh',maxWidth:'960px',alignSelf:'flex-end',marginBottom:'6vh'}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(59,130,246,0.9)',marginBottom:'1.5rem',opacity:vis?1:0,transform:vis?'translateY(0)':'translateY(20px)',transition:'all 0.8s ease 0.1s'}}>★ Frontier AI Research — McKinney, Texas</div>
            <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(4.5rem,13vw,13rem)',lineHeight:0.88,letterSpacing:'0.02em',color:'#fff',margin:'0 0 2rem',opacity:vis?1:0,transform:vis?'translateY(0)':'translateY(40px)',transition:'all 1s ease 0.2s'}}>
              Researching<br/>Aligned<br/>
              <span style={{background:'linear-gradient(135deg,#3b82f6 0%,#8b5cf6 50%,#06b6d4 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Intelligence</span>
            </h1>
            <p style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'clamp(1rem,1.8vw,1.25rem)',color:'rgba(255,255,255,0.55)',lineHeight:1.8,maxWidth:'500px',marginBottom:'3rem',opacity:vis?1:0,transform:vis?'translateY(0)':'translateY(20px)',transition:'all 0.8s ease 0.4s'}}>
              An independent lab advancing the science of safe, interpretable, and beneficial artificial general intelligence.
            </p>
            <div style={{display:'flex',gap:'1.25rem',flexWrap:'wrap',opacity:vis?1:0,transform:vis?'translateY(0)':'translateY(20px)',transition:'all 0.8s ease 0.55s'}}>
              <a href="/#models" style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',letterSpacing:'0.12em',textTransform:'uppercase',color:'#fff',background:'#3b82f6',padding:'13px 28px',borderRadius:'4px',textDecoration:'none',transition:'background 0.2s',boxShadow:'0 0 40px rgba(59,130,246,0.35)'}}
                onMouseEnter={e=>e.currentTarget.style.background='#2563eb'}
                onMouseLeave={e=>e.currentTarget.style.background='#3b82f6'}>Explore Models</a>
              <a href="/research" style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(255,255,255,0.75)',padding:'13px 28px',borderRadius:'4px',textDecoration:'none',border:'1px solid rgba(255,255,255,0.18)',transition:'border-color 0.2s'}}
                onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.5)'}
                onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.18)'}>View Research →</a>
            </div>
          </div>
          <div style={{position:'absolute',bottom:'2.5rem',left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:'8px',opacity:0.35}}>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:'9px',letterSpacing:'0.2em',textTransform:'uppercase',color:'#fff'}}>Scroll</span>
            <div style={{width:'1px',height:'36px',background:'linear-gradient(to bottom,rgba(255,255,255,0.6),transparent)',animation:'scrollPulse 2s ease infinite'}} />
          </div>
        </>)}
      </Section>

      {/* MODELS */}
      <Section id="models" bg="#000">
        {vis => (<>
          <ParticleRing color="#3b82f6" />
          <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 100% 80% at 0% 50%,rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.88) 55%)'}} />
          <div style={{position:'relative',zIndex:2,padding:'0 6vw',width:'100%',maxWidth:'1200px',margin:'0 auto'}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(59,130,246,0.75)',marginBottom:'0.75rem',opacity:vis?1:0,transition:'all 0.8s ease 0.1s'}}>Model Suite</div>
            <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(3.5rem,9vw,9rem)',lineHeight:0.9,color:'#fff',marginBottom:'4rem',opacity:vis?1:0,transform:vis?'translateY(0)':'translateY(30px)',transition:'all 0.9s ease 0.2s'}}>Three<br/>Frontiers.</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1px',background:'rgba(255,255,255,0.07)'}}>
              {[
                {name:'ALPHA',sub:'A1 — Safe Deployment',color:'#3b82f6',status:'Operational',desc:'S-2 certified. Enforces constitutional constraints and human-oversight requirements at inference time.',href:'/models/alpha',delay:'0.3s'},
                {name:'OMEGA',sub:'B1 — Robust Cognition',color:'#8b5cf6',status:'In Evaluation',desc:'R-1 certified. Built for causal reasoning and out-of-distribution generalization under stress.',href:'/models/omega',delay:'0.45s'},
                {name:'NOVA',sub:'C1 — Agent Integration',color:'#06b6d4',status:'Research Phase',desc:'I-3 certified. Multi-agent coordination with COORD-SAFE for distributed intelligence networks.',href:'/models/nova',delay:'0.6s'},
              ].map(m => (
                <a key={m.name} href={m.href} style={{background:'rgba(0,0,0,0.65)',padding:'3rem 2.5rem',textDecoration:'none',display:'block',borderTop:`2px solid ${m.color}`,transition:'background 0.3s',backdropFilter:'blur(10px)',opacity:vis?1:0,transform:vis?'translateY(0)':'translateY(30px)',transitionProperty:'opacity,transform,background',transitionDuration:`0.8s,0.8s,0.3s`,transitionDelay:m.delay}}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(15,20,35,0.85)'}
                  onMouseLeave={e=>e.currentTarget.style.background='rgba(0,0,0,0.65)'}>
                  <div style={{display:'flex',alignItems:'center',gap:'6px',fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',color:m.color,marginBottom:'1.25rem'}}>
                    <span style={{width:'6px',height:'6px',borderRadius:'50%',background:m.color,display:'inline-block'}}></span>{m.status}
                  </div>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'3.5rem',color:m.color,lineHeight:1,marginBottom:'0.25rem'}}>{m.name}</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'rgba(255,255,255,0.28)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'1.25rem'}}>{m.sub}</div>
                  <p style={{fontFamily:"'Lora',serif",fontSize:'0.88rem',fontStyle:'italic',color:'rgba(255,255,255,0.45)',lineHeight:1.75,marginBottom:'1.5rem'}}>{m.desc}</p>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.1em',textTransform:'uppercase',color:m.color}}>View Model Card →</span>
                </a>
              ))}
            </div>
          </div>
        </>)}
      </Section>

      {/* RESEARCH */}
      <Section id="research" bg="#000">
        {vis => (<>
          <NeuralCanvas color1="#8b5cf6" color2="#06b6d4" density={50} />
          <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 80% 80% at 100% 50%,rgba(0,0,0,0.15) 0%,rgba(0,0,0,0.9) 55%)'}} />
          <div style={{position:'relative',zIndex:2,padding:'0 6vw',width:'100%',maxWidth:'1200px',margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6rem',alignItems:'center'}}>
            <div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(139,92,246,0.8)',marginBottom:'0.75rem',opacity:vis?1:0,transition:'all 0.8s ease 0.1s'}}>Research Areas</div>
              <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(3rem,7vw,7.5rem)',lineHeight:0.9,color:'#fff',marginBottom:'2rem',opacity:vis?1:0,transform:vis?'translateY(0)':'translateY(30px)',transition:'all 0.9s ease 0.2s'}}>Six Hard<br/>Problems.</h2>
              <p style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'1.05rem',color:'rgba(255,255,255,0.45)',lineHeight:1.8,marginBottom:'2.5rem',opacity:vis?1:0,transition:'all 0.8s ease 0.35s'}}>We focus exclusively on the research that matters most for making AGI safe.</p>
              <div style={{display:'flex',gap:'1rem',opacity:vis?1:0,transition:'all 0.8s ease 0.45s'}}>
                <a href="/research" style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',color:'#8b5cf6',textDecoration:'none',border:'1px solid rgba(139,92,246,0.35)',padding:'10px 20px',borderRadius:'4px',transition:'all 0.2s'}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor='#8b5cf6'}
                  onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(139,92,246,0.35)'}>All Publications →</a>
                <a href="/blog" style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(255,255,255,0.4)',textDecoration:'none',border:'1px solid rgba(255,255,255,0.1)',padding:'10px 20px',borderRadius:'4px',transition:'all 0.2s'}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.3)'}
                  onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'}>Blog →</a>
              </div>
            </div>
            <div>
              {[
                {n:'01',t:'AGI Alignment',c:'#3b82f6',d:'0.3s'},
                {n:'02',t:'Mechanistic Interpretability',c:'#8b5cf6',d:'0.4s'},
                {n:'03',t:'Scalable Oversight',c:'#06b6d4',d:'0.5s'},
                {n:'04',t:'Agentic AI Safety',c:'#10b981',d:'0.6s'},
                {n:'05',t:'Evaluation & Red-Teaming',c:'#f59e0b',d:'0.7s'},
                {n:'06',t:'Constitutional AI Methods',c:'#3b82f6',d:'0.8s'},
              ].map(r => (
                <div key={r.n} style={{display:'flex',alignItems:'center',gap:'1.5rem',padding:'1.25rem 0',borderBottom:'1px solid rgba(255,255,255,0.06)',opacity:vis?1:0,transform:vis?'translateX(0)':'translateX(30px)',transitionProperty:'opacity,transform',transitionDuration:'0.7s',transitionDelay:r.d}}>
                  <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'1.4rem',color:r.c,opacity:0.35,minWidth:'32px'}}>{r.n}</span>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:'12px',letterSpacing:'0.05em',color:'rgba(255,255,255,0.75)'}}>{r.t}</span>
                  <span style={{marginLeft:'auto',color:r.c,opacity:0.4,fontSize:'14px'}}>→</span>
                </div>
              ))}
            </div>
          </div>
        </>)}
      </Section>

      {/* SAFETY */}
      <Section id="safety" bg="#000">
        {vis => (<>
          <ParticleRing color="#10b981" />
          <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 100% 80% at 100% 50%,rgba(0,0,0,0.25) 0%,rgba(0,0,0,0.9) 55%)'}} />
          <div style={{position:'relative',zIndex:2,padding:'0 6vw',width:'100%',maxWidth:'1200px',margin:'0 auto'}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(16,185,129,0.8)',marginBottom:'0.75rem',opacity:vis?1:0,transition:'all 0.8s ease 0.1s'}}>Safety First</div>
            <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(3.5rem,9vw,9rem)',lineHeight:0.9,color:'#fff',marginBottom:'4rem',opacity:vis?1:0,transform:vis?'translateY(0)':'translateY(30px)',transition:'all 0.9s ease 0.2s'}}>Safety Is Not<br/>An Afterthought.</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1px',background:'rgba(255,255,255,0.05)'}}>
              {[
                {n:'01',t:'Constitutional Constraints',b:'Every model enforces hard-coded ethical constraints at inference — non-negotiable, non-bypassable.',c:'#3b82f6',d:'0.3s'},
                {n:'02',t:'Corrigibility by Design',b:'Human override mechanisms are preserved at every capability tier. We do not trade control for performance.',c:'#10b981',d:'0.45s'},
                {n:'03',t:'Mechanistic Audits',b:'We reverse-engineer the circuits responsible for key behaviors. No model ships without a full circuit audit.',c:'#8b5cf6',d:'0.6s'},
                {n:'04',t:'Open Safety Research',b:'We publish our safety findings — including failures — to contribute to the global field.',c:'#06b6d4',d:'0.75s'},
              ].map(p => (
                <div key={p.n} style={{background:'rgba(0,0,0,0.55)',padding:'3rem 2rem',backdropFilter:'blur(8px)',opacity:vis?1:0,transform:vis?'translateY(0)':'translateY(30px)',transitionProperty:'opacity,transform',transitionDuration:'0.8s',transitionDelay:p.d}}>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'2.5rem',color:p.c,opacity:0.12,lineHeight:1,marginBottom:'1.5rem'}}>{p.n}</div>
                  <h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'1.4rem',letterSpacing:'0.04em',color:'#fff',marginBottom:'0.75rem'}}>{p.t}</h3>
                  <p style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'0.88rem',color:'rgba(255,255,255,0.4)',lineHeight:1.8}}>{p.b}</p>
                </div>
              ))}
            </div>
          </div>
        </>)}
      </Section>

      {/* TEAM */}
      <Section id="team" bg="#000">
        {vis => (<>
          <NeuralCanvas color1="#f59e0b" color2="#3b82f6" density={40} />
          <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.84)'}} />
          <div style={{position:'relative',zIndex:2,padding:'0 6vw',width:'100%',maxWidth:'1200px',margin:'0 auto'}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(245,158,11,0.8)',marginBottom:'0.75rem',opacity:vis?1:0,transition:'all 0.8s ease 0.1s'}}>Team</div>
            <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(3.5rem,9vw,9rem)',lineHeight:0.9,color:'#fff',marginBottom:'4rem',opacity:vis?1:0,transform:vis?'translateY(0)':'translateY(30px)',transition:'all 0.9s ease 0.2s'}}>The People<br/>Doing the Work.</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:'1px',background:'rgba(255,255,255,0.06)'}}>
              {[
                {i:'JM',n:'James Mercer',r:'Founder & Research Director',c:'#3b82f6',bg:'rgba(30,58,95,0.6)',t:'Alignment · Governance',d:'0.3s'},
                {i:'AK',n:'Ananya Krishnaswamy',r:'Head of Interpretability',c:'#8b5cf6',bg:'rgba(45,27,78,0.6)',t:'Interpretability · Circuits',d:'0.4s'},
                {i:'DO',n:'David Okafor',r:'Lead — Agentic Systems',c:'#06b6d4',bg:'rgba(10,42,53,0.6)',t:'Multi-Agent · NOVA',d:'0.5s'},
                {i:'SP',n:'Soo-Jin Park',r:'Research Scientist',c:'#10b981',bg:'rgba(26,46,26,0.6)',t:'Red-Teaming · Evals',d:'0.6s'},
                {i:'RV',n:'Rosa Vasquez',r:'ML Infrastructure Lead',c:'#f59e0b',bg:'rgba(42,31,10,0.6)',t:'Training · RLHF',d:'0.7s'},
                {i:'+',n:'Join the Team',r:'Open Positions',c:'#3b82f6',bg:'rgba(59,130,246,0.04)',t:'View Careers →',d:'0.8s',href:'/careers'},
              ].map(m => (
                <a key={m.n} href={m.href || '/careers'} style={{background:m.bg,padding:'2rem 1.5rem',textDecoration:'none',display:'block',backdropFilter:'blur(8px)',transition:'background 0.3s',opacity:vis?1:0,transform:vis?'translateY(0)':'translateY(20px)',transitionProperty:'opacity,transform,background',transitionDuration:'0.7s,0.7s,0.3s',transitionDelay:m.d}}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(20,28,45,0.8)'}
                  onMouseLeave={e=>e.currentTarget.style.background=m.bg}>
                  <div style={{width:'44px',height:'44px',borderRadius:'8px',background:`${m.c}18`,border:`1px solid ${m.c}33`,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Bebas Neue',sans-serif",fontSize:'1.2rem',color:m.c,marginBottom:'1rem'}}>{m.i}</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',color:'rgba(255,255,255,0.85)',letterSpacing:'0.03em',marginBottom:'0.25rem'}}>{m.n}</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:'9px',color:m.c,letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:'0.75rem'}}>{m.r}</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:'9px',color:'rgba(255,255,255,0.25)',letterSpacing:'0.05em'}}>{m.t}</div>
                </a>
              ))}
            </div>
          </div>
        </>)}
      </Section>

      {/* ABOUT */}
      <Section id="about" bg="#000" style={{minHeight:'80vh'}}>
        {vis => (<>
          <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 60% 80% at 50% 50%,rgba(59,130,246,0.04) 0%,rgba(0,0,0,1) 70%)'}} />
          <div style={{position:'relative',zIndex:2,padding:'0 6vw',width:'100%',maxWidth:'900px',margin:'0 auto',textAlign:'center'}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(59,130,246,0.7)',marginBottom:'2rem',opacity:vis?1:0,transition:'all 0.8s ease 0.1s'}}>Our Mission</div>
            <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(3rem,7vw,7rem)',lineHeight:0.9,color:'#fff',marginBottom:'3rem',opacity:vis?1:0,transform:vis?'translateY(0)':'translateY(30px)',transition:'all 0.9s ease 0.2s'}}>Intelligence<br/>That Serves<br/>Humanity.</h2>
            <p style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'clamp(1rem,1.8vw,1.3rem)',color:'rgba(255,255,255,0.45)',lineHeight:1.9,marginBottom:'4rem',opacity:vis?1:0,transition:'all 0.8s ease 0.35s'}}>
              Texas AGI Labs is an independent research institution based in McKinney, Texas. We believe the frontier of intelligence research should not be concentrated in a single city or worldview. We publish openly. We build carefully. We move with urgency — because the stakes demand it.
            </p>
            <div style={{display:'flex',gap:'4rem',justifyContent:'center',flexWrap:'wrap',opacity:vis?1:0,transition:'all 0.8s ease 0.5s'}}>
              {[['3','Frontier Models'],['12+','Research Papers'],['5','Safety Researchers'],['100%','Open Research']].map(([n,l]) => (
                <div key={l}>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'3.5rem',background:'linear-gradient(135deg,#3b82f6,#06b6d4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',lineHeight:1}}>{n}</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:'9px',color:'rgba(255,255,255,0.25)',letterSpacing:'0.12em',textTransform:'uppercase',marginTop:'4px'}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </>)}
      </Section>

      {/* CONTACT */}
      <Section id="contact" bg="#000" style={{minHeight:'80vh'}}>
        {vis => (<>
          <NeuralCanvas color1="#3b82f6" color2="#10b981" density={30} />
          <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.9)'}} />
          <div style={{position:'relative',zIndex:2,padding:'0 6vw',width:'100%',maxWidth:'720px',margin:'0 auto'}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(59,130,246,0.8)',marginBottom:'0.75rem',opacity:vis?1:0,transition:'all 0.8s ease 0.1s'}}>Contact</div>
            <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(3rem,7vw,7rem)',lineHeight:0.9,color:'#fff',marginBottom:'3rem',opacity:vis?1:0,transform:vis?'translateY(0)':'translateY(30px)',transition:'all 0.9s ease 0.2s'}}>Get In<br/>Touch.</h2>
            <form style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.25rem',opacity:vis?1:0,transition:'all 0.8s ease 0.35s'}} onSubmit={handleSubmit}>
              {[['First Name','text','first_name'],['Last Name','text','last_name']].map(([label,type,name]) => (
                <div key={name}>
                  <label style={{fontFamily:"'DM Mono',monospace",fontSize:'9px',letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(255,255,255,0.28)',display:'block',marginBottom:'8px'}}>{label}</label>
                  <input type={type} name={name} required style={{width:'100%',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'4px',padding:'11px 14px',color:'#fff',fontFamily:"'DM Mono',monospace",fontSize:'12px',outline:'none',boxSizing:'border-box',transition:'border-color 0.2s'}}
                    onFocus={e=>e.currentTarget.style.borderColor='rgba(59,130,246,0.5)'}
                    onBlur={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'} />
                </div>
              ))}
              <div style={{gridColumn:'1/-1'}}>
                <label style={{fontFamily:"'DM Mono',monospace",fontSize:'9px',letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(255,255,255,0.28)',display:'block',marginBottom:'8px'}}>Email</label>
                <input type="email" name="email" required style={{width:'100%',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'4px',padding:'11px 14px',color:'#fff',fontFamily:"'DM Mono',monospace",fontSize:'12px',outline:'none',boxSizing:'border-box',transition:'border-color 0.2s'}}
                  onFocus={e=>e.currentTarget.style.borderColor='rgba(59,130,246,0.5)'}
                  onBlur={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'} />
              </div>
              <div style={{gridColumn:'1/-1'}}>
                <label style={{fontFamily:"'DM Mono',monospace",fontSize:'9px',letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(255,255,255,0.28)',display:'block',marginBottom:'8px'}}>Message</label>
                <textarea name="message" rows={5} required style={{width:'100%',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'4px',padding:'11px 14px',color:'#fff',fontFamily:"'DM Mono',monospace",fontSize:'12px',outline:'none',resize:'vertical',boxSizing:'border-box',transition:'border-color 0.2s'}}
                  onFocus={e=>e.currentTarget.style.borderColor='rgba(59,130,246,0.5)'}
                  onBlur={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'} />
              </div>
              <div style={{gridColumn:'1/-1'}}>
                <button type="submit" style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',letterSpacing:'0.12em',textTransform:'uppercase',background:'#3b82f6',color:'#fff',border:'none',padding:'13px 32px',borderRadius:'4px',cursor:'pointer',transition:'background 0.2s',boxShadow:'0 0 30px rgba(59,130,246,0.25)'}}
                  onMouseEnter={e=>e.currentTarget.style.background='#2563eb'}
                  onMouseLeave={e=>e.currentTarget.style.background='#3b82f6'}>Send Message →</button>
              </div>
            </form>
          </div>
        </>)}
      </Section>

      {/* FOOTER */}
      <footer style={{background:'#000',borderTop:'1px solid rgba(255,255,255,0.06)',padding:'3rem 6vw'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto',display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:'3rem',marginBottom:'2.5rem'}}>
          <div>
            <a href="/" style={{display:'flex',alignItems:'center',gap:'10px',textDecoration:'none',marginBottom:'1rem'}}>
              <img src="/texasagilabs-logo.png" alt="" style={{width:'26px',height:'26px'}} />
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',letterSpacing:'0.15em',textTransform:'uppercase',color:'#fff'}}>Texas AGI Labs</span>
            </a>
            <p style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'rgba(255,255,255,0.2)',lineHeight:1.8}}>An independent frontier AI research lab.<br/>McKinney, Texas.</p>
          </div>
          {[
            ['Research',[['Publications','/research'],['Blog','/blog'],['Safety','/#safety']]],
            ['Models',[['ALPHA A1','/models/alpha'],['OMEGA B1','/models/omega'],['NOVA C1','/models/nova']]],
            ['Company',[['About','/#about'],['Careers','/careers'],['Contact','/#contact']]],
          ].map(([title, links]) => (
            <div key={title}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:'9px',letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginBottom:'1.25rem'}}>{title}</div>
              <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:'0.7rem'}}>
                {links.map(([label,href]) => (
                  <li key={label}><a href={href} style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',color:'rgba(255,255,255,0.4)',textDecoration:'none',transition:'color 0.2s'}}
                    onMouseEnter={e=>e.currentTarget.style.color='#fff'}
                    onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.4)'}>{label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:'2rem',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'1rem'}}>
          <p style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'rgba(255,255,255,0.18)',letterSpacing:'0.05em'}}>© 2025–2026 Texas AGI Labs. All rights reserved. McKinney, TX 75070</p>
          <div style={{display:'flex',gap:'0.75rem'}}>
            {['Safety-First','Open Research','Texas-Built'].map(b => (
              <span key={b} style={{fontFamily:"'DM Mono',monospace",fontSize:'9px',letterSpacing:'0.1em',textTransform:'uppercase',padding:'3px 8px',border:'1px solid rgba(255,255,255,0.08)',color:'rgba(255,255,255,0.2)',borderRadius:'3px'}}>{b}</span>
            ))}
          </div>
        </div>
      </footer>

      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #000; color: #fff; -webkit-font-smoothing: antialiased; }
        @keyframes scrollPulse { 0%,100%{opacity:0.3} 50%{opacity:0.8} }
        @media(max-width:1024px) {
          [style*="grid-template-columns: repeat(3,1fr)"] { grid-template-columns: 1fr !important; }
          [style*="grid-template-columns: repeat(4,1fr)"] { grid-template-columns: 1fr 1fr !important; }
          [style*="grid-template-columns: repeat(6,1fr)"] { grid-template-columns: repeat(3,1fr) !important; }
          [style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; gap: 3rem !important; }
          [style*="grid-template-columns: 2fr 1fr 1fr 1fr"] { grid-template-columns: 1fr 1fr !important; }
        }
        @media(max-width:640px) {
          nav > div { display: none !important; }
          [style*="grid-template-columns: repeat(3,1fr)"] { grid-template-columns: 1fr !important; }
          [style*="grid-template-columns: repeat(6,1fr)"] { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </>
  )
}
