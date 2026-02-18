import Head from 'next/head'
import { useState } from 'react'

const ROLES = [
  {
    id: 'res-scientist-alignment',
    title: 'Research Scientist — Alignment',
    team: 'Alignment',
    location: 'McKinney, TX',
    type: 'Full-Time',
    level: 'Senior',
    color: '#3b82f6',
    posted: 'Feb 2026',
    description: 'Lead original research on scalable oversight, value learning, and constitutional AI methods. You will design and run experiments, publish findings, and directly shape our alignment research agenda.',
    responsibilities: [
      'Design and execute empirical alignment research programs',
      'Develop novel methods for scalable human oversight of frontier models',
      'Publish peer-reviewed work at top ML and AI safety venues',
      'Collaborate with interpretability and evaluation teams on cross-cutting safety questions',
      'Mentor junior researchers and research engineers',
    ],
    requirements: [
      'PhD in Machine Learning, Computer Science, or related field',
      '3+ years of post-doctoral or industry research experience',
      'Strong publication record at NeurIPS, ICML, ICLR, or equivalent',
      'Deep familiarity with RLHF, Constitutional AI, or related alignment methods',
      'Demonstrated ability to independently drive research projects to completion',
    ],
    nice: [
      'Experience with large-scale distributed training',
      'Background in decision theory, philosophy of mind, or formal verification',
      'Prior work on deceptive alignment or emergent behavior',
    ],
  },
  {
    id: 'res-scientist-interp',
    title: 'Research Scientist — Interpretability',
    team: 'Interpretability',
    location: 'McKinney, TX',
    type: 'Full-Time',
    level: 'Senior',
    color: '#8b5cf6',
    posted: 'Feb 2026',
    description: 'Advance the science of mechanistic interpretability in large transformer models. You will reverse-engineer neural circuits, develop new interpretability tools, and produce publishable findings that directly inform our safety work.',
    responsibilities: [
      'Conduct mechanistic analysis of attention heads, MLP layers, and emergent circuits',
      'Build interpretability tooling used across the research organization',
      'Identify and characterize features associated with unsafe or deceptive behavior',
      'Translate interpretability findings into actionable alignment interventions',
      'Publish research at top venues and contribute to the open interpretability community',
    ],
    requirements: [
      'PhD in Machine Learning, Neuroscience, or related field',
      'Hands-on experience with activation patching, probing, or circuit analysis',
      'Strong Python and PyTorch skills',
      'Publication record in interpretability, representation learning, or related areas',
      'Ability to communicate complex mechanistic findings clearly',
    ],
    nice: [
      'Experience with sparse autoencoders or dictionary learning',
      'Familiarity with TransformerLens or similar interpretability frameworks',
      'Background in cognitive science or computational neuroscience',
    ],
  },
  {
    id: 'ml-engineer-training',
    title: 'ML Engineer — Training Infrastructure',
    team: 'Engineering',
    location: 'McKinney, TX',
    type: 'Full-Time',
    level: 'Senior',
    color: '#06b6d4',
    posted: 'Jan 2026',
    description: 'Build and maintain the training infrastructure that powers our frontier model research. You will work closely with researchers to implement novel training objectives, optimize distributed training pipelines, and ensure reproducibility across experiments.',
    responsibilities: [
      'Design and maintain large-scale distributed training systems',
      'Implement custom training objectives and loss functions for alignment research',
      'Optimize GPU/TPU utilization and reduce training costs',
      'Build experiment tracking, evaluation, and reproducibility tooling',
      'Collaborate with researchers to rapidly prototype new training approaches',
    ],
    requirements: [
      'BS/MS in Computer Science or Engineering',
      '4+ years of experience in ML engineering or systems',
      'Deep expertise in PyTorch, JAX, or equivalent deep learning frameworks',
      'Experience with distributed training (FSDP, DeepSpeed, Megatron-LM)',
      'Strong software engineering fundamentals',
    ],
    nice: [
      'Experience training models at 7B+ parameter scale',
      'Familiarity with RLHF training pipelines',
      'Background in compiler optimization or hardware-aware ML',
    ],
  },
  {
    id: 'res-engineer-evals',
    title: 'Research Engineer — Evaluations',
    team: 'Evaluation',
    location: 'McKinney, TX / Remote',
    type: 'Full-Time',
    level: 'Mid-Senior',
    color: '#f59e0b',
    posted: 'Jan 2026',
    description: 'Design and implement rigorous capability and safety evaluations for our model suite. You will build benchmark infrastructure, design red-teaming protocols, and produce evaluation reports that drive deployment decisions.',
    responsibilities: [
      'Design novel evaluations for dangerous capabilities, deceptive behavior, and corrigibility',
      'Build and maintain evaluation harnesses used across the model lifecycle',
      'Run structured red-teaming exercises and document findings',
      'Collaborate with alignment researchers to translate theoretical risks into testable evals',
      'Contribute to the open evaluation ecosystem and publish benchmark papers',
    ],
    requirements: [
      'BS/MS in Computer Science, Statistics, or related field',
      '2+ years of experience in ML evaluation or red-teaming',
      'Strong Python skills and experience with evaluation frameworks',
      'Systematic, detail-oriented approach to experimental design',
      'Experience with LLM APIs and prompt engineering',
    ],
    nice: [
      'Background in software testing or formal verification',
      'Familiarity with ARC-AGI, HELM, or BIG-Bench evaluation suites',
      'Experience with adversarial ML or security research',
    ],
  },
  {
    id: 'research-intern',
    title: 'Research Intern — AGI Safety',
    team: 'Research',
    location: 'McKinney, TX',
    type: 'Internship',
    level: 'PhD Student',
    color: '#10b981',
    posted: 'Feb 2026',
    description: 'Spend 3–6 months embedded with our research team working on a defined safety research project. Interns publish, present, and are considered for full-time roles at the end of their term.',
    responsibilities: [
      'Conduct original research under the mentorship of a senior researcher',
      'Present findings at internal research meetings and external venues',
      'Contribute to ongoing alignment or interpretability research programs',
      'Write up results for publication or technical report',
    ],
    requirements: [
      'Currently enrolled in a PhD program in ML, CS, or related field',
      'Demonstrated research interest in AI safety, alignment, or interpretability',
      'Strong mathematical background and coding skills',
      'Available for at least 12 weeks full-time',
    ],
    nice: [
      'Prior internship at an AI safety organization',
      'Existing work on alignment, interpretability, or robustness',
      'Familiarity with the mechanistic interpretability or scalable oversight literature',
    ],
  },
]

