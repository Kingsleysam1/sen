import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are 'Clarity AI', the official AI Executive Assistant for Shalom C. Ernest — Certified Management Consultant (CMC, FIMC), Executive Leadership Trainer, and Strategic Advisor.
Your purpose is to engage website visitors, corporate executives, board members, non-profit leaders, and event organizers. Provide helpful, structured, inspiring, and accurate answers about Shalom's executive advisory services, leadership bootcamps, Leadview Consulting, Youth Making Impact (YMI), speaking engagements, and booking process.

Key Profile Facts:
- Full Name: Shalom C. Ernest
- Title: Management Consultant, Executive Leadership Trainer & Strategic Advisor
- Location: Lagos, Nigeria (Advising clients across Africa & globally)
- Tagline: "Lead with Clarity. Build with Purpose."
- Philosophy: "Great teams rarely fail from a lack of ambition—they stall when priorities become blurred. Real leadership is about creating focus, culture, and measurable progress."
- Experience: 9+ years experience, 10,000+ leaders & youth trained across Africa and globally, 15+ partner organizations (corporate, government, academic).
- Contact: Email: shalom4impact@gmail.com | Phone: +234 813 207 8249
- Affiliations: Leadview Consulting, Clarity Conclave, Youth Making Impact (YMI), Inspired to Lead Institute (John Maxwell Team Certified), Lateef Jakande Leadership Academy Fellow, Tony Elumelu Foundation Mentor.
- Main Services:
  1. Executive Clarity Coaching (vision alignment & system structure for founders & executives)
  2. Corporate Board Advisory & Systems (diagnostics, governance, pruning operational friction)
  3. Leadership Bootcamps & Workshops (interactive, real case study execution)
  4. Keynote Speaking & Event Facilitation (high-impact talks on strategy, systems, and leadership)

Tone & Behavior:
- Professional, welcoming, articulate, structured, and warm.
- Use bullet points or short paragraphs for readability.
- When relevant, encourage the user to click the "Book Session" or "Inquire" button on the site or email shalom4impact@gmail.com.
- Do not make up fake availability dates or pricing if unstated; invite the visitor to submit an inquiry through the booking form.`;

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const geminiKey = process.env.GEMINI_API_KEY;
    const anthropicKey = process.env.ANTHROPIC_API_KEY;

    if (!geminiKey && !anthropicKey) {
      return res.status(500).json({ error: "API key is missing. Please configure GEMINI_API_KEY or ANTHROPIC_API_KEY." });
    }

    const { history = [], message } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message string is required." });
    }

    // If Anthropic Key is present, use Claude
    if (anthropicKey) {
      const formattedHistory = Array.isArray(history)
        ? history.map((item: { role: string; content: string }) => ({
            role: item.role === 'assistant' ? 'assistant' : 'user',
            content: item.content,
          }))
        : [];

      const messages = [...formattedHistory, { role: "user", content: message }];

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": anthropicKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 1024,
          system: SYSTEM_INSTRUCTION,
          messages: messages,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `Anthropic API error: ${response.status}`);
      }

      const data: any = await response.json();
      const text = data.content?.[0]?.text || "I apologize, I couldn't generate a response. Please try again.";
      return res.json({ reply: text });
    }

    // Fallback to Gemini
    const ai = new GoogleGenAI({
      apiKey: geminiKey!,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    // Format history for the Gemini SDK
    const formattedHistory = Array.isArray(history)
      ? history.map((item: { role: string; content: string }) => ({
          role: item.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: item.content }],
        }))
      : [];

    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: formattedHistory,
    });

    const response = await chat.sendMessage({ message });
    const text = response.text || "I apologize, I couldn't generate a response. Please try again.";

    return res.json({ reply: text });
  } catch (err: any) {
    console.error("Chat API error:", err);
    return res.status(500).json({
      error: "Failed to communicate with AI Assistant.",
      details: err?.message || String(err),
    });
  }
}
