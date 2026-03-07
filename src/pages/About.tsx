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
  BookOpen,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import CTASection from "@/components/CTASection";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const timeline = [
  { year: "Nov 2023", title: "Ideated", desc: "The vision for Maven AI Tech was conceived in November 2023 — a bold idea to democratize AI and make enterprise-grade technology accessible to growing businesses.", image: "/images/ideated.jpg", color: "#6366f1" },
  { year: "Jan 2024", title: "Founded", desc: "Maven AI Tech was officially founded in January 2024, turning the vision into reality and laying the groundwork for building scalable AI solutions for businesses worldwide.", image: "/images/founded.jpg", color: "#a855f7" },
  { year: "Aug 2024", title: "Growth Phase", desc: "By August 2024, we expanded our core team, strengthened our technical capabilities, and began delivering scalable cloud-native AI solutions to enterprise clients.", image: "/images/growthphase.jpg", color: "#8b5cf6" },
  { year: "Jun 2025", title: "Global Reach", desc: "In June 2025, Maven AI Tech reached a major milestone — serving 10+ clients globally across multiple industries with a rapidly growing team of engineers and strategists.", image: "/images/globalreach.jpg", color: "#10b981" },
  { year: "Nov 2025", title: "Product-Based R&D", desc: "Transitioned into product-driven innovation in November 2025 by launching internal R&D initiatives and developing our own AI-powered products for the market.", image: "/images/productrd.jpg", color: "#f59e0b" },
  { year: "Present", title: "Where We Stand Today", desc: "Today, Maven AI Tech continues to grow with 35+ team members, 10+ global clients, active R&D projects, and a strong focus on building scalable AI solutions and proprietary products.", image: "/images/present.jpg", color: "#06b6d4" },
];

const values = [
  { icon: Lightbulb, title: "Innovation", desc: "We push boundaries and explore emerging technologies to stay ahead.", color: "#f59e0b" },
  { icon: Target,    title: "Impact",     desc: "Every project is measured by the tangible value it creates for our clients.", color: "#6366f1" },
  { icon: Rocket,    title: "Speed",      desc: "Agile processes ensure fast delivery without compromising quality.", color: "#ef4444" },
];

const founder = {
  name: "Mohammed Aslam Hyder Quraishi Bilal",
  role: "Managing Director @The Maven's Group",
  secondaryRole: "Entrepreneur · Engineer · Life Coach/Counsellor · Educationist",
  location: "Saudi Arabia",
  avatar: "/images/CEO.png",
  tagline: "Founder & CEO, Maven AI Tech",
  skills: ["Entrepreneurship", "Engineering", "AI Strategy", "Life Coaching", "Education", "Team Leadership", "Product Development", "R&D"],
};

const PDF_PATH = "/brochure/Maven_AI_Tech_Brochure.pdf";

// ─── HELPERS ──────────────────────────────────────────────────────────────────

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

function MorphingBlob({ color = "#6366f1", size = 300, delay = 0, style = {} }) {
  const v = {
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
      variants={v}
      initial="a"
      animate={["a", "b", "c", "a"]}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay, times: [0, 0.33, 0.66, 1] }}
    />
  );
}

