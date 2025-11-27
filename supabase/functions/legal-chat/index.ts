import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, mode = "chat" } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    // System prompts based on mode
    const systemPrompts = {
      chat: `You are an expert legal AI assistant. Provide accurate, helpful legal guidance while:
- Clearly explaining legal concepts in accessible language
- Citing relevant laws, statutes, and precedents when applicable
- Warning users when they should consult a licensed attorney
- Being thorough but concise in your responses
- Asking clarifying questions when needed`,

      document: `You are a legal document analyzer. When analyzing documents:
- Identify key legal terms, clauses, and obligations
- Flag potential risks, ambiguities, or concerning provisions
- Explain complex legal language in plain English
- Suggest areas that may need attorney review
- Provide a clear summary of the document's purpose and implications`,

      research: `You are a legal research assistant. When researching cases:
- Search for relevant case law, statutes, and legal precedents
- Summarize key findings and their applicability
- Explain the legal reasoning and outcomes
- Note jurisdictional differences if relevant
- Provide citations and sources when available`,

      contract: `You are a contract review specialist. When reviewing contracts:
- Identify all key terms, obligations, and deadlines
- Highlight favorable and unfavorable clauses
- Flag potential red flags or missing provisions
- Explain implications of each major clause
- Suggest negotiation points or amendments`
    };

    const systemPrompt = systemPrompts[mode as keyof typeof systemPrompts] || systemPrompts.chat;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Legal chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
