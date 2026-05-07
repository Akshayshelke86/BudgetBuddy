import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
      <h2 className="text-xl font-medium text-muted-foreground animate-pulse">Loading your financial data...</h2>
    </div>
  );
}
