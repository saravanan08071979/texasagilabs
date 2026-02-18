import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import { SiteNav, SiteFooter, GLOBAL_STYLES } from '../../components/Layout'

const BENCHMARKS = [
  { name:'ARC-AGI', score:91.3, color:'#8b5cf6' },
  { name:'GPQA (Graduate-Level)', score:88.7, color:'#8b5cf6' },
  { name:'MATH (Competition)', score:86.4, color:'#8b5cf6' },
  { name:'OOD Generalization', score:93.1, color:'#10b981' },
  { name:'Causal Reasoning Suite', score:89.2, color:'#8b5cf6' },
  { name:'Multi-Step Planning', score:87.8, color:'#8b5cf6' },
  { name:'Robustness Under Stress', score:94.5, color:'#10b981' },
  { name:'Distribution Shift Resistance', score:91.7, color:'#10b981' },
]

const SPECS = [
  { label:'Parameters', value:'~120B (MoE active: ~40B)' },
  { label:'Context Window', value:'256K tokens' },
  { label:'Architecture', value:'Mixture-of-Experts' },
  { label:'Training Method', value:'Hybrid Reasoning + MoE' },
  { label:'Safety Cert', value:'R-1 Robustness Certified' },
  { label:'Status', value:'In Evaluation (Q1 2026)' },
]

const C = '#8b5cf6'

function BenchmarkBar({ b, vis }) {
  return (
    <div style={{marginBottom:'1.25rem'}}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'rgba(255,255,255,0.5)',letterSpacing:'0.06em'}}>{b.name}</span>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:b.color,fontWeight:500}}>{b.score}%</span>
      </div>
      <div style={{height:'3px',background:'rgba(255,255,255,0.06)',borderRadius:'2px',overflow:'hidden'}}>
        <div style={{height:'100%',width:vis?`${b.score}%`:'0%',background:b.color,borderRadius:'2px',transition:'width 1.2s ease',boxShadow:`0 0 8px ${b.color}60`}} />
      </div>
    </div>
  )
}

