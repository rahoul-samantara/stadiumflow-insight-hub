import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface MetricCardProps {
  label: string;
  value: ReactNode;
  hint?: string;
  icon?: ReactNode;
  trend?: string;
  className?: string;
}

export function MetricCard({ label, value, hint, icon, trend, className }: MetricCardProps) {
  return (
    <Card className={cn("border-border/60 shadow-[var(--shadow-soft)]", className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {label}
            </p>
            <p className="mt-1.5 text-2xl font-semibold text-foreground">{value}</p>
            {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
          </div>
          {icon && (
            <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
              {icon}
            </div>
          )}
        </div>
        {trend && <p className="mt-3 text-xs font-medium text-success">{trend}</p>}
      </CardContent>
    </Card>
  );
}