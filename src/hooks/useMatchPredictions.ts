import { useState, useEffect } from "react";
import { generateMatchPredictions, type MatchPrediction } from "@/services/groq";

export function useMatchPredictions() {
  const [predictions, setPredictions] = useState<MatchPrediction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchPredictions() {
      try {
        setIsLoading(true);
        const data = await generateMatchPredictions();
        if (mounted) {
          setPredictions(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          console.error("Error fetching match predictions:", err);
          setError("Failed to load match predictions.");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    fetchPredictions();

    return () => {
      mounted = false;
    };
  }, []);

  return { predictions, isLoading, error };
}
