import { Job } from "../types/job";
import { zukiWongProfile } from "./studentProfileData";

export const mockJobs: Job[] = [
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
    appliedDate: "2024-10-15",
    matchScore: 85,
    gapAnalysis: {
      strengths: [
        "Strong problem-solving skills",
        "Experience with React/TypeScript",
        "AI/ML knowledge from coursework"
      ],
      gaps: [
        "Limited full-stack deployment experience",
        "Need more DevOps/Infrastructure knowledge",
        "Could improve rapid prototyping skills"
      ],
      suggestions: [
        "Build and deploy a few end-to-end projects",
        "Learn Docker and cloud deployment basics",
        "Practice building MVPs in short timeframes"
      ]
    },
    aiQuestions: [
      "Tell me about a time you built something from idea to working prototype quickly.",
      "How do you approach learning new technologies when working on a project?",
      "Describe your experience using AI tools in your development workflow.",
      "Walk me through how you would validate a new product idea with users.",
      "What's your approach to balancing technical debt vs. shipping features quickly?"
    ],
    elevatorPitch: {
      keyPoints: [
        "Passionate about AI-driven product development with hands-on experience in React/TypeScript",
        "Proven ability to learn quickly and adapt to new technologies (demonstrated through diverse coursework)",
        "Strong problem-solving mindset with focus on user impact",
        "Experience with end-to-end development from frontend to deployment",
        "Eager to contribute to innovative AI products at One New Zealand"
      ],
      timeframe: "5-10 minutes"
    }
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
    appliedDate: "2024-10-12",
    matchScore: 75,
    gapAnalysis: {
      strengths: [
        "Solid foundation in web development (React/TypeScript)",
        "Experience with SQL and database concepts",
        "Strong collaborative skills from team projects"
      ],
      gaps: [
        "No experience with C# and .NET framework",
        "Limited AWS cloud platform knowledge",
        "Need to develop automated testing skills"
      ],
      suggestions: [
        "Complete C# and .NET fundamentals tutorial",
        "Build a simple web API using .NET Core",
        "Learn basic AWS services (EC2, S3, RDS)",
        "Practice writing unit tests for web applications"
      ]
    },
    aiQuestions: [
      "Why are you interested in working with .NET technology stack?",
      "How do you approach learning a completely new programming language or framework?",
      "Tell me about a challenging technical problem you've solved recently.",
      "What interests you about working in the fintech/charitable giving space?",
      "Describe your experience working in an Agile development environment."
    ],
    elevatorPitch: {
      keyPoints: [
        "Computer science student with strong web development foundation in React/TypeScript",
        "Quick learner excited to expand skills into C#/.NET ecosystem",
        "Passionate about using technology for social good and charitable impact",
        "Collaborative team player with experience in Agile methodologies",
        "Eager to contribute to Pushpay's mission of driving charitable giving through technology"
      ],
      timeframe: "5-10 minutes"
    }
  }
];

export const studentProfile = zukiWongProfile;