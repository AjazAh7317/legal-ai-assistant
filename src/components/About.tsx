import { Card } from "@/components/ui/card";
import { CheckCircle2, Sparkles, Lock, Zap } from "lucide-react";

const benefits = [
  {
    icon: Sparkles,
    title: "AI-Powered Intelligence",
    description: "Leveraging cutting-edge artificial intelligence for accurate legal guidance",
  },
  {
    icon: Zap,
    title: "Instant Responses",
    description: "Get immediate answers without waiting for consultations",
  },
  {
    icon: Lock,
    title: "Completely Confidential",
    description: "Your privacy and data security are our top priorities",
  },
  {
    icon: CheckCircle2,
    title: "Always Free",
    description: "No hidden costs - legal assistance accessible to everyone",
  },
];

export const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About <span className="text-primary">LegalGuru</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Your trusted AI companion for legal matters
            </p>
          </div>

          <Card className="p-8 mb-8 shadow-soft border-2 border-primary/20">
            <p className="text-lg text-foreground leading-relaxed mb-6">
              <span className="font-bold text-primary">LegalGuru</span> is an AI-powered legal chatbot
              designed to help people understand the complexities of law without charging any fees. Using
              advanced artificial intelligence, LegalGuru delivers insightful online consultation on a range
              of legal topics, assisting you in better understanding your rights and duties.
            </p>
            <p className="text-lg text-foreground leading-relaxed">
              Our platform is a reliable resource that can offer opinions and guidance on various legal
              topics. Explore LegalGuru for free legal consultation, gain insights into laws, and empower
              yourself with knowledge to make informed decisions.
            </p>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card
                  key={index}
                  className="p-6 hover:shadow-gold transition-all duration-300 border-border hover:border-primary group"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-gradient-gold transition-all duration-300">
                        <Icon className="h-6 w-6 text-primary group-hover:text-legal-dark" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block p-6 rounded-lg bg-gradient-gold">
              <p className="text-legal-dark font-semibold text-lg mb-2">
                Important Disclaimer
              </p>
              <p className="text-legal-dark/80 text-sm max-w-2xl">
                LegalGuru provides general legal information and guidance. For specific legal matters,
                always consult with a qualified legal professional in your jurisdiction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
