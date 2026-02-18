import Head from 'next/head'
import { useState } from 'react'
import { SiteNav, SiteFooter, GLOBAL_STYLES } from '../components/Layout'

const ROLES = [
  {
    id:'research-scientist-alignment',
    title:'Research Scientist — Alignment',
    team:'Alignment', level:'Senior', type:'Full-Time', location:'McKinney, TX',
    color:'#3b82f6',
    summary:'Lead original research on scalable oversight, corrigibility, and constitutional AI methods. Work directly with the ALPHA and OMEGA model programs.',
    responsibilities:['Design and execute alignment research experiments across our model suite','Develop novel training objectives for constitutional AI and scalable oversight','Author and publish papers in top AI safety venues','Collaborate with interpretability team on circuit-level alignment verification','Contribute to model safety certification processes'],
    requirements:['PhD in ML, CS, or related field (or equivalent research experience)','Strong publication record in AI safety, alignment, or adjacent areas','Fluency in PyTorch; experience with large-scale training runs','Deep familiarity with RLHF, constitutional AI, and scalable oversight literature'],
    niceToHave:['Experience with mechanistic interpretability','Background in philosophy of mind or decision theory','Prior work at a frontier AI lab'],
  },
  {
    id:'research-scientist-interpretability',
    title:'Research Scientist — Interpretability',
    team:'Interpretability', level:'Senior', type:'Full-Time', location:'McKinney, TX',
    color:'#8b5cf6',
    summary:'Drive our mechanistic interpretability program. Reverse-engineer the circuits of our frontier models and build the tools to make circuit-level audits standard practice.',
    responsibilities:['Conduct circuit-level analysis of transformer models across the ALPHA/OMEGA suite','Develop and maintain our mechanistic interpretability tooling and methodology','Design and execute deceptive alignment detection experiments','Publish findings openly to contribute to the global interpretability field','Collaborate with alignment team on circuit-based intervention strategies'],
    requirements:['PhD in ML, CS, mathematics, or related field','Deep expertise in mechanistic interpretability — circuits, activation patching, causal tracing','Strong PyTorch and scientific Python skills','Familiarity with transformer internals at the weight and attention level'],
    niceToHave:['Experience with neuroscience or cognitive science','Background in formal methods or verification','Prior publications in interpretability venues'],
  },
  {
    id:'ml-engineer-infrastructure',
    title:'ML Engineer — Training Infrastructure',
    team:'Engineering', level:'Senior', type:'Full-Time', location:'McKinney, TX',
    color:'#f59e0b',
    summary:'Build and maintain the distributed training infrastructure that powers our frontier model research. Own the systems that run billion-parameter experiments.',
    responsibilities:['Design and operate large-scale distributed training infrastructure','Build experiment tracking, reproducibility, and artifact management systems','Optimize training efficiency across GPU clusters','Collaborate with research teams to translate research ideas into scalable training runs','Develop and maintain RLHF training pipelines'],
    requirements:['5+ years ML engineering experience','Deep expertise in distributed training frameworks (FSDP, DeepSpeed, Megatron)','Strong Python, CUDA, and systems programming skills','Experience managing large GPU clusters and cloud training infrastructure'],
    niceToHave:['Experience with RLHF pipeline engineering','Background in compiler optimization or low-level CUDA','Prior experience at a frontier AI lab'],
  },
  {
    id:'research-engineer-evaluations',
    title:'Research Engineer — Evaluations',
    team:'Evaluation', level:'Mid-Senior', type:'Full-Time / Remote', location:'McKinney, TX or Remote',
    color:'#10b981',
    summary:'Build the evaluation infrastructure for safety-critical AI systems. Design adversarial benchmarks and run structured red-teaming programs across our model suite.',
    responsibilities:['Design and implement adversarial evaluation suites for safety-critical behaviors','Run structured red-teaming programs across ALPHA, OMEGA, and NOVA','Build and maintain our evaluation infrastructure and automated testing pipelines','Analyze evaluation results and translate findings into research insights','Collaborate on open-source benchmark releases like SAFE-AGENT'],
    requirements:['3+ years experience in ML research or engineering','Strong programming skills in Python and familiarity with evaluation methodology','Experience designing and running evaluations for language models','Systematic, detail-oriented approach to adversarial testing'],
    niceToHave:['Background in formal verification or testing methodology','Experience with agentic AI evaluation','Prior red-teaming or security research experience'],
  },
  {
    id:'research-intern-safety',
    title:'Research Intern — AGI Safety',
    team:'Research', level:'PhD Student', type:'Internship (3–6 months)', location:'McKinney, TX',
    color:'#06b6d4',
    summary:'Join our research team for a fully-funded research internship. Work on a substantive safety research project with direct mentorship from senior researchers.',
    responsibilities:['Execute an original research project in AI safety under senior researcher mentorship','Present weekly research updates and participate in team research discussions','Author a paper or technical report based on your internship research','Contribute to ongoing lab research programs as appropriate'],
    requirements:['Active PhD student in ML, CS, or related field','Strong research background with at least one prior research paper or project','Clear interest in AI safety and alignment research','Ability to work in McKinney, TX for the duration of the internship'],
    niceToHave:['Prior safety research experience','Familiarity with mechanistic interpretability or alignment literature','Strong theoretical ML background'],
  },
]

