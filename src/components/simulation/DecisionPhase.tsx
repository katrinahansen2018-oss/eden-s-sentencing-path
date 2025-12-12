import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { useSimulation } from '@/contexts/SimulationContext';
import { CONTENT_PLACEHOLDERS } from '@/config/simulation-config';
import { Scale, Award, RotateCcw, Play, Info } from 'lucide-react';

type DecisionSubPhase = 'pre-video' | 'video' | 'reflection' | 'summary';

export const DecisionPhase = () => {
  const { state, calculateFinalScore, submitReflection, resetSimulation } = useSimulation();
  const [subPhase, setSubPhase] = useState<DecisionSubPhase>('pre-video');
  const [finalScore, setFinalScore] = useState(0);
  const [comparisonReflection, setComparisonReflection] = useState('');
  const [finalReflectionText, setFinalReflectionText] = useState('');
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

  const outcome = getOutcome();

  const handleReflectionSubmit = () => {
    submitReflection(finalReflectionText);
    setSimulationComplete(true);
  };

  // Pre-video framing screen
  if (subPhase === 'pre-video') {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-serif font-semibold">Judge's Reasons for Sentence</h1>
            <p className="text-muted-foreground">R. v. Littlecrow</p>
          </div>

          <Card className="shadow-medium">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Scale className="w-5 h-5 text-primary" />
                </div>
                <CardTitle>Prepare to Watch the Court's Decision</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-foreground/90">
                Your principal has now made submissions to the court based on the full record in R. v. Littlecrow. You will now watch the actual reasons for sentence delivered by the judge.
              </p>
              
              <p className="text-sm leading-relaxed text-foreground/90">
                The judge's decision is not affected by the memo you drafted in this simulation. As you watch, compare the judge's reasoning with your own analysis of:
              </p>
              
              <ul className="text-sm space-y-2 ml-4 list-disc text-foreground/90">
                <li>Aggravating and mitigating factors</li>
                <li>Gladue and Ipeelee factors</li>
                <li>The final sentence imposed</li>
              </ul>
            </CardContent>
          </Card>

          <Alert className="border-muted bg-muted/30">
            <Info className="h-4 w-4 text-muted-foreground" />
            <AlertDescription className="text-xs text-muted-foreground">
              The judge's decision in this video is based on the real case record, not dynamically generated from your individual responses in the simulation.
            </AlertDescription>
          </Alert>

          <Button
            onClick={() => setSubPhase('video')}
            size="lg"
            className="w-full"
          >
            <Play className="w-4 h-4 mr-2" />
            Watch Judge's Decision
          </Button>
        </div>
      </div>
    );
  }

  // Video screen with recap
  if (subPhase === 'video') {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-serif font-semibold">Judge's Decision Video</h1>
            <p className="text-muted-foreground">R. v. Littlecrow – Reasons for Sentence</p>
          </div>

          <Card className="shadow-medium">
            <CardContent className="pt-6">
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/EYexYD_VMjw?start=8"
                  title="Judge's Decision - R. v. Littlecrow"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Summary of the Judge's Decision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-foreground/90">
                In this decision, the judge reviews the aggravating and mitigating factors in Eden Littlecrow's case, including the domestic violence incident involving a box cutter, her prior record, and the reconciliation with her partner. The judge applies s. 718 and s. 718.2, including Gladue and Ipeelee principles, to assess Eden's moral culpability. The judge imposes a 12-month conditional sentence order (CSO) followed by 12 months of probation, with conditions such as no alcohol, community service, curfew, and programming.
              </p>
            </CardContent>
          </Card>

          <Button
            onClick={() => setSubPhase('reflection')}
            size="lg"
            className="w-full"
          >
            Continue to Reflection
          </Button>
        </div>
      </div>
    );
  }

  // Post-video reflection screen
  if (subPhase === 'reflection') {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-serif font-semibold">Compare Your Analysis to the Court's Decision</h1>
            <p className="text-muted-foreground">Reflection Exercise</p>
          </div>

          <Card className="bg-secondary/10 border-secondary/30">
            <CardContent className="pt-6">
              <p className="text-sm leading-relaxed">
                You have now seen how the judge in R. v. Littlecrow applied sentencing principles, including Gladue and Ipeelee, to Eden's case. Take a moment to compare your own memorandum to your principal with the judge's reasons.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Reflection Prompt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-foreground/90 leading-relaxed">
                In 3–5 sentences, describe:
              </p>
              <ul className="text-sm space-y-2 ml-4 list-disc text-foreground/90">
                <li>One way in which your analysis or recommendation was similar to the judge's reasons; and</li>
                <li>One way in which it was different, or something the judge emphasized that you did not.</li>
              </ul>
              
              <Textarea
                value={comparisonReflection}
                onChange={(e) => setComparisonReflection(e.target.value)}
                placeholder="Write your comparison reflection here..."
                className="min-h-[150px]"
                aria-label="Comparison reflection text"
              />

              <p className="text-xs text-muted-foreground italic">
                This reflection is for your own learning and is not scored.
              </p>
            </CardContent>
          </Card>

          <Button
            onClick={() => setSubPhase('summary')}
            size="lg"
            className="w-full"
          >
            Finish Simulation
          </Button>
        </div>
      </div>
    );
  }

  // Final summary/score/badge screen
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-serif font-semibold">Simulation Complete</h1>
          <p className="text-muted-foreground">Your Performance Summary</p>
        </div>

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

        {!simulationComplete ? (
          <Card>
            <CardHeader>
              <CardTitle>Professional Reflection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-foreground/90 leading-relaxed">
                {CONTENT_PLACEHOLDERS.reflectionQuestion}
              </p>
              
              <Textarea
                value={finalReflectionText}
                onChange={(e) => setFinalReflectionText(e.target.value)}
                placeholder="Your reflection..."
                className="min-h-[200px]"
                aria-label="Final reflection text"
              />

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleReflectionSubmit}
                  size="lg"
                  className="flex-1"
                >
                  Submit & Complete
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
        ) : (
          <Card className="bg-success/10 border-success">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-2xl font-serif font-semibold">Thank You!</h3>
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
        )}
      </div>
    </div>
  );
};