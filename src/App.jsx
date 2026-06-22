import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  // --- Theme Management State ---
  const [theme, setTheme] = useState('dark');

  // --- Typing Animation State ---
  const roles = ['Fullstack Developer_', 'Web Developer_', 'Graphic Designer_','Game Developer', 'System Builder_'];
  const [typedText, setTypedText] = useState('');
  const roleIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  // --- Contact Form State ---
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', body: '' });
  const [formStatus, setFormStatus] = useState({ text: '', type: '' }); // type: 'success' | 'error' | ''

  // --- Apply Theme Attribute to HTML Node ---
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // --- Typing Effect Loop ---
  useEffect(() => {
    let timer;
    const handleTyping = () => {
      const currentRole = roles[roleIdx.current];

      if (!deleting.current) {
        charIdx.current++;
        setTypedText(currentRole.slice(0, charIdx.current));

        if (charIdx.current === currentRole.length) {
          deleting.current = true;
          timer = setTimeout(handleTyping, 1500);
          return;
        }
      } else {
        charIdx.current--;
        setTypedText(currentRole.slice(0, charIdx.current));

        if (charIdx.current === 0) {
          deleting.current = false;
          roleIdx.current = (roleIdx.current + 1) % roles.length;
        }
      }

      timer = setTimeout(handleTyping, deleting.current ? 50 : 90);
    };

    timer = setTimeout(handleTyping, 90);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const sendEmail = () => {
    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const body = formData.body.trim();

    if (!name || !email || !body) {
      setFormStatus({ text: 'Please fill in your name, email, and message.', type: 'error' });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormStatus({ text: 'Please enter a valid email address.', type: 'error' });
      return;
    }

    const fullBody = `Hi Amani,\n\nMy name is ${name} (${email}).\n\n${body}\n\nBest regards,\n${name}`;
    window.location.href = `mailto:sengaamani7@gmail.com?subject=${encodeURIComponent(
      subject || 'Message from ' + name
    )}&body=${encodeURIComponent(fullBody)}`;

    setFormStatus({ text: 'Your email client is opening — thank you for reaching out!', type: 'success' });
  };

  return (
    <>
      <div className="bg-grid"></div>
      <div className="glow-orb"></div>

      {/* --- NAVIGATION --- */}
      <nav>
        <a href="#about" className="brand-logo">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="44" stroke="var(--green)" strokeWidth="4" fill="none" />
            <path d="M28 65V35L42 53V35H50V65L36 47V65H28Z" fill="var(--green)" />
            <path d="M54 58C54 62.5 57.5 65 62 65C66.5 65 70 62.5 70 58C70 54 67 52.5 63 51.5C58 50.5 55 49 55 45C55 41 58 39 62 39C66 39 69 41 69 45H63C63 42.5 62 42 61.5 42C60 42 59.5 43 59.5 44.5C59.5 46.5 61 47 64.5 48C69 49 75 51 75 57.5C75 64 69.5 67 62 67C54.5 67 48 63.5 48 58H54Z" fill="var(--green)" />
            <path d="M48 35L58 65H52L50 58H40L38 65H32L42 35H48ZM45 42L41 53H49L45 42Z" fill="var(--green)" />
          </svg>
          <div className="nav-logo">Amani.dev</div>
        </a>
        <div className="nav-right">
          <ul className="nav-links">
            <li><a href="#about">about</a></li>
            <li><a href="#skills">skills</a></li>
            <li><a href="#projects">projects</a></li>
            <li><a href="#contact">contact</a></li>
          </ul>
          <button className="theme-btn" onClick={toggleTheme}>
            <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
            <span>{theme === 'dark' ? 'light' : 'dark'}</span>
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="about">
        <div className="hero">
          <div className="hero-content">
            <div className="hero-tag fade-up">Available for work</div>
            <h1 className="hero-name fade-up delay-1">
              Amani<span>Senga</span>
            </h1>
            <p className="hero-title fade-up delay-2">
              <span>{typedText}</span>
              <span className="cursor"></span>
            </p>
            <p className="hero-bio fade-up delay-3">
              Fullstack software developer & graphic designer based in Rwanda.
              I build fast, functional, and visually compelling digital products —
              from web applications and systems to brand identities that leave a mark.
            </p>
            <div className="hero-cta fade-up delay-4">
              <a href="#projects" class="btn btn-primary">View Projects</a>
              <a href="#contact" class="btn btn-outline">Get In Touch</a>
            </div>
            <div className="hero-cta hero-stats fade-up delay-4">
              <div><div className="stat-num">10<span>+</span></div><div className="stat-label">Projects Built</div></div>
              <div><div className="stat-num">3<span>+</span></div><div class="stat-label">Years Experience</div></div>
              <div><div className="stat-num">2<span>x</span></div><div className="stat-label">Dev + Designer</div></div>
            </div>
          </div>

          <div className="hero-visual fade-up delay-2">
            <div className="flash-container">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
                <defs>
                  <filter id="neon-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="nsa-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00cc6a" />
                    <stop offset="1" stopColor="#00aadd" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="44" stroke="url(#nsa-gradient)" strokeWidth="4" opacity="0.25" filter="url(#neon-glow)" />
                <circle cx="50" cy="50" r="44" stroke="#00cc6a" strokeWidth="4" filter="url(#neon-glow)" />
                <path d="M26 68V32L44 55V32H52V68L34 45V68H26Z" fill="url(#nsa-gradient)" filter="url(#neon-glow)" />
                <path d="M26 68V32L44 55V32H52V68L34 45V68H26Z" fill="#a6ffcc" opacity="0.9" />
                <path d="M52 60C52 65.5 56.5 68 62 68C67.5 68 72 65.5 72 60C72 54.5 68.5 52.5 63.5 51C57.5 49.5 54 47.5 54 43C54 38.5 57.5 36 62 36C66.5 36 70 38.5 70 43H62.5C62.5 40.5 61.5 40 60.5 40C59 40 58.5 41 58.5 42.5C58.5 45 60.5 45.5 64.5 47C69.5 48.5 76.5 51 76.5 59.5C76.5 67.5 69.5 71 62 71C53 71 45 66.5 45 60H52Z" fill="url(#nsa-gradient)" filter="url(#neon-glow)" />
                <path d="M52 60C52 65.5 56.5 68 62 68C67.5 68 72 65.5 72 60C72 54.5 68.5 52.5 63.5 51C57.5 49.5 54 47.5 54 43C54 38.5 57.5 36 62 36C66.5 36 70 38.5 70 43H62.5C62.5 40.5 61.5 40 60.5 40C59 40 58.5 41 58.5 42.5C58.5 45 60.5 45.5 64.5 47C69.5 48.5 76.5 51 76.5 59.5C76.5 67.5 69.5 71 62 71C53 71 45 66.5 45 60H52Z" fill="#a6ffcc" opacity="0.9" />
                <path d="M49 32L61 68H53.5L51 60H39L36.5 68H29L41 32H49ZM45 40L40 54H50L45 40Z" fill="url(#nsa-gradient)" filter="url(#neon-glow)" />
                <path d="M49 32L61 68H53.5L51 60H39L36.5 68H29L41 32H49ZM45 40L40 54H50L45 40Z" fill="#a6ffcc" opacity="0.9" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section id="skills">
        <div className="section-wrap">
          <div className="section-header">
            <span className="section-num">01 // skills</span>
            <h2 className="section-title">What I Bring</h2>
          </div>
          <div className="skills-grid">
            <div className="skill-card">
              <div className="skill-icon green">💻</div>
              <h3>Frontend Development</h3>
              <p>Building responsive, interactive interfaces that users love to navigate.</p>
              <div className="skill-tags">
                <span className="tag">HTML</span><span class="tag">CSS</span><span class="tag">JavaScript</span><span class="tag">React</span>
              </div>
            </div>
            <div className="skill-card">
              <div className="skill-icon blue">⚙️</div>
              <h3>Backend Development</h3>
              <p>Designing APIs, databases, and server-side logic that power real systems.</p>
              <div className="skill-tags">
                <span className="tag">Node.js</span><span class="tag">PHP</span><span class="tag">Python</span><span class="tag">MySQL</span>
              </div>
            </div>
            <div className="skill-card">
              <div className="skill-icon purple">🎨</div>
              <h3>Graphic Design</h3>
              <p>Creating brand identities, UI designs, and visual assets that communicate clearly.</p>
              <div className="skill-tags">
                <span className="tag">Figma</span><span class="tag">Photoshop</span><span class="tag">Illustrator</span><span class="tag">Branding</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects">
        <div className="section-wrap">
          <div className="section-header">
            <span className="section-num">02 // projects</span>
            <h2 className="section-title">Selected Work</h2>
          </div>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-type">Web Application</div>
              <h3>Business Management System</h3>
              <p>A fullstack system with inventory, sales tracking, and reporting modules built for small businesses.</p>
              <div className="skill-tags" style={{ marginTop: '1rem' }}>
                <span className="tag">Fullstack</span><span class="tag">System</span>
              </div>
            </div>
            <div className="project-card">
              <div className="project-type">Website</div>
              <h3>Corporate Website</h3>
              <p>Modern responsive business website with CMS, contact forms, and performance-optimized design.</p>
              <div className="skill-tags" style={{ marginTop: '1rem' }}>
                <span className="tag">Frontend</span><span class="tag">CMS</span>
              </div>
            </div>
            <div className="project-card">
              <div className="project-type">Design</div>
              <h3>Brand Identity Design</h3>
              <p>Complete brand kit including logo, color palette, typography, and usage guidelines for a local startup.</p>
              <div className="skill-tags" style={{ marginTop: '1rem' }}>
                <span className="tag">Graphic Design</span><span class="tag">Branding</span>
              </div>
            </div>
            <div className="project-card">
              <div className="project-type">System</div>
              <h3>School Management System</h3>
              <p>Student enrollment, grading, attendance, and report generation system for educational institutions.</p>
              <div className="skill-tags" style={{ marginTop: '1rem' }}>
                <span className="tag">Fullstack</span><span class="tag">Database</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="contact-section">
        <div className="contact-inner">
          <div className="contact-top">
            <span className="section-num">03 // contact</span>
            <h2 className="contact-tagline">Let's build something <span>great</span> together.</h2>
            <p className="contact-desc">Whether it's a website, a system, or a brand identity — reach out directly or fill the form and I'll get back to you.</p>
          </div>
          <div className="contact-grid">
            <div className="contact-items">
              <a className="contact-item" href="mailto:sengaamani7@gmail.com">
                <div className="contact-item-icon">✉️</div>
                <div><div className="contact-item-label">email</div><div className="contact-item-value">sengaamani7@gmail.com</div></div>
              </a>
              <a className="contact-item" href="tel:+250793579307">
                <div className="contact-item-icon">📞</div>
                <div><div className="contact-item-label">phone</div><div className="contact-item-value">+250 793 579 307</div></div>
              </a>
              <a className="contact-item" href="https://wa.me/250793579307" target="_blank" rel="noreferrer">
                <div className="contact-item-icon">💬</div>
                <div><div className="contact-item-label">whatsapp</div><div className="contact-item-value">+250 793 579 307</div></div>
              </a>
              <a className="contact-item" href="https://instagram.com/a.m.a.n.i.s.e.n.g.a" target="_blank" rel="noreferrer">
                <div className="contact-item-icon">📸</div>
                <div><div className="contact-item-label">instagram</div><div className="contact-item-value">@a.m.a.n.i.s.e.n.g.a</div></div>
              </a>
              <a className="contact-item" href="https://linkedin.com/in/senga-amani" target="_blank" rel="noreferrer">
                <div className="contact-item-icon">💼</div>
                <div><div className="contact-item-label">linkedin</div><div className="contact-item-value">senga amani</div></div>
              </a>
            </div>

            <div className="email-form-wrap">
              <div className="form-title">Send me a message</div>
              <div className="form-row">
                <div className="form-group">
                  <label>your name</label>
                  <input type="text" id="name" placeholder="John Doe" value={formData.name} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>your email</label>
                  <input type="email" id="email" placeholder="you@example.com" value={formData.email} onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-group">
                <label>subject</label>
                <input type="text" id="subject" placeholder="Project inquiry, collaboration..." value={formData.subject} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>message</label>
                <textarea id="body" placeholder="Tell me about your project or idea..." value={formData.body} onChange={handleInputChange}></textarea>
              </div>
              <button className="btn-send" onClick={sendEmail}>Send Message ➜</button>
              
              {formStatus.text && (
                <div className={`form-status ${formStatus.type}`}>
                  {formStatus.text}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer>
        <p>Designed & built by <span>Amani Senga</span> · © 2026</p>
      </footer>
    </>
  );
}