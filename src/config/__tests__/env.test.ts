import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock import.meta.env before importing the module
vi.stubGlobal("import", { meta: { env: {} } });

describe("env config", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("should export hasGroqKey as a function", async () => {
    const { hasGroqKey } = await import("../env");
    expect(typeof hasGroqKey).toBe("function");
  });

  it("should return false when VITE_GROQ_API_KEY is not set", async () => {
    const { hasGroqKey } = await import("../env");
    expect(hasGroqKey()).toBe(false);
  });

  it("should export env object", async () => {
    const { env } = await import("../env");
    expect(env).toBeDefined();
    expect(typeof env).toBe("object");
  });
});
