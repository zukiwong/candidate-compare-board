const geminiService = require('./geminiService');
const storage = require('../data/storage');

class MatchingService {
  // Calculate candidate's match with JD
  async calculateMatch(candidateId) {
    const candidate = storage.getCandidateById(candidateId);
    const jd = storage.getJD();

    if (!candidate) {
      throw new Error('Candidate does not exist');
    }

    if (!jd) {
      throw new Error('Please first parse JD');
    }

    // Calculate skill match degree
    const skillsMatch = this.calculateSkillsMatch(candidate.skills.core_skills.map(s => s.name), jd.skills);

    // Calculate experience match degree
    const experienceMatch = this.calculateExperienceMatch(
      { years: Math.floor(candidate.experience[0]?.duration_months / 12) || 0, months: candidate.experience[0]?.duration_months % 12 || 0 },
      jd.experience
    );

    // Calculate the match degree of educational background
    const educationMatch = this.calculateEducationMatch(candidate.education[0], jd.education);

    // Calculate project experience match degree
    const projectsMatch = this.calculateProjectsMatch(candidate.projects, jd.requirements);

    // Comprehensive Match Score (Weighted Average)
    const overallMatch = Math.round(
      skillsMatch * 0.45 +
      experienceMatch * 0.30 +
      educationMatch * 0.05 + 
      projectsMatch * 0.20
    );

    // Generate AI interview questions (always generate fresh questions for new JD)
    let interviewQuestions = { questions: [] };
    try {
      interviewQuestions = await geminiService.generateInterviewQuestions(jd, candidate);
    } catch (error) {
      console.log('Gemini API unavailable, using fallback questions');
      interviewQuestions = { questions: [
        "Tell me about your experience with the key technologies mentioned in this role.",
        "How do you approach learning new technologies that you haven't worked with before?",
        "Describe a challenging project you've worked on and how you overcame obstacles.",
        "What interests you most about this position and our company?"
      ]};
    }

    const matchResult = {
      candidateId,
      candidateName: candidate.profile.name,
      matchScore: overallMatch,
      breakdown: {
        skills: skillsMatch,
        experience: experienceMatch,
        education: educationMatch,
        projects: projectsMatch
      },
      interviewQuestions: candidate.matching?.ai_suggested_questions || interviewQuestions.questions,
      matchDetails: {
        matchedSkills: this.findMatchedSkills(candidate.skills.core_skills.map(s => s.name), jd.skills),
        missingSkills: this.findMissingSkills(candidate.skills.core_skills.map(s => s.name), jd.skills),
        strengthAreas: candidate.matching?.strengths || this.identifyStrengthAreas(candidate, jd),
        concernAreas: candidate.matching?.gaps || this.identifyConcernAreas(candidate, jd)
      },
      generatedAt: new Date().toISOString()
    };

    // Update candidate data with matching results
    candidate.matching = {
      core_skill_match_pct: overallMatch,
      ai_suggested_questions: interviewQuestions.questions,
      last_updated: new Date().toISOString(),
      breakdown: matchResult.breakdown,
      strengthAreas: matchResult.matchDetails.strengthAreas,
      concernAreas: matchResult.matchDetails.concernAreas
    };

    // Save updated candidate data
    storage.updateCandidate(candidateId, candidate);

    return matchResult;
  }

  // Skill matching degree calculation
  calculateSkillsMatch(candidateSkills, requiredSkills) {
    if (!requiredSkills || requiredSkills.length === 0) {
      // Based on the quantity and quality of the candidate's skills, a differentiated score is given.
      const skillCount = candidateSkills.length;
      const baseScore = Math.min(70 + skillCount * 3, 95);
      return Math.max(baseScore + Math.floor(Math.random() * 10) - 5, 60);
    }

    const matchedSkills = candidateSkills.filter(skill =>
      requiredSkills.some(reqSkill =>
        skill.toLowerCase().includes(reqSkill.toLowerCase()) ||
        reqSkill.toLowerCase().includes(skill.toLowerCase())
      )
    );

    const matchPercentage = (matchedSkills.length / requiredSkills.length) * 100;
    return Math.min(Math.round(matchPercentage), 100);
  }

  // Work Experience Match Score Calculation
  calculateExperienceMatch(candidateExp, requiredExp) {
    if (!requiredExp || !requiredExp.min) {
      // Based on the candidate's actual experience, provide differentiated scores.
      const candidateYears = candidateExp.years + (candidateExp.months || 0) / 12;
      const baseScore = Math.min(60 + candidateYears * 15, 90);
      return Math.round(baseScore + Math.floor(Math.random() * 8) - 4);
    }

    const candidateYears = candidateExp.years + (candidateExp.months || 0) / 12;
    const requiredYears = requiredExp.min;

    if (candidateYears >= requiredYears) {
      // Exceeding the requirements, score based on the extent of the excess
      const bonus = Math.min((candidateYears - requiredYears) * 5, 20);
      return Math.min(90 + bonus, 100);
    } else {
      // Insufficient requirements, deductions will be made proportionally.
      const ratio = candidateYears / requiredYears;
      return Math.round(ratio * 80);
    }
  }

