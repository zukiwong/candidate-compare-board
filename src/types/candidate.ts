// 技能接口
export interface Skill {
  name: string;
  self_rank?: number;
  level?: number;
  evidence?: string[];
  rating?: number;
}

// 项目接口
export interface Project {
  title: string;
  description: string;
  technologies: string[];
  duration: string;
  githubUrl?: string;
  liveUrl?: string;
}

// 教育背景接口
export interface Education {
  school: string;
  schoolLogo?: string;
  degree: string;
}

// 工作经验职位接口
export interface WorkExperiencePosition {
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

// 工作经验接口
export interface WorkExperience {
  years: number;
  months: number;
  positions: WorkExperiencePosition[];
}

// 地理位置接口
export interface Location {
  current: string;
  matches: boolean;
  isRemote: boolean;
  isHybrid: boolean;
}

// 链接接口
export interface Links {
  github?: string;
  portfolio?: string;
  linkedin?: string;
  cv?: string;
  transcript?: string;
  visa?: string;
}

// 软技能接口
export interface SoftSkill {
  name: string;
  rating: number;
}

// 候选人接口 - 基于前端现有结构和后端API响应
export interface Candidate {
  id: string;
  name: string;
  initials?: string;
  avatar?: string;
  title?: string;
  experience?: string;
  coreSkillMatch?: number;
  match_pct?: number;
  topSkills: Skill[];
  projects: Project[];
  education: Education;
  workExperience: WorkExperience;
  location: Location;
  links: Links;
  softSkills: SoftSkill[];
  followUpPrompts: string[];
}

// API 响应类型
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

// 候选人列表 API 响应
export interface CandidatesResponse {
  candidates: Candidate[];
  total: number;
}

// 匹配结果接口
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