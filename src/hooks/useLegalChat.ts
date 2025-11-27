import { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface UseLegalChatProps {
  mode?: "chat" | "document" | "research" | "contract";
}

export const useLegalChat = ({ mode = "chat" }: UseLegalChatProps = {}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi, I'm LegalGuru. What legal advice do you need?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (input: string) => {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    let assistantContent = "";

    const updateAssistantMessage = (chunk: string) => {
      assistantContent += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.some(m => m === userMsg)) {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantContent } : m
          );
        }
        return [...prev, { role: "assistant", content: assistantContent }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMsg],
        mode,
        onDelta: updateAssistantMessage,
        onDone: () => setIsLoading(false),
        onError: (error) => {
          console.error("Chat error:", error);
          setIsLoading(false);
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: "I apologize, but I encountered an error. Please try again.",
            },
          ]);
        },
      });
    } catch (error) {
      console.error("Send message error:", error);
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Hi, I'm LegalGuru. What legal advice do you need?",
      },
    ]);
  };

  return { messages, sendMessage, isLoading, resetChat };
};

interface StreamChatParams {
  messages: Message[];
  mode: string;
  onDelta: (chunk: string) => void;
  onDone: () => void;
  onError: (error: Error) => void;
}

async function streamChat({
  messages,
  mode,
  onDelta,
  onDone,
  onError,
}: StreamChatParams) {
  const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/legal-chat`;

  try {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages, mode }),
    });

    if (!resp.ok) {
      if (resp.status === 429) {
        onError(new Error("Rate limit exceeded. Please try again in a moment."));
        return;
      }
      if (resp.status === 402) {
        onError(new Error("Service requires payment. Please contact support."));
        return;
      }
      throw new Error(`HTTP ${resp.status}`);
    }

    if (!resp.body) throw new Error("No response body");

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    if (textBuffer.trim()) {
      for (let raw of textBuffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (raw.startsWith(":") || raw.trim() === "") continue;
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {}
      }
    }

    onDone();
  } catch (error) {
    console.error("Stream error:", error);
    onError(error instanceof Error ? error : new Error("Unknown error"));
  }
}
