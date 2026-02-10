import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowLeft,
  ArrowRight,
  Cloud,
  ChevronDown,
  Code2,
  Dribbble,
  Dumbbell,
  Gamepad2,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Maximize2,
  Menu,
  Server,
  Wrench,
  X,
} from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'hobbies', label: 'Hobbies' },
];

const socialLinks = [
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/kevin-yao-6a40a2240/',
    label: 'LinkedIn',
  },
  {
    icon: Github,
    href: 'https://github.com/TheAwakenedBob',
    label: 'GitHub',
  },
  {
    icon: Mail,
    href: 'mailto:yao.kevinl@gmail.com',
    label: 'Email',
  },
];

const education = {
  school: 'University of Ottawa',
  program: "Honour's Bachelor of Computer Science",
  period: 'Sep 2022 - Present',
  graduation: 'Expected Graduation: Dec 2026',
};

const skills = [
  {
    id: 'languages',
    title: 'Languages',
    description: 'Python, Java, SQL, JavaScript, HTML/CSS, C++, TypeScript',
    focus: 'Core Languages',
    icon: Code2,
  },
  {
    id: 'frameworks',
    title: 'Frameworks',
    description: 'React, Next.js, Node.js, Express, PyTorch, Stable-Baselines3',
    focus: 'Product + ML',
    icon: Server,
  },
  {
    id: 'data-ai',
    title: 'Data & AI',
    description: 'pandas, NumPy, R, RStudio, Tesseract OCR, OpenCV, PyTorch, Gemini AI',
    focus: 'Automation Focus',
    icon: Cloud,
  },
  {
    id: 'platforms',
    title: 'Platforms & Tools',
    description:
      'Git/GitHub, Firebase, MongoDB, Docker, Azure, Google Cloud Platform, Excel, UML',
    focus: 'Shipping Stack',
    icon: Wrench,
  },
];

type MediaItem = {
  src: string;
  title: string;
};

type ProjectGallery = {
  kind: 'video' | 'image';
  label: string;
  items: MediaItem[];
  hideNativeFullscreen?: boolean;
};

const marioVideoFiles = [
  'iteration1.mp4',
  'iteration10.mp4',
  'iteration100.mp4',
  'iteration1000.mp4',
  'iteration2000.mp4',
  'iteration3000.mp4',
  'iteration4000.mp4',
  'iteration50.mp4',
  'iteration500.mp4',
  'iteration5000.mp4',
];
const marioVideoCacheVersion = '20260209';

const paideiaImageFiles = [
  '1.png',
  '2.png',
  '3.png',
  '4.png',
  '5.png',
  '6.png',
  '7.png',
  '8.png',
];

