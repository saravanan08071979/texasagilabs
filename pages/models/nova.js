import Head from 'next/head'
import { useEffect, useState } from 'react'
import { SiteNav, SiteFooter, GLOBAL_STYLES } from '../../components/Layout'

const BENCHMARKS = [
  { name:'Multi-Agent Coordination', score:92.4, color:'#06b6d4' },
  { name:'Task Routing Accuracy', score:94.1, color:'#06b6d4' },
  { name:'Shared Memory Coherence', score:89.7, color:'#06b6d4' },
  { name:'Goal Drift Prevention', score:96.3, color:'#10b981' },
  { name:'Emergent Misalignment Probe', score:91.8, color:'#10b981' },
  { name:'RAG Retrieval Accuracy', score:88.5, color:'#06b6d4' },
  { name:'Cross-Agent Consistency', score:87.2, color:'#06b6d4' },
  { name:'Long-Horizon Task Completion', score:83.6, color:'#f59e0b' },
]

const SPECS = [
  { label:'Agent Network Size', value:'Up to 64 agents' },
  { label:'Context per Agent', value:'128K tokens' },
  { label:'Coordination Protocol', value:'COORD-SAFE v1.2' },
  { label:'Shared Memory', value:'Distributed vector store' },
  { label:'Safety Cert', value:'I-3 Integration Certified' },
  { label:'Status', value:'Research Phase (Est. Q3 2026)' },
]

const PIPELINE = [
  { n:'01', t:'Task Ingestion', d:'Structured intake with goal specification signing' },
  { n:'02', t:'Router', d:'Competency-based task routing to specialized agents' },
  { n:'03', t:'Agent Network', d:'Up to 64 heterogeneous specialized agents' },
  { n:'04', t:'Shared Memory', d:'Distributed vector store with belief provenance' },
  { n:'05', t:'COORD-SAFE Monitor', d:'Real-time emergent behavior detection' },
  { n:'06', t:'Output Synthesis', d:'Coherence verification before delivery' },
]

const C = '#06b6d4'

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

