import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Scale } from "lucide-react";
import { useSimulation } from "@/contexts/SimulationContext";
import { SIMULATION_CONFIG, CONTENT_PLACEHOLDERS } from "@/config/simulation-config";

export const StartScreen = () => {
  const { advancePhase } = useSimulation();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full shadow-medium">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Scale className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-4xl font-serif">{SIMULATION_CONFIG.title}</CardTitle>
          <CardDescription className="text-lg">
            An Interactive Learning Experience in Indigenous Criminal Law
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Alert className="border-warning bg-warning/5">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <AlertDescription className="text-sm leading-relaxed">
              {CONTENT_PLACEHOLDERS.sensitivityNotice}
            </AlertDescription>
          </Alert>

          <div className="space-y-4 text-foreground/90">
            <h3 className="font-semibold text-lg">Learning Objectives</h3>
            <ul className="space-y-2 list-disc list-inside text-sm">
              <li>Practice trauma-informed, and grounded in respect for identity and lived experiences</li>
              <li>Identify and apply Gladue principles under s. 718.2(e) of the Criminal Code</li>
              <li>Distinguish between Gladue factors, aggravating factors, and mitigating factors</li>
              <li>Draft a sentencing submission incorporating Indigenous perspectives</li>
              <li>Understand how legal decisions impact reconciliation and justice</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">What to Expect</h3>
            <div className="grid gap-3 text-sm">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center font-semibold text-secondary-foreground">
                  1
                </div>
                <div>
                  <p className="font-medium">Client Interview</p>
                  <p className="text-muted-foreground">
                    Meet Eden and make choices informed by her background and lived experiences
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center font-semibold text-secondary-foreground">
                  2
                </div>
                <div>
                  <p className="font-medium">Legal Analysis</p>
                  <p className="text-muted-foreground">Categorize sentencing factors correctly</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center font-semibold text-secondary-foreground">
                  3
                </div>
                <div>
                  <p className="font-medium">Draft Submission</p>
                  <p className="text-muted-foreground">Apply Gladue principles in written advocacy</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center font-semibold text-secondary-foreground">
                  4
                </div>
                <div>
                  <p className="font-medium">Sentencing & Reflection</p>
                  <p className="text-muted-foreground">See the impact of your decisions</p>
                </div>
              </div>
            </div>
          </div>

          <Button onClick={() => advancePhase("introduction")} size="lg" className="w-full">
            Begin Simulation
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            This simulation is non-graded and designed for experiential learning
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
