import { Link } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AccessDenied() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div
          className="mx-auto grid size-14 place-items-center rounded-2xl text-primary-foreground shadow-[var(--shadow-elegant)]"
          style={{ background: "var(--gradient-primary)" }}
        >
          <ShieldAlert className="size-6" />
        </div>
        <h1 className="mt-5 text-2xl font-semibold tracking-tight">Access denied</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You don't have permission to view this page. Please sign in with the right role.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Button asChild>
            <Link to="/login">Switch account</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">Go home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
