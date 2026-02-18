import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import { SiteNav, SiteFooter, GLOBAL_STYLES } from '../../components/Layout'

const BENCHMARKS = [
  { name:'Constitutional Compliance', score:98.7, color:'#3b82f6' },
  { name:'Corrigibility Retention', score:97.3, color:'#3b82f6' },
  { name:'Deceptive Alignment Probe', score:99.1, color:'#10b981' },
  { name:'OOD Safety Generalization', score:94.2, color:'#3b82f6' },
  { name:'Red-Team Adversarial Suite', score:96.8, color:'#10b981' },
  { name:'Sycophancy Resistance', score:88.0, color:'#f59e0b' },
  { name:'MMLU (Knowledge)', score:87.4, color:'rgba(255,255,255,0.3)' },
  { name:'HumanEval (Coding)', score:82.1, color:'rgba(255,255,255,0.3)' },
]

const SPECS = [
  { label:'Parameters', value:'~70B' },
  { label:'Context Window', value:'128K tokens' },
  { label:'Architecture', value:'Dense Transformer' },
  { label:'Training Method', value:'Constitutional AI v3 + Scalable Oversight' },
  { label:'Safety Cert', value:'S-2 Verified' },
  { label:'Status', value:'Operational' },
]

const EVALS = [
  { check:'Constitutional constraint verification', status:'PASS', color:'#10b981' },
  { check:'RLHF reward model alignment', status:'PASS', color:'#10b981' },
  { check:'Corrigibility benchmark (97.3%)', status:'PASS', color:'#10b981' },
  { check:'Deceptive alignment probe', status:'PASS', color:'#10b981' },
  { check:'Sycophancy score: 0.12', status:'MONITOR', color:'#f59e0b' },
  { check:'OOD generalization suite', status:'PASS', color:'#10b981' },
  { check:'Red-team adversarial suite', status:'PASS', color:'#10b981' },
  { check:'Autonomy envelope test', status:'PASS', color:'#10b981' },
]

const C = '#3b82f6'

function BenchmarkBar({ b, vis }) {
  return (
    <div style={{marginBottom:'1.25rem'}}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'rgba(255,255,255,0.5)',letterSpacing:'0.06em'}}>{b.name}</span>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:b.color,fontWeight:500}}>{b.score}%</span>
      </div>
      <div style={{height:'3px',background:'rgba(255,255,255,0.06)',borderRadius:'2px',overflow:'hidden'}}>
        <div style={{height:'100%',width: vis ? `${b.score}%` : '0%',background:b.color,borderRadius:'2px',transition:'width 1.2s ease',boxShadow:`0 0 8px ${b.color}60`}} />
      </div>
    </div>
  )
}

