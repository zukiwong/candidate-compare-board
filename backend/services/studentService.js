const geminiService = require('./geminiService');

// Mock student profile data
const studentProfile = {
  id: "student-1",
  name: "Zuki Wong",
  email: "zuki.wong@example.com",
  phone: "+64 21 123 4567",
  education: {
    school: "University of Auckland",
    degree: "Bachelor of Computer Science",
    year: "3rd Year",
    gpa: "A-"
  },
  skills: {
    programming: ["JavaScript", "TypeScript", "Python", "Java", "SQL"],
    frameworks: ["React", "Node.js", "Express", "Spring Boot", "TensorFlow", "OpenAI API"],
    tools: ["Git", "Docker", "VS Code", "Figma"],
    databases: ["PostgreSQL", "MongoDB", "MySQL"],
    cloud: ["Basic AWS", "Heroku"],
    soft: ["Problem solving", "Full-stack development", "AI/ML"]
  },
  experience: [
    {
      title: "Frontend Developer Intern",
      company: "Local Startup",
      duration: "3 months",
      description: "Built responsive web applications using React and TypeScript"
    }
  ],
  projects: [
    {
      name: "E-commerce Platform",
      tech: ["React", "Node.js", "PostgreSQL"],
      description: "Full-stack web application with payment integration"
    },
    {
      name: "AI Chat Bot",
      tech: ["Python", "OpenAI API", "Flask"],
      description: "Intelligent customer service chatbot with NLP capabilities"
    }
  ]
};

// Mock job data
const appliedJobs = [
  {
    id: "job-1",
    title: "AI Product Engineer",
    company: "One New Zealand",
    location: "Auckland",
    salary: "$28.95 per hour",
    duration: "Full time summer internship",
    startDate: "17 Nov 2025",
    type: "internship",
    description: {
      purpose: "High-agency product builder — customer focused, technical, impact-obsessed, and here to ship things that matter. Work as a full-stack AI-native builder, turning ambiguity into working solutions with code, AI agents, and automation.",
      accountabilities: [
        "Ship outcomes at speed — take ideas from zero to live users fast",
        "Jump between stacks with ease — frontend UI/UX, backend API builds, deployment automation",
        "Prove possibilities — validate ideas with working prototype",
        "Cut bureaucracy to the bone — focus on real outcomes",
        "Iterate relentlessly — ship updates weekly based on live user feedback",
        "Direct and orchestrate AI agents — leading AI as a delivery partner"
      ],
      requirements: [
        "A doer, not just a dreamer — measure progress in shipped features",
        "Multi-stack curious — strong in one domain but hungry to learn the rest",
        "AI-native — already use AI to code, design, debug, test, and think",
        "Fast mover — go from zero to working prototype in hours, not weeks",
        "Comfortable with chaos — tools change, APIs break, priorities shift",
        "Impact-driven — care about making things better for real people"
      ]
    },
    skills: {
      required: ["Problem solving", "AI/ML", "Full-stack development"],
      preferred: ["Frontend frameworks", "Backend APIs", "DevOps", "UX design"],
      categories: [
        "BUSINESS / DATA / PEOPLE: Problem solving",
        "DESIGN: User Experience (UX)",
        "SYSTEMS / OPS / DBA: Systems Infrastructure",
        "WEB / PROGRAMMING: AI/Front-end Web Frameworks"
      ]
    },
    applicationStatus: "applied",
    appliedDate: "2024-10-15"
  },
  {
    id: "job-2",
    title: "Software Engineer Intern (.NET)",
    company: "Pushpay",
    location: "Auckland",
    salary: "$30 per hour",
    duration: "Full time summer internship",
    startDate: "3 Nov - 28 Nov 2025",
    type: "internship",
    description: {
      purpose: "Join a team of experienced software engineers working on scaling, enhancing, and maintaining modern world class engagement and payment experiences through web and mobile apps.",
      accountabilities: [
        "Work closely with experienced engineers through mentoring and coaching",
        "Take an individual project from ideation to deployment using Agile principles",
        "Apply Software Development Life Cycle methodologies",
        "Contribute to scaling payment and engagement platforms",
        "Participate in code reviews and team collaboration"
      ],
      requirements: [
        "Studying computer science, software engineering, or programming experience",
        "Potential and desire to learn",
        "Asking questions is encouraged",
        "Collaborative mindset",
        "Interest in financial technology and charitable giving"
      ],
      benefits: [
        "Exceptionally talented and generous colleagues",
        "Advanced gear",
        "Friday in-office happy hour",
        "Healthy food & drink options (including espresso machine!)",
        "Communicative leadership"
      ]
    },
    skills: {
      required: ["C#", ".NET", "SQL", "Web Development"],
      preferred: ["React", "TypeScript", "AWS", "Automated Testing", "git"],
      categories: [
        "SYSTEMS / OPS / DBA: Amazon Web Services (AWS)",
        "WEB / PROGRAMMING: C#, CSS, HTML, Javascript, React, SQL, SQL Server, Testing, Web Development"
      ]
    },
    applicationStatus: "applied",
    appliedDate: "2024-10-12"
  }
];

