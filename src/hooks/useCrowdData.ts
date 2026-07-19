import { useState, useEffect, useCallback } from 'react';
import { crowdSimulator, type CrowdSnapshot, getGateRecommendation, type UserSeat, type GateRecommendation } from '@/services/crowdSimulator';

export interface UseCrowdDataReturn {
  zones: CrowdSnapshot['zones'];
  gates: CrowdSnapshot['gates'];
  recommendations: GateRecommendation | null;
  isLive: boolean;
  getRecommendationForSeat: (seat: UserSeat) => void;
}

export function useCrowdData(): UseCrowdDataReturn {
  const [snapshot, setSnapshot] = useState<CrowdSnapshot>(() => crowdSimulator.getSnapshot());
  const [isLive, setIsLive] = useState(false);
  const [recommendations, setRecommendations] = useState<GateRecommendation | null>(null);
  const [currentSeat, setCurrentSeat] = useState<UserSeat | null>(null);

  useEffect(() => {
    crowdSimulator.start();
    setIsLive(true);

    const handleUpdate = (newSnapshot: CrowdSnapshot) => {
      setSnapshot(newSnapshot);
    };

    const unsubscribe = crowdSimulator.subscribe(handleUpdate);

    return () => {
      unsubscribe();
      crowdSimulator.stop();
      setIsLive(false);
    };
  }, []);

  useEffect(() => {
    if (currentSeat) {
      setRecommendations(getGateRecommendation(currentSeat));
    }
  }, [snapshot, currentSeat]);

  const getRecommendationForSeat = useCallback((seat: UserSeat) => {
    setCurrentSeat(seat);
    setRecommendations(getGateRecommendation(seat));
  }, []);

  return {
    zones: snapshot.zones,
    gates: snapshot.gates,
    recommendations,
    isLive,
    getRecommendationForSeat,
  };
}
