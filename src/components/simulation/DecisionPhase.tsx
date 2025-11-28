import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { useSimulation } from '@/contexts/SimulationContext';
import { CONTENT_PLACEHOLDERS } from '@/config/simulation-config';
import { Scale, Award, RotateCcw } from 'lucide-react';

export const DecisionPhase = () => {
  const { state, calculateFinalScore, submitReflection, resetSimulation } = useSimulation();
  const [finalScore, setFinalScore] = useState(0);
  const [reflectionText, setReflectionText] = useState('');
  const [showReflection, setShowReflection] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);

  useEffect(() => {
    const score = calculateFinalScore();
    setFinalScore(score);
  }, [calculateFinalScore]);

  const getOutcome = () => {
    if (finalScore >= 75) return { level: 'high', text: CONTENT_PLACEHOLDERS.outcomeSummaries.high };
    if (finalScore >= 50) return { level: 'medium', text: CONTENT_PLACEHOLDERS.outcomeSummaries.medium };
    return { level: 'low', text: CONTENT_PLACEHOLDERS.outcomeSummaries.low };
  };

  const getJudgeScript = () => {
    return finalScore >= 60 ? CONTENT_PLACEHOLDERS.judgeScripts.high : CONTENT_PLACEHOLDERS.judgeScripts.low;
  };

  const outcome = getOutcome();
  const judgeScript = getJudgeScript();

  const handleReflectionSubmit = () => {
    submitReflection(reflectionText);
    setSimulationComplete(true);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-serif font-semibold">Sentencing Decision</h1>
          <p className="text-muted-foreground">The Court's Ruling</p>
        </div>

        <Card className="shadow-medium">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Scale className="w-5 h-5 text-primary" />
              </div>
              <CardTitle>Judge's Reasons for Sentence</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-border mb-4">
              <div className="text-center space-y-3 p-6">
                <Scale className="w-12 h-12 mx-auto text-muted-foreground/50" />
                <p className="text-xs text-muted-foreground">[Video placeholder: Judge delivering sentence]</p>
              </div>
            </div>
            
            <div className="bg-card border rounded-lg p-4">
              <p className="text-sm leading-relaxed italic text-foreground/90">
                {judgeScript}
              </p>
            </div>
          </CardContent>
        </Card>

        <Alert className={
          outcome.level === 'high' ? 'border-success bg-success/5' :
          outcome.level === 'medium' ? 'border-warning bg-warning/5' :
          'border-destructive bg-destructive/5'
        }>
          <AlertDescription className="text-sm leading-relaxed">
            {outcome.text}
          </AlertDescription>
        </Alert>

        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Your Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">{finalScore}</div>
              <div className="text-sm text-muted-foreground">Overall Score (out of 100)</div>
            </div>

            <div className="grid gap-3">
              <div className="flex justify-between items-center p-3 bg-card rounded-lg border">
                <span className="text-sm font-medium">Cultural Sensitivity</span>
                <span className="text-sm font-bold">{state.scores.culturalSensitivity} pts</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-card rounded-lg border">
                <span className="text-sm font-medium">Legal Analysis</span>
                <span className="text-sm font-bold">{state.scores.legalAnalysis} pts</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-card rounded-lg border">
                <span className="text-sm font-medium">Argument Quality</span>
                <span className="text-sm font-bold">{state.scores.argumentQuality} pts</span>
              </div>
            </div>

            {state.badges.some(b => b.earned) && (
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Badges Earned</h4>
                <div className="flex flex-wrap gap-2">
                  {state.badges
                    .filter(badge => badge.earned)
                    .map(badge => (
                      <Badge key={badge.id} variant="secondary" className="py-2 px-3">
                        <span className="mr-1">{badge.icon}</span>
                        {badge.name}
                      </Badge>
                    ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {!showReflection ? (
          <Button
            onClick={() => setShowReflection(true)}
            size="lg"
            className="w-full"
          >
            Continue to Reflection
          </Button>
        ) : simulationComplete ? (
          <Card className="bg-success/10 border-success">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-2xl font-serif font-semibold">Simulation Complete!</h3>
                <p className="text-muted-foreground">
                  Thank you for completing the R. v. Littlecrow sentencing simulation. Your reflection has been recorded.
                </p>
                <Button
                  onClick={() => resetSimulation()}
                  variant="outline"
                  size="lg"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restart Simulation
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Professional Reflection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-foreground/90 leading-relaxed">
                {CONTENT_PLACEHOLDERS.reflectionQuestion}
              </p>
              
              <Textarea
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                placeholder="Your reflection..."
                className="min-h-[200px]"
                aria-label="Reflection text"
              />

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleReflectionSubmit}
                  size="lg"
                  className="flex-1"
                >
                  Complete Simulation
                </Button>
                <Button
                  onClick={() => resetSimulation()}
                  variant="outline"
                  size="lg"
                  className="flex-1"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restart Simulation
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
