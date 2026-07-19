import { createFileRoute, Link } from "@tanstack/react-router";
import { Bot, Globe2, MapPinned, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const highlights = [
  {
    icon: MapPinned,
    title: "Smart Navigation",
    body: "Turn-by-turn stadium routing to your seat, gate and services — updated live with crowd data.",
  },
  {
    icon: Users,
    title: "Crowd Intelligence",
    body: "Real-time density heatmaps predict bottlenecks and reroute fans before congestion happens.",
  },
  {
    icon: Bot,
    title: "AI Match Assistant",
    body: "Ask anything about your match day — seats, food, accessibility, restrooms and transit.",
  },
  {
    icon: Globe2,
    title: "Multilingual Support",
    body: "Native experiences in English, Spanish, Portuguese and French — for every fan at the World Cup.",
  },
];

function LandingPage() {
  return (
    <div className="min-h-dvh bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 md:px-8">
        <div className="flex items-center gap-2.5">
          <div
            aria-hidden
            className="grid size-9 place-items-center rounded-xl text-primary-foreground shadow-[var(--shadow-elegant)]"
            style={{ background: "var(--gradient-primary)" }}
          >
            <span className="text-sm font-bold">SF</span>
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold">StadiumFlow AI</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              FIFA World Cup 2026
            </p>
          </div>
        </div>
        <Button asChild variant="ghost" size="sm">
          <Link to="/login">Sign in</Link>
        </Button>
      </header>

      <section className="relative overflow-hidden bg-[#023c71]">
        <img
          src="/world_cup_stadium.png"
          alt="World Cup Stadium"
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30 mix-blend-overlay"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-90"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 0%, oklch(1 0 0 / 0.15) 0%, transparent 70%)",
          }}
        />
        <div className="mx-auto max-w-6xl px-4 pb-24 pt-16 text-center md:px-8 md:pt-24">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur">
            <Sparkles className="size-3.5" aria-hidden />
            AI-powered match day
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Every match. Every fan. Every gate — flowing perfectly.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-white/85 md:text-lg">
            StadiumFlow AI orchestrates the fan journey and stadium operations in real time — so
            fans arrive smoothly and organizers stay ahead of every crowd.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link to="/login">Enter stadium experience</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              <Link to="/login">Explore demo</Link>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs text-white/70">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-3.5" aria-hidden /> Trusted operations grade
            </span>
            <span aria-hidden>·</span>
            <span>WCAG 2.2 AA</span>
            <span aria-hidden>·</span>
            <span>4 languages</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 md:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            Product highlights
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            A calmer stadium — for 82,500 fans at once.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <Card
              key={h.title}
              className="border-border/60 shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
            >
              <CardContent className="p-6">
                <div
                  className="grid size-10 place-items-center rounded-xl text-primary-foreground"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <h.icon className="size-5" aria-hidden />
                </div>
                <h3 className="mt-4 text-base font-semibold">{h.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{h.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              World Cup 2026 Stats
            </h2>
            <p className="mt-4 text-primary-foreground/80">
              Live updates and countdown to the greatest tournament.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="bg-white/10 border-none text-white backdrop-blur">
              <CardContent className="flex flex-col items-center justify-center p-8">
                <div className="text-5xl font-bold tracking-tighter text-[#d1a842]">326</div>
                <div className="mt-2 text-sm font-medium uppercase tracking-widest text-white/80">
                  Days Until Kickoff
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-none text-white backdrop-blur md:col-span-2">
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold text-[#d1a842] mb-4 uppercase tracking-wider">
                  Recent Classic Matches
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/20 pb-4">
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-lg">France</span>
                      <span className="rounded bg-white/20 px-2 py-1 text-sm font-bold">4 - 6</span>
                      <span className="font-medium text-lg">England</span>
                    </div>
                    <span className="text-xs text-white/60">Final (1998)</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-lg">Argentina</span>
                      <span className="rounded bg-white/20 px-2 py-1 text-sm font-bold">3 - 3</span>
                      <span className="font-medium text-lg">France</span>
                    </div>
                    <span className="text-xs text-white/60">Final (2022)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-xs text-muted-foreground md:flex-row md:px-8">
          <p>© 2026 StadiumFlow AI · Prototype for FIFA World Cup 2026</p>
          <div className="flex gap-4">
            <Link to="/login" className="hover:text-foreground">
              Sign in
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
