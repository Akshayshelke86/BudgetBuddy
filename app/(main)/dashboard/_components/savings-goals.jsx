"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Target } from "lucide-react";
import { createGoal } from "@/actions/goals";
import { toast } from "sonner";

export function SavingsGoals({ goals: initialGoals }) {
  const [goals, setGoals] = useState(initialGoals || []);
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  const handleAddGoal = async () => {
    if (!name || !targetAmount) return;

    const res = await createGoal({
      name,
      targetAmount: parseFloat(targetAmount),
      currentAmount: 0,
    });

    if (res.success) {
      setGoals([res.goal, ...goals]);
      setIsAdding(false);
      setName("");
      setTargetAmount("");
      toast.success("Goal added!");
    } else {
      toast.error(res.error || "Failed to add goal");
    }
  };

  return (
    <Card className="glassmorphism card-hover h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-normal flex items-center gap-2">
          <Target size={18} className="text-emerald-500" />
          Savings Goals
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={() => setIsAdding(!isAdding)}>
          <Plus size={16} />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {isAdding && (
          <div className="flex gap-2 items-center mb-4 p-3 bg-emerald-50 rounded-lg dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800">
            <Input placeholder="Goal Name (e.g., Car)" value={name} onChange={(e) => setName(e.target.value)} className="h-8" />
            <Input type="number" placeholder="₹ Target" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} className="h-8 w-24" />
            <Button size="sm" onClick={handleAddGoal} className="h-8 bg-emerald-600">Add</Button>
          </div>
        )}

        {goals.length === 0 && !isAdding ? (
          <p className="text-sm text-muted-foreground text-center py-4">No savings goals set.</p>
        ) : (
          <div className="space-y-6">
            {goals.map((goal) => {
              const progress = Math.min((parseFloat(goal.currentAmount) / parseFloat(goal.targetAmount)) * 100, 100);
              return (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{goal.name}</span>
                    <span className="text-muted-foreground">
                      ₹{parseFloat(goal.currentAmount).toFixed(0)} / ₹{parseFloat(goal.targetAmount).toFixed(0)}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" extraStyles="bg-emerald-500" />
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