  // Education background match degree calculation
  calculateEducationMatch(candidateEdu, requiredEdu) {
    if (!requiredEdu) return 85;

    const educationLevels = {
      'High School': 1,
      'Diploma': 2,
      'Bachelor': 3,
      'Master': 4,
      'Masters': 4,
      'PhD': 5,
      'Doctorate': 5
    };

    // Smart matching for education levels
    const getEducationLevel = (degree) => {
      if (!degree) return 3;
      const degreeStr = degree.toLowerCase();

      if (degreeStr.includes('bachelor')) return 3;
      if (degreeStr.includes('master')) return 4;
      if (degreeStr.includes('phd') || degreeStr.includes('doctorate')) return 5;
      if (degreeStr.includes('diploma')) return 2;
      if (degreeStr.includes('high school')) return 1;

      return educationLevels[degree] || 3;
    };

    const candidateLevel = getEducationLevel(candidateEdu?.degree);
    const requiredLevel = getEducationLevel(requiredEdu);

    if (candidateLevel >= requiredLevel) {
      return 90 + Math.min((candidateLevel - requiredLevel) * 5, 10);
    } else {
      return Math.round((candidateLevel / requiredLevel) * 75);
    }
  }

  // Project experience match calculation
  calculateProjectsMatch(projects, requirements) {
    if (!projects || projects.length === 0) return 50;
    if (!requirements || requirements.length === 0) {
      // Based on the number of projects and the diversity of the technology stack, a differentiated score is provided.
      const projectCount = projects.length;
      const uniqueTechs = new Set();
      projects.forEach(project => {
        if (project.technologies) {
          project.technologies.forEach(tech => uniqueTechs.add(tech.toLowerCase()));
        }
      });
      const diversityScore = Math.min(uniqueTechs.size * 8, 50);
      const quantityScore = Math.min(projectCount * 12, 40);
      const baseScore = diversityScore + quantityScore;
      return Math.round(Math.max(baseScore + Math.floor(Math.random() * 10) - 5, 60));
    }

    // Based on the number of projects and the diversity of the technology stack
    const projectCount = projects.length;
    const uniqueTechs = new Set();

    projects.forEach(project => {
      if (project.technologies) {
        project.technologies.forEach(tech => uniqueTechs.add(tech.toLowerCase()));
      }
    });

    const diversityScore = Math.min(uniqueTechs.size * 10, 60);
    const quantityScore = Math.min(projectCount * 15, 40);

    return Math.round(diversityScore + quantityScore);
  }

  // Find matching skills
  findMatchedSkills(candidateSkills, requiredSkills) {
    if (!requiredSkills) return [];

    return candidateSkills.filter(skill =>
      requiredSkills.some(reqSkill =>
        skill.toLowerCase().includes(reqSkill.toLowerCase()) ||
        reqSkill.toLowerCase().includes(skill.toLowerCase())
      )
    );
  }

  // Find the missing skills
  findMissingSkills(candidateSkills, requiredSkills) {
    if (!requiredSkills) return [];

    return requiredSkills.filter(reqSkill =>
      !candidateSkills.some(skill =>
        skill.toLowerCase().includes(reqSkill.toLowerCase()) ||
        reqSkill.toLowerCase().includes(skill.toLowerCase())
      )
    );
  }

  // Identify advantageous fields
  identifyStrengthAreas(candidate, jd) {
    const strengths = [];

    // Extract skill names from candidate skill data
    const candidateSkillNames = candidate.skills?.core_skills?.map(s => s.name) || [];

    // Skill Advantage
    const matchedSkills = this.findMatchedSkills(candidateSkillNames, jd.skills);
    if (matchedSkills.length > 0) {
      strengths.push(`Skills match: ${matchedSkills.join(', ')}`);
    }

    // Experience advantage
    const candidateYears = Math.floor(candidate.experience?.[0]?.duration_months / 12) || 0;
    if (jd.experience && candidateYears >= jd.experience.min) {
      strengths.push(`Sufficient work experience: ${candidateYears} years`);
    }

    // Project Experience
    if (candidate.projects && candidate.projects.length > 2) {
      strengths.push(`Rich project experience: ${candidate.projects.length} projects`);
    }

    return strengths;
  }

  // Identify areas of focus
  identifyConcernAreas(candidate, jd) {
    const concerns = [];

    // Extract skill names from candidate skill data
    const candidateSkillNames = candidate.skills?.core_skills?.map(s => s.name) || [];

    // Skill gap
    const missingSkills = this.findMissingSkills(candidateSkillNames, jd.skills);
    if (missingSkills.length > 0) {
      concerns.push(`Skills to strengthen: ${missingSkills.join(', ')}`);
    }

    // Insufficient experience
    const candidateYears = Math.floor(candidate.experience?.[0]?.duration_months / 12) || 0;
    if (jd.experience && candidateYears < jd.experience.min) {
      concerns.push(`Insufficient work experience: ${jd.experience.min} years required, ${candidateYears} years current`);
    }

    return concerns;
  }

  // Batch match all candidates
  async batchMatchCandidates() {
    const candidates = storage.getCandidates();
    const jd = storage.getJD();

    if (!jd) {
      throw new Error('Please first parse JD');
    }

    // Process candidates in parallel with limited concurrency to avoid overwhelming AI API
    const batchSize = 3; // Process 3 candidates at a time
    const matches = [];

    for (let i = 0; i < candidates.length; i += batchSize) {
      const batch = candidates.slice(i, i + batchSize);
      const batchPromises = batch.map(async (candidate) => {
        try {
          return await this.calculateMatch(candidate.id);
        } catch (error) {
          console.error(`Candidate ${candidate.id} matching failed:`, error);
          return null;
        }
      });

      const batchResults = await Promise.all(batchPromises);
      matches.push(...batchResults.filter(result => result !== null));
    }

    // Sort by relevance
    return matches.sort((a, b) => b.matchScore - a.matchScore);
  }
}

module.exports = new MatchingService();