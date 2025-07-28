import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";

const client: OpenAI = new OpenAI();

const flashcardSchema = z.object({
  question: z.string().describe("The question to be answered"),
  choices: z.object({
    A: z.string().describe("The first choice (A)"),
    B: z.string().describe("The second choice (B)"),
    C: z.string().describe("The third choice (C)"),
    D: z.string().describe("The fourth choice (D)"),
  }),
  answer: z.string().describe("The correct answer (A, B, C, or D)"),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ topic: string, difficulty: string }> }
) {
  const { topic, difficulty } = await params;

  const response = await client.responses.parse({
  model: "gpt-4.1",
  temperature: 0.7,
  prompt: {
      id: "pmpt_687077b7ec58819588cef12af80c3b2505d5e4c8b586cb82",
      version: "10",
      variables: {
          topic: topic,
          difficulty: difficulty
      }
  },
  text: {
    format: zodTextFormat(flashcardSchema, "flashcard"),
  }
});
  return NextResponse.json(response.output_parsed);
}