export default function Omega() {
  const [vis, setVis] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVis(true), 100); return () => clearTimeout(t) }, [])

  return (
    <>
      <Head>
        <title>OMEGA B1 — Texas AGI Labs</title>
        <meta name="description" content="OMEGA B1 — robust cognition model. R-1 certified for causal reasoning, multi-step planning, and OOD generalization." />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&family=Lora:ital,wght@0,400;1,400&display=swap" rel="stylesheet" />
      </Head>
      <SiteNav />
      <div style={{background:'#0a0f1e',minHeight:'100vh',paddingTop:'64px'}}>

        {/* HERO */}
        <div style={{position:'relative',minHeight:'100vh',display:'flex',alignItems:'center',overflow:'hidden',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
          <div style={{position:'absolute',inset:0,background:`radial-gradient(ellipse 70% 70% at 80% 50%,${C}12 0%,rgba(0,0,0,1) 65%)`}} />
          <div style={{position:'absolute',inset:0,pointerEvents:'none',opacity:0.035,backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",backgroundSize:'180px 180px'}} />

          <div style={{position:'relative',zIndex:2,padding:'0 6vw',width:'100%',maxWidth:'1200px',margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6rem',alignItems:'center'}}>
            <div>
              <div style={{display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'2rem',opacity:vis?1:0,transition:'all 0.7s ease 0.1s'}}>
                <a href="/#models" style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'rgba(255,255,255,0.25)',textDecoration:'none',letterSpacing:'0.1em',textTransform:'uppercase'}}>Models</a>
                <span style={{color:'rgba(255,255,255,0.15)'}}>›</span>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:C,letterSpacing:'0.1em',textTransform:'uppercase'}}>OMEGA B1</span>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'1.5rem',opacity:vis?1:0,transition:'all 0.7s ease 0.2s'}}>
                <span style={{width:'8px',height:'8px',borderRadius:'50%',background:C,display:'inline-block',boxShadow:`0 0 8px ${C}`}}></span>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.15em',textTransform:'uppercase',color:C}}>In Evaluation</span>
              </div>
              <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(4rem,12vw,11rem)',lineHeight:0.85,color:C,marginBottom:'0.5rem',opacity:vis?1:0,transform:vis?'translateY(0)':'translateY(40px)',transition:'all 1s ease 0.25s',textShadow:`0 0 80px ${C}40`}}>OMEGA</h1>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',color:'rgba(255,255,255,0.3)',letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:'2rem',opacity:vis?1:0,transition:'all 0.7s ease 0.4s'}}>Model B1 — Robust Cognition</div>
              <p style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'1.05rem',color:'rgba(255,255,255,0.5)',lineHeight:1.8,maxWidth:'480px',marginBottom:'2.5rem',opacity:vis?1:0,transition:'all 0.7s ease 0.5s'}}>
                A general reasoning engine built to operate reliably under uncertainty, stress, and distribution shift. Optimized for causal inference, multi-step planning, and OOD generalization.
              </p>
              <div style={{display:'flex',gap:'1rem',flexWrap:'wrap',opacity:vis?1:0,transition:'all 0.7s ease 0.6s'}}>
                <a href="/#contact" style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',color:'#fff',background:C,padding:'12px 24px',borderRadius:'4px',textDecoration:'none',transition:'opacity 0.2s',boxShadow:`0 0 30px ${C}40`}}
                  onMouseEnter={e=>e.currentTarget.style.opacity='0.8'}
                  onMouseLeave={e=>e.currentTarget.style.opacity='1'}>Join Evaluation Program →</a>
                <a href="/research" style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(255,255,255,0.5)',padding:'12px 24px',borderRadius:'4px',textDecoration:'none',border:'1px solid rgba(255,255,255,0.12)',transition:'border-color 0.2s'}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.35)'}
                  onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.12)'}>Read Papers →</a>
              </div>
            </div>

            <div style={{opacity:vis?1:0,transform:vis?'translateY(0)':'translateY(30px)',transition:'all 0.9s ease 0.4s'}}>
              <div style={{border:`1px solid ${C}30`,borderRadius:'8px',overflow:'hidden'}}>
                <div style={{borderBottom:`1px solid ${C}20`,padding:'2rem',background:`${C}08`}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:'9px',letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginBottom:'0.75rem'}}>Robustness Certification</div>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'5rem',color:C,lineHeight:1}}>R-1</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:C,letterSpacing:'0.12em',marginTop:'0.5rem'}}>◎ ROBUSTNESS CERTIFIED</div>
                </div>
                <div style={{padding:'1.5rem',display:'flex',flexDirection:'column',gap:'0px'}}>
                  {[['Evaluation Phase','Q1 2026'],['Architecture','MoE (~40B active)'],['Context','256K tokens'],['Availability','Limited Research Access']].map(([k,v]) => (
                    <div key={k} style={{display:'flex',justifyContent:'space-between',borderBottom:'1px solid rgba(255,255,255,0.05)',padding:'0.75rem 0'}}>
                      <span style={{fontFamily:"'DM Mono',monospace",fontSize:'9px',letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)'}}>{k}</span>
                      <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'rgba(255,255,255,0.7)'}}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SPECS + BENCHMARKS */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1px',background:'rgba(255,255,255,0.06)',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
          <div style={{background:'#0a0f1e',padding:'4rem 6vw'}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:C,marginBottom:'2rem'}}>Specifications</div>
            {SPECS.map(s => (
              <div key={s.label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'1.1rem 0',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'rgba(255,255,255,0.3)',letterSpacing:'0.08em',textTransform:'uppercase'}}>{s.label}</span>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',color:'rgba(255,255,255,0.8)'}}>{s.value}</span>
              </div>
            ))}
          </div>
          <div style={{background:'#0a0f1e',padding:'4rem 6vw'}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:C,marginBottom:'2rem'}}>Benchmark Results</div>
            {BENCHMARKS.map(b => <BenchmarkBar key={b.name} b={b} vis={vis} />)}
            <p style={{fontFamily:"'DM Mono',monospace",fontSize:'9px',color:'rgba(255,255,255,0.2)',marginTop:'1.5rem',lineHeight:1.6}}>Preliminary internal results. Final benchmarks pending external review.</p>
          </div>
        </div>

        {/* CAPABILITIES */}
        <div style={{padding:'5rem 6vw',maxWidth:'1200px',margin:'0 auto'}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(255,255,255,0.2)',marginBottom:'1.5rem'}}>Core Capabilities</div>
          <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(2.5rem,5vw,5rem)',lineHeight:0.9,color:'#fff',marginBottom:'3rem'}}>Built to Reason<br/>Under Pressure.</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1px',background:'rgba(255,255,255,0.06)'}}>
            {[
              {t:'Causal Reasoning',b:'OMEGA builds explicit causal models, enabling robust counterfactual reasoning and planning under uncertainty.',c:C},
              {t:'Multi-Step Planning',b:'Designed for long-horizon task decomposition. Maintains coherent goal structures across hundreds of reasoning steps.',c:C},
              {t:'Distribution Shift Resistance',b:'Maintains performance when inputs differ significantly from training distribution — critical for real-world deployment.',c:'#10b981'},
              {t:'Mixture-of-Experts',b:'Dynamically routes computation to specialized expert sub-networks, achieving ~120B param capacity at ~40B inference cost.',c:C},
              {t:'Uncertainty Quantification',b:'Produces calibrated confidence estimates, enabling downstream systems to route low-confidence outputs for human review.',c:'#10b981'},
              {t:'Long Context Mastery',b:'256K token context with maintained coherence — critical for long-document reasoning and multi-session planning.',c:C},
            ].map(cap => (
              <div key={cap.t} style={{background:'#0a0f1e',padding:'2.5rem 2rem'}}>
                <div style={{width:'3px',height:'20px',background:cap.c,marginBottom:'1.25rem',borderRadius:'2px'}} />
                <h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'1.3rem',letterSpacing:'0.04em',color:'#fff',marginBottom:'0.75rem'}}>{cap.t}</h3>
                <p style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'0.88rem',color:'rgba(255,255,255,0.35)',lineHeight:1.75}}>{cap.b}</p>
              </div>
            ))}
          </div>
        </div>

        {/* OTHER MODELS */}
        <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',padding:'4rem 6vw'}}>
          <div style={{maxWidth:'1200px',margin:'0 auto'}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(255,255,255,0.2)',marginBottom:'2rem'}}>Also in the Suite</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1px',background:'rgba(255,255,255,0.06)'}}>
              {[{name:'ALPHA',sub:'A1 — Safe Deployment',c:'#3b82f6',href:'/models/alpha'},{name:'NOVA',sub:'C1 — Agent Integration',c:'#06b6d4',href:'/models/nova'}].map(m=>(
                <a key={m.name} href={m.href} style={{background:'#0a0f1e',padding:'2.5rem',textDecoration:'none',display:'block',borderTop:`2px solid ${m.c}`,transition:'background 0.2s'}}
                  onMouseEnter={e=>e.currentTarget.style.background='#080c14'}
                  onMouseLeave={e=>e.currentTarget.style.background='#000'}>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'3rem',color:m.c,lineHeight:1,marginBottom:'0.25rem'}}>{m.name}</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'rgba(255,255,255,0.25)',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'0.75rem'}}>{m.sub}</div>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:m.c}}>View Model Card →</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <SiteFooter />
      </div>
      <style jsx global>{GLOBAL_STYLES}</style>
    </>
  )
}
