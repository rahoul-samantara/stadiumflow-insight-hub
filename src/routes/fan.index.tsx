import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accessibility,
  Bot,
  Bus,
  Clock,
  DoorOpen,
  MapPinned,
  Sparkles,
  Ticket,
  Utensils,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CrowdBadge } from "@/components/CrowdBadge";
import { MetricCard } from "@/components/MetricCard";
import { useAuth } from "@/contexts/AuthContext";
import {
  fanRecommendations,
  journeyTimeline,
  upcomingMatch,
} from "@/data/mockData";

export const Route = createFileRoute("/fan/")({
  component: FanDashboard,
});

const quickActions = [
  { label: "Navigate to seat", icon: MapPinned, to: "/fan/navigation" as const },
  { label: "Ask AI", icon: Bot, to: "/fan/assistant" as const },
  { label: "Find restroom", icon: DoorOpen, to: "/fan/navigation" as const },
  { label: "Accessibility", icon: Accessibility, to: "/fan/navigation" as const },
  { label: "Transportation", icon: Bus, to: "/fan/navigation" as const },
];

function FanDashboard() {
  const { user } = useAuth();
  const firstName = user?.name.split(" ")[0] ?? "Fan";

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section
        className="relative overflow-hidden rounded-2xl p-6 text-primary-foreground md:p-8"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium ring-1 ring-white/20">
            <Sparkles className="size-3.5" aria-hidden /> Live match day
          </span>
          <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
            Welcome back, {firstName}.
          </h2>
          <p className="mt-1 text-sm text-white/85">
            Your AI-guided journey to {upcomingMatch.home} vs {upcomingMatch.away} is ready.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/60 shadow-[var(--shadow-soft)] md:col-span-2">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-primary">
                  Upcoming match
                </p>
                <h3 className="mt-1.5 text-xl font-semibold">
                  {upcomingMatch.home} vs {upcomingMatch.away}
                </h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {upcomingMatch.stage} · {upcomingMatch.venue}
                </p>
              </div>
              <CrowdBadge level="medium" />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <InfoBlock
                icon={<Ticket className="size-4" />}
                label="Your seat"
                value={
                  user?.seat
                    ? `Sec ${user.seat.section} · Row ${user.seat.row} · #${user.seat.seat}`
                    : "Section 112 · Row H · 24"
                }
              />
              <InfoBlock
                icon={<Clock className="size-4" />}
                label="Arrive by"
                value="6:45 PM"
                hint="30 min before kickoff"
              />
              <InfoBlock
                icon={<DoorOpen className="size-4" />}
                label="Entry gate"
                value={user?.gate ?? "Gate C"}
                hint="Recommended · low crowd"
              />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button asChild>
                <Link to="/fan/navigation">Start journey</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/fan/assistant">Ask assistant</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <MetricCard
            label="Wait at your gate"
            value="3 min"
            hint="Gate C · trending down"
            icon={<Clock className="size-4" />}
            trend="↓ 6 min vs 10 min ago"
          />
          <MetricCard
            label="Walk to seat"
            value="4 min"
            hint="From Gate C to Section 112"
            icon={<MapPinned className="size-4" />}
          />
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Quick actions
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {quickActions.map((a) => (
            <Link
              key={a.label}
              to={a.to}
              className="group flex flex-col items-start gap-3 rounded-xl border border-border/60 bg-card p-4 text-left shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-elegant)]"
            >
              <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <a.icon className="size-4" aria-hidden />
              </div>
              <span className="text-sm font-medium">{a.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="border-border/60 shadow-[var(--shadow-soft)] lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Today's match journey</h3>
              <Button asChild variant="ghost" size="sm">
                <Link to="/fan/navigation">View map</Link>
              </Button>
            </div>
            <ol className="mt-4 space-y-4">
              {journeyTimeline.map((e, i) => (
                <li key={e.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="grid size-7 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      {i + 1}
                    </div>
                    {i < journeyTimeline.length - 1 && (
                      <div className="mt-1 w-px flex-1 bg-border" aria-hidden />
                    )}
                  </div>
                  <div className="pb-1">
                    <p className="text-xs font-medium text-primary">{e.time}</p>
                    <p className="text-sm font-semibold">{e.title}</p>
                    <p className="text-sm text-muted-foreground">{e.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-[var(--shadow-soft)]">
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <div className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
                <Bot className="size-4" aria-hidden />
              </div>
              <h3 className="text-base font-semibold">AI recommendations</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {fanRecommendations.map((r) => (
                <li
                  key={r.id}
                  className="rounded-lg border border-border/60 bg-background p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold">{r.title}</p>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {r.time}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{r.body}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function InfoBlock({
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
    <div className="rounded-xl border border-border/60 bg-background p-3">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        <span className="text-primary" aria-hidden>
          {icon}
        </span>
        {label}
      </div>
      <p className="mt-1 text-sm font-semibold">{value}</p>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}