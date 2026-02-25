import { motion, useMotionValue, useTransform, useSpring, AnimatePresence, useScroll, useMotionTemplate } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Brain, Globe, Cloud, BarChart3, Shield, Zap, Cpu, Layers, Star, ChevronRight, Play,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import CTASection from "@/components/CTASection";

const services = [
  {
    icon: Brain, title: "AI Solutions",
    desc: "Custom machine learning models and intelligent automation tailored to your business needs.",
    color: "#6366f1",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
  },
  {
    icon: Globe, title: "Web Development",
    desc: "Modern, performant web applications built with cutting-edge frameworks and technologies.",
    color: "#8b5cf6",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80",
  },
  {
    icon: Cloud, title: "Cloud Services",
    desc: "Scalable cloud infrastructure and migration strategies for seamless digital operations.",
    color: "#06b6d4",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80",
  },
  {
    icon: BarChart3, title: "Data Analytics",
    desc: "Transform raw data into actionable insights with advanced analytics and visualization.",
    color: "#10b981",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  },
  {
    icon: Shield, title: "Cybersecurity",
    desc: "Protect your digital assets with comprehensive security solutions and monitoring.",
    color: "#f59e0b",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80",
  },
  {
    icon: Cpu, title: "Digital Transformation",
    desc: "End-to-end digital strategy to modernize operations and drive innovation.",
    color: "#ef4444",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
  },
];

const features = [
  { icon: Zap, title: "Lightning Fast", desc: "Rapid development cycles with agile methodologies to bring your ideas to life quickly." },
  { icon: Shield, title: "Enterprise Security", desc: "Bank-grade security protocols ensuring your data and systems remain protected." },
  { icon: Layers, title: "Scalable Architecture", desc: "Solutions designed to grow with your business, from startup to enterprise scale." },
  { icon: Brain, title: "AI-First Approach", desc: "Every solution is enhanced with artificial intelligence for smarter outcomes." },
];

const stats = [
  { target: 200, suffix: "+", label: "Projects Completed" },
  { target: 150, suffix: "+", label: "Clients Served" },
  { target: 8, suffix: "+", label: "Years Experience" },
  { target: 99, suffix: "%", label: "Client Satisfaction" },
];

const WORDS = ["Future", "Vision", "Tomorrow", "Horizon", "Frontier"];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO, NexaScale",
    text: "Maven AI transformed our entire data pipeline. The AI solutions they built cut our processing time by 80% and the quality is unmatched.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80",
    rating: 5,
  },
  {
    name: "Marcus Reid",
    role: "CEO, Vortex Labs",
    text: "Partnering with Maven AI was the best decision we made this year. Their cloud migration was flawless and ahead of schedule.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Head of Product, Luminary",
    text: "The web platform they built for us handles 10x our original traffic. Beautiful design, rock-solid engineering.",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&q=80",
    rating: 5,
  },
];

const caseStudies = [
  {
    label: "AI Automation",
    title: "How FinTech Giant Cut Costs by 60%",
    desc: "We built an AI document processor that eliminated 12,000 man-hours of manual work annually.",
    image: "https://images.unsplash.com/photo-1620825937374-87fc7d6bddc2?w=800&q=80",
    color: "#6366f1",
    tag: "Case Study",
  },
  {
    label: "Cloud Migration",
    title: "Migrating 50TB to AWS in 30 Days",
    desc: "Zero-downtime cloud migration for a healthcare provider serving 2M patients.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    color: "#06b6d4",
    tag: "Case Study",
  },
];

const techStack = [
  { name: "TensorFlow", logo: "🧠" },
  { name: "React", logo: "⚛️" },
  { name: "AWS", logo: "☁️" },
  { name: "Python", logo: "🐍" },
  { name: "Kubernetes", logo: "⚙️" },
  { name: "PostgreSQL", logo: "🐘" },
  { name: "Rust", logo: "🦀" },
  { name: "GraphQL", logo: "◈" },
];

// ── [Keep all original components unchanged] ───────────────────────────────────

function MagneticLink({ to, children, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };
  return (
    <motion.div ref={ref} onMouseMove={handleMove} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ x: sx, y: sy, display: "inline-block" }}>
      <Link to={to} className={className}>{children}</Link>
    </motion.div>
  );
}

