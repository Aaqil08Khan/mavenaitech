import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import {
  Brain, Globe, Cloud, BarChart3, Shield, Cpu, Smartphone, Database, Code,
  ArrowRight, ChevronRight, Zap, Star, CheckCircle,
} from "lucide-react";
import { useRef, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import CTASection from "@/components/CTASection";

const services = [
  {
    icon: Brain, title: "AI & Machine Learning", color: "#6366f1",
    image: "/images/brainimage.jpg",
    desc: "Custom AI models, natural language processing, computer vision, and predictive analytics tailored to solve your unique challenges.",
    highlights: ["Custom LLM fine-tuning", "Computer Vision", "Predictive Analytics"],
    badge: "Most Popular",
  },
  {
    icon: Globe, title: "Web Development", color: "#8b5cf6",
    image: "/images/globalwebdevelopment.jpg",
    desc: "Full-stack web applications using React, Next.js, and modern frameworks — fast, responsive, and beautifully designed.",
    highlights: ["React / Next.js", "Performance-first", "SEO Optimized"],
  },
  {
    icon: Cloud, title: "Cloud Solutions", color: "#06b6d4",
    image: "/images/cloudservice.jpg",
    desc: "Cloud architecture, migration, and managed services on AWS, Azure, and GCP for maximum reliability and scalability.",
    highlights: ["AWS / Azure / GCP", "Zero-downtime migration", "Auto-scaling"],
  },
  {
    icon: BarChart3, title: "Data Analytics", color: "#10b981",
    image: "/images/dataanalyst.jpg",
    desc: "Business intelligence dashboards, ETL pipelines, and advanced data visualization to turn data into decisions.",
    highlights: ["BI Dashboards", "ETL Pipelines", "Real-time Insights"],
  },
  {
    icon: Shield, title: "Cybersecurity", color: "#f59e0b",
    image: "/images/cybersecurity.jpg",
    desc: "Penetration testing, compliance auditing, and real-time threat monitoring to keep your digital assets secure.",
    highlights: ["Pen Testing", "SOC 2 Compliance", "24/7 Monitoring"],
    badge: "Critical",
  },
  {
    icon: Cpu, title: "Digital Transformation", color: "#ef4444",
    image: "/images/digitaltransformation.jpg",
    desc: "Strategic consulting and implementation to modernize legacy systems and streamline business operations.",
    highlights: ["Legacy Modernization", "Process Automation", "Strategy Consulting"],
  },
  {
    icon: Smartphone, title: "Mobile Development", color: "#ec4899",
    image: "/images/mobiledevelopment.jpg",
    desc: "Cross-platform mobile apps with React Native and Flutter for seamless iOS and Android experiences.",
    highlights: ["React Native", "Flutter", "App Store Launch"],
  },
  {
    icon: Database, title: "Database Engineering", color: "#14b8a6",
    image: "/images/databaseengineering.jpg",
    desc: "Design, optimization, and management of SQL and NoSQL databases for high-performance applications.",
    highlights: ["PostgreSQL / MongoDB", "Query Optimization", "High Availability"],
  },
  {
    icon: Code, title: "API Development", color: "#a855f7",
    image: "/images/apidevelopment.jpg",
    desc: "RESTful and GraphQL APIs built for scalability, security, and seamless third-party integrations.",
    highlights: ["REST & GraphQL", "OAuth / JWT", "API Documentation"],
  },
];

const processSteps = [
  { num: "01", title: "Discovery", desc: "We deep-dive into your goals, tech stack, and challenges to craft the right approach.", color: "#6366f1" },
  { num: "02", title: "Strategy", desc: "A detailed roadmap is built with milestones, timelines, and resource planning.", color: "#8b5cf6" },
  { num: "03", title: "Build", desc: "Our engineers execute with precision using agile sprints and continuous delivery.", color: "#06b6d4" },
  { num: "04", title: "Launch & Scale", desc: "We deploy, monitor, and optimize — staying with you long after go-live.", color: "#10b981" },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
function MorphingBlob({ color = "#6366f1", size = 300, delay = 0, style = {} }) {
  const variants = {
    a: { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%", scale: 1 },
    b: { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%", scale: 1.05 },
    c: { borderRadius: "50% 50% 40% 60% / 40% 70% 30% 50%", scale: 0.97 },
  };
  return (
    <motion.div
      style={{ width: size, height: size, background: `radial-gradient(circle at 40% 40%, ${color}44, ${color}0a)`, filter: "blur(50px)", position: "absolute", ...style }}
      variants={variants} initial="a" animate={["a","b","c","a"]}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay, times: [0,0.33,0.66,1] }}
    />
  );
}

function TiltCard({ children, style = {} }) {
  const ref = useRef(null);
  const rx = useMotionValue(0); const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 20 });
  const sry = useSpring(ry, { stiffness: 150, damping: 20 });
  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    rx.set(-(((e.clientY - rect.top) / rect.height) - 0.5) * 12);
    ry.set((((e.clientX - rect.left) / rect.width) - 0.5) * 12);
  };
  return (
    <motion.div ref={ref} onMouseMove={handleMove} onMouseLeave={() => { rx.set(0); ry.set(0); }}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", transformPerspective: 900, ...style }}>
      {children}
    </motion.div>
  );
}

