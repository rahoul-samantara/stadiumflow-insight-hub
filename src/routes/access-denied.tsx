import { createFileRoute } from "@tanstack/react-router";
import { AccessDenied } from "@/components/AccessDenied";

export const Route = createFileRoute("/access-denied")({
  head: () => ({ meta: [{ title: "Access denied — StadiumFlow AI" }] }),
  component: AccessDenied,
});
