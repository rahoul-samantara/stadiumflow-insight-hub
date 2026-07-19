import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { reportLovableError } from "../lovable-error-reporting";

describe("Lovable Error Reporting", () => {
  beforeEach(() => {
    // Mock the window object
    vi.stubGlobal("window", {
      location: { pathname: "/test-route" },
      __lovableEvents: {
        captureException: vi.fn(),
      },
      __lovableReportRuntimeError: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should capture exceptions via lovableEvents", () => {
    const error = new Error("Test error");
    reportLovableError(error, { customContext: true });

    expect(window.__lovableEvents?.captureException).toHaveBeenCalledWith(
      error,
      {
        source: "react_error_boundary",
        route: "/test-route",
        customContext: true,
      },
      {
        mechanism: "react_error_boundary",
        handled: false,
        severity: "error",
      },
    );
  });

  it("should report runtime errors via lovableReportRuntimeError", () => {
    const error = new Error("Test error");
    reportLovableError(error);

    expect(window.__lovableReportRuntimeError).toHaveBeenCalledWith({
      message: "Test error",
      stack: error.stack,
      filename: "/test-route",
    });
  });
});
