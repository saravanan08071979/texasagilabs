import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

function NeuralCanvas({ color1 = '#3b82f6', color2 = '#8b5cf6', density = 70 }) {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId, w, h, nodes
    const rgb = h => `${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)}`
    function resize() {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
      nodes = Array.from({length:density}, () => ({
        x:Math.random()*w, y:Math.random()*h,
        vx:(Math.random()-.5)*.25, vy:(Math.random()-.5)*.25,
        r:Math.random()*2+.5,
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
        const d=Math.sqrt(dx*dx+dy*dy)
        if(d<160) {
          ctx.beginPath()
          ctx.strokeStyle=`rgba(${(i/nodes.length)<.5?rgb(color1):rgb(color2)},${(1-d/160)*.18})`
          ctx.lineWidth=.4
          ctx.moveTo(nodes[i].x,nodes[i].y)
          ctx.lineTo(nodes[j].x,nodes[j].y)
          ctx.stroke()
        }
      }
      nodes.forEach((n,i) => {
        ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2)
        ctx.fillStyle=`rgba(${(i/nodes.length)<.5?rgb(color1):rgb(color2)},0.4)`
        ctx.fill()
      })
      animId=requestAnimationFrame(draw)
    }
    resize(); draw()
    window.addEventListener('resize',resize)
    return ()=>{ cancelAnimationFrame(animId); window.removeEventListener('resize',resize) }
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
    const [rv,gv,bv] = [parseInt(color.slice(1,3),16),parseInt(color.slice(3,5),16),parseInt(color.slice(5,7),16)]
    function resize() { w=canvas.width=canvas.offsetWidth; h=canvas.height=canvas.offsetHeight }
    function draw() {
      ctx.clearRect(0,0,w,h); t+=.003
      const cx=w/2, cy=h/2, maxR=Math.min(w,h)*.45
      for(let ring=0;ring<6;ring++) {
        const r=maxR*(.3+ring*.14), num=45+ring*15
        for(let i=0;i<num;i++) {
          const angle=(i/num)*Math.PI*2+t*(ring%2===0?1:-1)*(.2+ring*.06)
          const x=cx+Math.cos(angle)*r, y=cy+Math.sin(angle)*r*.3
          const alpha=.08+.15*Math.sin(angle*3+t*2)
          ctx.beginPath(); ctx.arc(x,y,.8+Math.sin(angle*5+t)*.4,0,Math.PI*2)
          ctx.fillStyle=`rgba(${rv},${gv},${bv},${alpha})`; ctx.fill()
        }
      }
      const g=ctx.createRadialGradient(cx,cy,0,cx,cy,maxR*.25)
      g.addColorStop(0,`rgba(${rv},${gv},${bv},0.06)`)
      g.addColorStop(1,`rgba(${rv},${gv},${bv},0)`)
      ctx.beginPath(); ctx.arc(cx,cy,maxR*.25,0,Math.PI*2)
      ctx.fillStyle=g; ctx.fill()
      animId=requestAnimationFrame(draw)
    }
    resize(); draw()
    window.addEventListener('resize',resize)
    return ()=>{ cancelAnimationFrame(animId); window.removeEventListener('resize',resize) }
  },[color])
  return <canvas ref={ref} style={{position:'absolute',inset:0,width:'100%',height:'100%',display:'block'}} />
}

const Noise = () => (
  <div style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:3,opacity:.028,
    backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
    backgroundSize:'180px 180px'}} />
)

function CinemaSection({ id, children, style={} }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setVis(true) },{threshold:.15})
    if(ref.current) obs.observe(ref.current)
    return ()=>obs.disconnect()
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

