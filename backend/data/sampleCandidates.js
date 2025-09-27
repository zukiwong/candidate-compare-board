// Sample candidate data for internship platform
// All candidates are either recent graduates or current students

const sampleCandidates = [
  {
    id: "cand_001",
    profile: {
      name: "Sarah Chen",
      initials: "SC",
      avatar_url: null,
      contact: {
        email: "sarah.chen@email.com",
        phone: "+64-21-123-4567"
      },
      location: {
        city: "Auckland",
        country: "NZ",
        remote_friendly: true,
        preferred_regions: ["Auckland", "Wellington", "Remote"]
      },
      links: {
        github: "https://github.com/zukiwong",
        portfolio: "https://drive.google.com/file/d/1IXBxdC6lOyHHIeDuO_1hhcLIToxAgdlh/view",
        linkedin: "https://www.linkedin.com/in/zuki-wong/",
        resume: "/assets/ZukiWong_CV.pdf",
        transcript: "assets/academic-transcript.pdf",
        visa: "assets/visa-status.pdf"
      },
      availability: {
        start_date: "2024-02-01",
        end_date: null,
        hours_per_week: 40
      },
      work_auth: {
        visa_status: "Work Visa",
        work_authorization: "Full-time eligible",
        relocation_ok: true
      }
    },
    education: [
      {
        institution: "University of Auckland",
        degree: "Bachelor of Software Engineering",
        graduation_date: "2023-12",
        gpa: 3.8,
        relevant_coursework: ["Data Structures", "Algorithms", "Web Development", "Database Systems"],
        logo: null
      }
    ],
    experience: [
      {
        title: "Frontend Developer Intern",
        company: "TechStart NZ",
        duration: "3 months",
        duration_months: 3,
        start_date: "2023-06",
        end_date: "2023-09",
        description: "Developed responsive web components using React and TypeScript for a fintech startup",
        technologies: ["React", "TypeScript", "Tailwind CSS", "Git"],
        achievements: [
          "Built 5 reusable UI components reducing development time by 30%",
          "Improved website performance by 25% through code optimization",
          "Collaborated with design team to implement pixel-perfect interfaces"
        ]
      }
    ],
    projects: [
      {
        title: "E-commerce Platform",
        description: "Full-stack e-commerce website with payment integration and admin dashboard",
        duration: "4 months",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API", "JWT"],
        github_url: "https://github.com/zukiwong/ecommerce-platform",
        live_url: "https://myecommerce-demo.netlify.app",
        highlights: [
          "Implemented secure payment processing with Stripe",
          "Built real-time inventory management system",
          "Deployed using Docker and AWS EC2"
        ]
      },
      {
        title: "Task Management App",
        description: "Collaborative task management application with real-time updates",
        duration: "2 months",
        technologies: ["React", "TypeScript", "Socket.io", "Node.js", "PostgreSQL"],
        github_url: "https://github.com/zukiwong/task-manager",
        live_url: null,
        highlights: [
          "Real-time collaboration features using WebSocket",
          "Drag-and-drop task organization",
          "User authentication and role-based permissions"
        ]
      },
      {
        title: "University Course Planner",
        description: "Academic planning tool for university students to track degree progress",
        duration: "3 months",
        technologies: ["Vue.js", "Python", "Flask", "SQLite", "Chart.js"],
        github_url: "https://github.com/zukiwong/course-planner",
        live_url: "https://course-planner-demo.vercel.app",
        highlights: [
          "Built degree requirement validation system",
          "Interactive course prerequisite visualization",
          "Used by 200+ students at University of Auckland"
        ]
      }
    ],
    skills: {
      core_skills: [
        { name: "React", self_rank: 1, level: 5, evidence: ["E-commerce Platform", "Task Management App"] },
        { name: "TypeScript", self_rank: 2, level: 4, evidence: ["Task Management App", "Frontend Internship"] },
        { name: "Node.js", self_rank: 3, level: 4, evidence: ["E-commerce Platform", "Task Management App"] },
        { name: "JavaScript", self_rank: 4, level: 5, evidence: ["Multiple projects", "University coursework"] },
        { name: "Python", self_rank: 5, level: 3, evidence: ["Course Planner", "University projects"] },
        { name: "Git", self_rank: 6, level: 4, evidence: ["All projects", "Internship experience"] }
      ],
      soft_skills: [
        { name: "Communication", level: 4 },
        { name: "Teamwork", level: 5 },
        { name: "Problem Solving", level: 5 },
        { name: "Time Management", level: 4 }
      ]
    },
    matching: {
      core_skill_match_pct: 88,
      technical_skills_score: 92,
      experience_score: 85,
      project_complexity_score: 90,
      education_score: 88,
      soft_skills_score: 86,
      portfolio_quality_score: 94,
      strengths: [
        "Strong React and frontend development skills",
        "Real project experience with modern tech stack",
        "Good collaboration skills from internship"
      ],
      gaps: [
        "Limited backend experience",
        "Could benefit from more DevOps knowledge"
      ],
      ai_suggested_questions: [
        "I see you built an e-commerce platform handling 1000+ concurrent users. What was the biggest scaling challenge you encountered?",
        "Your task management app includes real-time updates. Can you walk me through your WebSocket implementation approach?",
        "Looking at your TechStart NZ internship, which project had the steepest learning curve and why?"
      ]
    },
    meta: {
      created_at: "2024-01-10T00:00:00Z",
      updated_at: "2024-01-15T00:00:00Z",
      source: "university_career_portal"
    }
  },
  {
    id: "cand_002",
    profile: {
      name: "Marcus Johnson",
      initials: "MJ",
      avatar_url: null,
      contact: {
        email: "marcus.johnson@student.ac.nz",
        phone: "+64-21-987-6543"
      },
      location: {
        city: "Wellington",
        country: "NZ",
        remote_friendly: false,
        preferred_regions: ["Wellington", "Auckland"]
      },
      links: {
        github: "https://github.com/zukiwong",
        portfolio: "https://drive.google.com/file/d/1IXBxdC6lOyHHIeDuO_1hhcLIToxAgdlh/view",
        linkedin: "https://www.linkedin.com/in/zuki-wong/",
        resume: "/assets/ZukiWong_CV.pdf",
        transcript: "assets/academic-transcript.pdf",
        visa: "assets/visa-status.pdf"
      },
      availability: {
        start_date: "2024-07-01",
        end_date: "2024-12-31",
        hours_per_week: 40
      },
      work_auth: {
        visa_status: "Student Visa",
        work_authorization: "20hrs/week during study",
        relocation_ok: false
      }
    },
    education: [
      {
        institution: "Victoria University of Wellington",
        degree: "Bachelor of Computer Science",
        graduation_date: "2024-12",
        gpa: 3.6,
        relevant_coursework: ["Machine Learning", "Data Mining", "Statistics", "Python Programming"],
        logo: null
      }
    ],
    experience: [
      {
        title: "Data Analytics Intern",
        company: "Wellington City Council",
        duration: "4 months",
        duration_months: 4,
        start_date: "2023-11",
        end_date: "2024-03",
        description: "Analyzed city traffic data and created automated reporting dashboards",
        technologies: ["Python", "Pandas", "Matplotlib", "SQL", "Power BI"],
        achievements: [
          "Automated weekly traffic reports saving 10 hours/week",
          "Built predictive model for traffic congestion with 85% accuracy",
          "Created interactive dashboards used by city planning team"
        ]
      }
    ],
    projects: [
      {
        title: "Student Grade Predictor",
        description: "Machine learning model to predict student performance based on study habits",
        duration: "3 months",
        technologies: ["Python", "Scikit-learn", "Pandas", "Flask", "React"],
        github_url: "https://github.com/zukiwong/grade-predictor",
        live_url: null,
        highlights: [
          "Achieved 89% prediction accuracy using ensemble methods",
          "Collected and processed data from 500+ students",
          "Built web interface for easy prediction input"
        ]
      },
      {
        title: "Campus Event Recommender",
        description: "Recommendation system for university events based on student interests",
        duration: "2 months",
        technologies: ["Python", "MongoDB", "FastAPI", "React", "Docker"],
        github_url: "https://github.com/zukiwong/event-recommender",
        live_url: "https://campus-events.herokuapp.com",
        highlights: [
          "Collaborative filtering algorithm with 78% user satisfaction",
          "Integrated with university event management system",
          "Deployed using Docker containers"
        ]
      }
    ],
    skills: {
      core_skills: [
        { name: "Python", self_rank: 1, level: 5, evidence: ["Data Analytics Internship", "ML Projects"] },
        { name: "Machine Learning", self_rank: 2, level: 4, evidence: ["Grade Predictor", "Coursework"] },
        { name: "SQL", self_rank: 3, level: 4, evidence: ["Internship", "Database projects"] },
        { name: "React", self_rank: 4, level: 3, evidence: ["Event Recommender", "Grade Predictor"] },
        { name: "Data Analysis", self_rank: 5, level: 5, evidence: ["Internship", "Multiple projects"] }
      ],
      soft_skills: [
        { name: "Analytical Thinking", level: 5 },
        { name: "Attention to Detail", level: 4 },
        { name: "Research Skills", level: 5 },
        { name: "Presentation Skills", level: 3 }
      ]
    },
    matching: {
      core_skill_match_pct: 79,
      technical_skills_score: 85,
      experience_score: 82,
      project_complexity_score: 76,
      education_score: 84,
      soft_skills_score: 90,
      portfolio_quality_score: 71,
      strengths: [
        "Strong data analysis and Python skills",
        "Real-world internship experience",
        "Good understanding of machine learning concepts"
      ],
      gaps: [
        "Limited frontend development experience",
        "Needs more experience with modern web frameworks"
      ],
      ai_suggested_questions: [
        "Your grade prediction model achieved 89% accuracy. What was your feature engineering strategy?",
        "Working with city data sounds complex. Which data quality issues did you encounter most frequently?",
        "Looking at your analytical background, where do you see the biggest opportunities for data-driven improvements in our product?"
      ]
    },
    meta: {
      created_at: "2024-01-12T00:00:00Z",
      updated_at: "2024-01-18T00:00:00Z",
      source: "university_career_portal"
    }
  },
  {
    id: "cand_003",
    profile: {
      name: "Emma Rodriguez",
      initials: "ER",
      avatar_url: null,
      contact: {
        email: "emma.rodriguez@design.ac.nz",
        phone: "+64-21-456-7890"
      },
      location: {
        city: "Auckland",
        country: "NZ",
        remote_friendly: true,
        preferred_regions: ["Auckland", "Remote"]
      },
      links: {
        github: "https://github.com/zukiwong",
        portfolio: "https://drive.google.com/file/d/1IXBxdC6lOyHHIeDuO_1hhcLIToxAgdlh/view",
        linkedin: "https://www.linkedin.com/in/zuki-wong/",
        resume: "/assets/ZukiWong_CV.pdf",
        transcript: "assets/academic-transcript.pdf",
        visa: "assets/visa-status.pdf"
      },
      availability: {
        start_date: "2024-03-01",
        end_date: null,
        hours_per_week: 35
      },
      work_auth: {
        visa_status: "Citizen",
        work_authorization: "Unlimited",
        relocation_ok: true
      }
    },
    education: [
      {
        institution: "AUT University",
        degree: "Bachelor of Digital Design",
        graduation_date: "2023-11",
        gpa: 3.9,
        relevant_coursework: ["UI/UX Design", "Web Design", "Design Thinking", "Front-end Development"],
        logo: null
      }
    ],
    experience: [
      {
        title: "UI/UX Design Intern",
        company: "Kiwibank Digital",
        duration: "6 months",
        duration_months: 6,
        start_date: "2023-06",
        end_date: "2023-12",
        description: "Redesigned mobile banking app interface and improved user experience flows",
        technologies: ["Figma", "Adobe XD", "Sketch", "HTML", "CSS", "JavaScript"],
        achievements: [
          "Increased mobile app user satisfaction by 35%",
          "Redesigned onboarding flow reducing drop-off by 22%",
          "Created design system used across 3 product teams"
        ]
      }
    ],
    projects: [
      {
        title: "Mental Health Support App",
        description: "Mobile app design for peer-to-peer mental health support for university students",
        duration: "4 months",
        technologies: ["Figma", "Principle", "React Native", "Node.js"],
        github_url: "https://github.com/zukiwong/mental-health-app",
        live_url: "https://www.figma.com/proto/mentalhealth-design",
        highlights: [
          "Conducted 30+ user interviews and usability tests",
          "Won 'Best Social Impact' award at AUT Design Showcase",
          "Prototype tested with 100+ students"
        ]
      },
      {
        title: "Local Business Directory",
        description: "Web platform connecting local Auckland businesses with community members",
        duration: "3 months",
        technologies: ["Figma", "React", "CSS Grid", "Firebase"],
        github_url: "https://github.com/zukiwong/local-business-directory",
        live_url: "https://auckland-local.netlify.app",
        highlights: [
          "Designed responsive interface for 15+ business categories",
          "Implemented accessibility features (WCAG 2.1 AA)",
          "Built and deployed functional prototype"
        ]
      }
    ],
    skills: {
      core_skills: [
        { name: "UI/UX Design", self_rank: 1, level: 5, evidence: ["Banking app redesign", "Mental Health App"] },
        { name: "Figma", self_rank: 2, level: 5, evidence: ["All design projects", "Internship"] },
        { name: "React", self_rank: 3, level: 3, evidence: ["Business Directory", "Mental Health App"] },
        { name: "HTML/CSS", self_rank: 4, level: 4, evidence: ["Multiple projects", "Coursework"] },
        { name: "User Research", self_rank: 5, level: 4, evidence: ["Mental Health App", "Internship"] }
      ],
      soft_skills: [
        { name: "Creativity", level: 5 },
        { name: "Empathy", level: 5 },
        { name: "Communication", level: 4 },
        { name: "Collaboration", level: 4 }
      ]
    },
    matching: {
      core_skill_match_pct: 73,
      technical_skills_score: 68,
      experience_score: 89,
      project_complexity_score: 85,
      education_score: 91,
      soft_skills_score: 95,
      portfolio_quality_score: 88,
      strengths: [
        "Excellent design skills and user-centered approach",
        "Strong portfolio with real-world impact",
        "Experience with both design and development"
      ],
      gaps: [
        "Limited backend development experience",
        "Could strengthen technical programming skills"
      ],
      ai_suggested_questions: [
        "The mental health app shows impressive user engagement. What design decisions drove those results?",
        "I'm curious about your banking app redesign - which user research methods proved most valuable?",
        "From your experience, what's the trickiest part about balancing user advocacy with business constraints?"
      ]
    },
    meta: {
      created_at: "2024-01-08T00:00:00Z",
      updated_at: "2024-01-20T00:00:00Z",
      source: "design_portfolio_submission"
    }
  },
  {
    id: "cand_004",
    profile: {
      name: "David Kim",
      initials: "DK",
      avatar_url: null,
      contact: {
        email: "david.kim@tech.ac.nz",
        phone: "+64-21-234-5678"
      },
      location: {
        city: "Christchurch",
        country: "NZ",
        remote_friendly: true,
        preferred_regions: ["Christchurch", "Auckland", "Remote"]
      },
      links: {
        github: "https://github.com/zukiwong",
        portfolio: "https://drive.google.com/file/d/1IXBxdC6lOyHHIeDuO_1hhcLIToxAgdlh/view",
        linkedin: "https://www.linkedin.com/in/zuki-wong/",
        resume: "/assets/ZukiWong_CV.pdf",
        transcript: "assets/academic-transcript.pdf",
        visa: "assets/visa-status.pdf"
      },
      availability: {
        start_date: "2024-02-15",
        end_date: null,
        hours_per_week: 40
      },
      work_auth: {
        visa_status: "Work Visa",
        work_authorization: "Full-time eligible",
        relocation_ok: true
      }
    },
    education: [
      {
        institution: "University of Canterbury",
        degree: "Bachelor of Computer Engineering",
        graduation_date: "2023-12",
        gpa: 3.7,
        relevant_coursework: ["Cloud Computing", "DevOps", "Network Security", "System Administration"],
        logo: null
      }
    ],
    experience: [
      {
        title: "DevOps Intern",
        company: "Catalyst IT",
        duration: "5 months",
        duration_months: 5,
        start_date: "2023-07",
        end_date: "2023-12",
        description: "Managed cloud infrastructure and implemented CI/CD pipelines for client projects",
        technologies: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Python"],
        achievements: [
          "Reduced deployment time by 60% through automated pipelines",
          "Managed AWS infrastructure for 5+ client projects",
          "Implemented monitoring solutions reducing downtime by 40%"
        ]
      }
    ],
    projects: [
      {
        title: "University Cloud Migration",
        description: "Led migration of university lab systems from on-premise to AWS cloud",
        duration: "6 months",
        technologies: ["AWS", "Docker", "Terraform", "Ansible", "Python", "Bash"],
        github_url: "https://github.com/zukiwong/cloud-migration",
        live_url: null,
        highlights: [
          "Migrated 20+ virtual machines to AWS EC2",
          "Implemented auto-scaling reducing costs by 30%",
          "Created disaster recovery plan and backup automation"
        ]
      },
      {
        title: "Microservices Monitoring Platform",
        description: "Built comprehensive monitoring and alerting system for microservices architecture",
        duration: "3 months",
        technologies: ["Prometheus", "Grafana", "Docker", "Kubernetes", "Go", "JavaScript"],
        github_url: "https://github.com/zukiwong/monitoring-platform",
        live_url: "https://monitoring-demo.herokuapp.com",
        highlights: [
          "Real-time monitoring of 15+ microservices",
          "Custom alerting rules with Slack integration",
          "Reduced incident response time by 50%"
        ]
      }
    ],
    skills: {
      core_skills: [
        { name: "AWS", self_rank: 1, level: 5, evidence: ["Internship", "Cloud Migration project"] },
        { name: "Docker", self_rank: 2, level: 5, evidence: ["Multiple projects", "Professional experience"] },
        { name: "Kubernetes", self_rank: 3, level: 4, evidence: ["Monitoring Platform", "Internship"] },
        { name: "Python", self_rank: 4, level: 4, evidence: ["Automation scripts", "Infrastructure tools"] },
        { name: "Terraform", self_rank: 5, level: 4, evidence: ["Cloud Migration", "Infrastructure as Code"] }
      ],
      soft_skills: [
        { name: "Problem Solving", level: 5 },
        { name: "Systems Thinking", level: 4 },
        { name: "Documentation", level: 4 },
        { name: "Mentoring", level: 3 }
      ]
    },
    matching: {
      core_skill_match_pct: 81,
      technical_skills_score: 94,
      experience_score: 87,
      project_complexity_score: 89,
      education_score: 83,
      soft_skills_score: 78,
      portfolio_quality_score: 82,
      strengths: [
        "Strong DevOps and cloud infrastructure experience",
        "Proven ability to work on complex technical projects",
        "Real-world experience with enterprise tools"
      ],
      gaps: [
        "Limited frontend development experience",
        "Could benefit from more software development focus"
      ],
      ai_suggested_questions: [
        "The university cloud migration sounds massive. Which technical obstacle surprised you the most?",
        "When a distributed system starts acting up, what's your debugging methodology?",
        "For microservices monitoring, which metrics do you prioritize and why?"
      ]
    },
    meta: {
      created_at: "2024-01-05T00:00:00Z",
      updated_at: "2024-01-22T00:00:00Z",
      source: "engineering_career_fair"
    }
  },
  {
    id: "cand_005",
    profile: {
      name: "Lisa Park",
      initials: "LP",
      avatar_url: null,
      contact: {
        email: "lisa.park@student.ac.nz",
        phone: "+64-21-345-6789"
      },
      location: {
        city: "Auckland",
        country: "NZ",
        remote_friendly: true,
        preferred_regions: ["Auckland", "Wellington", "Remote"]
      },
      links: {
        github: "https://github.com/zukiwong",
        portfolio: "https://drive.google.com/file/d/1IXBxdC6lOyHHIeDuO_1hhcLIToxAgdlh/view",
        linkedin: "https://www.linkedin.com/in/zuki-wong/",
        resume: "/assets/ZukiWong_CV.pdf",
        transcript: "assets/academic-transcript.pdf",
        visa: "assets/visa-status.pdf"
      },
      availability: {
        start_date: "2024-06-01",
        end_date: "2024-11-30",
        hours_per_week: 40
      },
      work_auth: {
        visa_status: "Student Visa",
        work_authorization: "Full-time during breaks",
        relocation_ok: false
      }
    },
    education: [
      {
        institution: "University of Auckland",
        degree: "Bachelor of Computer Science",
        graduation_date: "2024-12",
        gpa: 3.8,
        relevant_coursework: ["Full Stack Development", "Database Systems", "Software Engineering", "API Design"],
        logo: null
      }
    ],
    experience: [
      {
        title: "Full Stack Developer Intern",
        company: "Xero",
        duration: "4 months",
        duration_months: 4,
        start_date: "2023-12",
        end_date: "2024-04",
        description: "Developed features for accounting software used by small businesses across NZ",
        technologies: ["React", "Node.js", "TypeScript", "PostgreSQL", "GraphQL", "AWS"],
        achievements: [
          "Built invoice template system used by 10,000+ businesses",
          "Improved API response time by 35% through optimization",
          "Mentored 2 junior developers during hackathon"
        ]
      }
    ],
    projects: [
      {
        title: "Food Delivery Optimization",
        description: "Algorithm to optimize delivery routes for local food delivery service",
        duration: "4 months",
        technologies: ["React", "Node.js", "Express", "PostgreSQL", "Google Maps API", "Docker"],
        github_url: "https://github.com/zukiwong/delivery-optimizer",
        live_url: "https://foodopt-demo.vercel.app",
        highlights: [
          "Reduced average delivery time by 25% using custom routing algorithm",
          "Built real-time tracking system for customers and drivers",
          "Integrated payment processing and order management"
        ]
      },
      {
        title: "Budget Tracking App",
        description: "Personal finance management app with spending analytics and budgeting tools",
        duration: "3 months",
        technologies: ["React Native", "Node.js", "MongoDB", "Chart.js", "Plaid API"],
        github_url: "https://github.com/zukiwong/budget-tracker",
        live_url: null,
        highlights: [
          "Automated transaction categorization using machine learning",
          "Built in spending insights and budget alerts",
          "Secure bank account integration using Plaid"
        ]
      },
      {
        title: "University Study Groups Platform",
        description: "Platform for students to form study groups and share resources",
        duration: "2 months",
        technologies: ["Vue.js", "Node.js", "Socket.io", "MongoDB", "JWT"],
        github_url: "https://github.com/zukiwong/study-groups",
        live_url: "https://studygroups-nz.netlify.app",
        highlights: [
          "Real-time chat and video calling for study sessions",
          "File sharing and collaborative note-taking features",
          "Used by 500+ students across 3 universities"
        ]
      }
    ],
    skills: {
      core_skills: [
        { name: "React", self_rank: 1, level: 5, evidence: ["Xero Internship", "Multiple projects"] },
        { name: "Node.js", self_rank: 2, level: 5, evidence: ["Professional experience", "All backend projects"] },
        { name: "TypeScript", self_rank: 3, level: 4, evidence: ["Xero Internship", "Delivery Optimizer"] },
        { name: "PostgreSQL", self_rank: 4, level: 4, evidence: ["Professional use", "Database coursework"] },
        { name: "Full Stack Development", self_rank: 5, level: 5, evidence: ["Internship", "Complete applications"] }
      ],
      soft_skills: [
        { name: "Leadership", level: 4 },
        { name: "Communication", level: 5 },
        { name: "Problem Solving", level: 5 },
        { name: "Team Collaboration", level: 5 }
      ]
    },
    matching: {
      core_skill_match_pct: 93,
      technical_skills_score: 96,
      experience_score: 91,
      project_complexity_score: 94,
      education_score: 89,
      soft_skills_score: 92,
      portfolio_quality_score: 90,
      strengths: [
        "Excellent full-stack development skills",
        "Strong professional experience at Xero",
        "Proven ability to build complete applications",
        "Good leadership and mentoring experience"
      ],
      gaps: [
        "Could expand knowledge in cloud technologies",
        "Mobile development experience could be stronger"
      ],
      ai_suggested_questions: [
        "Working at Xero must have been insightful. What's the biggest difference between enterprise and startup development?",
        "Your delivery route optimization is intriguing. Which algorithms did you experiment with before settling on your final approach?",
        "Among all your projects, which technical challenge kept you up at night and how did you crack it?"
      ]
    },
    meta: {
      created_at: "2024-01-03T00:00:00Z",
      updated_at: "2024-01-25T00:00:00Z",
      source: "internship_program_application"
    }
  }
];

module.exports = sampleCandidates;