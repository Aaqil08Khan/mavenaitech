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
  { year: "Nov 2023", title: "Founded", desc: "Maven AI Tech was officially founded in November 2023 with a bold vision to democratize AI and make enterprise-grade technology accessible to growing businesses.", image: "/images/founded.jpg", color: "#6366f1" },
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
  name: "Mohammad Aslam Hyder Qureshi Bilal",
  role: "CEO & Co-Founder",
  avatar: "/images/CEO.png",
  bio: "Former Google engineer with 15 years in AI research.",
};

// Path to PDF in /public folder
const PDF_PATH = "/brochure/Maven_AI_Tech_Brochure.pdf";

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function SectionDivider({ color = "#6366f1" }) {
  return <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${color}40, ${color}20, transparent)`, width: "100%" }} />;
}

function MorphingBlob({ color = "#6366f1", size = 300, delay = 0, style = {} }) {
  const v = { a: { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%", scale: 1 }, b: { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%", scale: 1.05 }, c: { borderRadius: "50% 50% 40% 60% / 40% 70% 30% 50%", scale: 0.97 } };
  return <motion.div style={{ width: size, height: size, background: `radial-gradient(circle at 40% 40%, ${color}44, ${color}0a)`, filter: "blur(50px)", position: "absolute", ...style }} variants={v} initial="a" animate={["a","b","c","a"]} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay, times: [0,0.33,0.66,1] }} />;
}

function TiltCard({ children, style = {} }) {
  const ref = useRef(null);
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 20 });
  const sry = useSpring(ry, { stiffness: 150, damping: 20 });
  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 12);
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 12);
  };
  return <motion.div ref={ref} onMouseMove={handleMove} onMouseLeave={() => { rx.set(0); ry.set(0); }} style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", transformPerspective: 900, ...style }}>{children}</motion.div>;
}

function TimelineItem({ item, index, total }) {
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 0;
  return (
    <motion.div initial={{ opacity: 0, x: isEven ? -60 : 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }} className={`flex gap-8 items-center ${isEven ? "flex-row" : "flex-row-reverse"} mb-12`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="flex-1">
        <TiltCard>
          <motion.div className="glass-card rounded-2xl overflow-hidden" animate={{ boxShadow: hovered ? `0 20px 60px ${item.color}33` : "none" }} transition={{ duration: 0.3 }}>
            <div style={{ position: "relative", height: 160, overflow: "hidden" }}>
              <motion.img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} animate={{ scale: hovered ? 1.06 : 1 }} transition={{ duration: 0.5 }} />
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
        <motion.div style={{ width: 64, height: 64, borderRadius: "50%", background: `linear-gradient(135deg, ${item.color}, ${item.color}88)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: hovered ? `0 0 40px ${item.color}88` : `0 0 20px ${item.color}44`, transition: "box-shadow 0.3s", zIndex: 2 }} animate={{ scale: hovered ? 1.15 : 1 }} transition={{ duration: 0.3 }}>
          <span style={{ fontWeight: 900, fontSize: 12, color: "#fff", letterSpacing: "-0.02em" }}>{item.year}</span>
        </motion.div>
        {index < total - 1 && <div style={{ width: 2, flex: 1, minHeight: 48, background: `linear-gradient(to bottom, ${item.color}66, transparent)`, marginTop: 8 }} />}
      </div>
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}

function FounderSpotlight({ member }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} style={{ display: "flex", justifyContent: "center" }}>
      <TiltCard>
        <motion.div className="glass-card rounded-3xl overflow-hidden" style={{ width: 300, textAlign: "center" }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} animate={{ boxShadow: hovered ? "0 24px 70px rgba(99,102,241,0.3)" : "0 8px 30px rgba(0,0,0,0.2)" }} transition={{ duration: 0.3 }}>
          <div style={{ height: 3, background: "linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)" }} />
          <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
            <motion.img src={member.avatar} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} animate={{ scale: hovered ? 1.06 : 1 }} transition={{ duration: 0.5, ease: "easeOut" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.75) 100%)" }} />
            <motion.div style={{ position: "absolute", inset: 0, background: "rgba(99,102,241,0.18)" }} animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }} />
          </div>
          <div style={{ padding: "22px 24px 26px" }}>
            <h3 style={{ fontWeight: 800, fontSize: 17, lineHeight: 1.3, marginBottom: 6 }} className="font-display">{member.name}</h3>
            <div style={{ fontSize: 12, color: "#6366f1", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>{member.role}</div>
            <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)", marginBottom: 12 }} />
            <p style={{ fontSize: 13, opacity: 0.55, lineHeight: 1.65 }}>{member.bio}</p>
          </div>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
}

