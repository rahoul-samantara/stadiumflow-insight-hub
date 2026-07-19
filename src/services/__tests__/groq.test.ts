import { describe, it, expect, vi, beforeEach } from "vitest";

// We must mock the env module since groq.ts imports it, and it relies on import.meta.env
vi.mock("@/config/env", () => ({
  hasGroqKey: vi.fn(() => false),
  env: { VITE_GROQ_API_KEY: undefined },
}));

describe("groq service", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("should export isAvailable as a function that returns false without a key", async () => {
    const { isAvailable } = await import("../groq");
    expect(typeof isAvailable).toBe("function");
    expect(isAvailable()).toBe(false);
  });

  it("should return null from createChatSession when no API key is configured", async () => {
    const { createChatSession } = await import("../groq");
    const session = createChatSession("Test system context");
    expect(session).toBeNull();
  });

  it("should return a fallback string from generateOperationalSummary without API key", async () => {
    const { generateOperationalSummary } = await import("../groq");
    const result = await generateOperationalSummary([
      { id: "z1", zone: "North", density: 80, count: 400, capacity: 500 },
    ]);
    expect(result).toContain("unavailable");
  });

  it("should return a default recommendation array from generateFanRecommendations without API key", async () => {
    const { generateFanRecommendations } = await import("../groq");
    const gates = [{ id: "g1", name: "Gate A", waitTime: 5, status: "Low" as const }];
    const zones = [{ id: "z1", name: "Zone 1", density: 20, status: "Low" as const }];
    const result = await generateFanRecommendations(gates, zones);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("title");
    expect(result[0]).toHaveProperty("severity");
  });
});
