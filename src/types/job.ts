export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  duration: string;
  startDate: string;
  type: "internship" | "full-time" | "part-time";
  description: {
    purpose: string;
    accountabilities: string[];
    requirements: string[];
    benefits?: string[];
  };
  skills: {
    required: string[];
    preferred: string[];
    categories: string[];
  };
  applicationStatus: "applied" | "interview" | "offered" | "rejected";
  appliedDate: string;
  matchScore?: number;
  gapAnalysis?: {
    strengths: string[];
    gaps: string[];
    suggestions: string[];
  };
  aiQuestions?: string[];
  elevatorPitch?: {
    keyPoints: string[];
    timeframe: string;
  };
}