import Head from 'next/head'

const BENCHMARKS = [
  { name: 'ARC-AGI', score: 91.3, color: '#8b5cf6' },
  { name: 'GPQA (Graduate-Level)', score: 88.7, color: '#8b5cf6' },
  { name: 'MATH (Competition)', score: 86.4, color: '#8b5cf6' },
  { name: 'OOD Generalization', score: 93.1, color: '#10b981' },
  { name: 'Causal Reasoning Suite', score: 89.2, color: '#8b5cf6' },
  { name: 'Multi-Step Planning', score: 87.8, color: '#8b5cf6' },
  { name: 'Robustness Under Stress', score: 94.5, color: '#10b981' },
  { name: 'Distribution Shift Resistance', score: 91.7, color: '#10b981' },
]

const SPECS = [
  { label: 'Architecture', value: 'Hybrid Reasoning + Mixture-of-Experts' },
  { label: 'Parameters', value: '~120B (MoE active: ~40B)' },
  { label: 'Context Window', value: '256K tokens' },
  { label: 'Training Paradigm', value: 'Supervised + RLHF + Reasoning Fine-Tune' },
  { label: 'Specialization', value: 'Causal Inference + Long-Horizon Planning' },
  { label: 'Cert Level', value: 'R-1 Robustness Certified' },
  { label: 'Evaluation Suite', value: 'ARC-AGI + GPQA + Custom' },
  { label: 'Status', value: 'In Evaluation' },
]

const CAPABILITIES = [
  { icon: '🧠', title: 'Causal Reasoning', body: 'OMEGA builds explicit causal models of its environment, enabling robust counterfactual reasoning and planning under uncertainty.' },
  { icon: '📐', title: 'Multi-Step Planning', body: 'Designed for long-horizon task decomposition. OMEGA maintains coherent goal structures across hundreds of reasoning steps.' },
  { icon: '🌊', title: 'Distribution Shift Resistance', body: 'Unlike standard transformers, OMEGA maintains performance when inputs differ significantly from training distribution — a critical property for real-world deployment.' },
  { icon: '🔀', title: 'Mixture-of-Experts', body: 'MoE architecture activates specialized sub-networks per token, enabling expert-level performance across diverse domains without parameter bloat.' },
  { icon: '📊', title: 'Uncertainty Quantification', body: 'OMEGA produces calibrated confidence estimates, allowing downstream systems to route low-confidence outputs for human review.' },
  { icon: '🔗', title: 'Long Context Mastery', body: '256K token context window with near-linear performance degradation. Handles multi-document synthesis, long codebases, and extended dialogue.' },
]

