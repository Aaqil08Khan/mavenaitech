import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  Target,
  Eye,
  Lightbulb,
  Rocket,
  Users,
  Award,
  Globe,
  ArrowRight,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import CTASection from "@/components/CTASection";

const timeline = [
  {
    year: "Nov 2023",
    title: "Founded",
    desc: "Maven AI Tech was officially founded in November 2023 with a bold vision to democratize AI and make enterprise-grade technology accessible to growing businesses.",
    image: "/images/founded.jpg",
    color: "#6366f1",
  },
  {
    year: "Aug 2024",
    title: "Growth Phase",
    desc: "By August 2024, we expanded our core team, strengthened our technical capabilities, and began delivering scalable cloud-native AI solutions to enterprise clients.",
    image: "/images/growthphase.jpg",
    color: "#8b5cf6",
  },
  {
    year: "Jun 2025",
    title: "Global Reach",
    desc: "In June 2025, Maven AI Tech reached a major milestone — serving 10+ clients globally across multiple industries with a rapidly growing team of engineers and strategists.",
    image: "/images/globalreach.jpg",
    color: "#10b981",
  },
  {
    year: "Nov 2025",
    title: "Product-Based R&D",
    desc: "Transitioned into product-driven innovation in November 2025 by launching internal R&D initiatives and developing our own AI-powered products for the market.",
    image: "/images/productrd.jpg",
    color: "#f59e0b",
  },
  {
    year: "Present",
    title: "Where We Stand Today",
    desc: "Today, Maven AI Tech continues to grow with 35+ team members, 10+ global clients, active R&D projects, and a strong focus on building scalable AI solutions and proprietary products.",
    image: "/images/present.jpg",
    color: "#06b6d4",
  },
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We push boundaries and explore emerging technologies to stay ahead.",
    color: "#f59e0b",
  },
  {
    icon: Target,
    title: "Impact",
    desc: "Every project is measured by the tangible value it creates for our clients.",
    color: "#6366f1",
  },
  {
    icon: Rocket,
    title: "Speed",
    desc: "Agile processes ensure fast delivery without compromising quality.",
    color: "#ef4444",
  },
];

const founder = {
  name: "Mohammad Aslam Hyder Qureshi Bilal",
  role: "CEO & Co-Founder",
  avatar: "/images/alexmonroe.jpg",
  bio: "Former Google engineer with 15 years in AI research.",
};

const awards = [
  { label: "Best AI Company", year: "2023", org: "TechCrunch" },
  { label: "Top 50 Startups", year: "2022", org: "Forbes" },
  { label: "Innovation Award", year: "2024", org: "Gartner" },
];

