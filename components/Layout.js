import { useEffect, useState } from 'react'
import Head from 'next/head'

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav style={{
      position:'fixed',top:0,left:0,right:0,zIndex:1000,
      padding:'0 4vw',height:'64px',display:'flex',alignItems:'center',justifyContent:'space-between',
      background: scrolled ? 'rgba(0,0,0,0.88)' : 'rgba(0,0,0,0.6)',
      backdropFilter:'blur(12px)',
      borderBottom:'1px solid rgba(255,255,255,0.06)',
      transition:'background 0.4s ease',
    }}>
      <a href="/" style={{display:'flex',alignItems:'center',gap:'10px',textDecoration:'none'}}>
        <img src="/texasagilabs-logo.png" alt="Texas AGI Labs" style={{width:'28px',height:'28px'}} />
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',letterSpacing:'0.15em',textTransform:'uppercase',color:'#fff',fontWeight:500}}>Texas AGI Labs</span>
      </a>
      <div style={{display:'flex',alignItems:'center',gap:'2rem'}}>
        {[['/#research','Research'],['/#models','Models'],['/#safety','Safety'],['/#team','Team'],['/blog','Blog'],['/careers','Careers']].map(([href,label]) => (
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
  )
}

export function SiteFooter() {
  return (
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
  )
}

export const GLOBAL_STYLES = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #000; color: #fff; -webkit-font-smoothing: antialiased; }
  ::selection { background: rgba(59,130,246,0.3); }
  @media(max-width:768px) {
    nav > div { gap: 1rem !important; }
    nav > div > a:not(:last-child) { display: none; }
  }
  @media(max-width:900px) {
    [data-footer-grid] { grid-template-columns: 1fr 1fr !important; }
  }
`
