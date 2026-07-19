import { createFileRoute } from "@tanstack/react-router";
import { Clock, DoorOpen, Footprints, MapPin, Navigation } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CrowdBadge } from "@/components/CrowdBadge";
import { crowdZones } from "@/data/mockData";

export const Route = createFileRoute("/fan/navigation")({
  head: () => ({ meta: [{ title: "Match Journey — StadiumFlow AI" }] }),
  component: NavigationPage,
});

function NavigationPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <p className="text-xs font-medium uppercase tracking-wider text-primary">Smart navigation</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">Your route to seat 112 · H · 24</h2>
        <p className="text-sm text-muted-foreground">
          Live route adapts as crowd conditions change around the stadium.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-border/60 shadow-[var(--shadow-soft)] lg:col-span-2">
          <CardContent className="p-0">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(60% 60% at 50% 50%, oklch(0.94 0.06 200) 0%, oklch(0.85 0.12 200) 60%, oklch(0.55 0.16 258) 100%)",
                }}
              />
              {/* Field */}
              <div className="absolute inset-[18%] rounded-[24px] border-2 border-white/70 bg-[oklch(0.68_0.16_155/0.75)]" />
              <div className="absolute left-1/2 top-[18%] h-[64%] w-px -translate-x-1/2 bg-white/60" aria-hidden />
              <div className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/70" aria-hidden />
              {/* Gates */}
              <Pin className="left-[10%] top-[45%]" label="Gate A" tone="high" />
              <Pin className="right-[10%] top-[45%]" label="Gate C" tone="low" active />
              <Pin className="left-1/2 top-[8%] -translate-x-1/2" label="Gate B" tone="medium" />
              <Pin className="left-1/2 bottom-[8%] -translate-x-1/2" label="Gate D" tone="medium" />
              {/* You */}
              <div className="absolute right-[10%] top-[45%] size-3 -translate-x-1/2 -translate-y-1/2">
                <span className="absolute inset-0 animate-ping rounded-full bg-primary/60" />
              </div>
              {/* Route */}
              <svg
                aria-hidden
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 62.5"
                preserveAspectRatio="none"
              >
                <path
                  d="M 88 28 Q 78 40, 65 32 T 52 30"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.8"
                  strokeDasharray="1.5 1.5"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute bottom-3 left-3 rounded-lg bg-background/85 px-3 py-2 text-xs shadow-md backdrop-blur">
                <p className="font-semibold">Stadium map</p>
                <p className="text-muted-foreground">Interactive preview · live data</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <RouteStat icon={<MapPin className="size-4" />} label="Current location" value="Parking Lot B" />
          <RouteStat icon={<DoorOpen className="size-4" />} label="Recommended gate" value="Gate C" hint="Low crowd · 3 min wait" />
          <RouteStat icon={<Footprints className="size-4" />} label="Est. walk time" value="9 min" hint="Wheelchair accessible route available" />
          <RouteStat icon={<Navigation className="size-4" />} label="Alternative gate" value="Gate B" hint="9 min wait · +3 min walk" />
          <RouteStat icon={<Clock className="size-4" />} label="Arrive by" value="6:45 PM" hint="Kickoff 8:00 PM" />
        </div>
      </div>

      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Live crowd zones
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {crowdZones.map((z) => (
            <Card key={z.id} className="border-border/60 shadow-[var(--shadow-soft)]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{z.name}</p>
                  <CrowdBadge level={z.level} />
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-all"
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
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{z.occupancy}% capacity</span>
                  <span>Wait {z.wait}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

function Pin({
  className,
  label,
  tone,
  active,
}: {
  className: string;
  label: string;
  tone: "low" | "medium" | "high";
  active?: boolean;
}) {
  const color = tone === "low" ? "bg-success" : tone === "medium" ? "bg-warning" : "bg-destructive";
  return (
    <div className={`absolute ${className} flex flex-col items-center`}>
      <span
        className={`grid size-6 place-items-center rounded-full text-[10px] font-bold text-white shadow-md ring-2 ring-white ${color} ${active ? "scale-125" : ""}`}
      >
        {label.slice(-1)}
      </span>
      <span className="mt-1 rounded bg-background/90 px-1.5 text-[10px] font-medium shadow">
        {label}
      </span>
    </div>
  );
}

function RouteStat({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-4 shadow-[var(--shadow-soft)]">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        <span className="text-primary" aria-hidden>
          {icon}
        </span>
        {label}
      </div>
      <p className="mt-1 text-base font-semibold">{value}</p>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}