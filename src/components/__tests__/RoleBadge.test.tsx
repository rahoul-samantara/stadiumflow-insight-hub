import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RoleBadge } from "../RoleBadge";
import type { Role } from "@/types";

describe("RoleBadge Component", () => {
  it("renders correctly for a Fan", () => {
    render(<RoleBadge role={"fan" as Role} />);
    const badge = screen.getByText("Fan");
    expect(badge).toBeInTheDocument();
  });

  it("renders correctly for an Organizer", () => {
    render(<RoleBadge role={"organizer" as Role} />);
    const badge = screen.getByText("Organizer");
    expect(badge).toBeInTheDocument();
  });
});
