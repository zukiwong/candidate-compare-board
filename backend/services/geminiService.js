const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
  }

  // Universal AI text generation method
  async generateContent(prompt) {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API call failed:', error);
      throw new Error('AI service temporarily unavailable');
    }
  }

  // Parse JD text into structured data
  async parseJD(jdText) {
    const prompt = `
Parse the following job description text into structured JSON format. Requirements:
1. Extract key information fields with high accuracy
2. Return pure JSON format only, no additional text
3. Use null values for unclear information

IMPORTANT PARSING GUIDELINES:
- Company Name: Look for company names after keywords like "at", "with", "for", "@", or in headers. Company names can include words like "New", "Ltd", "Inc", "Corporation", etc.
- Job Title: Often appears at the beginning or in headers, may be followed by "at [company]"
- Location: Look for city/country names, "remote", "hybrid", or address information
- Responsibilities: Extract bullet points or numbered lists describing what the role involves
- Soft Skills: Look for interpersonal skills like "communication", "teamwork", "leadership", "problem-solving", "creativity"

Output structure:
{
  "title": "job title",
  "company": "company name",
  "location": "work location",
  "workType": "work type (full-time/part-time/contract/intern)",
  "responsibilities": ["what you will do", "key responsibility 2", "responsibility 3"],
  "skills": ["technical skill 1", "technical skill 2", "skill 3"],
  "softSkills": ["communication", "teamwork", "problem-solving"],
  "requirements": ["requirement 1", "requirement 2", "requirement 3"],
  "salary": {
    "min": minimum_salary,
    "max": maximum_salary,
    "currency": "currency"
  },
  "benefits": ["benefit1", "benefit2"],
  "description": "job description summary"
}

Examples of company name extraction:
- "Software Engineer at Google" → company: "Google"
- "Frontend Developer @ Meta" → company: "Meta"
- "Data Analyst with One New Zealand" → company: "One New Zealand"
- "Backend Developer for Microsoft Corporation" → company: "Microsoft Corporation"

Job Description Text:
${jdText}
`;

    try {
      const response = await this.generateContent(prompt);

      // Clean up response and attempt JSON parsing
      let cleanResponse = response.trim();

      // Remove markdown code blocks if present
      if (cleanResponse.startsWith('```json')) {
        cleanResponse = cleanResponse.replace(/```json\n?/, '').replace(/\n?```$/, '');
      } else if (cleanResponse.startsWith('```')) {
        cleanResponse = cleanResponse.replace(/```\n?/, '').replace(/\n?```$/, '');
      }

      const parsed = JSON.parse(cleanResponse);

      // Validate required fields
      if (!parsed.title && !parsed.skills) {
        throw new Error('Invalid JD structure');
      }

      return parsed;
    } catch (error) {
      console.error('JD parsing failed:', error);

      // Fallback: Create basic structure from text analysis
      console.log('Using fallback JD structure due to AI parsing failure');
      return this.createFallbackJDStructure(jdText);
    }
  }

  // Generate targeted interview questions
  async generateInterviewQuestions(jdData, candidateData) {
    const prompt = `
You are an experienced technical recruiter conducting a professional interview. Analyze the job requirements vs candidate profile and generate 3-4 strategic interview questions.

IMPORTANT:
- Use natural, conversational interview language that real HR professionals would use
- Vary your question styles - be creative and authentic like a skilled interviewer
- Avoid repetitive sentence patterns or formulaic beginnings
- Make each question feel personal and tailored to this specific candidate
- Sound engaging and professional, not robotic or template-based

Focus areas:
1. **Skill Gaps**: Ask about technologies in JD that candidate hasn't mentioned explicitly
2. **Experience Validation**: Probe deeper into candidate's claimed experience with specific technologies
3. **Project Details**: Ask for specifics about projects that relate to job requirements
4. **Growth Potential**: Give candidates opportunity to show unreported skills or learning ability

Job Requirements:
${JSON.stringify(jdData, null, 2)}

Candidate Profile:
${JSON.stringify(candidateData, null, 2)}

Generate questions that:
- Feel like they come from a skilled interviewer who genuinely wants to understand the candidate
- Help identify if candidate has unreported relevant skills
- Validate their experience level with mentioned technologies
- Explore specific project challenges related to job needs
- Assess problem-solving approach for job-relevant scenarios
- Each question should have a unique conversational tone and approach

Return JSON format:
{
  "questions": [
    "Question 1 content",
    "Question 2 content",
    "Question 3 content",
    "Question 4 content (optional)"
  ]
}
`;

    try {
      const response = await this.generateContent(prompt);

      // Clean up response and attempt JSON parsing
      let cleanResponse = response.trim();

      // Remove markdown code blocks if present
      if (cleanResponse.startsWith('```json')) {
        cleanResponse = cleanResponse.replace(/```json\n?/, '').replace(/\n?```$/, '');
      } else if (cleanResponse.startsWith('```')) {
        cleanResponse = cleanResponse.replace(/```\n?/, '').replace(/\n?```$/, '');
      }

      // Remove any additional formatting
      cleanResponse = cleanResponse.replace(/^[`\s]*/, '').replace(/[`\s]*$/, '');

      return JSON.parse(cleanResponse);
    } catch (error) {
      console.error('Interview question generation failed:', error);

      // Fallback: Generate diverse intelligent questions based on JD vs candidate analysis
      const candidateSkills = candidateData.skills?.core_skills?.map(s => s.name) || [];
      const requiredSkills = jdData.skills || [];
      const missingSkills = requiredSkills.filter(skill =>
        !candidateSkills.some(cSkill =>
          cSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(cSkill.toLowerCase())
        )
      );

      const questions = [];

      // Diverse question templates with different starters
      const questionTemplates = [
        {
          condition: () => missingSkills.length > 0,
          templates: [
            `Looking at the role requirements, I see ${missingSkills.join(', ')} ${missingSkills.length > 1 ? 'are' : 'is'} mentioned. What's your familiarity with ${missingSkills.length > 1 ? 'these tools' : 'this technology'}?`,
            `I notice this position requires ${missingSkills.join(', ')}. Have you had any exposure to ${missingSkills.length > 1 ? 'these technologies' : 'this technology'} in your projects or studies?`,
            `The role mentions ${missingSkills.join(', ')}. Can you share any experience you might have with ${missingSkills.length > 1 ? 'these' : 'this'}, even if indirect?`
          ]
        },
        {
          condition: () => candidateSkills.length > 0,
          templates: [
            `I see you're strong in ${candidateSkills[0]}. What's the most challenging problem you've solved using this technology?`,
            `Your background shows expertise in ${candidateSkills[0]}. Can you walk me through a project where this skill was crucial?`,
            `${candidateSkills[0]} appears to be one of your key strengths. What aspects of working with it do you find most interesting?`,
            `Looking at your ${candidateSkills[0]} experience, which project are you most proud of and why?`
          ]
        },
        {
          condition: () => jdData.responsibilities && jdData.responsibilities.length > 0,
          templates: [
            `This role involves ${jdData.responsibilities[0].toLowerCase()}. What's your approach to this type of work?`,
            `One key responsibility here is ${jdData.responsibilities[0].toLowerCase()}. How would you tackle this challenge?`,
            `In your opinion, what's the most important consideration when ${jdData.responsibilities[0].toLowerCase()}?`,
            `From your experience, what strategies work best for ${jdData.responsibilities[0].toLowerCase()}?`
          ]
        },
        {
          condition: () => true, // Always available
          templates: [
            `What initially drew you to apply for this ${jdData.title || 'position'}?`,
            `If you could change one thing about your previous projects, what would it be and why?`,
            `Which aspect of this role excites you most, and how do you see yourself growing in it?`,
            `Looking at our team's challenges, where do you think your background would add the most value?`,
            `What's one technical skill you're currently working to improve, and why did you choose it?`
          ]
        }
      ];

      // Generate questions from different templates
      questionTemplates.forEach(templateGroup => {
        if (templateGroup.condition() && questions.length < 4) {
          const randomTemplate = templateGroup.templates[Math.floor(Math.random() * templateGroup.templates.length)];
          questions.push(randomTemplate);
        }
      });

      return {
        questions: questions.slice(0, 4) // Max 4 questions
      };
    }
  }

  // Create fallback JD structure when AI parsing fails
  createFallbackJDStructure(jdText) {
    console.log('Using fallback JD parsing');

    // Basic text analysis for fallback
    const text = jdText.toLowerCase();
    const originalText = jdText;

    // Extract potential title and company
    const lines = originalText.split('\n').filter(line => line.trim());
    let title = lines[0] || 'Software Engineer';
    let company = null;

    // Try to extract company name from title line
    const titleLine = lines[0] || '';
    const companyPatterns = [
      /\s+at\s+(.+?)(?:\s*[-|]|\s*$)/i,
      /\s+@\s+(.+?)(?:\s*[-|]|\s*$)/i,
      /\s+with\s+(.+?)(?:\s*[-|]|\s*$)/i,
      /\s+for\s+(.+?)(?:\s*[-|]|\s*$)/i
    ];

    for (const pattern of companyPatterns) {
      const match = titleLine.match(pattern);
      if (match && match[1]) {
        company = match[1].trim();
        title = titleLine.replace(pattern, '').trim();
        break;
      }
    }

    // If no company found in title, look in other lines
    if (!company) {
      for (let i = 1; i < Math.min(lines.length, 5); i++) {
        const line = lines[i];
        if (line.toLowerCase().includes('company:') || line.toLowerCase().includes('organization:')) {
          company = line.replace(/^[^:]*:\s*/i, '').trim();
          break;
        }
      }
    }

    // Common skills to look for
    const commonSkills = [
      'javascript', 'typescript', 'react', 'node.js', 'python', 'java',
      'aws', 'docker', 'kubernetes', 'sql', 'mongodb', 'git', 'html', 'css'
    ];

    const foundSkills = commonSkills.filter(skill =>
      text.includes(skill) || text.includes(skill.replace('.', ''))
    );

    // Extract soft skills
    const softSkillPatterns = [
      'communication', 'teamwork', 'leadership', 'problem solving', 'problem-solving',
      'creativity', 'collaboration', 'time management', 'adaptability'
    ];

    const foundSoftSkills = softSkillPatterns.filter(skill => text.includes(skill));

    return {
      title: title.replace(/^(job\s+title\s*:?\s*|position\s*:?\s*)/i, '').trim(),
      company: company,
      location: null,
      workType: text.includes('intern') ? 'intern' : 'full-time',
      responsibilities: ['Develop software solutions', 'Collaborate with team members'],
      skills: foundSkills.length > 0 ? foundSkills : ['Programming', 'Problem Solving'],
      softSkills: foundSoftSkills.length > 0 ? foundSoftSkills : ['Communication', 'Teamwork'],
      requirements: foundSkills.map(skill => `Experience with ${skill}`),
      salary: null,
      benefits: null,
      description: 'Software development position'
    };
  }

  // Health check method
  async healthCheck() {
    try {
      const response = await this.generateContent('Reply "Service OK"');
      return response.includes('Service OK') || response.includes('OK');
    } catch (error) {
      return false;
    }
  }
}

// Export singleton instance
module.exports = new GeminiService();