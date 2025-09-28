export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: {
    current: string;
    preferred: string[];
  };
  education: {
    school: string;
    degree: string;
    major: string;
    year: string;
    gpa: string;
    graduationDate: string;
    relevantCourses: string[];
  };
  skills: {
    programming: Array<{
      name: string;
      level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
      yearsOfExperience: number;
    }>;
    frameworks: Array<{
      name: string;
      level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
      projects: number;
    }>;
    tools: Array<{
      name: string;
      level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
      usage: string;
    }>;
    databases: Array<{
      name: string;
      level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
      projects: number;
    }>;
    cloud: Array<{
      name: string;
      level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
      certifications?: string[];
    }>;
    soft: Array<{
      name: string;
      description: string;
      examples: string[];
    }>;
  };
  experience: Array<{
    title: string;
    company: string;
    type: "Internship" | "Part-time" | "Full-time" | "Freelance" | "Volunteer";
    duration: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string;
    achievements: string[];
    technologies: string[];
  }>;
  projects: Array<{
    name: string;
    description: string;
    role: string;
    duration: string;
    technologies: string[];
    achievements: string[];
    githubUrl?: string;
    liveUrl?: string;
    teamSize?: number;
  }>;
  achievements: Array<{
    title: string;
    date: string;
    description: string;
    organization?: string;
  }>;
  interests: {
    technical: string[];
    personal: string[];
    careerGoals: string[];
  };
  availability: {
    startDate: string;
    preferredHours: string;
    flexibility: string;
  };
}

