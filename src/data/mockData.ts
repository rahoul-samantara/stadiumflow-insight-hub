import type {
  Alert,
  ChatMessage,
  CrowdZone,
  DemoUser,
  Match,
  Recommendation,
  TimelineEvent,
} from "@/types";

export const demoUsers: DemoUser[] = [
  {
    id: "u_john",
    name: "John Miller",
    role: "fan",
    language: "English",
    match: "USA vs Brazil",
    seat: { section: "112", row: "H", seat: "24" },
    gate: "Gate C",
  },
  {
    id: "u_maria",
    name: "Maria Garcia",
    role: "fan",
    language: "Spanish",
    accessibility: "Wheelchair Assistance",
    match: "USA vs Brazil",
    seat: { section: "104", row: "A", seat: "05" },
    gate: "Gate A (Accessible)",
  },
  {
    id: "u_sarah",
    name: "Sarah Lee",
    role: "organizer",
    title: "Venue Operations Manager",
  },
  {
    id: "u_david",
    name: "David Chen",
    role: "organizer",
    title: "Crowd Operations Lead",
  },
];

export const upcomingMatch: Match = {
  id: "m_usa_bra",
  home: "USA",
  away: "Brazil",
  venue: "MetLife Stadium, New Jersey",
  kickoff: "2026-06-18T20:00:00Z",
  stage: "Group Stage · Matchday 2",
};

export const crowdZones: CrowdZone[] = [
  { id: "z1", name: "Gate A", level: "high", occupancy: 88, wait: "18 min" },
  { id: "z2", name: "Gate B", level: "medium", occupancy: 62, wait: "9 min" },
  { id: "z3", name: "Gate C", level: "low", occupancy: 34, wait: "3 min" },
  { id: "z4", name: "Gate D", level: "medium", occupancy: 55, wait: "7 min" },
  { id: "z5", name: "Food Court 1", level: "medium", occupancy: 71, wait: "6 min" },
  { id: "z6", name: "Food Court 2", level: "high", occupancy: 92, wait: "14 min" },
];

export const fanRecommendations: Recommendation[] = [
  {
    id: "r1",
    title: "Arrive by 6:45 PM",
    body: "Traffic on Route 3 is heavier than usual. Leaving 30 minutes earlier avoids stadium queues.",
    time: "2h ago",
    severity: "info",
  },
  {
    id: "r2",
    title: "Use Gate C instead of Gate A",
    body: "Gate A is at 88% capacity. Gate C has a 3 minute wait and is a 4 minute walk from your seat.",
    time: "35m ago",
    severity: "warning",
  },
  {
    id: "r3",
    title: "Restroom near Section 112",
    body: "Restrooms behind Section 114 are less crowded than the concourse level.",
    time: "10m ago",
    severity: "info",
  },
];

export const organizerAlerts: Alert[] = [
  {
    id: "a1",
    zone: "Gate A",
    message: "Congestion increasing — 88% capacity, wait time 18 min.",
    severity: "warning",
    time: "2 min ago",
  },
  {
    id: "a2",
    zone: "Food Court 2",
    message: "Approaching capacity. Consider staff reallocation.",
    severity: "critical",
    time: "5 min ago",
  },
  {
    id: "a3",
    zone: "Parking Lot B",
    message: "Inbound flow stabilized after redirect.",
    severity: "info",
    time: "12 min ago",
  },
];

export const aiOperationalSummary: string[] = [
  "Gate A congestion increasing — redirecting arrivals to Gate C reduces wait by 12 min.",
  "Food Court 2 reaching capacity — recommend opening overflow concession at Section 118.",
  "Accessibility routes clear — no delays reported for wheelchair guests.",
  "Public transit arrivals peaking in 25 minutes — pre-stage staff at Gates B and C.",
];

export const journeyTimeline: TimelineEvent[] = [
  { id: "t1", time: "5:30 PM", title: "Leave hotel", detail: "Uber ETA 22 min via Route 3." },
  { id: "t2", time: "6:10 PM", title: "Arrive parking", detail: "Lot B — 6 min walk to Gate C." },
  { id: "t3", time: "6:25 PM", title: "Enter Gate C", detail: "Low crowd · Est wait 3 min." },
  {
    id: "t4",
    time: "6:45 PM",
    title: "Reach seat 112 · H · 24",
    detail: "Grab drink at Concourse Kiosk 3 en route.",
  },
  { id: "t5", time: "8:00 PM", title: "Kickoff", detail: "USA vs Brazil · Group Stage." },
];

export const chatSuggestions: string[] = [
  "Which gate should I use?",
  "Where is my seat?",
  "How crowded is Gate B?",
  "What is the nearest restroom?",
  "Is there wheelchair assistance?",
];

export const chatResponses: Record<string, string> = {
  "Which gate should I use?":
    "Based on current crowd data, use Gate C. It is 3 min wait vs 18 min at Gate A, and only a 4 minute walk from your seat in Section 112.",
  "Where is my seat?":
    "Your seat is Section 112, Row H, Seat 24. From Gate C, follow the blue concourse signs — approximately 4 minutes on foot.",
  "How crowded is Gate B?":
    "Gate B is currently at 62% capacity with a 9 minute wait. It is trending upward — I recommend Gate C.",
  "What is the nearest restroom?":
    "The closest restroom to your seat is behind Section 114, about 90 seconds away. It has shorter lines than the main concourse.",
  "Is there wheelchair assistance?":
    "Yes. Wheelchair assistance is available at Gate A (accessible entrance). Staff can meet you at curbside — I can notify them now if you like.",
};

export const initialChat: ChatMessage[] = [
  {
    id: "c0",
    role: "assistant",
    content:
      "Hi John — I am your Match Assistant for USA vs Brazil. Ask me anything about gates, seats, food or accessibility.",
    time: "just now",
  },
];

export function generateAssistantReply(prompt: string): string {
  if (chatResponses[prompt]) return chatResponses[prompt];
  const lower = prompt.toLowerCase();
  if (lower.includes("gate")) return chatResponses["Which gate should I use?"];
  if (lower.includes("seat")) return chatResponses["Where is my seat?"];
  if (lower.includes("restroom") || lower.includes("bathroom"))
    return chatResponses["What is the nearest restroom?"];
  if (lower.includes("wheelchair") || lower.includes("access"))
    return chatResponses["Is there wheelchair assistance?"];
  return "I checked the latest stadium data. Based on live crowd and route conditions, follow your recommended journey — I will alert you if anything changes.";
}

export const attendanceMetric = {
  current: 68420,
  capacity: 82500,
  avgWaitMin: 8,
  gateOccupancyPct: 71,
};

export const hourlyArrivals = [
  { hour: "5 PM", arrivals: 1200 },
  { hour: "5:30", arrivals: 2400 },
  { hour: "6 PM", arrivals: 6100 },
  { hour: "6:30", arrivals: 9800 },
  { hour: "7 PM", arrivals: 12400 },
  { hour: "7:30", arrivals: 8200 },
];
