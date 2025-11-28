import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { SimulationState, SimulationPhase, InterviewChoice, FactorCategorization, Badge } from '@/types/simulation';
import { SIMULATION_CONFIG } from '@/config/simulation-config';
import { scorm } from '@/lib/scorm';

interface SimulationContextType {
  state: SimulationState;
  advancePhase: (phase: SimulationPhase) => void;
  recordInterviewChoice: (choice: InterviewChoice) => void;
  recordFactorCategorization: (categorizations: FactorCategorization[]) => void;
  submitArgument: (text: string, rubricScore: number) => void;
  submitReflection: (text: string) => void;
  resetSimulation: () => void;
  calculateFinalScore: () => number;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

const initialState: SimulationState = {
  currentPhase: 'start',
  scores: {
    culturalSensitivity: 0,
    legalAnalysis: 0,
    argumentQuality: 0,
    total: 0,
  },
  interviewChoices: [],
  factorCategorizations: [],
  argumentText: '',
  badges: [],
  reflection: '',
};

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<SimulationState>(initialState);

  // Initialize SCORM and restore state on mount
  useEffect(() => {
    scorm.initialize();
    const suspendData = scorm.getSuspendData();
    
    if (suspendData) {
      try {
        const savedState = JSON.parse(suspendData);
        setState(savedState);
      } catch (error) {
        console.error('Failed to parse suspend data:', error);
      }
    }
  }, []);

  // Save progress to SCORM whenever state changes
  useEffect(() => {
    if (state.currentPhase !== 'start') {
      const suspendData = JSON.stringify(state);
      scorm.setSuspendData(suspendData);
    }
  }, [state]);

  const advancePhase = useCallback((phase: SimulationPhase) => {
    setState(prev => ({ ...prev, currentPhase: phase }));
  }, []);

  const recordInterviewChoice = useCallback((choice: InterviewChoice) => {
    setState(prev => ({
      ...prev,
      interviewChoices: [...prev.interviewChoices, choice],
      scores: {
        ...prev.scores,
        culturalSensitivity: prev.scores.culturalSensitivity + choice.points,
      },
    }));
  }, []);

  const recordFactorCategorization = useCallback((categorizations: FactorCategorization[]) => {
    const score = categorizations.reduce((total, cat) => {
      return total + (cat.isCorrect ? SIMULATION_CONFIG.scoring.factorPointsCorrect : SIMULATION_CONFIG.scoring.factorPointsIncorrect);
    }, 0);

    setState(prev => ({
      ...prev,
      factorCategorizations: categorizations,
      scores: {
        ...prev.scores,
        legalAnalysis: Math.max(0, score),
      },
    }));
  }, []);

  const submitArgument = useCallback((text: string, rubricScore: number) => {
    setState(prev => ({
      ...prev,
      argumentText: text,
      scores: {
        ...prev.scores,
        argumentQuality: rubricScore,
      },
    }));
  }, []);

  const submitReflection = useCallback((text: string) => {
    setState(prev => ({ ...prev, reflection: text }));
    // Mark simulation as complete in SCORM
    scorm.setComplete();
  }, []);

  const calculateFinalScore = useCallback((): number => {
    const { culturalSensitivity, legalAnalysis, argumentQuality } = state.scores;
    const weights = SIMULATION_CONFIG.scoring;
    
    // Normalize scores to 100 scale
    const normalizedCultural = Math.min(100, (culturalSensitivity / 20) * 100);
    const normalizedLegal = Math.min(100, (legalAnalysis / 40) * 100);
    const normalizedArgument = Math.min(100, (argumentQuality / 35) * 100);
    
    const total = 
      normalizedCultural * weights.culturalSensitivityWeight +
      normalizedLegal * weights.legalAnalysisWeight +
      normalizedArgument * weights.argumentQualityWeight;
    
    // Calculate badges
    const earnedBadges: Badge[] = SIMULATION_CONFIG.badges.map(badgeConfig => {
      const scoreValue = state.scores[badgeConfig.scoreType];
      return {
        id: badgeConfig.id,
        name: badgeConfig.name,
        description: badgeConfig.description,
        earned: scoreValue >= badgeConfig.threshold,
        icon: badgeConfig.icon,
      };
    });

    const finalScore = Math.round(total);

    setState(prev => ({
      ...prev,
      scores: { ...prev.scores, total: finalScore },
      badges: earnedBadges,
    }));

    // Report score to SCORM
    scorm.setScore(finalScore);

    return finalScore;
  }, [state.scores]);

  const resetSimulation = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <SimulationContext.Provider
      value={{
        state,
        advancePhase,
        recordInterviewChoice,
        recordFactorCategorization,
        submitArgument,
        submitReflection,
        resetSimulation,
        calculateFinalScore,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within SimulationProvider');
  }
  return context;
};
