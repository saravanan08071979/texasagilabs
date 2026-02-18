import Head from 'next/head'
import { useEffect, useRef } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const formRef = useRef(null)

  // Scroll reveal
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            const children = e.target.querySelectorAll(
              `.${styles.researchCard}, .${styles.modelCard}, .${styles.safetyPillar}`
            )
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
      },
      { threshold: 0.1 }
    )
    reveals.forEach((r) => observer.observe(r))
    return () => observer.disconnect()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    const btn = formRef.current.querySelector('button[type=submit]')
    btn.textContent = '✓ Message Sent!'
    btn.style.background = 'var(--green)'
    setTimeout(() => {
      btn.textContent = 'Send Message →'
      btn.style.background = ''
    }, 3000)
  }

  return (
    <>
      <Head>
        <title>Texas AGI Labs — Frontier Intelligence Research</title>
        <meta
          name="description"
          content="Texas AGI Labs is an independent research institution advancing the frontiers of Artificial General Intelligence — safely, responsibly, and openly."
        />
        <meta property="og:title" content="Texas AGI Labs — Frontier Intelligence Research" />
        <meta
          property="og:description"
          content="Pioneering aligned AGI systems for humanity's long-term benefit."
        />
        <meta property="og:url" content="https://www.texasagilabs.com" />
      </Head>

      <div className={styles.gridBg} />

      {/* ── NAV ── */}
      <nav className={styles.nav}>
        <a href="/" className={styles.navLogo}>
          <img src="/texasagilabs-logo.png" alt="Texas AGI Labs Logo" className={styles.logoImg} />
          <span className={styles.logoText}>Texas AGI Labs</span>
        </a>
        <ul className={styles.navLinks}>
          <li><a href="#research">Research</a></li>
          <li><a href="#models">Models</a></li>
          <li><a href="#safety">Safety</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#contact" className={styles.navCta}>Request Access</a>
      </nav>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.orbitRing}><div className={styles.orbitDot} /></div>
        <div className={`${styles.orbitRing} ${styles.orbitRing2}`}><div className={styles.orbitDot} /></div>
        <div className={`${styles.orbitRing} ${styles.orbitRing3}`}><div className={styles.orbitDot} /></div>

        <span className={styles.heroTag}>★ Frontier AI Research — McKinney, Texas</span>

        <h1 className={styles.heroH1}>
          Building<br />
          <span className={styles.accentWord}>Trusted AGI</span><br />
          Systems
        </h1>

        <p className={styles.heroSub}>
          Researching and aligning artificial general intelligence systems
          to unlock unprecedented human progress — safely, responsibly, and openly.
        </p>

        <div className={styles.heroButtons}>
          <a href="#models" className={styles.btnPrimary}>Explore Our Models</a>
          <a href="#research" className={styles.btnGhost}>Research Portfolio →</a>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className={styles.tickerWrap}>
        <div className={styles.ticker}>
          {[
            'AGI Alignment Research','Mechanistic Interpretability','Frontier Model Safety',
            'Agentic AI Systems','Multimodal Reasoning','Constitutional AI',
            'World Modeling','RLHF / RLAIF','Continual Learning','AI Safety Evaluations',
            'AGI Alignment Research','Mechanistic Interpretability','Frontier Model Safety',
            'Agentic AI Systems','Multimodal Reasoning','Constitutional AI',
            'World Modeling','RLHF / RLAIF','Continual Learning','AI Safety Evaluations',
          ].map((item, i) => (
            <span key={i} className={styles.tickerItem}>{item}</span>
          ))}
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div className={styles.sectionInner} style={{ paddingTop: '6rem', paddingBottom: 0 }}>
        <div className={`${styles.statsBar} reveal`}>
          {[
            { num: '3',    desc: 'Frontier Models' },
            { num: '12+',  desc: 'Research Papers' },
            { num: '100%', desc: 'Safety First' },
            { num: '∞',    desc: 'Human Potential' },
          ].map((s) => (
            <div key={s.desc} className={styles.statBlock}>
              <span className={styles.statNum}>{s.num}</span>
              <span className={styles.statDesc}>{s.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── RESEARCH ── */}
      <section id="research">
        <div className={styles.sectionInner}>
          <div className={styles.sectionLabel}>Research</div>
          <h2 className={styles.sectionTitle}>What We&apos;re<br />Working On</h2>
          <p className={styles.sectionBody}>
            Our research spans the most pressing open problems in AGI — from
            alignment and interpretability to long-horizon planning and
            autonomous agent coordination.
          </p>

          <div className={`${styles.researchGrid} reveal`}>
            {RESEARCH_CARDS.map((card) => (
              <div key={card.num} className={styles.researchCard} style={{ '--card-accent': card.accent }}>
                <div className={styles.cardNumber}>{card.num}</div>
                <span className={styles.cardIcon}>{card.icon}</span>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardBody}>{card.body}</p>
                <span
                  className={styles.cardTag}
                  style={{ color: card.accent, borderColor: `${card.accent}4d`, background: `${card.accent}0d` }}
                >
                  {card.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODELS ── */}
      <section id="models" className={styles.modelsSection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionLabel}>Models</div>
          <h2 className={styles.sectionTitle}>AGI Systems<br />in Development</h2>
          <p className={styles.sectionBody}>
            Three distinct model architectures, each targeting a critical
            capability dimension of the path to beneficial AGI.
          </p>

          <div className={`${styles.modelsGrid} reveal`}>
            {MODELS.map((m) => (
              <div key={m.name} className={styles.modelCard}>
                <div className={styles.modelGlow} style={{ background: `radial-gradient(circle, ${m.color}, transparent)` }} />
                <span
                  className={styles.modelBadge}
                  style={{ background: `${m.color}1a`, color: m.color, border: `1px solid ${m.color}4d` }}
                >
                  {m.statusIcon} {m.statusLabel}
                </span>
                <div className={styles.modelName} style={{ color: m.color }}>{m.name}</div>
                <div className={styles.modelSub}>{m.sub}</div>
                <p className={styles.modelDesc}>{m.desc}</p>
                <div className={styles.modelStats}>
                  {m.stats.map((s) => (
                    <div key={s.label} className={styles.statRow}>
                      <span className={styles.statLabel}>{s.label}</span>
                      <span className={styles.statValue} style={s.colored ? { color: m.color } : {}}>
                        {s.dot && <span className={styles.statusDot} style={{ background: s.dot }} />}
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAFETY ── */}
      <section id="safety">
        <div className={styles.sectionInner}>
          <div className={styles.sectionLabel}>Safety</div>
          <h2 className={styles.sectionTitle}>
            Safety Is Not<br />A Constraint.<br />It&apos;s The Work.
          </h2>

          <div className={`${styles.safetyGrid} reveal`}>
            <div>
              <div className={styles.highlightBar}>
                <div className={styles.dot} />
                <p>
                  All models undergo continuous{' '}
                  <span style={{ color: 'var(--accent)' }}>red-team evaluation</span>{' '}
                  before any deployment milestone.
                </p>
              </div>

              {SAFETY_PILLARS.map((p) => (
                <div key={p.num} className={styles.safetyPillar}>
                  <span className={styles.pillarNum}>{p.num}</span>
                  <div>
                    <h4 className={styles.pillarTitle}>{p.title}</h4>
                    <p className={styles.pillarBody}>{p.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Terminal */}
            <div className={`${styles.terminal} reveal`}>
              <div className={styles.terminalBar}>
                <div className={`${styles.termDot} ${styles.red}`} />
                <div className={`${styles.termDot} ${styles.yellow}`} />
                <div className={`${styles.termDot} ${styles.green}`} />
                <span className={styles.terminalTitle}>safety_eval.sh — ALPHA v2.1</span>
              </div>
              <div className={styles.terminalBody}>
                {TERMINAL_LINES.map((line, i) => (
                  <span key={i} className={`${styles.termLine} ${styles[line.cls] || ''}`}>
                    {line.prompt && <span className={styles.termPrompt}>$ </span>}
                    {line.text}
                    {line.cursor && <span className={styles.termCursor} />}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className={styles.aboutSection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionLabel}>About</div>
          <div className={`${styles.aboutLayout} reveal`}>
            <div>
              <h2 className={styles.sectionTitle}>Why Texas.<br />Why Now.</h2>
              <blockquote className={styles.manifesto}>
                &ldquo;We are at the most consequential moment in the history of intelligence.
                The decisions made in the next decade will shape civilization for centuries.
                We believe that{' '}
                <em style={{ color: 'var(--accent2)', fontStyle: 'normal' }}>
                  safety and capability are complements, not trade-offs
                </em>{' '}
                — and that the best AGI is one humanity can trust unconditionally.&rdquo;
              </blockquote>
              <p className={styles.manifestoAuthor}>
                — Texas AGI Labs Research Team, 2025
              </p>
            </div>

            <div>
              <p className={styles.sectionBody} style={{ marginBottom: '2rem' }}>
                Texas AGI Labs is an independent AI research institution based in
                McKinney, Texas. We exist because we believe the frontier of
                intelligence research should not be concentrated in a single city
                or a single worldview.
              </p>
              <ul className={styles.valueList}>
                {VALUES.map((v) => (
                  <li key={v.title}>
                    <span className={styles.valueIcon}>◈</span>
                    <span>
                      <strong style={{ color: 'var(--text)' }}>{v.title}:</strong> {v.body}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className={styles.contactSection}>
        <div className={styles.sectionInner}>
          <div className={styles.contactInner}>
            <div className={styles.sectionLabel} style={{ justifyContent: 'center' }}>Contact</div>
            <h2 className={styles.sectionTitle}>Join the Mission</h2>
            <p className={styles.sectionBody} style={{ margin: '0 auto', textAlign: 'center' }}>
              Whether you&apos;re a researcher, engineer, institution, or simply
              curious about the future of intelligence — we want to hear from you.
            </p>

            <form ref={formRef} className={`${styles.contactForm} reveal`} onSubmit={handleSubmit}>
              <div className={styles.formField}>
                <label htmlFor="fname">First Name</label>
                <input type="text" id="fname" placeholder="Ada" />
              </div>
              <div className={styles.formField}>
                <label htmlFor="lname">Last Name</label>
                <input type="text" id="lname" placeholder="Lovelace" />
              </div>
              <div className={styles.formField}>
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="ada@university.edu" />
              </div>
              <div className={styles.formField}>
                <label htmlFor="role">I Am</label>
                <select id="role">
                  <option value="">Select your background</option>
                  <option>AI / ML Researcher</option>
                  <option>Software Engineer</option>
                  <option>Academic / Professor</option>
                  <option>Industry Professional</option>
                  <option>Student</option>
                  <option>Investor / Partner</option>
                  <option>Journalist / Press</option>
                  <option>Other</option>
                </select>
              </div>
              <div className={`${styles.formField} ${styles.formFull}`}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us about your interest in AGI research, collaboration opportunities, or questions about our work..."
                />
              </div>
              <div className={styles.formFull} style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                <button type="submit" className={styles.btnPrimary} style={{ padding: '16px 48px', fontSize: '13px' }}>
                  Send Message →
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <a href="/" className={styles.navLogo}>
              <img src="/texasagilabs-logo.png" alt="Texas AGI Labs Logo" className={styles.logoImg} />
              <span className={styles.logoText}>Texas AGI Labs</span>
            </a>
            <p>
              An independent frontier AI research lab advancing the
              science of aligned, interpretable, and beneficial
              artificial general intelligence.
            </p>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.heading} className={styles.footerCol}>
              <h4>{col.heading}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.footerBottom}>
          <p>© 2025–2026 Texas AGI Labs. All rights reserved. McKinney, TX 75070</p>
          <div className={styles.footerBadges}>
            <span className={styles.badge}>Safety-First</span>
            <span className={styles.badge}>Open Research</span>
            <span className={styles.badge}>Texas-Built</span>
          </div>
        </div>
      </footer>
    </>
  )
}

/* ─── DATA ─────────────────────────────────────────────── */

const RESEARCH_CARDS = [
  {
    num: '01 — ALIGNMENT', icon: '⚖️', accent: '#3b82f6',
    title: 'AGI Alignment & Value Learning', status: 'Active Research',
    body: 'Developing robust methods for ensuring frontier AI systems reliably pursue intended goals across novel contexts. We study RLHF, Constitutional AI, and scalable oversight techniques.',
  },
  {
    num: '02 — INTERPRETABILITY', icon: '🔬', accent: '#8b5cf6',
    title: 'Mechanistic Interpretability', status: 'Active Research',
    body: 'Understanding the internal computations of large neural networks. We reverse-engineer circuits, identify features, and map causal structures inside transformer models.',
  },
  {
    num: '03 — AGENTIC SYSTEMS', icon: '🤖', accent: '#06b6d4',
    title: 'Agentic AI & Long-Horizon Tasks', status: 'In Progress',
    body: 'Building AI agents that autonomously plan and execute complex, multi-step goals. We focus on safe autonomy envelopes, agent coordination, and error recovery.',
  },
  {
    num: '04 — REASONING', icon: '🧠', accent: '#10b981',
    title: 'World Modeling & Causal Reasoning', status: 'Upcoming',
    body: "Advancing AI's capacity for physical intuition, counterfactual reasoning, and mental simulation. Grounding intelligence in structured world representations.",
  },
  {
    num: '05 — EVALUATION', icon: '📊', accent: '#f59e0b',
    title: 'Frontier Model Evaluation & Benchmarking', status: 'Active Research',
    body: 'Designing rigorous evaluations for capability and safety. We contribute to ARC-AGI-style benchmarks and red-teaming protocols for autonomy, deception, and emergent behavior.',
  },
  {
    num: '06 — MULTIMODAL', icon: '👁️', accent: '#ef4444',
    title: 'Multimodal & Embodied Cognition', status: 'Planned',
    body: 'Investigating cross-modal understanding — vision, language, audio, and action. Building toward embodied AI that perceives and acts in physical and simulated environments.',
  },
]

const MODELS = [
  {
    name: 'ALPHA', sub: 'Model A1 — Safe Deployment AGI', color: '#3b82f6',
    statusIcon: '◉', statusLabel: 'Operational',
    desc: 'Designed for safe, constrained deployment in high-stakes environments. Enforces explicit safety envelopes, constitutional constraints, and human-oversight requirements at inference time.',
    stats: [
      { label: 'Cert Level',       value: 'S-2 Safety Verified',        colored: true },
      { label: 'Architecture',     value: 'Transformer + Safety Layer'  },
      { label: 'Alignment Method', value: 'Constitutional AI + RLHF'    },
      { label: 'Status',           value: 'Operational', dot: '#10b981' },
    ],
  },
  {
    name: 'OMEGA', sub: 'Model B1 — Robust Cognition', color: '#8b5cf6',
    statusIcon: '◎', statusLabel: 'In Testing',
    desc: 'A general reasoning engine built to operate reliably under uncertainty, stress, and distribution shift. Optimized for causal inference, multi-step planning, and out-of-distribution generalization.',
    stats: [
      { label: 'Cert Level',   value: 'R-1 Robustness',    colored: true },
      { label: 'Architecture', value: 'Hybrid Reasoning + MoE' },
      { label: 'Evaluation',   value: 'ARC-AGI + GPQA'     },
      { label: 'Status',       value: 'In Evaluation', dot: '#f59e0b' },
    ],
  },
  {
    name: 'NOVA', sub: 'Model C1 — Scalable Agent Integration', color: '#06b6d4',
    statusIcon: '○', statusLabel: 'Research Phase',
    desc: 'A multi-agent coordination framework for distributed intelligence. NOVA enables networks of specialized agents to collaborate on complex goals with adaptive task routing and shared memory.',
    stats: [
      { label: 'Cert Level',   value: 'I-3 Integration',      colored: true },
      { label: 'Architecture', value: 'Multi-Agent + RAG'      },
      { label: 'Focus',        value: 'Agentic Coordination'   },
      { label: 'Status',       value: 'Research', dot: '#3b82f6' },
    ],
  },
]

const SAFETY_PILLARS = [
  {
    num: '01', title: 'Alignment by Design',
    body: 'Safety and alignment objectives are core to the training pipeline — not post-hoc filters. We use Constitutional AI and scalable oversight from day one.',
  },
  {
    num: '02', title: 'Interpretability First',
    body: 'We cannot trust what we cannot understand. Every model has a mechanistic audit program to map internal representations and identify deceptive features.',
  },
  {
    num: '03', title: 'Human Oversight Preserved',
    body: 'Our deployment protocols maintain meaningful human control at every capability tier. We operate with explicit autonomy envelopes and corrigibility constraints.',
  },
  {
    num: '04', title: 'Open Safety Research',
    body: 'We publish our safety findings — including failures — to contribute to the global field. A rising tide of safety knowledge lifts all boats.',
  },
]

const TERMINAL_LINES = [
  { prompt: true, text: 'run_safety_eval --model alpha-v2.1 --suite full', cls: 'termCmd' },
  { text: '# Initializing evaluation suite...', cls: 'termComment' },
  { text: '✓ Constitutional constraint check: PASS', cls: 'termOutput' },
  { text: '✓ RLHF reward model alignment: PASS', cls: 'termOutput' },
  { text: '✓ Corrigibility benchmark: PASS (97.3%)', cls: 'termOutput' },
  { text: '✓ Deceptive alignment probe: PASS', cls: 'termOutput' },
  { text: '⚠ Sycophancy score: 0.12 (monitoring)', cls: 'termWarn' },
  { text: '✓ OOD generalization: PASS', cls: 'termOutput' },
  { text: '✓ Red-team adversarial suite: PASS', cls: 'termOutput' },
  { text: '✓ Autonomy envelope test: PASS', cls: 'termOutput' },
  { text: ' ' },
  { text: '# ─── Summary ──────────────────────', cls: 'termComment' },
  { text: '✓ Cert Level: S-2 CONFIRMED', cls: 'termOutput' },
  { text: '✓ Cleared for deployment: YES', cls: 'termOutput' },
  { prompt: true, text: '', cursor: true },
]

const VALUES = [
  { title: 'Research-First',         body: 'Every product decision is grounded in peer-reviewed methodology, not market pressure.' },
  { title: 'Safety-Concurrent',      body: 'Alignment research runs in parallel with capability research — never as an afterthought.' },
  { title: 'Radically Transparent',  body: 'We publish what we learn, including failures, to accelerate the global safety ecosystem.' },
  { title: 'Globally Optimistic',    body: 'We believe AGI, done right, will be humanity\'s greatest achievement — a lever for eliminating poverty, disease, and ignorance.' },
]

const FOOTER_COLS = [
  { heading: 'Research', links: ['Alignment','Interpretability','Agentic Systems','Evaluations','Publications'] },
  { heading: 'Models',   links: ['ALPHA A1','OMEGA B1','NOVA C1','API Access','Model Cards'] },
  { heading: 'Company',  links: ['About','Careers','Press','Privacy Policy','Terms of Use'] },
]
