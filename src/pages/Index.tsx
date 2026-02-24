import { motion, useMotionValue, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  Globe,
  Cloud,
  BarChart3,
  Shield,
  Zap,
  Cpu,
  Layers,
} from "lucide-react";
import { useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import CTASection from "@/components/CTASection";

const services = [
  { icon: Brain, title: "AI Solutions", desc: "Custom machine learning models and intelligent automation tailored to your business needs." },
  { icon: Globe, title: "Web Development", desc: "Modern, performant web applications built with cutting-edge frameworks and technologies." },
  { icon: Cloud, title: "Cloud Services", desc: "Scalable cloud infrastructure and migration strategies for seamless digital operations." },
  { icon: BarChart3, title: "Data Analytics", desc: "Transform raw data into actionable insights with advanced analytics and visualization." },
  { icon: Shield, title: "Cybersecurity", desc: "Protect your digital assets with comprehensive security solutions and monitoring." },
  { icon: Cpu, title: "Digital Transformation", desc: "End-to-end digital strategy to modernize operations and drive innovation." },
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

const Index = () => {
  // Mouse parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Background blobs */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] blob-gradient" />
        <div
          className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] blob-gradient"
          style={{ animationDelay: "3s" }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                AI-Powered Innovation
              </div>

              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                Building the{" "}
                <span className="gradient-text">Future</span> with
                Intelligent Technology
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
                We craft AI-driven solutions that transform businesses, automate processes, and unlock new possibilities in the digital landscape.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="glow-button inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm text-foreground"
                >
                  Get Started <ArrowRight size={16} />
                </Link>

                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 glass-card px-7 py-3.5 rounded-lg font-semibold text-sm text-foreground hover:bg-muted transition-colors"
                >
                  Our Services
                </Link>
              </div>
            </motion.div>

            {/* Right — enhanced animated visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="hidden lg:flex justify-center"
              style={{ rotateX, rotateY }}
            >
              <motion.div
                className="relative w-[420px] h-[420px]"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute inset-0 rounded-full blob-gradient" />

                <motion.div
                  className="absolute inset-8 glass-card rounded-full flex items-center justify-center"
                  animate={{
                    y: [0, -20, 0],
                    boxShadow: [
                      "0 0 40px rgba(99,102,241,0.3)",
                      "0 0 70px rgba(99,102,241,0.5)",
                      "0 0 40px rgba(99,102,241,0.3)",
                    ],
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  <Brain className="text-primary" size={80} strokeWidth={1} />
                </motion.div>

                {/* Orbiting dots */}
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full gradient-bg"
                    style={{
                      top: `${50 + 42 * Math.sin((i * Math.PI) / 2)}%`,
                      left: `${50 + 42 * Math.cos((i * Math.PI) / 2)}%`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.4,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Everything below remains EXACTLY the same */}
      {/* Services */}
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
              <ScrollReveal key={s.title} delay={i * 0.1}>
                <div className="glass-card rounded-xl p-6 h-full hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 group">
                  <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <s.icon size={22} className="text-foreground" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
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
              <ScrollReveal key={f.title} delay={i * 0.1}>
                <div className="text-center p-6">
                  <div className="w-14 h-14 rounded-xl glass-card flex items-center justify-center mx-auto mb-4">
                    <f.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="glass-card rounded-2xl p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((s) => (
                <AnimatedCounter key={s.label} {...s} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </div>
  );
};

export default Index;