function SectionText({ vis, line1, line2, ctaLabel, ctaHref, ghost=false }) {
  return (
    <div style={{
      position:'relative', zIndex:4,
      padding:'0 7vw 7vh',
    }}>
      <h2 style={{
        fontFamily:"'Bebas Neue',sans-serif",
        fontSize:'clamp(4rem,10.5vw,11rem)',
        lineHeight:.86, letterSpacing:'.015em',
        color:'#fff', margin:'0 0 3rem',
        opacity:vis?1:0, transform:vis?'none':'translateY(24px)',
        transition:'opacity 1.1s ease .1s, transform 1.1s ease .1s',
      }}>
        {line1}<br/>
        <span style={{
          color:'rgba(255,255,255,0.38)',
          display:'block',
          marginTop:'.05em',
        }}>{line2}</span>
      </h2>
      <a href={ctaHref} style={{
        display:'inline-block',
        fontFamily:"'DM Mono',monospace", fontSize:'10px',
        letterSpacing:'0.14em', textTransform:'uppercase',
        color: ghost ? 'rgba(255,255,255,0.7)' : '#000',
        background: ghost ? 'transparent' : '#fff',
        border: ghost ? '1px solid rgba(255,255,255,0.25)' : 'none',
        padding:'11px 26px', borderRadius:'3px',
        textDecoration:'none',
        opacity:vis?1:0,
        transition:'opacity .9s ease .35s, background .2s, color .2s, border-color .2s',
      }}
        onMouseEnter={e=>{
          if(ghost){ e.currentTarget.style.borderColor='rgba(255,255,255,0.7)'; e.currentTarget.style.color='#fff' }
          else e.currentTarget.style.opacity='.75'
        }}
        onMouseLeave={e=>{
          if(ghost){ e.currentTarget.style.borderColor='rgba(255,255,255,0.25)'; e.currentTarget.style.color='rgba(255,255,255,0.7)' }
          else e.currentTarget.style.opacity='1'
        }}>
        {ctaLabel}
      </a>
    </div>
  )
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = ()=>setScrolled(window.scrollY>60)
    window.addEventListener('scroll',fn)
    return ()=>window.removeEventListener('scroll',fn)
  },[])

  async function handleSubmit(e) {
    e.preventDefault()
    const btn = e.target.querySelector('button[type=submit]')
    btn.textContent='Sending...'; btn.disabled=true
    try {
      const res = await fetch('https://formspree.io/f/REPLACE_WITH_YOUR_ID',{
        method:'POST',body:new FormData(e.target),headers:{Accept:'application/json'},
      })
      if(res.ok){btn.textContent='✓ Sent!';btn.style.background='#10b981';e.target.reset()}
      else throw new Error()
    } catch { btn.textContent='✗ Try Again'; btn.style.background='#ef4444' }
    finally { btn.disabled=false; setTimeout(()=>{btn.textContent='Send Message →';btn.style.background=''},3000) }
  }

  return (
    <>
      <Head>
        <title>Texas AGI Labs — Frontier Intelligence Research</title>
        <meta name="description" content="Texas AGI Labs — independent frontier AI research. Safe, interpretable, beneficial AGI." />
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
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      {/* NAV */}
      {(() => {
        const NAV_ITEMS = [
          { label:'About', items:[
            { label:'Mission', href:'/#hero', desc:'Who we are' },
            { label:'Team', href:'/#team', desc:'The researchers' },
            { label:'Careers', href:'/careers', desc:'Open roles' },
            { label:'Contact', href:'/#contact', desc:'Get in touch' },
          ]},
          { label:'Models', items:[
            { label:'ALPHA A1', href:'/models/alpha', desc:'Safe deployment · S-2 certified' },
            { label:'OMEGA B1', href:'/models/omega', desc:'Robust cognition · R-1 certified' },
            { label:'NOVA C1', href:'/models/nova', desc:'Agent integration · I-3 certified' },
          ]},
          { label:'Safety', items:[
            { label:'Safety Approach', href:'/#safety', desc:'Our principles' },
            { label:'Publications', href:'/research', desc:'Peer-reviewed papers' },
            { label:'Certifications', href:'/#safety', desc:'S-2 · R-1 · I-3' },
          ]},
          { label:'Research', items:[
            { label:'All Papers', href:'/research', desc:'12+ publications' },
            { label:'Blog', href:'/blog', desc:'Deep dives & updates' },
            { label:'Research Areas', href:'/research', desc:'6 focus areas' },
          ]},
          { label:'Team', items:[
            { label:'Our Researchers', href:'/#team', desc:'Meet the team' },
            { label:'Open Roles', href:'/careers', desc:'Join the mission' },
            { label:'Internships', href:'/careers', desc:'PhD research program' },
          ]},
        ]
        return (
          <nav style={{
            position:'fixed',top:0,left:0,right:0,zIndex:1000,
            padding:'0 4vw',height:'60px',display:'flex',alignItems:'center',justifyContent:'space-between',
            background:scrolled?'rgba(0,0,0,0.88)':'transparent',
            backdropFilter:scrolled?'blur(20px)':'none',
            borderBottom:scrolled?'1px solid rgba(255,255,255,0.05)':'none',
            transition:'all .5s ease',
          }}>
            {/* Logo */}
            <a href="/" style={{display:'flex',alignItems:'center',gap:'10px',textDecoration:'none',flexShrink:0}}
              onMouseEnter={e=>e.currentTarget.querySelector('span').style.color='rgba(255,255,255,0.9)'}
              onMouseLeave={e=>e.currentTarget.querySelector('span').style.color='rgba(255,255,255,0.45)'}>
              <img src="/texasagilabs-logo.png" alt="Texas AGI Labs" style={{width:'26px',height:'26px'}} />
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.14em',textTransform:'uppercase',color:'rgba(255,255,255,0.45)'}}>Texas AGI Labs</span>
            </a>

            {/* Nav items */}
            <div style={{display:'flex',alignItems:'center',gap:'0.25rem',marginLeft:'3rem',flex:1}}>
              {NAV_ITEMS.map(nav => (
                <div key={nav.label}
                  style={{position:'relative'}}
                  onMouseEnter={e=>{
                    const dd = e.currentTarget.querySelector('[data-dropdown]')
                    if(dd){ dd.style.opacity='1'; dd.style.pointerEvents='all'; dd.style.transform='translateY(0)' }
                    const lbl = e.currentTarget.querySelector('[data-label]')
                    if(lbl) lbl.style.color='rgba(255,255,255,0.9)'
                  }}
                  onMouseLeave={e=>{
                    const dd = e.currentTarget.querySelector('[data-dropdown]')
                    if(dd){ dd.style.opacity='0'; dd.style.pointerEvents='none'; dd.style.transform='translateY(-6px)' }
                    const lbl = e.currentTarget.querySelector('[data-label]')
                    if(lbl) lbl.style.color='rgba(255,255,255,0.45)'
                  }}>
                  {/* Label */}
                  <div data-label style={{
                    fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',
                    textTransform:'uppercase',color:'rgba(255,255,255,0.45)',
                    padding:'0 14px',height:'60px',display:'flex',alignItems:'center',gap:'5px',
                    cursor:'default',transition:'color .2s',userSelect:'none',
                  }}>
                    {nav.label}
                    <svg width="8" height="5" viewBox="0 0 8 5" fill="none" style={{opacity:.4,marginTop:'1px'}}>
                      <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </div>

                  {/* Dropdown */}
                  <div data-dropdown style={{
                    position:'absolute',top:'54px',left:'50%',transform:'translateX(-50%) translateY(-6px)',
                    background:'rgba(8,8,12,0.96)',backdropFilter:'blur(24px)',
                    border:'1px solid rgba(255,255,255,0.08)',borderRadius:'6px',
                    padding:'0.5rem',minWidth:'220px',
                    opacity:0,pointerEvents:'none',
                    transition:'opacity .18s ease, transform .18s ease',
                    boxShadow:'0 20px 60px rgba(0,0,0,0.6)',
                  }}>
                    {/* Arrow */}
                    <div style={{position:'absolute',top:'-5px',left:'50%',transform:'translateX(-50%)',
                      width:'10px',height:'5px',overflow:'hidden'}}>
                      <div style={{width:'8px',height:'8px',background:'rgba(8,8,12,0.96)',
                        border:'1px solid rgba(255,255,255,0.08)',transform:'rotate(45deg)',
                        margin:'2px auto 0'}} />
                    </div>
                    {nav.items.map((item,i) => (
                      <a key={item.label} href={item.href} style={{
                        display:'flex',flexDirection:'column',gap:'2px',
                        padding:'10px 14px',borderRadius:'4px',textDecoration:'none',
                        transition:'background .15s',
                      }}
                        onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.06)'}
                        onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                        <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.1em',
                          textTransform:'uppercase',color:'rgba(255,255,255,0.8)'}}>{item.label}</span>
                        {item.desc && <span style={{fontFamily:"'DM Mono',monospace",fontSize:'9px',
                          color:'rgba(255,255,255,0.28)',letterSpacing:'0.04em'}}>{item.desc}</span>}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a href="/#contact" style={{
              fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',
              textTransform:'uppercase',color:'rgba(255,255,255,0.6)',textDecoration:'none',
              border:'1px solid rgba(255,255,255,0.18)',padding:'7px 15px',borderRadius:'3px',
              transition:'all .2s',flexShrink:0,
            }}
              onMouseEnter={e=>{e.currentTarget.style.color='#fff';e.currentTarget.style.borderColor='rgba(255,255,255,0.45)'}}
              onMouseLeave={e=>{e.currentTarget.style.color='rgba(255,255,255,0.6)';e.currentTarget.style.borderColor='rgba(255,255,255,0.18)'}}>
              Request Access
            </a>
          </nav>
        )
      })()}

      {/* ── 1. HERO ── */}
      <CinemaSection id="hero">
        {vis => (<>
          <NeuralCanvas color1="#3b82f6" color2="#8b5cf6" density={90} />
          <div style={{position:'absolute',inset:0,zIndex:2,
            background:'linear-gradient(to top, rgba(0,0,0,.82) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,.25) 100%)'}} />
          <SectionText vis={vis}
            line1="Researching Aligned"
            line2="Intelligence."
            ctaLabel="Explore Models →"
            ctaHref="/#models"
          />
          <div style={{position:'absolute',bottom:'2rem',left:'50%',transform:'translateX(-50%)',zIndex:4,opacity:.25}}>
            <div style={{width:'1px',height:'44px',background:'linear-gradient(to bottom,#fff,transparent)',animation:'pulse 2s ease infinite',margin:'0 auto'}} />
          </div>
        </>)}
      </CinemaSection>

      {/* ── 2. MODELS ── */}
      <CinemaSection id="models">
        {vis => (<>
          <ParticleRing color="#3b82f6" />
          <div style={{position:'absolute',inset:0,zIndex:2,
            background:'linear-gradient(to top, rgba(0,0,0,.85) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,.3) 100%)'}} />
          <SectionText vis={vis} ghost
            line1="Three Frontier"
            line2="Models."
            ctaLabel="View the Suite →"
            ctaHref="/models/alpha"
          />
        </>)}
      </CinemaSection>

      {/* ── 3. SAFETY ── */}
      <CinemaSection id="safety">
        {vis => (<>
          <NeuralCanvas color1="#10b981" color2="#06b6d4" density={60} />
          <div style={{position:'absolute',inset:0,zIndex:2,
            background:'linear-gradient(to top, rgba(0,0,0,.88) 0%, rgba(0,0,0,0) 48%, rgba(0,0,0,.3) 100%)'}} />
          <SectionText vis={vis} ghost
            line1="Not an"
            line2="Afterthought."
            ctaLabel="Our Research →"
            ctaHref="/research"
          />
        </>)}
      </CinemaSection>

      {/* ── 4. MISSION ── */}
      <CinemaSection id="team">
        {vis => (<>
          <ParticleRing color="#8b5cf6" />
          <div style={{position:'absolute',inset:0,zIndex:2,
            background:'linear-gradient(to top, rgba(0,0,0,.88) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,.3) 100%)'}} />
          <SectionText vis={vis} ghost
            line1="Join the"
            line2="Mission."
            ctaLabel="View Careers →"
            ctaHref="/careers"
          />
        </>)}
      </CinemaSection>

      {/* ── CONTACT ── */}
      <section id="contact" style={{position:'relative',background:'#000',padding:'12vh 7vw',borderTop:'1px solid rgba(255,255,255,0.05)',overflow:'hidden'}}>
        <Noise />
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 50% 70% at 50% 50%,rgba(59,130,246,0.035) 0%,transparent 70%)'}} />
        <div style={{position:'relative',zIndex:2,maxWidth:'680px',margin:'0 auto'}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:'9px',letterSpacing:'0.22em',textTransform:'uppercase',color:'rgba(255,255,255,0.22)',marginBottom:'1.5rem'}}>Contact</div>
          <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(3rem,7vw,7rem)',lineHeight:.88,color:'#fff',marginBottom:'3.5rem'}}>Get In<br/>Touch.</h2>
          <form style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}} onSubmit={handleSubmit}>
            {[['First Name','text','first_name'],['Last Name','text','last_name']].map(([label,type,name]) => (
              <div key={name}>
                <label style={{fontFamily:"'DM Mono',monospace",fontSize:'9px',letterSpacing:'0.14em',textTransform:'uppercase',color:'rgba(255,255,255,0.22)',display:'block',marginBottom:'8px'}}>{label}</label>
                <input type={type} name={name} required style={{width:'100%',background:'transparent',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'3px',padding:'11px 13px',color:'#fff',fontFamily:"'DM Mono',monospace",fontSize:'11px',outline:'none',boxSizing:'border-box',transition:'border-color .2s'}}
                  onFocus={e=>e.currentTarget.style.borderColor='rgba(59,130,246,0.5)'}
                  onBlur={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'} />
              </div>
            ))}
            <div style={{gridColumn:'1/-1'}}>
              <label style={{fontFamily:"'DM Mono',monospace",fontSize:'9px',letterSpacing:'0.14em',textTransform:'uppercase',color:'rgba(255,255,255,0.22)',display:'block',marginBottom:'8px'}}>Email</label>
              <input type="email" name="email" required style={{width:'100%',background:'transparent',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'3px',padding:'11px 13px',color:'#fff',fontFamily:"'DM Mono',monospace",fontSize:'11px',outline:'none',boxSizing:'border-box',transition:'border-color .2s'}}
                onFocus={e=>e.currentTarget.style.borderColor='rgba(59,130,246,0.5)'}
                onBlur={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'} />
            </div>
            <div style={{gridColumn:'1/-1'}}>
              <label style={{fontFamily:"'DM Mono',monospace",fontSize:'9px',letterSpacing:'0.14em',textTransform:'uppercase',color:'rgba(255,255,255,0.22)',display:'block',marginBottom:'8px'}}>Message</label>
              <textarea name="message" rows={4} required style={{width:'100%',background:'transparent',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'3px',padding:'11px 13px',color:'#fff',fontFamily:"'DM Mono',monospace",fontSize:'11px',outline:'none',resize:'vertical',boxSizing:'border-box',transition:'border-color .2s'}}
                onFocus={e=>e.currentTarget.style.borderColor='rgba(59,130,246,0.5)'}
                onBlur={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'} />
            </div>
            <div style={{gridColumn:'1/-1',marginTop:'0.5rem'}}>
              <button type="submit" style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.14em',textTransform:'uppercase',background:'#fff',color:'#000',border:'none',padding:'12px 28px',borderRadius:'3px',cursor:'pointer',transition:'opacity .2s'}}
                onMouseEnter={e=>e.currentTarget.style.opacity='.75'}
                onMouseLeave={e=>e.currentTarget.style.opacity='1'}>Send Message →</button>
            </div>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{background:'#000',borderTop:'1px solid rgba(255,255,255,0.05)',padding:'3rem 7vw'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto',display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:'3rem',marginBottom:'2.5rem'}}>
          <div>
            <a href="/" style={{display:'flex',alignItems:'center',gap:'10px',textDecoration:'none',marginBottom:'1rem'}}>
              <img src="/texasagilabs-logo.png" alt="" style={{width:'24px',height:'24px'}} />
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.16em',textTransform:'uppercase',color:'rgba(255,255,255,0.6)'}}>Texas AGI Labs</span>
            </a>
            <p style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'rgba(255,255,255,0.18)',lineHeight:1.9}}>Independent frontier AI research.<br/>Texas.</p>
          </div>
          {[
            ['Research',[['Publications','/research'],['Blog','/blog'],['Safety','/#safety']]],
            ['Models',[['ALPHA A1','/models/alpha'],['OMEGA B1','/models/omega'],['NOVA C1','/models/nova']]],
            ['Company',[['Team','/#team'],['Careers','/careers'],['Contact','/#contact']]],
          ].map(([title,links]) => (
            <div key={title}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:'9px',letterSpacing:'0.16em',textTransform:'uppercase',color:'rgba(255,255,255,0.2)',marginBottom:'1.25rem'}}>{title}</div>
              <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:'0.75rem'}}>
                {links.map(([label,href]) => (
                  <li key={label}><a href={href} style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'rgba(255,255,255,0.32)',textDecoration:'none',transition:'color .2s'}}
                    onMouseEnter={e=>e.currentTarget.style.color='rgba(255,255,255,0.75)'}
                    onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.32)'}>{label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{borderTop:'1px solid rgba(255,255,255,0.05)',paddingTop:'2rem',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'1rem'}}>
          <p style={{fontFamily:"'DM Mono',monospace",fontSize:'9px',color:'rgba(255,255,255,0.15)',letterSpacing:'0.06em'}}>© 2025–2026 Texas AGI Labs. All rights reserved.</p>
          <div style={{display:'flex',gap:'0.6rem'}}>
            {['Safety-First','Open Research','Texas-Built'].map(b=>(
              <span key={b} style={{fontFamily:"'DM Mono',monospace",fontSize:'8px',letterSpacing:'0.1em',textTransform:'uppercase',padding:'3px 7px',border:'1px solid rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.15)',borderRadius:'2px'}}>{b}</span>
            ))}
          </div>
        </div>
      </footer>

      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #000; color: #fff; -webkit-font-smoothing: antialiased; }
        ::selection { background: rgba(59,130,246,0.25); }
        @keyframes pulse { 0%,100%{opacity:.25} 50%{opacity:.7} }
        @media(max-width:768px) {
          nav > div { gap:.75rem !important; }
          nav > div > a:not(:last-child) { display:none; }
        }
        @media(max-width:960px) {
          footer > div > div { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </>
  )
}
