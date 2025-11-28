import { MCQQuestion, LegalFactor, RubricCriterion, Badge } from '@/types/simulation';

export const SIMULATION_CONFIG = {
  title: "R. v. Littlecrow - Sentencing Simulation",
  version: "1.0",
  scormVersion: "1.2",
  
  scoring: {
    culturalSensitivityWeight: 0.3,
    legalAnalysisWeight: 0.35,
    argumentQualityWeight: 0.35,
    factorPointsCorrect: 5,
    factorPointsIncorrect: -2,
  },
  
  badges: [
    {
      id: "cultural-champion",
      name: "Cultural Sensitivity Champion",
      description: "Demonstrated exceptional trauma-informed and culturally sensitive approach",
      threshold: 18,
      scoreType: "culturalSensitivity" as const,
      icon: "🌟"
    },
    {
      id: "gladue-advocate",
      name: "Gladue Advocate",
      description: "Successfully applied Gladue principles in sentencing submission",
      threshold: 10,
      scoreType: "argumentQuality" as const,
      icon: "⚖️"
    },
    {
      id: "legal-analyst",
      name: "Legal Analyst",
      description: "Accurately identified and categorized sentencing factors",
      threshold: 25,
      scoreType: "legalAnalysis" as const,
      icon: "📚"
    }
  ] as const,

  argumentLimits: {
    minWords: 200,
    maxWords: 800,
  }
};

export const CONTENT_PLACEHOLDERS = {
  sensitivityNotice: "This simulation addresses topics related to Indigenous experiences in the Canadian criminal justice system, including residential schools, intergenerational trauma, and systemic discrimination. The content is designed for educational purposes to help legal professionals develop culturally competent practice.",
  
  introText: `You are counsel for Eden Littlecrow, a 28-year-old Indigenous woman from Treaty 6 territory who has pleaded guilty to assault causing bodily harm (s. 267(b) Criminal Code) and breach of probation (s. 88(1) Criminal Code).

**Background:** Eden grew up on reserve. Both her parents attended residential school. She has struggled with substance use and has been involved in the child welfare system. She has two young children who are currently in foster care.

**The Incident:** During an altercation outside a shelter, Eden struck another woman with a bottle, causing significant injuries requiring medical attention.

**Your Role:** As Eden's lawyer, you must prepare a sentencing submission that considers s. 718.2(e) and Gladue principles, which require courts to pay particular attention to the circumstances of Indigenous offenders.`,

  clientVideoUrl: "/placeholder-video.mp4", // Replace with actual video path
  clientCaptions: "/placeholder-captions.vtt", // Replace with actual caption file path
  clientTranscript: "Eden: Thank you for meeting with me. I... I know I made a mistake. I've been trying to get clean, trying to get my kids back. But sometimes everything just feels too hard. My parents, they went through residential school. I never really understood what that meant until I was older. The way they were with us... they didn't know how to show love. And now I'm worried I'm doing the same thing to my kids.",

  judgeScripts: {
    high: "Having reviewed the submissions and considered all relevant factors under s. 718, including the important Gladue principles set out in s. 718.2(e), I am satisfied that defense counsel has presented a thorough and culturally informed analysis. The court recognizes Ms. Littlecrow's background, including intergenerational trauma stemming from her parents' residential school experiences, her efforts toward rehabilitation, and her expressed remorse. While the offense is serious, a conditional sentence order with strict conditions will serve the principles of sentencing while addressing Ms. Littlecrow's rehabilitative needs.",
    
    low: "The court has reviewed the submissions. While I note Ms. Littlecrow's Indigenous background, the defense has not adequately addressed the Gladue factors or provided sufficient context regarding how her circumstances should inform sentencing. The offense involved violence and breach of trust. Without a more comprehensive analysis of rehabilitative options and cultural considerations, I am limited in my ability to consider alternatives to incarceration. Ms. Littlecrow will serve a period of incarceration followed by probation."
  },

  outcomeSummaries: {
    high: "Your culturally informed approach and thorough legal analysis resulted in a positive outcome for Eden. The judge imposed a conditional sentence, allowing Eden to continue her rehabilitation and work toward reunification with her children.",
    
    medium: "Your submission addressed some key elements, but missed opportunities to fully develop the Gladue analysis. The judge imposed a mixed sentence with some rehabilitative conditions.",
    
    low: "Your submission did not adequately address Gladue principles or provide sufficient cultural context. The judge had limited options and imposed a custodial sentence."
  },

  reflectionQuestion: "How did your approach to representing Eden reflect your understanding of reconciliation and the legal profession's obligations to Indigenous peoples? What would you do differently in a real case?"
};

