"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, X, Send, User, Loader2, Maximize2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AIChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", content: "Hi! I'm your AI Advisor. How can I help?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const pathname = usePathname();

  // Don't show popup on the dedicated advisor page
  if (pathname === "/advisor") return null;

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error("Failed to get response");
      
      const data = await response.json();
      setMessages((prev) => [...prev, { role: "ai", content: data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "ai", content: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[350px] h-[500px] bg-background/95 backdrop-blur-xl border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2 font-medium">
              <Bot size={20} />
              AI Advisor
            </div>
            <div className="flex items-center gap-2">
              <Link href="/advisor" onClick={() => setIsOpen(false)}>
                <Maximize2 size={16} className="text-white/80 hover:text-white cursor-pointer" />
              </Link>
              <X size={20} className="cursor-pointer text-white/80 hover:text-white" onClick={() => setIsOpen(false)} />
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "ai" && (
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex-shrink-0 flex items-center justify-center text-emerald-600">
                    <Bot size={14} />
                  </div>
                )}
                <div className={`p-3 rounded-2xl text-sm max-w-[85%] ${msg.role === "user" ? "bg-emerald-600 text-white rounded-br-sm" : "bg-muted rounded-bl-sm"}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Loader2 className="animate-spin" size={14} />
                </div>
                <div className="p-3 rounded-2xl bg-muted rounded-bl-sm text-muted-foreground text-sm">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 border-t bg-background">
            <form onSubmit={sendMessage} className="flex gap-2">
              <Input 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Ask about finances..."
                className="flex-1 rounded-full text-sm h-10"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !input.trim()} size="icon" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full h-10 w-10 shrink-0">
                <Send size={16} />
              </Button>
            </form>
          </div>
        </div>
      )}

      {!isOpen && (
        <Button 
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg flex items-center justify-center transition-transform hover:scale-110"
        >
          <Bot size={28} />
        </Button>
      )}
    </div>
  );
}
