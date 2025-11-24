import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { ChatInterface } from "@/components/ChatInterface";
import { LegalAreas } from "@/components/LegalAreas";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <ChatInterface />
      <LegalAreas />
      <About />
      <Footer />
    </div>
  );
};

export default Index;
