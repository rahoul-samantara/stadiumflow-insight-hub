import { useState, useEffect, useRef, useCallback } from "react";
import type { ChatSession } from "@/services/groq";
import { isAvailable, createChatSession } from "@/services/groq";
import { useCrowdData } from "@/hooks/useCrowdData";
import { useLanguage } from "@/contexts/LanguageContext";
import { generateAssistantReply, initialChat } from "@/data/mockData";
import type { ChatMessage } from "@/types";
import { humaniseCrowdContext } from "@/lib/utils";

/**
 * Custom React hook that manages the Groq-powered AI chat session.
 * Provides message history, sending capability, thinking state, and offline detection.
 * Falls back gracefully to mock responses when the Groq API is unavailable.
 */
export function useGroqChat() {
  const { language } = useLanguage();
  const crowdData = useCrowdData();

  const [messages, setMessages] = useState<ChatMessage[]>(initialChat);
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /** True when a live API call failed and we fell back to offline mock responses. */
  const [isOffline, setIsOffline] = useState(!isAvailable());

  const chatSessionRef = useRef<ChatSession | null>(null);

  // Manage ChatSession lifecycle: recreate on mount or language change
  useEffect(() => {
    if (isAvailable()) {
      const systemContext = `You are a helpful stadium assistant for StadiumFlow AI at the FIFA World Cup 2026.
Respond in ${language}. Keep your answers concise, friendly, and helpful.`;
      chatSessionRef.current = createChatSession(systemContext);
      setIsOffline(false);
    } else {
      setIsOffline(true);
    }
  }, [language]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isThinking) return; // Guard: reject if already thinking

      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content: text,
        time: "just now",
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsThinking(true);
      setError(null);

      try {
        if (isAvailable() && chatSessionRef.current) {
          // Use token-efficient human-readable context instead of raw JSON
          const crowdContext = humaniseCrowdContext(crowdData.gates, crowdData.zones);
          const promptWithContext = `Stadium Context: ${crowdContext}\n\nFan question: ${text}`;

          const result = await chatSessionRef.current.sendMessage(promptWithContext);
          setIsOffline(false); // Successful live call — mark as online

          const assistantMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: result.response.text(),
            time: "just now",
          };
          setMessages((prev) => [...prev, assistantMsg]);
        } else {
          // Fallback to mock behavior with simulated delay
          setIsOffline(true);
          await new Promise((resolve) => setTimeout(resolve, 800));
          const reply = generateAssistantReply(text);

          const assistantMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: reply,
            time: "just now",
          };
          setMessages((prev) => [...prev, assistantMsg]);
        }
      } catch (err) {
        console.error("Groq Chat Error:", err);
        // Graceful fallback — silently serve offline response
        setIsOffline(true);
        const reply = generateAssistantReply(text);
        const assistantMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: reply,
          time: "just now",
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } finally {
        setIsThinking(false);
      }
    },
    [crowdData, isThinking],
  );

  return {
    messages,
    sendMessage,
    isThinking,
    isOffline, // Expose for transparent UI indicator
    error,
  };
}
