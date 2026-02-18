import Head from 'next/head'

const BENCHMARKS = [
  { name: 'Constitutional Compliance', score: 98.7, max: 100, color: '#3b82f6' },
  { name: 'Corrigibility Retention', score: 97.3, max: 100, color: '#3b82f6' },
  { name: 'Deceptive Alignment Probe', score: 99.1, max: 100, color: '#10b981' },
  { name: 'OOD Safety Generalization', score: 94.2, max: 100, color: '#3b82f6' },
  { name: 'Red-Team Adversarial Suite', score: 96.8, max: 100, color: '#10b981' },
  { name: 'Sycophancy Resistance', score: 88.0, max: 100, color: '#f59e0b' },
  { name: 'MMLU (Knowledge)', score: 87.4, max: 100, color: '#6b7a94' },
  { name: 'HumanEval (Coding)', score: 82.1, max: 100, color: '#6b7a94' },
]

const SPECS = [
  { label: 'Architecture', value: 'Decoder-only Transformer + Safety Layer' },
  { label: 'Parameters', value: '~70B (estimated)' },
  { label: 'Context Window', value: '128K tokens' },
  { label: 'Training Paradigm', value: 'Supervised + RLHF + Constitutional AI' },
  { label: 'Alignment Method', value: 'Constitutional AI v3 + Scalable Oversight' },
  { label: 'Cert Level', value: 'S-2 Safety Verified' },
  { label: 'Inference', value: 'Optimized for A100 / H100' },
  { label: 'Status', value: 'Operational' },
]

const CAPABILITIES = [
  { icon: '⚖️', title: 'Constitutional Reasoning', body: 'ALPHA applies explicit constitutional constraints at inference time, refusing requests that violate its safety envelope even under adversarial pressure.' },
  { icon: '🔒', title: 'Corrigible by Default', body: 'Designed to defer to human oversight at every capability tier. ALPHA maintains human control mechanisms even as task complexity increases.' },
  { icon: '🧩', title: 'Long-Context Understanding', body: '128K token context window with strong performance on multi-document reasoning, long-form analysis, and extended conversation.' },
  { icon: '🔬', title: 'Interpretable Internals', body: 'ALPHA has a dedicated mechanistic audit program. Key decision circuits are documented and monitored for behavioral drift.' },
  { icon: '🛡️', title: 'Adversarial Robustness', body: 'Tested against 1,200+ adversarial prompts across 8 attack categories. Maintains safety compliance under jailbreak, roleplay, and indirect injection attacks.' },
  { icon: '📋', title: 'Structured Outputs', body: 'Native support for JSON, Markdown, and domain-specific formats with schema enforcement and validation at the output layer.' },
]

const SAFETY_CHECKS = [
  { check: 'Constitutional constraint verification', status: 'PASS', color: '#10b981' },
  { check: 'RLHF reward model alignment', status: 'PASS', color: '#10b981' },
  { check: 'Corrigibility benchmark (97.3%)', status: 'PASS', color: '#10b981' },
  { check: 'Deceptive alignment probe', status: 'PASS', color: '#10b981' },
  { check: 'Sycophancy score: 0.12', status: 'MONITOR', color: '#f59e0b' },
  { check: 'OOD generalization suite', status: 'PASS', color: '#10b981' },
  { check: 'Red-team adversarial suite', status: 'PASS', color: '#10b981' },
  { check: 'Autonomy envelope test', status: 'PASS', color: '#10b981' },
]

