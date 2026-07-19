import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

export function A11yAnnouncer() {
  const [message, setMessage] = useState("");
  const location = useRouterState({ select: (s) => s.location });

  useEffect(() => {
    setMessage(`Navigated to ${location.pathname}`);
  }, [location.pathname]);

  return (
    <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
      {message}
    </div>
  );
}
