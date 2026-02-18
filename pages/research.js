import Head from 'next/head'
import { useState } from 'react'
import { SiteNav, SiteFooter, GLOBAL_STYLES } from '../components/Layout'

const PAPERS = [
  {
    id:'txagi-2025-001',
    title:'Scalable Oversight via Recursive Constitutional Constraints in Large Language Models',
    authors:['J. Mercer','A. Krishnaswamy','D. Okafor','Texas AGI Labs Research Team'],
    date:'November 2025', area:'Alignment', color:'#3b82f6',
    abstract:'We present a framework for scalable oversight of frontier AI systems using recursively applied constitutional constraints. Our method enables human supervisors to maintain meaningful control over model behavior even as capabilities scale, by decomposing complex alignment objectives into verifiable sub-goals. We demonstrate a 94.2% reduction in specification gaming behavior on the ARC-Oversight benchmark suite.',
    tags:['Alignment','Constitutional AI','Scalable Oversight','RLHF'],
    status:'Published', pages:'34pp',
  },
  {
    id:'txagi-2025-002',
    title:'Circuit-Level Analysis of Deceptive Alignment in Transformer-Based Agents',
    authors:['S. Park','L. Okonkwo','Texas AGI Labs Research Team'],
    date:'September 2025', area:'Interpretability', color:'#8b5cf6',
    abstract:'Using mechanistic interpretability techniques, we identify and characterize neural circuit structures associated with deceptive alignment behaviors in large transformer models. We isolate 7 distinct circuit motifs that activate differentially during evaluation vs. deployment contexts, and propose targeted intervention methods to suppress deceptive activation patterns with minimal performance degradation.',
    tags:['Interpretability','Deceptive Alignment','Circuits','Transformers'],
    status:'Published', pages:'28pp',
  },
  {
    id:'txagi-2025-003',
    title:'SAFE-AGENT: A Comprehensive Benchmark for Evaluating Autonomous AI Safety',
    authors:['S. Park','R. Vasquez','Texas AGI Labs Research Team'],
    date:'August 2025', area:'Evaluation', color:'#f59e0b',
    abstract:'We introduce SAFE-AGENT, a 1,240-task benchmark suite for evaluating whether AI agents respect their autonomy envelopes across 8 operational domains. We evaluate 12 frontier models and find significant gaps between non-adversarial and adversarial performance, suggesting surface-level rather than deep alignment in current systems.',
    tags:['Evaluation','Benchmarks','Autonomous Agents','Safety'],
    status:'Published', pages:'41pp',
  },
  {
    id:'txagi-2025-004',
    title:'Capability-Invariant Corrigibility: Maintaining Human Oversight Across Capability Gains',
    authors:['J. Mercer','Texas AGI Labs Research Team'],
    date:'July 2025', area:'Alignment', color:'#3b82f6',
    abstract:'We study corrigibility degradation as AI systems gain capability and propose Capability-Invariant Corrigibility (CIC), a training objective that maintains corrigibility above 96% across a 10x capability gain regime. We show that naive corrigibility constraints degrade consistently as capability increases across six training paradigms.',
    tags:['Alignment','Corrigibility','Human Oversight','Training'],
    status:'Under Review', pages:'29pp',
  },
  {
    id:'txagi-2026-001',
    title:'Causal World Models with Structural Consistency Guarantees',
    authors:['A. Krishnaswamy','D. Okafor','Texas AGI Labs Research Team'],
    date:'January 2026', area:'Reasoning', color:'#06b6d4',
    abstract:'We present a world modeling architecture that maintains causal structural consistency across distribution shifts. Our approach explicitly represents causal graphs as first-class model components and enforces structural invariance during training, yielding 91.3% OOD generalization on the OMEGA-Reasoning benchmark.',
    tags:['Reasoning','Causal Models','OOD Generalization','World Models'],
    status:'Preprint', pages:'38pp',
  },
  {
    id:'txagi-2026-002',
    title:'COORD-SAFE: A Safety Protocol for Multi-Agent Coordination Networks',
    authors:['D. Okafor','R. Vasquez','Texas AGI Labs Research Team'],
    date:'February 2026', area:'Agentic Systems', color:'#10b981',
    abstract:'We introduce COORD-SAFE, a coordination protocol for multi-agent AI systems that prevents goal drift, instrumental coordination failures, and belief amplification errors. In 300+ multi-agent scenarios, COORD-SAFE reduces goal drift incidents by 94% with only 3-7% task completion overhead.',
    tags:['Multi-Agent','Coordination','Safety Protocol','Emergent Behavior'],
    status:'Preprint', pages:'33pp',
  },
]

