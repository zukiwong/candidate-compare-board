import { Candidate } from '../types/candidate';

// Convert backend candidate data into the format expected by the frontend.
export function transformBackendCandidate(backendCandidate: any): Candidate {
  return {
    id: backendCandidate.id,
    name: backendCandidate.profile?.name || 'Unknown',
    initials: backendCandidate.profile?.initials || '??',
    title: backendCandidate.experience?.[0]?.title || 'N/A',
    experience: backendCandidate.experience?.[0]?.duration_months
      ? `${Math.floor(backendCandidate.experience[0].duration_months / 12)}年${backendCandidate.experience[0].duration_months % 12}个月`
      : 'N/A',
    coreSkillMatch: Number(backendCandidate.matching?.core_skill_match_pct) || 0,
    match_pct: Number(backendCandidate.matching?.core_skill_match_pct) || 0,
    detailedScores: {
      technical_skills_score: backendCandidate.matching?.technical_skills_score,
      experience_score: backendCandidate.matching?.experience_score,
      project_complexity_score: backendCandidate.matching?.project_complexity_score,
      education_score: backendCandidate.matching?.education_score,
      soft_skills_score: backendCandidate.matching?.soft_skills_score,
      portfolio_quality_score: backendCandidate.matching?.portfolio_quality_score
    },

    // Skill Transfer
    topSkills: backendCandidate.skills?.core_skills?.map((skill: any) => ({
      name: skill.name,
      rating: skill.level || 0,
      self_rank: skill.self_rank,
      level: skill.level,
      evidence: skill.evidence
    })) || [],

    // Project Conversion
    projects: backendCandidate.projects?.map((project: any, index: number) => ({
      title: project.title || project.name || `Project ${index + 1}`,
      description: project.description || project.summary || 'No description',
      technologies: project.technologies || project.tech || [],
      duration: project.duration || 'N/A',
      githubUrl: project.githubUrl || project.github_url || project.links?.repo,
      liveUrl: project.liveUrl || project.live_url || project.links?.demo
    })) || [],

    // Educational Background Conversion
    education: {
      school: backendCandidate.education?.[0]?.school || backendCandidate.education?.[0]?.institution || 'N/A',
      degree: backendCandidate.education?.[0]?.degree || 'N/A',
      schoolLogo: backendCandidate.education?.[0]?.logo
    },

    // Work Experience Conversion
    workExperience: {
      years: Math.floor((backendCandidate.experience?.[0]?.duration_months || 0) / 12),
      months: (backendCandidate.experience?.[0]?.duration_months || 0) % 12,
      positions: backendCandidate.experience?.map((exp: any) => ({
        company: exp.company || 'Unknown Company',
        position: exp.title || 'Unknown Position',
        duration: (() => {
          const formatDate = (dateStr: string) => {
            if (!dateStr || dateStr === 'Present') return dateStr;
            // Convert YYYY-MM to MM/YYYY format
            const parts = dateStr.split('-');
            if (parts.length === 2) {
              return `${parts[1]}/${parts[0]}`;
            }
            return dateStr;
          };

          const startDate = exp.start_date || exp.start || 'Unknown';
          const endDate = exp.end_date || exp.end || 'Present';

          return `${formatDate(startDate)} - ${formatDate(endDate)}`;
        })(),
        description: exp.description || exp.highlights?.join('; ') || 'No description',
        technologies: exp.technologies || exp.tech || [],
        achievements: exp.achievements || exp.highlights || []
      })) || []
    },

    // Geographical Position Conversion
    location: {
      current: backendCandidate.profile?.location?.city || 'Unknown',
      matches: true, 
      isRemote: backendCandidate.profile?.location?.remote_ok || false,
      isHybrid: false 
    },

    // Link conversion
    links: {
      github: backendCandidate.profile?.links?.github,
      portfolio: backendCandidate.profile?.links?.portfolio,
      linkedin: backendCandidate.profile?.links?.linkedin,
      cv: backendCandidate.profile?.links?.resume,
      transcript: backendCandidate.profile?.links?.transcript,
      visa: backendCandidate.profile?.links?.visa
    },

    // Soft Skills Conversion (use default value if not available)
    softSkills: backendCandidate.skills?.soft_skills?.map((skill: any) => ({
      name: skill.name,
      rating: skill.level || 0
    })) || [
      { name: 'Communication', rating: 4 },
      { name: 'Problem Solving', rating: 4 },
      { name: 'Teamwork', rating: 5 }
    ],

    // AI Suggested Interview Questions
    followUpPrompts: backendCandidate.matching?.ai_suggested_questions || [
      "Tell me about your most challenging project.",
      "How do you stay updated with new technologies?",
      "Describe your approach to problem-solving."
    ]
  };
}

// Batch convert candidate data
export function transformBackendCandidates(backendCandidates: any[]): Candidate[] {
  return backendCandidates.map(transformBackendCandidate);
}