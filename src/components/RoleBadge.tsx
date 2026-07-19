import { cn } from "@/lib/utils";
import type { Role } from "@/types";

export function RoleBadge({ role, className }: { role: Role; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
        role === "fan"
          ? "bg-primary/10 text-primary ring-primary/20"
          : "bg-accent text-accent-foreground ring-border",
        className,
      )}
    >
      {role === "fan" ? "Fan" : "Organizer"}
    </span>
  );
}
