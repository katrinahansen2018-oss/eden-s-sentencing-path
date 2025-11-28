import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSimulation } from '@/contexts/SimulationContext';
import { RUBRIC_CRITERIA, SIMULATION_CONFIG, CONTENT_PLACEHOLDERS } from '@/config/simulation-config';
import { FileEdit, CheckCircle2, Circle } from 'lucide-react';

export const ArgumentPhase = () => {
  const { submitArgument, advancePhase } = useSimulation();
  const [argumentText, setArgumentText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [rubricResults, setRubricResults] = useState<Array<{ criterion: typeof RUBRIC_CRITERIA[0]; met: boolean }>>([]);

  const wordCount = argumentText.trim().split(/\s+/).filter(Boolean).length;
  const { minWords, maxWords } = SIMULATION_CONFIG.argumentLimits;
  const isValidLength = wordCount >= minWords && wordCount <= maxWords;

  const handleSubmit = () => {
    const lowerText = argumentText.toLowerCase();
    
    const results = RUBRIC_CRITERIA.map(criterion => ({
      criterion,
      met: criterion.keywords.some(keyword => lowerText.includes(keyword.toLowerCase())),
    }));

    const totalScore = results.reduce((sum, result) => sum + (result.met ? result.criterion.points : 0), 0);

    setRubricResults(results);
    submitArgument(argumentText, totalScore);
    setSubmitted(true);
  };

  const totalPossible = RUBRIC_CRITERIA.reduce((sum, c) => sum + c.points, 0);
  const earnedScore = rubricResults.reduce((sum, r) => sum + (r.met ? r.criterion.points : 0), 0);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-serif font-semibold">Sentencing Submission</h1>
          <p className="text-muted-foreground">Draft Your Argument for Eden Littlecrow</p>
        </div>

        <Card className="bg-secondary/10 border-secondary/30">
          <CardContent className="pt-6">
            <p className="text-sm leading-relaxed">
              Based on your interview with Eden and your analysis of the sentencing factors, draft a sentencing submission that addresses her Indigenous background and applies Gladue principles. Your submission should reference relevant Criminal Code provisions and propose an appropriate sentence.
            </p>
          </CardContent>
        </Card>

        {!submitted ? (
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileEdit className="w-5 h-5" />
                Your Sentencing Submission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  value={argumentText}
                  onChange={(e) => setArgumentText(e.target.value)}
                  placeholder="Your Honour, on behalf of my client Eden Littlecrow, I submit that..."
                  className="min-h-[400px] font-sans text-sm leading-relaxed"
                  aria-label="Sentencing submission text"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    Word count: {wordCount} ({minWords}-{maxWords} words required)
                  </span>
                  <span className={isValidLength ? 'text-success' : 'text-warning'}>
                    {isValidLength ? '✓ Valid length' : 'Outside required range'}
                  </span>
                </div>
              </div>

              <Alert>
                <AlertDescription className="text-xs">
                  <strong>Tips:</strong> Reference s. 718.2(e) and Gladue principles. Discuss Eden's background including intergenerational trauma. Propose a culturally appropriate sentence. Consider restorative approaches.
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleSubmit}
                disabled={!isValidLength}
                size="lg"
                className="w-full"
              >
                Submit Argument
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <Card className="border-primary bg-primary/5">
              <CardHeader>
                <CardTitle>Rubric Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-4">
                  <div className="text-4xl font-bold text-primary">{earnedScore}/{totalPossible}</div>
                  <div className="text-sm text-muted-foreground">Points Earned</div>
                </div>

                <div className="space-y-3">
                  {rubricResults.map((result, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border bg-card">
                      {result.met ? (
                        <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{result.criterion.name}</p>
                          <span className="text-xs font-semibold">
                            {result.met ? result.criterion.points : 0}/{result.criterion.points}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{result.criterion.feedback}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={() => advancePhase('decision')}
              size="lg"
              className="w-full"
            >
              Proceed to Sentencing Decision
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
