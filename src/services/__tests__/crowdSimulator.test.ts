import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { crowdSimulator, getGateRecommendation, getRouteEstimate } from "../crowdSimulator";

describe("crowdSimulator", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    crowdSimulator.stop();
  });

  it("should initialize with default zones and gates", () => {
    const snapshot = crowdSimulator.getSnapshot();
    expect(snapshot.zones.length).toBeGreaterThan(0);
    expect(snapshot.gates.length).toBeGreaterThan(0);
  });

  it("should start and update state over time", () => {
    const subscriber = vi.fn();
    crowdSimulator.subscribe(subscriber);

    crowdSimulator.start();
    expect(subscriber).toHaveBeenCalledTimes(1); // Initial notification

    vi.advanceTimersByTime(10000); // Advance 10 seconds
    expect(subscriber).toHaveBeenCalledTimes(2); // Second notification

    crowdSimulator.unsubscribe(subscriber);
  });

  it("should get a proper gate recommendation based on user seat section", () => {
    const recommendationA = getGateRecommendation({ section: "N101", row: "A", seat: "1" });
    const recommendationB = getGateRecommendation({ section: "S101", row: "A", seat: "1" });
    const recommendationC = getGateRecommendation({ section: "E101", row: "A", seat: "1" });

    expect(recommendationA).toBeDefined();
    expect(recommendationB).toBeDefined();
    expect(recommendationC).toBeDefined();

    expect(typeof recommendationA.gateName).toBe("string");
    expect(typeof recommendationA.estimatedWaitTime).toBe("number");
  });

  it("should calculate deterministic route estimates", () => {
    const estimate1 = getRouteEstimate("Zone A", "Gate B");
    const estimate2 = getRouteEstimate("Zone A", "Gate B");

    // Should be deterministic
    expect(estimate1).toBe(estimate2);
    expect(estimate1).toBeGreaterThanOrEqual(2);
  });
});
