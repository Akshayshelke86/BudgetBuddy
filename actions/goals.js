"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getGoals() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const goals = await db.goal.findMany({
      where: { user: { clerkUserId: userId } },
      orderBy: { createdAt: "desc" },
    });

    // Convert Prisma Decimal to number/string to prevent React Server Component serialization error
    return goals.map((goal) => ({
      ...goal,
      targetAmount: parseFloat(goal.targetAmount),
      currentAmount: parseFloat(goal.currentAmount),
    }));
  } catch (error) {
    console.error("Error fetching goals:", error);
    return [];
  }
}

export async function createGoal(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const newGoal = await db.goal.create({
      data: {
        name: data.name,
        targetAmount: data.targetAmount,
        currentAmount: data.currentAmount || 0,
        userId: user.id,
      },
    });

    revalidatePath("/dashboard");
    return {
      success: true,
      goal: {
        ...newGoal,
        targetAmount: parseFloat(newGoal.targetAmount),
        currentAmount: parseFloat(newGoal.currentAmount),
      },
    };
  } catch (error) {
    console.error("Error creating goal:", error);
    return { success: false, error: error.message };
  }
}
