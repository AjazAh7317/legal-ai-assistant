import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gavel, Home, Building2, User, FileText, ShieldCheck } from "lucide-react";

const legalCategories = [
  {
    icon: Gavel,
    title: "Constitutional Law",
    topics: ["Fundamental Rights", "Judicial Review", "Constitutional Amendments", "Center-State Relations"],
    color: "bg-primary/10 text-primary",
  },
  {
    icon: ShieldCheck,
    title: "Criminal Law",
    topics: ["Offenses & Penalties", "Criminal Procedures", "Bail Applications", "Evidence & Witnesses"],
    color: "bg-red-500/10 text-red-600",
  },
  {
    icon: FileText,
    title: "Civil Law",
    topics: ["Contracts & Agreements", "Property Disputes", "Consumer Rights", "Tort Law"],
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: User,
    title: "Family Law",
    topics: ["Marriage & Divorce", "Child Custody", "Inheritance", "Adoption Laws"],
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    icon: Building2,
    title: "Corporate Law",
    topics: ["Company Formation", "Mergers & Acquisitions", "Corporate Governance", "Securities Law"],
    color: "bg-green-500/10 text-green-600",
  },
  {
    icon: Home,
    title: "Property Law",
    topics: ["Real Estate Transactions", "Land Disputes", "Rent Control", "Property Rights"],
    color: "bg-orange-500/10 text-orange-600",
  },
];

export const LegalAreas = () => {
  return (
    <section id="legal-areas" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            <span className="text-primary">Legal Areas</span> We Cover
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive AI assistance across multiple areas of law
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {legalCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-gold transition-all duration-300 hover:scale-105 border-border hover:border-primary group cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${category.color} transition-all duration-300`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground">{category.title}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.topics.map((topic, topicIndex) => (
                      <Badge
                        key={topicIndex}
                        variant="secondary"
                        className="text-xs hover:bg-primary/20 transition-colors"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">And many more legal areas...</p>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            LegalGuru covers a wide range of legal topics including Tax Law, Labor Law, Intellectual Property,
            Cyber Law, Environmental Law, and more. Ask us about any legal matter!
          </p>
        </div>
      </div>
    </section>
  );
};
