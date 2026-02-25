import { useState, FormEvent } from "react";
import { Mail, MapPin, Phone, Send, ArrowRight, MessageSquare, Clock, CheckCircle } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { toast } from "sonner";

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

function FloatingInput({ label, children }) {
  return (
    <div style={{ position: "relative" }}>
      <label style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.55, display: "block", marginBottom: 8 }}>
        {label}
      </label>
      {children}
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [sending, setSending] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! We'll get back to you shortly.");
      setForm({ name: "", email: "", company: "", message: "" });
    }, 1200);
  };

  const inputStyle = (field: string) => ({
    width: "100%",
    background: focused === field ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.03)",
    border: `1px solid ${focused === field ? "rgba(99,102,241,0.6)" : "rgba(255,255,255,0.08)"}`,
    borderRadius: 12,
    padding: "13px 16px",
    fontSize: 14,
    color: "var(--foreground)",
    outline: "none",
    transition: "all 0.25s ease",
    boxShadow: focused === field ? "0 0 0 3px rgba(99,102,241,0.12)" : "none",
  });

  return (
    <div className="min-h-screen pt-24" style={{ position: "relative" }}>

      {/* ── HERO SECTION ──────────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <MorphingBlob color="#6366f1" size={500} delay={0} style={{ top: "-20%", left: "-10%", zIndex: 0 }} />
        <MorphingBlob color="#8b5cf6" size={350} delay={4} style={{ bottom: "-10%", right: "-8%", zIndex: 0 }} />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <motion.span
                style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", padding: "4px 14px", borderRadius: 99, display: "inline-block", marginBottom: 20 }}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              >Let's Talk</motion.span>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Get in <span className="gradient-text">Touch</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-md">
                Have a project in mind? Let's talk about how Maven AI Tech can help you achieve your goals.
              </p>

              {/* Trust badges */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { icon: Clock, text: "We respond within 24 hours" },
                  { icon: CheckCircle, text: "Free initial consultation call" },
                  { icon: MessageSquare, text: "No spam, only real conversations" },
                ].map((item, i) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(99,102,241,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <item.icon size={15} color="#6366f1" />
                    </div>
                    <span style={{ fontSize: 14, opacity: 0.65 }}>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "relative", height: 420 }}
              className="hidden lg:block"
            >
              <motion.div
                style={{ position: "absolute", inset: 0, borderRadius: 24, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.4)" }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src="https://i.pinimg.com/736x/ad/8b/97/ad8b9763024473e87f037fee275b19cd.jpg"
                  alt="Team meeting"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(99,102,241,0.35), rgba(0,0,0,0.4))" }} />
              </motion.div>

              {/* Floating "response time" card */}
              <motion.div
                className="glass-card rounded-2xl p-4"
                style={{ position: "absolute", bottom: 28, left: -24, boxShadow: "0 20px 60px rgba(0,0,0,0.3)", minWidth: 200 }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div style={{ fontSize: 11, opacity: 0.45, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Avg. Response</div>
                <div style={{ fontSize: 30, fontWeight: 900 }} className="gradient-text">&lt; 4 Hours</div>
                <div style={{ fontSize: 12, opacity: 0.5, marginTop: 2 }}>During business hours</div>
              </motion.div>

              {/* Floating online badge */}
              <motion.div
                className="glass-card rounded-xl px-4 py-3 flex items-center gap-3"
                style={{ position: "absolute", top: 24, right: -16, boxShadow: "0 16px 40px rgba(0,0,0,0.25)" }}
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >
                <motion.div
                  style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981" }}
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span style={{ fontSize: 13, fontWeight: 700 }}>Team Online Now</span>
              </motion.div>
            </motion.div>
          </div>

          {/* ── FORM + INFO ─────────────────────────────────────────────── */}
          <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">

            {/* Form (3 cols) */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="glass-card rounded-2xl p-8" style={{ position: "relative", overflow: "hidden" }}>
                {/* Subtle glow */}
                <div style={{ position: "absolute", top: -60, left: -60, width: 200, height: 200, background: "radial-gradient(circle, rgba(99,102,241,0.12), transparent)", pointerEvents: "none" }} />

                <h2 className="font-display text-2xl font-bold mb-2">Send Us a Message</h2>
                <p style={{ fontSize: 14, opacity: 0.5, marginBottom: 28 }}>We read every message personally.</p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FloatingInput label="Your Name">
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        style={inputStyle("name") as any}
                        placeholder="John Smith"
                      />
                    </FloatingInput>
                    <FloatingInput label="Company (Optional)">
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        onFocus={() => setFocused("company")}
                        onBlur={() => setFocused(null)}
                        style={inputStyle("company") as any}
                        placeholder="Acme Inc."
                      />
                    </FloatingInput>
                  </div>

                  <FloatingInput label="Email Address">
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      style={inputStyle("email") as any}
                      placeholder="you@company.com"
                    />
                  </FloatingInput>

                  <FloatingInput label="Message">
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      rows={5}
                      style={{ ...inputStyle("message") as any, resize: "none" }}
                      placeholder="Tell us about your project, goals, and timeline..."
                    />
                  </FloatingInput>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={sending}
                    className="glow-button"
                    style={{ width: "100%", padding: "14px", borderRadius: 12, fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: sending ? 0.65 : 1, cursor: sending ? "not-allowed" : "pointer", color: "var(--foreground)" }}
                  >
                    {sending ? (
                      <>
                        <motion.div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%" }} animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                        Sending...
                      </>
                    ) : (
                      <> Send Message <Send size={15} /> </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info (2 cols) */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              style={{ display: "flex", flexDirection: "column", gap: 20 }}
            >
              {/* Info card */}
              <div className="glass-card rounded-2xl p-7" style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -40, right: -40, width: 140, height: 140, background: "radial-gradient(circle, rgba(99,102,241,0.1), transparent)", pointerEvents: "none" }} />
                <h3 className="font-display text-xl font-bold mb-2">Contact Details</h3>
                <p style={{ fontSize: 13, opacity: 0.5, marginBottom: 22 }}>Reach us directly anytime.</p>

                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {[
                    { icon: Mail, label: "Email", value: "info@mavenaitech.com", color: "#6366f1" },
                    { icon: Phone, label: "Phone", value: "+91 9381472914", color: "#10b981" },
                    { icon: MapPin, label: "Office", value: "5th floor, Bait ar Rahma, Shaikpet, Hyderabad, Telangana - 500008", color: "#f59e0b" },
                  ].map((item) => (
                    <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                      <div style={{ width: 38, height: 38, borderRadius: 10, background: `${item.color}18`, border: `1px solid ${item.color}33`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 0 16px ${item.color}22` }}>
                        <item.icon size={16} color={item.color} />
                      </div>
                      <div>
                        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.4, marginBottom: 3 }}>{item.label}</p>
                        <p style={{ fontSize: 13, lineHeight: 1.5, opacity: 0.8 }}>{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Office photo card */}
              <motion.div
                style={{ borderRadius: 18, overflow: "hidden", position: "relative", height: 180 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80"
                  alt="Office"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: 16, left: 18 }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Our HQ</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Hyderabad, India</div>
                </div>
                <div style={{ position: "absolute", inset: 0, background: "rgba(99,102,241,0.12)" }} />
              </motion.div>

              {/* Social proof mini card */}
              <div className="glass-card rounded-2xl p-5" style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ fontSize: 12, opacity: 0.45, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Trusted by teams at</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Fortune 500", "Series B Startups", "Government Bodies", "NGOs"].map((tag) => (
                    <span key={tag} style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 99, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", opacity: 0.7 }}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MAP / FULL WIDTH IMAGE STRIP ──────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ position: "relative", height: 280, overflow: "hidden", marginTop: 40 }}
      >
        <img
          src="https://images.unsplash.com/photo-1524813686514-a57563d77965?w=1600&q=70"
          alt="Hyderabad city"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(99,102,241,0.12)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}>
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(99,102,241,0.9)", marginBottom: 10 }}>📍 Find Us</div>
              <h3 style={{ fontSize: 28, fontWeight: 900, color: "#fff", marginBottom: 6 }}>Hyderabad, Telangana</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)" }}>5th floor, Bait ar Rahma, Shaikpet — 500008</p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;