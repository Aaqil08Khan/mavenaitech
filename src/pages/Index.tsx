import { motion, useMotionValue, useTransform, useSpring, AnimatePresence, useScroll, useMotionTemplate } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Brain, Globe, Cloud, BarChart3, Shield, Zap, Cpu, Layers,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import CTASection from "@/components/CTASection";

const services = [
  { icon: Brain, title: "AI Solutions", desc: "Custom machine learning models and intelligent automation tailored to your business needs.", color: "#6366f1" },
  { icon: Globe, title: "Web Development", desc: "Modern, performant web applications built with cutting-edge frameworks and technologies.", color: "#8b5cf6" },
  { icon: Cloud, title: "Cloud Services", desc: "Scalable cloud infrastructure and migration strategies for seamless digital operations.", color: "#06b6d4" },
  { icon: BarChart3, title: "Data Analytics", desc: "Transform raw data into actionable insights with advanced analytics and visualization.", color: "#10b981" },
  { icon: Shield, title: "Cybersecurity", desc: "Protect your digital assets with comprehensive security solutions and monitoring.", color: "#f59e0b" },
  { icon: Cpu, title: "Digital Transformation", desc: "End-to-end digital strategy to modernize operations and drive innovation.", color: "#ef4444" },
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

// ── Magnetic Button ────────────────────────────────────────────────────────────
function MagneticLink({ to, children, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: sx, y: sy, display: "inline-block" }}
    >
      <Link to={to} className={className}>{children}</Link>
    </motion.div>
  );
}

// ── Typewriter Word Cycler ─────────────────────────────────────────────────────
function WordCycler() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{ display: "inline-block", minWidth: "4ch", position: "relative" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={WORDS[index]}
          initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -40, opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "inline-block" }}
          className="gradient-text animated-gradient-text"
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ── Orbiting Balls ─────────────────────────────────────────────────────────────
function OrbitingBalls() {
  const orbits = [
    { radius: 160, speed: 8,  size: 10, color: "#6366f1", startAngle: 0 },
    { radius: 140, speed: 13, size: 7,  color: "#8b5cf6", startAngle: 120 },
    { radius: 180, speed: 18, size: 5,  color: "#06b6d4", startAngle: 240 },
    { radius: 120, speed: 10, size: 8,  color: "#10b981", startAngle: 60 },
  ];

  return (
    <>
      {orbits.map((o, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: o.radius * 2,
            height: o.radius * 2,
            marginLeft: -o.radius,
            marginTop: -o.radius,
            borderRadius: "50%",
            border: `1px dashed ${o.color}33`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: o.speed, repeat: Infinity, ease: "linear" }}
        >
          {/* The ball sits at the top of the orbit ring */}
          <motion.div
            style={{
              position: "absolute",
              top: -o.size / 2,
              left: "50%",
              marginLeft: -o.size / 2,
              width: o.size,
              height: o.size,
              borderRadius: "50%",
              background: o.color,
              boxShadow: `0 0 ${o.size * 2}px ${o.color}`,
            }}
          />
        </motion.div>
      ))}
    </>
  );
}

