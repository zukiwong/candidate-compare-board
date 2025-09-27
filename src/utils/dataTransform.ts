import { Candidate } from '../types/candidate';

// 将后端候选人数据转换为前端期待的格式
export function transformBackendCandidate(backendCandidate: any): Candidate {
  return {
    id: backendCandidate.id,
    name: backendCandidate.profile?.name || 'Unknown',
    initials: backendCandidate.profile?.initials || '??',
    title: backendCandidate.experience?.[0]?.title || 'N/A',
    experience: backendCandidate.experience?.[0]?.duration_months
      ? `${Math.floor(backendCandidate.experience[0].duration_months / 12)}年${backendCandidate.experience[0].duration_months % 12}个月`
      : 'N/A',
    coreSkillMatch: backendCandidate.matching?.core_skill_match_pct || 0,
    match_pct: backendCandidate.matching?.core_skill_match_pct || 0,

    // 技能转换
    topSkills: backendCandidate.skills?.core_skills?.map((skill: any) => ({
      name: skill.name,
      rating: skill.level || 0,
      self_rank: skill.self_rank,
      level: skill.level,
      evidence: skill.evidence
    })) || [],

    // 项目转换
    projects: backendCandidate.projects?.map((project: any, index: number) => ({
      title: project.title || project.name || `Project ${index + 1}`,
      description: project.description || project.summary || 'No description',
      technologies: project.technologies || project.tech || [],
      duration: project.duration || 'N/A',
      githubUrl: project.githubUrl || project.github_url || project.links?.repo,
      liveUrl: project.liveUrl || project.live_url || project.links?.demo
    })) || [],

    // 教育背景转换
    education: {
      school: backendCandidate.education?.[0]?.school || backendCandidate.education?.[0]?.institution || 'N/A',
      degree: backendCandidate.education?.[0]?.degree || 'N/A',
      schoolLogo: backendCandidate.education?.[0]?.logo
    },

    // 工作经验转换
    workExperience: {
      years: Math.floor((backendCandidate.experience?.[0]?.duration_months || 0) / 12),
      months: (backendCandidate.experience?.[0]?.duration_months || 0) % 12,
      positions: backendCandidate.experience?.map((exp: any) => ({
        company: exp.company || 'Unknown Company',
        position: exp.title || 'Unknown Position',
        duration: `${exp.start} - ${exp.end || 'Present'}`,
        description: exp.highlights?.join('; ') || 'No description',
        technologies: exp.tech || [],
        achievements: exp.highlights || []
      })) || []
    },

    // 地理位置转换
    location: {
      current: backendCandidate.profile?.location?.city || 'Unknown',
      matches: true, // 默认值
      isRemote: backendCandidate.profile?.location?.remote_ok || false,
      isHybrid: false // 默认值
    },

    // 链接转换
    links: {
      github: backendCandidate.profile?.links?.github,
      portfolio: backendCandidate.profile?.links?.portfolio,
      linkedin: backendCandidate.profile?.links?.linkedin,
      cv: backendCandidate.profile?.links?.resume,
      transcript: backendCandidate.profile?.links?.transcript,
      visa: backendCandidate.profile?.links?.visa
    },

    // 软技能转换（如果没有则使用默认值）
    softSkills: backendCandidate.skills?.soft_skills?.map((skill: any) => ({
      name: skill.name,
      rating: skill.score || 0
    })) || [
      { name: 'Communication', rating: 4 },
      { name: 'Problem Solving', rating: 4 },
      { name: 'Teamwork', rating: 5 }
    ],

    // AI建议的面试问题
    followUpPrompts: backendCandidate.matching?.ai_suggested_questions || [
      "Tell me about your most challenging project.",
      "How do you stay updated with new technologies?",
      "Describe your approach to problem-solving."
    ]
  };
}

// 批量转换候选人数据
export function transformBackendCandidates(backendCandidates: any[]): Candidate[] {
  return backendCandidates.map(transformBackendCandidate);
}