const TEAMS = ['All','Alignment','Interpretability','Engineering','Evaluation','Research']

export default function Careers() {
  const [teamFilter, setTeamFilter] = useState('All')
  const [expanded, setExpanded] = useState(null)
  const filtered = teamFilter === 'All' ? ROLES : ROLES.filter(r => r.team === teamFilter)

  return (
    <>
      <Head>
        <title>Careers — Texas AGI Labs</title>
        <meta name="description" content="Join Texas AGI Labs. Open positions in AI alignment, interpretability, ML engineering, and evaluations." />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&family=Lora:ital,wght@0,400;1,400&display=swap" rel="stylesheet" />
      </Head>

      <SiteNav />

      <div style={{background:'#0d1b2e',minHeight:'100vh',paddingTop:'64px'}}>

        {/* HERO */}
        <div style={{position:'relative',minHeight:'55vh',display:'flex',alignItems:'flex-end',overflow:'hidden',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
          <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 60% 80% at 10% 60%,rgba(16,185,129,0.07) 0%,rgba(0,0,0,1) 70%)'}} />
          <div style={{position:'absolute',inset:0,pointerEvents:'none',opacity:0.035,backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",backgroundSize:'180px 180px'}} />
          <div style={{position:'relative',zIndex:2,padding:'6vw',paddingBottom:'4rem',width:'100%',maxWidth:'1200px'}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(16,185,129,0.8)',marginBottom:'1rem'}}>Join the Team</div>
            <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(4rem,10vw,10rem)',lineHeight:0.88,color:'#fff',marginBottom:'2rem'}}>
              Work on What<br/>
              <span style={{background:'linear-gradient(135deg,#10b981,#06b6d4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Matters Most.</span>
            </h1>
            <p style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'clamp(1rem,1.8vw,1.2rem)',color:'rgba(255,255,255,0.45)',lineHeight:1.8,maxWidth:'540px'}}>
              We are a small, focused team working on the most important problem of our time. Every role here has direct impact on how safely AGI arrives.
            </p>
          </div>
        </div>

        {/* WHY JOIN */}
        <div style={{borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1px',background:'rgba(255,255,255,0.06)'}}>
            {[
              {t:'Mission-Driven',b:'Every project connects directly to AGI safety. No side quests.',c:'#3b82f6'},
              {t:'Research-First',b:'We publish openly. Your work contributes to the global field.',c:'#8b5cf6'},
              {t:'Small & Focused',b:'5 researchers. No bureaucracy. High leverage on every decision.',c:'#10b981'},
              {t:'Competitive Package',b:'Top-of-market comp, equity, unlimited PTO, $5K learning budget.',c:'#f59e0b'},
            ].map(v => (
              <div key={v.t} style={{padding:'2.5rem 2rem',background:'#0d1b2e'}}>
                <div style={{width:'4px',height:'24px',background:v.c,marginBottom:'1.5rem',borderRadius:'2px'}} />
                <h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'1.3rem',letterSpacing:'0.04em',color:'#fff',marginBottom:'0.5rem'}}>{v.t}</h3>
                <p style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'0.9rem',color:'rgba(255,255,255,0.35)',lineHeight:1.7}}>{v.b}</p>
              </div>
            ))}
          </div>
        </div>

        {/* OPEN ROLES */}
        <div style={{maxWidth:'1200px',margin:'0 auto',padding:'4rem 6vw'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'2.5rem',flexWrap:'wrap',gap:'1rem'}}>
            <div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginBottom:'0.5rem'}}>Open Positions</div>
              <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(2.5rem,5vw,4.5rem)',lineHeight:0.9,color:'#fff'}}>{filtered.length} Open Role{filtered.length !== 1 ? 's' : ''}.</h2>
            </div>
            <div style={{display:'flex',gap:'1px',background:'rgba(255,255,255,0.06)',borderRadius:'6px',overflow:'hidden'}}>
              {TEAMS.map(t => (
                <button key={t} onClick={()=>setTeamFilter(t)} style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.1em',textTransform:'uppercase',padding:'9px 16px',border:'none',cursor:'pointer',transition:'all 0.2s',background:teamFilter===t?'#3b82f6':'transparent',color:teamFilter===t?'#fff':'rgba(255,255,255,0.35)'}}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:'1px',background:'rgba(255,255,255,0.06)'}}>
            {filtered.map(role => (
              <div key={role.id} style={{background:expanded===role.id?'#0a0d14':'#000',transition:'background 0.2s',borderLeft:`3px solid ${expanded===role.id?role.color:'transparent'}`}}>
                <div onClick={()=>setExpanded(expanded===role.id?null:role.id)}
                  style={{padding:'2.5rem',cursor:'pointer'}}
                  onMouseEnter={e=>{ if(expanded!==role.id) e.currentTarget.parentElement.style.background='#08090f' }}
                  onMouseLeave={e=>{ if(expanded!==role.id) e.currentTarget.parentElement.style.background='#000' }}>
                  <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:'1rem',flexWrap:'wrap'}}>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',gap:'0.75rem',alignItems:'center',marginBottom:'1rem',flexWrap:'wrap'}}>
                        <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',padding:'3px 10px',borderRadius:'3px',background:`${role.color}15`,color:role.color,border:`1px solid ${role.color}40`}}>{role.team}</span>
                        <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'rgba(255,255,255,0.25)',padding:'3px 10px',borderRadius:'3px',border:'1px solid rgba(255,255,255,0.08)'}}>{role.level}</span>
                        <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'rgba(255,255,255,0.25)',padding:'3px 10px',borderRadius:'3px',border:'1px solid rgba(255,255,255,0.08)'}}>{role.type}</span>
                        <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'rgba(255,255,255,0.2)'}}>{role.location}</span>
                      </div>
                      <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(1.5rem,2.5vw,2.2rem)',letterSpacing:'0.02em',color:'#fff',marginBottom:'0.75rem'}}>{role.title}</h2>
                      <p style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'0.95rem',color:'rgba(255,255,255,0.4)',lineHeight:1.7,maxWidth:'640px'}}>{role.summary}</p>
                    </div>
                    <span style={{fontFamily:"'DM Mono',monospace",fontSize:'12px',color:role.color,transition:'transform 0.2s',display:'inline-block',transform:expanded===role.id?'rotate(180deg)':'rotate(0)',flexShrink:0,marginTop:'0.5rem'}}>↓</span>
                  </div>
                </div>

                {expanded === role.id && (
                  <div style={{padding:'0 2.5rem 2.5rem',borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:'2rem'}}>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'2rem',marginBottom:'2rem'}}>
                      <div>
                        <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',color:role.color,marginBottom:'1rem'}}>Responsibilities</div>
                        <ul style={{listStyle:'none',padding:0,display:'flex',flexDirection:'column',gap:'0.6rem'}}>
                          {role.responsibilities.map((r,i) => (
                            <li key={i} style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'0.88rem',color:'rgba(255,255,255,0.45)',lineHeight:1.6,display:'flex',gap:'0.5rem'}}>
                              <span style={{color:role.color,flexShrink:0,marginTop:'2px'}}>–</span>{r}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',color:role.color,marginBottom:'1rem'}}>Requirements</div>
                        <ul style={{listStyle:'none',padding:0,display:'flex',flexDirection:'column',gap:'0.6rem'}}>
                          {role.requirements.map((r,i) => (
                            <li key={i} style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'0.88rem',color:'rgba(255,255,255,0.45)',lineHeight:1.6,display:'flex',gap:'0.5rem'}}>
                              <span style={{color:role.color,flexShrink:0,marginTop:'2px'}}>–</span>{r}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginBottom:'1rem'}}>Nice to Have</div>
                        <ul style={{listStyle:'none',padding:0,display:'flex',flexDirection:'column',gap:'0.6rem'}}>
                          {role.niceToHave.map((r,i) => (
                            <li key={i} style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'0.88rem',color:'rgba(255,255,255,0.25)',lineHeight:1.6,display:'flex',gap:'0.5rem'}}>
                              <span style={{color:'rgba(255,255,255,0.2)',flexShrink:0,marginTop:'2px'}}>–</span>{r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <a href={`mailto:careers@texasagilabs.com?subject=Application: ${role.title}`}
                      style={{display:'inline-block',fontFamily:"'DM Mono',monospace",fontSize:'11px',letterSpacing:'0.12em',textTransform:'uppercase',color:'#fff',background:role.color,padding:'12px 28px',borderRadius:'4px',textDecoration:'none',transition:'opacity 0.2s'}}
                      onMouseEnter={e=>e.currentTarget.style.opacity='0.8'}
                      onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
                      Apply for This Role →
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* GENERAL CTA */}
        <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',padding:'6rem 6vw',textAlign:'center',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 50% 80% at 50% 50%,rgba(16,185,129,0.04) 0%,transparent 70%)'}} />
          <div style={{position:'relative',zIndex:1}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(16,185,129,0.7)',marginBottom:'1rem'}}>General Applications</div>
            <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(2.5rem,5vw,5rem)',lineHeight:0.9,color:'#fff',marginBottom:'2rem'}}>Don't See<br/>Your Role?</h2>
            <p style={{fontFamily:"'Lora',serif",fontStyle:'italic',color:'rgba(255,255,255,0.4)',fontSize:'1.05rem',marginBottom:'3rem',maxWidth:'440px',margin:'0 auto 3rem'}}>Send us a general application — we consider strong candidates for roles we have not yet posted.</p>
            <a href="mailto:careers@texasagilabs.com?subject=General Application"
              style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',letterSpacing:'0.12em',textTransform:'uppercase',color:'#fff',background:'#10b981',padding:'13px 32px',borderRadius:'4px',textDecoration:'none',transition:'opacity 0.2s'}}
              onMouseEnter={e=>e.currentTarget.style.opacity='0.8'}
              onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
              Send General Application →
            </a>
          </div>
        </div>

        <SiteFooter />
      </div>
      <style jsx global>{GLOBAL_STYLES}</style>
    </>
  )
}
