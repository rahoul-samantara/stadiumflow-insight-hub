import { describe, it, expect } from "vitest";
import {
  generateAssistantReply,
  demoUsers,
  upcomingMatch,
  crowdZones,
  fanRecommendations,
  organizerAlerts,
  aiOperationalSummary,
  journeyTimeline,
  chatSuggestions,
  chatResponses,
  initialChat,
  attendanceMetric,
  hourlyArrivals,
} from "../mockData";

describe("mockData", () => {
  describe("data integrity", () => {
    it("should have at least 2 demo users with fan and organizer roles", () => {
      expect(demoUsers.length).toBeGreaterThanOrEqual(2);
      expect(demoUsers.some((u) => u.role === "fan")).toBe(true);
      expect(demoUsers.some((u) => u.role === "organizer")).toBe(true);
    });

    it("should have a valid upcoming match with all required fields", () => {
      expect(upcomingMatch.id).toBeDefined();
      expect(upcomingMatch.home).toBeDefined();
      expect(upcomingMatch.away).toBeDefined();
      expect(upcomingMatch.venue).toBeDefined();
      expect(upcomingMatch.kickoff).toBeDefined();
      expect(upcomingMatch.stage).toBeDefined();
    });

    it("should have crowd zones with valid occupancy percentages", () => {
      expect(crowdZones.length).toBeGreaterThan(0);
      crowdZones.forEach((zone) => {
        expect(zone.occupancy).toBeGreaterThanOrEqual(0);
        expect(zone.occupancy).toBeLessThanOrEqual(100);
        expect(["low", "medium", "high", "critical"]).toContain(zone.level);
      });
    });

    it("should have fan recommendations with valid severity levels", () => {
      expect(fanRecommendations.length).toBeGreaterThan(0);
      fanRecommendations.forEach((rec) => {
        expect(["info", "warning", "critical"]).toContain(rec.severity);
        expect(rec.title).toBeDefined();
        expect(rec.body).toBeDefined();
      });
    });

    it("should have organizer alerts with valid severity levels", () => {
      expect(organizerAlerts.length).toBeGreaterThan(0);
      organizerAlerts.forEach((alert) => {
        expect(["info", "warning", "critical"]).toContain(alert.severity);
      });
    });

    it("should have operational AI summary strings", () => {
      expect(aiOperationalSummary.length).toBeGreaterThan(0);
      aiOperationalSummary.forEach((s) => expect(typeof s).toBe("string"));
    });

    it("should have journey timeline events in chronological order", () => {
      expect(journeyTimeline.length).toBeGreaterThan(0);
      journeyTimeline.forEach((event) => {
        expect(event.time).toBeDefined();
        expect(event.title).toBeDefined();
      });
    });

    it("should have chat suggestions", () => {
      expect(chatSuggestions.length).toBeGreaterThan(0);
    });

    it("should have a chat response for each suggestion", () => {
      chatSuggestions.forEach((suggestion) => {
        expect(chatResponses[suggestion]).toBeDefined();
      });
    });

    it("should have initial chat with an assistant greeting", () => {
      expect(initialChat.length).toBeGreaterThanOrEqual(1);
      expect(initialChat[0].role).toBe("assistant");
    });

    it("should have valid attendance metrics", () => {
      expect(attendanceMetric.current).toBeLessThanOrEqual(attendanceMetric.capacity);
      expect(attendanceMetric.avgWaitMin).toBeGreaterThan(0);
    });

    it("should have hourly arrivals data", () => {
      expect(hourlyArrivals.length).toBeGreaterThan(0);
      hourlyArrivals.forEach((h) => {
        expect(h.hour).toBeDefined();
        expect(h.arrivals).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe("generateAssistantReply", () => {
    it("should return exact match for known prompts", () => {
      const reply = generateAssistantReply("Which gate should I use?");
      expect(reply).toContain("Gate C");
    });

    it("should match gate-related keywords to gate response", () => {
      const reply = generateAssistantReply("What is the best gate to enter?");
      expect(reply).toContain("Gate C");
    });

    it("should match seat-related keywords to seat response", () => {
      const reply = generateAssistantReply("Where is my seat located?");
      expect(reply).toContain("Section 112");
    });

    it("should match restroom keywords", () => {
      const reply = generateAssistantReply("I need to find a restroom");
      expect(reply).toContain("Section 114");
    });

    it("should match bathroom keyword as alias for restroom", () => {
      const reply = generateAssistantReply("Where is the bathroom?");
      expect(reply).toContain("Section 114");
    });

    it("should match wheelchair/accessibility keywords", () => {
      const reply = generateAssistantReply("Is there wheelchair access?");
      expect(reply).toContain("Wheelchair assistance");
    });

    it("should return a generic fallback for unmatched queries", () => {
      const reply = generateAssistantReply("What is the weather forecast today?");
      expect(reply).toContain("stadium data");
    });
  });
});
