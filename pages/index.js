import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

// ── Animated backgrounds ─────────────────────────────────────────────────────

function NeuralCanvas({ color1 = '#3b82f6', color2 = '#8b5cf6', density = 70 }) {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId, w, h, nodes
    const hexRgb = h => `${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)}`
    function resize() {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
      nodes = Array.from({length:density}, () => ({
        x:Math.random()*w, y:Math.random()*h,
        vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3,
        r:Math.random()*2+1,
      }))
    }
    function draw() {
      ctx.clearRect(0,0,w,h)
      nodes.forEach(n => {
        n.x+=n.vx; n.y+=n.vy
        if(n.x<0||n.x>w) n.vx*=-1
        if(n.y<0||n.y>h) n.vy*=-1
      })
      for(let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++) {
        const dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y
        const dist=Math.sqrt(dx*dx+dy*dy)
        if(dist<150) {
          const rgb = (i/nodes.length)<.5 ? hexRgb(color1) : hexRgb(color2)
          ctx.beginPath()
          ctx.strokeStyle=`rgba(${rgb},${(1-dist/150)*.2})`
          ctx.lineWidth=.5
          ctx.moveTo(nodes[i].x,nodes[i].y)
          ctx.lineTo(nodes[j].x,nodes[j].y)
          ctx.stroke()
        }
      }
      nodes.forEach((n,i) => {
        const rgb=(i/nodes.length)<.5?hexRgb(color1):hexRgb(color2)
        ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2)
        ctx.fillStyle=`rgba(${rgb},0.45)`; ctx.fill()
      })
      animId=requestAnimationFrame(draw)
    }
    resize(); draw()
    window.addEventListener('resize',resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize',resize) }
  },[color1,color2,density])
  return <canvas ref={ref} style={{position:'absolute',inset:0,width:'100%',height:'100%',display:'block'}} />
}

function ParticleRing({ color='#3b82f6' }) {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId, t=0, w, h
    const rv=parseInt(color.slice(1,3),16), gv=parseInt(color.slice(3,5),16), bv=parseInt(color.slice(5,7),16)
    function resize() { w=canvas.width=canvas.offsetWidth; h=canvas.height=canvas.offsetHeight }
    function draw() {
      ctx.clearRect(0,0,w,h); t+=.004
      const cx=w/2, cy=h/2, maxR=Math.min(w,h)*.42
      for(let ring=0;ring<5;ring++) {
        const r=maxR*(.35+ring*.16), num=50+ring*18
        for(let i=0;i<num;i++) {
          const angle=(i/num)*Math.PI*2+t*(ring%2===0?1:-1)*(.25+ring*.08)
          const x=cx+Math.cos(angle)*r, y=cy+Math.sin(angle)*r*.32
          const alpha=.12+.18*Math.sin(angle*3+t*2)
          const size=1+Math.sin(angle*5+t)*.5
          ctx.beginPath(); ctx.arc(x,y,size,0,Math.PI*2)
          ctx.fillStyle=`rgba(${rv},${gv},${bv},${alpha})`; ctx.fill()
        }
      }
      const grad=ctx.createRadialGradient(cx,cy,0,cx,cy,maxR*.28)
      grad.addColorStop(0,`rgba(${rv},${gv},${bv},0.07)`)
      grad.addColorStop(1,`rgba(${rv},${gv},${bv},0)`)
      ctx.beginPath(); ctx.arc(cx,cy,maxR*.28,0,Math.PI*2)
      ctx.fillStyle=grad; ctx.fill()
      animId=requestAnimationFrame(draw)
    }
    resize(); draw()
    window.addEventListener('resize',resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize',resize) }
  },[color])
  return <canvas ref={ref} style={{position:'absolute',inset:0,width:'100%',height:'100%',display:'block'}} />
}

// ── Noise overlay ─────────────────────────────────────────────────────────────
const Noise = () => (
  <div style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:3,opacity:.032,
    backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
    backgroundSize:'180px 180px'}} />
)

