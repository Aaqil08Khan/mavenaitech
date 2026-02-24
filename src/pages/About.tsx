import { Target, Eye, Lightbulb, Rocket } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import CTASection from "@/components/CTASection";

const timeline = [
  { year: "2018", title: "Founded", desc: "Maven AI Tech was born with a vision to democratize AI for businesses." },
  { year: "2020", title: "Growth Phase", desc: "Expanded our team and launched cloud-native solutions for enterprise clients." },
  { year: "2022", title: "AI-First Pivot", desc: "Fully embraced generative AI and machine learning across all service lines." },
  { year: "2024", title: "Global Reach", desc: "Serving 150+ clients worldwide with a team of 50+ engineers and strategists." },
];

const About = () => {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              About <span className="gradient-text">Maven AI Tech</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We are a team of engineers, designers, and strategists united by a single mission — to help businesses harness the transformative power of artificial intelligence and modern technology.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="glass-card rounded-xl p-8 h-full">
                <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center mb-4">
                  <Target size={22} className="text-foreground" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To empower organizations of every size with accessible, scalable AI solutions that drive real business impact — reducing costs, accelerating growth, and unlocking innovation.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="glass-card rounded-xl p-8 h-full">
                <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center mb-4">
                  <Eye size={22} className="text-foreground" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A world where every business — from startup to enterprise — can leverage cutting-edge AI and technology to make smarter decisions and create extraordinary experiences.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              What Drives <span className="gradient-text">Us</span>
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Lightbulb, title: "Innovation", desc: "We push boundaries and explore emerging technologies to stay ahead." },
              { icon: Target, title: "Impact", desc: "Every project is measured by the tangible value it creates for our clients." },
              { icon: Rocket, title: "Speed", desc: "Agile processes ensure fast delivery without compromising quality." },
            ].map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <div className="text-center p-6">
                  <div className="w-14 h-14 rounded-xl glass-card flex items-center justify-center mx-auto mb-4">
                    <v.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Journey</span>
            </h2>
          </ScrollReveal>

          <div className="max-w-2xl mx-auto space-y-0">
            {timeline.map((item, i) => (
              <ScrollReveal key={item.year} delay={i * 0.1}>
                <div className="flex gap-6 pb-10 relative">
                  {/* Line */}
                  {i < timeline.length - 1 && (
                    <div className="absolute left-[23px] top-12 bottom-0 w-px bg-border" />
                  )}
                  {/* Dot */}
                  <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-foreground">{item.year}</span>
                  </div>
                  <div className="pt-2">
                    <h4 className="font-display font-semibold text-lg mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
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

export default About;
