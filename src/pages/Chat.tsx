import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { ChatInterface } from "@/components/ChatInterface";
import { ConversationHistory } from "@/components/ConversationHistory";
import { Loader2, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Chat = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [currentMode, setCurrentMode] = useState<"chat" | "document" | "research" | "contract">("chat");
  const [showSidebar, setShowSidebar] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          navigate("/auth");
        } else {
          setUser(session.user);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSelectConversation = (conversationId: string, mode: string) => {
    setCurrentConversationId(conversationId);
    setCurrentMode(mode as typeof currentMode);
  };

  const handleNewConversation = () => {
    setCurrentConversationId(null);
    setCurrentMode("chat");
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="h-16 border-b border-border flex items-center justify-between px-4 bg-card">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSidebar(!showSidebar)}
            className="md:hidden"
          >
            {showSidebar ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <h1 className="text-xl font-bold text-foreground">LegalGuru AI Assistant</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground hidden sm:inline">{user.email}</span>
          <Button variant="outline" size="sm" onClick={() => navigate("/")}>
            Home
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Conversation History */}
        <div 
          className={`${
            showSidebar ? "w-80" : "w-0"
          } transition-all duration-300 overflow-hidden md:w-80`}
        >
          <ConversationHistory
            onSelectConversation={handleSelectConversation}
            onNewConversation={handleNewConversation}
            currentConversationId={currentConversationId}
          />
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-hidden">
          <ChatInterface 
            conversationId={currentConversationId}
            initialMode={currentMode}
            onConversationCreated={setCurrentConversationId}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