// ── Single cinematic section ──────────────────────────────────────────────────
function CinemaSection({ id, children, style={} }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVis(true) }, {threshold:.2})
    if(ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  },[])
  return (
    <section ref={ref} id={id} style={{
      position:'relative', height:'100vh', minHeight:'600px',
      display:'flex', flexDirection:'column', justifyContent:'flex-end',
      overflow:'hidden', background:'#000', ...style,
    }}>
      {children(vis)}
      <Noise />
    </section>
  )
}

// ── Text + CTA overlay (bottom-left, SpaceX style) ────────────────────────────
function SectionText({ vis, eyebrow, line1, line2, ctaLabel, ctaHref, ctaColor='#fff', delay=0 }) {
  const base = `0.8s ease ${delay}s`
  return (
    <div style={{
      position:'relative', zIndex:4,
      padding:'0 6vw 8vh',
      maxWidth:'900px',
    }}>
      {eyebrow && (
        <div style={{
          fontFamily:"'DM Mono',monospace", fontSize:'10px', letterSpacing:'0.2em',
          textTransform:'uppercase', color:'rgba(255,255,255,0.4)',
          marginBottom:'1.25rem',
          opacity:vis?1:0, transform:vis?'translateY(0)':'translateY(16px)',
          transition:`opacity ${base}, transform ${base}`,
        }}>{eyebrow}</div>
      )}
      <h2 style={{
        fontFamily:"'Bebas Neue',sans-serif",
        fontSize:'clamp(3.5rem,9vw,9.5rem)',
        lineHeight:.88, letterSpacing:'.02em', color:'#fff',
        margin:'0 0 2.5rem',
        opacity:vis?1:0, transform:vis?'translateY(0)':'translateY(30px)',
        transition:`opacity 1s ease ${delay+.1}s, transform 1s ease ${delay+.1}s`,
      }}>
        {line1}<br/>
        <span style={{color:'rgba(255,255,255,0.45)'}}>{line2}</span>
      </h2>
      <a href={ctaHref} style={{
        display:'inline-block',
        fontFamily:"'DM Mono',monospace", fontSize:'11px',
        letterSpacing:'0.12em', textTransform:'uppercase',
        color:'#000', background:'#fff',
        padding:'13px 28px', borderRadius:'4px',
        textDecoration:'none', transition:'opacity .2s',
        opacity:vis?1:0,
        transitionProperty:'opacity',
        transitionDuration:'.2s, .8s',
        transitionDelay:`0s, ${delay+.25}s`,
        animation: vis ? `fadeIn .8s ease ${delay+.25}s both` : 'none',
      }}
        onMouseEnter={e=>e.currentTarget.style.opacity='.8'}
        onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
        {ctaLabel}
      </a>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  },[])

  async function handleSubmit(e) {
    e.preventDefault()
    const btn = e.target.querySelector('button[type=submit]')
    btn.textContent = 'Sending...'; btn.disabled = true
    try {
      const res = await fetch('https://formspree.io/f/REPLACE_WITH_YOUR_ID', {
        method:'POST', body:new FormData(e.target), headers:{Accept:'application/json'},
      })
      if(res.ok) { btn.textContent='✓ Sent!'; btn.style.background='#10b981'; e.target.reset() }
      else throw new Error()
    } catch { btn.textContent='✗ Try Again'; btn.style.background='#ef4444' }
    finally { btn.disabled=false; setTimeout(()=>{ btn.textContent='Send Message →'; btn.style.background='' },3000) }
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
        <meta property="og:description" content="Pioneering aligned AGI systems for humanity's long-term benefit." />
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

      {/* ── NAV ── */}
      <nav style={{
        position:'fixed',top:0,left:0,right:0,zIndex:1000,
        padding:'0 4vw',height:'64px',display:'flex',alignItems:'center',justifyContent:'space-between',
        background:scrolled?'rgba(0,0,0,0.88)':'transparent',
        backdropFilter:scrolled?'blur(12px)':'none',
        borderBottom:scrolled?'1px solid rgba(255,255,255,0.06)':'none',
        transition:'all 0.4s ease',
      }}>
        <a href="/" style={{display:'flex',alignItems:'center',gap:'10px',textDecoration:'none'}}>
          <img src="/texasagilabs-logo.png" alt="Texas AGI Labs" style={{width:'28px',height:'28px'}} />
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',letterSpacing:'0.15em',textTransform:'uppercase',color:'#fff'}}>Texas AGI Labs</span>
        </a>
        <div style={{display:'flex',alignItems:'center',gap:'2rem'}}>
          {[['/#models','Models'],['/#safety','Safety'],['/#team','Team'],['/research','Research'],['/blog','Blog'],['/careers','Careers']].map(([href,label]) => (
            <a key={label} href={href} style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(255,255,255,0.55)',textDecoration:'none',transition:'color 0.2s'}}
              onMouseEnter={e=>e.currentTarget.style.color='#fff'}
              onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.55)'}>{label}</a>
          ))}
          <a href="/#contact" style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',color:'#fff',textDecoration:'none',border:'1px solid rgba(255,255,255,0.25)',padding:'7px 16px',borderRadius:'4px',transition:'all 0.2s'}}
            onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.08)';e.currentTarget.style.borderColor='rgba(255,255,255,0.5)'}}
            onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.borderColor='rgba(255,255,255,0.25)'}}>
            Request Access
          </a>
        </div>
      </nav>

      {/* ══ SECTION 1 — HERO ══ */}
      <CinemaSection id="hero">
        {vis => (<>
          <NeuralCanvas color1="#3b82f6" color2="#8b5cf6" density={80} />
          <div style={{position:'absolute',inset:0,zIndex:2,background:'linear-gradient(to top,rgba(0,0,0,0.75) 0%,rgba(0,0,0,0.1) 50%,rgba(0,0,0,0.35) 100%)'}} />
          <SectionText
            vis={vis}
            eyebrow="★ Frontier AI Research"
            line1="Researching Aligned"
            line2="Intelligence."
            ctaLabel="Explore Models →"
            ctaHref="/#models"
          />
          {/* Scroll cue */}
          <div style={{position:'absolute',bottom:'2rem',left:'50%',transform:'translateX(-50%)',zIndex:4,display:'flex',flexDirection:'column',alignItems:'center',gap:'6px',opacity:.3}}>
            <div style={{width:'1px',height:'40px',background:'linear-gradient(to bottom,rgba(255,255,255,0.8),transparent)',animation:'scrollPulse 2s ease infinite'}} />
          </div>
        </>)}
      </CinemaSection>

      {/* ── TICKER ── */}
      <div style={{background:'#000',borderTop:'1px solid rgba(255,255,255,0.06)',borderBottom:'1px solid rgba(255,255,255,0.06)',overflow:'hidden',whiteSpace:'nowrap',position:'relative',zIndex:5}}>
        <div style={{display:'inline-flex',animation:'ticker 28s linear infinite'}}>
          {[...Array(3)].map((_,idx) => (
            <div key={idx} style={{display:'inline-flex',alignItems:'center'}}>
              {[
                {n:'3',l:'Frontier Models'},{n:'12+',l:'Research Papers'},
                {n:'S-2',l:'ALPHA Certified'},{n:'R-1',l:'OMEGA Certified'},
                {n:'1,240',l:'Benchmark Tasks'},{n:'100%',l:'Open Research'},
                {n:'I-3',l:'NOVA Certified'},{n:'5',l:'Safety Researchers'},
              ].map((item,i) => (
                <div key={i} style={{display:'inline-flex',alignItems:'center',gap:'0.75rem',padding:'0.85rem 2.5rem'}}>
                  <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'1.3rem',background:'linear-gradient(135deg,#3b82f6,#06b6d4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{item.n}</span>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(255,255,255,0.22)'}}>{item.l}</span>
                  <span style={{color:'rgba(255,255,255,0.07)',fontSize:'8px'}}>◆</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ══ SECTION 2 — MODELS ══ */}
      <CinemaSection id="models">
        {vis => (<>
          <ParticleRing color="#3b82f6" />
          <div style={{position:'absolute',inset:0,zIndex:2,background:'linear-gradient(to top,rgba(0,0,0,0.82) 0%,rgba(0,0,0,0.05) 55%,rgba(0,0,0,0.5) 100%)'}} />
          {/* Model names — large, top-right */}
          <div style={{
            position:'absolute',top:'50%',right:'6vw',transform:'translateY(-50%)',
            zIndex:3,display:'flex',flexDirection:'column',gap:'0',
            opacity:vis?1:0,transition:'opacity 1s ease 0.4s',
          }}>
            {[['ALPHA','#3b82f6','/models/alpha'],['OMEGA','#8b5cf6','/models/omega'],['NOVA','#06b6d4','/models/nova']].map(([name,color,href]) => (
              <a key={name} href={href} style={{
                fontFamily:"'Bebas Neue',sans-serif",
                fontSize:'clamp(3rem,7vw,7rem)',
                lineHeight:.9, letterSpacing:'.04em',
                color:'rgba(255,255,255,0.06)',
                textDecoration:'none',
                transition:'color .3s',
                display:'block',
              }}
                onMouseEnter={e=>e.currentTarget.style.color=color}
                onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.06)'}>
                {name}
              </a>
            ))}
          </div>
          <SectionText
            vis={vis}
            eyebrow="Model Suite"
            line1="Three Frontier"
            line2="Models."
            ctaLabel="View the Suite →"
            ctaHref="/models/alpha"
          />
        </>)}
      </CinemaSection>

      {/* ══ SECTION 3 — SAFETY ══ */}
      <CinemaSection id="safety">
        {vis => (<>
          <NeuralCanvas color1="#10b981" color2="#3b82f6" density={55} />
          <div style={{position:'absolute',inset:0,zIndex:2,background:'linear-gradient(to top,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.05) 50%,rgba(0,0,0,0.5) 100%)'}} />
          {/* Safety numbers — right side */}
          <div style={{
            position:'absolute',top:'50%',right:'6vw',transform:'translateY(-50%)',
            zIndex:3,display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1px',
            background:'rgba(255,255,255,0.05)',
            opacity:vis?1:0,transition:'opacity 1s ease 0.5s',
          }}>
            {[['98.7%','Constitutional\nCompliance'],['97.3%','Corrigibility\nRetention'],['99.1%','Deceptive Align\nProbe'],['94.2%','OOD Safety\nGeneralization']].map(([n,l]) => (
              <div key={n} style={{padding:'2rem 2.5rem',background:'rgba(0,0,0,0.6)',backdropFilter:'blur(10px)',minWidth:'180px'}}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'2.5rem',color:'#10b981',lineHeight:1,marginBottom:'0.5rem'}}>{n}</div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:'9px',letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',whiteSpace:'pre-line',lineHeight:1.5}}>{l}</div>
              </div>
            ))}
          </div>
          <SectionText
            vis={vis}
            eyebrow="Safety First"
            line1="Not an"
            line2="Afterthought."
            ctaLabel="Our Approach →"
            ctaHref="/research"
          />
        </>)}
      </CinemaSection>

      {/* ══ SECTION 4 — TEAM / MISSION ══ */}
      <CinemaSection id="team">
        {vis => (<>
          <ParticleRing color="#8b5cf6" />
          <div style={{position:'absolute',inset:0,zIndex:2,background:'linear-gradient(to top,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.05) 55%,rgba(0,0,0,0.5) 100%)'}} />
          {/* Team initials — right */}
          <div style={{
            position:'absolute',top:'50%',right:'6vw',transform:'translateY(-50%)',
            zIndex:3,display:'flex',gap:'1px',
            opacity:vis?1:0,transition:'opacity 1s ease 0.45s',
          }}>
            {[
              {i:'JM',c:'#3b82f6',bg:'rgba(30,58,95,0.7)'},{i:'AK',c:'#8b5cf6',bg:'rgba(45,27,78,0.7)'},
              {i:'DO',c:'#06b6d4',bg:'rgba(10,42,53,0.7)'},{i:'SP',c:'#10b981',bg:'rgba(26,46,26,0.7)'},
              {i:'RV',c:'#f59e0b',bg:'rgba(42,31,10,0.7)'},
            ].map(m => (
              <div key={m.i} style={{width:'80px',height:'80px',background:m.bg,backdropFilter:'blur(10px)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Bebas Neue',sans-serif",fontSize:'1.4rem',color:m.c}}>
                {m.i}
              </div>
            ))}
          </div>
          <SectionText
            vis={vis}
            eyebrow="Team"
            line1="Join the"
            line2="Mission."
            ctaLabel="View Careers →"
            ctaHref="/careers"
          />
        </>)}
      </CinemaSection>

      {/* ══ CONTACT ══ */}
      <section id="contact" style={{position:'relative',background:'#000',padding:'10vh 6vw',borderTop:'1px solid rgba(255,255,255,0.06)',overflow:'hidden'}}>
        <Noise />
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 50% 80% at 50% 50%,rgba(59,130,246,0.04) 0%,transparent 70%)'}} />
        <div style={{position:'relative',zIndex:2,maxWidth:'720px',margin:'0 auto'}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(59,130,246,0.7)',marginBottom:'0.75rem'}}>Contact</div>
          <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(3rem,7vw,7rem)',lineHeight:.9,color:'#fff',marginBottom:'3rem'}}>Get In<br/>Touch.</h2>
          <form style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.25rem'}} onSubmit={handleSubmit}>
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
              <textarea name="message" rows={4} required style={{width:'100%',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'4px',padding:'11px 14px',color:'#fff',fontFamily:"'DM Mono',monospace",fontSize:'12px',outline:'none',resize:'vertical',boxSizing:'border-box',transition:'border-color 0.2s'}}
                onFocus={e=>e.currentTarget.style.borderColor='rgba(59,130,246,0.5)'}
                onBlur={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'} />
            </div>
            <div style={{gridColumn:'1/-1'}}>
              <button type="submit" style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',letterSpacing:'0.12em',textTransform:'uppercase',background:'#3b82f6',color:'#fff',border:'none',padding:'13px 32px',borderRadius:'4px',cursor:'pointer',transition:'background 0.2s',boxShadow:'0 0 30px rgba(59,130,246,0.2)'}}
                onMouseEnter={e=>e.currentTarget.style.background='#2563eb'}
                onMouseLeave={e=>e.currentTarget.style.background='#3b82f6'}>Send Message →</button>
            </div>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{background:'#000',borderTop:'1px solid rgba(255,255,255,0.06)',padding:'3rem 6vw'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto',display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:'3rem',marginBottom:'2.5rem'}}>
          <div>
            <a href="/" style={{display:'flex',alignItems:'center',gap:'10px',textDecoration:'none',marginBottom:'1rem'}}>
              <img src="/texasagilabs-logo.png" alt="" style={{width:'26px',height:'26px'}} />
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',letterSpacing:'0.15em',textTransform:'uppercase',color:'#fff'}}>Texas AGI Labs</span>
            </a>
            <p style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'rgba(255,255,255,0.2)',lineHeight:1.8}}>An independent frontier AI research lab.<br/>Texas.</p>
          </div>
          {[
            ['Research',[['Publications','/research'],['Blog','/blog'],['Safety','/#safety']]],
            ['Models',[['ALPHA A1','/models/alpha'],['OMEGA B1','/models/omega'],['NOVA C1','/models/nova']]],
            ['Company',[['Team','/#team'],['Careers','/careers'],['Contact','/#contact']]],
          ].map(([title,links]) => (
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
          <p style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'rgba(255,255,255,0.18)',letterSpacing:'0.05em'}}>© 2025–2026 Texas AGI Labs. All rights reserved.</p>
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
        ::selection { background: rgba(59,130,246,0.3); }
        @keyframes scrollPulse { 0%,100%{opacity:0.3} 50%{opacity:0.8} }
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-33.333%)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @media(max-width:768px) {
          nav > div { gap: 1rem !important; }
          nav > div > a:not(:last-child) { display: none; }
          [style*="right: 6vw"][style*="position: absolute"] { display: none !important; }
        }
        @media(max-width:900px) {
          [data-footer-grid] { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </>
  )
}
