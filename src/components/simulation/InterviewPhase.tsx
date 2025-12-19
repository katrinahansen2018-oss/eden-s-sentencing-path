import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSimulation } from '@/contexts/SimulationContext';
import { INTERVIEW_QUESTIONS } from '@/config/simulation-config';
import { CheckCircle2, XCircle } from 'lucide-react';

const INTERVIEW_VIDEOS = [
  'https://www.youtube.com/embed/vfvLH2bCYGs',
  'https://www.youtube.com/embed/EAqfoFvDQxs',
];

export const InterviewPhase = () => {
  const { recordInterviewChoice, advancePhase } = useSimulation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState<{ text: string; points: number } | null>(null);

  const currentQuestion = INTERVIEW_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === INTERVIEW_QUESTIONS.length - 1;

  const handleSubmitChoice = () => {
    const option = currentQuestion.options.find(opt => opt.id === selectedOption);
    if (!option) return;

    recordInterviewChoice({
      questionId: currentQuestion.id,
      selectedOption: selectedOption,
      points: option.points,
    });

    setCurrentFeedback({
      text: option.feedback,
      points: option.points,
    });
    setShowFeedback(true);
  };

  const handleContinue = () => {
    if (isLastQuestion) {
      advancePhase('analysis');
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption('');
      setShowFeedback(false);
      setCurrentFeedback(null);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-serif font-semibold">Client Interview</h1>
          <p className="text-muted-foreground">Meeting with Eden Littlecrow</p>
        </div>

        <Card className="shadow-medium bg-card/50">
          <CardHeader>
            <CardTitle>Interview Recording - Eden Littlecrow</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              The video will pause at key moments for you to respond
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                className="w-full h-full"
                src={INTERVIEW_VIDEOS[currentQuestionIndex] || INTERVIEW_VIDEOS[0]}
                title={`Client Interview - Question ${currentQuestionIndex + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="flex gap-1">
                {INTERVIEW_QUESTIONS.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full ${
                      idx < currentQuestionIndex ? 'bg-success' :
                      idx === currentQuestionIndex ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
              <span>Question {currentQuestionIndex + 1} of {INTERVIEW_QUESTIONS.length}</span>
            </div>
          </CardContent>
        </Card>

        {!showFeedback ? (
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
                {currentQuestion.options.map(option => (
                  <div key={option.id} className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-accent/5 transition-colors">
                    <RadioGroupItem value={option.id} id={option.id} className="mt-0.5" />
                    <Label htmlFor={option.id} className="flex-1 cursor-pointer text-sm leading-relaxed">
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <Button
                onClick={handleSubmitChoice}
                disabled={!selectedOption}
                className="w-full"
              >
                Submit Response
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Alert className={currentFeedback!.points > 0 ? 'border-success bg-success/5' : 'border-destructive bg-destructive/5'}>
            <div className="flex items-start gap-3">
              {currentFeedback!.points > 0 ? (
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
              ) : (
                <XCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1 space-y-3">
                <AlertDescription className="text-sm leading-relaxed">
                  {currentFeedback!.text}
                </AlertDescription>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold">Cultural Sensitivity:</span>
                  <span className={currentFeedback!.points > 0 ? 'text-success' : 'text-destructive'}>
                    {currentFeedback!.points > 0 ? '+' : ''}{currentFeedback!.points} points
                  </span>
                </div>
                <Button onClick={handleContinue} className="w-full sm:w-auto">
                  {isLastQuestion ? 'Continue to Legal Analysis' : 'Continue Interview'}
                </Button>
              </div>
            </div>
          </Alert>
        )}
      </div>
    </div>
  );
};
