import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Accessibility, ArrowLeft, ArrowRight, Languages, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RoleBadge } from "@/components/RoleBadge";
import { useAuth } from "@/contexts/AuthContext";
import { demoUsers } from "@/data/mockData";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — StadiumFlow AI" },
      { name: "description", content: "Choose a demo role to explore StadiumFlow AI." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSelect = (id: string) => {
    const user = login(id);
    if (!user) return;
    navigate({ to: user.role === "fan" ? "/fan" : "/organizer" });
  };

  return (
    <div className="min-h-dvh bg-background">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-64"
        style={{ background: "var(--gradient-hero)", opacity: 0.9 }}
      />
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-white"
        >
          <ArrowLeft className="size-4" aria-hidden /> Back
        </Link>
        <div className="mt-8 text-center text-white">
          <p className="text-xs font-medium uppercase tracking-wider text-white/70">
            Demo access
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            Choose your match-day role
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/80">
            No password required — this is a prototype experience. Sign in as a fan or a stadium
            organizer.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {demoUsers.map((u) => (
            <Card
              key={u.id}
              className="group cursor-pointer border-border/60 bg-card shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elegant)] focus-within:ring-2 focus-within:ring-primary"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-lg font-semibold text-primary">
                    {u.name.split(" ").map((p) => p[0]).join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-base font-semibold">{u.name}</p>
                      <RoleBadge role={u.role} />
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {u.role === "organizer" ? u.title : `Fan · ${u.match}`}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      {u.language && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5">
                          <Languages className="size-3" aria-hidden /> {u.language}
                        </span>
                      )}
                      {u.accessibility && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5">
                          <Accessibility className="size-3" aria-hidden /> {u.accessibility}
                        </span>
                      )}
                      {u.seat && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5">
                          <Ticket className="size-3" aria-hidden />
                          Sec {u.seat.section} · Row {u.seat.row}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex justify-end">
                  <Button
                    onClick={() => handleSelect(u.id)}
                    className="gap-1.5"
                    aria-label={`Continue as ${u.name}`}
                  >
                    Continue <ArrowRight className="size-4" aria-hidden />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}