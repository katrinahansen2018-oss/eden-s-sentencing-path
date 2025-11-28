import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSimulation } from '@/contexts/SimulationContext';
import { LEGAL_FACTORS } from '@/config/simulation-config';
import { FactorCategorization } from '@/types/simulation';
import { FileText, CheckCircle2, XCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

type Category = 'gladue' | 'aggravating' | 'mitigating';

export const AnalysisPhase = () => {
  const { recordFactorCategorization, advancePhase } = useSimulation();
  const [assignments, setAssignments] = useState<Record<string, Category | null>>(
    LEGAL_FACTORS.reduce((acc, factor) => ({ ...acc, [factor.id]: null }), {})
  );
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<FactorCategorization[]>([]);

  const handleAssignment = (factorId: string, category: Category) => {
    setAssignments(prev => ({ ...prev, [factorId]: category }));
  };

  const handleSubmit = () => {
    const categorizations: FactorCategorization[] = LEGAL_FACTORS.map(factor => ({
      factorId: factor.id,
      selectedCategory: assignments[factor.id]!,
      correctCategory: factor.correctCategory,
      isCorrect: assignments[factor.id] === factor.correctCategory,
    }));

    setResults(categorizations);
    recordFactorCategorization(categorizations);
    setSubmitted(true);
  };

  const allAssigned = Object.values(assignments).every(val => val !== null);
  const correctCount = results.filter(r => r.isCorrect).length;

  const categoryLabels: Record<Category, string> = {
    gladue: 'Gladue Factors',
    aggravating: 'Aggravating Factors',
    mitigating: 'Mitigating Factors',
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-serif font-semibold">Legal Analysis</h1>
          <p className="text-muted-foreground">Categorize Sentencing Factors</p>
        </div>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-semibold text-accent">Gladue Factors:</span> Circumstances specific to Indigenous offenders that courts must consider under s. 718.2(e), including systemic and background factors.
              </div>
              <div>
                <span className="font-semibold text-destructive">Aggravating Factors:</span> Circumstances that increase the seriousness of the offense.
              </div>
              <div>
                <span className="font-semibold text-success">Mitigating Factors:</span> General circumstances that reduce moral culpability or support leniency.
              </div>
            </div>
          </CardContent>
        </Card>

        {!submitted ? (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Factors to Categorize
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {LEGAL_FACTORS.map(factor => (
                  <div key={factor.id} className="p-4 border rounded-lg space-y-3 bg-card hover:bg-accent/5 transition-colors">
                    <p className="text-sm font-medium">{factor.text}</p>
                    <div className="flex flex-wrap gap-2">
                      {(['gladue', 'aggravating', 'mitigating'] as Category[]).map(category => (
                        <Button
                          key={category}
                          size="sm"
                          variant={assignments[factor.id] === category ? 'default' : 'outline'}
                          onClick={() => handleAssignment(factor.id, category)}
                          className="text-xs"
                        >
                          {categoryLabels[category]}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Button
              onClick={handleSubmit}
              disabled={!allAssigned}
              size="lg"
              className="w-full"
            >
              Submit Categorization
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Alert className="border-primary bg-primary/5">
              <AlertDescription className="text-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Results:</span>
                  <span>{correctCount} / {LEGAL_FACTORS.length} correct</span>
                </div>
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle>Factor Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {LEGAL_FACTORS.map((factor, idx) => {
                  const result = results[idx];
                  return (
                    <div key={factor.id} className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-start gap-2">
                        {result.isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{factor.text}</p>
                          {!result.isCorrect && (
                            <p className="text-xs text-muted-foreground">
                              Your answer: {categoryLabels[result.selectedCategory]} → 
                              Correct: {categoryLabels[result.correctCategory]}
                            </p>
                          )}
                          <p className="text-xs text-foreground/80 italic leading-relaxed">
                            {factor.rationale}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Button
              onClick={() => advancePhase('argument')}
              size="lg"
              className="w-full"
            >
              Continue to Draft Submission
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