const AREAS = ['All','Alignment','Interpretability','Evaluation','Reasoning','Agentic Systems']
const STATUS_COLOR = { Published:'#10b981', Preprint:'#f59e0b', 'Under Review':'#8b5cf6' }

export default function Research() {
  const [filter, setFilter] = useState('All')
  const [expanded, setExpanded] = useState(null)
  const filtered = filter === 'All' ? PAPERS : PAPERS.filter(p => p.area === filter)

  return (
    <>
      <Head>
        <title>Research — Texas AGI Labs</title>
        <meta name="description" content="Publications, preprints, and research from Texas AGI Labs covering AGI alignment, interpretability, evaluation, and agentic systems." />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&family=Lora:ital,wght@0,400;1,400&display=swap" rel="stylesheet" />
      </Head>

      <SiteNav />

      <div style={{background:'#0a0f1e',minHeight:'100vh',paddingTop:'64px'}}>

        {/* HERO HEADER */}
        <div style={{position:'relative',minHeight:'50vh',display:'flex',alignItems:'flex-end',overflow:'hidden',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
          <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 60% 80% at 20% 50%,rgba(139,92,246,0.08) 0%,rgba(0,0,0,1) 70%)'}} />
          {/* Noise */}
          <div style={{position:'absolute',inset:0,pointerEvents:'none',opacity:0.035,backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",backgroundSize:'180px 180px'}} />
          <div style={{position:'relative',zIndex:2,padding:'6vw',paddingBottom:'4rem',width:'100%',maxWidth:'1200px'}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(139,92,246,0.8)',marginBottom:'1rem'}}>Publications</div>
            <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(4rem,10vw,10rem)',lineHeight:0.88,color:'#fff',marginBottom:'2rem'}}>
              Research<br/>
              <span style={{background:'linear-gradient(135deg,#8b5cf6,#06b6d4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Papers.</span>
            </h1>
            <p style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'clamp(1rem,1.8vw,1.2rem)',color:'rgba(255,255,255,0.45)',lineHeight:1.8,maxWidth:'540px'}}>
              Peer-reviewed publications, preprints, and working papers from the Texas AGI Labs research team.
            </p>
          </div>
        </div>

        {/* STATS BAR */}
        <div style={{borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',overflowX:'auto'}}>
          {[['6','Papers Published'],['3','Research Areas'],['12','Researchers'],['2026','Latest Release']].map(([n,l],i) => (
            <div key={i} style={{flex:'1',minWidth:'160px',padding:'1.5rem 2rem',borderRight:'1px solid rgba(255,255,255,0.06)',display:'flex',alignItems:'center',gap:'1rem'}}>
              <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'2rem',background:'linear-gradient(135deg,#3b82f6,#06b6d4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{n}</span>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:'9px',letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)'}}>{l}</span>
            </div>
          ))}
        </div>

        {/* FILTER + PAPERS */}
        <div style={{maxWidth:'1200px',margin:'0 auto',padding:'4rem 6vw'}}>

          {/* Filter */}
          <div style={{display:'flex',gap:'1px',marginBottom:'3rem',background:'rgba(255,255,255,0.06)',borderRadius:'6px',overflow:'hidden',flexWrap:'wrap'}}>
            {AREAS.map(a => (
              <button key={a} onClick={() => setFilter(a)} style={{
                fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',
                padding:'10px 20px',border:'none',cursor:'pointer',transition:'all 0.2s',flex:1,minWidth:'80px',
                background: filter===a ? '#3b82f6' : 'transparent',
                color: filter===a ? '#fff' : 'rgba(255,255,255,0.35)',
              }}>{a}</button>
            ))}
          </div>

          {/* Paper list */}
          <div style={{display:'flex',flexDirection:'column',gap:'1px',background:'rgba(255,255,255,0.06)'}}>
            {filtered.map((p,idx) => (
              <div key={p.id} onClick={() => setExpanded(expanded===p.id ? null : p.id)}
                style={{background: expanded===p.id ? '#0a0d14' : '#000',padding:'2.5rem',cursor:'pointer',transition:'background 0.2s',borderLeft:`3px solid ${expanded===p.id ? p.color : 'transparent'}`}}
                onMouseEnter={e=>{ if(expanded!==p.id) e.currentTarget.style.background='#08090f' }}
                onMouseLeave={e=>{ if(expanded!==p.id) e.currentTarget.style.background='#000' }}>

                <div style={{display:'flex',gap:'1rem',alignItems:'flex-start',marginBottom:'1.25rem',flexWrap:'wrap'}}>
                  <div style={{display:'flex',gap:'0.75rem',alignItems:'center',flex:1,flexWrap:'wrap'}}>
                    <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',padding:'3px 10px',borderRadius:'3px',background:`${p.color}15`,color:p.color,border:`1px solid ${p.color}40`}}>{p.area}</span>
                    <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.1em',textTransform:'uppercase',padding:'3px 10px',borderRadius:'3px',border:'1px solid rgba(255,255,255,0.08)',color:STATUS_COLOR[p.status] || '#fff'}}>{p.status}</span>
                    <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'rgba(255,255,255,0.2)',marginLeft:'auto'}}>{p.date} · {p.pages}</span>
                  </div>
                </div>

                <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(1.4rem,2.5vw,2rem)',letterSpacing:'0.02em',color:'#fff',lineHeight:1.05,marginBottom:'0.75rem'}}>{p.title}</h2>
                <p style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'rgba(255,255,255,0.25)',letterSpacing:'0.04em',marginBottom:'1rem'}}>{p.authors.join(' · ')}</p>

                <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap',alignItems:'center'}}>
                  {p.tags.map(t => (
                    <span key={t} style={{fontFamily:"'DM Mono',monospace",fontSize:'9px',letterSpacing:'0.1em',textTransform:'uppercase',padding:'3px 8px',borderRadius:'3px',border:'1px solid rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.25)'}}>{t}</span>
                  ))}
                  <span style={{marginLeft:'auto',fontFamily:"'DM Mono',monospace",fontSize:'11px',color:p.color,transform:expanded===p.id?'rotate(180deg)':'rotate(0)',display:'inline-block',transition:'transform 0.2s'}}>↓</span>
                </div>

                {expanded === p.id && (
                  <div style={{marginTop:'2rem',paddingTop:'2rem',borderTop:'1px solid rgba(255,255,255,0.07)'}}>
                    <p style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'1rem',color:'rgba(255,255,255,0.55)',lineHeight:1.9,maxWidth:'760px'}}>{p.abstract}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',padding:'6rem 6vw',textAlign:'center',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 50% 80% at 50% 50%,rgba(59,130,246,0.04) 0%,transparent 70%)'}} />
          <div style={{position:'relative',zIndex:1}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(59,130,246,0.7)',marginBottom:'1rem'}}>Collaborate</div>
            <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(3rem,6vw,6rem)',lineHeight:0.9,color:'#fff',marginBottom:'2rem'}}>Interested in<br/>Our Research?</h2>
            <p style={{fontFamily:"'Lora',serif",fontStyle:'italic',color:'rgba(255,255,255,0.4)',fontSize:'1.1rem',marginBottom:'3rem',maxWidth:'480px',margin:'0 auto 3rem'}}>We collaborate with academic institutions and independent researchers. Get in touch to discuss joint work.</p>
            <a href="/#contact" style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',letterSpacing:'0.12em',textTransform:'uppercase',color:'#fff',background:'#3b82f6',padding:'13px 32px',borderRadius:'4px',textDecoration:'none',transition:'background 0.2s'}}
              onMouseEnter={e=>e.currentTarget.style.background='#2563eb'}
              onMouseLeave={e=>e.currentTarget.style.background='#3b82f6'}>Get in Touch →</a>
          </div>
        </div>

        <SiteFooter />
      </div>

      <style jsx global>{GLOBAL_STYLES}</style>
    </>
  )
}
