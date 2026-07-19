import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { GateData, ZoneData } from "@/services/crowdSimulator";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Maps a crowd status string to the corresponding Shadcn badge variant. */
export function getBadgeVariantForStatus(
  status: "Low" | "Medium" | "High" | "Critical" | undefined,
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "Critical":
    case "High":
      return "destructive";
    case "Medium":
      return "secondary";
    case "Low":
    default:
      return "outline";
  }
}

/**
 * Converts raw gate/zone arrays into a token-efficient, human-readable string
 * for injection into LLM prompts — avoiding raw JSON bloat.
 */
export function humaniseCrowdContext(gates: GateData[], zones: ZoneData[]): string {
  const gateSummary = gates
    .map((g) => `${g.name}: ${g.waitTime} min wait (${g.status})`)
    .join(", ");
  const zoneSummary = zones.map((z) => `${z.name}: ${z.density}% density (${z.status})`).join(", ");
  return `Gates — ${gateSummary}. Zones — ${zoneSummary}.`;
}

/** Simple debounce to rate-limit function calls. */
export function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  } as T;
}