// Storage for generated data
const generatedData = {
  gapAnalyses: {},
  questions: {},
  pitches: {},
  matchScores: {},
  answers: {},
  customPitches: {}
};

async function getStudentProfile() {
  return studentProfile;
}

async function getAppliedJobs() {
  // Initialize mock data for demo if not already generated
  for (const job of appliedJobs) {
    if (!generatedData.matchScores[job.id]) {
      generatedData.matchScores[job.id] = await calculateMatchScore(job.id);
    }
    if (!generatedData.gapAnalyses[job.id]) {
      // Generate mock gap analysis immediately
      const mockGapAnalysis = {
        strengths: [
          "Strong foundation in web development (React/TypeScript)",
          "Hands-on experience with full-stack development",
          "Experience with modern development tools and practices"
        ],
        gaps: [
          job.id === "job-1" ? "Limited AI/ML practical experience" : "No experience with C# and .NET framework",
          job.id === "job-1" ? "Need more DevOps and infrastructure knowledge" : "Limited cloud platform experience with AWS",
          "Could improve rapid prototyping and iteration skills"
        ],
        suggestions: [
          job.id === "job-1" ? "Complete online AI/ML courses and build a personal AI project" : "Take C# fundamentals course and build a simple .NET web API",
          job.id === "job-1" ? "Learn Docker, CI/CD, and basic cloud deployment" : "Explore AWS services and complete cloud practitioner certification",
          "Practice building MVPs quickly with time-boxed projects"
        ]
      };
      generatedData.gapAnalyses[job.id] = mockGapAnalysis;
    }
    if (!generatedData.questions[job.id]) {
      // Generate mock questions immediately
      const mockQuestions = job.id === "job-1" ? [
        "Tell me about a time you built something from idea to working prototype quickly.",
        "How do you approach learning new technologies when working on a project?",
        "Describe your experience using AI tools in your development workflow.",
        "Walk me through how you would validate a new product idea with users.",
        "What's your approach to balancing technical debt vs. shipping features quickly?"
      ] : [
        "Why are you interested in working with .NET technology stack?",
        "How do you approach learning a completely new programming language or framework?",
        "Tell me about a challenging technical problem you've solved recently.",
        "What interests you about working in the fintech/charitable giving space?",
        "Describe your experience working in an Agile development environment."
      ];
      generatedData.questions[job.id] = mockQuestions;
    }
    if (!generatedData.pitches[job.id]) {
      // Generate mock pitch immediately
      const mockPitch = {
        keyPoints: job.id === "job-1" ? [
          "Passionate about AI-driven product development with hands-on experience in React/TypeScript",
          "Proven ability to learn quickly and adapt to new technologies (demonstrated through diverse coursework)",
          "Strong problem-solving mindset with focus on user impact",
          "Experience with end-to-end development from frontend to deployment",
          "Eager to contribute to innovative AI products at One New Zealand"
        ] : [
          "Computer science student with strong web development foundation in React/TypeScript",
          "Quick learner excited to expand skills into C#/.NET ecosystem",
          "Passionate about using technology for social good and charitable impact",
          "Collaborative team player with experience in Agile methodologies",
          "Eager to contribute to Pushpay's mission of driving charitable giving through technology"
        ],
        timeframe: "5-10 minutes"
      };
      generatedData.pitches[job.id] = mockPitch;
    }
  }

  // Merge with generated data
  return appliedJobs.map(job => ({
    ...job,
    matchScore: generatedData.matchScores[job.id],
    gapAnalysis: generatedData.gapAnalyses[job.id],
    aiQuestions: generatedData.questions[job.id],
    elevatorPitch: generatedData.pitches[job.id]
  }));
}

