import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  Bot,
  Clock,
  DoorOpen,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { CrowdBadge } from "@/components/CrowdBadge";
import { MetricCard } from "@/components/MetricCard";
import { RequireRole } from "@/components/RequireRole";
import {
  aiOperationalSummary,
  attendanceMetric,
  crowdZones,
  hourlyArrivals,
  organizerAlerts,
} from "@/data/mockData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/organizer")({
  head: () => ({ meta: [{ title: "Operations — StadiumFlow AI" }] }),
  component: OrganizerPage,
});

const nav = [
  { to: "/organizer", label: "Operations", icon: <LayoutDashboard className="size-4" /> },
  { to: "/organizer", label: "Crowd Monitor", icon: <Activity className="size-4" /> },
  { to: "/organizer", label: "AI Summary", icon: <Bot className="size-4" /> },
  { to: "/organizer", label: "Settings", icon: <Settings className="size-4" /> },
];

function OrganizerPage() {
  const { current, capacity, avgWaitMin, gateOccupancyPct } = attendanceMetric;
  const attendancePct = Math.round((current / capacity) * 100);
  const maxArrivals = Math.max(...hourlyArrivals.map((h) => h.arrivals));

  return (
    <RequireRole role="organizer">
      <AppShell title="Operations" nav={nav}>
        <div className="mx-auto max-w-6xl space-y-6">
          <header className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-primary">
                Live operations
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                MetLife Stadium · USA vs Brazil
              </h2>
              <p className="text-sm text-muted-foreground">
                Kickoff 8:00 PM · 68,420 fans arrived · 25 min pre-kickoff peak inbound.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success ring-1 ring-inset ring-success/20">
              <span className="size-1.5 animate-pulse rounded-full bg-success" aria-hidden />
              Systems normal
            </span>
          </header>

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              label="Current attendance"
              value={current.toLocaleString()}
              hint={`${attendancePct}% of ${capacity.toLocaleString()}`}
              icon={<Users className="size-4" />}
              trend="↑ 1,240 in last 5 min"
            />
            <MetricCard
              label="Avg wait time"
              value={`${avgWaitMin} min`}
              hint="Across all gates"
              icon={<Clock className="size-4" />}
              trend="↓ 2 min after re-route"
            />
            <MetricCard
              label="Gate occupancy"
              value={`${gateOccupancyPct}%`}
              hint="Aggregated live capacity"
              icon={<DoorOpen className="size-4" />}
            />
            <MetricCard
              label="Active alerts"
              value={organizerAlerts.length}
              hint="1 critical · 1 warning"
              icon={<AlertTriangle className="size-4" />}
            />
          </section>

          <section className="grid gap-4 lg:grid-cols-3">
            <Card className="border-border/60 shadow-[var(--shadow-soft)] lg:col-span-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold">Hourly arrivals</h3>
                  <span className="text-xs text-muted-foreground">Last 3 hours</span>
                </div>
                <div className="mt-6 flex h-40 items-end gap-3">
                  {hourlyArrivals.map((h) => {
                    const heightPct = (h.arrivals / maxArrivals) * 100;
                    return (
                      <div key={h.hour} className="flex flex-1 flex-col items-center gap-2">
                        <div className="flex h-full w-full items-end">
                          <div
                            className="w-full rounded-t-md transition-all"
                            style={{
                              height: `${heightPct}%`,
                              background: "var(--gradient-primary)",
                            }}
                            aria-label={`${h.hour}: ${h.arrivals.toLocaleString()} fans`}
                          />
                        </div>
                        <span className="text-[10px] font-medium text-muted-foreground">
                          {h.hour}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60 shadow-[var(--shadow-soft)]">
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <div className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Bot className="size-4" aria-hidden />
                  </div>
                  <h3 className="text-base font-semibold">AI operational summary</h3>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {aiOperationalSummary.map((s, i) => (
                    <li
                      key={i}
                      className="rounded-lg border border-border/60 bg-background p-3 text-sm"
                    >
                      <span className="text-primary" aria-hidden>
                        ●{" "}
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-4 lg:grid-cols-3">
            <Card className="border-border/60 shadow-[var(--shadow-soft)] lg:col-span-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold">Crowd distribution</h3>
                  <span className="text-xs text-muted-foreground">Live heatmap</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {crowdZones.concat(crowdZones).slice(0, 12).map((z, i) => (
                    <div
                      key={`${z.id}-${i}`}
                      className={cn(
                        "aspect-square rounded-md",
                        z.level === "low" && "bg-success/40",
                        z.level === "medium" && "bg-warning/60",
                        z.level === "high" && "bg-destructive/60",
                      )}
                      title={`${z.name}: ${z.occupancy}%`}
                    />
                  ))}
                </div>
                <div className="mt-5 space-y-2">
                  {crowdZones.map((z) => (
                    <div
                      key={z.id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-background p-3"
                    >
                      <div>
                        <p className="text-sm font-semibold">{z.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {z.occupancy}% · wait {z.wait}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="hidden h-1.5 w-32 overflow-hidden rounded-full bg-muted sm:block">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${z.occupancy}%`,
                              background:
                                z.level === "low"
                                  ? "var(--success)"
                                  : z.level === "medium"
                                  ? "var(--warning)"
                                  : "var(--destructive)",
                            }}
                          />
                        </div>
                        <CrowdBadge level={z.level} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60 shadow-[var(--shadow-soft)]">
              <CardContent className="p-6">
                <h3 className="text-base font-semibold">Recent alerts</h3>
                <ul className="mt-4 space-y-3">
                  {organizerAlerts.map((a) => (
                    <li
                      key={a.id}
                      className="rounded-lg border border-border/60 bg-background p-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold">{a.zone}</p>
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ring-1 ring-inset",
                            a.severity === "critical" &&
                              "bg-destructive/10 text-destructive ring-destructive/20",
                            a.severity === "warning" &&
                              "bg-warning/15 text-foreground ring-warning/30",
                            a.severity === "info" &&
                              "bg-primary/10 text-primary ring-primary/20",
                          )}
                        >
                          {a.severity}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{a.message}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                        {a.time}
                      </p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
        </div>
      </AppShell>
    </RequireRole>
  );
}