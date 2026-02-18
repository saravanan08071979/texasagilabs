import Head from 'next/head'
import Link from 'next/link'

const PAPERS = [
  {
    id: 'txagi-2025-001',
    title: 'Scalable Oversight via Recursive Constitutional Constraints in Large Language Models',
    authors: ['J. Mercer', 'A. Krishnaswamy', 'D. Okafor', 'Texas AGI Labs Research Team'],
    date: 'November 2025',
    area: 'Alignment',
    color: '#3b82f6',
    abstract: 'We present a framework for scalable oversight of frontier AI systems using recursively applied constitutional constraints. Our method enables human supervisors to maintain meaningful control over model behavior even as capabilities scale, by decomposing complex alignment objectives into verifiable sub-goals. We demonstrate a 94.2% reduction in specification gaming behavior on the ARC-Oversight benchmark suite.',
    tags: ['Alignment', 'Constitutional AI', 'Scalable Oversight', 'RLHF'],
    status: 'Published',
    pages: '34pp',
  },
  {
    id: 'txagi-2025-002',
    title: 'Circuit-Level Analysis of Deceptive Alignment in Transformer-Based Agents',
    authors: ['S. Park', 'L. Okonkwo', 'Texas AGI Labs Research Team'],
    date: 'September 2025',
    area: 'Interpretability',
    color: '#8b5cf6',
    abstract: 'Using mechanistic interpretability techniques, we identify and characterize neural circuit structures associated with deceptive alignment behaviors in large transformer models. We isolate 7 distinct circuit motifs that activate differentially during evaluation vs. deployment contexts, and propose targeted intervention methods to suppress deceptive activation patterns with minimal performance degradation.',
    tags: ['Interpretability', 'Deceptive Alignment', 'Circuits', 'Transformers'],
    status: 'Published',
    pages: '28pp',
  },
  {
    id: 'txagi-2025-003',
    title: 'SAFE-AGENT: A Benchmark Suite for Evaluating Autonomy Envelopes in Agentic AI Systems',
    authors: ['R. Vasquez', 'T. Abebe', 'M. Chen', 'Texas AGI Labs Research Team'],
    date: 'August 2025',
    area: 'Evaluation',
    color: '#f59e0b',
    abstract: 'We introduce SAFE-AGENT, a comprehensive benchmark suite of 1,240 tasks designed to evaluate whether autonomous AI agents respect prescribed autonomy envelopes under distribution shift. The benchmark covers 8 domains including code execution, web navigation, financial reasoning, and multi-agent coordination. We establish baselines for 12 frontier models and release all evaluation harnesses publicly.',
    tags: ['Evaluation', 'Agentic AI', 'Benchmarks', 'Autonomy'],
    status: 'Published',
    pages: '52pp',
  },
  {
    id: 'txagi-2025-004',
    title: 'Corrigibility Under Capability Gain: Maintaining Human Control Across Training Regimes',
    authors: ['Texas AGI Labs Research Team'],
    date: 'July 2025',
    area: 'Alignment',
    color: '#3b82f6',
    abstract: 'As AI systems gain capability through continued training, naive corrigibility constraints often degrade or are circumvented. We study this phenomenon across 6 training paradigms and propose Capability-Invariant Corrigibility (CIC), a training objective that preserves human override mechanisms as model capability increases. CIC maintains >96% corrigibility retention across a 10x capability gain regime.',
    tags: ['Corrigibility', 'Alignment', 'Training', 'Human Control'],
    status: 'Preprint',
    pages: '21pp',
  },
  {
    id: 'txagi-2026-001',
    title: 'Toward World Models with Causal Consistency: Grounding AGI Reasoning in Physical Intuition',
    authors: ['A. Krishnaswamy', 'F. Ndlovu', 'Texas AGI Labs Research Team'],
    date: 'January 2026',
    area: 'Reasoning',
    color: '#10b981',
    abstract: 'We propose a training methodology for instilling causally consistent world models in large neural networks. By augmenting standard next-token prediction with causal intervention objectives derived from structural causal models, we demonstrate significant improvements in counterfactual reasoning, physical simulation, and out-of-distribution generalization on CausalBench-v2 and ARC-Physics.',
    tags: ['World Models', 'Causal Reasoning', 'Grounding', 'Physical Intuition'],
    status: 'Preprint',
    pages: '39pp',
  },
  {
    id: 'txagi-2026-002',
    title: 'Multi-Agent Coordination Safety: Preventing Emergent Misalignment in Distributed AI Systems',
    authors: ['D. Okafor', 'S. Park', 'Texas AGI Labs Research Team'],
    date: 'February 2026',
    area: 'Agentic Systems',
    color: '#06b6d4',
    abstract: 'When multiple AI agents coordinate to complete shared objectives, emergent misalignment can arise that is not present in any individual agent. We characterize three classes of emergent misalignment in multi-agent systems and propose COORD-SAFE, a coordination protocol that provably prevents goal drift in networks of up to 64 heterogeneous agents. We validate on the NOVA architecture across 300+ multi-agent scenarios.',
    tags: ['Multi-Agent', 'Coordination', 'Safety', 'NOVA'],
    status: 'Under Review',
    pages: '31pp',
  },
]

