import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSimulation } from '@/contexts/SimulationContext';
import { FileText, User } from 'lucide-react';

export const IntroductionPhase = () => {
  const { advancePhase } = useSimulation();

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-serif font-semibold">The Case: R. v. Littlecrow</h1>
          <p className="text-muted-foreground">Sentencing Hearing</p>
        </div>

        <Card className="shadow-medium">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                <User className="w-5 h-5 text-secondary-foreground" />
              </div>
              <CardTitle className="text-2xl">Your Client: Eden Littlecrow</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose prose-sm max-w-none space-y-4">
              <p className="text-foreground/90 leading-relaxed">
                You are counsel for Eden Littlecrow, a 28-year-old Indigenous woman from Treaty 6 territory who has pleaded guilty to assault causing bodily harm (s. 267(b) Criminal Code).
              </p>
              
              <div>
                <p className="font-bold text-primary mb-1">Background</p>
                <p className="text-foreground/90 leading-relaxed">
                  Eden grew up on reserve. Both her parents attended residential school. She has struggled with substance use and has a criminal record with four prior entries, including two that involve violence or the capacity for violence. There has been a ten-year gap since those earlier offences.
                </p>
              </div>
              
              <div>
                <p className="font-bold text-primary mb-1">The Incident</p>
                <p className="text-foreground/90 leading-relaxed">
                  On October 31, after a night of celebration, Eden and her common-law partner were walking home. Eden's phone stopped working, so she borrowed her partner's phone and saw what she believed to be evidence of infidelity. An argument began and quickly escalated. Eden produced a box cutter and slashed at her partner, causing a two-inch cut on his forearm that required approximately 20 stitches. Both had been drinking. Eden fled the scene before police arrived and later fled again when officers located her near their home.
                </p>
              </div>
              
              <div>
                <p className="font-bold text-primary mb-1">Family Context</p>
                <p className="text-foreground/90 leading-relaxed">
                  The couple has reconciled to some degree and they share a young daughter, who depends on both parents.
                </p>
              </div>
              
              <div>
                <p className="font-bold text-primary mb-1">Your Role</p>
                <p className="text-foreground/90 leading-relaxed">
                  As Eden's lawyer, you must prepare a sentencing memorandum that considers s. 718.2(e) and Gladue principles, which require courts to pay particular attention to the circumstances of Indigenous offenders.
                </p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-2">
                <FileText className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                  <p className="font-semibold text-sm">Key Legal Provisions</p>
                  <ul className="text-sm text-foreground/80 space-y-1">
                    <li><span className="font-medium">s. 267(b):</span> Assault causing bodily harm</li>
                    <li><span className="font-medium">s. 718:</span> Purposes and principles of sentencing</li>
                    <li><span className="font-medium">s. 718.2(e):</span> Particular attention to circumstances of Aboriginal offenders (Gladue principles)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-accent pl-4 py-2">
              <p className="text-sm italic text-foreground/80">
                "All available sanctions, other than imprisonment, that are reasonable in the circumstances and consistent with the harm done to victims or to the community should be considered for all offenders, with particular attention to the circumstances of Aboriginal offenders."
              </p>
              <p className="text-xs text-muted-foreground mt-1">— Criminal Code, s. 718.2(e)</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3">Your Task</h3>
            <p className="text-sm text-foreground/90 leading-relaxed mb-4">
              As Eden's counsel, you will interview her, analyze the relevant sentencing factors, and prepare a submission that addresses her Indigenous background and circumstances under Gladue principles. Your approach will impact the sentencing outcome and demonstrate your understanding of culturally competent legal practice.
            </p>
            <Button 
              onClick={() => advancePhase('interview')} 
              size="lg"
              className="w-full sm:w-auto"
            >
              Proceed to Client Interview
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
