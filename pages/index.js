import Head from 'next/head'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          const children = e.target.querySelectorAll('.research-card, .model-card, .safety-pillar')
          children.forEach((child, i) => {
            child.style.transitionDelay = `${i * 0.06}s`
            child.style.opacity = '0'
            child.style.transform = 'translateY(16px)'
            child.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
            setTimeout(() => {
              child.style.opacity = '1'
              child.style.transform = 'translateY(0)'
            }, i * 60)
          })
        }
      })
    }, { threshold: 0.1 })
    reveals.forEach(r => observer.observe(r))

    // Mobile nav
    const mobileBtn = document.querySelector('.mobile-menu-btn')
    if (mobileBtn) {
      mobileBtn.addEventListener('click', () => {
        const links = document.querySelector('.nav-links')
        links.style.display = links.style.display === 'flex' ? 'none' : 'flex'
        links.style.flexDirection = 'column'
        links.style.position = 'absolute'
        links.style.top = '64px'
        links.style.left = '0'
        links.style.right = '0'
        links.style.background = 'rgba(3,5,8,0.97)'
        links.style.padding = '1.5rem 2rem'
        links.style.borderBottom = '1px solid rgba(255,255,255,0.07)'
      })
    }

    return () => observer.disconnect()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    const btn = e.target.querySelector('button[type=submit]')
    btn.textContent = '✓ Message Sent!'
    btn.style.background = '#10b981'
    setTimeout(() => {
      btn.textContent = 'Send Message →'
      btn.style.background = ''
    }, 3000)
  }

  return (
    <>
      <Head>
        <title>Texas AGI Labs — Frontier Intelligence Research</title>
        <meta name="description" content="Texas AGI Labs is an independent research institution advancing the frontiers of Artificial General Intelligence — safely, responsibly, and openly." />
        <meta property="og:title" content="Texas AGI Labs — Frontier Intelligence Research" />
        <meta property="og:description" content="Pioneering aligned AGI systems for humanity's long-term benefit." />
        <meta property="og:url" content="https://www.texasagilabs.com" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.texasagilabs.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Lora:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />
      </Head>

      <div className="grid-bg"></div>

      {/* NAV */}
      <nav>
        <a href="/" className="nav-logo">
          <img src="/texasagilabs-logo.png" alt="TX" className="logo-img" />
          <span className="logo-text">Texas AGI Labs</span>
        </a>
        <ul className="nav-links">
          <li><a href="#research">Research</a></li>
          <li><a href="#models">Models</a></li>
          <li><a href="#safety">Safety</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#contact" className="nav-cta">Request Access</a>
        <button className="mobile-menu-btn" aria-label="Menu">☰</button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-glow"></div>
        <div className="orbit-ring"><div className="orbit-dot"></div></div>
        <div className="orbit-ring"><div className="orbit-dot"></div></div>
        <div className="orbit-ring"><div className="orbit-dot"></div></div>
        <span className="hero-tag">★ Frontier AI Research — McKinney, Texas</span>
        <h1>
          Building<br />
          <span className="accent-word">Trusted AGI</span><br />
          Systems
        </h1>
        <p className="hero-sub">
          Researching and aligning artificial general intelligence systems
          to unlock unprecedented human progress — safely, responsibly, and openly.
        </p>
        <div className="hero-buttons">
          <a href="#models" className="btn-primary">Explore Our Models</a>
          <a href="#research" className="btn-ghost">Research Portfolio →</a>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker">
          {['AGI Alignment Research','Mechanistic Interpretability','Frontier Model Safety','Agentic AI Systems','Multimodal Reasoning','Constitutional AI','World Modeling','RLHF / RLAIF','Continual Learning','AI Safety Evaluations',
            'AGI Alignment Research','Mechanistic Interpretability','Frontier Model Safety','Agentic AI Systems','Multimodal Reasoning','Constitutional AI','World Modeling','RLHF / RLAIF','Continual Learning','AI Safety Evaluations'
          ].map((t, i) => <span key={i} className="ticker-item">{t}</span>)}
        </div>
      </div>

      {/* STATS */}
      <div className="section-inner" style={{paddingTop:'6rem',paddingBottom:0}}>
        <div className="stats-bar reveal">
          <div className="stat-block"><span className="stat-num">3</span><span className="stat-desc">Frontier Models</span></div>
          <div className="stat-block"><span className="stat-num">12+</span><span className="stat-desc">Research Papers</span></div>
          <div className="stat-block"><span className="stat-num">100%</span><span className="stat-desc">Safety First</span></div>
          <div className="stat-block"><span className="stat-num">∞</span><span className="stat-desc">Human Potential</span></div>
        </div>
      </div>

      {/* RESEARCH */}
      <section id="research">
        <div className="section-inner">
          <div className="section-label">Research</div>
          <h2 className="section-title">What We&apos;re<br />Working On</h2>
          <p className="section-body">Our research spans the most pressing open problems in AGI — from alignment and interpretability to long-horizon planning and autonomous agent coordination.</p>
          <div className="research-grid reveal">
            <div className="research-card rc-blue">
              <div className="card-number">01 — ALIGNMENT</div>
              <span className="card-icon">⚖️</span>
              <h3 className="card-title">AGI Alignment &amp; Value Learning</h3>
              <p className="card-body">Developing robust methods for ensuring frontier AI systems reliably pursue intended goals across novel contexts. We study RLHF, Constitutional AI, and scalable oversight techniques.</p>
              <span className="card-tag">Active Research</span>
            </div>
            <div className="research-card rc-purple">
              <div className="card-number">02 — INTERPRETABILITY</div>
              <span className="card-icon">🔬</span>
              <h3 className="card-title">Mechanistic Interpretability</h3>
              <p className="card-body">Understanding the internal computations of large neural networks. We reverse-engineer circuits, identify features, and map causal structures inside transformer models.</p>
              <span className="card-tag tag-purple">Active Research</span>
            </div>
            <div className="research-card rc-cyan">
              <div className="card-number">03 — AGENTIC SYSTEMS</div>
              <span className="card-icon">🤖</span>
              <h3 className="card-title">Agentic AI &amp; Long-Horizon Tasks</h3>
              <p className="card-body">Building AI agents that autonomously plan and execute complex, multi-step goals. We focus on safe autonomy envelopes, agent coordination, and error recovery.</p>
              <span className="card-tag tag-cyan">In Progress</span>
            </div>
            <div className="research-card rc-green">
              <div className="card-number">04 — REASONING</div>
              <span className="card-icon">🧠</span>
              <h3 className="card-title">World Modeling &amp; Causal Reasoning</h3>
              <p className="card-body">Advancing AI&apos;s capacity for physical intuition, counterfactual reasoning, and mental simulation. Grounding intelligence in structured world representations.</p>
              <span className="card-tag tag-green">Upcoming</span>
            </div>
            <div className="research-card rc-gold">
              <div className="card-number">05 — EVALUATION</div>
              <span className="card-icon">📊</span>
              <h3 className="card-title">Frontier Model Evaluation &amp; Benchmarking</h3>
              <p className="card-body">Designing rigorous evaluations for capability and safety. We contribute to ARC-AGI-style benchmarks and red-teaming protocols for autonomy, deception, and emergent behavior.</p>
              <span className="card-tag tag-gold">Active Research</span>
            </div>
            <div className="research-card rc-red">
              <div className="card-number">06 — MULTIMODAL</div>
              <span className="card-icon">👁️</span>
              <h3 className="card-title">Multimodal &amp; Embodied Cognition</h3>
              <p className="card-body">Investigating cross-modal understanding — vision, language, audio, and action. Building toward embodied AI that perceives and acts in physical and simulated environments.</p>
              <span className="card-tag tag-red">Planned</span>
            </div>
          </div>
        </div>
      </section>

      {/* MODELS */}
      <section id="models" className="models-section">
        <div className="section-inner">
          <div className="section-label">Models</div>
          <h2 className="section-title">AGI Systems<br />in Development</h2>
          <p className="section-body">Three distinct model architectures, each targeting a critical capability dimension of the path to beneficial AGI.</p>
          <div className="models-grid reveal">
            <div className="model-card">
              <div className="model-glow" style={{background:'radial-gradient(circle, #3b82f6, transparent)'}}></div>
              <span className="model-badge badge-blue">◉ Operational</span>
              <div className="model-name" style={{color:'#3b82f6'}}>ALPHA</div>
              <div className="model-sub">Model A1 — Safe Deployment AGI</div>
              <p className="model-desc">Designed for safe, constrained deployment in high-stakes environments. Enforces explicit safety envelopes, constitutional constraints, and human-oversight requirements at inference time.</p>
              <div className="model-stats">
                <div className="stat-row"><span className="stat-label">Cert Level</span><span className="stat-value" style={{color:'#3b82f6'}}>S-2 Safety Verified</span></div>
                <div className="stat-row"><span className="stat-label">Architecture</span><span className="stat-value">Transformer + Safety Layer</span></div>
                <div className="stat-row"><span className="stat-label">Alignment Method</span><span className="stat-value">Constitutional AI + RLHF</span></div>
                <div className="stat-row"><span className="stat-label">Status</span><span className="stat-value"><span className="status-dot" style={{background:'#10b981'}}></span>Operational</span></div>
              </div>
            </div>
            <div className="model-card">
              <div className="model-glow" style={{background:'radial-gradient(circle, #8b5cf6, transparent)'}}></div>
              <span className="model-badge badge-purple">◎ In Testing</span>
              <div className="model-name" style={{color:'#8b5cf6'}}>OMEGA</div>
              <div className="model-sub">Model B1 — Robust Cognition</div>
              <p className="model-desc">A general reasoning engine built to operate reliably under uncertainty, stress, and distribution shift. Optimized for causal inference, multi-step planning, and out-of-distribution generalization.</p>
              <div className="model-stats">
                <div className="stat-row"><span className="stat-label">Cert Level</span><span className="stat-value" style={{color:'#8b5cf6'}}>R-1 Robustness</span></div>
                <div className="stat-row"><span className="stat-label">Architecture</span><span className="stat-value">Hybrid Reasoning + MoE</span></div>
                <div className="stat-row"><span className="stat-label">Evaluation</span><span className="stat-value">ARC-AGI + GPQA</span></div>
                <div className="stat-row"><span className="stat-label">Status</span><span className="stat-value"><span className="status-dot" style={{background:'#f59e0b'}}></span>In Evaluation</span></div>
              </div>
            </div>
            <div className="model-card">
              <div className="model-glow" style={{background:'radial-gradient(circle, #06b6d4, transparent)'}}></div>
              <span className="model-badge badge-cyan">○ Research Phase</span>
              <div className="model-name" style={{color:'#06b6d4'}}>NOVA</div>
              <div className="model-sub">Model C1 — Scalable Agent Integration</div>
              <p className="model-desc">A multi-agent coordination framework for distributed intelligence. NOVA enables networks of specialized agents to collaborate on complex goals with adaptive task routing and shared memory.</p>
              <div className="model-stats">
                <div className="stat-row"><span className="stat-label">Cert Level</span><span className="stat-value" style={{color:'#06b6d4'}}>I-3 Integration</span></div>
                <div className="stat-row"><span className="stat-label">Architecture</span><span className="stat-value">Multi-Agent + RAG</span></div>
                <div className="stat-row"><span className="stat-label">Focus</span><span className="stat-value">Agentic Coordination</span></div>
                <div className="stat-row"><span className="stat-label">Status</span><span className="stat-value"><span className="status-dot" style={{background:'#3b82f6'}}></span>Research</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SAFETY */}
      <section id="safety">
        <div className="section-inner">
          <div className="section-label">Safety</div>
          <h2 className="section-title">Safety Is Not<br />A Constraint.<br />It&apos;s The Work.</h2>
          <div className="safety-grid reveal">
            <div>
              <div className="highlight-bar">
                <div className="dot"></div>
                <p>All models undergo continuous <span>red-team evaluation</span> before any deployment milestone.</p>
              </div>
              <div className="safety-pillar"><span className="pillar-num">01</span><div><h4 className="pillar-title">Alignment by Design</h4><p className="pillar-body">Safety and alignment objectives are core to the training pipeline — not post-hoc filters. We use Constitutional AI and scalable oversight from day one.</p></div></div>
              <div className="safety-pillar"><span className="pillar-num">02</span><div><h4 className="pillar-title">Interpretability First</h4><p className="pillar-body">We cannot trust what we cannot understand. Every model has a mechanistic audit program to map internal representations and identify deceptive features.</p></div></div>
              <div className="safety-pillar"><span className="pillar-num">03</span><div><h4 className="pillar-title">Human Oversight Preserved</h4><p className="pillar-body">Our deployment protocols maintain meaningful human control at every capability tier. We operate with explicit autonomy envelopes and corrigibility constraints.</p></div></div>
              <div className="safety-pillar"><span className="pillar-num">04</span><div><h4 className="pillar-title">Open Safety Research</h4><p className="pillar-body">We publish our safety findings — including failures — to contribute to the global field. A rising tide of safety knowledge lifts all boats.</p></div></div>
            </div>
            <div className="terminal reveal">
              <div className="terminal-bar">
                <div className="term-dot red"></div>
                <div className="term-dot yellow"></div>
                <div className="term-dot green"></div>
                <span className="terminal-title">safety_eval.sh — ALPHA v2.1</span>
              </div>
              <div className="terminal-body">
                <span className="term-line"><span className="term-prompt">$ </span><span className="term-cmd">run_safety_eval --model alpha-v2.1 --suite full</span></span>
                <span className="term-line term-comment"># Initializing evaluation suite...</span>
                <span className="term-line term-output">✓ Constitutional constraint check: PASS</span>
                <span className="term-line term-output">✓ RLHF reward model alignment: PASS</span>
                <span className="term-line term-output">✓ Corrigibility benchmark: PASS (97.3%)</span>
                <span className="term-line term-output">✓ Deceptive alignment probe: PASS</span>
                <span className="term-line term-warn">⚠ Sycophancy score: 0.12 (monitoring)</span>
                <span className="term-line term-output">✓ OOD generalization: PASS</span>
                <span className="term-line term-output">✓ Red-team adversarial suite: PASS</span>
                <span className="term-line term-output">✓ Autonomy envelope test: PASS</span>
                <span className="term-line">&nbsp;</span>
                <span className="term-line term-comment"># ─── Summary ──────────────────────</span>
                <span className="term-line term-output">✓ Cert Level: S-2 CONFIRMED</span>
                <span className="term-line term-output">✓ Cleared for deployment: YES</span>
                <span className="term-line"><span className="term-prompt">$ </span><span className="term-cursor"></span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{background:'#0a0d14',borderTop:'1px solid rgba(255,255,255,0.07)'}}>
        <div className="section-inner">
          <div className="section-label">About</div>
          <div className="about-layout reveal">
            <div>
              <h2 className="section-title">Why Texas.<br />Why Now.</h2>
              <blockquote className="manifesto">
                &ldquo;We are at the most consequential moment in the history of intelligence. The decisions made in the next decade will shape civilization for centuries. We believe that <em className="manifesto-em">safety and capability are complements, not trade-offs</em> — and that the best AGI is one humanity can trust unconditionally.&rdquo;
              </blockquote>
              <p className="manifesto-attr">— Texas AGI Labs Research Team, 2025</p>
            </div>
            <div>
              <p className="section-body" style={{marginBottom:'2rem'}}>Texas AGI Labs is an independent AI research institution based in McKinney, Texas. We exist because we believe the frontier of intelligence research should not be concentrated in a single city or a single worldview.</p>
              <ul className="value-list">
                <li><span className="icon">◈</span><span><strong className="value-strong">Research-First:</strong> Every product decision is grounded in peer-reviewed methodology, not market pressure.</span></li>
                <li><span className="icon">◈</span><span><strong className="value-strong">Safety-Concurrent:</strong> Alignment research runs in parallel with capability research — never as an afterthought.</span></li>
                <li><span className="icon">◈</span><span><strong className="value-strong">Radically Transparent:</strong> We publish what we learn, including failures, to accelerate the global safety ecosystem.</span></li>
                <li><span className="icon">◈</span><span><strong className="value-strong">Globally Optimistic:</strong> We believe AGI, done right, will be humanity&apos;s greatest achievement — a lever for eliminating poverty, disease, and ignorance.</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div className="section-inner">
          <div className="contact-inner">
            <div className="section-label" style={{justifyContent:'center'}}>Contact</div>
            <h2 className="section-title">Join the Mission</h2>
            <p className="section-body" style={{margin:'0 auto',textAlign:'center'}}>Whether you&apos;re a researcher, engineer, institution, or simply curious about the future of intelligence — we want to hear from you.</p>
            <form className="contact-form reveal" onSubmit={handleSubmit}>
              <div className="form-field"><label htmlFor="fname">First Name</label><input type="text" id="fname" placeholder="Ada" /></div>
              <div className="form-field"><label htmlFor="lname">Last Name</label><input type="text" id="lname" placeholder="Lovelace" /></div>
              <div className="form-field"><label htmlFor="email">Email Address</label><input type="email" id="email" placeholder="ada@university.edu" /></div>
              <div className="form-field">
                <label htmlFor="role">I Am</label>
                <select id="role">
                  <option value="">Select your background</option>
                  <option>AI / ML Researcher</option><option>Software Engineer</option>
                  <option>Academic / Professor</option><option>Industry Professional</option>
                  <option>Student</option><option>Investor / Partner</option>
                  <option>Journalist / Press</option><option>Other</option>
                </select>
              </div>
              <div className="form-field form-full"><label htmlFor="message">Message</label><textarea id="message" rows={5} placeholder="Tell us about your interest in AGI research, collaboration opportunities, or questions about our work..."></textarea></div>
              <div className="form-full" style={{textAlign:'center',marginTop:'0.5rem'}}>
                <button type="submit" className="btn-primary" style={{padding:'16px 48px',fontSize:'13px'}}>Send Message →</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-brand">
            <a href="/" className="nav-logo" style={{textDecoration:'none'}}>
              <img src="/texasagilabs-logo.png" alt="TX" className="logo-img" />
              <span className="logo-text">Texas AGI Labs</span>
            </a>
            <p>An independent frontier AI research lab advancing the science of aligned, interpretable, and beneficial artificial general intelligence.</p>
          </div>
          <div className="footer-col"><h4>Research</h4><ul><li><a href="#">Alignment</a></li><li><a href="#">Interpretability</a></li><li><a href="#">Agentic Systems</a></li><li><a href="#">Evaluations</a></li><li><a href="#">Publications</a></li></ul></div>
          <div className="footer-col"><h4>Models</h4><ul><li><a href="#">ALPHA A1</a></li><li><a href="#">OMEGA B1</a></li><li><a href="#">NOVA C1</a></li><li><a href="#">API Access</a></li><li><a href="#">Model Cards</a></li></ul></div>
          <div className="footer-col"><h4>Company</h4><ul><li><a href="#">About</a></li><li><a href="#">Careers</a></li><li><a href="#">Press</a></li><li><a href="#">Privacy Policy</a></li><li><a href="#">Terms of Use</a></li></ul></div>
        </div>
        <div className="footer-bottom">
          <p>© 2025–2026 Texas AGI Labs. All rights reserved. McKinney, TX 75070</p>
          <div className="footer-badges"><span className="badge">Safety-First</span><span className="badge">Open Research</span><span className="badge">Texas-Built</span></div>
        </div>
      </footer>

      <style jsx global>{`
        :root {
          --bg: #030508;
          --surface: #0a0d14;
          --panel: #0f1320;
          --border: rgba(255,255,255,0.07);
          --border-bright: rgba(99,179,255,0.25);
          --text: #e8edf5;
          --muted: #6b7a94;
          --accent: #3b82f6;
          --accent2: #06b6d4;
          --accent3: #8b5cf6;
          --gold: #f59e0b;
          --green: #10b981;
          --danger: #ef4444;
          --glow: rgba(59,130,246,0.15);
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Lora', Georgia, serif; background: var(--bg); color: var(--text); overflow-x: hidden; line-height: 1.7; }
        body::before { content: ''; position: fixed; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); pointer-events: none; z-index: 9999; opacity: 0.4; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--panel); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--muted); }

        .grid-bg { position: fixed; inset: 0; background-image: linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px); background-size: 60px 60px; pointer-events: none; z-index: 0; }

        nav { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; padding: 0 2rem; display: flex; align-items: center; justify-content: space-between; height: 64px; background: rgba(3,5,8,0.85); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); }
        .nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .logo-img { width: 36px; height: 36px; object-fit: contain; }
        .logo-text { font-family: 'DM Mono', monospace; font-size: 13px; font-weight: 500; color: var(--text); letter-spacing: 0.5px; }
        .nav-links { display: flex; align-items: center; gap: 2rem; list-style: none; }
        .nav-links a { font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); text-decoration: none; transition: color 0.2s; }
        .nav-links a:hover { color: var(--text); }
        .nav-cta { font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; background: var(--accent); color: #fff; border: none; padding: 8px 18px; border-radius: 6px; cursor: pointer; text-decoration: none; transition: background 0.2s; }
        .nav-cta:hover { background: #2563eb; }
        .mobile-menu-btn { display: none; background: none; border: none; color: var(--text); font-size: 1.5rem; cursor: pointer; }
        @media (max-width: 768px) { .nav-links { display: none; } .mobile-menu-btn { display: block; } }

        .hero { position: relative; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 120px 2rem 80px; z-index: 1; overflow: hidden; }
        .hero-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 900px; height: 600px; background: radial-gradient(ellipse at center, rgba(59,130,246,0.12) 0%, rgba(139,92,246,0.06) 40%, transparent 70%); pointer-events: none; animation: pulse-glow 6s ease-in-out infinite; }
        @keyframes pulse-glow { 0%, 100% { opacity: 0.7; transform: translate(-50%,-50%) scale(1); } 50% { opacity: 1; transform: translate(-50%,-50%) scale(1.08); } }
        .orbit-ring { position: absolute; top: 50%; left: 50%; border-radius: 50%; border: 1px solid rgba(59,130,246,0.08); animation: orbit-spin linear infinite; pointer-events: none; }
        .orbit-ring:nth-child(2) { width: 500px; height: 500px; margin: -250px; animation-duration: 40s; }
        .orbit-ring:nth-child(3) { width: 720px; height: 720px; margin: -360px; animation-duration: 60s; border-color: rgba(139,92,246,0.05); }
        .orbit-ring:nth-child(4) { width: 980px; height: 980px; margin: -490px; animation-duration: 90s; border-color: rgba(6,182,212,0.04); }
        @keyframes orbit-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .orbit-dot { position: absolute; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); top: -3px; left: 50%; margin-left: -3px; box-shadow: 0 0 10px var(--accent); }
        .orbit-ring:nth-child(3) .orbit-dot { background: var(--accent3); box-shadow: 0 0 10px var(--accent3); }
        .orbit-ring:nth-child(4) .orbit-dot { background: var(--accent2); box-shadow: 0 0 10px var(--accent2); }
        .hero-tag { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); border: 1px solid rgba(59,130,246,0.3); padding: 6px 16px; border-radius: 100px; display: inline-block; margin-bottom: 2rem; animation: fade-up 0.8s ease both; background: rgba(59,130,246,0.05); }
        .hero h1 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(4rem,10vw,9rem); line-height: 0.92; letter-spacing: 0.02em; color: var(--text); margin-bottom: 1.5rem; animation: fade-up 0.8s 0.1s ease both; }
        .accent-word { background: linear-gradient(135deg, var(--accent), var(--accent2), var(--accent3)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero-sub { font-family: 'Lora', serif; font-size: clamp(1rem,2vw,1.2rem); color: var(--muted); max-width: 600px; margin: 0 auto 2.5rem; font-style: italic; animation: fade-up 0.8s 0.2s ease both; }
        .hero-buttons { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; animation: fade-up 0.8s 0.3s ease both; }
        @keyframes fade-up { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

        .btn-primary { font-family: 'DM Mono', monospace; font-size: 12px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; background: var(--accent); color: #fff; border: none; padding: 14px 28px; border-radius: 8px; cursor: pointer; text-decoration: none; display: inline-block; transition: transform 0.15s, box-shadow 0.15s; box-shadow: 0 0 30px rgba(59,130,246,0.3); }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 50px rgba(59,130,246,0.5); }
        .btn-ghost { font-family: 'DM Mono', monospace; font-size: 12px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; background: transparent; color: var(--text); border: 1px solid var(--border-bright); padding: 14px 28px; border-radius: 8px; cursor: pointer; text-decoration: none; display: inline-block; transition: border-color 0.2s, background 0.2s; }
        .btn-ghost:hover { border-color: rgba(99,179,255,0.5); background: rgba(59,130,246,0.05); }

        .ticker-wrap { width: 100%; overflow: hidden; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 12px 0; background: rgba(10,13,20,0.6); position: relative; z-index: 1; margin-top: 4rem; }
        .ticker { display: flex; gap: 4rem; animation: ticker-scroll 35s linear infinite; white-space: nowrap; }
        .ticker-item { font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted); display: flex; align-items: center; gap: 1rem; }
        .ticker-item::before { content: '◈'; color: var(--accent); font-size: 8px; }
        @keyframes ticker-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        section { position: relative; z-index: 1; }
        .section-inner { max-width: 1200px; margin: 0 auto; padding: 100px 2rem; }
        .section-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--accent); margin-bottom: 1rem; display: flex; align-items: center; gap: 8px; }
        .section-label::before { content: ''; display: block; width: 24px; height: 1px; background: var(--accent); }
        .section-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.5rem,5vw,4.5rem); line-height: 1; letter-spacing: 0.02em; margin-bottom: 1.5rem; }
        .section-body { font-size: 1.05rem; color: var(--muted); max-width: 600px; line-height: 1.8; }

        .stats-bar { display: grid; grid-template-columns: repeat(4,1fr); border: 1px solid var(--border); background: var(--panel); }
        @media (max-width: 640px) { .stats-bar { grid-template-columns: repeat(2,1fr); } }
        .stat-block { padding: 2.5rem 2rem; border-right: 1px solid var(--border); text-align: center; }
        .stat-block:last-child { border-right: none; }
        .stat-num { font-family: 'Bebas Neue', sans-serif; font-size: 3.5rem; line-height: 1; background: linear-gradient(135deg, var(--accent), var(--accent2)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; display: block; margin-bottom: 0.5rem; }
        .stat-desc { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }

        .research-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.5px; margin-top: 4rem; background: var(--border); border: 1px solid var(--border); }
        .research-card { background: var(--bg); padding: 2.5rem; transition: background 0.25s; cursor: default; position: relative; overflow: hidden; }
        .research-card::before { content: ''; position: absolute; top: 0; left: 0; width: 3px; height: 0; transition: height 0.3s ease; }
        .research-card:hover { background: var(--surface); }
        .research-card:hover::before { height: 100%; }
        .rc-blue::before { background: #3b82f6; }
        .rc-purple::before { background: #8b5cf6; }
        .rc-cyan::before { background: #06b6d4; }
        .rc-green::before { background: #10b981; }
        .rc-gold::before { background: #f59e0b; }
        .rc-red::before { background: #ef4444; }
        .card-number { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--muted); margin-bottom: 1.5rem; letter-spacing: 0.1em; }
        .card-icon { font-size: 2rem; margin-bottom: 1rem; display: block; }
        .card-title { font-family: 'Bebas Neue', sans-serif; font-size: 1.6rem; letter-spacing: 0.04em; margin-bottom: 0.75rem; color: var(--text); }
        .card-body { font-size: 0.9rem; color: var(--muted); line-height: 1.7; }
        .card-tag { display: inline-block; margin-top: 1.5rem; font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 10px; border-radius: 4px; background: var(--glow); color: var(--accent); border: 1px solid rgba(59,130,246,0.2); }
        .tag-purple { color: #8b5cf6; border-color: rgba(139,92,246,0.3); background: rgba(139,92,246,0.05); }
        .tag-cyan { color: #06b6d4; border-color: rgba(6,182,212,0.3); background: rgba(6,182,212,0.05); }
        .tag-green { color: #10b981; border-color: rgba(16,185,129,0.3); background: rgba(16,185,129,0.05); }
        .tag-gold { color: #f59e0b; border-color: rgba(245,158,11,0.3); background: rgba(245,158,11,0.05); }
        .tag-red { color: #ef4444; border-color: rgba(239,68,68,0.3); background: rgba(239,68,68,0.05); }

        .models-section { background: var(--surface); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .models-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: var(--border); margin-top: 4rem; }
        @media (max-width: 768px) { .models-grid { grid-template-columns: 1fr; } }
        .model-card { background: var(--surface); padding: 3rem 2.5rem; position: relative; overflow: hidden; transition: background 0.25s; display: flex; flex-direction: column; }
        .model-card:hover { background: var(--panel); }
        .model-glow { position: absolute; top: -60px; right: -60px; width: 200px; height: 200px; border-radius: 50%; opacity: 0.08; }
        .model-badge { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; padding: 4px 10px; border-radius: 4px; display: inline-block; margin-bottom: 2rem; align-self: flex-start; }
        .badge-blue { background: rgba(59,130,246,0.1); color: #3b82f6; border: 1px solid rgba(59,130,246,0.3); }
        .badge-purple { background: rgba(139,92,246,0.1); color: #8b5cf6; border: 1px solid rgba(139,92,246,0.3); }
        .badge-cyan { background: rgba(6,182,212,0.1); color: #06b6d4; border: 1px solid rgba(6,182,212,0.3); }
        .model-name { font-family: 'Bebas Neue', sans-serif; font-size: 3.5rem; letter-spacing: 0.06em; line-height: 1; margin-bottom: 0.5rem; }
        .model-sub { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1.5rem; }
        .model-desc { font-size: 0.9rem; color: var(--muted); line-height: 1.7; margin-bottom: 2rem; }
        .model-stats { display: flex; flex-direction: column; gap: 0.75rem; margin-top: auto; }
        .stat-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--border); }
        .stat-label { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--muted); letter-spacing: 0.08em; text-transform: uppercase; }
        .stat-value { font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 500; }
        .status-dot { width: 7px; height: 7px; border-radius: 50%; display: inline-block; margin-right: 6px; animation: status-blink 2s ease-in-out infinite; }
        @keyframes status-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

        .safety-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; margin-top: 4rem; }
        @media (max-width: 768px) { .safety-grid { grid-template-columns: 1fr; gap: 2rem; } }
        .highlight-bar { background: linear-gradient(90deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1)); border: 1px solid rgba(59,130,246,0.2); border-radius: 8px; padding: 1rem 1.5rem; display: flex; align-items: center; gap: 1rem; margin-bottom: 3rem; }
        .highlight-bar .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); animation: status-blink 2s infinite; flex-shrink: 0; }
        .highlight-bar p { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--text); letter-spacing: 0.05em; }
        .highlight-bar p span { color: var(--accent); }
        .safety-pillar { display: flex; gap: 1.5rem; padding: 2rem 0; border-bottom: 1px solid var(--border); }
        .pillar-num { font-family: 'DM Mono', monospace; font-size: 2rem; font-weight: 300; color: var(--border-bright); line-height: 1; min-width: 48px; }
        .pillar-title { font-family: 'Bebas Neue', sans-serif; font-size: 1.4rem; letter-spacing: 0.04em; margin-bottom: 0.5rem; }
        .pillar-body { font-size: 0.88rem; color: var(--muted); line-height: 1.7; }
        .terminal { background: #050810; border: 1px solid var(--border-bright); border-radius: 10px; overflow: hidden; font-family: 'DM Mono', monospace; }
        .terminal-bar { background: rgba(255,255,255,0.04); padding: 12px 16px; display: flex; align-items: center; gap: 8px; border-bottom: 1px solid var(--border); }
        .term-dot { width: 10px; height: 10px; border-radius: 50%; }
        .term-dot.red { background: #ef4444; }
        .term-dot.yellow { background: #f59e0b; }
        .term-dot.green { background: #10b981; }
        .terminal-title { font-size: 11px; color: var(--muted); margin-left: auto; letter-spacing: 0.08em; }
        .terminal-body { padding: 1.5rem; font-size: 12px; line-height: 2; color: #64748b; }
        .term-line { display: block; }
        .term-prompt { color: var(--accent2); }
        .term-cmd { color: var(--text); }
        .term-comment { color: #374151; }
        .term-output { color: var(--green); }
        .term-warn { color: var(--gold); }
        .term-cursor { display: inline-block; width: 8px; height: 14px; background: var(--accent); vertical-align: middle; animation: blink 1s step-end infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        .about-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center; }
        @media (max-width: 900px) { .about-layout { grid-template-columns: 1fr; gap: 3rem; } }
        .manifesto { font-family: 'Lora', serif; font-size: 1.3rem; font-style: italic; line-height: 1.9; color: var(--text); border-left: 3px solid var(--accent); padding-left: 2rem; }
        .manifesto-em { color: var(--accent2); font-style: normal; }
        .manifesto-attr { margin-top: 1.5rem; font-size: 0.9rem; color: var(--muted); font-family: 'DM Mono', monospace; letter-spacing: 0.05em; }
        .value-list { list-style: none; display: flex; flex-direction: column; gap: 1rem; }
        .value-list li { display: flex; gap: 1rem; align-items: flex-start; font-size: 0.92rem; color: var(--muted); }
        .value-list li .icon { color: var(--accent); font-size: 1.1rem; line-height: 1.4; flex-shrink: 0; }
        .value-strong { color: var(--text); }

        .contact-section { background: var(--surface); border-top: 1px solid var(--border); }
        .contact-inner { max-width: 800px; margin: 0 auto; text-align: center; }
        .contact-form { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 3rem; }
        @media (max-width: 600px) { .contact-form { grid-template-columns: 1fr; } }
        .form-full { grid-column: 1 / -1; }
        .form-field { display: flex; flex-direction: column; gap: 6px; }
        .form-field label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted); }
        .form-field input, .form-field textarea, .form-field select { background: var(--bg); border: 1px solid var(--border); color: var(--text); font-family: 'DM Mono', monospace; font-size: 13px; padding: 12px 16px; border-radius: 6px; outline: none; transition: border-color 0.2s; resize: vertical; }
        .form-field input:focus, .form-field textarea:focus, .form-field select:focus { border-color: var(--accent); }
        .form-field select option { background: var(--bg); }

        footer { border-top: 1px solid var(--border); padding: 3rem 2rem; max-width: 1200px; margin: 0 auto; }
        .footer-inner { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; }
        @media (max-width: 768px) { .footer-inner { grid-template-columns: 1fr 1fr; } }
        .footer-brand p { font-size: 0.88rem; color: var(--muted); line-height: 1.7; margin-top: 1rem; }
        .footer-col h4 { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); margin-bottom: 1.2rem; }
        .footer-col ul { list-style: none; }
        .footer-col ul li { margin-bottom: 0.7rem; }
        .footer-col ul a { font-size: 0.88rem; color: var(--muted); text-decoration: none; transition: color 0.2s; }
        .footer-col ul a:hover { color: var(--text); }
        .footer-bottom { margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .footer-bottom p { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--muted); letter-spacing: 0.08em; }
        .footer-badges { display: flex; gap: 0.75rem; }
        .badge { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; padding: 3px 8px; border-radius: 3px; border: 1px solid var(--border); color: var(--muted); }

        .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
      `}</style>
    </>
  )
}