function WordCycler() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{ display: "inline-block", minWidth: "4ch", position: "relative" }}>
      <AnimatePresence mode="wait">
        <motion.span key={WORDS[index]} initial={{ y: 40, opacity: 0, filter: "blur(10px)" }} animate={{ y: 0, opacity: 1, filter: "blur(0px)" }} exit={{ y: -40, opacity: 0, filter: "blur(10px)" }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} style={{ display: "inline-block" }} className="gradient-text animated-gradient-text">
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function OrbitingBalls() {
  const orbits = [
    { radius: 160, speed: 8, size: 10, color: "#6366f1", startAngle: 0 },
    { radius: 140, speed: 13, size: 7, color: "#8b5cf6", startAngle: 120 },
    { radius: 180, speed: 18, size: 5, color: "#06b6d4", startAngle: 240 },
    { radius: 120, speed: 10, size: 8, color: "#10b981", startAngle: 60 },
  ];
  return (
    <>
      {orbits.map((o, i) => (
        <motion.div key={i} style={{ position: "absolute", top: "50%", left: "50%", width: o.radius * 2, height: o.radius * 2, marginLeft: -o.radius, marginTop: -o.radius, borderRadius: "50%", border: `1px dashed ${o.color}33` }} animate={{ rotate: 360 }} transition={{ duration: o.speed, repeat: Infinity, ease: "linear" }}>
          <motion.div style={{ position: "absolute", top: -o.size / 2, left: "50%", marginLeft: -o.size / 2, width: o.size, height: o.size, borderRadius: "50%", background: o.color, boxShadow: `0 0 ${o.size * 2}px ${o.color}` }} />
        </motion.div>
      ))}
    </>
  );
}

function MorphingBlob({ color = "#6366f1", size = 300, delay = 0, style = {} }) {
  const variants = {
    a: { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%", scale: 1 },
    b: { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%", scale: 1.05 },
    c: { borderRadius: "50% 50% 40% 60% / 40% 70% 30% 50%", scale: 0.97 },
  };
  return (
    <motion.div style={{ width: size, height: size, background: `radial-gradient(circle at 40% 40%, ${color}55, ${color}11)`, filter: "blur(40px)", position: "absolute", ...style }} variants={variants} initial="a" animate={["a", "b", "c", "a"]} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay, times: [0, 0.33, 0.66, 1] }} />
  );
}

function RippleWave() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {[0, 1, 2, 3].map(i => (
        <motion.div key={i} style={{ position: "absolute", top: "50%", left: "50%", width: 60, height: 60, borderRadius: "50%", border: "1.5px solid rgba(99,102,241,0.5)", x: "-50%", y: "-50%" }} animate={{ scale: [1, 6], opacity: [0.6, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.85, ease: "easeOut" }} />
      ))}
    </div>
  );
}

const BANNER_WORDS = ["AI Solutions", "Cloud Scale", "Cybersecurity", "Data Insights", "Web Excellence", "Digital Transformation"];
function SlidingBanner() {
  const doubled = [...BANNER_WORDS, ...BANNER_WORDS];
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "16px 0", background: "rgba(99,102,241,0.04)" }}>
      <motion.div style={{ display: "flex", gap: 48, width: "max-content", whiteSpace: "nowrap" }} animate={{ x: ["0%", "-50%"] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
        {doubled.map((word, i) => (
          <span key={i} style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.4, color: "var(--foreground)" }}>✦ {word}</span>
        ))}
      </motion.div>
    </div>
  );
}

function TiltCard({ children, style = {} }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 20 });
  const sry = useSpring(ry, { stiffness: 150, damping: 20 });
  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    rx.set(-(((e.clientY - rect.top) / rect.height) - 0.5) * 14);
    ry.set((((e.clientX - rect.left) / rect.width) - 0.5) * 14);
  };
  return (
    <motion.div ref={ref} onMouseMove={handleMove} onMouseLeave={() => { rx.set(0); ry.set(0); }} style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", transformPerspective: 900, ...style }}>
      {children}
    </motion.div>
  );
}

