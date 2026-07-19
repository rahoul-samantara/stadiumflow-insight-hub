import { useState, useEffect, useCallback } from "react";
import { generateOperationalSummary, type CrowdDataPoint } from "@/services/groq";
import { useCrowdData } from "@/hooks/useCrowdData";
import { aiOperationalSummary as mockAiSummary } from "@/data/mockData";

/**
 * Defines the operational AI result returned by the useOperationalAI hook.
 */
export interface OperationalAIResult {
  summary: string[];
  recommendations: string[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

/**
 * Custom React hook that fetches and manages the AI-generated operational summary for venue staff.
 * It periodically polls the Groq LLM API with live crowd density data to generate insights.
 */
export function useOperationalAI(): OperationalAIResult {
  const { zones } = useCrowdData();
  const [summary, setSummary] = useState<string[]>(mockAiSummary);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAI = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const crowdData: CrowdDataPoint[] = zones.map((z) => ({
        id: z.id,
        zone: z.name,
        density: z.density,
      }));

      const rawSummary = await generateOperationalSummary(crowdData);

      if (
        rawSummary.startsWith("Groq service is unavailable") ||
        rawSummary.startsWith("Error generating")
      ) {
        setSummary(mockAiSummary);
        setRecommendations([]);
      } else {
        const lines = rawSummary
          .split("\n")
          .map((l) => l.trim().replace(/^[-*•]\s*/, ""))
          .filter((l) => l.length > 0);
        setSummary(lines);
        setRecommendations([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setSummary(mockAiSummary);
    } finally {
      setIsLoading(false);
    }
  }, [zones]);

  useEffect(() => {
    fetchAI();
    const intervalId = setInterval(fetchAI, 30000);
    return () => clearInterval(intervalId);
  }, [fetchAI]);

  return { summary, recommendations, isLoading, error, refresh: fetchAI };
}
