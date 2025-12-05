import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSimulation } from '@/contexts/SimulationContext';
import { RUBRIC_CRITERIA, SIMULATION_CONFIG } from '@/config/simulation-config';
import { FileEdit, CheckCircle2, Circle, UserCheck } from 'lucide-react';

export const ArgumentPhase = () => {
  const { submitArgument, advancePhase } = useSimulation();
  const [argumentText, setArgumentText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showPrincipalFeedback, setShowPrincipalFeedback] = useState(false);
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

  const handleContinueToPrincipalFeedback = () => {
    setShowPrincipalFeedback(true);
  };

  const totalPossible = RUBRIC_CRITERIA.reduce((sum, c) => sum + c.points, 0);
  const earnedScore = rubricResults.reduce((sum, r) => sum + (r.met ? r.criterion.points : 0), 0);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-serif font-semibold">Sentencing Memorandum for Review</h1>
          <p className="text-muted-foreground">Draft Your Argument for Eden Littlecrow</p>
        </div>

        <Card className="bg-secondary/10 border-secondary/30">
          <CardContent className="pt-6">
            <p className="text-sm leading-relaxed">
              Based on your interview with Eden and your analysis of the sentencing factors, draft a sentencing memorandum to your supervising lawyer (principal). Your memo should explain how Eden's Indigenous background engages Gladue principles, reference the relevant Criminal Code sentencing provisions, and recommend an appropriate sentence. You are not addressing the court directly. You are advising your principal and justifying your proposed approach.
            </p>
          </CardContent>
        </Card>

        {!submitted ? (
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileEdit className="w-5 h-5" />
                Your Sentencing Memorandum to Principal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  value={argumentText}
                  onChange={(e) => setArgumentText(e.target.value)}
                  placeholder="Dear [Principal's Name],

Re: R. v. Littlecrow – Sentencing Submissions

Based on my interview with Ms. Littlecrow and review of the disclosure, I recommend..."
                  className="min-h-[400px] font-sans text-sm leading-relaxed"
                  aria-label="Sentencing memorandum text"
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
                  <strong>Tips:</strong> In your memo to your principal, reference s. 718.2(e) and Gladue principles. Discuss Eden's background including intergenerational trauma. Recommend a culturally appropriate sentence. Consider restorative approaches and explain your reasoning.
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleSubmit}
                disabled={!isValidLength}
                size="lg"
                className="w-full"
              >
                Submit Memorandum
              </Button>
            </CardContent>
          </Card>
        ) : !showPrincipalFeedback ? (
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
              onClick={handleContinueToPrincipalFeedback}
              size="lg"
              className="w-full"
            >
              Continue to Principal's Feedback
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Card className="border-secondary bg-secondary/5">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-secondary" />
                  </div>
                  <CardTitle>Principal's Feedback on Your Draft</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-foreground/90">
                  Thank you for this draft. You identified several important Gladue and mitigating factors and proposed a sentence that considers Ms. Littlecrow's Indigenous background and rehabilitation. In a final version, I would like to see an even clearer connection between the facts you describe and the specific wording of s. 718 and s. 718.2(e), and a more explicit explanation of why your recommended sentence advances both reconciliation and public safety. I will refine this draft and present the final submissions to the court.
                </p>
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