function StatStrip({ target, suffix, label }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);
  useEffect(() => {
    if (!started) return;
    let frame;
    const duration = 1800;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(ease * target));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, target]);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
      <div style={{ fontSize: 52, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.03em" }} className="gradient-text">{val}{suffix}</div>
      <div style={{ marginTop: 8, fontSize: 13, opacity: 0.5, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div>
    </motion.div>
  );
}

function CursorSpotlight() {
  const mx = useMotionValue(-999);
  const my = useMotionValue(-999);
  useEffect(() => {
    const h = (e) => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, [mx, my]);
  const background = useMotionTemplate`radial-gradient(300px circle at ${mx}px ${my}px, rgba(99,102,241,0.08), transparent 70%)`;
  return <motion.div style={{ background, position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
}

// ── NEW: Service Card with Image ───────────────────────────────────────────────
function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard>
        <motion.div
          className="glass-card rounded-xl overflow-hidden h-full group cursor-pointer"
          style={{ transformStyle: "preserve-3d", position: "relative" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Image */}
          <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
            <motion.img
              src={service.image}
              alt={service.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              animate={{ scale: hovered ? 1.08 : 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            {/* Gradient overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.85) 100%)`,
            }} />
            {/* Color accent overlay */}
            <motion.div
              style={{
                position: "absolute", inset: 0,
                background: `${service.color}22`,
              }}
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            {/* Icon badge on image */}
            <div style={{
              position: "absolute", bottom: 14, left: 16,
              width: 40, height: 40, borderRadius: 10,
              background: `${service.color}cc`,
              backdropFilter: "blur(10px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 0 20px ${service.color}88`,
            }}>
              <service.icon size={18} color="#fff" />
            </div>
            {/* Top accent line */}
            <motion.div
              style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${service.color}, ${service.color}44)`,
              }}
              animate={{ scaleX: hovered ? 1 : 0 }}
              initial={{ scaleX: 0 }}
              style={{ transformOrigin: "left", position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${service.color}, ${service.color}44)` }}
            />
          </div>

          {/* Content */}
          <div style={{ padding: "20px 20px 24px" }}>
            <h3 className="font-display font-semibold text-lg mb-2">{service.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
            <motion.div
              className="flex items-center gap-1 mt-4"
              style={{ color: service.color, fontSize: 13, fontWeight: 600 }}
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.2 }}
            >
              Learn more <ChevronRight size={14} />
            </motion.div>
          </div>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
}

// ── NEW: Testimonial Card ──────────────────────────────────────────────────────
function TestimonialCard({ t, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
    >
      <div className="glass-card rounded-2xl p-7 h-full" style={{ position: "relative", overflow: "hidden" }}>
        {/* Quote mark */}
        <div style={{ position: "absolute", top: 16, right: 20, fontSize: 80, fontFamily: "Georgia", color: "rgba(99,102,241,0.1)", lineHeight: 1, userSelect: "none" }}>"</div>
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {Array(t.rating).fill(0).map((_, i) => (
            <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
          ))}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6" style={{ position: "relative", zIndex: 1 }}>
          "{t.text}"
        </p>
        <div className="flex items-center gap-3">
          <motion.img
            src={t.avatar}
            alt={t.name}
            style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(99,102,241,0.4)" }}
            whileHover={{ scale: 1.1 }}
          />
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
            <div style={{ fontSize: 12, opacity: 0.5 }}>{t.role}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── NEW: Case Study Card ───────────────────────────────────────────────────────
function CaseStudyCard({ cs, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ minHeight: 340 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* BG image */}
      <motion.img
        src={cs.image}
        alt={cs.title}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      {/* Gradient overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)" }} />
      {/* Color tint */}
      <motion.div
        style={{ position: "absolute", inset: 0, background: `${cs.color}22` }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      {/* Content */}
      <div style={{ position: "absolute", inset: 0, padding: "28px 28px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: cs.color, background: `${cs.color}22`, border: `1px solid ${cs.color}44`, padding: "3px 10px", borderRadius: 99, display: "inline-block", width: "fit-content", marginBottom: 12 }}>
          {cs.tag}
        </span>
        <h3 style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 10, lineHeight: 1.2 }}>{cs.title}</h3>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.6, marginBottom: 20 }}>{cs.desc}</p>
        <motion.div
          className="flex items-center gap-2"
          style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}
          animate={{ x: hovered ? 6 : 0 }}
          transition={{ duration: 0.2 }}
        >
          Read Case Study <ArrowRight size={14} />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── NEW: Floating Tech Logo ────────────────────────────────────────────────────
function TechBadge({ tech, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, type: "spring", stiffness: 200 }}
      whileHover={{ y: -6, scale: 1.1 }}
      className="glass-card rounded-xl flex flex-col items-center gap-2 px-5 py-4 cursor-default"
    >
      <span style={{ fontSize: 28 }}>{tech.logo}</span>
      <span style={{ fontSize: 12, fontWeight: 600, opacity: 0.6, letterSpacing: "0.04em" }}>{tech.name}</span>
    </motion.div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
const Index = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  useEffect(() => {
    const h = (e) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen" style={{ position: "relative" }}>
      <CursorSpotlight />

      {/* ── HERO (UNCHANGED) ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 animated-mesh" />
        <MorphingBlob color="#6366f1" size={500} delay={0} style={{ top: "-10%", left: "-8%" }} />
        <MorphingBlob color="#8b5cf6" size={380} delay={3} style={{ bottom: "-5%", right: "-5%" }} />
        <MorphingBlob color="#06b6d4" size={260} delay={6} style={{ top: "30%", right: "10%" }} />
        <div className="absolute inset-0 flex items-center justify-end pr-16 pointer-events-none hidden lg:flex" style={{ zIndex: 1 }}>
          <div style={{ position: "relative", width: 420, height: 420 }}>
            <RippleWave />
          </div>
        </div>
        {[...Array(10)].map((_, i) => (
          <motion.div key={i} className="absolute rounded-full" style={{ width: 3 + (i % 3) * 3, height: 3 + (i % 3) * 3, background: `hsl(${230 + i * 15}, 80%, 65%)`, left: `${8 + i * 9}%`, top: `${10 + (i % 5) * 18}%`, filter: "blur(1px)" }} animate={{ y: [0, -60 - i * 8, 0], opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }} transition={{ duration: 4 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }} />
        ))}
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
              <motion.div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground mb-6" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <motion.span className="w-2 h-2 rounded-full bg-primary" animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                AI-Powered Innovation
              </motion.div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <motion.span initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.7 }} style={{ display: "block" }}>Building the</motion.span>
                <motion.span initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45, duration: 0.7 }} style={{ display: "block" }}><WordCycler /></motion.span>
                <motion.span initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.7 }} style={{ display: "block" }}>with Intelligent Technology</motion.span>
              </h1>
              <div style={{ position: "relative", marginBottom: 32, overflow: "hidden" }}>
                <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">We craft AI-driven solutions that transform businesses, automate processes, and unlock new possibilities in the digital landscape.</p>
                <motion.div style={{ position: "absolute", bottom: 0, left: 0, height: 2, background: "linear-gradient(90deg, #6366f1, #8b5cf6, transparent)", transformOrigin: "left", width: "100%" }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1, duration: 1, ease: "easeOut" }} />
              </div>
              <motion.div className="flex flex-wrap gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}>
                <MagneticLink to="/contact" className="glow-button inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm text-foreground">Get Started <ArrowRight size={16} /></MagneticLink>
                <MagneticLink to="/services" className="inline-flex items-center gap-2 glass-card px-7 py-3.5 rounded-lg font-semibold text-sm text-foreground hover:bg-muted transition-colors">Our Services</MagneticLink>
              </motion.div>
            </motion.div>
            <div className="hidden lg:flex justify-center">
              <div style={{ position: "relative", width: 420, height: 420 }}>
                <OrbitingBalls />
                <motion.div className="absolute inset-0 rounded-full wave-ring" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
                <motion.div style={{ position: "absolute", inset: 20, borderRadius: "50%", border: "1px solid rgba(99,102,241,0.2)" }} animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} />
                <motion.div className="absolute inset-10 glass-card rounded-full flex items-center justify-center" style={{ rotateX, rotateY, transformPerspective: 600 }} animate={{ y: [0, -25, 0], boxShadow: ["0 0 40px rgba(99,102,241,0.3)", "0 0 90px rgba(99,102,241,0.7)", "0 0 40px rgba(99,102,241,0.3)"] }} transition={{ duration: 5, repeat: Infinity }}>
                  <Brain className="text-primary" size={90} strokeWidth={1} />
                </motion.div>
                {[Globe, Cloud, BarChart3, Shield].map((Icon, i) => {
                  const angle = (i / 4) * Math.PI * 2;
                  const r = 155;
                  return (
                    <motion.div key={i} style={{ position: "absolute", top: "50%", left: "50%", width: 36, height: 36, borderRadius: "50%", background: "rgba(99,102,241,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(99,102,241,0.3)", display: "flex", alignItems: "center", justifyContent: "center", x: Math.cos(angle) * r - 18, y: Math.sin(angle) * r - 18 }} animate={{ rotate: [0, 360], scale: [1, 1.15, 1] }} transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear", delay: i * 2 }, scale: { duration: 3, repeat: Infinity, delay: i * 0.7 } }}>
                      <Icon size={16} className="text-primary" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SLIDING BANNER (UNCHANGED) ────────────────────────────────────── */}
      <SlidingBanner />

      {/* ── SERVICES (ENHANCED WITH IMAGES) ──────────────────────────────── */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center mb-16">
            <motion.span
              style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", padding: "4px 14px", borderRadius: 99, display: "inline-block", marginBottom: 14 }}
            >What we do</motion.span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comprehensive technology solutions designed to drive your business forward.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => <ServiceCard key={s.title} service={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES (NEW) ────────────────────────────────────────────── */}
      <section className="py-24 overflow-hidden" style={{ background: "rgba(99,102,241,0.02)" }}>
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center mb-16">
            <motion.span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", padding: "4px 14px", borderRadius: 99, display: "inline-block", marginBottom: 14 }}>Impact Stories</motion.span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Real <span className="gradient-text">Results</span> for Real Businesses
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We don't just build software — we deliver measurable outcomes.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {caseStudies.map((cs, i) => <CaseStudyCard key={cs.title} cs={cs} index={i} />)}
          </div>
          <div className="text-center mt-10">
            <MagneticLink to="/work" className="inline-flex items-center gap-2 glass-card px-7 py-3 rounded-lg font-semibold text-sm text-foreground hover:bg-muted transition-colors">
              View All Case Studies <ArrowRight size={15} />
            </MagneticLink>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US (ENHANCED) ──────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        {/* Background image with overlay */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=60"
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.04 }}
          />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 40%, var(--background) 100%)" }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal className="text-center mb-16">
            <motion.span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", padding: "4px 14px", borderRadius: 99, display: "inline-block", marginBottom: 14 }}>Why Us</motion.span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="gradient-text">Maven AI</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We combine deep technical expertise with a passion for innovation.
            </p>
          </ScrollReveal>

          {/* Split layout: features left, image right */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="grid sm:grid-cols-2 gap-5">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, type: "spring", stiffness: 180 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="glass-card rounded-xl p-6"
                >
                  <motion.div
                    className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4"
                    animate={{ rotate: [0, 4, -4, 0] }}
                    transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                    style={{ boxShadow: "0 0 24px rgba(99,102,241,0.3)" }}
                  >
                    <f.icon size={22} className="text-foreground" />
                  </motion.div>
                  <h3 className="font-display font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Visual side */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "relative" }}
            >
              <div style={{ borderRadius: 24, overflow: "hidden", position: "relative" }}>
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
                  alt="Team working"
                  style={{ width: "100%", height: 420, objectFit: "cover", display: "block" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(99,102,241,0.3) 0%, transparent 60%)" }} />
              </div>
              {/* Floating stat card */}
              <motion.div
                className="glass-card rounded-xl p-4"
                style={{ position: "absolute", bottom: 24, left: -20, minWidth: 180, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div style={{ fontSize: 11, opacity: 0.5, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Avg. Delivery Time</div>
                <div style={{ fontSize: 32, fontWeight: 800 }} className="gradient-text">3 Weeks</div>
                <div style={{ fontSize: 12, opacity: 0.6, marginTop: 2 }}>Faster than industry avg.</div>
              </motion.div>
              {/* Floating badge */}
              <motion.div
                className="glass-card rounded-xl p-4 flex items-center gap-3"
                style={{ position: "absolute", top: 24, right: -16, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(16,185,129,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Shield size={18} color="#10b981" />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>ISO Certified</div>
                  <div style={{ fontSize: 11, opacity: 0.5 }}>Security & Quality</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS (ENHANCED) ──────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            className="glass-card rounded-2xl p-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ position: "relative", overflow: "hidden" }}
          >
            {/* Background image */}
            <img
              src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=60"
              alt=""
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.06 }}
            />
            <motion.div
              style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(99,102,241,0.05) 0%, transparent 50%, rgba(139,92,246,0.05) 100%)", transformOrigin: "center" }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {stats.map(s => <StatStrip key={s.label} {...s} />)}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS (NEW) ────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: "rgba(99,102,241,0.02)" }}>
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center mb-16">
            <motion.span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", padding: "4px 14px", borderRadius: 99, display: "inline-block", marginBottom: 14 }}>Testimonials</motion.span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Don't just take our word for it — hear from the teams we've worked with.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => <TestimonialCard key={t.name} t={t} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── TECH STACK (NEW) ──────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
              Built with <span className="gradient-text">World-Class</span> Technology
            </h2>
            <p className="text-muted-foreground">We use the best tools available to build solutions that last.</p>
          </ScrollReveal>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {techStack.map((t, i) => <TechBadge key={t.name} tech={t} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <CTASection />
    </div>
  );
};

export default Index;