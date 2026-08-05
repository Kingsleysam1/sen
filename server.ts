import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

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

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini Chat API Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY environment variable is missing." });
      }

      const { history = [], message } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message string is required." });
      }

      const ai = new GoogleGenAI({
        apiKey,
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
      console.error("Gemini API error:", err);
      return res.status(500).json({
        error: "Failed to communicate with AI Assistant.",
        details: err?.message || String(err),
      });
    }
  });

  // Vite middleware for development vs static in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
