export type SimulationPhase = 'start' | 'introduction' | 'interview' | 'analysis' | 'argument' | 'decision' | 'reflection';

export interface ScoreBreakdown {
  culturalSensitivity: number;
  legalAnalysis: number;
  argumentQuality: number;
  total: number;
}

export interface InterviewChoice {
  questionId: string;
  selectedOption: string;
  points: number;
}

export interface FactorCategorization {
  factorId: string;
  selectedCategory: 'gladue' | 'aggravating' | 'mitigating';
  correctCategory: 'gladue' | 'aggravating' | 'mitigating';
  isCorrect: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  earned: boolean;
  icon?: string;
}

export interface SimulationState {
  currentPhase: SimulationPhase;
  scores: ScoreBreakdown;
  interviewChoices: InterviewChoice[];
  factorCategorizations: FactorCategorization[];
  argumentText: string;
  badges: Badge[];
  reflection: string;
}

export interface MCQOption {
  id: string;
  text: string;
  points: number;
  feedback: string;
}

export interface MCQQuestion {
  id: string;
  pauseTime: number;
  question: string;
  options: MCQOption[];
}

export interface LegalFactor {
  id: string;
  text: string;
  correctCategory: 'gladue' | 'aggravating' | 'mitigating';
  rationale: string;
}

export interface RubricCriterion {
  id: string;
  name: string;
  keywords: string[];
  points: number;
  feedback: string;
}