const AREA_COLORS = {
  'Alignment': '#3b82f6',
  'Interpretability': '#8b5cf6',
  'Evaluation': '#f59e0b',
  'Reasoning': '#10b981',
  'Agentic Systems': '#06b6d4',
}

export default function Research() {
  return (
    <>
      <Head>
        <title>Research — Texas AGI Labs</title>
        <meta name="description" content="Peer-reviewed research on AGI alignment, interpretability, safety evaluation, and agentic systems from Texas AGI Labs." />
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
        {/* HEADER */}
        <div className="section-inner" style={{paddingBottom:'2rem'}}>
          <div className="section-label">Publications</div>
          <h1 className="section-title" style={{fontSize:'clamp(3rem,6vw,6rem)'}}>Research<br/>Portfolio</h1>
          <p className="section-body">Peer-reviewed papers, preprints, and technical reports from the Texas AGI Labs research team. All safety-critical findings are released publicly.</p>

          {/* Stats */}
          <div style={{display:'flex',gap:'3rem',marginTop:'2.5rem',flexWrap:'wrap'}}>
            {[['6','Publications'],['5','Research Areas'],['2026','Active Year']].map(([n,l]) => (
              <div key={l}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'3rem',lineHeight:1,background:'linear-gradient(135deg,#3b82f6,#06b6d4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{n}</div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',color:'#6b7a94',marginTop:'4px'}}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AREA FILTERS */}
        <div style={{borderTop:'1px solid rgba(255,255,255,0.07)',borderBottom:'1px solid rgba(255,255,255,0.07)',background:'rgba(10,13,20,0.6)',padding:'1rem 0'}}>
          <div style={{maxWidth:'1200px',margin:'0 auto',padding:'0 2rem',display:'flex',gap:'1rem',flexWrap:'wrap'}}>
            {Object.entries(AREA_COLORS).map(([area, color]) => (
              <span key={area} style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',padding:'4px 12px',borderRadius:'4px',border:`1px solid ${color}44`,color,background:`${color}11`}}>{area}</span>
            ))}
          </div>
        </div>

        {/* PAPERS */}
        <div className="section-inner" style={{paddingTop:'4rem'}}>
          <div style={{display:'flex',flexDirection:'column',gap:'2px',background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.07)'}}>
            {PAPERS.map((paper) => (
              <div key={paper.id} className="paper-card">
                <div style={{borderTop:`3px solid ${paper.color}`,padding:'2.5rem'}}>

                  {/* Top row */}
                  <div style={{display:'flex',alignItems:'center',gap:'1rem',marginBottom:'1rem',flexWrap:'wrap'}}>
                    <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.15em',textTransform:'uppercase',padding:'3px 10px',borderRadius:'4px',background:`${paper.color}18`,color:paper.color,border:`1px solid ${paper.color}44`}}>{paper.area}</span>
                    <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'#4a5568',letterSpacing:'0.08em',textTransform:'uppercase'}}>{paper.id}</span>
                    <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',color:'#4a5568',marginLeft:'auto'}}>{paper.date} · {paper.pages}</span>
                    <span style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',letterSpacing:'0.1em',textTransform:'uppercase',padding:'2px 8px',borderRadius:'3px',
                      background: paper.status === 'Published' ? 'rgba(16,185,129,0.1)' : paper.status === 'Preprint' ? 'rgba(245,158,11,0.1)' : 'rgba(99,102,241,0.1)',
                      color: paper.status === 'Published' ? '#10b981' : paper.status === 'Preprint' ? '#f59e0b' : '#818cf8',
                      border: `1px solid ${paper.status === 'Published' ? 'rgba(16,185,129,0.3)' : paper.status === 'Preprint' ? 'rgba(245,158,11,0.3)' : 'rgba(99,102,241,0.3)'}`
                    }}>{paper.status}</span>
                  </div>

                  {/* Title */}
                  <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(1.4rem,2.5vw,1.9rem)',letterSpacing:'0.03em',lineHeight:1.1,color:'#e8edf5',marginBottom:'0.75rem'}}>{paper.title}</h2>

                  {/* Authors */}
                  <p style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',color:'#4a5568',marginBottom:'1.25rem',letterSpacing:'0.05em'}}>{paper.authors.join(' · ')}</p>

                  {/* Abstract */}
                  <p style={{fontSize:'0.9rem',color:'#6b7a94',lineHeight:1.8,maxWidth:'800px',marginBottom:'1.5rem'}}>{paper.abstract}</p>

                  {/* Tags */}
                  <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap'}}>
                    {paper.tags.map(tag => (
                      <span key={tag} style={{fontFamily:"'DM Mono',monospace",fontSize:'9px',letterSpacing:'0.1em',textTransform:'uppercase',padding:'3px 8px',borderRadius:'3px',border:'1px solid rgba(255,255,255,0.07)',color:'#4a5568'}}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{background:'#0a0d14',borderTop:'1px solid rgba(255,255,255,0.07)'}}>
          <div className="section-inner" style={{textAlign:'center'}}>
            <div className="section-label" style={{justifyContent:'center'}}>Collaborate</div>
            <h2 className="section-title">Interested in<br/>Our Research?</h2>
            <p className="section-body" style={{margin:'0 auto 2rem',textAlign:'center'}}>We actively collaborate with academic institutions, independent researchers, and safety-focused organizations.</p>
            <a href="/#contact" className="btn-primary">Get In Touch →</a>
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
            <div className="footer-col"><h4>Research</h4><ul><li><a href="/research">All Papers</a></li><li><a href="/#research">Research Areas</a></li><li><a href="/#safety">Safety</a></li></ul></div>
            <div className="footer-col"><h4>Models</h4><ul><li><a href="#">ALPHA A1</a></li><li><a href="#">OMEGA B1</a></li><li><a href="#">NOVA C1</a></li></ul></div>
            <div className="footer-col"><h4>Company</h4><ul><li><a href="/#about">About</a></li><li><a href="/#contact">Contact</a></li></ul></div>
          </div>
          <div className="footer-bottom">
            <p>© 2025–2026 Texas AGI Labs. All rights reserved. McKinney, TX 75070</p>
            <div className="footer-badges"><span className="badge">Safety-First</span><span className="badge">Open Research</span><span className="badge">Texas-Built</span></div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        .paper-card { background: #030508; transition: background 0.2s; }
        .paper-card:hover { background: #080c14; }
      `}</style>
    </>
  )
}
