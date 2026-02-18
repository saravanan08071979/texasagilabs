import Head from 'next/head'

const BENCHMARKS = [
  { name: 'Multi-Agent Coordination', score: 92.4, color: '#06b6d4' },
  { name: 'Task Routing Accuracy', score: 94.1, color: '#06b6d4' },
  { name: 'Shared Memory Coherence', score: 89.7, color: '#06b6d4' },
  { name: 'Goal Drift Prevention', score: 96.3, color: '#10b981' },
  { name: 'Emergent Misalignment Probe', score: 91.8, color: '#10b981' },
  { name: 'RAG Retrieval Accuracy', score: 88.5, color: '#06b6d4' },
  { name: 'Cross-Agent Consistency', score: 87.2, color: '#06b6d4' },
  { name: 'Long-Horizon Task Completion', score: 83.6, color: '#f59e0b' },
]

const SPECS = [
  { label: 'Architecture', value: 'Multi-Agent Orchestrator + RAG' },
  { label: 'Agent Network Size', value: 'Up to 64 heterogeneous agents' },
  { label: 'Context Per Agent', value: '128K tokens' },
  { label: 'Shared Memory', value: 'Vector + Episodic + Working' },
  { label: 'Task Routing', value: 'Adaptive, learned router' },
  { label: 'Cert Level', value: 'I-3 Integration Certified' },
  { label: 'Safety Protocol', value: 'COORD-SAFE v1.2' },
  { label: 'Status', value: 'Research Phase' },
]

const CAPABILITIES = [
  { icon: '🕸️', title: 'Multi-Agent Orchestration', body: 'NOVA coordinates networks of up to 64 specialized agents, dynamically routing tasks to the most capable sub-agent based on learned competency profiles.' },
  { icon: '🧠', title: 'Shared Memory Architecture', body: 'Agents share a unified memory system spanning vector storage, episodic recall, and working memory — enabling coherent collaboration across long task horizons.' },
  { icon: '🔀', title: 'Adaptive Task Routing', body: 'A learned routing layer continuously updates agent assignments based on performance signals, load balancing, and task-type classification.' },
  { icon: '🛡️', title: 'COORD-SAFE Protocol', body: 'Novel coordination safety protocol that provably prevents emergent goal drift in multi-agent networks. Published and open-sourced for community use.' },
  { icon: '📚', title: 'Retrieval-Augmented Generation', body: 'Native RAG integration allows agents to query internal knowledge bases, research archives, and real-time data sources mid-task.' },
  { icon: '🔬', title: 'Emergent Behavior Monitoring', body: 'Continuous monitoring layer detects anomalous emergent behaviors across the agent network — flagging unexpected coordination patterns for human review.' },
]

const ARCHITECTURE = [
  { layer: '01', name: 'Task Ingestion', desc: 'Parses complex goals into structured sub-task graphs with dependency mapping and priority ordering.' },
  { layer: '02', name: 'Router', desc: 'Adaptive learned router assigns sub-tasks to specialized agents based on competency scores and current load.' },
  { layer: '03', name: 'Agent Network', desc: 'Up to 64 heterogeneous agents — each a specialized transformer fine-tuned for a specific capability domain.' },
  { layer: '04', name: 'Shared Memory', desc: 'Unified memory layer enabling cross-agent information sharing, episodic recall, and working state synchronization.' },
  { layer: '05', name: 'COORD-SAFE Monitor', desc: 'Continuous safety layer watching for goal drift, emergent misalignment, and unauthorized capability expansion.' },
  { layer: '06', name: 'Output Synthesis', desc: 'Aggregates outputs from multiple agents into a coherent final response with confidence-weighted merging.' },
]

