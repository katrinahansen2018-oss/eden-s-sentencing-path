import { MCQQuestion, LegalFactor, RubricCriterion, Badge } from '@/types/simulation';

export const SIMULATION_CONFIG = {
  title: "Case Study",
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
  
  introText: `You are counsel for Eden Littlecrow, a 28-year-old Indigenous woman from Treaty 6 territory who has pleaded guilty to assault causing bodily harm (s. 267(b) Criminal Code).

**Background:** Eden grew up on reserve. Both her parents attended residential school. She has struggled with substance use and has a criminal record with four prior entries, including two that involve violence or the capacity for violence. There has been a ten-year gap since those earlier offences.

**The Incident:** On October 31, after a night of celebration, Eden and her common-law partner were walking home. Eden's phone stopped working, so she borrowed her partner's phone and saw what she believed to be evidence of infidelity. An argument began and quickly escalated. Eden produced a box cutter and slashed at her partner, causing a two-inch cut on his forearm that required approximately 20 stitches. Both had been drinking. Eden fled the scene before police arrived and later fled again when officers located her near their home.

**Family Context:** The couple has reconciled to some degree and they share a young daughter, who depends on both parents.

**Your Role:** As Eden's lawyer, you must prepare a sentencing memorandum that considers s. 718.2(e) and Gladue principles, which require courts to pay particular attention to the circumstances of Indigenous offenders.`,

  clientVideoUrl: "/placeholder-video.mp4", // Replace with actual video path
  clientCaptions: "/placeholder-captions.vtt", // Replace with actual caption file path
  clientTranscript: "Eden: Thank you for meeting with me. I... I know I made a mistake. I've been trying to get clean, trying to be there for my daughter. But sometimes everything just feels too hard. My parents, they went through residential school. I never really understood what that meant until I was older. The way they were with us... they didn't know how to show love. And now I'm worried I'm doing the same thing. When I saw those messages on his phone, I just... I lost it. I know that's no excuse.",

  judgeScripts: {
    high: "Having reviewed counsel's submissions and considered all relevant factors under s. 718, including the important Gladue principles set out in s. 718.2(e), I am satisfied that the defense has presented a thorough and culturally informed analysis. The court recognizes Ms. Littlecrow's background, including intergenerational trauma stemming from her parents' residential school experiences, her efforts toward rehabilitation, and her expressed remorse. While the offense is serious, a conditional sentence order with strict conditions will serve the principles of sentencing while addressing Ms. Littlecrow's rehabilitative needs.",
    
    low: "The court has reviewed counsel's submissions. While I note Ms. Littlecrow's Indigenous background, the defense submissions have not adequately addressed the Gladue factors or provided sufficient context regarding how her circumstances should inform sentencing. The offense involved violence and breach of trust. Without a more comprehensive analysis of rehabilitative options and cultural considerations, I am limited in my ability to consider alternatives to incarceration. Ms. Littlecrow will serve a period of incarceration followed by probation."
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
    id: "intergenerational-trauma",
    text: "Eden's Indigenous background and intergenerational impacts of colonialism and systemic discrimination",
    correctCategory: "gladue",
    rationale: "Under Gladue and Ipeelee, courts must consider how colonialism, systemic discrimination, and intergenerational trauma have affected the offender's family life, substance use, and relationships."
  },
  {
    id: "substance-use",
    text: "Both parties had been drinking at the time of the offence",
    correctCategory: "aggravating",
    rationale: "While substance use in Indigenous communities may have Gladue-related roots, intoxication at the time of a violent offence is generally treated as aggravating in sentencing."
  },
  {
    id: "weapon-use",
    text: "Used a box cutter to slash her partner's forearm, causing a two-inch wound requiring ~20 stitches",
    correctCategory: "aggravating",
    rationale: "Use of a weapon causing significant injury is an aggravating factor under s. 718.2(a)(ii), increasing the seriousness of the offense."
  },
  {
    id: "domestic-context",
    text: "Victim was Eden's common-law partner (domestic context)",
    correctCategory: "aggravating",
    rationale: "Domestic violence is treated as an aggravating factor under s. 718.2(a)(ii), reflecting the breach of trust in intimate relationships."
  },
  {
    id: "fled-scene",
    text: "Eden fled the scene and later fled from police when first located",
    correctCategory: "aggravating",
    rationale: "Flight from the scene and from police demonstrates consciousness of guilt and lack of immediate accountability, which courts view as aggravating."
  },
  {
    id: "prior-record",
    text: "Ten-year gap since prior violent offences on record",
    correctCategory: "mitigating",
    rationale: "While a prior record is generally aggravating, a significant gap demonstrates capacity for law-abiding behaviour and supports rehabilitation prospects."
  },
  {
    id: "first-domestic",
    text: "First documented domestic violence incident between the parties",
    correctCategory: "mitigating",
    rationale: "The absence of a pattern of domestic abuse between the parties is a mitigating consideration in sentencing."
  },
  {
    id: "injury-limited",
    text: "Injury, while serious, did not result in lasting physical impairment",
    correctCategory: "mitigating",
    rationale: "The absence of permanent physical harm, while still serious, is relevant to proportionality in sentencing."
  },
  {
    id: "remorse",
    text: "Eden has expressed genuine remorse for her actions",
    correctCategory: "mitigating",
    rationale: "Remorse is a general mitigating factor under s. 718 principles, showing insight and potential for rehabilitation."
  },
  {
    id: "reconciliation-family",
    text: "There has been some reconciliation between Eden and her partner, and both are involved in the care of their young daughter",
    correctCategory: "mitigating",
    rationale: "Family reconciliation and shared parental responsibilities support community-based sentencing options and reflect the Gladue principle of considering the offender's ties to community and family."
  }
];

export const RUBRIC_CRITERIA: RubricCriterion[] = [
  {
    id: "gladue-mention",
    name: "References Gladue Principles",
    keywords: ["gladue", "718.2(e)", "s.718.2(e)", "s. 718.2(e)", "indigenous circumstances"],
    points: 10,
    feedback: "Successfully referenced Gladue principles in your memo to your principal, which is essential for any sentencing recommendation involving an Indigenous offender."
  },
  {
    id: "legal-provisions",
    name: "Cites Relevant Criminal Code Provisions",
    keywords: ["s.718", "s. 718", "section 718", "sentencing principles", "718.2"],
    points: 10,
    feedback: "Properly cited relevant Criminal Code sentencing provisions in your recommendations to your principal."
  },
  {
    id: "cultural-context",
    name: "Addresses Cultural and Historical Context",
    keywords: ["residential school", "intergenerational trauma", "colonial", "systemic", "discrimination", "treaty"],
    points: 10,
    feedback: "Demonstrated understanding of cultural and historical factors affecting Indigenous peoples in Canada in your memo."
  },
  {
    id: "rehabilitation",
    name: "Discusses Rehabilitative Approach",
    keywords: ["rehabilitation", "restorative", "healing", "conditional sentence", "community", "treatment"],
    points: 5,
    feedback: "Addressed rehabilitation and alternatives to incarceration in your recommendations to your principal."
  }
];