const getSortNumber = (fileName: string) => {
  const match = fileName.match(/(\d+)/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
};

const paideiaTitleMap: Record<number, string> = {
  1: 'Landing Page',
  2: 'Dashboard',
  3: 'Quiz Generation',
  4: 'File Upload',
  5: 'Quiz',
  6: 'Quizzes Page',
  7: 'Spaced Repetition Quiz',
  8: 'Spaced Repetition Quiz Queued',
};

const marioTitleFromFile = (fileName: string) => {
  const iteration = getSortNumber(fileName);
  return Number.isFinite(iteration) ? `Iteration ${iteration}` : 'Iteration';
};

const paideiaTitleFromFile = (fileName: string) => {
  const number = getSortNumber(fileName);
  const sectionTitle = paideiaTitleMap[number];
  if (!Number.isFinite(number)) {
    return 'Screenshot';
  }
  if (!sectionTitle) {
    return `Screen ${number}`;
  }
  return `${number}. ${sectionTitle}`;
};

const toMediaItems = (
  files: string[],
  options?: {
    cacheVersion?: string;
    titleFormatter?: (fileName: string) => string;
  },
): MediaItem[] =>
  [...files]
    .sort((a, b) => {
      const byNumber = getSortNumber(a) - getSortNumber(b);
      if (byNumber !== 0) {
        return byNumber;
      }
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    })
    .map((fileName) => ({
      src: `${import.meta.env.BASE_URL}${fileName}${options?.cacheVersion ? `?v=${options.cacheVersion}` : ''}`,
      title: options?.titleFormatter?.(fileName) ?? fileName,
    }));

const marioIterationVideos = toMediaItems(marioVideoFiles, {
  cacheVersion: marioVideoCacheVersion,
  titleFormatter: marioTitleFromFile,
});
const paideiaScreenshots = toMediaItems(paideiaImageFiles, {
  titleFormatter: paideiaTitleFromFile,
});

const projects = [
  {
    id: 'ai-mario-agent',
    title: 'AI Mario Agent',
    period: 'Feb 2026',
    tags: [
      'PyTorch',
      'Stable-Baselines3',
      'Neural Network',
      'Machine Learning',
    ],
    summary:
      'Vision-based deep reinforcement learning agent for Super Mario Bros using PPO with CNN-based gameplay understanding.',
    gallery: {
      kind: 'video',
      label: 'Progress Over Iterations',
      items: marioIterationVideos,
      hideNativeFullscreen: true,
    } as ProjectGallery,
    highlights: [
      'Built and tuned the RL training loop with reward shaping, frame stacking, and discrete action control for stable learning.',
      'Optimized key PPO settings (target-KL, clipping, entropy, learning rate, batch size, update epochs) to improve stability and speed.',
      'Implemented a post-training pipeline with about 1,000 deterministic evaluation episodes to track return, completion rate, episode length, and stability metrics.',
    ],
  },
  {
    id: 'paideia',
    title: 'Paideia',
    period: 'Sep 2025 - Present',
    href: 'https://paideia-ei65.onrender.com',
    tags: ['Next.js', 'TypeScript', 'Python', 'Docker', 'Gemini AI'],
    summary:
      'AI quiz generation platform with adaptive prompt-chaining and reliable PDF-to-JSON extraction for exam-aligned outputs.',
    gallery: {
      kind: 'image',
      label: 'Platform Screenshots',
      items: paideiaScreenshots,
    } as ProjectGallery,
    highlights: [
      'Built Gemini + Python FastAPI microservices on GCP Cloud Run, containerized with Docker and secured with Firebase Auth.',
      'Developed prompt-chaining with semantic checks and refinement to generate quizzes matching uploaded MCQ exams 1:1.',
      'Engineered pdfplumber ingestion with column-aware segmentation and layout heuristics, reaching 99% parsing accuracy.',
      'Added spaced repetition, real-time analytics, and cache-optimized regeneration with Firestore batched writes and sessionStorage replay.',
    ],
  },
];

const experience = [
  {
    role: 'Software Developer',
    stack: 'Python, Tesseract OCR, OpenCV',
    company: 'Environment and Climate Change Canada',
    period: 'Sep 2025 - Dec 2025',
    summary:
      'Built an OCR automation pipeline for scanned PDF forms, reaching over 95% extraction accuracy while improving workflow efficiency by 45-55%.',
  },
  {
    role: 'Data Scientist',
    stack: 'R',
    company: 'Statistics Canada',
    period: 'Jan 2025 - Apr 2025',
    summary:
      'Designed reusable R pipelines with dplyr/tidyr to standardize 25,000+ revenue records and cut report processing time by over 80%.',
  },
  {
    role: 'Data Analyst',
    stack: 'Python, pandas, PyTorch',
    company: 'SickKids',
    period: 'May 2024 - Dec 2024',
    summary:
      'Built an NLP pipeline in Python/PyTorch to fill missing CHIRPP fields and classify 30,000+ patient cases into 50 injury categories at 98% accuracy.',
  },
];

const hobbies = [
  {
    label: 'Volleyball',
    icon: ({ className }: { className?: string }) => (
      <img
        src={`${import.meta.env.BASE_URL}vball icon.jpg`}
        alt=""
        aria-hidden="true"
        className={`${className ?? ''} rounded-full object-cover`}
      />
    ),
  },
  { label: 'Basketball', icon: Dribbble },
  { label: 'Weightlifting', icon: Dumbbell },
  { label: 'Gaming', icon: Gamepad2 },
];

function ProjectMediaGallery({ gallery }: { gallery: ProjectGallery }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  if (!gallery.items.length) {
    return null;
  }

  const currentItem = gallery.items[currentIndex];

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % gallery.items.length);
  };

  const goPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + gallery.items.length) % gallery.items.length);
  };

  const openOverlay = () => {
    setIsOverlayOpen(true);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
  };

  const overlayContent = (
    <div
      className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4 py-8"
      onClick={closeOverlay}
    >
      <div
        className="relative w-[92vw] max-w-[1700px]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeOverlay}
          className="absolute -top-3 -right-3 z-30 inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          aria-label="Close enlarged view"
        >
          <X className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={goPrevious}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center w-11 h-11 rounded-full bg-[var(--bg-primary)]/95 border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          aria-label="Previous media"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={goNext}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center w-11 h-11 rounded-full bg-[var(--bg-primary)]/95 border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          aria-label="Next media"
        >
          <ArrowRight className="w-5 h-5" />
        </button>

        <div className="card-glass p-3 md:p-4">
          <p
            className={`text-center mb-3 px-12 ${
              gallery.kind === 'video'
                ? 'text-base md:text-xl font-semibold text-[var(--text-primary)]'
                : 'text-sm md:text-base font-semibold text-[var(--text-primary)]'
            }`}
          >
            {currentItem.title}
          </p>
          <div className="rounded-xl overflow-hidden border border-[var(--border)] bg-black/90 flex items-center justify-center max-h-[82vh]">
            {gallery.kind === 'video' ? (
              <video
                key={`overlay-${currentItem.src}`}
                controls
                controlsList={gallery.hideNativeFullscreen ? 'nofullscreen' : undefined}
                preload="metadata"
                playsInline
                className="w-full h-auto max-h-[82vh] object-contain"
              >
                <source src={currentItem.src} type="video/mp4" />
              </video>
            ) : (
              <img
                key={`overlay-${currentItem.src}`}
                src={currentItem.src}
                alt={currentItem.title}
                className="w-full h-auto max-h-[82vh] object-contain"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    if (!isOverlayOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOverlayOpen]);

  useEffect(() => {
    if (!isOverlayOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setCurrentIndex((prev) => (prev + 1) % gallery.items.length);
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setCurrentIndex((prev) => (prev - 1 + gallery.items.length) % gallery.items.length);
      }
      if (event.key === 'Escape') {
        setIsOverlayOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOverlayOpen, gallery.items.length]);

  return (
    <div className="mt-6 pt-5 border-t border-[var(--border)]">
      <p className="text-xs font-mono uppercase tracking-[0.14em] text-[var(--accent)] mb-3">
        {gallery.label}
      </p>

      <div className="card-glass p-4">
        <div className="flex items-center justify-between gap-2 mb-3">
          <button
            type="button"
            onClick={goPrevious}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Prev
          </button>

          <p className="text-sm font-medium text-[var(--text-secondary)] text-center px-2">
            {currentItem.title}
          </p>

          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            Next
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="rounded-xl overflow-hidden border border-[var(--border)] bg-black/20 relative aspect-[16/9]">
          {gallery.kind === 'video' ? (
            <>
              <video
                key={currentItem.src}
                controls
                controlsList={gallery.hideNativeFullscreen ? 'nofullscreen' : undefined}
                preload="metadata"
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={currentItem.src} type="video/mp4" />
              </video>
              <button
                type="button"
                onClick={openOverlay}
                className="absolute bottom-2 right-2 z-10 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[11px] font-medium bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                Fullscreen
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={openOverlay}
              aria-label={`Open ${currentItem.title}`}
              className="w-full h-full cursor-zoom-in"
            >
              <img
                key={currentItem.src}
                src={currentItem.src}
                alt={currentItem.title}
                className="w-full h-full object-cover"
              />
            </button>
          )}
        </div>

      </div>
      {isOverlayOpen && typeof document !== 'undefined' &&
        createPortal(overlayContent, document.body)}
    </div>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [openExperienceId, setOpenExperienceId] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ delay: 0.2 });

      heroTl.fromTo(
        '.hero-headline-word',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out' },
      );

      heroTl.fromTo(
        '.hero-subheadline',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.3',
      );

      heroTl.fromTo(
        '.hero-ctas',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.2',
      );

      heroTl.fromTo(
        '.hero-socials',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
        '-=0.2',
      );

      heroTl.fromTo(
        '.hero-contact-info',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
        '-=0.2',
      );

      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((section) => {
        gsap.fromTo(
          section,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        );
      });

      gsap.fromTo(
        '.education-card',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.education-container',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      );

      gsap.fromTo(
        '.skill-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.skills-container',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      );

      gsap.fromTo(
        '.project-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.projects-container',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      );

      gsap.fromTo(
        '.experience-item',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.experience-container',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      );

      gsap.fromTo(
        '.hobby-chip',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.hobbies-container',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
      if (scrolled) {
        setShowScrollIndicator(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const headlineWords = 'Building reliable AI and data tools that solve real problems.'.split(
    ' ',
  );

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'navbar-glass' : 'bg-transparent'
        }`}
      >
        <div className="container-main">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-lg font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
            >
              Kevin Yao
            </button>

            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="nav-link"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <a
              href={`${import.meta.env.BASE_URL}Resume.pdf`}
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex btn-primary text-xs py-2.5 px-5"
            >
              Resume
            </a>

            <button
              className="md:hidden p-2 text-[var(--text-primary)]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-[var(--bg-primary)] border-b border-[var(--border)]">
            <div className="container-main py-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left nav-link py-2"
                >
                  {item.label}
                </button>
              ))}
              <a
                href={`${import.meta.env.BASE_URL}Resume.pdf`}
                target="_blank"
                rel="noreferrer"
                className="btn-primary w-full text-xs py-2.5 mt-4 justify-center"
              >
                Resume
              </a>
            </div>
          </div>
        )}
      </nav>

      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-bg.jpg`}
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/92 via-[var(--bg-primary)]/88 to-[var(--bg-primary)]" />
        </div>

        <div className="relative z-10 container-main text-center pt-20">
          <h1 className="text-[clamp(36px,5vw,64px)] font-semibold leading-[1.1] mb-6 max-w-4xl mx-auto">
            {headlineWords.map((word, index) => (
              <span key={index} className="hero-headline-word inline-block mr-[0.25em]">
                {word}
              </span>
            ))}
          </h1>

          <p className="hero-subheadline text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10 text-[var(--text-secondary)]">
            Computer Science student at the University of Ottawa with hands-on
            experience in OCR automation, data science pipelines, and machine
            learning systems that improve real workflows.
          </p>

          <div className="hero-ctas flex flex-wrap items-center justify-center gap-4 mb-10">
            <button onClick={() => scrollToSection('projects')} className="btn-primary group">
              View Projects
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
            <a href="mailto:yao.kevinl@gmail.com" className="btn-secondary">
              <Mail className="w-4 h-4 mr-2" />
              Email Kevin
            </a>
          </div>

          <div className="hero-socials flex items-center justify-center gap-3 mb-10">
            {socialLinks.map(({ icon: Icon, href, label }) => {
              const isExternal = href.startsWith('http');
              return (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noreferrer' : undefined}
                  className="p-3 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)] transition-all duration-200"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          <div className="hero-contact-info flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--text-tertiary)]">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>yao.kevinl@gmail.com</span>
            </div>
          </div>
        </div>

        <div
          className={`scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 ${
            !showScrollIndicator ? 'hidden' : ''
          }`}
        >
          <span className="text-sm text-[var(--text-tertiary)] animate-pulse">
            scroll to explore
          </span>
        </div>
      </section>

      <section id="education" className="section-padding bg-[var(--bg-secondary)]">
        <div className="container-main">
          <div className="reveal-section text-center mb-14">
            <span className="eyebrow inline-block mb-4">Education</span>
            <h2 className="section-title">Academic Background</h2>
          </div>

          <div className="education-container max-w-3xl mx-auto">
            <div className="education-card card-glass p-8">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="inline-flex items-center gap-2 text-[var(--accent)] mb-3">
                    <GraduationCap className="w-5 h-5" />
                    <span className="text-xs font-mono uppercase tracking-[0.14em]">
                      University
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-1">
                    {education.school}
                  </h3>
                  <p className="text-base text-[var(--text-secondary)]">{education.program}</p>
                </div>
                <span className="text-xs font-mono text-[var(--text-tertiary)] px-3 py-1 bg-[var(--bg-tertiary)] rounded-full">
                  {education.period}
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mt-5">
                {education.graduation}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="section-padding bg-[var(--bg-primary)]">
        <div className="container-main">
          <div className="reveal-section text-center mb-16">
            <span className="eyebrow inline-block mb-4">Technical Skills</span>
            <h2 className="section-title">Tooling I Use</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Languages, frameworks, and cloud tools I use for production-grade
              applications, ML workflows, and automation systems.
            </p>
          </div>

          <div className="skills-container grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <div key={skill.id} className="skill-card card-glass p-8 group cursor-default">
                <div className="w-14 h-14 rounded-xl bg-[var(--accent-light)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <skill.icon className="w-7 h-7 text-[var(--accent)]" />
                </div>

                <h3 className="text-xl font-semibold mb-2 text-[var(--text-primary)]">
                  {skill.title}
                </h3>

                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  {skill.description}
                </p>

                <span className="text-xs font-mono text-[var(--text-tertiary)]">
                  {skill.focus}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="section-padding bg-[var(--bg-secondary)]">
        <div className="container-main">
          <div className="reveal-section text-center mb-14">
            <h2 className="section-title text-[clamp(40px,5vw,64px)]">Projects</h2>
          </div>

          <div className="projects-container grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <article key={project.id} className="project-card card-glass p-7 h-full flex flex-col">
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                        {project.title}
                      </h3>
                      {project.href && (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Visit ${project.title} live site`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-[var(--accent)] bg-[var(--accent-light)] hover:text-[var(--accent-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors"
                        >
                          Visit Site
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <span className="text-xs font-mono text-[var(--text-tertiary)] px-3 py-1 bg-[var(--bg-tertiary)] rounded-full">
                      {project.period}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                    {project.summary}
                  </p>

                  <ul className="space-y-2.5">
                    {project.highlights.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  {project.gallery && <ProjectMediaGallery gallery={project.gallery} />}
                </div>
              </article>
            ))}
            <div className="md:col-span-2 flex justify-center">
              <div className="card-glass px-6 py-4 text-center max-w-md w-full">
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  More projects to come.
                </p>
                <p className="text-xs text-[var(--text-tertiary)] mt-1">
                  New builds and experiments will be added here soon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="section-padding bg-[var(--bg-primary)]">
        <div className="container-main">
          <div className="reveal-section text-center mb-16">
            <span className="eyebrow inline-block mb-4">Experience</span>
            <h2 className="section-title">Professional Work</h2>
          </div>

          <div className="experience-container max-w-4xl mx-auto">
            {experience.map((exp) => {
              const expId = `${exp.company}-${exp.role}`;
              const isOpen = openExperienceId === expId;

              return (
                <div key={expId} className="experience-item mb-4 last:mb-0">
                  <div className="card-glass overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenExperienceId(isOpen ? null : expId)}
                      className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left"
                      aria-expanded={isOpen}
                      aria-controls={`experience-content-${expId}`}
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                          {exp.company}
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)] mt-1">
                          {exp.role}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs font-mono text-[var(--text-tertiary)] px-3 py-1 bg-[var(--bg-tertiary)] rounded-full">
                          {exp.period}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-[var(--text-tertiary)] transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </button>

                    <div
                      id={`experience-content-${expId}`}
                      className={`grid transition-all duration-300 ${
                        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-6 pb-5 pt-1 border-t border-[var(--border)]">
                          <p className="text-xs font-mono text-[var(--accent)] mb-3">
                            {exp.stack}
                          </p>
                          <div className="flex items-start gap-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                            <span>{exp.summary}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="hobbies" className="py-16 bg-[var(--bg-secondary)] border-t border-[var(--border)]">
        <div className="container-main">
          <div className="reveal-section text-center mb-10">
            <span className="eyebrow inline-block mb-4">Hobbies</span>
            <h2 className="section-title">Outside of Code</h2>
          </div>

          <div className="hobbies-container flex flex-wrap justify-center gap-3">
            {hobbies.map((hobby) => (
              <div
                key={hobby.label}
                className="hobby-chip card-glass px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] inline-flex items-center gap-2"
              >
                <hobby.icon className="w-4 h-4 text-[var(--accent)]" />
                <span>{hobby.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="py-12 bg-[var(--bg-primary)] border-t border-[var(--border)]">
        <div className="container-main">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                Kevin Yao
              </div>
              <p className="text-sm text-[var(--text-secondary)]">
                yao.kevinl@gmail.com
              </p>
            </div>

            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => {
                const isExternal = href.startsWith('http');
                return (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noreferrer' : undefined}
                    className="w-10 h-10 rounded-xl bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)] transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[var(--border)] text-center">
            <p className="text-xs text-[var(--text-tertiary)]">
              © 2026 Kevin Yao
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