async function generateGapAnalysis(jobId) {
  const job = appliedJobs.find(j => j.id === jobId);
  if (!job) {
    throw new Error('Job not found');
  }

  try {
    const prompt = `
    Analyze the gap between the student profile and job requirements:

    Student Profile:
    - Education: ${studentProfile.education.degree} at ${studentProfile.education.school}
    - Skills: ${[...studentProfile.skills.programming, ...studentProfile.skills.frameworks].join(', ')}
    - Experience: ${studentProfile.experience.map(exp => `${exp.title} at ${exp.company}`).join(', ')}
    - Projects: ${studentProfile.projects.map(proj => proj.name).join(', ')}

    Job Requirements:
    - Title: ${job.title} at ${job.company}
    - Required Skills: ${job.skills.required.join(', ')}
    - Preferred Skills: ${job.skills.preferred.join(', ')}
    - Role Purpose: ${job.description.purpose}

    Please provide a detailed gap analysis in JSON format with the following structure:
    {
      "strengths": ["strength1", "strength2", "strength3"],
      "gaps": ["gap1", "gap2", "gap3"],
      "suggestions": ["suggestion1", "suggestion2", "suggestion3"]
    }

    Focus on specific, actionable insights.
    `;

    const response = await geminiService.analyzeWithAI(prompt);
    const gapAnalysis = JSON.parse(response);

    // Store the generated analysis
    generatedData.gapAnalyses[jobId] = gapAnalysis;

    return gapAnalysis;
  } catch (error) {
    console.error('Error generating gap analysis:', error);

    // Fallback mock data
    const mockGapAnalysis = {
      strengths: [
        "Strong foundation in web development (React/TypeScript)",
        "Hands-on experience with full-stack development",
        "Experience with modern development tools and practices"
      ],
      gaps: [
        jobId === "job-1" ? "Limited AI/ML practical experience" : "No experience with C# and .NET framework",
        jobId === "job-1" ? "Need more DevOps and infrastructure knowledge" : "Limited cloud platform experience with AWS",
        "Could improve rapid prototyping and iteration skills"
      ],
      suggestions: [
        jobId === "job-1" ? "Complete online AI/ML courses and build a personal AI project" : "Take C# fundamentals course and build a simple .NET web API",
        jobId === "job-1" ? "Learn Docker, CI/CD, and basic cloud deployment" : "Explore AWS services and complete cloud practitioner certification",
        "Practice building MVPs quickly with time-boxed projects"
      ]
    };

    generatedData.gapAnalyses[jobId] = mockGapAnalysis;
    return mockGapAnalysis;
  }
}

async function generateInterviewQuestions(jobId) {
  const job = appliedJobs.find(j => j.id === jobId);
  if (!job) {
    throw new Error('Job not found');
  }

  try {
    const prompt = `
    Generate interview questions for this specific job and student profile:

    Job: ${job.title} at ${job.company}
    Job Description: ${job.description.purpose}
    Required Skills: ${job.skills.required.join(', ')}

    Student Background:
    - ${studentProfile.education.degree} student
    - Skills: ${[...studentProfile.skills.programming, ...studentProfile.skills.frameworks].join(', ')}
    - Experience: ${studentProfile.experience.map(exp => exp.description).join(', ')}

    Generate 5 tailored interview questions that this company would likely ask this student. Return as a JSON array of strings.
    Include a mix of technical, behavioral, and role-specific questions.
    `;

    const response = await geminiService.analyzeWithAI(prompt);
    const questions = JSON.parse(response);

    generatedData.questions[jobId] = questions;
    return questions;
  } catch (error) {
    console.error('Error generating interview questions:', error);

    // Fallback mock questions
    const mockQuestions = jobId === "job-1" ? [
      "Tell me about a time you built something from idea to working prototype quickly.",
      "How do you approach learning new technologies when working on a project?",
      "Describe your experience using AI tools in your development workflow.",
      "Walk me through how you would validate a new product idea with users.",
      "What's your approach to balancing technical debt vs. shipping features quickly?"
    ] : [
      "Why are you interested in working with .NET technology stack?",
      "How do you approach learning a completely new programming language or framework?",
      "Tell me about a challenging technical problem you've solved recently.",
      "What interests you about working in the fintech/charitable giving space?",
      "Describe your experience working in an Agile development environment."
    ];

    generatedData.questions[jobId] = mockQuestions;
    return mockQuestions;
  }
}