export default function OmegaModel() {
  return (
    <>
      <Head>
        <title>OMEGA B1 — Texas AGI Labs</title>
        <meta name="description" content="OMEGA B1 is Texas AGI Labs' robust cognition model — built for causal reasoning, multi-step planning, and out-of-distribution generalization." />
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

      <div style={{paddingTop:'64px'}}>

        {/* HERO */}
        <div style={{position:'relative',overflow:'hidden',borderBottom:'1px solid rgba(255,255,255,0.07)',minHeight:'480px',display:'flex',alignItems:'center'}}>
          <div style={{position:'absolute',top:'50%',left:'60%',transform:'translate(-50%,-50%)',width:'700px',height:'700px',background:'radial-gradient(circle,rgba(139,92,246,0.12) 0%,transparent 65%)',pointerEvents:'none'}} />
          <div className="section-inner" style={{paddingBottom:'4rem',position:'relative',zIndex:1}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',color:'#4a5568',marginBottom:'2rem',letterSpacing:'0.08em'}}>
              <a href="/#models" style={{color:'#4a5568',textDecoration:'none'}}>Models</a>
              <span style={{margin:'0 0.75rem'}}>→</span>
              <span style={{color:'#8b5cf6'}}>OMEGA B1</span>
            </div>
            <div style={{display:'flex',alignItems:'flex-start',gap:'3rem',flexWrap:'wrap'}}>
              <div style={{flex:1,minWidth:'300px'}}>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.15em',textTransform:'uppercase',padding:'4px 12px',borderRadius:'4px',background:'rgba(139,92,246,0.1)',color:'#8b5cf6',border:'1px solid rgba(139,92,246,0.3)',display:'inline-block',marginBottom:'1.5rem'}}>◎ In Evaluation</span>
                <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(5rem,12vw,10rem)',lineHeight:0.9,letterSpacing:'0.04em',color:'#8b5cf6',marginBottom:'0.5rem'}}>OMEGA</h1>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:'13px',color:'#6b7a94',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'1.5rem'}}>Model B1 — Robust Cognition</div>
                <p style={{fontFamily:"'Lora',serif",fontSize:'1.1rem',color:'#9aa3b2',lineHeight:1.8,maxWidth:'520px',fontStyle:'italic'}}>A general reasoning engine built to operate reliably under uncertainty, stress, and distribution shift. Optimized for causal inference, multi-step planning, and out-of-distribution generalization.</p>
                <div style={{display:'flex',gap:'1rem',marginTop:'2rem',flexWrap:'wrap'}}>
                  <a href="/#contact" style={{fontFamily:"'DM Mono',monospace",fontSize:'12px',fontWeight:500,letterSpacing:'0.08em',textTransform:'uppercase',background:'#8b5cf6',color:'#fff',border:'none',padding:'14px 28px',borderRadius:'8px',cursor:'pointer',textDecoration:'none',display:'inline-block',boxShadow:'0 0 30px rgba(139,92,246,0.3)'}}>Join Evaluation Program</a>
                  <a href="/research" className="btn-ghost">View Benchmark Papers →</a>
                </div>
              </div>
              <div style={{background:'#0a0d14',border:'1px solid rgba(139,92,246,0.3)',borderRadius:'12px',padding:'2rem',minWidth:'220px',textAlign:'center'}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:'#4a5568',marginBottom:'1rem'}}>Certification</div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'3.5rem',color:'#8b5cf6',lineHeight:1}}>R-1</div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',color:'#8b5cf6',marginTop:'0.5rem',letterSpacing:'0.08em'}}>ROBUSTNESS CERT</div>
                <div style={{borderTop:'1px solid rgba(255,255,255,0.07)',marginTop:'1.5rem',paddingTop:'1.5rem'}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'#4a5568',marginBottom:'0.5rem'}}>Evaluation Phase</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:'12px',color:'#e8edf5'}}>Q1 2026</div>
                </div>
                <div style={{borderTop:'1px solid rgba(255,255,255,0.07)',marginTop:'1rem',paddingTop:'1rem'}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'#4a5568',marginBottom:'0.5rem'}}>Status</div>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'6px'}}>
                    <span style={{width:'7px',height:'7px',borderRadius:'50%',background:'#f59e0b',display:'inline-block'}}></span>
                    <span style={{fontFamily:"'DM Mono',monospace",fontSize:'12px',color:'#f59e0b'}}>In Evaluation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SPECS + BENCHMARKS */}
        <div style={{borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
          <div className="section-inner" style={{paddingBottom:'4rem'}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'4rem',alignItems:'start'}}>
              <div>
                <div className="section-label">Specifications</div>
                <h2 className="section-title" style={{fontSize:'clamp(2rem,4vw,3.5rem)'}}>Technical<br/>Profile</h2>
                <div style={{border:'1px solid rgba(255,255,255,0.07)',marginTop:'2rem'}}>
                  {SPECS.map((s, i) => (
                    <div key={s.label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'1rem 1.5rem',borderBottom:i<SPECS.length-1?'1px solid rgba(255,255,255,0.07)':'none',gap:'1rem'}}>
                      <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'#4a5568',letterSpacing:'0.1em',textTransform:'uppercase',flexShrink:0}}>{s.label}</span>
                      <span style={{fontFamily:"'DM Mono',monospace",fontSize:'12px',color:'#e8edf5',textAlign:'right'}}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="section-label">Benchmarks</div>
                <h2 className="section-title" style={{fontSize:'clamp(2rem,4vw,3.5rem)'}}>Evaluation<br/>Results</h2>
                <div style={{display:'flex',flexDirection:'column',gap:'1.25rem',marginTop:'2rem'}}>
                  {BENCHMARKS.map(b => (
                    <div key={b.name}>
                      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
                        <span style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',color:'#6b7a94'}}>{b.name}</span>
                        <span style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',color:b.color,fontWeight:500}}>{b.score}%</span>
                      </div>
                      <div style={{height:'4px',background:'rgba(255,255,255,0.05)',borderRadius:'2px'}}>
                        <div style={{height:'100%',width:`${b.score}%`,background:b.color,borderRadius:'2px'}} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CAPABILITIES */}
        <div style={{background:'#0a0d14',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
          <div className="section-inner" style={{paddingBottom:'4rem'}}>
            <div className="section-label">Capabilities</div>
            <h2 className="section-title">What OMEGA<br/>Can Do</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'1px',background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.07)',marginTop:'3rem'}}>
              {CAPABILITIES.map(c => (
                <div key={c.title} style={{background:'#0a0d14',padding:'2.5rem',transition:'background 0.2s'}}
                  onMouseEnter={e=>e.currentTarget.style.background='#0f1320'}
                  onMouseLeave={e=>e.currentTarget.style.background='#0a0d14'}>
                  <div style={{fontSize:'2rem',marginBottom:'1rem'}}>{c.icon}</div>
                  <h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'1.4rem',letterSpacing:'0.04em',marginBottom:'0.75rem'}}>{c.title}</h3>
                  <p style={{fontSize:'0.88rem',color:'#6b7a94',lineHeight:1.7}}>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* OTHER MODELS */}
        <div style={{borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
          <div className="section-inner" style={{paddingBottom:'4rem'}}>
            <div className="section-label">Model Suite</div>
            <h2 className="section-title">Explore Our<br/>Other Models</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'1px',background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.07)',marginTop:'3rem'}}>
              {[
                {name:'ALPHA',sub:'Model A1 — Safe Deployment',color:'#3b82f6',status:'Operational',href:'/models/alpha',desc:'Safe, constrained deployment with S-2 safety certification.'},
                {name:'NOVA',sub:'Model C1 — Agent Integration',color:'#06b6d4',status:'Research Phase',href:'/models/nova',desc:'Multi-agent coordination framework for distributed intelligence.'},
              ].map(m => (
                <a key={m.name} href={m.href} style={{background:'#030508',padding:'2.5rem',textDecoration:'none',display:'block',transition:'background 0.2s'}}
                  onMouseEnter={e=>e.currentTarget.style.background='#0a0d14'}
                  onMouseLeave={e=>e.currentTarget.style.background='#030508'}>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',padding:'3px 8px',borderRadius:'3px',background:`${m.color}18`,color:m.color,border:`1px solid ${m.color}44`,display:'inline-block',marginBottom:'1.5rem'}}>{m.status}</span>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'3rem',color:m.color,lineHeight:1,marginBottom:'0.5rem'}}>{m.name}</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'#4a5568',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:'1rem'}}>{m.sub}</div>
                  <p style={{fontSize:'0.88rem',color:'#6b7a94',lineHeight:1.7}}>{m.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="section-inner" style={{textAlign:'center'}}>
            <div className="section-label" style={{justifyContent:'center'}}>Early Access</div>
            <h2 className="section-title">Join the OMEGA<br/>Evaluation Program.</h2>
            <p className="section-body" style={{margin:'0 auto 2rem',textAlign:'center'}}>We are accepting qualified research partners for early evaluation access. Limited spots available for Q1 2026.</p>
            <a href="/#contact" style={{fontFamily:"'DM Mono',monospace",fontSize:'12px',fontWeight:500,letterSpacing:'0.08em',textTransform:'uppercase',background:'#8b5cf6',color:'#fff',border:'none',padding:'14px 28px',borderRadius:'8px',cursor:'pointer',textDecoration:'none',display:'inline-block',boxShadow:'0 0 30px rgba(139,92,246,0.3)'}}>Apply for Early Access →</a>
          </div>
        </div>

        <footer>
          <div className="footer-inner">
            <div className="footer-brand">
              <a href="/" className="nav-logo" style={{textDecoration:'none'}}>
                <img src="/texasagilabs-logo.png" alt="Texas AGI Labs" className="logo-img" />
                <span className="logo-text">Texas AGI Labs</span>
              </a>
              <p>An independent frontier AI research lab advancing aligned, interpretable, and beneficial AGI.</p>
            </div>
            <div className="footer-col"><h4>Research</h4><ul><li><a href="/research">Publications</a></li><li><a href="/#research">Research Areas</a></li></ul></div>
            <div className="footer-col"><h4>Models</h4><ul><li><a href="/models/alpha">ALPHA A1</a></li><li><a href="/models/omega">OMEGA B1</a></li><li><a href="/models/nova">NOVA C1</a></li></ul></div>
            <div className="footer-col"><h4>Company</h4><ul><li><a href="/#about">About</a></li><li><a href="/careers">Careers</a></li><li><a href="/#contact">Contact</a></li></ul></div>
          </div>
          <div className="footer-bottom">
            <p>© 2025–2026 Texas AGI Labs. All rights reserved. McKinney, TX 75070</p>
            <div className="footer-badges"><span className="badge">Safety-First</span><span className="badge">Open Research</span><span className="badge">Texas-Built</span></div>
          </div>
        </footer>
      </div>
    </>
  )
}
