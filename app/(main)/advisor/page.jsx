"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Send, User } from "lucide-react";
import { Loader2 } from "lucide-react";

export default function AdvisorPage() {
  const [messages, setMessages] = useState([
    { role: "ai", content: "Hi! I'm your Budget Buddy AI Advisor. How can I help you with your finances today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      setMessages((prev) => [...prev, { role: "ai", content: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold gradient-title">AI Financial Advisor</h1>
        <p className="text-muted-foreground mt-2">Chat with your smart assistant to get insights on your spending.</p>
      </div>

      <Card className="glassmorphism flex flex-col h-[600px]">
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "ai" && (
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Bot size={18} />
                </div>
              )}
              <div className={`p-3 rounded-xl max-w-[80%] ${msg.role === "user" ? "bg-emerald-600 text-white rounded-br-none" : "bg-muted rounded-bl-none"}`}>
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <User size={18} />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Loader2 className="animate-spin" size={18} />
              </div>
              <div className="p-3 rounded-xl bg-muted rounded-bl-none text-muted-foreground">
                Thinking...
              </div>
            </div>
          )}
        </CardContent>
        <div className="p-4 border-t border-white/20">
          <form onSubmit={sendMessage} className="flex gap-2">
            <Input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Ask about your expenses (e.g., 'How much did I spend on food?')"
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Send size={18} />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