async function generateElevatorPitch(jobId) {
  const job = appliedJobs.find(j => j.id === jobId);
  if (!job) {
    throw new Error('Job not found');
  }

  try {
    const prompt = `
    Create an elevator pitch for this student applying to this specific job:

    Student: ${studentProfile.name}
    Education: ${studentProfile.education.degree} at ${studentProfile.education.school}
    Key Skills: ${[...studentProfile.skills.programming, ...studentProfile.skills.frameworks].slice(0, 5).join(', ')}
    Key Projects: ${studentProfile.projects.map(p => p.name).join(', ')}

    Job: ${job.title} at ${job.company}
    Company Focus: ${job.description.purpose}

    Create 5 key points for a 5-10 minute elevator pitch. Return as JSON:
    {
      "keyPoints": ["point1", "point2", "point3", "point4", "point5"],
      "timeframe": "5-10 minutes"
    }

    Each point should be specific, compelling, and connect the student's background to the job requirements.
    `;

    const response = await geminiService.analyzeWithAI(prompt);
    const pitch = JSON.parse(response);

    generatedData.pitches[jobId] = pitch;
    return pitch;
  } catch (error) {
    console.error('Error generating elevator pitch:', error);

    // Fallback mock pitch
    const mockPitch = {
      keyPoints: jobId === "job-1" ? [
        "Passionate about AI-driven product development with hands-on experience in React/TypeScript",
        "Proven ability to learn quickly and adapt to new technologies (demonstrated through diverse coursework)",
        "Strong problem-solving mindset with focus on user impact",
        "Experience with end-to-end development from frontend to deployment",
        "Eager to contribute to innovative AI products at One New Zealand"
      ] : [
        "Computer science student with strong web development foundation in React/TypeScript",
        "Quick learner excited to expand skills into C#/.NET ecosystem",
        "Passionate about using technology for social good and charitable impact",
        "Collaborative team player with experience in Agile methodologies",
        "Eager to contribute to Pushpay's mission of driving charitable giving through technology"
      ],
      timeframe: "5-10 minutes"
    };

    generatedData.pitches[jobId] = mockPitch;
    return mockPitch;
  }
}

async function calculateMatchScore(jobId) {
  const job = appliedJobs.find(j => j.id === jobId);
  if (!job) {
    throw new Error('Job not found');
  }

  // Simple matching algorithm
  const studentSkills = [
    ...studentProfile.skills.programming,
    ...studentProfile.skills.frameworks,
    ...studentProfile.skills.tools
  ].map(skill => skill.toLowerCase());

  const requiredSkills = job.skills.required.map(skill => skill.toLowerCase());
  const preferredSkills = job.skills.preferred.map(skill => skill.toLowerCase());

  let matchScore = 0;
  let requiredMatches = 0;
  let preferredMatches = 0;

  // Check required skills (70% weight)
  requiredSkills.forEach(skill => {
    if (studentSkills.some(studentSkill =>
        studentSkill.includes(skill) || skill.includes(studentSkill)
    )) {
      requiredMatches++;
    }
  });

  // Check preferred skills (30% weight)
  preferredSkills.forEach(skill => {
    if (studentSkills.some(studentSkill =>
        studentSkill.includes(skill) || skill.includes(studentSkill)
    )) {
      preferredMatches++;
    }
  });

  // Calculate score
  const requiredScore = (requiredMatches / requiredSkills.length) * 70;
  const preferredScore = (preferredMatches / preferredSkills.length) * 30;
  matchScore = Math.round(requiredScore + preferredScore);

  generatedData.matchScores[jobId] = matchScore;
  return matchScore;
}

async function saveQuestionAnswer(jobId, questionIndex, answer) {
  if (!generatedData.answers[jobId]) {
    generatedData.answers[jobId] = {};
  }
  generatedData.answers[jobId][questionIndex] = answer;
  return true;
}

async function saveCustomPitch(jobId, pitch) {
  generatedData.customPitches[jobId] = pitch;
  return true;
}

module.exports = {
  getStudentProfile,
  getAppliedJobs,
  generateGapAnalysis,
  generateInterviewQuestions,
  generateElevatorPitch,
  calculateMatchScore,
  saveQuestionAnswer,
  saveCustomPitch
};