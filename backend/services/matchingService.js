const geminiService = require('./geminiService');
const storage = require('../data/storage');

class MatchingService {
  // 计算候选人与JD的匹配度
  async calculateMatch(candidateId) {
    const candidate = storage.getCandidateById(candidateId);
    const jd = storage.getJD();

    if (!candidate) {
      throw new Error('候选人不存在');
    }

    if (!jd) {
      throw new Error('请先解析JD');
    }

    // 计算技能匹配度
    const skillsMatch = this.calculateSkillsMatch(candidate.skills.core_skills.map(s => s.name), jd.skills);

    // 计算经验匹配度
    const experienceMatch = this.calculateExperienceMatch(
      { years: Math.floor(candidate.experience[0]?.duration_months / 12) || 0, months: candidate.experience[0]?.duration_months % 12 || 0 },
      jd.experience
    );

    // 计算教育背景匹配度
    const educationMatch = this.calculateEducationMatch(candidate.education[0], jd.education);

    // 计算项目经验匹配度
    const projectsMatch = this.calculateProjectsMatch(candidate.projects, jd.requirements);

    // 综合匹配度（加权平均）
    const overallMatch = Math.round(
      skillsMatch * 0.4 +
      experienceMatch * 0.25 +
      educationMatch * 0.15 +
      projectsMatch * 0.2
    );

    // 生成AI面试问题 (如果没有预设，则尝试调用API)
    let interviewQuestions = { questions: [] };
    if (!candidate.matching?.ai_suggested_questions) {
      try {
        interviewQuestions = await geminiService.generateInterviewQuestions(jd, candidate);
      } catch (error) {
        console.log('Gemini API不可用，使用预设问题');
        interviewQuestions = { questions: [
          "Tell me about your experience with React and how you've used it in production.",
          "How do you approach performance optimization in frontend applications?",
          "Describe a challenging technical problem you've solved recently."
        ]};
      }
    }

    return {
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
  }

  // 技能匹配度计算
  calculateSkillsMatch(candidateSkills, requiredSkills) {
    if (!requiredSkills || requiredSkills.length === 0) return 85;

    const matchedSkills = candidateSkills.filter(skill =>
      requiredSkills.some(reqSkill =>
        skill.toLowerCase().includes(reqSkill.toLowerCase()) ||
        reqSkill.toLowerCase().includes(skill.toLowerCase())
      )
    );

    const matchPercentage = (matchedSkills.length / requiredSkills.length) * 100;
    return Math.min(Math.round(matchPercentage), 100);
  }

  // 工作经验匹配度计算
  calculateExperienceMatch(candidateExp, requiredExp) {
    if (!requiredExp || !requiredExp.min) return 80;

    const candidateYears = candidateExp.years + (candidateExp.months || 0) / 12;
    const requiredYears = requiredExp.min;

    if (candidateYears >= requiredYears) {
      // 超过要求，根据超出程度给分
      const bonus = Math.min((candidateYears - requiredYears) * 5, 20);
      return Math.min(90 + bonus, 100);
    } else {
      // 不足要求，按比例扣分
      const ratio = candidateYears / requiredYears;
      return Math.round(ratio * 80);
    }
  }

  // 教育背景匹配度计算
  calculateEducationMatch(candidateEdu, requiredEdu) {
    if (!requiredEdu) return 85;

    const educationLevels = {
      '高中': 1,
      '专科': 2,
      '本科': 3,
      'Bachelor': 3,
      '硕士': 4,
      'Master': 4,
      '博士': 5,
      'PhD': 5
    };

    const candidateLevel = educationLevels[candidateEdu.degree] || 3;
    const requiredLevel = educationLevels[requiredEdu] || 3;

    if (candidateLevel >= requiredLevel) {
      return 90 + Math.min((candidateLevel - requiredLevel) * 5, 10);
    } else {
      return Math.round((candidateLevel / requiredLevel) * 75);
    }
  }

  // 项目经验匹配度计算
  calculateProjectsMatch(projects, requirements) {
    if (!projects || projects.length === 0) return 50;
    if (!requirements || requirements.length === 0) return 85;

    // 简化版：基于项目数量和技术栈多样性
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

  // 找出匹配的技能
  findMatchedSkills(candidateSkills, requiredSkills) {
    if (!requiredSkills) return [];

    return candidateSkills.filter(skill =>
      requiredSkills.some(reqSkill =>
        skill.toLowerCase().includes(reqSkill.toLowerCase()) ||
        reqSkill.toLowerCase().includes(skill.toLowerCase())
      )
    );
  }

  // 找出缺失的技能
  findMissingSkills(candidateSkills, requiredSkills) {
    if (!requiredSkills) return [];

    return requiredSkills.filter(reqSkill =>
      !candidateSkills.some(skill =>
        skill.toLowerCase().includes(reqSkill.toLowerCase()) ||
        reqSkill.toLowerCase().includes(skill.toLowerCase())
      )
    );
  }

  // 识别优势领域
  identifyStrengthAreas(candidate, jd) {
    const strengths = [];

    // 技能优势
    const matchedSkills = this.findMatchedSkills(candidate.skills, jd.skills);
    if (matchedSkills.length > 0) {
      strengths.push(`技能匹配: ${matchedSkills.join(', ')}`);
    }

    // 经验优势
    const candidateYears = candidate.workExperience.years;
    if (jd.experience && candidateYears >= jd.experience.min) {
      strengths.push(`工作经验充足: ${candidateYears}年经验`);
    }

    // 项目经验
    if (candidate.projects && candidate.projects.length > 2) {
      strengths.push(`项目经验丰富: ${candidate.projects.length}个项目`);
    }

    return strengths;
  }

  // 识别关注领域
  identifyConcernAreas(candidate, jd) {
    const concerns = [];

    // 技能缺口
    const missingSkills = this.findMissingSkills(candidate.skills, jd.skills);
    if (missingSkills.length > 0) {
      concerns.push(`需要补强技能: ${missingSkills.join(', ')}`);
    }

    // 经验不足
    const candidateYears = candidate.workExperience.years;
    if (jd.experience && candidateYears < jd.experience.min) {
      concerns.push(`工作经验不足: 需要${jd.experience.min}年，现有${candidateYears}年`);
    }

    return concerns;
  }

  // 批量匹配所有候选人
  async batchMatchCandidates() {
    const candidates = storage.getCandidates();
    const jd = storage.getJD();

    if (!jd) {
      throw new Error('请先解析JD');
    }

    const matches = [];
    for (const candidate of candidates) {
      try {
        const match = await this.calculateMatch(candidate.id);
        matches.push(match);
      } catch (error) {
        console.error(`候选人 ${candidate.id} 匹配失败:`, error);
      }
    }

    // 按匹配度排序
    return matches.sort((a, b) => b.matchScore - a.matchScore);
  }
}

module.exports = new MatchingService();