function TiltCard({ children, style = {}, disabled = false }) {
  const ref = useRef(null);
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 20 });
  const sry = useSpring(ry, { stiffness: 150, damping: 20 });

  const handleMove = (e) => {
    if (disabled) return;
    const r = ref.current.getBoundingClientRect();
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 12);
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 12);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
      style={{
        rotateX: disabled ? 0 : srx,
        rotateY: disabled ? 0 : sry,
        transformStyle: "preserve-3d",
        transformPerspective: 900,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── RESPONSIVE HOOK ──────────────────────────────────────────────────────────

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

// ─── TIMELINE ─────────────────────────────────────────────────────────────────

function TimelineItem({ item, index, total }) {
  const [hovered, setHovered] = useState(false);
  const width = useWindowWidth();
  const isMobile = width < 768;
  const isEven = index % 2 === 0;

  // On mobile: always stack vertically with left-aligned dot
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        style={{ display: "flex", gap: 14, marginBottom: 28 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Left column: dot + line */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
          <motion.div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${item.color}, ${item.color}88)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: hovered ? `0 0 30px ${item.color}88` : `0 0 16px ${item.color}44`,
              transition: "box-shadow 0.3s",
              zIndex: 2,
              flexShrink: 0,
            }}
            animate={{ scale: hovered ? 1.12 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <span style={{ fontWeight: 900, fontSize: 10, color: "#fff", letterSpacing: "-0.02em", textAlign: "center", lineHeight: 1.2 }}>
              {item.year}
            </span>
          </motion.div>
          {index < total - 1 && (
            <div
              style={{
                width: 2,
                flex: 1,
                minHeight: 32,
                background: `linear-gradient(to bottom, ${item.color}66, transparent)`,
                marginTop: 8,
              }}
            />
          )}
        </div>

        {/* Right column: card */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <motion.div
            className="glass-card rounded-2xl overflow-hidden"
            animate={{ boxShadow: hovered ? `0 16px 50px ${item.color}33` : "none" }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ position: "relative", height: 130, overflow: "hidden" }}>
              <motion.img
                src={item.image}
                alt={item.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                animate={{ scale: hovered ? 1.06 : 1 }}
                transition={{ duration: 0.5 }}
              />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${item.color}44, transparent)` }} />
            </div>
            <div style={{ padding: "14px 16px 18px" }}>
              <h4 className="font-display font-bold text-base mb-1">{item.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Desktop: alternating left/right
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

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <motion.div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${item.color}, ${item.color}88)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: hovered ? `0 0 40px ${item.color}88` : `0 0 20px ${item.color}44`,
            transition: "box-shadow 0.3s",
            zIndex: 2,
          }}
          animate={{ scale: hovered ? 1.15 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <span style={{ fontWeight: 900, fontSize: 12, color: "#fff", letterSpacing: "-0.02em" }}>{item.year}</span>
        </motion.div>
        {index < total - 1 && (
          <div
            style={{
              width: 2,
              flex: 1,
              minHeight: 48,
              background: `linear-gradient(to bottom, ${item.color}66, transparent)`,
              marginTop: 8,
            }}
          />
        )}
      </div>

      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}

// ─── FOUNDER ──────────────────────────────────────────────────────────────────

function FounderSpotlight({ member }) {
  const [hovered, setHovered] = useState(false);
  const width = useWindowWidth();
  const isMobile = width < 768;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard disabled={isMobile}>
        <motion.div
          className="glass-card rounded-3xl overflow-hidden"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          animate={{ boxShadow: hovered ? "0 32px 80px rgba(99,102,241,0.28)" : "0 8px 30px rgba(0,0,0,0.2)" }}
          transition={{ duration: 0.3 }}
          style={{ position: "relative" }}
        >
          {/* Top accent bar */}
          <div style={{ height: 3, background: "linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4, #10b981)" }} />

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "280px 1fr",
            minHeight: isMobile ? "auto" : 380,
          }}>

            {/* ── Left: photo + name ── */}
            <div style={{ position: "relative", overflow: "hidden", minHeight: isMobile ? 280 : "auto" }}>
              <motion.img
                src={member.avatar}
                alt={member.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
                animate={{ scale: hovered ? 1.05 : 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              {/* Gradient overlay */}
              <div style={{ position: "absolute", inset: 0, background: isMobile
                ? "linear-gradient(to bottom, transparent 40%, rgba(5,5,20,0.92) 100%)"
                : "linear-gradient(to right, transparent 55%, rgba(5,5,20,0.85) 100%)" }}
              />
              {/* Indigo shimmer on hover */}
              <motion.div
                style={{ position: "absolute", inset: 0, background: "rgba(99,102,241,0.14)" }}
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              {/* Name overlay on mobile */}
              {isMobile && (
                <div style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
                  <div style={{ fontSize: 10, color: "#818cf8", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
                    {member.role}
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: 18, lineHeight: 1.25, color: "#fff", marginBottom: 4 }}>
                    {member.name}
                  </h3>
                  <div style={{ fontSize: 11, opacity: 0.6, color: "#fff" }}>
                    {member.secondaryRole} · 📍 {member.location}
                  </div>
                </div>
              )}
            </div>

            {/* ── Right: all text content ── */}
            <div style={{ padding: isMobile ? "24px 22px 28px" : "32px 36px 32px 32px", display: "flex", flexDirection: "column", gap: 0 }}>

              {/* Name + role (desktop only) */}
              {!isMobile && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 11, color: "#818cf8", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                    {member.role}
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: 22, lineHeight: 1.25, marginBottom: 6 }} className="font-display">
                    {member.name}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 12, opacity: 0.55, fontWeight: 500 }}>{member.secondaryRole}</span>
                    <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "inline-block" }} />
                    <span style={{ fontSize: 12, opacity: 0.45 }}>📍 {member.location}</span>
                  </div>
                  <p style={{ fontSize: 13, color: "#818cf8", fontStyle: "italic", opacity: 0.8 }}>{member.tagline}</p>
                </div>
              )}

              {/* Divider */}
              {!isMobile && <div style={{ height: 1, background: "linear-gradient(90deg, rgba(99,102,241,0.3), transparent)", marginBottom: 20 }} />}

              {/* Bio */}
              <p style={{ fontSize: 14, lineHeight: 1.75, opacity: 0.7, marginBottom: 20 }}>
                {member.bio}
              </p>


              {/* Skill tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 22 }}>
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "4px 11px",
                      borderRadius: 99,
                      background: "rgba(99,102,241,0.1)",
                      border: "1px solid rgba(99,102,241,0.22)",
                      color: "#818cf8",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

            </div>
          </div>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
}

// ─── PDF CANVAS VIEWER ────────────────────────────────────────────────────────

function PdfCanvasViewer({ onClose }) {
  const canvasRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.2);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const renderTaskRef = useRef(null);
  const width = useWindowWidth();
  const isMobile = width < 640;

  useEffect(() => {
    // Adjust initial scale for smaller screens
    if (width < 480) setScale(0.7);
    else if (width < 768) setScale(0.9);
    else setScale(1.2);
  }, [width]);

  useEffect(() => {
    const loadPdfJs = async () => {
      try {
        if (!window.pdfjsLib) {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
          window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        }
        const loadingTask = window.pdfjsLib.getDocument(PDF_PATH);
        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        setTotalPages(pdf.numPages);
        setLoading(false);
      } catch (err) {
        console.error("PDF load error:", err);
        setError("Could not load brochure. Make sure the PDF is in /public/brochure/");
        setLoading(false);
      }
    };
    loadPdfJs();
  }, []);

  const renderPage = useCallback(
    async (pageNum, sc) => {
      if (!pdfDoc || !canvasRef.current) return;
      if (renderTaskRef.current) {
        try { await renderTaskRef.current.cancel(); } catch (_) {}
      }
      try {
        const page = await pdfDoc.getPage(pageNum);
        const viewport = page.getViewport({ scale: sc });
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderCtx = { canvasContext: ctx, viewport };
        renderTaskRef.current = page.render(renderCtx);
        await renderTaskRef.current.promise;
      } catch (err) {
        if (err?.name !== "RenderingCancelledException") console.error("Render error:", err);
      }
    },
    [pdfDoc]
  );

  useEffect(() => {
    renderPage(currentPage, scale);
  }, [pdfDoc, currentPage, scale, renderPage]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") setCurrentPage((p) => Math.min(p + 1, totalPages));
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") setCurrentPage((p) => Math.max(p - 1, 1));
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [totalPages, onClose]);

  const zoomIn  = () => setScale((s) => Math.min(s + 0.2, 2.5));
  const zoomOut = () => setScale((s) => Math.max(s - 0.2, 0.4));

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Top chrome */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "10px 12px" : "12px 18px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(0,0,0,0.22)",
          gap: 8,
          flexShrink: 0,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
          <BookOpen size={15} color="#6366f1" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: isMobile ? 11 : 13, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            Maven AI Tech Brochure 2025
          </span>
          {totalPages > 0 && (
            <span style={{ fontSize: 11, opacity: 0.35, flexShrink: 0 }}>· {totalPages} pages</span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <button
            onClick={zoomOut}
            title="Zoom out"
            style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          >
            <ZoomOut size={13} />
          </button>
          <span style={{ fontSize: 11, opacity: 0.45, minWidth: 36, textAlign: "center" }}>
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={zoomIn}
            title="Zoom in"
            style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          >
            <ZoomIn size={13} />
          </button>
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.1)", margin: "0 4px" }} />
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.12, background: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.9 }}
            style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          >
            <X size={13} />
          </motion.button>
        </div>
      </div>

      {/* Canvas area */}
      <div
        style={{ flex: 1, overflowY: "auto", overflowX: "auto", background: "#0f0f1a", display: "flex", justifyContent: "center", alignItems: "flex-start", padding: isMobile ? "12px 8px" : "20px 16px" }}
        onContextMenu={(e) => e.preventDefault()}
      >
        {loading && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 300, gap: 16, opacity: 0.5 }}>
            <motion.div
              style={{ width: 36, height: 36, border: "3px solid rgba(99,102,241,0.3)", borderTopColor: "#6366f1", borderRadius: "50%" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
            />
            <span style={{ fontSize: 13 }}>Loading brochure…</span>
          </div>
        )}
        {error && (
          <div style={{ textAlign: "center", padding: 30, opacity: 0.5 }}>
            <p style={{ fontSize: 14, marginBottom: 8 }}>⚠️ {error}</p>
            <p style={{ fontSize: 12 }}>
              Place your PDF at: <code>public/brochure/Maven_AI_Tech_Brochure.pdf</code>
            </p>
          </div>
        )}
        {!loading && !error && (
          <canvas
            ref={canvasRef}
            style={{
              maxWidth: "100%",
              borderRadius: 8,
              boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
              userSelect: "none",
              WebkitUserSelect: "none",
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {/* Bottom nav */}
      {totalPages > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? 6 : 10,
            padding: isMobile ? "10px 10px" : "12px 18px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(0,0,0,0.22)",
            flexShrink: 0,
          }}
        >
          <motion.button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            whileHover={currentPage > 1 ? { scale: 1.04 } : {}}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: isMobile ? "6px 10px" : "7px 14px",
              borderRadius: 10,
              background: currentPage === 1 ? "transparent" : "rgba(99,102,241,0.1)",
              border: `1px solid ${currentPage === 1 ? "transparent" : "rgba(99,102,241,0.22)"}`,
              color: currentPage === 1 ? "rgba(255,255,255,0.2)" : "#818cf8",
              fontWeight: 600,
              fontSize: 12,
              cursor: currentPage === 1 ? "default" : "pointer",
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            <ChevronLeft size={14} />
            {!isMobile && "Prev"}
          </motion.button>

          {/* Page dots — hide on very small screens, show page counter instead */}
          {isMobile ? (
            <div style={{ flex: 1, textAlign: "center", fontSize: 12, opacity: 0.55, fontWeight: 600 }}>
              {currentPage} / {totalPages}
            </div>
          ) : (
            <div style={{ display: "flex", gap: 4, flex: 1, justifyContent: "center", flexWrap: "wrap" }}>
              {Array.from({ length: totalPages }, (_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  whileHover={{ scale: 1.2 }}
                  style={{
                    width: i + 1 === currentPage ? 22 : 7,
                    height: 7,
                    borderRadius: 99,
                    background: i + 1 === currentPage ? "#6366f1" : "rgba(255,255,255,0.15)",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "width 0.25s ease, background 0.25s ease",
                  }}
                  title={`Page ${i + 1}`}
                />
              ))}
            </div>
          )}

          <motion.button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            whileHover={currentPage < totalPages ? { scale: 1.04 } : {}}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: isMobile ? "6px 10px" : "7px 14px",
              borderRadius: 10,
              background: currentPage === totalPages ? "transparent" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
              border: currentPage === totalPages ? "1px solid transparent" : "none",
              color: currentPage === totalPages ? "rgba(255,255,255,0.2)" : "#fff",
              fontWeight: 700,
              fontSize: 12,
              cursor: currentPage === totalPages ? "default" : "pointer",
              boxShadow: currentPage < totalPages ? "0 4px 14px rgba(99,102,241,0.35)" : "none",
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            {!isMobile && "Next"}
            <ChevronRight size={14} />
          </motion.button>
        </div>
      )}
    </div>
  );
}

// ─── BROCHURE SECTION ─────────────────────────────────────────────────────────

function BrochureViewer() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const width = useWindowWidth();
  const isMobile = width < 640;

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
        }
      `}</style>

      <section className="py-12 md:py-16 lg:py-20 relative overflow-hidden" style={{ background: "rgba(99,102,241,0.02)" }}>
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-10">
            <motion.span
              style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", padding: "4px 14px", borderRadius: 99, display: "inline-block", marginBottom: 14 }}
            >
              Company Brochure
            </motion.span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Explore Our <span className="gradient-text">Full Brochure</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto px-4">
              14 pages covering our story, products, services, and contact details.
            </p>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            {!open && (
              <motion.div
                key="closed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                style={{ display: "flex", justifyContent: "center", padding: "0 4px" }}
              >
                <motion.button
                  onClick={() => setOpen(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="glass-card"
                  style={{
                    width: "100%",
                    maxWidth: 520,
                    borderRadius: 22,
                    padding: isMobile ? "20px 18px" : "28px 28px",
                    border: "1px solid rgba(99,102,241,0.2)",
                    cursor: "pointer",
                    background: "transparent",
                    textAlign: "left",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4, #10b981)" }} />
                  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 15% 50%, rgba(99,102,241,0.09), transparent 70%)", pointerEvents: "none" }} />
                  <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 12 : 18 }}>
                    <motion.div
                      style={{ width: isMobile ? 48 : 60, height: isMobile ? 48 : 60, borderRadius: 18, background: "linear-gradient(135deg, rgba(99,102,241,0.18), rgba(139,92,246,0.18))", border: "1px solid rgba(99,102,241,0.28)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                      animate={{ rotate: [0, -4, 4, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <BookOpen size={isMobile ? 20 : 26} color="#818cf8" />
                    </motion.div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 800, fontSize: isMobile ? 14 : 16, marginBottom: 3 }}>
                        Maven AI Tech — Company Brochure 2025
                      </div>
                      <div style={{ fontSize: 11, opacity: 0.45, marginBottom: isMobile ? 8 : 10 }}>
                        PDF · 14 pages · View only · No download
                      </div>
                      <div style={{ display: "flex", gap: 3 }}>
                        {["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#6366f1"].map((c, i) => (
                          <div key={i} style={{ height: 4, flex: 1, borderRadius: 99, background: c, opacity: 0.45 }} />
                        ))}
                      </div>
                    </div>
                    <motion.div
                      style={{ width: isMobile ? 34 : 40, height: isMobile ? 34 : 40, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(99,102,241,0.45)", flexShrink: 0 }}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2.2, repeat: Infinity }}
                    >
                      <ChevronRight size={isMobile ? 14 : 18} color="#fff" />
                    </motion.div>
                  </div>
                </motion.button>
              </motion.div>
            )}

            {open && (
              <motion.div
                key="open"
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{ maxWidth: 820, margin: "0 auto", padding: "0 0px" }}
              >
                <div
                  className="glass-card"
                  style={{ borderRadius: isMobile ? 16 : 24, overflow: "hidden", border: "1px solid rgba(99,102,241,0.18)", boxShadow: "0 32px 80px rgba(0,0,0,0.4)" }}
                >
                  <div style={{ height: isMobile ? "70vh" : "78vh", minHeight: isMobile ? 420 : 540, display: "flex", flexDirection: "column" }}>
                    <PdfCanvasViewer onClose={close} />
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  style={{ textAlign: "center", marginTop: 12 }}
                >
                  <button
                    onClick={close}
                    style={{ fontSize: 11, opacity: 0.3, background: "none", border: "none", cursor: "pointer", fontWeight: 600, letterSpacing: "0.05em" }}
                  >
                    Skip and continue ↓
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

const About = () => {
  const width = useWindowWidth();
  const isMobile = width < 640;
  const isTablet = width < 1024;

  return (
    <div className="min-h-screen pt-20 sm:pt-24" style={{ position: "relative" }}>

      {/* HERO */}
      <section className="py-10 md:py-16 lg:py-20 relative overflow-hidden">
        <MorphingBlob color="#6366f1" size={isMobile ? 280 : 500} delay={0} style={{ top: "-20%", left: "-10%", zIndex: 0 }} />
        <MorphingBlob color="#8b5cf6" size={isMobile ? 200 : 350} delay={4} style={{ bottom: "-10%", right: "-8%", zIndex: 0 }} />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">

            {/* Text */}
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <motion.span
                style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", padding: "4px 14px", borderRadius: 99, display: "inline-block", marginBottom: 20 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Our Story
              </motion.span>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5 sm:mb-6">
                About <span className="gradient-text">Maven AI Tech</span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-7 sm:mb-8 max-w-lg">
                We are a team of engineers, designers, and strategists united by a single mission — to help businesses harness the transformative power of artificial intelligence and modern technology.
              </p>

              <div className="flex flex-wrap gap-4 sm:gap-6">
                {[
                  { icon: Users, val: "35+", label: "Team Members" },
                  { icon: Globe, val: "50+", label: "Global Clients" },
                  { icon: Award, val: "3+", label: "Years of Excellence" },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.12 }}
                  >
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(99,102,241,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <s.icon size={16} color="#6366f1" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 18 }} className="gradient-text">{s.val}</div>
                      <div style={{ fontSize: 11, opacity: 0.5, fontWeight: 500 }}>{s.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Images — hidden on mobile, shown on lg+ */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: "relative", height: isTablet ? 340 : 420 }}
              >
                <motion.div
                  style={{ position: "absolute", top: 0, left: "10%", right: 0, height: isTablet ? 220 : 280, borderRadius: 20, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.35)" }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img src="/images/team.jpg" alt="Team" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(99,102,241,0.25), transparent)" }} />
                </motion.div>

                <motion.div
                  style={{ position: "absolute", bottom: 0, left: 0, width: "48%", height: isTablet ? 150 : 180, borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }}
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <img src="/images/teamworking.jpg" alt="Work" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(139,92,246,0.2)" }} />
                </motion.div>
              </motion.div>
            )}

            {/* Mobile image — single stacked image */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                style={{ borderRadius: 16, overflow: "hidden", height: 200, position: "relative" }}
              >
                <img src="/images/team.jpg" alt="Team" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(99,102,241,0.25), transparent)" }} />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <SectionDivider color="#6366f1" />

      {/* MISSION & VISION */}
      <section className="py-10 md:py-16 lg:py-20 relative overflow-hidden" style={{ background: "rgba(99,102,241,0.02)" }}>
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-8 md:mb-14">
            <motion.span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", padding: "4px 14px", borderRadius: 99, display: "inline-block", marginBottom: 14 }}>
              Core Beliefs
            </motion.span>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              What We <span className="gradient-text">Stand For</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
            {[
              { icon: Target, title: "Our Mission", color: "#6366f1", image: "/images/ourmission.jpg", text: "To empower organizations of every size with accessible, scalable AI solutions that drive real business impact — reducing costs, accelerating growth, and unlocking innovation." },
              { icon: Eye, title: "Our Vision", color: "#8b5cf6", image: "/images/ourvision.jpg", text: "A world where every business — from startup to enterprise — can leverage cutting-edge AI and technology to make smarter decisions and create extraordinary experiences." },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <TiltCard disabled={isMobile}>
                  <motion.div
                    className="glass-card rounded-2xl overflow-hidden h-full"
                    whileHover={{ boxShadow: `0 24px 70px ${card.color}33` }}
                    transition={{ duration: 0.3 }}
                  >
                    <div style={{ position: "relative", height: isMobile ? 150 : 180, overflow: "hidden" }}>
                      <img src={card.image} alt={card.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${card.color}55, rgba(0,0,0,0.5))` }} />
                      <div style={{ position: "absolute", bottom: 16, left: 18, display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 38, height: 38, borderRadius: 12, background: `${card.color}cc`, backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 20px ${card.color}88` }}>
                          <card.icon size={18} color="#fff" />
                        </div>
                        <h3 style={{ fontWeight: 800, fontSize: isMobile ? 18 : 22, color: "#fff" }}>{card.title}</h3>
                      </div>
                    </div>
                    <div style={{ padding: isMobile ? "16px 18px 20px" : "22px 24px 26px" }}>
                      <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{card.text}</p>
                    </div>
                  </motion.div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider color="#8b5cf6" />

      {/* VALUES */}
      <section className="py-10 md:py-16 lg:py-20 relative overflow-hidden">
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/chip.jpg')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.08, filter: "grayscale(100%)" }} />
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <ScrollReveal className="text-center mb-8 md:mb-14">
            <motion.span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", padding: "4px 14px", borderRadius: 99, display: "inline-block", marginBottom: 14 }}>
              Our DNA
            </motion.span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              What Drives <span className="gradient-text">Us</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 max-w-4xl mx-auto">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, type: "spring", stiffness: 200 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <div className="glass-card rounded-2xl p-6 sm:p-8 text-center h-full" style={{ position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 0%, ${v.color}18, transparent 70%)`, pointerEvents: "none" }} />
                  <motion.div
                    style={{ width: 60, height: 60, borderRadius: 18, background: `${v.color}1a`, border: `1px solid ${v.color}44`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: `0 0 30px ${v.color}33` }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  >
                    <v.icon size={24} color={v.color} />
                  </motion.div>
                  <h3 className="font-display font-bold text-lg sm:text-xl mb-2 sm:mb-3">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                  <div style={{ marginTop: 16, height: 2, borderRadius: 99, background: `linear-gradient(90deg, transparent, ${v.color}, transparent)`, opacity: 0.4 }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider color="#06b6d4" />

      {/* TIMELINE */}
      <section className="py-10 md:py-16 lg:py-20" style={{ background: "rgba(99,102,241,0.02)" }}>
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-8 md:mb-14">
            <motion.span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", padding: "4px 14px", borderRadius: 99, display: "inline-block", marginBottom: 14 }}>
              Timeline
            </motion.span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto px-4">
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

      {/* FOUNDER */}
      <section className="py-10 md:py-16 lg:py-20 relative overflow-hidden">
        <MorphingBlob color="#6366f1" size={isMobile ? 220 : 400} delay={2} style={{ top: "10%", right: "-10%", zIndex: 0 }} />
        <MorphingBlob color="#8b5cf6" size={isMobile ? 180 : 300} delay={5} style={{ bottom: "5%", left: "-8%", zIndex: 0 }} />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <ScrollReveal className="text-center mb-8 md:mb-14">
            <motion.span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", padding: "4px 14px", borderRadius: 99, display: "inline-block", marginBottom: 14 }}>
              The Visionary
            </motion.span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              The Mind <span className="gradient-text">Behind Maven</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">The person who started it all.</p>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            <FounderSpotlight member={founder} />
          </div>
        </div>
      </section>

      <SectionDivider color="#f59e0b" />

      {/* BROCHURE */}
      <BrochureViewer />

      <SectionDivider color="#6366f1" />

      <CTASection />
    </div>
  );
};

export default About;