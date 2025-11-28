import { useSimulation } from '@/contexts/SimulationContext';
import { StartScreen } from './StartScreen';
import { IntroductionPhase } from './IntroductionPhase';
import { InterviewPhase } from './InterviewPhase';
import { AnalysisPhase } from './AnalysisPhase';
import { ArgumentPhase } from './ArgumentPhase';
import { DecisionPhase } from './DecisionPhase';
import { Progress } from '@/components/ui/progress';
import cpledLogo from '@/assets/cpled-logo.png';

const phaseProgress = {
  start: 0,
  introduction: 10,
  interview: 30,
  analysis: 50,
  argument: 70,
  decision: 90,
  reflection: 100,
};

export const SimulationContainer = () => {
  const { state } = useSimulation();
  const progress = phaseProgress[state.currentPhase];

  return (
    <div className="min-h-screen bg-background">
      {state.currentPhase !== 'start' && (
        <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b shadow-soft">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img src={cpledLogo} alt="CPLED" className="h-8 w-auto" />
                <div>
                  <h2 className="font-serif font-semibold text-sm">R. v. Littlecrow</h2>
                  <p className="text-xs text-muted-foreground">Sentencing Simulation</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Progress</div>
                <div className="text-sm font-semibold">{progress}%</div>
              </div>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        </header>
      )}

      <main>
        {state.currentPhase === 'start' && <StartScreen />}
        {state.currentPhase === 'introduction' && <IntroductionPhase />}
        {state.currentPhase === 'interview' && <InterviewPhase />}
        {state.currentPhase === 'analysis' && <AnalysisPhase />}
        {state.currentPhase === 'argument' && <ArgumentPhase />}
        {(state.currentPhase === 'decision' || state.currentPhase === 'reflection') && <DecisionPhase />}
      </main>
    </div>
  );
};
