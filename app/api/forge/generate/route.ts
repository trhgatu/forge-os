export const runtime = "nodejs";

import { GoogleGenAI, type Content, type GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

interface AgentPayload {
  systemPrompt: string;
}

interface IncomingMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

interface RequestPayload {
  messages: IncomingMessage[];
  agent: AgentPayload;
}

export async function POST(req: Request) {
  try {
    const { messages, agent }: RequestPayload = await req.json();

    const contents: Content[] = messages.map((m) => ({
      role: m.role,
      parts: m.parts.map((p) => ({ text: p.text })),
    }));

    const streamResult = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction: agent.systemPrompt,
        temperature: 0.7,
      },
    });

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamResult) {
            const response = chunk as GenerateContentResponse;

            const text = response.text ?? "";
            if (text.length > 0) {
              controller.enqueue(encoder.encode(text));
            }
          }
        } catch (err) {
          console.error("STREAM ERROR:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return new Response("Server crashed", { status: 500 });
  }
}
