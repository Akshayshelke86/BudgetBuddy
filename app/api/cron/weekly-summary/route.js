import { NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/lib/prisma";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req) {
  try {
    // In a real SaaS, you would loop through users.
    // For this demo, we'll get the first user to demonstrate the capability.
    const user = await db.user.findFirst({
      include: {
        transactions: {
          where: {
            date: { gte: new Date(new Date().setDate(new Date().getDate() - 7)) },
            type: "EXPENSE",
          },
        },
      },
    });

    if (!user) return new NextResponse("No users found", { status: 404 });

    const totalSpent = user.transactions.reduce((sum, t) => sum + Number(t.amount), 0);

    // Send email using Resend
    await resend.emails.send({
      from: "Budget Buddy <onboarding@resend.dev>", // Replace with your verified domain in production
      to: user.email,
      subject: "Your Weekly Financial Summary 📊",
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Hello ${user.name || "there"},</h2>
          <p>Here is your spending summary for the past 7 days:</p>
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 10px; border-left: 4px solid #10b981;">
            <h1 style="color: #047857; margin: 0;">₹${totalSpent.toFixed(2)}</h1>
            <p style="color: #065f46; margin: 5px 0 0 0;">Total Expenses</p>
          </div>
          <p>Keep tracking your expenses to reach your financial goals!</p>
          <p>Best,<br/>The Budget Buddy Team</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Weekly summary email sent!" });
  } catch (error) {
    console.error("Cron Error:", error);
    return new NextResponse("Failed to send summary", { status: 500 });
  }
}