// ─── PDF CANVAS VIEWER ────────────────────────────────────────────────────────
// Renders via PDF.js onto a <canvas> — no browser toolbar, no download, no print.
// Right-click is disabled on the canvas to prevent "Save image as".
// CSS also blocks text selection and print media.

function PdfCanvasViewer({ onClose }) {
  const canvasRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.2);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const renderTaskRef = useRef(null);

  // Load PDF.js from CDN once
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

  // Render the current page onto canvas
  const renderPage = useCallback(async (pageNum, sc) => {
    if (!pdfDoc || !canvasRef.current) return;

    // Cancel any in-progress render
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
      if (err?.name !== "RenderingCancelledException") {
        console.error("Render error:", err);
      }
    }
  }, [pdfDoc]);

  useEffect(() => {
    renderPage(currentPage, scale);
  }, [pdfDoc, currentPage, scale, renderPage]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") setCurrentPage(p => Math.min(p + 1, totalPages));
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   setCurrentPage(p => Math.max(p - 1, 1));
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [totalPages, onClose]);

  const zoomIn  = () => setScale(s => Math.min(s + 0.2, 2.5));
  const zoomOut = () => setScale(s => Math.max(s - 0.2, 0.6));

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>

      {/* ── Top chrome ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.22)", gap: 12, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <BookOpen size={15} color="#6366f1" />
          <span style={{ fontSize: 13, fontWeight: 700 }}>Maven AI Tech Brochure 2025</span>
          {totalPages > 0 && <span style={{ fontSize: 11, opacity: 0.35 }}>· {totalPages} pages</span>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {/* Zoom controls */}
          <button onClick={zoomOut} title="Zoom out" style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <ZoomOut size={13} />
          </button>
          <span style={{ fontSize: 11, opacity: 0.45, minWidth: 36, textAlign: "center" }}>{Math.round(scale * 100)}%</span>
          <button onClick={zoomIn} title="Zoom in" style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <ZoomIn size={13} />
          </button>

          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.1)", margin: "0 4px" }} />

          {/* Close */}
          <motion.button onClick={onClose} whileHover={{ scale: 1.12, background: "rgba(255,255,255,0.1)" }} whileTap={{ scale: 0.9 }} style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <X size={13} />
          </motion.button>
        </div>
      </div>

      {/* ── Canvas area ── */}
      <div
        style={{ flex: 1, overflowY: "auto", overflowX: "auto", background: "#0f0f1a", display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "20px 16px" }}
        /* Block right-click context menu on the entire viewer */
        onContextMenu={(e) => e.preventDefault()}
      >
        {loading && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 400, gap: 16, opacity: 0.5 }}>
            <motion.div style={{ width: 36, height: 36, border: "3px solid rgba(99,102,241,0.3)", borderTopColor: "#6366f1", borderRadius: "50%" }} animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }} />
            <span style={{ fontSize: 13 }}>Loading brochure…</span>
          </div>
        )}
        {error && (
          <div style={{ textAlign: "center", padding: 40, opacity: 0.5 }}>
            <p style={{ fontSize: 14, marginBottom: 8 }}>⚠️ {error}</p>
            <p style={{ fontSize: 12 }}>Place your PDF at: <code>public/brochure/Maven_AI_Tech_Brochure.pdf</code></p>
          </div>
        )}
        {!loading && !error && (
          <canvas
            ref={canvasRef}
            style={{
              maxWidth: "100%",
              borderRadius: 8,
              boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
              /* Prevent drag-to-save */
              userSelect: "none",
              WebkitUserSelect: "none",
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {/* ── Bottom nav ── */}
      {totalPages > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.22)", flexShrink: 0 }}>
          <motion.button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} whileHover={currentPage > 1 ? { scale: 1.04 } : {}} style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 10, background: currentPage === 1 ? "transparent" : "rgba(99,102,241,0.1)", border: `1px solid ${currentPage === 1 ? "transparent" : "rgba(99,102,241,0.22)"}`, color: currentPage === 1 ? "rgba(255,255,255,0.2)" : "#818cf8", fontWeight: 600, fontSize: 12, cursor: currentPage === 1 ? "default" : "pointer", flexShrink: 0 }}>
            <ChevronLeft size={14} /> Prev
          </motion.button>

          {/* Page dots — show up to 14 dots */}
          <div style={{ display: "flex", gap: 4, flex: 1, justifyContent: "center", flexWrap: "wrap" }}>
            {Array.from({ length: totalPages }, (_, i) => (
              <motion.button key={i} onClick={() => setCurrentPage(i + 1)} whileHover={{ scale: 1.2 }} style={{ width: i + 1 === currentPage ? 22 : 7, height: 7, borderRadius: 99, background: i + 1 === currentPage ? "#6366f1" : "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", padding: 0, transition: "width 0.25s ease, background 0.25s ease" }} title={`Page ${i + 1}`} />
            ))}
          </div>

          <motion.button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} whileHover={currentPage < totalPages ? { scale: 1.04 } : {}} style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 10, background: currentPage === totalPages ? "transparent" : "linear-gradient(135deg, #6366f1, #8b5cf6)", border: currentPage === totalPages ? "1px solid transparent" : "none", color: currentPage === totalPages ? "rgba(255,255,255,0.2)" : "#fff", fontWeight: 700, fontSize: 12, cursor: currentPage === totalPages ? "default" : "pointer", boxShadow: currentPage < totalPages ? "0 4px 14px rgba(99,102,241,0.35)" : "none", flexShrink: 0 }}>
            Next <ChevronRight size={14} />
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

  return (
    <>
      {/*
        Global style injected once to block printing of the entire page.
        The @media print rule hides everything, so even Ctrl+P won't show the PDF.
      */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
        }
      `}</style>

      <section className="py-12 md:py-16 lg:py-20 relative overflow-hidden" style={{ background: "rgba(99,102,241,0.02)" }}>
        <div className="container mx-auto px-6">

          <ScrollReveal className="text-center mb-10">
            <motion.span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", padding: "4px 14px", borderRadius: 99, display: "inline-block", marginBottom: 14 }}>
              Company Brochure
            </motion.span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Explore Our <span className="gradient-text">Full Brochure</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              14 pages covering our story, products, services, and contact details.
            </p>
          </ScrollReveal>

          <AnimatePresence mode="wait">

            {/* Closed teaser */}
            {!open && (
              <motion.div key="closed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.4 }} style={{ display: "flex", justifyContent: "center" }}>
                <motion.button
                  onClick={() => setOpen(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="glass-card"
                  style={{ width: "100%", maxWidth: 520, borderRadius: 22, padding: "28px 28px", border: "1px solid rgba(99,102,241,0.2)", cursor: "pointer", background: "transparent", textAlign: "left", position: "relative", overflow: "hidden" }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4, #10b981)" }} />
                  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 15% 50%, rgba(99,102,241,0.09), transparent 70%)", pointerEvents: "none" }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                    <motion.div style={{ width: 60, height: 60, borderRadius: 18, background: "linear-gradient(135deg, rgba(99,102,241,0.18), rgba(139,92,246,0.18))", border: "1px solid rgba(99,102,241,0.28)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }} animate={{ rotate: [0, -4, 4, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                      <BookOpen size={26} color="#818cf8" />
                    </motion.div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 3 }}>Maven AI Tech — Company Brochure 2025</div>
                      <div style={{ fontSize: 12, opacity: 0.45, marginBottom: 10 }}>PDF · 14 pages · View only · No download</div>
                      <div style={{ display: "flex", gap: 3 }}>
                        {["#6366f1","#8b5cf6","#06b6d4","#10b981","#f59e0b","#ef4444","#6366f1"].map((c, i) => (
                          <div key={i} style={{ height: 4, flex: 1, borderRadius: 99, background: c, opacity: 0.45 }} />
                        ))}
                      </div>
                    </div>
                    <motion.div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(99,102,241,0.45)", flexShrink: 0 }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2.2, repeat: Infinity }}>
                      <ChevronRight size={18} color="#fff" />
                    </motion.div>
                  </div>
                </motion.button>
              </motion.div>
            )}

            {/* Open viewer */}
            {open && (
              <motion.div key="open" initial={{ opacity: 0, y: 30, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} style={{ maxWidth: 820, margin: "0 auto" }}>
                <div
                  className="glass-card"
                  style={{ borderRadius: 24, overflow: "hidden", border: "1px solid rgba(99,102,241,0.18)", boxShadow: "0 32px 80px rgba(0,0,0,0.4)" }}
                >
                  {/* Fixed height viewer */}
                  <div style={{ height: "78vh", minHeight: 540, display: "flex", flexDirection: "column" }}>
                    <PdfCanvasViewer onClose={close} />
                  </div>
                </div>

                {/* Skip link */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} style={{ textAlign: "center", marginTop: 12 }}>
                  <button onClick={close} style={{ fontSize: 11, opacity: 0.3, background: "none", border: "none", cursor: "pointer", fontWeight: 600, letterSpacing: "0.05em" }}>
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
  return (
    <div className="min-h-screen pt-24" style={{ position: "relative" }}>

      {/* HERO */}
      <section className="py-12 md:py-16 lg:py-20 relative overflow-hidden">
        <MorphingBlob color="#6366f1" size={500} delay={0} style={{ top: "-20%", left: "-10%", zIndex: 0 }} />
        <MorphingBlob color="#8b5cf6" size={350} delay={4} style={{ bottom: "-10%", right: "-8%", zIndex: 0 }} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <motion.span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", padding: "4px 14px", borderRadius: 99, display: "inline-block", marginBottom: 20 }} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                Our Story
              </motion.span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">About <span className="gradient-text">Maven AI Tech</span></h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">We are a team of engineers, designers, and strategists united by a single mission — to help businesses harness the transformative power of artificial intelligence and modern technology.</p>
              <div className="flex flex-wrap gap-6">
                {[{ icon: Users, val: "35+", label: "Team Members" }, { icon: Globe, val: "50+", label: "Global Clients" }, { icon: Award, val: "3+", label: "Years of Excellence" }].map((s, i) => (
                  <motion.div key={s.label} className="flex items-center gap-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(99,102,241,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}><s.icon size={18} color="#6366f1" /></div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 20 }} className="gradient-text">{s.val}</div>
                      <div style={{ fontSize: 12, opacity: 0.5, fontWeight: 500 }}>{s.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} style={{ position: "relative", height: 420 }}>
              <motion.div style={{ position: "absolute", top: 0, left: "10%", right: 0, height: 280, borderRadius: 20, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.35)" }} animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                <img src="/images/team.jpg" alt="Team" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(99,102,241,0.25), transparent)" }} />
              </motion.div>
              <motion.div style={{ position: "absolute", bottom: 0, left: 0, width: "48%", height: 180, borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }} animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
                <img src="/images/teamworking.jpg" alt="Work" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(139,92,246,0.2)" }} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <SectionDivider color="#6366f1" />

      {/* MISSION & VISION */}
      <section className="py-12 md:py-16 lg:py-20 relative overflow-hidden" style={{ background: "rgba(99,102,241,0.02)" }}>
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center mb-10 md:mb-14">
            <motion.span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", padding: "4px 14px", borderRadius: 99, display: "inline-block", marginBottom: 14 }}>Core Beliefs</motion.span>
            <h2 className="font-display text-3xl md:text-4xl font-bold">What We <span className="gradient-text">Stand For</span></h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Target, title: "Our Mission", color: "#6366f1", image: "/images/ourmission.jpg", text: "To empower organizations of every size with accessible, scalable AI solutions that drive real business impact — reducing costs, accelerating growth, and unlocking innovation." },
              { icon: Eye,    title: "Our Vision",  color: "#8b5cf6", image: "/images/ourvision.jpg",  text: "A world where every business — from startup to enterprise — can leverage cutting-edge AI and technology to make smarter decisions and create extraordinary experiences." },
            ].map((card, i) => (
              <motion.div key={card.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}>
                <TiltCard>
                  <motion.div className="glass-card rounded-2xl overflow-hidden h-full" whileHover={{ boxShadow: `0 24px 70px ${card.color}33` }} transition={{ duration: 0.3 }}>
                    <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
                      <img src={card.image} alt={card.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${card.color}55, rgba(0,0,0,0.5))` }} />
                      <div style={{ position: "absolute", bottom: 18, left: 22, display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 42, height: 42, borderRadius: 12, background: `${card.color}cc`, backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 20px ${card.color}88` }}><card.icon size={20} color="#fff" /></div>
                        <h3 style={{ fontWeight: 800, fontSize: 22, color: "#fff" }}>{card.title}</h3>
                      </div>
                    </div>
                    <div style={{ padding: "22px 24px 26px" }}><p className="text-muted-foreground leading-relaxed">{card.text}</p></div>
                  </motion.div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider color="#8b5cf6" />

      {/* VALUES */}
      <section className="py-12 md:py-16 lg:py-20 relative overflow-hidden">
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/chip.jpg')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.08, filter: "grayscale(100%)" }} />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal className="text-center mb-10 md:mb-14">
            <motion.span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", padding: "4px 14px", borderRadius: 99, display: "inline-block", marginBottom: 14 }}>Our DNA</motion.span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">What Drives <span className="gradient-text">Us</span></h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.12, type: "spring", stiffness: 200 }} whileHover={{ y: -8, transition: { duration: 0.2 } }}>
                <div className="glass-card rounded-2xl p-8 text-center h-full" style={{ position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 0%, ${v.color}18, transparent 70%)`, pointerEvents: "none" }} />
                  <motion.div style={{ width: 64, height: 64, borderRadius: 18, background: `${v.color}1a`, border: `1px solid ${v.color}44`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", boxShadow: `0 0 30px ${v.color}33` }} animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}>
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

      {/* TIMELINE */}
      <section className="py-12 md:py-16 lg:py-20" style={{ background: "rgba(99,102,241,0.02)" }}>
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center mb-10 md:mb-14">
            <motion.span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", padding: "4px 14px", borderRadius: 99, display: "inline-block", marginBottom: 14 }}>Timeline</motion.span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Our <span className="gradient-text">Journey</span></h2>
            <p className="text-muted-foreground max-w-lg mx-auto">From a bold idea to a global technology partner — here's how we got here.</p>
          </ScrollReveal>
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, i) => <TimelineItem key={item.year} item={item} index={i} total={timeline.length} />)}
          </div>
        </div>
      </section>

      <SectionDivider color="#10b981" />

      {/* FOUNDER */}
      <section className="py-12 md:py-16 lg:py-20 relative overflow-hidden">
        <MorphingBlob color="#6366f1" size={400} delay={2} style={{ top: "10%", right: "-10%", zIndex: 0 }} />
        <MorphingBlob color="#8b5cf6" size={300} delay={5} style={{ bottom: "5%", left: "-8%", zIndex: 0 }} />
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal className="text-center mb-10 md:mb-14">
            <motion.span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", padding: "4px 14px", borderRadius: 99, display: "inline-block", marginBottom: 14 }}>The Visionary</motion.span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">The Mind <span className="gradient-text">Behind Maven</span></h2>
            <p className="text-muted-foreground max-w-xl mx-auto">The person who started it all.</p>
          </ScrollReveal>
          <div className="max-w-5xl mx-auto"><FounderSpotlight member={founder} /></div>
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