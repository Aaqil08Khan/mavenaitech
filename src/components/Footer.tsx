import { Link } from "react-router-dom";
import { 
  Mail, 
  MapPin, 
  Phone, 
  Facebook, 
  Linkedin, 
  Instagram 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-display text-xl font-bold mb-4">
              <span className="gradient-text">Maven</span>{" "}
              <span className="text-foreground">AI Tech</span>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Empowering businesses with intelligent AI solutions and cutting-edge technology.
            </p>
            
            {/* Social Icons - Now using Lucide components for hover color effect */}
            <div className="flex flex-row gap-5 mt-2">
              <a 
                href="https://www.facebook.com/mavenaitech/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-white transition-colors duration-300"
              > 
                <Facebook size={22} /> 
              </a>

              <a 
                href="https://linkedin.com/company/maven-ai-tech" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-white transition-colors duration-300"
              > 
                <Linkedin size={22} />
              </a>

              <a 
                href="https://www.instagram.com/maven_aitech?igsh=MTFsZWtpMXNuZXYwMA==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-white transition-colors duration-300"
              > 
                <Instagram size={22} /> 
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {["Home", "About", "Services", "Contact"].map((item) => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Services</h4>
            <div className="flex flex-col gap-3">
              {["AI Solutions", "Web Development", "Cloud Services", "Data Analytics"].map((item) => (
                <span key={item} className="text-sm text-muted-foreground">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Contact</h4>
            <div className="flex flex-col gap-4">
              <a href="mailto:info@mavenaitech.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail size={18} /> info@mavenaitech.com
              </a>
              
              <a href="tel:+919381472914" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"> 
                <Phone size={18} /> +91 9381472914
              </a>

              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin size={20} className="mt-1 shrink-0" /> 
                <span className="leading-relaxed">
                  5th floor, Bait al Rahma, Shaikpet, Hyderabad, Telangana-500008
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MavenAITech. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <span key={item} className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