// ── Service Card ───────────────────────────────────────────────────────────────
function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard style={{ height: "100%" }}>
        <motion.div
          className="glass-card rounded-2xl overflow-hidden h-full flex flex-col cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          animate={{ boxShadow: hovered ? `0 24px 70px ${service.color}33` : "0 0 0 rgba(0,0,0,0)" }}
          transition={{ duration: 0.3 }}
          style={{ position: "relative" }}
        >
          {/* Badge */}
          {service.badge && (
            <div style={{
              position: "absolute", top: 14, right: 14, zIndex: 10,
              fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase",
              background: service.badge === "Most Popular" ? "rgba(99,102,241,0.9)" : "rgba(245,158,11,0.9)",
              color: "#fff", padding: "3px 10px", borderRadius: 99,
              backdropFilter: "blur(8px)",
            }}>{service.badge}</div>
          )}

          {/* Image */}
          <div style={{ position: "relative", height: 170, overflow: "hidden", flexShrink: 0 }}>
            <motion.img
              src={service.image} alt={service.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              animate={{ scale: hovered ? 1.08 : 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.85) 100%)" }} />
            <motion.div style={{ position: "absolute", inset: 0, background: `${service.color}22` }} animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }} />

            {/* Accent top bar */}
            <motion.div
              style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${service.color}, ${service.color}44)`, transformOrigin: "left" }}
              animate={{ scaleX: hovered ? 1 : 0 }}
              initial={{ scaleX: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Icon */}
            <div style={{ position: "absolute", bottom: 14, left: 16, width: 40, height: 40, borderRadius: 10, background: `${service.color}cc`, backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 20px ${service.color}88` }}>
              <service.icon size={18} color="#fff" />
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: "18px 20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
            <h3 className="font-display font-bold text-lg mb-2">{service.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4" style={{ flex: 1 }}>{service.desc}</p>

            {/* Highlights */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
              {service.highlights.map((h) => (
                <div key={h} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <CheckCircle size={13} color={service.color} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 12, opacity: 0.65, fontWeight: 500 }}>{h}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              className="flex items-center gap-1"
              style={{ color: service.color, fontSize: 13, fontWeight: 700 }}
              animate={{ x: hovered ? 5 : 0 }}
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

// ── Process Step ───────────────────────────────────────────────────────────────
function ProcessStep({ step, index, total }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      style={{ position: "relative" }}
    >
      <div className="glass-card rounded-2xl p-7 h-full" style={{ position: "relative", overflow: "hidden" }}>
        {/* Glow */}
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 0%, ${step.color}15, transparent 70%)`, pointerEvents: "none" }} />

        {/* Number */}
        <div style={{ fontSize: 64, fontWeight: 900, lineHeight: 1, color: `${step.color}18`, letterSpacing: "-0.04em", position: "absolute", top: 10, right: 16, userSelect: "none" }}>
          {step.num}
        </div>

        <div style={{ width: 48, height: 48, borderRadius: 14, background: `${step.color}1a`, border: `1px solid ${step.color}44`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, boxShadow: `0 0 24px ${step.color}33` }}>
          <span style={{ fontSize: 18, fontWeight: 900, color: step.color }}>{step.num}</span>
        </div>

        <h3 className="font-display font-bold text-xl mb-3" style={{ position: "relative" }}>{step.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed" style={{ position: "relative" }}>{step.desc}</p>

        <div style={{ marginTop: 20, height: 2, borderRadius: 99, background: `linear-gradient(90deg, ${step.color}, transparent)`, opacity: 0.5 }} />
      </div>

      {/* Arrow connector */}
      {index < total - 1 && (
        <div className="hidden lg:flex absolute top-1/2 -right-4 z-10 items-center justify-center" style={{ transform: "translateY(-50%)" }}>
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight size={18} style={{ opacity: 0.3 }} />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
const Services = () => {
  return (
    <div className="min-h-screen pt-24" style={{ position: "relative" }}>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <MorphingBlob color="#6366f1" size={500} delay={0} style={{ top: "-20%", left: "-10%", zIndex: 0 }} />
        <MorphingBlob color="#06b6d4" size={350} delay={5} style={{ bottom: "-10%", right: "-8%", zIndex: 0 }} />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <motion.span
                style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", padding: "4px 14px", borderRadius: 99, display: "inline-block", marginBottom: 20 }}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              >What We Offer</motion.span>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Our <span className="gradient-text">Services</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                End-to-end technology solutions that power growth, streamline operations, and drive innovation across every layer of your business.
              </p>

              {/* Service count chips */}
              <div className="flex flex-wrap gap-3">
                {["AI & ML", "Web & Mobile", "Cloud", "Security", "Data"].map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.08, type: "spring", stiffness: 200 }}
                    className="glass-card"
                    style={{ fontSize: 12, fontWeight: 600, padding: "6px 14px", borderRadius: 99, display: "inline-block" }}
                  >{tag}</motion.span>
                ))}
              </div>
            </motion.div>

            {/* Right — image collage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "relative", height: 400 }}
              className="hidden lg:block"
            >
              <motion.div style={{ position: "absolute", top: 0, left: "5%", right: 0, height: 260, borderRadius: 20, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.35)" }} animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                <img src="/images/services.jpg" alt="Services" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(99,102,241,0.3), transparent)" }} />
              </motion.div>

              <motion.div style={{ position: "absolute", bottom: 0, left: 0, width: "46%", height: 180, borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }} animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
                <img src="/images/code.jpg" alt="Code" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(6,182,212,0.2)" }} />
              </motion.div>

              {/* Floating stat */}
              <motion.div className="glass-card rounded-xl p-4" style={{ position: "absolute", bottom: 20, right: 0, minWidth: 160, boxShadow: "0 16px 40px rgba(0,0,0,0.25)" }} animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
                <div style={{ fontSize: 11, opacity: 0.5, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Services</div>
                <div style={{ fontSize: 36, fontWeight: 900 }} className="gradient-text">9+</div>
                <div style={{ fontSize: 12, opacity: 0.55 }}>Core offerings</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICE GRID ──────────────────────────────────────────────────── */}
      <section className="py-16 pb-28">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center mb-14">
            <motion.span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", padding: "4px 14px", borderRadius: 99, display: "inline-block", marginBottom: 14 }}>Full Stack</motion.span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Everything You <span className="gradient-text">Need to Grow</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">From first idea to global scale — we cover every layer of the modern tech stack.</p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => <ServiceCard key={s.title} service={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "rgba(99,102,241,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src="/images/chip.jpg" alt="chip" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.03 }} />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal className="text-center mb-16">
            <motion.span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", padding: "4px 14px", borderRadius: 99, display: "inline-block", marginBottom: 14 }}>How We Work</motion.span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Process</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">A proven 4-step framework that delivers results — every time.</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" style={{ position: "relative" }}>
            {processSteps.map((step, i) => (
              <ProcessStep key={step.num} step={step} index={i} total={processSteps.length} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM IMAGE BANNER ────────────────────────────────────────────── */}
      <section className="py-0">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", height: 320, overflow: "hidden" }}
        >
          <img
            src="/images/technology.jpg"
            alt="Technology"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.3) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(99,102,241,0.15)" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}>
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.7 }}
                style={{ maxWidth: 560 }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(99,102,241,0.9)", marginBottom: 14 }}>Ready to start?</div>
                <h2 style={{ fontSize: 36, fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: 20 }}>
                  Let's build something<br />extraordinary together.
                </h2>
                <motion.a
                  href="/contact"
                  className="inline-flex items-center gap-2 glow-button px-7 py-3.5 rounded-lg font-semibold text-sm text-foreground"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Get a Free Consultation <ArrowRight size={15} />
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      <CTASection />
    </div>
  );
};

export default Services;