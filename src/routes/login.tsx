import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — StadiumFlow AI" },
      { name: "description", content: "Sign in to StadiumFlow AI for the 2026 World Cup." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: "fan" | "organizer") => {
    // Pick the first demo user of the selected role
    const id = role === "fan" ? "u_john" : "u_sarah";
    const user = login(id);
    if (!user) return;
    navigate({ to: user.role === "fan" ? "/fan" : "/organizer" });
  };

  return (
    <div className="flex min-h-dvh bg-slate-950">
      {/* Left side: Image */}
      <div className="relative hidden w-1/2 lg:block">
        <div className="absolute inset-0 bg-slate-950/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-950" />
        <img
          src="/world_cup_stadium.png"
          alt="World Cup Stadium"
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-12 left-12 right-12 z-10 text-white">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-slate-950/50 px-4 py-1.5 text-sm font-medium text-yellow-500 backdrop-blur-md">
            <Trophy className="size-4" />
            FIFA World Cup 2026™
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white/95 xl:text-5xl">
            Experience the future of match-day operations
          </h2>
          <p className="mt-4 max-w-xl text-lg text-white/80">
            StadiumFlow AI optimizes your journey from home to seat, ensuring a seamless experience for fans and complete control for organizers.
          </p>
        </div>
      </div>

      {/* Right side: Login Modal */}
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:px-20 xl:px-32 relative">
        <div 
          className="absolute inset-0 z-0 block lg:hidden"
          style={{
            backgroundImage: "url('/world_cup_stadium.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" />
        </div>
        
        <div className="relative z-10 mx-auto w-full max-w-sm lg:max-w-md">
          <div className="mb-10 lg:hidden text-center">
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-slate-950/50 px-4 py-1.5 text-sm font-medium text-yellow-500 backdrop-blur-md">
              <Trophy className="size-4" />
              FIFA World Cup 2026™
            </div>
          </div>
          
          <Card className="border-slate-800 bg-slate-900/80 text-white backdrop-blur-xl shadow-2xl shadow-black/50">
            <CardHeader className="space-y-3 pb-8 pt-8">
              <CardTitle className="text-center text-3xl font-bold tracking-tight text-white">
                Welcome back
              </CardTitle>
              <CardDescription className="text-center text-base text-slate-400">
                Choose a demo access role to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pb-8">
              <div className="flex flex-col gap-4">
                <Button
                  size="lg"
                  onClick={() => handleLogin("fan")}
                  className="group relative h-14 w-full overflow-hidden rounded-xl bg-blue-600 font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Quick Login as Fan
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>

                <div className="relative flex items-center justify-center py-2">
                  <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-slate-800" />
                  <span className="relative bg-slate-900/80 px-4 text-xs font-medium uppercase tracking-wider text-slate-500">
                    Or
                  </span>
                </div>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => handleLogin("organizer")}
                  className="group h-14 w-full rounded-xl border-slate-700 bg-slate-800/50 font-semibold text-white hover:bg-slate-800 hover:text-white"
                >
                  Quick Login as Organizer
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>

              <div className="mt-8 text-center text-sm text-slate-500">
                By continuing, you agree to the prototype{" "}
                <Link to="/" className="underline underline-offset-4 hover:text-slate-300">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/" className="underline underline-offset-4 hover:text-slate-300">
                  Privacy Policy
                </Link>
                .
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center">
             <Link
                to="/"
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                ← Back to home
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
}