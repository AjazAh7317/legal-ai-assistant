import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Download, RefreshCw, FileText, Scale, Search, FileCheck } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useLegalChat } from "@/hooks/useLegalChat";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ChatMode = "chat" | "document" | "research" | "contract";

export const ChatInterface = () => {
  const [mode, setMode] = useState<ChatMode>("chat");
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { messages, sendMessage, isLoading, resetChat } = useLegalChat({ mode });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput("");
  };

  const handleModeChange = (newMode: string) => {
    setMode(newMode as ChatMode);
    resetChat();
  };

  const getModeIcon = (m: ChatMode) => {
    switch (m) {
      case "document": return <FileText className="h-4 w-4" />;
      case "research": return <Search className="h-4 w-4" />;
      case "contract": return <FileCheck className="h-4 w-4" />;
      default: return <Scale className="h-4 w-4" />;
    }
  };

  const getModeDescription = () => {
    switch (mode) {
      case "document": return "Upload and analyze legal documents";
      case "research": return "Search cases, statutes, and legal precedents";
      case "contract": return "Review contracts and identify key terms";
      default: return "Ask any legal question and get instant AI-powered guidance";
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Start Your Free <span className="text-primary">Legal Consultation</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              {getModeDescription()}
            </p>
          </div>

          <Card className="overflow-hidden shadow-soft border-2 border-primary/20 animate-scale-in">
            {/* Mode Selector */}
            <Tabs value={mode} onValueChange={handleModeChange} className="w-full">
              <div className="bg-gradient-gold p-4">
                <TabsList className="grid w-full grid-cols-4 bg-legal-dark/10">
                  <TabsTrigger value="chat" className="flex items-center gap-2">
                    {getModeIcon("chat")}
                    <span className="hidden sm:inline">Q&A</span>
                  </TabsTrigger>
                  <TabsTrigger value="document" className="flex items-center gap-2">
                    {getModeIcon("document")}
                    <span className="hidden sm:inline">Docs</span>
                  </TabsTrigger>
                  <TabsTrigger value="research" className="flex items-center gap-2">
                    {getModeIcon("research")}
                    <span className="hidden sm:inline">Research</span>
                  </TabsTrigger>
                  <TabsTrigger value="contract" className="flex items-center gap-2">
                    {getModeIcon("contract")}
                    <span className="hidden sm:inline">Contract</span>
                  </TabsTrigger>
                </TabsList>
                <div className="flex items-center justify-between mt-4">
                  <h3 className="font-semibold text-legal-dark">Legal Assistant</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-legal-dark hover:bg-legal-dark/10"
                      onClick={resetChat}
                      title="Reset conversation"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-legal-dark hover:bg-legal-dark/10"
                      title="Download conversation"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <TabsContent value={mode} className="m-0">
                {/* Chat Messages */}
                <ScrollArea className="h-[400px] p-4 bg-legal-dark" ref={scrollRef}>
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex animate-slide-up ${
                          message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.role === "user"
                              ? "bg-gradient-gold text-legal-dark"
                              : "bg-card text-card-foreground"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start animate-slide-up">
                        <div className="bg-card text-card-foreground rounded-lg p-3">
                          <div className="flex gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-75" />
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Chat Input */}
                <div className="p-4 bg-background border-t border-border">
                  <div className="flex gap-2">
                    <Input
                      placeholder={`Type your ${mode === "chat" ? "legal question" : mode + " request"} here...`}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <Button 
                      variant="legal" 
                      onClick={handleSend}
                      disabled={isLoading || !input.trim()}
                    >
                      <Send className="h-4 w-4" />
                      Send
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Your conversations are confidential and secure. Powered by AI.
          </p>
        </div>
      </div>
    </section>
  );
};