export default function NovaModel() {
  return (
    <>
      <Head>
        <title>NOVA C1 — Texas AGI Labs</title>
        <meta name="description" content="NOVA C1 is Texas AGI Labs' multi-agent coordination model — a distributed intelligence framework for complex, long-horizon tasks." />
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
          <div style={{position:'absolute',top:'50%',left:'60%',transform:'translate(-50%,-50%)',width:'700px',height:'700px',background:'radial-gradient(circle,rgba(6,182,212,0.12) 0%,transparent 65%)',pointerEvents:'none'}} />
          <div className="section-inner" style={{paddingBottom:'4rem',position:'relative',zIndex:1}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',color:'#4a5568',marginBottom:'2rem',letterSpacing:'0.08em'}}>
              <a href="/#models" style={{color:'#4a5568',textDecoration:'none'}}>Models</a>
              <span style={{margin:'0 0.75rem'}}>→</span>
              <span style={{color:'#06b6d4'}}>NOVA C1</span>
            </div>
            <div style={{display:'flex',alignItems:'flex-start',gap:'3rem',flexWrap:'wrap'}}>
              <div style={{flex:1,minWidth:'300px'}}>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.15em',textTransform:'uppercase',padding:'4px 12px',borderRadius:'4px',background:'rgba(6,182,212,0.1)',color:'#06b6d4',border:'1px solid rgba(6,182,212,0.3)',display:'inline-block',marginBottom:'1.5rem'}}>○ Research Phase</span>
                <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(5rem,12vw,10rem)',lineHeight:0.9,letterSpacing:'0.04em',color:'#06b6d4',marginBottom:'0.5rem'}}>NOVA</h1>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:'13px',color:'#6b7a94',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'1.5rem'}}>Model C1 — Scalable Agent Integration</div>
                <p style={{fontFamily:"'Lora',serif",fontSize:'1.1rem',color:'#9aa3b2',lineHeight:1.8,maxWidth:'520px',fontStyle:'italic'}}>A multi-agent coordination framework for distributed intelligence. NOVA enables networks of specialized agents to collaborate on complex goals with adaptive task routing, shared memory, and built-in coordination safety.</p>
                <div style={{display:'flex',gap:'1rem',marginTop:'2rem',flexWrap:'wrap'}}>
                  <a href="/#contact" style={{fontFamily:"'DM Mono',monospace",fontSize:'12px',fontWeight:500,letterSpacing:'0.08em',textTransform:'uppercase',background:'#06b6d4',color:'#fff',border:'none',padding:'14px 28px',borderRadius:'8px',cursor:'pointer',textDecoration:'none',display:'inline-block',boxShadow:'0 0 30px rgba(6,182,212,0.3)'}}>Follow Research Progress</a>
                  <a href="/research" className="btn-ghost">Read NOVA Papers →</a>
                </div>
              </div>
              <div style={{background:'#0a0d14',border:'1px solid rgba(6,182,212,0.3)',borderRadius:'12px',padding:'2rem',minWidth:'220px',textAlign:'center'}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:'#4a5568',marginBottom:'1rem'}}>Certification</div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'3.5rem',color:'#06b6d4',lineHeight:1}}>I-3</div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',color:'#06b6d4',marginTop:'0.5rem',letterSpacing:'0.08em'}}>INTEGRATION CERT</div>
                <div style={{borderTop:'1px solid rgba(255,255,255,0.07)',marginTop:'1.5rem',paddingTop:'1.5rem'}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'#4a5568',marginBottom:'0.5rem'}}>Est. Release</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:'12px',color:'#e8edf5'}}>Q3 2026</div>
                </div>
                <div style={{borderTop:'1px solid rgba(255,255,255,0.07)',marginTop:'1rem',paddingTop:'1rem'}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'#4a5568',marginBottom:'0.5rem'}}>Status</div>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'6px'}}>
                    <span style={{width:'7px',height:'7px',borderRadius:'50%',background:'#3b82f6',display:'inline-block'}}></span>
                    <span style={{fontFamily:"'DM Mono',monospace",fontSize:'12px',color:'#3b82f6'}}>Research Phase</span>
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
                  {SPECS.map((s,i) => (
                    <div key={s.label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'1rem 1.5rem',borderBottom:i<SPECS.length-1?'1px solid rgba(255,255,255,0.07)':'none',gap:'1rem'}}>
                      <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'#4a5568',letterSpacing:'0.1em',textTransform:'uppercase',flexShrink:0}}>{s.label}</span>
                      <span style={{fontFamily:"'DM Mono',monospace",fontSize:'12px',color:'#e8edf5',textAlign:'right'}}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="section-label">Benchmarks</div>
                <h2 className="section-title" style={{fontSize:'clamp(2rem,4vw,3.5rem)'}}>Early Research<br/>Results</h2>
                <p style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',color:'#4a5568',marginBottom:'1.5rem',letterSpacing:'0.05em'}}>Preliminary results from internal evaluation suite. Final benchmarks pending external review.</p>
                <div style={{display:'flex',flexDirection:'column',gap:'1.25rem'}}>
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
            <h2 className="section-title">What NOVA<br/>Can Do</h2>
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

        {/* ARCHITECTURE DIAGRAM */}
        <div style={{borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
          <div className="section-inner" style={{paddingBottom:'4rem'}}>
            <div className="section-label">Architecture</div>
            <h2 className="section-title">How NOVA<br/>Works</h2>
            <p className="section-body" style={{marginBottom:'3rem'}}>NOVA processes complex goals through a 6-layer pipeline, from task ingestion to synthesized output — with safety monitoring at every step.</p>
            <div style={{display:'flex',flexDirection:'column',gap:'2px',background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.07)'}}>
              {ARCHITECTURE.map((a, i) => (
                <div key={a.layer} style={{display:'flex',gap:'2rem',padding:'1.75rem 2rem',background:'#030508',alignItems:'flex-start',transition:'background 0.2s',borderLeft:`3px solid ${i < 2 ? '#06b6d4' : i < 5 ? '#3b82f6' : '#10b981'}`}}
                  onMouseEnter={e=>e.currentTarget.style.background='#080c14'}
                  onMouseLeave={e=>e.currentTarget.style.background='#030508'}>
                  <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'2rem',color:'rgba(99,179,255,0.2)',lineHeight:1,minWidth:'40px'}}>{a.layer}</span>
                  <div>
                    <h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'1.3rem',letterSpacing:'0.04em',marginBottom:'0.4rem',color:'#e8edf5'}}>{a.name}</h3>
                    <p style={{fontSize:'0.88rem',color:'#6b7a94',lineHeight:1.6}}>{a.desc}</p>
                  </div>
                </div>
              ))}
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
                {name:'ALPHA',sub:'Model A1 — Safe Deployment',color:'#3b82f6',status:'Operational',href:'/models/alpha',desc:'Safe, constrained deployment with S-2 safety certification.'},
                {name:'OMEGA',sub:'Model B1 — Robust Cognition',color:'#8b5cf6',status:'In Evaluation',href:'/models/omega',desc:'General reasoning under uncertainty and distribution shift.'},
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
            <div className="section-label" style={{justifyContent:'center'}}>Stay Updated</div>
            <h2 className="section-title">Follow NOVA&apos;s<br/>Development.</h2>
            <p className="section-body" style={{margin:'0 auto 2rem',textAlign:'center'}}>NOVA is currently in active research. Sign up to receive updates on milestones, papers, and early access availability.</p>
            <a href="/#contact" style={{fontFamily:"'DM Mono',monospace",fontSize:'12px',fontWeight:500,letterSpacing:'0.08em',textTransform:'uppercase',background:'#06b6d4',color:'#fff',border:'none',padding:'14px 28px',borderRadius:'8px',cursor:'pointer',textDecoration:'none',display:'inline-block',boxShadow:'0 0 30px rgba(6,182,212,0.3)'}}>Get Research Updates →</a>
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
