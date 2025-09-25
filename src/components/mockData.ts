export const mockCandidates = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612413b?w=150&h=150&fit=crop&crop=face",
    coreSkillMatch: 87,
    topSkills: [
      { name: "React", rating: 5 },
      { name: "TypeScript", rating: 4 },
      { name: "Node.js", rating: 4 },
      { name: "Python", rating: 3 },
      { name: "AWS", rating: 3 }
    ],
    projects: [
      {
        title: "E-commerce Platform",
        description: "Built a full-stack e-commerce platform using React, Node.js, and PostgreSQL. Implemented features like user authentication, product catalog, shopping cart, and payment processing with Stripe. The platform handles over 1000 concurrent users and processes 500+ orders daily.",
        technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
        duration: "6 months",
        githubUrl: "https://github.com/sarahchen/ecommerce",
        liveUrl: "https://ecommerce-demo.com"
      },
      {
        title: "Task Management App",
        description: "Developed a collaborative task management application with real-time updates using WebSocket. Features include project boards, drag-and-drop functionality, team collaboration, and deadline tracking.",
        technologies: ["React", "TypeScript", "Socket.io", "Express", "MongoDB"],
        duration: "3 months",
        githubUrl: "https://github.com/sarahchen/taskmanager"
      }
    ],
    education: {
      school: "University of Auckland",
      degree: "BSc Computer Science"
    },
    workExperience: {
      years: 2,
      months: 6,
      positions: [
        {
          company: "TechStart Auckland",
          position: "Frontend Developer",
          duration: "Aug 2022 - Present",
          description: "Led the development of responsive web applications using React and TypeScript. Collaborated with design teams to implement pixel-perfect UIs and improved application performance by 40%.",
          technologies: ["React", "TypeScript", "Tailwind CSS", "Jest"],
          achievements: [
            "Reduced bundle size by 35% through code splitting and optimization",
            "Mentored 2 junior developers on React best practices",
            "Led migration from JavaScript to TypeScript across 5 projects"
          ]
        },
        {
          company: "Digital Solutions NZ",
          position: "Junior Web Developer",
          duration: "Feb 2022 - Jul 2022",
          description: "Developed and maintained client websites using HTML, CSS, and JavaScript. Worked closely with senior developers to learn modern web development practices.",
          technologies: ["HTML", "CSS", "JavaScript", "WordPress", "PHP"],
          achievements: [
            "Successfully delivered 8 client projects on time",
            "Improved website loading speed by 25% through optimization",
            "Implemented responsive designs for mobile compatibility"
          ]
        }
      ]
    },
    location: {
      current: "Auckland, NZ",
      matches: true,
      isRemote: true,
      isHybrid: false
    },
    links: {
      github: "https://github.com/sarahchen",
      portfolio: "https://sarahchen.dev",
      linkedin: "https://linkedin.com/in/sarahchen",
      cv: "https://sarahchen.dev/cv.pdf"
    },
    softSkills: [
      { name: "Communication", rating: 5 },
      { name: "Teamwork", rating: 4 },
      { name: "Problem Solving", rating: 5 },
      { name: "Leadership", rating: 3 }
    ],
    followUpPrompts: [
      "Which part of the e-commerce platform did you find most challenging to implement?",
      "How did you handle scalability issues with 1000+ concurrent users?",
      "Can you walk me through your approach to real-time updates in the task management app?",
      "What made you choose PostgreSQL over other database options?"
    ]
  },
  {
    id: "2",
    name: "Marcus Williams",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    coreSkillMatch: 72,
    topSkills: [
      { name: "JavaScript", rating: 5 },
      { name: "Vue.js", rating: 4 },
      { name: "Python", rating: 5 },
      { name: "Docker", rating: 3 },
      { name: "GraphQL", rating: 2 }
    ],
    projects: [
      {
        title: "Data Visualization Dashboard",
        description: "Created an interactive dashboard for analyzing sales data using Vue.js and D3.js. The dashboard provides real-time insights with customizable charts, filters, and export functionality. Integrated with multiple data sources and APIs.",
        technologies: ["Vue.js", "D3.js", "Python", "FastAPI", "PostgreSQL"],
        duration: "4 months",
        githubUrl: "https://github.com/marcusw/dashboard"
      },
      {
        title: "Machine Learning API",
        description: "Developed a RESTful API for a machine learning model that predicts customer behavior. Built with Python and FastAPI, deployed using Docker containers. Handles 10,000+ predictions per day with 99.9% uptime.",
        technologies: ["Python", "FastAPI", "Docker", "scikit-learn", "Redis"],
        duration: "5 months",
        githubUrl: "https://github.com/marcusw/ml-api"
      }
    ],
    education: {
      school: "Victoria University of Wellington",
      degree: "BSc Data Science"
    },
    workExperience: {
      years: 1,
      months: 8,
      positions: [
        {
          company: "DataTech Wellington",
          position: "Data Analyst Intern",
          duration: "Mar 2023 - Present",
          description: "Analyzing large datasets and creating visualizations for business intelligence. Developed automated reporting systems and machine learning models for predictive analytics.",
          technologies: ["Python", "pandas", "scikit-learn", "Tableau", "SQL"],
          achievements: [
            "Built automated reporting system saving 10 hours/week",
            "Developed ML model with 92% accuracy for sales prediction",
            "Created interactive dashboards used by C-level executives"
          ]
        },
        {
          company: "StartupLab Wellington",
          position: "Web Development Intern",
          duration: "Nov 2022 - Feb 2023",
          description: "Supported startup teams with web development tasks and learned agile development methodologies. Contributed to multiple MVP development projects.",
          technologies: ["Vue.js", "Node.js", "MongoDB", "Express", "Git"],
          achievements: [
            "Contributed to 3 successful MVP launches",
            "Improved API response time by 30%",
            "Implemented user authentication system"
          ]
        }
      ]
    },
    location: {
      current: "Wellington, NZ",
      matches: false,
      isRemote: false,
      isHybrid: true
    },
    links: {
      github: "https://github.com/marcusw",
      portfolio: "https://marcuswilliams.dev",
      linkedin: "https://linkedin.com/in/marcusw"
    },
    softSkills: [
      { name: "Communication", rating: 3 },
      { name: "Teamwork", rating: 4 },
      { name: "Problem Solving", rating: 5 },
      { name: "Leadership", rating: 2 }
    ],
    followUpPrompts: [
      "What challenges did you face while implementing real-time data visualization?",
      "How do you ensure the accuracy of your machine learning predictions?",
      "Why did you choose Vue.js over React for the dashboard project?",
      "Can you explain your approach to API rate limiting and caching?"
    ]
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    coreSkillMatch: 94,
    topSkills: [
      { name: "React", rating: 5 },
      { name: "TypeScript", rating: 5 },
      { name: "GraphQL", rating: 4 },
      { name: "Next.js", rating: 4 },
      { name: "Prisma", rating: 3 }
    ],
    projects: [
      {
        title: "Social Media Platform",
        description: "Built a full-featured social media platform with real-time messaging, post sharing, and user interactions. Implemented advanced features like content moderation, recommendation algorithms, and analytics dashboard for content creators.",
        technologies: ["Next.js", "TypeScript", "GraphQL", "Prisma", "PostgreSQL", "Redis"],
        duration: "8 months",
        githubUrl: "https://github.com/emilyrod/social-platform",
        liveUrl: "https://social-demo.vercel.app"
      },
      {
        title: "Fitness Tracking App",
        description: "Developed a mobile-first fitness tracking application with workout plans, progress tracking, and social features. Integrated with wearable devices and health APIs for comprehensive health monitoring.",
        technologies: ["React Native", "TypeScript", "GraphQL", "Node.js", "MongoDB"],
        duration: "6 months",
        githubUrl: "https://github.com/emilyrod/fitness-tracker"
      }
    ],
    education: {
      school: "University of Otago",
      degree: "BSc Software Engineering"
    },
    workExperience: {
      years: 3,
      months: 2,
      positions: [
        {
          company: "InnovateTech Dunedin",
          position: "Senior Frontend Developer",
          duration: "Jan 2023 - Present",
          description: "Leading frontend development for multiple client projects. Architecting scalable React applications and mentoring junior developers. Responsible for technical decisions and code quality standards.",
          technologies: ["React", "TypeScript", "Next.js", "GraphQL", "AWS"],
          achievements: [
            "Led team of 4 developers on enterprise-level projects",
            "Architected micro-frontend system serving 100k+ users",
            "Reduced client onboarding time by 50% through automation",
            "Implemented CI/CD pipeline reducing deployment time by 70%"
          ]
        },
        {
          company: "WebCraft Solutions",
          position: "Full Stack Developer",
          duration: "Jun 2021 - Dec 2022",
          description: "Developed full-stack web applications using modern technologies. Collaborated with clients to understand requirements and deliver custom solutions. Focused on performance optimization and user experience.",
          technologies: ["React", "Node.js", "PostgreSQL", "Docker", "AWS"],
          achievements: [
            "Delivered 12+ client projects with 98% satisfaction rate",
            "Optimized database queries improving performance by 60%",
            "Implemented automated testing reducing bugs by 40%"
          ]
        },
        {
          company: "StartUp Otago",
          position: "Frontend Developer Intern",
          duration: "Feb 2021 - May 2021",
          description: "Contributed to startup projects while completing studies. Learned agile development practices and modern frontend frameworks. Gained experience in fast-paced startup environment.",
          technologies: ["React", "JavaScript", "CSS", "Git", "Figma"],
          achievements: [
            "Contributed to 2 successful product launches",
            "Implemented responsive designs for mobile-first approach",
            "Collaborated effectively in remote team environment"
          ]
        }
      ]
    },
    location: {
      current: "Dunedin, NZ",
      matches: true,
      isRemote: true,
      isHybrid: true
    },
    links: {
      github: "https://github.com/emilyrod",
      portfolio: "https://emilyrodriguez.dev",
      linkedin: "https://linkedin.com/in/emilyrod",
      cv: "https://emilyrodriguez.dev/resume.pdf",
      transcript: "https://emilyrodriguez.dev/transcript.pdf"
    },
    softSkills: [
      { name: "Communication", rating: 5 },
      { name: "Teamwork", rating: 5 },
      { name: "Problem Solving", rating: 4 },
      { name: "Leadership", rating: 4 }
    ],
    followUpPrompts: [
      "How did you implement the recommendation algorithm for the social media platform?",
      "What strategies did you use for content moderation at scale?",
      "Can you explain your approach to real-time messaging architecture?",
      "What was your experience integrating with wearable device APIs?"
    ]
  },
  {
    id: "4",
    name: "James Thompson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    coreSkillMatch: 78,
    topSkills: [
      { name: "Java", rating: 4 },
      { name: "Spring Boot", rating: 3 },
      { name: "Android", rating: 4 },
      { name: "MySQL", rating: 3 },
      { name: "Git", rating: 4 }
    ],
    projects: [
      {
        title: "Student Budget Tracker",
        description: "Developed an Android app to help students track expenses and manage budgets. Features include expense categorization, budget alerts, spending analytics, and financial goal setting. Used Room database for local storage and Firebase for cloud sync.",
        technologies: ["Android", "Kotlin", "Room", "Firebase", "Material Design"],
        duration: "4 months",
        githubUrl: "https://github.com/jamest/budget-tracker"
      },
      {
        title: "University Course Planner",
        description: "Built a web application for students to plan their course schedules and track degree progress. Integrated with university systems to fetch course information and prerequisites. Implements conflict detection and optimal schedule generation.",
        technologies: ["Java", "Spring Boot", "MySQL", "Bootstrap", "JUnit"],
        duration: "6 months",
        githubUrl: "https://github.com/jamest/course-planner"
      }
    ],
    education: {
      school: "Massey University",
      degree: "BSc Computer Science (Graduated Dec 2023)"
    },
    workExperience: {
      years: 0,
      months: 8,
      positions: [
        {
          company: "AgriTech Solutions Palmerston North",
          position: "Junior Software Developer",
          duration: "Jan 2024 - Present",
          description: "Developing agricultural management software for New Zealand farmers. Working on mobile applications and farm data analytics platforms. Learning about agri-tech industry and sustainable farming practices.",
          technologies: ["Java", "Android", "PostgreSQL", "Spring Boot", "Docker"],
          achievements: [
            "Developed mobile app used by 200+ local farmers",
            "Implemented offline data synchronization for rural areas",
            "Contributed to 15% improvement in data collection efficiency"
          ]
        },
        {
          company: "Massey University IT Services",
          position: "Student Developer",
          duration: "Mar 2023 - Dec 2023",
          description: "Part-time role developing internal tools and maintaining university systems. Gained experience with legacy systems and modern development practices. Worked on student portal improvements and data migration projects.",
          technologies: ["Java", "PHP", "MySQL", "HTML", "CSS"],
          achievements: [
            "Modernized 3 legacy web applications",
            "Improved student portal performance by 20%",
            "Automated manual data entry processes"
          ]
        }
      ]
    },
    location: {
      current: "Palmerston North, NZ",
      matches: false,
      isRemote: false,
      isHybrid: true
    },
    links: {
      github: "https://github.com/jamest",
      portfolio: "https://jamesthompson.co.nz",
      linkedin: "https://linkedin.com/in/jamesthompson-dev",
      cv: "https://jamesthompson.co.nz/cv.pdf"
    },
    softSkills: [
      { name: "Communication", rating: 4 },
      { name: "Teamwork", rating: 4 },
      { name: "Problem Solving", rating: 4 },
      { name: "Leadership", rating: 2 }
    ],
    followUpPrompts: [
      "What challenges did you face developing for rural connectivity in agricultural applications?",
      "How did you approach offline data synchronization in your Android app?",
      "What's your experience working with legacy university systems?",
      "How do you balance user experience with the practical needs of farmers?"
    ]
  },
  {
    id: "5",
    name: "Priya Patel",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    coreSkillMatch: 85,
    topSkills: [
      { name: "Python", rating: 5 },
      { name: "Machine Learning", rating: 4 },
      { name: "pandas", rating: 4 },
      { name: "SQL", rating: 4 },
      { name: "Tableau", rating: 3 }
    ],
    projects: [
      {
        title: "Auckland Traffic Analysis",
        description: "Final year project analyzing Auckland traffic patterns using machine learning. Used real traffic data to predict congestion patterns and suggest route optimizations. Built interactive dashboard for visualizing traffic insights and predictions.",
        technologies: ["Python", "scikit-learn", "pandas", "Streamlit", "PostgreSQL"],
        duration: "8 months",
        githubUrl: "https://github.com/priyap/auckland-traffic",
        liveUrl: "https://auckland-traffic-analysis.streamlit.app"
      },
      {
        title: "Student Performance Predictor",
        description: "Developed a machine learning model to predict student academic performance based on various factors. Created an ethical AI system with bias detection and fairness constraints. Presented findings at the AUT Data Science Symposium.",
        technologies: ["Python", "TensorFlow", "Jupyter", "matplotlib", "seaborn"],
        duration: "5 months",
        githubUrl: "https://github.com/priyap/student-performance"
      }
    ],
    education: {
      school: "Auckland University of Technology (AUT)",
      degree: "BSc Data Science (Final Year)"
    },
    workExperience: {
      years: 0,
      months: 10,
      positions: [
        {
          company: "Analytics NZ",
          position: "Data Science Intern",
          duration: "Nov 2023 - Present",
          description: "Working on data analytics projects for various clients while completing final year of studies. Specializing in machine learning model development and business intelligence reporting. Gaining hands-on experience with real-world data challenges.",
          technologies: ["Python", "R", "SQL", "Tableau", "AWS", "Docker"],
          achievements: [
            "Built ML model improving client retention prediction by 25%",
            "Created automated reporting dashboard saving 20 hours/week",
            "Presented data insights to C-level executives at 3 client companies"
          ]
        },
        {
          company: "AUT Data Science Lab",
          position: "Research Assistant",
          duration: "Mar 2023 - Oct 2023",
          description: "Assisted PhD students and faculty with data science research projects. Gained experience with academic research methodologies and advanced statistical techniques. Contributed to published research papers.",
          technologies: ["Python", "R", "SPSS", "LaTeX", "Git"],
          achievements: [
            "Co-authored research paper on traffic pattern prediction",
            "Developed reusable data preprocessing pipeline",
            "Mentored 5 junior students in statistics and Python"
          ]
        }
      ]
    },
    location: {
      current: "Auckland, NZ",
      matches: true,
      isRemote: true,
      isHybrid: true
    },
    links: {
      github: "https://github.com/priyap",
      portfolio: "https://priyapatel.data",
      linkedin: "https://linkedin.com/in/priya-patel-data",
      cv: "https://priyapatel.data/resume.pdf"
    },
    softSkills: [
      { name: "Communication", rating: 5 },
      { name: "Teamwork", rating: 4 },
      { name: "Problem Solving", rating: 5 },
      { name: "Leadership", rating: 3 }
    ],
    followUpPrompts: [
      "How did you address bias and fairness concerns in your student performance predictor?",
      "What was the most challenging aspect of working with real Auckland traffic data?",
      "Can you explain your approach to presenting technical findings to non-technical stakeholders?",
      "What ethical considerations did you encounter in your academic performance prediction work?"
    ]
  },
  {
    id: "6",
    name: "Alex Morgan",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
    coreSkillMatch: 91,
    topSkills: [
      { name: "C++", rating: 5 },
      { name: "React", rating: 4 },
      { name: "Node.js", rating: 4 },
      { name: "PostgreSQL", rating: 4 },
      { name: "Docker", rating: 3 }
    ],
    projects: [
      {
        title: "Distributed Computing Framework",
        description: "Designed and implemented a distributed computing framework for high-performance calculations. Used for processing large datasets across multiple nodes with fault tolerance and load balancing. Achieved 10x performance improvement over sequential processing.",
        technologies: ["C++", "MPI", "Docker", "Linux", "CMake"],
        duration: "10 months",
        githubUrl: "https://github.com/alexm/distributed-compute"
      },
      {
        title: "Real-time Collaboration Tool",
        description: "Built a real-time collaborative code editor with video chat integration. Features include syntax highlighting, collaborative debugging, version control integration, and peer-to-peer video calls. Supports multiple programming languages.",
        technologies: ["React", "Node.js", "Socket.io", "WebRTC", "Monaco Editor"],
        duration: "6 months",
        githubUrl: "https://github.com/alexm/collab-editor",
        liveUrl: "https://collab-code.dev"
      }
    ],
    education: {
      school: "University of Canterbury",
      degree: "BE Software Engineering (Honours, Graduated Feb 2024)"
    },
    workExperience: {
      years: 0,
      months: 11,
      positions: [
        {
          company: "Xero",
          position: "Graduate Software Engineer",
          duration: "Mar 2024 - Present",
          description: "Working on Xero's core accounting platform serving millions of small businesses worldwide. Contributing to microservices architecture and implementing new features for the web application. Learning about scalable software design and financial technology.",
          technologies: ["C#", ".NET", "React", "TypeScript", "AWS", "Kubernetes"],
          achievements: [
            "Delivered 3 major features impacting 100k+ users",
            "Improved API response time by 30% through optimization",
            "Contributed to microservices migration reducing system downtime"
          ]
        },
        {
          company: "University of Canterbury",
          position: "Teaching Assistant",
          duration: "Feb 2023 - Dec 2023",
          description: "Tutored undergraduate students in software engineering and computer science courses. Led laboratory sessions, marked assignments, and provided one-on-one academic support. Developed teaching materials and course content.",
          technologies: ["Java", "C++", "Python", "Git", "Linux"],
          achievements: [
            "Mentored 40+ students across multiple courses",
            "Developed interactive coding exercises used by 200+ students",
            "Received 'Outstanding Teaching Assistant' award"
          ]
        }
      ]
    },
    location: {
      current: "Christchurch, NZ",
      matches: false,
      isRemote: true,
      isHybrid: true
    },
    links: {
      github: "https://github.com/alexm",
      portfolio: "https://alexmorgan.dev",
      linkedin: "https://linkedin.com/in/alex-morgan-eng",
      cv: "https://alexmorgan.dev/cv.pdf",
      transcript: "https://alexmorgan.dev/transcript.pdf"
    },
    softSkills: [
      { name: "Communication", rating: 5 },
      { name: "Teamwork", rating: 5 },
      { name: "Problem Solving", rating: 5 },
      { name: "Leadership", rating: 4 }
    ],
    followUpPrompts: [
      "What were the main challenges in implementing fault tolerance for your distributed computing framework?",
      "How did you handle real-time synchronization in your collaborative code editor?",
      "What's your experience transitioning from academic projects to enterprise-level software at Xero?",
      "Can you explain your approach to load balancing in distributed systems?"
    ]
  },
  {
    id: "7",
    name: "Sophie Kim",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612413b?w=150&h=150&fit=crop&crop=face",
    coreSkillMatch: 82,
    topSkills: [
      { name: "Python", rating: 4 },
      { name: "Cybersecurity", rating: 4 },
      { name: "Linux", rating: 4 },
      { name: "Networking", rating: 3 },
      { name: "Bash", rating: 3 }
    ],
    projects: [
      {
        title: "Network Security Scanner",
        description: "Developed a comprehensive network security scanning tool that identifies vulnerabilities and potential threats. Features automated penetration testing, vulnerability assessment, and detailed security reporting. Used for securing university network infrastructure.",
        technologies: ["Python", "Nmap", "Metasploit", "Linux", "Wireshark"],
        duration: "7 months",
        githubUrl: "https://github.com/sophiek/security-scanner"
      },
      {
        title: "Secure Chat Application",
        description: "Built an end-to-end encrypted chat application with advanced security features. Implements perfect forward secrecy, secure key exchange, and protection against various attack vectors. Designed with privacy-by-design principles.",
        technologies: ["Python", "Cryptography", "Socket Programming", "Qt", "SQLite"],
        duration: "5 months",
        githubUrl: "https://github.com/sophiek/secure-chat"
      }
    ],
    education: {
      school: "University of Waikato",
      degree: "BSc Cybersecurity (Graduated Nov 2023)"
    },
    workExperience: {
      years: 0,
      months: 9,
      positions: [
        {
          company: "Cyber Defense Solutions",
          position: "Junior Security Analyst",
          duration: "Feb 2024 - Present",
          description: "Monitoring and analyzing security threats for enterprise clients. Conducting vulnerability assessments, incident response, and security awareness training. Learning about enterprise security frameworks and compliance requirements.",
          technologies: ["Python", "Splunk", "Wireshark", "Nessus", "SIEM", "Linux"],
          achievements: [
            "Detected and mitigated 50+ security incidents",
            "Reduced false positive alerts by 40% through ML models",
            "Conducted security training for 200+ employees across client organizations"
          ]
        },
        {
          company: "University of Waikato IT Services",
          position: "Security Intern",
          duration: "Jun 2023 - Jan 2024",
          description: "Supported university cybersecurity team with threat monitoring and security assessments. Gained hands-on experience with enterprise security tools and incident response procedures. Contributed to security policy development.",
          technologies: ["Splunk", "Nmap", "Burp Suite", "Python", "PowerShell"],
          achievements: [
            "Identified critical vulnerability preventing potential data breach",
            "Automated security monitoring saving 15 hours/week",
            "Developed incident response playbooks for common attack scenarios"
          ]
        }
      ]
    },
    location: {
      current: "Hamilton, NZ",
      matches: false,
      isRemote: false,
      isHybrid: false
    },
    links: {
      github: "https://github.com/sophiek",
      portfolio: "https://sophiekim.security",
      linkedin: "https://linkedin.com/in/sophie-kim-security",
      cv: "https://sophiekim.security/cv.pdf"
    },
    softSkills: [
      { name: "Communication", rating: 4 },
      { name: "Teamwork", rating: 3 },
      { name: "Problem Solving", rating: 5 },
      { name: "Leadership", rating: 3 }
    ],
    followUpPrompts: [
      "What's your approach to balancing security with user experience in application design?",
      "How do you stay updated with the rapidly evolving cybersecurity threat landscape?",
      "Can you walk me through your incident response process for a potential data breach?",
      "What challenges did you face implementing end-to-end encryption in your chat app?"
    ]
  },
  {
    id: "8",
    name: "David Liu",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    coreSkillMatch: 75,
    topSkills: [
      { name: "JavaScript", rating: 4 },
      { name: "React", rating: 4 },
      { name: "HTML/CSS", rating: 5 },
      { name: "Node.js", rating: 3 },
      { name: "MongoDB", rating: 3 }
    ],
    projects: [
      {
        title: "Local Business Directory",
        description: "Created a comprehensive web platform for local businesses to showcase their services and connect with customers. Features include business profiles, review system, event listings, and location-based search. Focused on supporting small New Zealand businesses.",
        technologies: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
        duration: "8 months",
        githubUrl: "https://github.com/davidl/local-business",
        liveUrl: "https://nz-local-business.netlify.app"
      },
      {
        title: "Personal Finance Dashboard",
        description: "Built a personal finance management web application with expense tracking, budget planning, and financial goal setting. Integrated with New Zealand banks' APIs for transaction import and categorization. Focus on financial literacy education.",
        technologies: ["React", "Chart.js", "Express", "SQLite", "Plaid API"],
        duration: "4 months",
        githubUrl: "https://github.com/davidl/finance-dashboard"
      }
    ],
    education: {
      school: "Dev Academy Auckland",
      degree: "Full Stack Web Development Bootcamp (Completed Sep 2023)"
    },
    workExperience: {
      years: 1,
      months: 1,
      positions: [
        {
          company: "Creative Web Solutions",
          position: "Frontend Developer",
          duration: "Nov 2023 - Present",
          description: "Developing responsive websites and web applications for small to medium businesses across New Zealand. Working closely with designers and clients to deliver custom digital solutions. Focus on modern web technologies and user experience.",
          technologies: ["React", "Vue.js", "Tailwind CSS", "WordPress", "Shopify"],
          achievements: [
            "Delivered 15+ client websites with 100% on-time completion",
            "Improved client website performance by average 35%",
            "Increased client conversion rates by 20% through UX improvements"
          ]
        },
        {
          company: "Freelance",
          position: "Web Developer",
          duration: "Oct 2023 - Nov 2023",
          description: "Provided web development services to local businesses while seeking full-time employment. Built websites, e-commerce stores, and landing pages. Gained experience with client communication and project management.",
          technologies: ["HTML", "CSS", "JavaScript", "WordPress", "Figma"],
          achievements: [
            "Completed 5 successful projects for local Auckland businesses",
            "Built e-commerce store generating $10k+ monthly revenue",
            "Established ongoing maintenance contracts with 3 clients"
          ]
        }
      ]
    },
    location: {
      current: "Auckland, NZ",
      matches: true,
      isRemote: false,
      isHybrid: true
    },
    links: {
      github: "https://github.com/davidl",
      portfolio: "https://davidliu.dev",
      linkedin: "https://linkedin.com/in/davidliu-web"
    },
    softSkills: [
      { name: "Communication", rating: 5 },
      { name: "Teamwork", rating: 4 },
      { name: "Problem Solving", rating: 4 },
      { name: "Leadership", rating: 2 }
    ],
    followUpPrompts: [
      "How did you transition from a non-technical background into web development?",
      "What challenges did you face integrating with New Zealand banking APIs?",
      "Can you describe your approach to working with clients who have limited technical knowledge?",
      "How do you balance custom development with using existing solutions like WordPress?"
    ]
  },
  {
    id: "9",
    name: "Rachel Foster",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    coreSkillMatch: 89,
    topSkills: [
      { name: "Swift", rating: 5 },
      { name: "iOS Development", rating: 5 },
      { name: "UIKit", rating: 4 },
      { name: "Core Data", rating: 4 },
      { name: "Firebase", rating: 3 }
    ],
    projects: [
      {
        title: "Mental Health Support App",
        description: "Developed a comprehensive iOS app for mental health support targeted at New Zealand university students. Features include mood tracking, crisis support resources, peer connection, and integration with local mental health services. Focus on privacy and accessibility.",
        technologies: ["Swift", "UIKit", "Core Data", "Firebase", "HealthKit"],
        duration: "12 months",
        githubUrl: "https://github.com/rachelf/mental-health-app"
      },
      {
        title: "Sustainable Living Tracker",
        description: "Created an iOS app to help users track and improve their environmental impact. Features carbon footprint calculation, sustainable living tips, local eco-friendly business directory, and community challenges. Partnered with NZ environmental organizations.",
        technologies: ["Swift", "SwiftUI", "CloudKit", "MapKit", "Charts"],
        duration: "6 months",
        githubUrl: "https://github.com/rachelf/eco-tracker",
        liveUrl: "https://apps.apple.com/nz/app/eco-track-nz"
      }
    ],
    education: {
      school: "Victoria University of Wellington",
      degree: "BSc Computer Science (Final Year)"
    },
    workExperience: {
      years: 0,
      months: 14,
      positions: [
        {
          company: "Kiwibank",
          position: "iOS Developer Intern",
          duration: "Nov 2023 - Present",
          description: "Working on Kiwibank's mobile banking application used by hundreds of thousands of New Zealanders. Contributing to new features, security improvements, and user experience enhancements. Gaining experience with financial technology and enterprise iOS development.",
          technologies: ["Swift", "SwiftUI", "Combine", "Core Data", "Keychain", "XCTest"],
          achievements: [
            "Implemented biometric authentication reducing login time by 60%",
            "Contributed to app store rating improvement from 3.2 to 4.1 stars",
            "Developed accessibility features serving 10k+ disabled users"
          ]
        },
        {
          company: "VUW Mobile Lab",
          position: "Student Researcher",
          duration: "Mar 2023 - Oct 2023",
          description: "Conducted research on mobile application accessibility and user experience. Contributed to academic papers on mobile accessibility for disabled users. Developed prototype applications for research purposes.",
          technologies: ["Swift", "React Native", "Flutter", "Accessibility APIs"],
          achievements: [
            "Co-authored paper published in ACM Mobile Computing Conference",
            "Developed accessibility testing framework adopted by 3 companies",
            "Presented research at International Accessibility Conference"
          ]
        }
      ]
    },
    location: {
      current: "Wellington, NZ",
      matches: true,
      isRemote: false,
      isHybrid: true
    },
    links: {
      github: "https://github.com/rachelf",
      portfolio: "https://rachelfoster.dev",
      linkedin: "https://linkedin.com/in/rachel-foster-ios",
      cv: "https://rachelfoster.dev/cv.pdf"
    },
    softSkills: [
      { name: "Communication", rating: 5 },
      { name: "Teamwork", rating: 5 },
      { name: "Problem Solving", rating: 4 },
      { name: "Leadership", rating: 4 }
    ],
    followUpPrompts: [
      "How did you approach privacy and security concerns in your mental health app?",
      "What accessibility challenges did you encounter in iOS development?",
      "Can you describe your experience working on a financial app with strict security requirements?",
      "How did you validate the user needs for your mental health support app?"
    ]
  },
  {
    id: "10",
    name: "Michael O'Brien",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    coreSkillMatch: 71,
    topSkills: [
      { name: "PHP", rating: 4 },
      { name: "Laravel", rating: 4 },
      { name: "MySQL", rating: 4 },
      { name: "JavaScript", rating: 3 },
      { name: "WordPress", rating: 5 }
    ],
    projects: [
      {
        title: "University Event Management System",
        description: "Built a comprehensive event management platform for university clubs and societies. Features include event creation, ticket sales, attendee management, and integration with university authentication systems. Used by 50+ student organizations.",
        technologies: ["PHP", "Laravel", "MySQL", "Bootstrap", "Stripe API"],
        duration: "9 months",
        githubUrl: "https://github.com/michaelo/event-manager"
      },
      {
        title: "Tourism Website Network",
        description: "Developed a network of tourism websites showcasing different regions of New Zealand. Features include interactive maps, booking integration, review systems, and multilingual support. Focus on promoting sustainable tourism practices.",
        technologies: ["WordPress", "PHP", "MySQL", "JavaScript", "Google Maps API"],
        duration: "6 months",
        githubUrl: "https://github.com/michaelo/nz-tourism",
        liveUrl: "https://discover-newzealand.co.nz"
      }
    ],
    education: {
      school: "Otago Polytechnic",
      degree: "Diploma in Web Development and Design (Completed Jul 2023)"
    },
    workExperience: {
      years: 1,
      months: 3,
      positions: [
        {
          company: "Digital Marketing Dunedin",
          position: "Web Developer",
          duration: "Aug 2023 - Present",
          description: "Developing and maintaining websites for local businesses and tourism operators. Specializing in WordPress development, e-commerce solutions, and digital marketing integration. Working with clients across South Island of New Zealand.",
          technologies: ["WordPress", "PHP", "WooCommerce", "HTML", "CSS", "JavaScript"],
          achievements: [
            "Managed 30+ client websites with 99.5% uptime",
            "Increased client online sales by average 45% through e-commerce optimization",
            "Developed custom WordPress plugins used by 100+ websites"
          ]
        },
        {
          company: "Otago Polytechnic",
          position: "Student Web Developer",
          duration: "Feb 2023 - Jul 2023",
          description: "Part-time role while completing studies, working on internal web projects and student services applications. Gained experience with institutional web development and content management systems.",
          technologies: ["PHP", "MySQL", "Drupal", "HTML", "CSS"],
          achievements: [
            "Redesigned student portal improving user satisfaction by 30%",
            "Automated course enrollment process saving 20 hours/week",
            "Developed mobile-responsive design for institutional websites"
          ]
        }
      ]
    },
    location: {
      current: "Dunedin, NZ",
      matches: false,
      isRemote: true,
      isHybrid: false
    },
    links: {
      github: "https://github.com/michaelo",
      portfolio: "https://michaelobrien.co.nz",
      linkedin: "https://linkedin.com/in/michael-obrien-web"
    },
    softSkills: [
      { name: "Communication", rating: 5 },
      { name: "Teamwork", rating: 3 },
      { name: "Problem Solving", rating: 4 },
      { name: "Leadership", rating: 2 }
    ],
    followUpPrompts: [
      "How do you approach client communication when explaining technical concepts?",
      "What strategies do you use for optimizing WordPress websites for performance?",
      "Can you describe your experience with e-commerce development and payment integration?",
      "How do you balance custom development with using existing WordPress themes and plugins?"
    ]
  }
];

export const availableDimensions = [
  "Project Experience",
  "Education", 
  "Work Experience",
  "Location / Availability",
  "Candidate Links",
  "Soft Skills"
];