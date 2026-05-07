"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { format } from "date-fns";

export function ExportCSV({ transactions, accountName }) {
  const handleExport = () => {
    // CSV Headers
    const headers = ["Date", "Description", "Category", "Type", "Amount (INR)", "Status"];
    
    // Map transactions to CSV rows
    const csvRows = transactions.map((t) => [
      format(new Date(t.date), "yyyy-MM-dd"),
      `"${t.description || ""}"`, // Wrap in quotes to handle commas
      t.category,
      t.type,
      t.amount,
      t.status,
    ]);

    // Combine headers and rows
    const csvContent = [headers, ...csvRows]
      .map((e) => e.join(","))
      .join("\n");

    // Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `${accountName}-Transactions-${format(new Date(), "yyyy-MM-dd")}.csv`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button variant="outline" onClick={handleExport} className="flex items-center gap-2">
      <Download size={16} />
      Export CSV
    </Button>
  );
}