// ── Morphing Blob ──────────────────────────────────────────────────────────────
function MorphingBlob({ color = "#6366f1", size = 300, delay = 0, style = {} }) {
  const variants = {
    a: { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%", scale: 1 },
    b: { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%", scale: 1.05 },
    c: { borderRadius: "50% 50% 40% 60% / 40% 70% 30% 50%", scale: 0.97 },
  };
  return (
    <motion.div
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 40% 40%, ${color}55, ${color}11)`,
        filter: "blur(40px)",
        position: "absolute",
        ...style,
      }}
      variants={variants}
      initial="a"
      animate={["a", "b", "c", "a"]}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
        times: [0, 0.33, 0.66, 1],
      }}
    />
  );
}

// ── Ripple Wave ────────────────────────────────────────────────────────────────
function RippleWave() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {[0, 1, 2, 3].map(i => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 60,
            height: 60,
            borderRadius: "50%",
            border: "1.5px solid rgba(99,102,241,0.5)",
            x: "-50%",
            y: "-50%",
          }}
          animate={{ scale: [1, 6], opacity: [0.6, 0] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: i * 0.85,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

// ── Sliding Word Banner ────────────────────────────────────────────────────────
const BANNER_WORDS = ["AI Solutions", "Cloud Scale", "Cybersecurity", "Data Insights", "Web Excellence", "Digital Transformation"];
function SlidingBanner() {
  const doubled = [...BANNER_WORDS, ...BANNER_WORDS];
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "16px 0", background: "rgba(99,102,241,0.04)" }}>
      <motion.div
        style={{ display: "flex", gap: 48, width: "max-content", whiteSpace: "nowrap" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((word, i) => (
          <span key={i} style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.4, color: "var(--foreground)" }}>
            ✦ {word}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ── 3D Tilt Card ───────────────────────────────────────────────────────────────
function TiltCard({ children, style = {} }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 20 });
  const sry = useSpring(ry, { stiffness: 150, damping: 20 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rx.set(-py * 14);
    ry.set(px * 14);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformStyle: "preserve-3d",
        transformPerspective: 900,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

// ── Animated Number Strip ──────────────────────────────────────────────────────
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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div style={{ fontSize: 52, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.03em" }} className="gradient-text">
        {val}{suffix}
      </div>
      <div style={{ marginTop: 8, fontSize: 13, opacity: 0.5, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div>
    </motion.div>
  );
}

// ── Cursor Spotlight ───────────────────────────────────────────────────────────
function CursorSpotlight() {
  const mx = useMotionValue(-999);
  const my = useMotionValue(-999);
  useEffect(() => {
    const h = (e) => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, [mx, my]);

  const background = useMotionTemplate`radial-gradient(300px circle at ${mx}px ${my}px, rgba(99,102,241,0.08), transparent 70%)`;
  return (
    <motion.div
      style={{ background, position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
    />
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

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 animated-mesh" />

        {/* Morphing blobs */}
        <MorphingBlob color="#6366f1" size={500} delay={0} style={{ top: "-10%", left: "-8%" }} />
        <MorphingBlob color="#8b5cf6" size={380} delay={3} style={{ bottom: "-5%", right: "-5%" }} />
        <MorphingBlob color="#06b6d4" size={260} delay={6} style={{ top: "30%", right: "10%" }} />

        {/* Ripples behind brain */}
        <div className="absolute inset-0 flex items-center justify-end pr-16 pointer-events-none hidden lg:flex" style={{ zIndex: 1 }}>
          <div style={{ position: "relative", width: 420, height: 420 }}>
            <RippleWave />
          </div>
        </div>

        {/* Particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 3 + (i % 3) * 3,
              height: 3 + (i % 3) * 3,
              background: `hsl(${230 + i * 15}, 80%, 65%)`,
              left: `${8 + i * 9}%`,
              top: `${10 + (i % 5) * 18}%`,
              filter: "blur(1px)",
            }}
            animate={{ y: [0, -60 - i * 8, 0], opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
            transition={{ duration: 4 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
          />
        ))}

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              {/* Animated badge */}
              <motion.div
                className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground mb-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.span
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ scale: [1, 1.6, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                AI-Powered Innovation
              </motion.div>

              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <motion.span
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  style={{ display: "block" }}
                >
                  Building the
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45, duration: 0.7 }}
                  style={{ display: "block" }}
                >
                  <WordCycler />
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.7 }}
                  style={{ display: "block" }}
                >
                  with Intelligent Technology
                </motion.span>
              </h1>

              {/* Animated underline reveal */}
              <div style={{ position: "relative", marginBottom: 32, overflow: "hidden" }}>
                <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                  We craft AI-driven solutions that transform businesses, automate
                  processes, and unlock new possibilities in the digital landscape.
                </p>
                <motion.div
                  style={{ position: "absolute", bottom: 0, left: 0, height: 2, background: "linear-gradient(90deg, #6366f1, #8b5cf6, transparent)", transformOrigin: "left" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 1, ease: "easeOut" }}
                />
              </div>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 }}
              >
                <MagneticLink
                  to="/contact"
                  className="glow-button inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm text-foreground"
                >
                  Get Started <ArrowRight size={16} />
                </MagneticLink>

                <MagneticLink
                  to="/services"
                  className="inline-flex items-center gap-2 glass-card px-7 py-3.5 rounded-lg font-semibold text-sm text-foreground hover:bg-muted transition-colors"
                >
                  Our Services
                </MagneticLink>
              </motion.div>
            </motion.div>

            {/* Right visual */}
            <div className="hidden lg:flex justify-center">
              <div style={{ position: "relative", width: 420, height: 420 }}>
                {/* Orbiting balls */}
                <OrbitingBalls />

                {/* Rotating outer ring */}
                <motion.div
                  className="absolute inset-0 rounded-full wave-ring"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />

                {/* Counter-rotating ring */}
                <motion.div
                  style={{
                    position: "absolute",
                    inset: 20,
                    borderRadius: "50%",
                    border: "1px solid rgba(99,102,241,0.2)",
                  }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />

                {/* Brain — parallax + float */}
                <motion.div
                  className="absolute inset-10 glass-card rounded-full flex items-center justify-center"
                  style={{ rotateX, rotateY, transformPerspective: 600 }}
                  animate={{
                    y: [0, -25, 0],
                    boxShadow: [
                      "0 0 40px rgba(99,102,241,0.3)",
                      "0 0 90px rgba(99,102,241,0.7)",
                      "0 0 40px rgba(99,102,241,0.3)",
                    ],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  <Brain className="text-primary" size={90} strokeWidth={1} />
                </motion.div>

                {/* Floating mini-icons that orbit the brain */}
                {[Globe, Cloud, BarChart3, Shield].map((Icon, i) => {
                  const angle = (i / 4) * Math.PI * 2;
                  const r = 155;
                  return (
                    <motion.div
                      key={i}
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "rgba(99,102,241,0.15)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(99,102,241,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        x: Math.cos(angle) * r - 18,
                        y: Math.sin(angle) * r - 18,
                      }}
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.15, 1],
                      }}
                      transition={{
                        rotate: { duration: 20, repeat: Infinity, ease: "linear", delay: i * 2 },
                        scale: { duration: 3, repeat: Infinity, delay: i * 0.7 },
                      }}
                    >
                      <Icon size={16} className="text-primary" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SLIDING BANNER ────────────────────────────────────────────────── */}
      <SlidingBanner />

      {/* ── SERVICES ──────────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comprehensive technology solutions designed to drive your business forward.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard>
                  <div
                    className="glass-card rounded-xl p-6 h-full transition-all duration-300 group"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Color pop hover line */}
                    <motion.div
                      style={{
                        position: "absolute",
                        top: 0, left: 0, right: 0,
                        height: 2,
                        borderRadius: "12px 12px 0 0",
                        background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
                        opacity: 0,
                      }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                    />
                    <div
                      className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                      style={{ boxShadow: `0 0 20px ${s.color}44` }}
                    >
                      <s.icon size={22} className="text-foreground" />
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="gradient-text">Maven AI</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We combine deep technical expertise with a passion for innovation.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5, type: "spring", stiffness: 200 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="text-center p-6"
              >
                <motion.div
                  className="w-14 h-14 rounded-xl glass-card flex items-center justify-center mx-auto mb-4"
                  animate={{ rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                >
                  <f.icon size={24} className="text-primary" />
                </motion.div>
                <h3 className="font-display font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────── */}
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
            {/* Animated gradient sweep */}
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, rgba(99,102,241,0.05) 0%, transparent 50%, rgba(139,92,246,0.05) 100%)",
                transformOrigin: "center",
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {stats.map(s => <StatStrip key={s.label} {...s} />)}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <CTASection />
    </div>
  );
};

export default Index;