const TEAM_COLORS = {
  'Alignment': '#3b82f6',
  'Interpretability': '#8b5cf6',
  'Engineering': '#06b6d4',
  'Evaluation': '#f59e0b',
  'Research': '#10b981',
}

const VALUES = [
  { icon: '⚖️', title: 'Mission-Driven', body: 'We work on what matters most — ensuring AGI benefits humanity. Every role directly advances that goal.' },
  { icon: '🔬', title: 'Research-First', body: 'Publishing is core to our identity. We give researchers time and resources to do deep, careful work.' },
  { icon: '🌍', title: 'Radically Open', body: 'We share our findings publicly, including failures. You will work in the open and build reputation in the field.' },
  { icon: '🏗️', title: 'Small & High-Leverage', body: 'We are a lean team where every person has outsized impact. No bureaucracy, no politics.' },
]

const BENEFITS = [
  'Competitive salary + equity',
  'Full medical, dental & vision',
  'Unlimited PTO',
  '$5,000 annual conference & training budget',
  'Top-tier compute access',
  'Remote-friendly culture',
  'Relocation assistance',
  'Annual team retreat',
]

export default function Careers() {
  const [expanded, setExpanded] = useState(null)
  const [filter, setFilter] = useState('All')

  const teams = ['All', ...Object.keys(TEAM_COLORS)]
  const filtered = filter === 'All' ? ROLES : ROLES.filter(r => r.team === filter)

  return (
    <>
      <Head>
        <title>Careers — Texas AGI Labs</title>
        <meta name="description" content="Join Texas AGI Labs. We are hiring research scientists, ML engineers, and interns to work on frontier AGI safety research." />
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
        <div style={{position:'relative',overflow:'hidden',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
          <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'800px',height:'400px',background:'radial-gradient(ellipse,rgba(59,130,246,0.1) 0%,rgba(139,92,246,0.05) 40%,transparent 70%)',pointerEvents:'none'}} />
          <div className="section-inner" style={{paddingBottom:'4rem'}}>
            <div className="section-label">Careers</div>
            <h1 className="section-title" style={{fontSize:'clamp(3rem,7vw,7rem)'}}>Work on What<br/><span style={{background:'linear-gradient(135deg,#3b82f6,#06b6d4,#8b5cf6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Matters Most</span></h1>
            <p className="section-body" style={{maxWidth:'560px'}}>We are building the team that will solve AGI alignment. If you want to work on the most important problem in the history of intelligence — alongside people who feel the same urgency — this is the place.</p>
            <div style={{display:'flex',gap:'1rem',marginTop:'2.5rem',flexWrap:'wrap'}}>
              <a href="#roles" className="btn-primary">View Open Roles</a>
              <a href="/#contact" className="btn-ghost">Talk to Us First →</a>
            </div>

            {/* Quick stats */}
            <div style={{display:'flex',gap:'3rem',marginTop:'4rem',flexWrap:'wrap'}}>
              {[['5','Open Roles'],['3','Research Teams'],['McKinney, TX','Headquarters']].map(([n,l]) => (
                <div key={l}>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'2.5rem',lineHeight:1,background:'linear-gradient(135deg,#3b82f6,#06b6d4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{n}</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',color:'#6b7a94',marginTop:'4px'}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* WHY JOIN */}
        <div style={{background:'#0a0d14',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
          <div className="section-inner" style={{paddingBottom:'4rem'}}>
            <div className="section-label">Why Texas AGI Labs</div>
            <h2 className="section-title">Built Different.<br/>By Design.</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:'1px',background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.07)',marginTop:'3rem'}}>
              {VALUES.map(v => (
                <div key={v.title} style={{background:'#0a0d14',padding:'2.5rem',transition:'background 0.2s'}}
                  onMouseEnter={e=>e.currentTarget.style.background='#0f1320'}
                  onMouseLeave={e=>e.currentTarget.style.background='#0a0d14'}>
                  <div style={{fontSize:'2rem',marginBottom:'1rem'}}>{v.icon}</div>
                  <h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'1.4rem',letterSpacing:'0.04em',marginBottom:'0.75rem'}}>{v.title}</h3>
                  <p style={{fontSize:'0.88rem',color:'#6b7a94',lineHeight:1.7}}>{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BENEFITS */}
        <div style={{borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
          <div className="section-inner" style={{paddingBottom:'4rem'}}>
            <div className="section-label">Benefits</div>
            <h2 className="section-title">We Take Care<br/>of Our People.</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:'1rem',marginTop:'3rem'}}>
              {BENEFITS.map(b => (
                <div key={b} style={{display:'flex',alignItems:'center',gap:'1rem',padding:'1.25rem 1.5rem',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'6px',background:'#0a0d14'}}>
                  <span style={{color:'#3b82f6',fontSize:'1rem'}}>◈</span>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:'12px',color:'#e8edf5',letterSpacing:'0.03em'}}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* OPEN ROLES */}
        <div id="roles">
          <div className="section-inner">
            <div className="section-label">Open Positions</div>
            <h2 className="section-title">{filtered.length} Open<br/>Role{filtered.length !== 1 ? 's' : ''}</h2>

            {/* Filter tabs */}
            <div style={{display:'flex',gap:'0.5rem',marginTop:'2rem',marginBottom:'3rem',flexWrap:'wrap'}}>
              {teams.map(team => (
                <button key={team} onClick={() => setFilter(team)}
                  style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',padding:'6px 14px',borderRadius:'4px',border:'1px solid',cursor:'pointer',transition:'all 0.2s',
                    background: filter===team ? (TEAM_COLORS[team]||'#3b82f6') : 'transparent',
                    color: filter===team ? '#fff' : (TEAM_COLORS[team]||'#6b7a94'),
                    borderColor: filter===team ? (TEAM_COLORS[team]||'#3b82f6') : 'rgba(255,255,255,0.1)',
                  }}>
                  {team}
                </button>
              ))}
            </div>

            {/* Role cards */}
            <div style={{display:'flex',flexDirection:'column',gap:'2px',background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.07)'}}>
              {filtered.map(role => (
                <div key={role.id}>
                  {/* Role header — always visible */}
                  <div onClick={() => setExpanded(expanded === role.id ? null : role.id)}
                    style={{background: expanded===role.id ? '#0a0d14' : '#030508',padding:'2rem 2.5rem',cursor:'pointer',transition:'background 0.2s',borderTop:`3px solid ${expanded===role.id ? role.color : 'transparent'}`}}
                    onMouseEnter={e=>e.currentTarget.style.background='#080c14'}
                    onMouseLeave={e=>e.currentTarget.style.background=expanded===role.id?'#0a0d14':'#030508'}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'1rem'}}>
                      <div style={{flex:1}}>
                        <div style={{display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'0.5rem',flexWrap:'wrap'}}>
                          <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',padding:'3px 8px',borderRadius:'3px',background:`${role.color}18`,color:role.color,border:`1px solid ${role.color}44`}}>{role.team}</span>
                          <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'#4a5568',letterSpacing:'0.08em',textTransform:'uppercase'}}>{role.type}</span>
                          <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'#4a5568',letterSpacing:'0.08em',textTransform:'uppercase'}}>{role.level}</span>
                          <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'#4a5568',marginLeft:'auto'}}>Posted {role.posted}</span>
                        </div>
                        <h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(1.4rem,2.5vw,1.8rem)',letterSpacing:'0.03em',color:'#e8edf5'}}>{role.title}</h3>
                        <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginTop:'0.4rem'}}>
                          <span style={{color:'#4a5568',fontSize:'12px'}}>📍</span>
                          <span style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',color:'#6b7a94'}}>{role.location}</span>
                        </div>
                      </div>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:'18px',color:role.color,transition:'transform 0.2s',transform:expanded===role.id?'rotate(180deg)':'rotate(0deg)'}}>↓</div>
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {expanded === role.id && (
                    <div style={{background:'#0a0d14',borderTop:'1px solid rgba(255,255,255,0.07)',padding:'2.5rem'}}>
                      <p style={{fontSize:'0.95rem',color:'#9aa3b2',lineHeight:1.8,maxWidth:'720px',marginBottom:'2.5rem'}}>{role.description}</p>

                      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'2.5rem',marginBottom:'2.5rem'}}>
                        <div>
                          <h4 style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:role.color,marginBottom:'1.25rem'}}>Responsibilities</h4>
                          <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'0.75rem'}}>
                            {role.responsibilities.map(r => (
                              <li key={r} style={{display:'flex',gap:'0.75rem',alignItems:'flex-start',fontSize:'0.88rem',color:'#6b7a94',lineHeight:1.6}}>
                                <span style={{color:role.color,flexShrink:0,marginTop:'2px'}}>→</span>{r}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:role.color,marginBottom:'1.25rem'}}>Requirements</h4>
                          <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'0.75rem'}}>
                            {role.requirements.map(r => (
                              <li key={r} style={{display:'flex',gap:'0.75rem',alignItems:'flex-start',fontSize:'0.88rem',color:'#6b7a94',lineHeight:1.6}}>
                                <span style={{color:role.color,flexShrink:0,marginTop:'2px'}}>◈</span>{r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div style={{marginBottom:'2.5rem'}}>
                        <h4 style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:'#4a5568',marginBottom:'1rem'}}>Nice to Have</h4>
                        <div style={{display:'flex',gap:'0.75rem',flexWrap:'wrap'}}>
                          {role.nice.map(n => (
                            <span key={n} style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.08em',padding:'4px 10px',borderRadius:'4px',border:'1px solid rgba(255,255,255,0.07)',color:'#4a5568'}}>{n}</span>
                          ))}
                        </div>
                      </div>

                      <a href={`mailto:careers@texasagilabs.com?subject=Application: ${role.title}`}
                        style={{fontFamily:"'DM Mono',monospace",fontSize:'12px',fontWeight:500,letterSpacing:'0.08em',textTransform:'uppercase',background:role.color,color:'#fff',border:'none',padding:'14px 32px',borderRadius:'8px',cursor:'pointer',textDecoration:'none',display:'inline-block',transition:'opacity 0.2s'}}
                        onMouseEnter={e=>e.currentTarget.style.opacity='0.85'}
                        onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
                        Apply for This Role →
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* No roles match */}
            {filtered.length === 0 && (
              <div style={{textAlign:'center',padding:'4rem',color:'#4a5568',fontFamily:"'DM Mono',monospace",fontSize:'12px',letterSpacing:'0.1em'}}>
                No open roles in this team right now. Check back soon.
              </div>
            )}
          </div>
        </div>

        {/* GENERAL APP CTA */}
        <div style={{background:'#0a0d14',borderTop:'1px solid rgba(255,255,255,0.07)'}}>
          <div className="section-inner" style={{textAlign:'center'}}>
            <div className="section-label" style={{justifyContent:'center'}}>Don&apos;t See Your Role?</div>
            <h2 className="section-title">We&apos;re Always<br/>Looking for Exceptional People.</h2>
            <p className="section-body" style={{margin:'0 auto 2rem',textAlign:'center'}}>If you believe your work belongs at the frontier of AGI safety, send us a note. We read every message.</p>
            <a href="mailto:careers@texasagilabs.com?subject=General Application" className="btn-primary">Send a General Application →</a>
          </div>
        </div>

        {/* FOOTER */}
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
            <div className="footer-col"><h4>Models</h4><ul><li><a href="#">ALPHA A1</a></li><li><a href="#">OMEGA B1</a></li><li><a href="#">NOVA C1</a></li></ul></div>
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