// ── Divider ────────────────────────────────────────────────────────────────────
function SectionDivider({ color = "#6366f1" }) {
  return (
    <div
      style={{
        height: 1,
        background: `linear-gradient(90deg, transparent, ${color}40, ${color}20, transparent)`,
        width: "100%",
      }}
    />
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
        background: `radial-gradient(circle at 40% 40%, ${color}44, ${color}0a)`,
        filter: "blur(50px)",
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

function TiltCard({ children, style = {} }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 20 });
  const sry = useSpring(ry, { stiffness: 150, damping: 20 });
  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    rx.set(-((e.clientY - rect.top) / rect.height - 0.5) * 12);
    ry.set(((e.clientX - rect.left) / rect.width - 0.5) * 12);
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

// ── Timeline Item ──────────────────────────────────────────────────────────────
function TimelineItem({ item, index, total }) {
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className={`flex gap-8 items-center ${isEven ? "flex-row" : "flex-row-reverse"} mb-12`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex-1">
        <TiltCard>
          <motion.div
            className="glass-card rounded-2xl overflow-hidden"
            animate={{ boxShadow: hovered ? `0 20px 60px ${item.color}33` : "none" }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ position: "relative", height: 160, overflow: "hidden" }}>
              <motion.img
                src={item.image}
                alt={item.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                animate={{ scale: hovered ? 1.06 : 1 }}
                transition={{ duration: 0.5 }}
              />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${item.color}44, transparent)` }} />
            </div>
            <div style={{ padding: "18px 22px 22px" }}>
              <h4 className="font-display font-bold text-lg mb-1">{item.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        </TiltCard>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, position: "relative" }}>
        <motion.div
          style={{
            width: 64, height: 64, borderRadius: "50%",
            background: `linear-gradient(135deg, ${item.color}, ${item.color}88)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: hovered ? `0 0 40px ${item.color}88` : `0 0 20px ${item.color}44`,
            transition: "box-shadow 0.3s", zIndex: 2,
          }}
          animate={{ scale: hovered ? 1.15 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <span style={{ fontWeight: 900, fontSize: 12, color: "#fff", letterSpacing: "-0.02em" }}>{item.year}</span>
        </motion.div>
        {index < total - 1 && (
          <div style={{ width: 2, flex: 1, minHeight: 48, background: `linear-gradient(to bottom, ${item.color}66, transparent)`, marginTop: 8 }} />
        )}
      </div>

      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}

// ── Founder Card ──────────────────────────────────────────────────────────────
function FounderSpotlight({ member }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <TiltCard>
        <motion.div
          className="glass-card rounded-3xl overflow-hidden"
          style={{ width: 300, textAlign: "center" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          animate={{ boxShadow: hovered ? "0 24px 70px rgba(99,102,241,0.3)" : "0 8px 30px rgba(0,0,0,0.2)" }}
          transition={{ duration: 0.3 }}
        >
          {/* Top gradient bar */}
          <div style={{ height: 3, background: "linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)" }} />

          {/* Photo */}
          <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
            <motion.img
              src={member.avatar}
              alt={member.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              animate={{ scale: hovered ? 1.06 : 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.75) 100%)" }} />
            <motion.div
              style={{ position: "absolute", inset: 0, background: "rgba(99,102,241,0.18)" }}
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Info */}
          <div style={{ padding: "22px 24px 26px" }}>
            <h3 style={{ fontWeight: 800, fontSize: 17, lineHeight: 1.3, marginBottom: 6 }} className="font-display">
              {member.name}
            </h3>
            <div style={{ fontSize: 12, color: "#6366f1", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>
              {member.role}
            </div>
            <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)", marginBottom: 12 }} />
            <p style={{ fontSize: 13, opacity: 0.55, lineHeight: 1.65 }}>{member.bio}</p>
          </div>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
const About = () => {
  return (
    <div className="min-h-screen pt-24" style={{ position: "relative" }}>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 lg:py-20 relative overflow-hidden">
        <MorphingBlob color="#6366f1" size={500} delay={0} style={{ top: "-20%", left: "-10%", zIndex: 0 }} />
        <MorphingBlob color="#8b5cf6" size={350} delay={4} style={{ bottom: "-10%", right: "-8%", zIndex: 0 }} />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <motion.span
                style={{
                  fontSize: 12, fontWeight: 700, letterSpacing: "0.14em",
                  textTransform: "uppercase", color: "#6366f1",
                  background: "rgba(99,102,241,0.1)",
                  border: "1px solid rgba(99,102,241,0.25)",
                  padding: "4px 14px", borderRadius: 99, display: "inline-block", marginBottom: 20,
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Our Story
              </motion.span>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                About <span className="gradient-text">Maven AI Tech</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                We are a team of engineers, designers, and strategists united by a single mission — to help businesses harness the transformative power of artificial intelligence and modern technology.
              </p>

              <div className="flex flex-wrap gap-6">
                {[
                  { icon: Users, val: "35+", label: "Team Members" },
                  { icon: Globe, val: "50+", label: "Global Clients" },
                  { icon: Award, val: "3+", label: "Years of Excellence" },
                ].map((s, i) => (
                  <motion.div key={s.label} className="flex items-center gap-3"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.12 }}
                  >
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(99,102,241,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <s.icon size={18} color="#6366f1" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 20 }} className="gradient-text">{s.val}</div>
                      <div style={{ fontSize: 12, opacity: 0.5, fontWeight: 500 }}>{s.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "relative", height: 420 }}
            >
              <motion.div
                style={{ position: "absolute", top: 0, left: "10%", right: 0, height: 280, borderRadius: 20, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.35)" }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <img src="/images/team.jpg" alt="Team" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(99,102,241,0.25), transparent)" }} />
              </motion.div>

              <motion.div
                style={{ position: "absolute", bottom: 0, left: 0, width: "48%", height: 180, borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }}
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <img src="/images/teamworking.jpg" alt="Work" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(139,92,246,0.2)" }} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <SectionDivider color="#6366f1" />

      {/* ── MISSION & VISION ──────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 lg:py-20 relative overflow-hidden" style={{ background: "rgba(99,102,241,0.02)" }}>
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center mb-10 md:mb-14">
            <motion.span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", padding: "4px 14px", borderRadius: 99, display: "inline-block", marginBottom: 14 }}>
              Core Beliefs
            </motion.span>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              What We <span className="gradient-text">Stand For</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Target, title: "Our Mission", color: "#6366f1", image: "/images/ourmission.jpg", text: "To empower organizations of every size with accessible, scalable AI solutions that drive real business impact — reducing costs, accelerating growth, and unlocking innovation." },
              { icon: Eye, title: "Our Vision", color: "#8b5cf6", image: "/images/ourvision.jpg", text: "A world where every business — from startup to enterprise — can leverage cutting-edge AI and technology to make smarter decisions and create extraordinary experiences." },
            ].map((card, i) => (
              <motion.div key={card.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}>
                <TiltCard>
                  <motion.div className="glass-card rounded-2xl overflow-hidden h-full" whileHover={{ boxShadow: `0 24px 70px ${card.color}33` }} transition={{ duration: 0.3 }}>
                    <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
                      <img src={card.image} alt={card.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${card.color}55, rgba(0,0,0,0.5))` }} />
                      <div style={{ position: "absolute", bottom: 18, left: 22, display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 42, height: 42, borderRadius: 12, background: `${card.color}cc`, backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 20px ${card.color}88` }}>
                          <card.icon size={20} color="#fff" />
                        </div>
                        <h3 style={{ fontWeight: 800, fontSize: 22, color: "#fff" }}>{card.title}</h3>
                      </div>
                    </div>
                    <div style={{ padding: "22px 24px 26px" }}>
                      <p className="text-muted-foreground leading-relaxed">{card.text}</p>
                    </div>
                  </motion.div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider color="#8b5cf6" />

      {/* ── VALUES ────────────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 lg:py-20 relative overflow-hidden">
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/chip.jpg')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.08, filter: "grayscale(100%)" }} />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal className="text-center mb-10 md:mb-14">
            <motion.span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", padding: "4px 14px", borderRadius: 99, display: "inline-block", marginBottom: 14 }}>
              Our DNA
            </motion.span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              What Drives <span className="gradient-text">Us</span>
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.12, type: "spring", stiffness: 200 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <div className="glass-card rounded-2xl p-8 text-center h-full" style={{ position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 0%, ${v.color}18, transparent 70%)`, pointerEvents: "none" }} />
                  <motion.div
                    style={{ width: 64, height: 64, borderRadius: 18, background: `${v.color}1a`, border: `1px solid ${v.color}44`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", boxShadow: `0 0 30px ${v.color}33` }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  >
                    <v.icon size={26} color={v.color} />
                  </motion.div>
                  <h3 className="font-display font-bold text-xl mb-3">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                  <div style={{ marginTop: 18, height: 2, borderRadius: 99, background: `linear-gradient(90deg, transparent, ${v.color}, transparent)`, opacity: 0.4 }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider color="#06b6d4" />

      {/* ── TIMELINE ──────────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 lg:py-20" style={{ background: "rgba(99,102,241,0.02)" }}>
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center mb-10 md:mb-14">
            <motion.span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", padding: "4px 14px", borderRadius: 99, display: "inline-block", marginBottom: 14 }}>
              Timeline
            </motion.span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              From a bold idea to a global technology partner — here's how we got here.
            </p>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, i) => (
              <TimelineItem key={item.year} item={item} index={i} total={timeline.length} />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider color="#10b981" />

      {/* ── FOUNDER SPOTLIGHT ─────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 lg:py-20 relative overflow-hidden">
        <MorphingBlob color="#6366f1" size={400} delay={2} style={{ top: "10%", right: "-10%", zIndex: 0 }} />
        <MorphingBlob color="#8b5cf6" size={300} delay={5} style={{ bottom: "5%", left: "-8%", zIndex: 0 }} />

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal className="text-center mb-10 md:mb-14">
            <motion.span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", padding: "4px 14px", borderRadius: 99, display: "inline-block", marginBottom: 14 }}>
              The Visionary
            </motion.span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              The Mind <span className="gradient-text">Behind Maven</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The person who started it all.
            </p>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto">
            <FounderSpotlight member={founder} />
          </div>
        </div>
      </section>

      <SectionDivider color="#f59e0b" />

     

      <SectionDivider color="#6366f1" />

      <CTASection />
    </div>
  );
};

export default About;