export const INTERVIEW_QUESTIONS: MCQQuestion[] = [
  {
    id: "greeting",
    pauseTime: 5,
    question: "How do you greet Eden?",
    options: [
      {
        id: "respectful",
        text: "Hello Eden, thank you for meeting with me today. I want to make sure I understand your situation and your goals.",
        points: 10,
        feedback: "Excellent. This greeting acknowledges Eden as a person, expresses appreciation, and centers her perspective. Building trust is essential in trauma-informed practice."
      },
      {
        id: "rushed",
        text: "Let's get straight to the facts of your case so we can prepare your submission.",
        points: -5,
        feedback: "This approach may feel transactional and dismissive. Indigenous clients, especially those with trauma histories, need time to build trust and share their stories in a culturally appropriate way."
      }
    ]
  },
  {
    id: "residential-school",
    pauseTime: 45,
    question: "Eden mentions her parents attended residential school. How do you respond?",
    options: [
      {
        id: "acknowledge",
        text: "I appreciate you sharing that with me, Eden. Understanding your family's experiences helps me understand your background and what you've been through.",
        points: 10,
        feedback: "Well done. Acknowledging intergenerational trauma is crucial. Residential schools caused profound harm that affects subsequent generations. This is directly relevant to Gladue analysis."
      },
      {
        id: "dismiss",
        text: "I understand, but let's focus on the facts that are directly relevant to your current charges.",
        points: -10,
        feedback: "This response misses a critical Gladue factor. The Supreme Court has repeatedly emphasized that courts must consider the impact of colonialism, including residential schools, on Indigenous offenders. This background is legally and ethically relevant."
      }
    ]
  }
];

export const LEGAL_FACTORS: LegalFactor[] = [
  {
    id: "residential-school",
    text: "Parents' attendance at residential school",
    correctCategory: "gladue",
    rationale: "Residential school attendance is a key Gladue factor. The intergenerational trauma from residential schools is recognized by courts as relevant background circumstances under s. 718.2(e)."
  },
  {
    id: "child-welfare",
    text: "Involvement with child welfare system",
    correctCategory: "gladue",
    rationale: "The overrepresentation of Indigenous children in child welfare (the 'Sixties Scoop' legacy) is a recognized Gladue factor reflecting systemic discrimination."
  },
  {
    id: "substance-use",
    text: "History of substance use disorder",
    correctCategory: "gladue",
    rationale: "Substance use in Indigenous communities is often linked to trauma, poverty, and lack of access to services - all Gladue considerations."
  },
  {
    id: "remorse",
    text: "Genuine remorse expressed during interview",
    correctCategory: "mitigating",
    rationale: "Remorse is a general mitigating factor under s. 718 principles, showing insight and potential for rehabilitation."
  },
  {
    id: "weapon-use",
    text: "Use of weapon (bottle) in assault",
    correctCategory: "aggravating",
    rationale: "Use of a weapon is an aggravating factor under s. 718.2(a)(ii), increasing the seriousness of the offense."
  },
  {
    id: "victim-injury",
    text: "Significant physical injury to victim",
    correctCategory: "aggravating",
    rationale: "The extent of harm to the victim is a key aggravating factor affecting sentencing severity."
  },
  {
    id: "breach-probation",
    text: "Breach of probation order",
    correctCategory: "aggravating",
    rationale: "Breach of court orders is an aggravating factor showing disrespect for the justice system."
  },
  {
    id: "rehabilitation-efforts",
    text: "Active efforts toward rehabilitation and sobriety",
    correctCategory: "mitigating",
    rationale: "Steps toward rehabilitation demonstrate good character and prospects for reform, supporting rehabilitative sentencing."
  }
];

export const RUBRIC_CRITERIA: RubricCriterion[] = [
  {
    id: "gladue-mention",
    name: "References Gladue Principles",
    keywords: ["gladue", "718.2(e)", "s.718.2(e)", "s. 718.2(e)", "indigenous circumstances"],
    points: 10,
    feedback: "Successfully referenced Gladue principles, which is essential for any sentencing submission involving an Indigenous offender."
  },
  {
    id: "legal-provisions",
    name: "Cites Relevant Criminal Code Provisions",
    keywords: ["s.718", "s. 718", "section 718", "sentencing principles", "718.2"],
    points: 10,
    feedback: "Properly cited relevant Criminal Code sentencing provisions."
  },
  {
    id: "cultural-context",
    name: "Addresses Cultural and Historical Context",
    keywords: ["residential school", "intergenerational trauma", "colonial", "systemic", "discrimination", "treaty"],
    points: 10,
    feedback: "Demonstrated understanding of cultural and historical factors affecting Indigenous peoples in Canada."
  },
  {
    id: "rehabilitation",
    name: "Discusses Rehabilitative Approach",
    keywords: ["rehabilitation", "restorative", "healing", "conditional sentence", "community", "treatment"],
    points: 5,
    feedback: "Addressed rehabilitation and alternatives to incarceration."
  }
];
