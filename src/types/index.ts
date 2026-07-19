export type Role = "fan" | "organizer";
export type Language = "English" | "Spanish" | "Portuguese" | "French";
export type CrowdLevel = "low" | "medium" | "high";

export interface DemoUser {
  id: string;
  name: string;
  role: Role;
  title?: string;
  language?: Language;
  accessibility?: string;
  match?: string;
  seat?: { section: string; row: string; seat: string };
  gate?: string;
  avatar?: string;
}

export interface Match {
  id: string;
  home: string;
  away: string;
  venue: string;
  kickoff: string;
  stage: string;
}

export interface CrowdZone {
  id: string;
  name: string;
  level: CrowdLevel;
  occupancy: number;
  wait: string;
}

export interface Recommendation {
  id: string;
  title: string;
  body: string;
  time: string;
  severity: "info" | "warning" | "critical";
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
}

export interface Alert {
  id: string;
  zone: string;
  message: string;
  severity: "info" | "warning" | "critical";
  time: string;
}

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  detail: string;
}