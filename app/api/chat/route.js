import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { message } = await req.json();

    // Fetch user's transactions to provide context to the AI
    const transactions = await db.transaction.findMany({
      where: { user: { clerkUserId: userId } },
      orderBy: { date: "desc" },
      take: 50, // Only send last 50 for context limit
    });

    const context = `You are a professional Financial Advisor for "Budget Buddy". 
Here are the user's recent transactions (in JSON format):
${JSON.stringify(transactions.map(t => ({ amount: t.amount, category: t.category, date: t.date, type: t.type })))}

Answer the user's question concisely based ONLY on this data. If the data is empty, tell them to add transactions.

User Question: ${message}`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    const result = await model.generateContent(context);
    const responseText = result.response.text();

    return NextResponse.json({ reply: responseText });
  } catch (error) {
    console.error("AI Advisor Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
