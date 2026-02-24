import {
  Brain,
  Globe,
  Cloud,
  BarChart3,
  Shield,
  Cpu,
  Smartphone,
  Database,
  Code,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import CTASection from "@/components/CTASection";

const services = [
  { icon: Brain, title: "AI & Machine Learning", desc: "Custom AI models, natural language processing, computer vision, and predictive analytics tailored to solve your unique challenges." },
  { icon: Globe, title: "Web Development", desc: "Full-stack web applications using React, Next.js, and modern frameworks — fast, responsive, and beautifully designed." },
  { icon: Cloud, title: "Cloud Solutions", desc: "Cloud architecture, migration, and managed services on AWS, Azure, and GCP for maximum reliability and scalability." },
  { icon: BarChart3, title: "Data Analytics", desc: "Business intelligence dashboards, ETL pipelines, and advanced data visualization to turn data into decisions." },
  { icon: Shield, title: "Cybersecurity", desc: "Penetration testing, compliance auditing, and real-time threat monitoring to keep your digital assets secure." },
  { icon: Cpu, title: "Digital Transformation", desc: "Strategic consulting and implementation to modernize legacy systems and streamline business operations." },
  { icon: Smartphone, title: "Mobile Development", desc: "Cross-platform mobile apps with React Native and Flutter for seamless iOS and Android experiences." },
  { icon: Database, title: "Database Engineering", desc: "Design, optimization, and management of SQL and NoSQL databases for high-performance applications." },
  { icon: Code, title: "API Development", desc: "RESTful and GraphQL APIs built for scalability, security, and seamless third-party integrations." },
];

const Services = () => {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              End-to-end technology solutions that power growth, streamline operations, and drive innovation across every layer of your business.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Service Grid */}
      <section className="py-12 pb-24">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.05}>
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

      <CTASection />
    </div>
  );
};

export default Services;