export default function Alpha() {
  const [vis, setVis] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const t = setTimeout(() => setVis(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <Head>
        <title>ALPHA A1 — Texas AGI Labs</title>
        <meta name="description" content="ALPHA A1 — safe deployment AGI. S-2 certified with constitutional constraints and corrigibility guarantees." />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&family=Lora:ital,wght@0,400;1,400&display=swap" rel="stylesheet" />
      </Head>
      <SiteNav />
      <div style={{background:'#000',minHeight:'100vh',paddingTop:'64px'}}>

        {/* HERO */}
        <div style={{position:'relative',minHeight:'100vh',display:'flex',alignItems:'center',overflow:'hidden',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
          <div style={{position:'absolute',inset:0,background:`radial-gradient(ellipse 70% 70% at 80% 50%,${C}12 0%,rgba(0,0,0,1) 65%)`}} />
          <div style={{position:'absolute',inset:0,pointerEvents:'none',opacity:0.035,backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",backgroundSize:'180px 180px'}} />

          <div style={{position:'relative',zIndex:2,padding:'0 6vw',width:'100%',maxWidth:'1200px',margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6rem',alignItems:'center'}}>
            <div>
              <div style={{display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'2rem',opacity:vis?1:0,transition:'all 0.7s ease 0.1s'}}>
                <a href="/#models" style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'rgba(255,255,255,0.25)',textDecoration:'none',letterSpacing:'0.1em',textTransform:'uppercase'}}>Models</a>
                <span style={{color:'rgba(255,255,255,0.15)'}}>›</span>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:C,letterSpacing:'0.1em',textTransform:'uppercase'}}>ALPHA A1</span>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'1.5rem',opacity:vis?1:0,transition:'all 0.7s ease 0.2s'}}>
                <span style={{width:'8px',height:'8px',borderRadius:'50%',background:'#10b981',display:'inline-block',boxShadow:'0 0 8px #10b981'}}></span>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.15em',textTransform:'uppercase',color:'#10b981'}}>Operational</span>
              </div>
              <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(5rem,14vw,13rem)',lineHeight:0.85,color:C,marginBottom:'0.5rem',opacity:vis?1:0,transform:vis?'translateY(0)':'translateY(40px)',transition:'all 1s ease 0.25s',textShadow:`0 0 80px ${C}40`}}>ALPHA</h1>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',color:'rgba(255,255,255,0.3)',letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:'2rem',opacity:vis?1:0,transition:'all 0.7s ease 0.4s'}}>Model A1 — Safe Deployment AGI</div>
              <p style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'1.05rem',color:'rgba(255,255,255,0.5)',lineHeight:1.8,maxWidth:'480px',marginBottom:'2.5rem',opacity:vis?1:0,transition:'all 0.7s ease 0.5s'}}>
                Designed for safe, constrained deployment in high-stakes environments. Enforces constitutional constraints and human-oversight requirements at inference time.
              </p>
              <div style={{display:'flex',gap:'1rem',flexWrap:'wrap',opacity:vis?1:0,transition:'all 0.7s ease 0.6s'}}>
                <a href="/#contact" style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',color:'#fff',background:C,padding:'12px 24px',borderRadius:'4px',textDecoration:'none',transition:'opacity 0.2s',boxShadow:`0 0 30px ${C}40`}}
                  onMouseEnter={e=>e.currentTarget.style.opacity='0.8'}
                  onMouseLeave={e=>e.currentTarget.style.opacity='1'}>Request Access →</a>
                <a href="/research" style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(255,255,255,0.5)',padding:'12px 24px',borderRadius:'4px',textDecoration:'none',border:'1px solid rgba(255,255,255,0.12)',transition:'border-color 0.2s'}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.35)'}
                  onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.12)'}>Read Papers →</a>
              </div>
            </div>

            {/* Cert card */}
            <div style={{opacity:vis?1:0,transform:vis?'translateY(0)':'translateY(30px)',transition:'all 0.9s ease 0.4s'}}>
              <div style={{border:`1px solid ${C}30`,borderRadius:'8px',overflow:'hidden',backdropFilter:'blur(10px)'}}>
                <div style={{borderBottom:`1px solid ${C}20`,padding:'2rem',background:`${C}08`}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:'9px',letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginBottom:'0.75rem'}}>Safety Certification</div>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'5rem',color:C,lineHeight:1}}>S-2</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'#10b981',letterSpacing:'0.12em',marginTop:'0.5rem'}}>✓ SAFETY VERIFIED</div>
                </div>
                <div style={{padding:'1.5rem',display:'flex',flexDirection:'column',gap:'1rem'}}>
                  {[['Last Evaluated','Feb 2026'],['Deployment','Operational'],['Cert Level','S-2 (Tier 2 Safety)'],['Oversight','Human-in-loop required']].map(([k,v]) => (
                    <div key={k} style={{display:'flex',justifyContent:'space-between',borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:'0.75rem'}}>
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
          {/* Specs */}
          <div style={{background:'#000',padding:'4rem 6vw'}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:C,marginBottom:'2rem'}}>Specifications</div>
            <div style={{display:'flex',flexDirection:'column',gap:'0px'}}>
              {SPECS.map(s => (
                <div key={s.label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'1.1rem 0',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'rgba(255,255,255,0.3)',letterSpacing:'0.08em',textTransform:'uppercase'}}>{s.label}</span>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',color:'rgba(255,255,255,0.8)'}}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benchmarks */}
          <div style={{background:'#000',padding:'4rem 6vw'}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:C,marginBottom:'2rem'}}>Benchmark Results</div>
            {BENCHMARKS.map(b => <BenchmarkBar key={b.name} b={b} vis={vis} />)}
          </div>
        </div>

        {/* SAFETY TERMINAL */}
        <div style={{padding:'5rem 6vw',maxWidth:'1200px',margin:'0 auto'}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginBottom:'1.5rem'}}>Safety Evaluation Output</div>
          <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(2.5rem,5vw,5rem)',lineHeight:0.9,color:'#fff',marginBottom:'3rem'}}>Every Model<br/>Ships With Receipts.</h2>
          <div style={{background:'#06080f',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'8px',overflow:'hidden',fontFamily:"'DM Mono',monospace"}}>
            <div style={{background:'rgba(255,255,255,0.04)',padding:'0.75rem 1.25rem',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',alignItems:'center',gap:'0.5rem'}}>
              {['#ef4444','#f59e0b','#10b981'].map(c=><div key={c} style={{width:'10px',height:'10px',borderRadius:'50%',background:c}}/>)}
              <span style={{fontSize:'11px',color:'rgba(255,255,255,0.3)',marginLeft:'0.5rem',letterSpacing:'0.08em'}}>safety_eval_alpha_a1_feb2026.sh</span>
            </div>
            <div style={{padding:'2rem',fontSize:'12px',lineHeight:2}}>
              <div style={{color:'rgba(255,255,255,0.3)',marginBottom:'0.5rem'}}># Running ALPHA A1 safety evaluation suite — Feb 2026</div>
              {EVALS.map((e,i) => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:'1rem'}}>
                  <span style={{color:e.color,minWidth:'70px'}}>{e.status === 'PASS' ? '✓ PASS' : '⚠ ' + e.status}</span>
                  <span style={{color:'rgba(255,255,255,0.5)'}}>{e.check}</span>
                </div>
              ))}
              <div style={{marginTop:'1rem',color:'rgba(255,255,255,0.2)'}}>──────────────────────────────────────</div>
              <div style={{color:'#10b981'}}>✓ 7/8 checks passed · 1 monitor flag · S-2 certification maintained</div>
            </div>
          </div>
        </div>

        {/* OTHER MODELS */}
        <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',padding:'4rem 6vw'}}>
          <div style={{maxWidth:'1200px',margin:'0 auto'}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(255,255,255,0.2)',marginBottom:'2rem'}}>Also in the Suite</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1px',background:'rgba(255,255,255,0.06)'}}>
              {[{name:'OMEGA',sub:'B1 — Robust Cognition',c:'#8b5cf6',status:'In Evaluation',href:'/models/omega'},{name:'NOVA',sub:'C1 — Agent Integration',c:'#06b6d4',status:'Research Phase',href:'/models/nova'}].map(m=>(
                <a key={m.name} href={m.href} style={{background:'#000',padding:'2.5rem',textDecoration:'none',display:'block',borderTop:`2px solid ${m.c}`,transition:'background 0.2s'}}
                  onMouseEnter={e=>e.currentTarget.style.background='#080c14'}
                  onMouseLeave={e=>e.currentTarget.style.background='#000'}>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'3rem',color:m.c,lineHeight:1,marginBottom:'0.25rem'}}>{m.name}</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'rgba(255,255,255,0.25)',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'0.75rem'}}>{m.sub}</div>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:m.c,letterSpacing:'0.08em',textTransform:'uppercase'}}>View Model Card →</span>
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
