import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { LogOut, Menu } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { RoleBadge } from "@/components/RoleBadge";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { SkipToContent } from "@/components/SkipToContent";
import { A11yAnnouncer } from "@/components/A11yAnnouncer";

export interface NavItem {
  to: string;
  label: string;
  icon: ReactNode;
}

function LanguageSelector() {
  const { language, setLanguage, availableLanguages } = useLanguage();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="size-4" />
          <span className="hidden sm:inline-block">{language}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang)}
            className={cn(language === lang && "bg-accent text-accent-foreground")}
          >
            {lang}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface AppShellProps {
  title: string;
  nav: NavItem[];
  children: ReactNode;
}

export function AppShell({ title, nav, children }: AppShellProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  const NavList = () => (
    <nav className="flex flex-col gap-1" aria-label="Primary">
      {nav.map((item) => {
        const active = pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            <span className="grid size-5 place-items-center" aria-hidden>
              {item.icon}
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  const Brand = () => (
    <div className="flex items-center gap-2.5">
      <div
        aria-hidden
        className="grid size-8 place-items-center rounded-lg text-primary-foreground shadow-[var(--shadow-elegant)]"
        style={{ background: "var(--gradient-primary)" }}
      >
        <span className="text-sm font-bold">SF</span>
      </div>
      <div className="leading-tight">
        <p className="text-sm font-semibold text-foreground">StadiumFlow AI</p>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
          FIFA World Cup 2026
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-dvh w-full bg-background">
      <SkipToContent />
      <A11yAnnouncer />
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border/60 bg-card/60 p-4 md:flex">
        <div className="mb-8 px-2">
          <Brand />
        </div>
        <NavList />
        <div className="mt-auto rounded-xl border border-border/60 bg-background p-3">
          <div className="flex items-center gap-2">
            <div className="grid size-8 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {user?.name
                .split(" ")
                .map((p) => p[0])
                .join("")}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{user?.name}</p>
              {user && <RoleBadge role={user.role} className="mt-0.5" />}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              aria-label="Sign out"
              className="size-8"
            >
              <LogOut className="size-4" />
            </Button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border/60 bg-background/80 px-4 backdrop-blur md:px-6">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-4">
              <div className="mb-6">
                <Brand />
              </div>
              <NavList />
            </SheetContent>
          </Sheet>
          <div className="md:hidden">
            <Brand />
          </div>
          <h1 className="hidden text-base font-semibold md:block">{title}</h1>
          <div className="ml-auto flex items-center gap-2">
            <LanguageSelector />
            {user && <RoleBadge role={user.role} />}
          </div>
        </header>
        <main id="main-content" className="flex-1 animate-fade-in px-4 py-6 md:px-8 md:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