export default function Nova() {
  const [vis, setVis] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVis(true), 100); return () => clearTimeout(t) }, [])

  return (
    <>
      <Head>
        <title>NOVA C1 — Texas AGI Labs</title>
        <meta name="description" content="NOVA C1 — multi-agent coordination framework. I-3 certified distributed intelligence with COORD-SAFE protocol." />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&family=Lora:ital,wght@0,400;1,400&display=swap" rel="stylesheet" />
      </Head>
      <SiteNav />
      <div style={{background:'#0a0f1e',minHeight:'100vh',paddingTop:'64px'}}>

        {/* HERO */}
        <div style={{position:'relative',minHeight:'100vh',display:'flex',alignItems:'center',overflow:'hidden',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
          <div style={{position:'absolute',inset:0,background:`radial-gradient(ellipse 70% 70% at 80% 50%,${C}10 0%,rgba(0,0,0,1) 65%)`}} />
          <div style={{position:'absolute',inset:0,pointerEvents:'none',opacity:0.035,backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",backgroundSize:'180px 180px'}} />

          <div style={{position:'relative',zIndex:2,padding:'0 6vw',width:'100%',maxWidth:'1200px',margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6rem',alignItems:'center'}}>
            <div>
              <div style={{display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'2rem',opacity:vis?1:0,transition:'all 0.7s ease 0.1s'}}>
                <a href="/#models" style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'rgba(255,255,255,0.25)',textDecoration:'none',letterSpacing:'0.1em',textTransform:'uppercase'}}>Models</a>
                <span style={{color:'rgba(255,255,255,0.15)'}}>›</span>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:C,letterSpacing:'0.1em',textTransform:'uppercase'}}>NOVA C1</span>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'1.5rem',opacity:vis?1:0,transition:'all 0.7s ease 0.2s'}}>
                <span style={{width:'8px',height:'8px',borderRadius:'50%',border:`2px solid ${C}`,display:'inline-block'}}></span>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.15em',textTransform:'uppercase',color:C}}>Research Phase</span>
              </div>
              <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(5rem,14vw,13rem)',lineHeight:0.85,color:C,marginBottom:'0.5rem',opacity:vis?1:0,transform:vis?'translateY(0)':'translateY(40px)',transition:'all 1s ease 0.25s',textShadow:`0 0 80px ${C}30`}}>NOVA</h1>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',color:'rgba(255,255,255,0.3)',letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:'2rem',opacity:vis?1:0,transition:'all 0.7s ease 0.4s'}}>Model C1 — Scalable Agent Integration</div>
              <p style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'1.05rem',color:'rgba(255,255,255,0.5)',lineHeight:1.8,maxWidth:'480px',marginBottom:'2.5rem',opacity:vis?1:0,transition:'all 0.7s ease 0.5s'}}>
                A multi-agent coordination framework for distributed intelligence. NOVA enables networks of specialized agents to collaborate on complex goals with adaptive task routing and built-in coordination safety.
              </p>
              <div style={{display:'flex',gap:'1rem',flexWrap:'wrap',opacity:vis?1:0,transition:'all 0.7s ease 0.6s'}}>
                <a href="/#contact" style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',color:'#fff',background:C,padding:'12px 24px',borderRadius:'4px',textDecoration:'none',transition:'opacity 0.2s',boxShadow:`0 0 30px ${C}30`}}
                  onMouseEnter={e=>e.currentTarget.style.opacity='0.8'}
                  onMouseLeave={e=>e.currentTarget.style.opacity='1'}>Follow Development →</a>
                <a href="/research" style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(255,255,255,0.5)',padding:'12px 24px',borderRadius:'4px',textDecoration:'none',border:'1px solid rgba(255,255,255,0.12)',transition:'border-color 0.2s'}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.35)'}
                  onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.12)'}>Read COORD-SAFE Paper →</a>
              </div>
            </div>

            <div style={{opacity:vis?1:0,transform:vis?'translateY(0)':'translateY(30px)',transition:'all 0.9s ease 0.4s'}}>
              <div style={{border:`1px solid ${C}30`,borderRadius:'8px',overflow:'hidden'}}>
                <div style={{borderBottom:`1px solid ${C}20`,padding:'2rem',background:`${C}06`}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:'9px',letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginBottom:'0.75rem'}}>Integration Certification</div>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'5rem',color:C,lineHeight:1}}>I-3</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:C,letterSpacing:'0.12em',marginTop:'0.5rem'}}>○ INTEGRATION CERTIFIED</div>
                </div>
                <div style={{padding:'1.5rem',display:'flex',flexDirection:'column',gap:'0px'}}>
                  {[['Est. Release','Q3 2026'],['Agent Network','Up to 64 agents'],['Protocol','COORD-SAFE v1.2'],['Availability','Research Preview']].map(([k,v]) => (
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
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',color:'rgba(255,255,255,0.8)',textAlign:'right',maxWidth:'55%'}}>{s.value}</span>
              </div>
            ))}
          </div>
          <div style={{background:'#0a0f1e',padding:'4rem 6vw'}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:C,marginBottom:'2rem'}}>Benchmark Results</div>
            {BENCHMARKS.map(b => <BenchmarkBar key={b.name} b={b} vis={vis} />)}
            <p style={{fontFamily:"'DM Mono',monospace",fontSize:'9px',color:'rgba(255,255,255,0.2)',marginTop:'1.5rem',lineHeight:1.6}}>Internal research results. Benchmarks evolving as NOVA development continues.</p>
          </div>
        </div>

        {/* ARCHITECTURE PIPELINE */}
        <div style={{padding:'5rem 6vw',maxWidth:'1200px',margin:'0 auto'}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(255,255,255,0.2)',marginBottom:'1.5rem'}}>Architecture</div>
          <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(2.5rem,5vw,5rem)',lineHeight:0.9,color:'#fff',marginBottom:'3rem'}}>Six-Stage<br/>Safe Pipeline.</h2>
          <div style={{display:'flex',flexDirection:'column',gap:'1px',background:'rgba(255,255,255,0.06)'}}>
            {PIPELINE.map((p,i) => (
              <div key={p.n} style={{background:'#0a0f1e',padding:'2rem 2.5rem',display:'flex',alignItems:'center',gap:'2rem',transition:'background 0.2s'}}
                onMouseEnter={e=>e.currentTarget.style.background='#080c14'}
                onMouseLeave={e=>e.currentTarget.style.background='#000'}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'2.5rem',color:C,opacity:0.2,minWidth:'48px',lineHeight:1}}>{p.n}</div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',letterSpacing:'0.08em',color:'rgba(255,255,255,0.8)',marginBottom:'0.25rem'}}>{p.t}</div>
                  <div style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'0.88rem',color:'rgba(255,255,255,0.3)'}}>{p.d}</div>
                </div>
                {i < PIPELINE.length-1 && <div style={{width:'1px',height:'100%',background:`linear-gradient(to bottom,${C}40,transparent)`,position:'absolute',left:'calc(6vw + 48px + 2rem)',bottom:'-1px',top:'auto',height:'1px',width:'1px'}} />}
                <div style={{color:C,opacity:0.3,fontSize:'14px'}}>→</div>
              </div>
            ))}
          </div>
        </div>

        {/* OTHER MODELS */}
        <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',padding:'4rem 6vw'}}>
          <div style={{maxWidth:'1200px',margin:'0 auto'}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(255,255,255,0.2)',marginBottom:'2rem'}}>Also in the Suite</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1px',background:'rgba(255,255,255,0.06)'}}>
              {[{name:'ALPHA',sub:'A1 — Safe Deployment',c:'#3b82f6',href:'/models/alpha'},{name:'OMEGA',sub:'B1 — Robust Cognition',c:'#8b5cf6',href:'/models/omega'}].map(m=>(
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
