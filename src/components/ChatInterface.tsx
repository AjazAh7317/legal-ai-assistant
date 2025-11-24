import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Download, RefreshCw } from "lucide-react";
import { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi, I'm LegalGuru. What legal advice do you need?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newUserMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages([...messages, newUserMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        role: "assistant",
        content: "Thank you for your question. This is a demo interface. To get actual AI-powered legal advice, connect this to an AI service.",
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Start Your Free <span className="text-primary">Legal Consultation</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Ask any legal question and get instant AI-powered guidance
            </p>
          </div>

          <Card className="overflow-hidden shadow-soft border-2 border-primary/20">
            {/* Chat Header */}
            <div className="bg-gradient-gold p-4 flex items-center justify-between">
              <h3 className="font-semibold text-legal-dark">Legal Assistant</h3>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-legal-dark hover:bg-legal-dark/10"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-legal-dark hover:bg-legal-dark/10"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Chat Messages */}
            <ScrollArea className="h-[400px] p-4 bg-legal-dark">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-gradient-gold text-legal-dark"
                          : "bg-card text-card-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Chat Input */}
            <div className="p-4 bg-background border-t border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your legal question here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1"
                />
                <Button variant="legal" onClick={handleSend}>
                  <Send className="h-4 w-4" />
                  Send
                </Button>
              </div>
            </div>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Your conversations are confidential and secure
          </p>
        </div>
      </div>
    </section>
  );
};
