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

  async function handleSubmit(e) {
    e.preventDefault()
    const btn = e.target.querySelector('button[type=submit]')
    btn.textContent = 'Sending...'
    btn.disabled = true
    try {
      const res = await fetch('https://formspree.io/f/REPLACE_WITH_YOUR_ID', {
        method: 'POST',
        body: new FormData(e.target),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        btn.textContent = '✓ Message Sent!'
        btn.style.background = '#10b981'
        e.target.reset()
      } else { throw new Error() }
    } catch {
      btn.textContent = '✗ Try Again'
      btn.style.background = '#ef4444'
    } finally {
      btn.disabled = false
      setTimeout(() => { btn.textContent = 'Send Message →'; btn.style.background = '' }, 3000)
    }
  }


  return (
    <>
      <Head>
        <title>Texas AGI Labs — Frontier Intelligence Research</title>
        <meta name="description" content="Texas AGI Labs is an independent research institution advancing the frontiers of Artificial General Intelligence — safely, responsibly, and openly." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.texasagilabs.com" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        <link rel="apple-touch-icon" href="/favicon-180.png" />

        {/* OG / Social */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Texas AGI Labs — Frontier Intelligence Research" />
        <meta property="og:description" content="Pioneering aligned AGI systems for humanity's long-term benefit. Based in McKinney, Texas." />
        <meta property="og:url" content="https://www.texasagilabs.com" />
        <meta property="og:image" content="https://www.texasagilabs.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Texas AGI Labs" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Texas AGI Labs — Frontier Intelligence Research" />
        <meta name="twitter:description" content="Pioneering aligned AGI systems for humanity's long-term benefit." />
        <meta name="twitter:image" content="https://www.texasagilabs.com/og-image.png" />

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
              <div className="form-field"><label htmlFor="fname">First Name</label><input type="text" id="fname" name="first_name" placeholder="Ada" /></div>
              <div className="form-field"><label htmlFor="lname">Last Name</label><input type="text" id="lname" name="last_name" placeholder="Lovelace" /></div>
              <div className="form-field"><label htmlFor="email">Email Address</label><input type="email" id="email" name="email" placeholder="ada@university.edu" /></div>
              <div className="form-field">
                <label htmlFor="role">I Am</label>
                <select id="role" name="role">
                  <option value="">Select your background</option>
                  <option>AI / ML Researcher</option><option>Software Engineer</option>
                  <option>Academic / Professor</option><option>Industry Professional</option>
                  <option>Student</option><option>Investor / Partner</option>
                  <option>Journalist / Press</option><option>Other</option>
                </select>
              </div>
              <div className="form-field form-full"><label htmlFor="message">Message</label><textarea id="message" name="message" rows={5} placeholder="Tell us about your interest in AGI research, collaboration opportunities, or questions about our work..."></textarea></div>
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

    </>
  )
}
