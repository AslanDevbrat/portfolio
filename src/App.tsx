import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Mail, Award, ExternalLink, GraduationCap, MapPin, Calendar, Camera, Globe, Download } from 'lucide-react';
import './index.css';

// --- Components ---

function SectionHeading({ title }: { title: string }) {
  return (
    <motion.h2
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="serif section-title"
    >
      {title}
    </motion.h2>
  );
}

interface ListEntryProps {
  title: string;
  subtitle?: string;
  date?: string;
  description?: string[];
  link?: string;
  image?: string;
}

function ListEntry({ title, subtitle, date, description, link, image }: ListEntryProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="list-entry"
    >
      <div className="entry-content">
        <div className="entry-header">
          <h3 className="entry-title">{title}</h3>
          {date && <span className="entry-date">{date}</span>}
        </div>
        {subtitle && <p className="entry-subtitle">{subtitle}</p>}
        {description && (
          <ul className="entry-description">
            {description.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="entry-link">
            Full Publication <ExternalLink size={14} />
          </a>
        )}
      </div>

      {image && (
        <div
          className="entry-image-outer"
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}
        >
          <div className="entry-image-container">
            <img src={image} alt={title} className="entry-image" loading="lazy" />
          </div>
          <AnimatePresence>
            {expanded && (
              <motion.div
                className="entry-image-preview"
                initial={{ opacity: 0, scale: 0.85, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.85, x: 10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <img src={image} alt={title} className="entry-image-preview-img" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

function ConferenceCard({ title, location, date, image }: { title: string, location: string, date: string, image?: string }) {
  const [hovered, setHovered] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="conference-card"
      style={{ position: 'relative', zIndex: hovered ? 20 : 1 }}
    >
      <div
        className="card-image-placeholder"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {image ? (
          <>
            <img
              src={image}
              alt={title}
              className="card-photo"
              loading="lazy"
              onLoad={(e) => {
                const img = e.currentTarget;
                setIsLandscape(img.naturalWidth > img.naturalHeight);
              }}
            />
            <AnimatePresence>
              {hovered && (
                <motion.div
                  className={`card-image-popup ${isLandscape ? 'card-image-popup--landscape' : ''}`}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: isLandscape ? 1.12 : 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                >
                  <img src={image} alt={title} className="card-image-full" />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <Camera size={24} style={{ opacity: 0.1 }} />
        )}
      </div>
      <div className="card-content">
        <h4>{title}</h4>
        <p className="card-meta"><MapPin size={12} /> {location}</p>
        <p className="card-date"><Calendar size={12} /> {date}</p>
      </div>
    </motion.div>
  );
}

// --- App ---

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="portfolio">
      <motion.div className="progress-bar" style={{ scaleX }} />

      <nav className="nav-minimal">
        <div className="logo serif">DA.</div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#awards">Awards</a>
          <a href="#research">Research</a>
          <a href="#patents">Patents</a>
          <a href="#conferences">Conferences</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#writings">Writings</a>
          <a href="#featured-posts">Posts</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <main className="container">
        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="hero-name serif">Devbrat <br /> Anuragi</h1>
              <p className="hero-tagline">Thermal Haptics & XR Researcher</p>
              <div className="hero-meta">
                <span>Tampere University</span>
                <span>•</span>
                <span>Finland</span>
              </div>
              <div className="hero-social">
                <a href="https://orcid.org/0009-0004-4544-5588" target="_blank" rel="noopener noreferrer" title="ORCID">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947-.947-.431-.947-.947.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c2.359 0 3.872-1.303 3.872-3.722s-1.303-3.722-3.872-3.722h-2.297z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/devbrat-anuragi/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="https://github.com/AslanDevbrat" target="_blank" rel="noopener noreferrer" title="GitHub">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href="https://scholar.google.com/citations?user=3lxFZ8EAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" title="Google Scholar">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
                  </svg>
                </a>
                <a href="https://medium.com/@devbrat9156" target="_blank" rel="noopener noreferrer" title="Medium">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                  </svg>
                </a>
                <a href="https://researchportal.tuni.fi/fi/persons/devbrat-anuragi/" target="_blank" rel="noopener noreferrer" title="Tampere Research Portal">
                  <Globe size={18} />
                </a>
                <a href="https://www.instagram.com/dev_aslan/" target="_blank" rel="noopener noreferrer" title="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              </div>
              <div style={{ marginTop: '2rem' }}>
                <a href={`${import.meta.env.BASE_URL}Devbrat_CV.pdf`} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '0.8rem 1.8rem', fontSize: '0.95rem' }}>
                  <Download size={18} /> Download CV
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="hero-image-wrapper"
            >
              <img src={`${import.meta.env.BASE_URL}profile-pic.png`} alt="Devbrat Anuragi" className="profile-img" />
              <div className="image-accent"></div>
            </motion.div>
          </div>
        </section>

        {/* ABOUT & EDUCATION */}
        <section id="about" className="section">
          <SectionHeading title="About & Education" />
          <div className="grid-2">
            <div className="about-col">
              <p className="about-text">
                I am a Ph.D. Researcher at Tampere University specializing in physics-informed thermal haptics and spatial rendering for immersive VR/XR systems. My core work spans conductivity-based thermal interactions, multisensory augmented reality, and dynamic prioritization for complex haptic environments. I am also a contributor to the MPEG-I (ISO/IEC 23090) international standard. Building on this foundation and my background in ubiquitous computing, I am keenly interested in combining artificial intelligence with physical feedback to craft intelligent, context-aware digital experiences.
              </p>
              <div className="edu-list">
                <div className="edu-item">
                  <GraduationCap className="icon" />
                  <div>
                    <h4>Ph.D. in Information Technology</h4>
                    <p>Tampere University | 2023 – Present</p>
                  </div>
                </div>
                <div className="edu-item">
                  <GraduationCap className="icon" />
                  <div>
                    <h4>BS-MS Dual Degree</h4>
                    <p>IISER Bhopal | 2017 – 2022</p>
                    <small>Major in EECS | Proficiency Medalist (Best Academic Performance)</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="awards-summary">
              <h3 className="serif" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Technical Skills</h3>
              <div className="edu-list" style={{ marginTop: '0' }}>
                <div className="edu-item">
                  <div>
                    <h4>Languages</h4>
                    <p style={{ fontSize: '0.95rem', marginTop: '0.2rem', opacity: 0.8 }}>Python, C/C++, C#, Java, SQL (Postgres), XML, Dart, HTML</p>
                  </div>
                </div>
                <div className="edu-item">
                  <div>
                    <h4>Frameworks & Libraries</h4>
                    <p style={{ fontSize: '0.95rem', marginTop: '0.2rem', opacity: 0.8 }}>PyTorch, TensorFlow, Scikit-learn, MediaPipe, React, Flutter</p>
                  </div>
                </div>
                <div className="edu-item">
                  <div>
                    <h4>Developer Tools</h4>
                    <p style={{ fontSize: '0.95rem', marginTop: '0.2rem', opacity: 0.8 }}>Unity, Docker, Git, Azure, GCP, Grafana, ROS2, Android Studio</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AWARDS & HONORS */}
        <section id="awards" className="section gray">
          <SectionHeading title="Awards & Honors" />
          <div className="list-container">
            <ListEntry
              title="People's Choice Student Challenge Winner"
              subtitle="ACM UbiComp / ISWC 2025"
              date="Oct 2025"
              description={["Awarded 1st place at UbiComp 2025 in Helsinki for 'SocialCompass', a real-time support system on AR smart glasses designed to guide self-regulation during high-arousal social moments."]}
            />
            <ListEntry
              title="Proficiency Medal Winner"
              subtitle="Indian Institute of Science Education and Research (IISER) Bhopal"
              date="July 2022"
              description={["Awarded the Proficiency Medal for the best academic performance in Electrical Engineering and Computer Science in the graduating batch of the BS-MS dual degree programme."]}
            />
          </div>
        </section>

        {/* PUBLICATIONS (FULL LIST WITH IMAGES) */}
        <section id="research" className="section">
          <SectionHeading title="Peer-Reviewed Publications" />
          <div className="list-container">
            <ListEntry
              title="Which is Warmer, the Cake or the Oven? Unlocking Thermal Conductivity for VR Interaction"
              subtitle="Proc. CHI Conference on Human Factors in Computing Systems (CHI '26)"
              date="2026"
              description={["D. Anuragi, A. Farooq, R. Singh, et al."]}
              link="https://doi.org/10.1145/3772318.3790864"
              image={`${import.meta.env.BASE_URL}Pictures/CHI paper image.jpg`}
            />
            <ListEntry
              title="Augmenting Vision with Co-Located Live Thermal View in Mixed Reality"
              subtitle="Proc. Augmented Humans International Conference (AHs 2026)"
              date="2026"
              description={["D. Anuragi, M. Zeeja, and R. Raisamo"]}
              link="https://doi.org/10.1145/3795011.3795031"
              image={`${import.meta.env.BASE_URL}Pictures/Augmenting vision with co.png`}
            />
            <ListEntry
              title="Conductivity-Based Thermal Haptics: Modeling and Perceptual Evaluation for Material Discrimination in VR"
              subtitle="Proc. 2025 IEEE World Haptics Conference (WHC)"
              date="2025"
              description={["D. Anuragi, A. Farooq, R. Singh, et al."]}
              link="https://di0zxmb8pwajl.cloudfront.net/khc/conference/whc/abs2/WP1-52.pdf"
              image={`${import.meta.env.BASE_URL}Pictures/Conductivity based thermal haptics.jpg`}
            />
            <ListEntry
              title="Discriminating Materials Using Physics-Informed Thermal Haptics in VR"
              subtitle="Proc. 2025 IEEE World Haptics Conference (WHC)"
              date="2025"
              description={["D. Anuragi, A. Farooq, M. Honarmandmozafari, et al."]}
              link="https://di0zxmb8pwajl.cloudfront.net/khc/conference/whc/abs2/D2-18.pdf"
              image={`${import.meta.env.BASE_URL}Pictures/Dicriminating Material using.png`}
            />
            <ListEntry
              title="MPEG Haptics White Paper: ISO/IEC 23090-31 Standard (Phase 1)"
              subtitle="MPEG Document w25993 — ISO/IEC JTC 1/SC 29/WG 04 (153rd Meeting)"
              date="2025"
              description={[
                "D. Anuragi et al.",
                "Comprehensive white paper describing the MPEG Haptics standard phase 1 (ISO/IEC 23090-31), covering encoding, transport (ISO/IEC 23090-32), and IETF RTP RFC 9695. Revised per AG3 requests."
              ]}
              link="https://www.mpeg.org/wp-content/uploads/mpeg_meetings/153_OnLine/w25993.zip"
              image={`${import.meta.env.BASE_URL}Pictures/Mpeg White paper.png`}
            />
            <ListEntry
              title="A Social Compass: Guiding Self-Regulation in High-Arousal Moments with Ubiquitous Sensing"
              subtitle="Companion of the 2025 ACM Int. Joint Conf. on Pervasive and Ubiquitous Computing (UbiComp '25)"
              date="2025"
              link="https://doi.org/10.1145/3714394.3750591"
              image={`${import.meta.env.BASE_URL}Pictures/Social compass.png`}
            />
            <ListEntry
              title="Sensing What You Do Not See: Alerting of Approaching Objects with a Haptic Vest"
              subtitle="Sensors (MDPI), vol. 25, no. 18"
              date="2025"
              link="https://doi.org/10.3390/s25185808"
              image={`${import.meta.env.BASE_URL}Pictures/seensing what you dont see.png`}
            />
            <ListEntry
              title="Securing local LLMs for academic research: a human-system integration analysis and evolution of TAUCHI-GPT"
              subtitle="Human-Intelligent Systems Integration, vol. 7"
              date="2025"
              link="https://doi.org/10.1007/s42454-025-00085-9"
              image={`${import.meta.env.BASE_URL}Pictures/Securing LLMs.webp`}
            />
            <ListEntry
              title="Towards Bringing Parity in Pretraining Datasets for Low-resource Indian Languages"
              subtitle="Proc. IEEE Int. Conf. on Acoustics, Speech and Signal Processing (ICASSP)"
              date="2025"
              link="https://doi.org/10.1109/ICASSP49660.2025.10888018"
              image={`${import.meta.env.BASE_URL}Pictures/Towards Bringing Parity in.gif`}
            />
          </div>
        </section>

        {/* PATENT APPLICATIONS (FULL LIST) */}
        <section id="patents" className="section gray">
          <SectionHeading title="Patent Applications (with Nokia Technologies Oy)" />
          <div className="list-container">
            <ListEntry
              title="A Method for Real-Time Spatial Haptic Rendering via Dynamic Priority Management"
              subtitle="Lead Inventor"
              date="Filed Mar 2025"
              description={["App. No.: 63/778657"]}
            />
            <ListEntry
              title="Multi-Level Intensity Scaling for Haptic Prioritization Queues for Cognitive Load Reduction"
              subtitle="Lead Inventor"
              date="Filed Jun 2025"
              description={["App. No.: 63/821587"]}
            />
            <ListEntry
              title="User Focus Integration with Hand and Gaze Tracking for Adaptive Haptic Rendering"
              subtitle="Lead Inventor"
              date="Filed Jun 2025"
              description={["App. No.: 63/821791"]}
            />
            <ListEntry
              title="Dynamic priority culling for split rendering in networked haptics applications"
              subtitle="Co-Inventor"
              date="Filed Jun 2025"
              description={["App. No.: 63/821781"]}
            />
            <ListEntry
              title="Intelligent Haptic Signal Mediation through Energy Propagation in Virtual Environments"
              subtitle="Co-Inventor"
              date="Filed Jan 2025"
              description={["App. No.: 63/746420"]}
            />
            <ListEntry
              title="Method for the Application of Entropy and Thermal Decay within a Haptic Scene"
              subtitle="Co-Inventor"
              date="Filed Jan 2025"
              description={["App. No.: 63/746410"]}
            />
          </div>
        </section>

        {/* CONFERENCES SECTION */}
        <section id="conferences" className="section">
          <SectionHeading title="Conferences & Travels" />
          <div className="conference-grid">
            <ConferenceCard title="Augmented Humans 2026" location="Okinawa, Japan" date="Feb 2026" image={`${import.meta.env.BASE_URL}Pictures/Augmented Huaman 2026.jpg`} />
            <ConferenceCard title="CES 2026" location="Las Vegas, USA" date="Jan 2026" image={`${import.meta.env.BASE_URL}Pictures/CES 2026.jpg`} />
            <ConferenceCard title="IEEE World Haptics 2025" location="Suwon, South Korea" date="July 2025" image={`${import.meta.env.BASE_URL}Pictures/IEEE world Haptics.jpg`} />
            <ConferenceCard title="ACM UbiComp / ISWC 2025" location="Helsinki, Finland" date="Oct 2025" image={`${import.meta.env.BASE_URL}Pictures/ubicomp.jpg`} />
            <ConferenceCard title="152nd MPEG Meeting" location="Geneva, Switzerland" date="Oct 2025" image={`${import.meta.env.BASE_URL}Pictures/MPEG 152.jpg`} />
            <ConferenceCard title="151st MPEG Meeting" location="Daejeon, South Korea" date="July 2025" image={`${import.meta.env.BASE_URL}Pictures/Mepg 151.jpg`} />
            <ConferenceCard title="AWE 2024" location="Vienna, Austria" date="Oct 2024" image={`${import.meta.env.BASE_URL}Pictures/AWE.jpg`} />
            <ConferenceCard title="ACDL Summer School" location="Siena, Italy" date="June 2024" image={`${import.meta.env.BASE_URL}Pictures/ACDL.jpg`} />
            <ConferenceCard title="Nokia Oulu Guest Visit" location="Oulu, Finland" date="2025" image={`${import.meta.env.BASE_URL}Pictures/nokia oulu.jpg`} />
          </div>
        </section>

        {/* ENGINEERING EXPERIENCE */}
        <section id="experience" className="section gray">
          <SectionHeading title="Experience" />
          <div className="list-container">
            <ListEntry
              title="Featured Research Demonstrator"
              subtitle="CES 2026 Showcase | Las Vegas"
              date="Jan 2026"
              description={["Showcased GorZilla and SocialCompass research demos to global industry leaders."]}
            />
            <ListEntry
              title="Featured Researcher"
              subtitle="Nokia Research Feature – Feel The Future"
              date="May 2025"
              description={["Selected for Nokia's official video on the future of thermal haptics in XR."]}
            />
            <ListEntry
              title="Master's Thesis Co-Supervisor"
              subtitle="Tampere University"
              date="Nov 2024 – Present"
              description={[
                "Co-supervising three Master's students on topics related to thermal-RGB datasets and rubber hand illusions.",
                "Providing guidance on research methodology, experimental design, and data analysis."
              ]}
            />
            <ListEntry
              title="Project Associate"
              subtitle="AI4Bharat Lab — Indian Institute of Technology Madras (IIT Madras)"
              date="Aug 2022 – Nov 2023"
              description={[
                "Overseeing a nationwide speech collection and automatic speech recognition (ASR) project across India.",
                "Making substantial contributions to NLP projects including low-resource Indian language pretraining datasets."
              ]}
            />
            <ListEntry
              title="Computer Vision Intern"
              subtitle="Industrial Collaboration with Awiros"
              date="July 2021 – April 2022"
              description={["Developed skeleton-based action recognition and violence detection models for CCTV feeds."]}
            />
            <ListEntry
              title="Android App Developer"
              subtitle="Teceads Solutions Pvt. Ltd."
              date="April 2020 – May 2020"
              description={[
                "Developed an Android app to geo-fence quarantined individuals during the COVID-19 pandemic using Firebase.",
                "The application was recognized and implemented at the district level for public health monitoring."
              ]}
            />
            <ListEntry
              title="Teaching Assistant"
              subtitle="Indian Institute of Science Education and Research (IISER) Bhopal"
              date="Jan 2019 – May 2022"
              description={[
                "Selected as Teaching Assistant for 'Introduction to Programming' for three consecutive years and 'Introduction to Databases'.",
                "Assisted professors in conducting programming labs and grading assignments for undergraduate students."
              ]}
            />
          </div>
        </section>

        {/* SELECTED PROJECTS */}
        <section id="projects" className="section">
          <SectionHeading title="Selected Engineering Projects" />
          <div className="grid-2">
            <ListEntry
              title="MPEG Haptic Evaluation Platform (Phase 2)"
              subtitle="Major Contributor — ISO/IEC JTC 1/SC 29/WG 04"
              description={[
                "Core contributor to the official MPEG reference software for evaluating haptic codecs under the ISO/IEC 23090-31 standard.",
                "Platform used internationally by standards participants for objective and subjective quality assessment of encoded haptic signals."
              ]}
              link="https://git.mpeg.expert/MPEG/3dgh/haptics/software/evaluation_software_phase_2#introduction"
            />
            <ListEntry
              title="MPEG Haptics Driver (Nokia Technologies)"
              subtitle="Author — Open Source, C/C++"
              description={[
                "Developed the open-source haptics driver enabling playback of MPEG Haptics (ISO/IEC 23090-31) encoded content on hardware actuators.",
                "Published under Nokia Technologies on GitHub."
              ]}
              link="https://github.com/nokiatech/haptics_driver"
            />
            <ListEntry
              title="Gesture Controlled Video Game"
              subtitle="Python, PyGame, MediaPipe, OpenCV"
              date="May – Jun 2021"
              description={[
                "Car-dodge game playable by waving a finger in front of a camera — no controller needed.",
                "Real-time hand landmark estimation and angle calculation. Went viral on social media.",
                "Featured article on Analytics Vidhya; full code on GitHub."
              ]}
              link="https://www.analyticsvidhya.com/blog/2021/06/gesture-controlled-video-game/"
              image="https://cdn.analyticsvidhya.com/wp-content/uploads/2021/06/v1.gif"
            />
            <ListEntry
              title="Robotics & Path Planning"
              subtitle="ROS2, Python, Gazebo"
              date="Jan – May 2021"
              description={[
                "Local path planning via Virtual Potential Fields; D-star vs A-star algorithm comparison.",
                "Implemented and visualised RRT / RRT* in a fixed environment.",
                "DWA algorithm in Gazebo robot simulation. Medium article published."
              ]}
              link="https://github.com/AslanDevbrat/Robotics"
              image="https://opengraph.githubassets.com/1/AslanDevbrat/Robotics"
            />
            <ListEntry
              title="Mixed Reality Integration (GorZilla)"
              subtitle="Unity, C#, Meta Quest 3"
              date="Dec 2023 – Apr 2024"
              description={[
                "Passthrough + Scene Understanding for seamless VR/real-world blending.",
                "Hand, eye, body, and face tracking with voice/audio detection.",
                "Integrated Actronika Skinetic vest for full-body spatial haptic feedback. Showcased at CES 2026."
              ]}
              image="https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&q=80&w=400"
            />
            <ListEntry
              title="Generative ML for Bio-Pharma"
              subtitle="Python, Knime, GENTRL"
              date="Jan – May 2022"
              description={[
                "Trained a GENTRL generative model to design molecules inhibiting Sickle Cell Anemia.",
                "Random Forest Regressor for pharmacokinetics property classification.",
                "Data scraped from DisGeNET, NCBI, and DrugBank using Knime + Python."
              ]}
              link="https://github.com/AslanDevbrat/Biopharma"
              image="https://opengraph.githubassets.com/1/AslanDevbrat/Biopharma"
            />
            <ListEntry
              title="Skeleton-Based Action Recognition"
              subtitle="Python, MediaPipe, LSTM"
              date="Jun – Jul 2021"
              description={[
                "Custom dataset of 30 videos per class; sequential LSTM trained to classify 3 actions.",
                "Real-time pose landmark extraction via MediaPipe with 90% accuracy."
              ]}
              link="https://github.com/AslanDevbrat/AwirosProject"
              image="https://opengraph.githubassets.com/1/AslanDevbrat/AwirosProject"
            />
          </div>
        </section>

        {/* WRITINGS & ARTICLES */}
        <section id="writings" className="section">
          <SectionHeading title="Writings & Articles" />
          <div className="grid-2">
            <ListEntry
              title="Gesture Controlled Video Game"
              subtitle="Analytics Vidhya / Medium"
              date="June 2021"
              description={["A comprehensive technical blog detailing the creation of a car-dodge game controlled entirely by hand gestures via MediaPipe and OpenCV."]}
              link="https://www.analyticsvidhya.com/blog/2021/06/gesture-controlled-video-game/"
            />
            <ListEntry
              title="Analysis of ChEMBL COVID-19 Dataset"
              subtitle="Medium"
              date="Sept 2020"
              description={["An exploration of the ChEMBL COVID-19 dataset using basic machine learning techniques, Random Forest regression, and Lipinski's Rule for predicting bio-activity."]}
              link="https://medium.com/nerd-for-tech/analysis-of-chembl-covid-19-dataset-using-basic-ml-techniques-c89a6b79088a"
            />
            <ListEntry
              title="Local Path Planning Using Virtual Potential Field"
              subtitle="Medium"
              date="May 2021"
              description={["A guide on implementing D-star, A-star, and Virtual Potential Fields in Python for autonomous robotics path planning."]}
              link="https://medium.com/nerd-for-tech/local-path-planning-using-virtual-potential-field-in-python-ec0998f490af"
            />
            <ListEntry
              title="Atmospheric Correction of Satellite Images"
              subtitle="Medium"
              date="May 2021"
              description={["A technical walkthrough on performing atmospheric correction on Geoinformatics satellite imagery using Python and Folium."]}
              link="https://medium.com/nerd-for-tech/atmospheric-correction-of-satellite-images-using-python-42128504afc3"
            />
          </div>
        </section>

        {/* FEATURED POSTS */}
        <section id="featured-posts" className="section gray">
          <SectionHeading title="Featured Posts" />
          <div className="featured-posts-grid">
            {/* Format: extract the number after "activity-" from any LinkedIn post URL
                e.g. activity-6953687210986463232 → urn:li:activity:6953687210986463232 */}
            <iframe
              src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7417947396321550338"
              height="600"
              width="504"
              style={{ border: 'none' }}
              allowFullScreen
              title="LinkedIn post — People's Choice Award"
              className="linkedin-embed"
            />
            <iframe
              src="https://www.linkedin.com/embed/feed/update/urn:li:activity:6953687210986463232"
              height="600"
              width="504"
              style={{ border: 'none' }}
              allowFullScreen
              title="LinkedIn post — Proficiency Medal"
              className="linkedin-embed"
            />
            <iframe
              src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7384888259543216128"
              height="600"
              width="504"
              style={{ border: 'none' }}
              allowFullScreen
              title="LinkedIn post — UbiComp Award Win"
              className="linkedin-embed"
            />
            <iframe
              src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7366041657537974272"
              height="600"
              width="504"
              style={{ border: 'none' }}
              allowFullScreen
              title="LinkedIn post"
              className="linkedin-embed"
            />
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section footer">
          <div className="footer-content">
            <h2 className="serif">Let's connect</h2>
            <div className="link-grid">
              <a href="mailto:devbrat9156@gmail.com"><Mail /> devbrat9156@gmail.com</a>
              <a href="mailto:devbrat.anuragi@tuni.fi"><Mail /> devbrat.anuragi@tuni.fi</a>
              <a href="https://www.linkedin.com/in/devbrat-anuragi/">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.4em' }}>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
            <div className="footer-bottom">
              <p>© 2026 Devbrat Anuragi • AI-Driven Haptics & Innovation</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
