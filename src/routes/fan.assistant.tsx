import { createFileRoute } from "@tanstack/react-router";
import { Bot, Send, Sparkles, User, WifiOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { chatSuggestions } from "@/data/mockData";
import type { ChatMessage } from "@/types";
import { cn } from "@/lib/utils";
import { useGroqChat } from "@/hooks/useGroqChat";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/fan/assistant")({
  head: () => ({ meta: [{ title: "AI Match Assistant — StadiumFlow AI" }] }),
  component: AssistantPage,
});

function AssistantPage() {
  const { messages, sendMessage, isThinking, isOffline } = useGroqChat();
  const [input, setInput] = useState("");

  const handleSend = (text: string) => {
    if (!text.trim() || isThinking) return;
    sendMessage(text);
    setInput("");
  };

  return (
    <div className="mx-auto flex h-[calc(100dvh-8rem)] max-w-3xl flex-col gap-4">
      <header>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-primary">AI assistant</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">Ask about your match day</h2>
          </div>
          {/* Offline mode indicator — transparent fallback signal */}
          <AnimatePresence>
            {isOffline && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700"
                title="AI is using offline smart responses"
              >
                <WifiOff className="size-3" aria-hidden />
                Offline Mode
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Powered by live crowd and stadium data — answers grounded in your seat and venue.
        </p>
      </header>

      <Card className="flex flex-1 flex-col border-border/60 shadow-[var(--shadow-soft)] overflow-hidden">
        <CardContent 
          className="flex flex-1 flex-col gap-4 overflow-y-auto p-6"
          aria-live="polite"
        >
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
          </AnimatePresence>
          {isThinking && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground" role="status">
              <Sparkles className="size-4 animate-pulse text-primary" aria-hidden />
              Assistant is thinking…
            </div>
          )}
        </CardContent>

        <div className="border-t border-border/60 p-4 bg-background">
          <div className="mb-3 flex flex-wrap gap-2">
            {chatSuggestions.map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s)}
                disabled={isThinking}
                className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
              >
                {s}
              </button>
            ))}
          </div>
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about gates, seats, food, restrooms…"
              aria-label="Ask the assistant"
              disabled={isThinking}
            />
            <Button type="submit" size="icon" aria-label="Send message" disabled={isThinking || !input.trim()}>
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn("flex gap-3", isUser && "flex-row-reverse")}
    >
      <div
        className={cn(
          "grid size-8 shrink-0 place-items-center rounded-full",
          isUser ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground",
        )}
        aria-hidden
      >
        {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
      </div>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
          isUser
            ? "rounded-tr-sm bg-primary text-primary-foreground"
            : "rounded-tl-sm bg-muted text-foreground",
        )}
      >
        {message.content}
      </div>
    </motion.div>
  );
}