export default function AlphaModel() {
  return (
    <>
      <Head>
        <title>ALPHA A1 — Texas AGI Labs</title>
        <meta name="description" content="ALPHA A1 is Texas AGI Labs' safe deployment model — designed for constrained, high-stakes environments with S-2 safety certification." />
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
          <div style={{position:'absolute',top:'50%',left:'60%',transform:'translate(-50%,-50%)',width:'700px',height:'700px',background:'radial-gradient(circle,rgba(59,130,246,0.12) 0%,transparent 65%)',pointerEvents:'none'}} />
          <div className="section-inner" style={{paddingBottom:'4rem',position:'relative',zIndex:1}}>
            {/* Breadcrumb */}
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',color:'#4a5568',marginBottom:'2rem',letterSpacing:'0.08em'}}>
              <a href="/#models" style={{color:'#4a5568',textDecoration:'none'}}>Models</a>
              <span style={{margin:'0 0.75rem'}}>→</span>
              <span style={{color:'#3b82f6'}}>ALPHA A1</span>
            </div>

            <div style={{display:'flex',alignItems:'flex-start',gap:'3rem',flexWrap:'wrap'}}>
              <div style={{flex:1,minWidth:'300px'}}>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.15em',textTransform:'uppercase',padding:'4px 12px',borderRadius:'4px',background:'rgba(59,130,246,0.1)',color:'#3b82f6',border:'1px solid rgba(59,130,246,0.3)',display:'inline-block',marginBottom:'1.5rem'}}>◉ Operational</span>
                <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(5rem,12vw,10rem)',lineHeight:0.9,letterSpacing:'0.04em',color:'#3b82f6',marginBottom:'0.5rem'}}>ALPHA</h1>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:'13px',color:'#6b7a94',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'1.5rem'}}>Model A1 — Safe Deployment AGI</div>
                <p style={{fontFamily:"'Lora',serif",fontSize:'1.1rem',color:'#9aa3b2',lineHeight:1.8,maxWidth:'520px',fontStyle:'italic'}}>Designed for safe, constrained deployment in high-stakes environments. Enforces explicit safety envelopes, constitutional constraints, and human-oversight requirements at inference time.</p>
                <div style={{display:'flex',gap:'1rem',marginTop:'2rem',flexWrap:'wrap'}}>
                  <a href="/#contact" className="btn-primary">Request API Access</a>
                  <a href="/research" className="btn-ghost">Read Safety Papers →</a>
                </div>
              </div>

              {/* Cert badge */}
              <div style={{background:'#0a0d14',border:'1px solid rgba(59,130,246,0.3)',borderRadius:'12px',padding:'2rem',minWidth:'220px',textAlign:'center'}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:'#4a5568',marginBottom:'1rem'}}>Certification</div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'3.5rem',color:'#3b82f6',lineHeight:1}}>S-2</div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',color:'#10b981',marginTop:'0.5rem',letterSpacing:'0.08em'}}>SAFETY VERIFIED</div>
                <div style={{borderTop:'1px solid rgba(255,255,255,0.07)',marginTop:'1.5rem',paddingTop:'1.5rem'}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'#4a5568',letterSpacing:'0.08em',marginBottom:'0.5rem'}}>Last Evaluated</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:'12px',color:'#e8edf5'}}>Feb 2026</div>
                </div>
                <div style={{borderTop:'1px solid rgba(255,255,255,0.07)',marginTop:'1rem',paddingTop:'1rem'}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'#4a5568',letterSpacing:'0.08em',marginBottom:'0.5rem'}}>Deployment Status</div>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'6px'}}>
                    <span style={{width:'7px',height:'7px',borderRadius:'50%',background:'#10b981',display:'inline-block',animation:'pulse 2s infinite'}}></span>
                    <span style={{fontFamily:"'DM Mono',monospace",fontSize:'12px',color:'#10b981'}}>Operational</span>
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

              {/* Specs */}
              <div>
                <div className="section-label">Specifications</div>
                <h2 className="section-title" style={{fontSize:'clamp(2rem,4vw,3.5rem)'}}>Technical<br/>Profile</h2>
                <div style={{border:'1px solid rgba(255,255,255,0.07)',marginTop:'2rem'}}>
                  {SPECS.map((s, i) => (
                    <div key={s.label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'1rem 1.5rem',borderBottom: i < SPECS.length-1 ? '1px solid rgba(255,255,255,0.07)' : 'none',gap:'1rem'}}>
                      <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'#4a5568',letterSpacing:'0.1em',textTransform:'uppercase',flexShrink:0}}>{s.label}</span>
                      <span style={{fontFamily:"'DM Mono',monospace",fontSize:'12px',color:'#e8edf5',textAlign:'right'}}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benchmarks */}
              <div>
                <div className="section-label">Benchmarks</div>
                <h2 className="section-title" style={{fontSize:'clamp(2rem,4vw,3.5rem)'}}>Evaluation<br/>Results</h2>
                <div style={{display:'flex',flexDirection:'column',gap:'1.25rem',marginTop:'2rem'}}>
                  {BENCHMARKS.map(b => (
                    <div key={b.name}>
                      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
                        <span style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',color:'#6b7a94',letterSpacing:'0.05em'}}>{b.name}</span>
                        <span style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',color:b.color,fontWeight:500}}>{b.score}%</span>
                      </div>
                      <div style={{height:'4px',background:'rgba(255,255,255,0.05)',borderRadius:'2px',overflow:'hidden'}}>
                        <div style={{height:'100%',width:`${b.score}%`,background:b.color,borderRadius:'2px',transition:'width 1s ease'}} />
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
            <h2 className="section-title">What ALPHA<br/>Can Do</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'1px',background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.07)',marginTop:'3rem'}}>
              {CAPABILITIES.map(c => (
                <div key={c.title} style={{background:'#0a0d14',padding:'2.5rem',transition:'background 0.2s'}}
                  onMouseEnter={e=>e.currentTarget.style.background='#0f1320'}
                  onMouseLeave={e=>e.currentTarget.style.background='#0a0d14'}>
                  <div style={{fontSize:'2rem',marginBottom:'1rem'}}>{c.icon}</div>
                  <h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'1.4rem',letterSpacing:'0.04em',marginBottom:'0.75rem',color:'#e8edf5'}}>{c.title}</h3>
                  <p style={{fontSize:'0.88rem',color:'#6b7a94',lineHeight:1.7}}>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SAFETY EVAL TERMINAL */}
        <div style={{borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
          <div className="section-inner" style={{paddingBottom:'4rem'}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'4rem',alignItems:'start'}}>
              <div>
                <div className="section-label">Safety Evaluation</div>
                <h2 className="section-title">Every Deployment<br/>Requires Passing<br/>These Checks.</h2>
                <p className="section-body" style={{marginTop:'1rem'}}>ALPHA undergoes continuous automated and human red-team evaluation. No model version is deployed without passing all S-2 criteria.</p>
                <div style={{display:'flex',flexDirection:'column',gap:'0.75rem',marginTop:'2.5rem'}}>
                  {SAFETY_CHECKS.map(s => (
                    <div key={s.check} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0.75rem 1rem',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'4px',background:'#0a0d14'}}>
                      <span style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',color:'#6b7a94'}}>{s.check}</span>
                      <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.1em',color:s.color,padding:'2px 8px',borderRadius:'3px',background:`${s.color}18`,border:`1px solid ${s.color}44`,flexShrink:0}}>{s.status}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="terminal">
                <div className="terminal-bar">
                  <div className="term-dot red"></div>
                  <div className="term-dot yellow"></div>
                  <div className="term-dot green"></div>
                  <span className="terminal-title">alpha_v2.1_eval.sh</span>
                </div>
                <div className="terminal-body">
                  <span className="term-line"><span className="term-prompt">$ </span><span className="term-cmd">run_eval --model alpha-v2.1 --full</span></span>
                  <span className="term-line term-comment"># Loading evaluation suite v4.2...</span>
                  <span className="term-line term-comment"># Running 1,847 test cases...</span>
                  <span className="term-line">&nbsp;</span>
                  <span className="term-line term-output">✓ Constitutional compliance: 98.7%</span>
                  <span className="term-line term-output">✓ Corrigibility retention: 97.3%</span>
                  <span className="term-line term-output">✓ Deceptive alignment probe: PASS</span>
                  <span className="term-line term-output">✓ OOD safety generalization: 94.2%</span>
                  <span className="term-line term-warn">⚠ Sycophancy score: 0.12 (flagged)</span>
                  <span className="term-line term-output">✓ Red-team suite (1,200 cases): PASS</span>
                  <span className="term-line term-output">✓ Autonomy envelope: PASS</span>
                  <span className="term-line">&nbsp;</span>
                  <span className="term-line term-comment"># ── Certification Decision ─────</span>
                  <span className="term-line term-output">✓ S-2 Certification: CONFIRMED</span>
                  <span className="term-line term-output">✓ Cleared for deployment: YES</span>
                  <span className="term-line term-warn">⚠ Sycophancy: monitoring required</span>
                  <span className="term-line">&nbsp;</span>
                  <span className="term-line"><span className="term-prompt">$ </span><span className="term-cursor"></span></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* OTHER MODELS */}
        <div style={{background:'#0a0d14',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
          <div className="section-inner" style={{paddingBottom:'4rem'}}>
            <div className="section-label">Model Suite</div>
            <h2 className="section-title">Explore Our<br/>Other Models</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'1px',background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.07)',marginTop:'3rem'}}>
              {[
                {name:'OMEGA',sub:'Model B1 — Robust Cognition',color:'#8b5cf6',status:'In Evaluation',href:'/models/omega',desc:'General reasoning under uncertainty, stress, and distribution shift.'},
                {name:'NOVA',sub:'Model C1 — Agent Integration',color:'#06b6d4',status:'Research Phase',href:'/models/nova',desc:'Multi-agent coordination framework for distributed intelligence.'},
              ].map(m => (
                <a key={m.name} href={m.href} style={{background:'#0a0d14',padding:'2.5rem',textDecoration:'none',display:'block',transition:'background 0.2s'}}
                  onMouseEnter={e=>e.currentTarget.style.background='#0f1320'}
                  onMouseLeave={e=>e.currentTarget.style.background='#0a0d14'}>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',padding:'3px 8px',borderRadius:'3px',background:`${m.color}18`,color:m.color,border:`1px solid ${m.color}44`,display:'inline-block',marginBottom:'1.5rem'}}>{m.status}</span>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'3rem',color:m.color,lineHeight:1,marginBottom:'0.5rem'}}>{m.name}</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'#4a5568',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:'1rem'}}>{m.sub}</div>
                  <p style={{fontSize:'0.88rem',color:'#6b7a94',lineHeight:1.7}}>{m.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div>
          <div className="section-inner" style={{textAlign:'center'}}>
            <div className="section-label" style={{justifyContent:'center'}}>Access</div>
            <h2 className="section-title">Ready to Deploy<br/>ALPHA?</h2>
            <p className="section-body" style={{margin:'0 auto 2rem',textAlign:'center'}}>API access is available for qualified research institutions and enterprise partners. All deployments require safety review.</p>
            <a href="/#contact" className="btn-primary">Request API Access →</a>
          </div>
        </div>

        <footer>
          <div className="footer-inner">
            <div className="footer-brand">
              <a href="/" className="nav-logo" style={{textDecoration:'none'}}>
                <img src="/texasagilabs-logo.png" alt="Texas AGI Labs" className="logo-img" />
                <span className="logo-text">Texas AGI Labs</span>
              </a>
              <p>An independent frontier AI research lab advancing the science of aligned, interpretable, and beneficial artificial general intelligence.</p>
            </div>
            <div className="footer-col"><h4>Research</h4><ul><li><a href="/research">Publications</a></li><li><a href="/#research">Research Areas</a></li><li><a href="/#safety">Safety</a></li></ul></div>
            <div className="footer-col"><h4>Models</h4><ul><li><a href="/models/alpha">ALPHA A1</a></li><li><a href="/models/omega">OMEGA B1</a></li><li><a href="/models/nova">NOVA C1</a></li></ul></div>
            <div className="footer-col"><h4>Company</h4><ul><li><a href="/#about">About</a></li><li><a href="/careers">Careers</a></li><li><a href="/#contact">Contact</a></li></ul></div>
          </div>
          <div className="footer-bottom">
            <p>© 2025–2026 Texas AGI Labs. All rights reserved. McKinney, TX 75070</p>
            <div className="footer-badges"><span className="badge">Safety-First</span><span className="badge">Open Research</span><span className="badge">Texas-Built</span></div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </>
  )
}
