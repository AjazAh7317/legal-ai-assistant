import { Card } from "@/components/ui/card";
import {
  MessageSquare,
  Target,
  Globe,
  FileText,
  Search,
  PenTool,
  Heart,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Ask Your Legal Query",
    description: "Get instant answers to your legal questions",
  },
  {
    icon: Target,
    title: "Be Specific",
    description: "Provide detailed information for accurate advice",
  },
  {
    icon: Globe,
    title: "Ask in Any Language",
    description: "Multilingual support for your convenience",
  },
  {
    icon: FileText,
    title: "Upload PDFs",
    description: "Analyze legal documents instantly",
  },
  {
    icon: Search,
    title: "Find Case Laws",
    description: "Access relevant case law references",
  },
  {
    icon: PenTool,
    title: "Legal Draftings",
    description: "Generate legal documents and contracts",
  },
  {
    icon: Shield,
    title: "Confidential",
    description: "Your privacy is our top priority",
  },
  {
    icon: Heart,
    title: "It's Free!",
    description: "No hidden charges, completely free",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why Choose <span className="text-primary">LegalGuru</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the power of AI-driven legal assistance with features designed for everyone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-gold transition-all duration-300 border-border hover:border-primary group cursor-pointer"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-gradient-gold transition-all duration-300">
                    <Icon className="h-6 w-6 text-primary group-hover:text-legal-dark transition-colors" />
                  </div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
