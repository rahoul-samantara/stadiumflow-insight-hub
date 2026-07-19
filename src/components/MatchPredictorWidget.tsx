import { useMatchPredictions } from "@/hooks/useMatchPredictions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export function MatchPredictorWidget() {
  const { predictions, isLoading, error } = useMatchPredictions();

  if (error) {
    return null; // Fail gracefully without breaking UI
  }

  return (
    <Card className="border-border/60 shadow-[var(--shadow-soft)] overflow-hidden">
      <CardHeader className="bg-muted/30 pb-4 border-b border-border/50">
        <CardTitle className="text-lg flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          AI Match Predictor
          <span className="ml-auto flex items-center gap-1 text-xs font-normal text-muted-foreground bg-secondary/50 px-2 py-1 rounded-full">
            <TrendingUp className="w-3 h-3" />
            Live GenAI Analysis
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-6 space-y-4">
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {predictions.map((match, i) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={match.matchId}
                className="p-4 hover:bg-muted/10 transition-colors"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{match.teamA}</span>
                  <span className="text-xs text-muted-foreground">{match.time}</span>
                  <span className="text-sm font-medium">{match.teamB}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-xs font-semibold w-10 text-right">
                    {match.winProbabilityA}%
                  </div>
                  <Progress
                    value={match.winProbabilityA}
                    className="h-2 flex-1 [&>div]:bg-primary"
                  />
                  <div className="text-xs font-semibold w-10">{match.winProbabilityB}%</div>
                </div>

                <div className="text-center mt-2">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-primary/80">
                    Advantage: {match.predictedWinner}
                  </span>
                </div>
              </motion.div>
            ))}

            {predictions.length === 0 && (
              <div className="p-6 text-center text-sm text-muted-foreground">
                No upcoming match predictions available.
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
