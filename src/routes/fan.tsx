import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Bot, LayoutDashboard, MapPinned } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { RequireRole } from "@/components/RequireRole";

export const Route = createFileRoute("/fan")({
  head: () => ({ meta: [{ title: "Fan Dashboard — StadiumFlow AI" }] }),
  component: FanLayout,
});

const nav = [
  { to: "/fan", label: "Dashboard", icon: <LayoutDashboard className="size-4" /> },
  { to: "/fan/navigation", label: "Match Journey", icon: <MapPinned className="size-4" /> },
  { to: "/fan/assistant", label: "AI Assistant", icon: <Bot className="size-4" /> },
];

function FanLayout() {
  return (
    <RequireRole role="fan">
      <AppShell title="Match Day" nav={nav}>
        <Outlet />
      </AppShell>
    </RequireRole>
  );
}