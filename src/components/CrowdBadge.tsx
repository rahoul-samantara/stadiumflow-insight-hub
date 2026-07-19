import { cn } from "@/lib/utils";
import type { CrowdLevel } from "@/types";

const styles: Record<CrowdLevel, string> = {
  low: "bg-success/10 text-success ring-success/20",
  medium: "bg-warning/15 text-foreground ring-warning/30",
  high: "bg-destructive/10 text-destructive ring-destructive/20",
};

const labels: Record<CrowdLevel, string> = { low: "Low", medium: "Medium", high: "High" };

export function CrowdBadge({ level, className }: { level: CrowdLevel; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        styles[level],
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          level === "low" && "bg-success",
          level === "medium" && "bg-warning",
          level === "high" && "bg-destructive",
        )}
      />
      {labels[level]} crowd
    </span>
  );
}
