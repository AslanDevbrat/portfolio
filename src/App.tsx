import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Mail, FileText, Award, ExternalLink, Linkedin, GraduationCap, MapPin, Calendar, Camera } from 'lucide-react';
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
        <div className="entry-image-outer">
          <motion.div 
            className="entry-image-container"
            whileHover={{ 
              scale: 2.8, 
              zIndex: 100,
              x: -100, // Move left slightly to not go off-screen if it's on the right
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          >
            <img src={image} alt={title} className="entry-image" loading="lazy" />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

function ConferenceCard({ title, location, date }: { title: string, location: string, date: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="conference-card"
    >
      <div className="card-image-placeholder">
        <Camera size={24} style={{ opacity: 0.1 }} />
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
          <a href="#research">Research</a>
          <a href="#patents">Patents</a>
          <a href="#conferences">Conferences</a>
          <a href="#experience">Experience</a>
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
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="hero-image-wrapper"
            >
              <img src="/profile pic.png" alt="Devbrat Anuragi" className="profile-img" />
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
                I am a Ph.D. Researcher at Tampere University specializing in physics-informed thermal haptics and spatial rendering for immersive VR/XR systems. My core work spans conductivity-based thermal interactions, multisensory augmented reality, and dynamic prioritization for complex haptic environments. Building on this foundation and my background in ubiquitous computing, I am keenly interested in combining artificial intelligence with physical feedback to craft intelligent, context-aware digital experiences.
              </p>
              <div className="edu-list">
                <div className="edu-item">
                  <GraduationCap className="icon" />
                  <div>
                    <h4>Ph.D. in Information Technology</h4>
                    <p>Tampere University | 2023 – Present</p>
                    <p className="thesis-detail">Dissertation: A Generative Sense of Touch: Leveraging Artificial Intelligence and Spatial Datasets for Thermal Haptic Rendering in VR.</p>
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
              <h3 className="serif" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Awards</h3>
              <div className="award-item">
                <Award className="icon-accent" />
                <div>
                  <strong>People’s Choice Student Challenge Winner</strong>
                  <p>ACM UbiComp / ISWC 2025 • Helsinki, FI</p>
                </div>
              </div>
              <div className="award-item" style={{ marginTop: '1.5rem' }}>
                <Award className="icon-accent" />
                <div>
                  <strong>Proficiency Medal</strong>
                  <p>IISER Bhopal • 2022</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PUBLICATIONS (FULL LIST WITH IMAGES) */}
        <section id="research" className="section">;;
          <SectionHeading title="Peer-Reviewed Publications" />
          <div className="list-container">
            <ListEntry
              title="Which is Warmer, the Cake or the Oven? Unlocking Thermal Conductivity for VR Interaction"
              subtitle="Proc. CHI Conference on Human Factors in Computing Systems (CHI '26)"
              date="2026"
              description={["D. Anuragi, A. Farooq, R. Singh, et al."]}
              link="https://doi.org/10.1145/3772318.3790864"
              image="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400"
            />
            <ListEntry
              title="Augmenting Vision with Co-Located Live Thermal View in Mixed Reality"
              subtitle="Proc. Augmented Humans International Conference (AHs 2026)"
              date="2026"
              description={["D. Anuragi, M. Zeeja, and R. Raisamo"]}
              link="https://doi.org/10.1145/3795011.3795031"
              image="https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=400"
            />
            <ListEntry
              title="Conductivity-Based Thermal Haptics: Modeling and Perceptual Evaluation for Material Discrimination in VR"
              subtitle="Proc. 2025 IEEE World Haptics Conference (WHC)"
              date="2025"
              description={["D. Anuragi, A. Farooq, R. Singh, et al."]}
              image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400"
            />
            <ListEntry
              title="Discriminating Materials Using Physics-Informed Thermal Haptics in VR"
              subtitle="Proc. 2025 IEEE World Haptics Conference (WHC)"
              date="2025"
              description={["D. Anuragi, A. Farooq, M. Honarmandmozafari, et al."]}
              image="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=400"
            />
            <ListEntry
              title="A Social Compass: Guiding Self-Regulation in High-Arousal Moments with Ubiquitous Sensing"
              subtitle="Companion of the 2025 ACM Int. Joint Conf. on Pervasive and Ubiquitous Computing (UbiComp '25)"
              date="2025"
              link="https://doi.org/10.1145/3714394.3750591"
              image="https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=400"
            />
            <ListEntry
              title="Sensing What You Do Not See: Alerting of Approaching Objects with a Haptic Vest"
              subtitle="Sensors (MDPI), vol. 25, no. 18"
              date="2025"
              link="https://doi.org/10.3390/s25185808"
              image="https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=400"
            />
            <ListEntry
              title="Securing local LLMs for academic research: a human-system integration analysis and evolution of TAUCHI-GPT"
              subtitle="Human-Intelligent Systems Integration, vol. 7"
              date="2025"
              link="https://doi.org/10.1007/s42454-025-00085-9"
              image="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400"
            />
            <ListEntry
              title="Towards Bringing Parity in Pretraining Datasets for Low-resource Indian Languages"
              subtitle="Proc. IEEE Int. Conf. on Acoustics, Speech and Signal Processing (ICASSP)"
              date="2025"
              link="https://doi.org/10.1109/ICASSP49660.2025.10888018"
              image="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400"
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
            <ConferenceCard title="Augmented Humans 2026" location="Okinawa, Japan" date="Feb 2026" />
            <ConferenceCard title="CES 2026" location="Las Vegas, USA" date="Jan 2026" />
            <ConferenceCard title="IEEE World Haptics 2025" location="Suwon, South Korea" date="July 2025" />
            <ConferenceCard title="ACM UbiComp / ISWC 2025" location="Helsinki, Finland" date="Oct 2025" />
            <ConferenceCard title="152nd MPEG Meeting" location="Geneva, Switzerland" date="Oct 2025" />
            <ConferenceCard title="151st MPEG Meeting" location="Daejeon, South Korea" date="July 2025" />
            <ConferenceCard title="AWE 2024" location="Vienna, Austria" date="Oct 2024" />
            <ConferenceCard title="ACDL Summer School" location="Siena, Italy" date="June 2024" />
            <ConferenceCard title="Nokia Oulu Guest Visit" location="Oulu, Finland" date="2025" />
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
              title="Project Associate"
              subtitle="AI4Bharat Lab at IIT Madras"
              date="2022 – 2023"
              description={["Overseeing nationwide speech collection and automatic speech recognition (ASR) projects."]}
            />
            <ListEntry
              title="Computer Vision Intern"
              subtitle="Industrial Collaboration with Awiros"
              date="2021 – 2022"
              description={["Developed skeleton-based action recognition and violence detection models for CCTV feeds."]}
            />
          </div>
        </section>

        {/* SELECTED PROJECTS */}
        <section id="projects" className="section">
          <SectionHeading title="Selected Engineering Projects" />
          <div className="grid-2">
            <ListEntry
              title="Robotics & Path Planning"
              subtitle="ROS2, Python, Gazebo"
              description={["Local path planning using Virtual Potential Fields and D-star/A-star algorithm comparison."]}
            />
            <ListEntry
              title="Mixed Reality Integration"
              subtitle="Unity, C#, Meta Quest 3"
              description={["Passthrough, Scene Understanding, and spatial haptic feedback integration with Skinsen vest."]}
            />
            <ListEntry
              title="Generative ML for Bio-Pharma"
              subtitle="Python, Knime, GENTRL"
              description={["Trained GENTRL models for molecule generation to inhibit Sickle Cell Anemia."]}
            />
            <ListEntry
              title="Skeleton-Based Action Recognition"
              subtitle="Python, MediaPipe, LSTM"
              description={["Real-time action detection using pose landmarks with 90% accuracy."]}
            />
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section footer">
          <div className="footer-content">
            <h2 className="serif">Let's connect</h2>
            <div className="link-grid">
              <a href="mailto:devbrat9156@gmail.com"><Mail /> Email</a>
              <a href="https://linkedin.com/in/devbrat-anuragi"><Linkedin /> LinkedIn</a>
              <a href="/Devbrat_CV (1).pdf" download className="btn-primary" style={{ cursor: 'pointer' }}>
                <FileText /> Download Full CV (PDF)
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