export const zukiWongProfile: StudentProfile = {
  id: "student-zuki-001",
  name: "Zuki Wong",
  email: "zuki.wong@aucklanduni.ac.nz",
  phone: "+64 21 123 4567",
  location: {
    current: "Auckland, New Zealand",
    preferred: ["Auckland", "Wellington", "Remote"]
  },
  education: {
    school: "University of Waikato",
    degree: "Bachelor of Information Technology",
    major: "Software Engineering",
    year: "2rd Year",
    gpa: "A- (GPA: 7.2/9.0)",
    graduationDate: "February 2026",
    relevantCourses: [
      "Software Engineering Design",
      "Data Structures and Algorithms",
      "Database Systems",
      "Web Development",
      "Machine Learning Fundamentals",
      "Computer Networks",
      "Human-Computer Interaction",
      "Agile Software Development"
    ]
  },
  skills: {
    programming: [
      {
        name: "JavaScript",
        level: "Advanced",
        yearsOfExperience: 3
      },
      {
        name: "TypeScript",
        level: "Advanced",
        yearsOfExperience: 2
      },
      {
        name: "Python",
        level: "Intermediate",
        yearsOfExperience: 2
      },
      {
        name: "Java",
        level: "Intermediate",
        yearsOfExperience: 2
      },
      {
        name: "C#",
        level: "Beginner",
        yearsOfExperience: 0.5
      },
      {
        name: "SQL",
        level: "Intermediate",
        yearsOfExperience: 1.5
      },
      {
        name: "HTML/CSS",
        level: "Advanced",
        yearsOfExperience: 3
      }
    ],
    frameworks: [
      {
        name: "React",
        level: "Advanced",
        projects: 8
      },
      {
        name: "Node.js",
        level: "Intermediate",
        projects: 5
      },
      {
        name: "Express.js",
        level: "Intermediate",
        projects: 4
      },
      {
        name: "Next.js",
        level: "Intermediate",
        projects: 3
      },
      {
        name: "Spring Boot",
        level: "Beginner",
        projects: 2
      },
      {
        name: "Flask",
        level: "Beginner",
        projects: 2
      },
      {
        name: "Tailwind CSS",
        level: "Advanced",
        projects: 6
      },
      {
        name: "TensorFlow",
        level: "Beginner",
        projects: 1
      },
      {
        name: "OpenAI API",
        level: "Intermediate",
        projects: 2
      }
    ],
    tools: [
      {
        name: "Git",
        level: "Advanced",
        usage: "Daily version control and collaboration"
      },
      {
        name: "Docker",
        level: "Intermediate",
        usage: "Container development and deployment"
      },
      {
        name: "VS Code",
        level: "Expert",
        usage: "Primary development environment"
      },
      {
        name: "Figma",
        level: "Intermediate",
        usage: "UI/UX design and prototyping"
      },
      {
        name: "Postman",
        level: "Intermediate",
        usage: "API testing and documentation"
      },
      {
        name: "Jest",
        level: "Intermediate",
        usage: "Unit testing for JavaScript projects"
      }
    ],
    databases: [
      {
        name: "PostgreSQL",
        level: "Intermediate",
        projects: 4
      },
      {
        name: "MongoDB",
        level: "Intermediate",
        projects: 3
      },
      {
        name: "MySQL",
        level: "Beginner",
        projects: 2
      },
      {
        name: "Redis",
        level: "Beginner",
        projects: 1
      }
    ],
    cloud: [
      {
        name: "AWS",
        level: "Beginner",
        certifications: []
      },
      {
        name: "Heroku",
        level: "Intermediate",
        certifications: []
      },
      {
        name: "Vercel",
        level: "Intermediate",
        certifications: []
      },
      {
        name: "Netlify",
        level: "Intermediate",
        certifications: []
      }
    ],
    soft: [
      {
        name: "Problem Solving",
        description: "Strong analytical thinking and systematic approach to complex problems",
        examples: [
          "Debugged complex multi-service architecture issues in team projects",
          "Optimized database queries reducing response time by 60%",
          "Designed efficient algorithms for data processing challenges"
        ]
      },
      {
        name: "Team Collaboration",
        description: "Excellent communication and teamwork in diverse environments",
        examples: [
          "Led a 5-person team in university capstone project",
          "Collaborated with international students on open-source contributions",
          "Facilitated daily standups and sprint planning in Agile projects"
        ]
      },
      {
        name: "Adaptability",
        description: "Quick learner who embraces new technologies and changing requirements",
        examples: [
          "Learned React and TypeScript in 2 weeks for urgent project deadline",
          "Adapted to remote work and online learning during COVID-19",
          "Successfully switched from Java to JavaScript ecosystem for internship"
        ]
      },
      {
        name: "Communication",
        description: "Clear technical communication with both technical and non-technical stakeholders",
        examples: [
          "Presented technical demos to university faculty and industry partners",
          "Wrote comprehensive documentation for open-source projects",
          "Mentored junior students in programming fundamentals"
        ]
      },
      {
        name: "Full-stack development",
        description: "Comprehensive experience in both frontend and backend development",
        examples: [
          "Built complete web applications from database design to user interface",
          "Developed RESTful APIs and integrated them with React frontends",
          "Deployed full-stack applications to cloud platforms with CI/CD pipelines"
        ]
      }
    ]
  },
  experience: [
    {
      title: "Frontend Developer Intern",
      company: "TechStart Auckland",
      type: "Internship",
      duration: "3 months",
      startDate: "December 2023",
      endDate: "February 2024",
      location: "Auckland, New Zealand",
      description: "Developed responsive web applications using React and TypeScript for a local startup focusing on small business solutions.",
      achievements: [
        "Built 5 responsive web components used across 3 different client projects",
        "Improved website loading speed by 40% through code optimization",
        "Collaborated with designers to implement pixel-perfect UI designs",
        "Participated in daily standups and sprint planning meetings"
      ],
      technologies: ["React", "TypeScript", "Tailwind CSS", "Git", "Figma"]
    },
    {
      title: "Web Development Tutor",
      company: "University of Auckland",
      type: "Part-time",
      duration: "8 months",
      startDate: "March 2024",
      endDate: "Present",
      location: "Auckland, New Zealand",
      description: "Tutor first and second-year students in web development fundamentals, helping them build their first web applications.",
      achievements: [
        "Tutored 40+ students in HTML, CSS, JavaScript, and basic React",
        "Maintained 95% student satisfaction rating across all semesters",
        "Created supplementary learning materials and coding exercises",
        "Helped struggling students improve grades by average of 15%"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "React", "Teaching"]
    },
    {
      title: "Volunteer Developer",
      company: "Code for Auckland",
      type: "Volunteer",
      duration: "6 months",
      startDate: "June 2024",
      endDate: "Present",
      location: "Auckland, New Zealand",
      description: "Contributing to open-source civic technology projects that benefit the Auckland community.",
      achievements: [
        "Contributed to 3 open-source projects with 50+ GitHub commits",
        "Fixed critical bugs in community resource mapping application",
        "Implemented new features for local charity management system",
        "Collaborated with designers and product managers in volunteer capacity"
      ],
      technologies: ["React", "Node.js", "MongoDB", "Git", "Docker"]
    }
  ],
  projects: [
    {
      name: "EcoTracker - Sustainability App",
      description: "Full-stack web application that helps users track their carbon footprint and discover eco-friendly alternatives for daily activities.",
      role: "Full-Stack Developer & Team Lead",
      duration: "4 months",
      technologies: ["React", "Node.js", "Express", "PostgreSQL", "Docker", "AWS"],
      achievements: [
        "Led team of 5 developers using Agile methodology",
        "Implemented user authentication and data visualization features",
        "Integrated third-party APIs for carbon footprint calculations",
        "Deployed application to AWS with CI/CD pipeline",
        "Achieved 90% test coverage with Jest and React Testing Library"
      ],
      githubUrl: "https://github.com/zukiwong/ecotracker",
      liveUrl: "https://ecotracker-app.com",
      teamSize: 5
    },
    {
      name: "StudyBuddy - Peer Learning Platform",
      description: "Platform connecting university students for collaborative study sessions with real-time video chat and shared whiteboards.",
      role: "Frontend Developer",
      duration: "3 months",
      technologies: ["React", "TypeScript", "Socket.io", "WebRTC", "Material-UI"],
      achievements: [
        "Built responsive UI components for video conferencing features",
        "Implemented real-time collaboration tools using WebSocket technology",
        "Designed and developed user onboarding flow with 85% completion rate",
        "Optimized application performance resulting in 50% faster load times"
      ],
      githubUrl: "https://github.com/zukiwong/studybuddy",
      teamSize: 4
    },
    {
      name: "AI Recipe Generator",
      description: "Machine learning powered web app that generates personalized recipes based on available ingredients and dietary preferences.",
      role: "Solo Developer",
      duration: "2 months",
      technologies: ["Python", "Flask", "OpenAI API", "React", "MongoDB"],
      achievements: [
        "Integrated OpenAI GPT API for intelligent recipe generation",
        "Built recommendation system using collaborative filtering",
        "Implemented user preference learning algorithm",
        "Created intuitive ingredient selection interface"
      ],
      githubUrl: "https://github.com/zukiwong/ai-recipe-generator",
      liveUrl: "https://ai-recipes.vercel.app",
      teamSize: 1
    },
    {
      name: "Campus Event Management System",
      description: "University capstone project - comprehensive event management platform for student organizations with booking and payment features.",
      role: "Backend Developer",
      duration: "6 months",
      technologies: ["Java", "Spring Boot", "MySQL", "React", "Stripe API"],
      achievements: [
        "Designed and implemented RESTful API serving 1000+ concurrent users",
        "Built secure payment processing system using Stripe integration",
        "Implemented role-based access control and user management",
        "Optimized database queries reducing response time by 70%"
      ],
      githubUrl: "https://github.com/zukiwong/campus-events",
      teamSize: 6
    }
  ],
  achievements: [
    {
      title: "Dean's List Academic Excellence",
      date: "December 2023",
      description: "Recognized for maintaining GPA above 7.0 for consecutive semesters",
      organization: "University of Auckland"
    },
    {
      title: "Best Technical Implementation Award",
      date: "October 2024",
      description: "Won first place in university hackathon for innovative use of AI in sustainability tracking",
      organization: "Auckland Tech Hackathon 2024"
    },
    {
      title: "Outstanding Tutor Recognition",
      date: "July 2024",
      description: "Recognized for exceptional student support and innovative teaching methods",
      organization: "University of Auckland Computer Science Department"
    },
    {
      title: "Open Source Contributor Badge",
      date: "September 2024",
      description: "Contributed to 10+ open source projects with meaningful code contributions",
      organization: "GitHub"
    }
  ],
  interests: {
    technical: [
      "Artificial Intelligence and Machine Learning",
      "Sustainable Technology Solutions",
      "Full-Stack Web Development",
      "Cloud Computing and DevOps",
      "Open Source Software Development",
      "User Experience Design",
      "Mobile App Development"
    ],
    personal: [
      "Environmental Conservation",
      "Rock Climbing and Hiking",
      "Photography",
      "Cooking International Cuisines",
      "Board Games and Strategy Games",
      "Volunteer Work with Local Charities"
    ],
    careerGoals: [
      "Become a senior full-stack developer specializing in AI-powered applications",
      "Lead development teams in creating sustainable technology solutions",
      "Contribute to open-source projects that benefit communities",
      "Pursue advanced studies in AI and machine learning",
      "Start a tech company focused on environmental sustainability"
    ]
  },
  availability: {
    startDate: "November 2024",
    preferredHours: "Full-time (40 hours/week) or Part-time (20-30 hours/week)",
    flexibility: "Available for flexible hours including some weekend work if needed"
  }
};

// Simplified version for quick access
export const studentProfileSummary = {
  name: zukiWongProfile.name,
  email: zukiWongProfile.email,
  phone: zukiWongProfile.phone,
  education: `${zukiWongProfile.education.degree} at ${zukiWongProfile.education.school}`,
  keySkills: [
    "JavaScript/TypeScript",
    "React",
    "Node.js",
    "Python",
    "Full-Stack Development",
    "Problem Solving"
  ],
  topProjects: zukiWongProfile.projects.slice(0, 3).map(p => p.name),
  gpa: zukiWongProfile.education.gpa,
  availability: zukiWongProfile.availability.startDate
};