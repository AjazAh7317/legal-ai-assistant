import { Scale } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-legal-dark text-legal-cream py-12 border-t border-primary/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Scale className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">LegalGuru</span>
            </div>
            <p className="text-sm text-legal-cream/70">
              AI-powered legal assistant providing free legal guidance and consultation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="text-legal-cream/70 hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#features" className="text-legal-cream/70 hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#legal-areas" className="text-legal-cream/70 hover:text-primary transition-colors">
                  Legal Areas
                </a>
              </li>
              <li>
                <a href="#about" className="text-legal-cream/70 hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Areas */}
          <div>
            <h3 className="font-semibold mb-4 text-primary">Popular Areas</h3>
            <ul className="space-y-2 text-sm text-legal-cream/70">
              <li>Criminal Law</li>
              <li>Civil Law</li>
              <li>Family Law</li>
              <li>Corporate Law</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-primary">Get in Touch</h3>
            <p className="text-sm text-legal-cream/70 mb-2">
              Have questions? Start a conversation with our AI assistant.
            </p>
            <p className="text-sm text-legal-cream/70">
              Available 24/7 for your legal queries.
            </p>
          </div>
        </div>

        <div className="border-t border-primary/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-legal-cream/60">
            <p>© {currentYear} LegalGuru. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Disclaimer
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
