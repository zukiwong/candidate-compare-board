// Skill Interface
export interface Skill {
  name: string;
  self_rank?: number;
  level?: number;
  evidence?: string[];
  rating?: number;
}

// Project Interface
export interface Project {
  title: string;
  description: string;
  technologies: string[];
  duration: string;
  githubUrl?: string;
  liveUrl?: string;
}

// Educational background interface
export interface Education {
  school: string;
  schoolLogo?: string;
  degree: string;
}

// Work Experience Position Interface
export interface WorkExperiencePosition {
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

// Work Experience Interface
export interface WorkExperience {
  years: number;
  months: number;
  positions: WorkExperiencePosition[];
}

// Geographical location interface
export interface Location {
  current: string;
  matches: boolean;
  isRemote: boolean;
  isHybrid: boolean;
}

// Link interface
export interface Links {
  github?: string;
  portfolio?: string;
  linkedin?: string;
  cv?: string;
  transcript?: string;
  visa?: string;
}

// Soft Skills Interface
export interface SoftSkill {
  name: string;
  rating: number;
}

// Detailed scoring interface
export interface DetailedScores {
  technical_skills_score?: number;
  experience_score?: number;
  project_complexity_score?: number;
  education_score?: number;
  soft_skills_score?: number;
  portfolio_quality_score?: number;
}

// Candidate Interface - Based on the existing frontend structure and backend API responses
export interface Candidate {
  id: string;
  name: string;
  initials?: string;
  avatar?: string;
  title?: string;
  experience?: string;
  coreSkillMatch?: number;
  match_pct?: number;
  detailedScores?: DetailedScores;
  topSkills: Skill[];
  projects: Project[];
  education: Education;
  workExperience: WorkExperience;
  location: Location;
  links: Links;
  softSkills: SoftSkill[];
  followUpPrompts: string[];
}

// API 
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

// Candidate List API Response
export interface CandidatesResponse {
  candidates: Candidate[];
  total: number;
}

// Matching results interface
export interface MatchResult {
  candidateId: string;
  candidateName: string;
  matchScore: number;
  breakdown: {
    skills: number;
    experience: number;
    education: number;
    projects: number;
  };
  interviewQuestions: string[];
  matchDetails: {
    matchedSkills: string[];
    missingSkills: string[];
    strengthAreas: string[];
    concernAreas: string[];
  };
  generatedAt: string;
}