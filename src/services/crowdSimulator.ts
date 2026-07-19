// src/services/crowdSimulator.ts

/**
 * Represents the current crowd density status for a specific stadium zone.
 */
export interface ZoneData {
  id: string;
  name: string;
  density: number; // 0-100
  status: 'Low' | 'Medium' | 'High' | 'Critical';
}

/**
 * Represents the current wait time and status for a specific stadium gate.
 */
export interface GateData {
  id: string;
  name: string;
  waitTime: number; // in minutes
  status: 'Low' | 'Medium' | 'High' | 'Critical';
}

/**
 * A snapshot of the stadium's crowd data at a specific point in time.
 */
export interface CrowdSnapshot {
  zones: ZoneData[];
  gates: GateData[];
}

type Subscriber = (snapshot: CrowdSnapshot) => void;

class CrowdSimulator {
  private timer: number | null = null;
  private subscribers: Set<Subscriber> = new Set();
  private subscriberCount = 0;
  
  private zones: ZoneData[] = [
    { id: 'z-north', name: 'North Concourse', density: 30, status: 'Low' },
    { id: 'z-south', name: 'South Concourse', density: 45, status: 'Medium' },
    { id: 'z-east', name: 'East Concourse', density: 20, status: 'Low' },
    { id: 'z-west', name: 'West Concourse', density: 80, status: 'High' },
    { id: 'z-fan', name: 'Fan Zone', density: 60, status: 'Medium' },
  ];

  private gates: GateData[] = [
    { id: 'g-A', name: 'Gate A', waitTime: 5, status: 'Low' },
    { id: 'g-B', name: 'Gate B', waitTime: 12, status: 'Medium' },
    { id: 'g-C', name: 'Gate C', waitTime: 25, status: 'High' },
    { id: 'g-D', name: 'Gate D', waitTime: 3, status: 'Low' },
  ];

  private updateState() {
    const time = Date.now();
    
    this.zones = this.zones.map((zone, index) => {
      const variation = Math.sin(time / 10000 + index) * 10;
      let newDensity = Math.max(0, Math.min(100, zone.density + variation));
      
      let status: ZoneData['status'] = 'Low';
      if (newDensity > 85) status = 'Critical';
      else if (newDensity > 65) status = 'High';
      else if (newDensity > 40) status = 'Medium';

      return { ...zone, density: Math.round(newDensity), status };
    });

    this.gates = this.gates.map((gate, index) => {
      const variation = Math.cos(time / 15000 + index) * 5;
      let newWait = Math.max(0, Math.min(60, gate.waitTime + variation));
      
      let status: GateData['status'] = 'Low';
      if (newWait > 30) status = 'Critical';
      else if (newWait > 20) status = 'High';
      else if (newWait > 10) status = 'Medium';

      return { ...gate, waitTime: Math.round(newWait), status };
    });

    this.notifySubscribers();
  }

  private notifySubscribers() {
    const snapshot = this.getSnapshot();
    this.subscribers.forEach(sub => sub(snapshot));
  }

  public subscribe(fn: Subscriber) {
    this.subscribers.add(fn);
    return () => this.unsubscribe(fn);
  }

  public unsubscribe(fn: Subscriber) {
    this.subscribers.delete(fn);
  }

  public start() {
    this.subscriberCount++;
    if (this.timer) return;
    this.updateState();
    this.timer = window.setInterval(() => {
      this.updateState();
    }, 10000);
  }

  public stop() {
    this.subscriberCount = Math.max(0, this.subscriberCount - 1);
    if (this.subscriberCount === 0 && this.timer !== null) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
  }

  public getSnapshot(): CrowdSnapshot {
    return {
      zones: [...this.zones],
      gates: [...this.gates],
    };
  }
}

export const crowdSimulator = new CrowdSimulator();

export interface UserSeat {
  section: string;
  row: string;
  seat: string;
}

export interface GateRecommendation {
  gateId: string;
  gateName: string;
  estimatedWaitTime: number;
  walkTime: number;
  totalTime: number;
  reason: string;
}

export function getGateRecommendation(userSeat: UserSeat): GateRecommendation {
  const snapshot = crowdSimulator.getSnapshot();
  const sectionStart = userSeat.section.charAt(0).toUpperCase();
  let baseGateId = 'g-A';
  if (sectionStart === 'S') baseGateId = 'g-B';
  else if (sectionStart === 'E') baseGateId = 'g-C';
  else if (sectionStart === 'W') baseGateId = 'g-D';

  let bestGate = snapshot.gates[0];
  let bestScore = Infinity;
  let walkTimeForBest = 0;

  for (const gate of snapshot.gates) {
    const walkTime = gate.id === baseGateId ? 5 : 15;
    const score = gate.waitTime + walkTime;
    
    if (score < bestScore) {
      bestScore = score;
      bestGate = gate;
      walkTimeForBest = walkTime;
    }
  }

  return {
    gateId: bestGate.id,
    gateName: bestGate.name,
    estimatedWaitTime: bestGate.waitTime,
    walkTime: walkTimeForBest,
    totalTime: bestScore,
    reason: bestGate.id === baseGateId 
      ? 'Closest gate to your section with reasonable wait time.' 
      : 'Redirected to a faster gate due to high traffic at your closest gate.'
  };
}

export function getRouteEstimate(from: string, to: string): number {
  const combined = from + to;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash += combined.charCodeAt(i);
  }
  return 2 + (hash % 19);
}
