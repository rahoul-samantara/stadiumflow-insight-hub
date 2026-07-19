import { describe, it, expect, vi } from "vitest";
import { cn, getBadgeVariantForStatus, humaniseCrowdContext, debounce } from "../utils";

describe("utils", () => {
  describe("cn", () => {
    it("should merge class names correctly", () => {
      expect(cn("class1", "class2")).toBe("class1 class2");
      expect(cn("class1", { class2: true, class3: false })).toBe("class1 class2");
    });
  });

  describe("getBadgeVariantForStatus", () => {
    it("should return correct badge variants for each status", () => {
      expect(getBadgeVariantForStatus("Critical")).toBe("destructive");
      expect(getBadgeVariantForStatus("High")).toBe("destructive");
      expect(getBadgeVariantForStatus("Medium")).toBe("secondary");
      expect(getBadgeVariantForStatus("Low")).toBe("outline");
      expect(getBadgeVariantForStatus(undefined)).toBe("outline");
    });
  });

  describe("humaniseCrowdContext", () => {
    it("should format gates and zones into a human-readable string", () => {
      const gates = [{ id: "g1", name: "Gate 1", waitTime: 10, status: "Low" as const }];
      const zones = [{ id: "z1", name: "Zone 1", density: 20, status: "Low" as const }];

      const result = humaniseCrowdContext(gates, zones);
      expect(result).toBe("Gates — Gate 1: 10 min wait (Low). Zones — Zone 1: 20% density (Low).");
    });
  });

  describe("debounce", () => {
    it("should debounce function calls", () => {
      vi.useFakeTimers();
      const fn = vi.fn();
      const debounced = debounce(fn, 100);

      debounced();
      debounced();
      debounced();

      expect(fn).not.toBeCalled();

      vi.advanceTimersByTime(100);

      expect(fn).toBeCalledTimes(1);
      vi.useRealTimers();
    });
  });
});
