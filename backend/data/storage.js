// In-memory storage for demo purposes
class Storage {
  constructor() {
    this.jd = null; // Parsed JD data
    this.candidates = []; // Imported candidates
  }

  // JD operations
  setJD(jdData) {
    this.jd = jdData;
  }

  // Set demo JD for testing
  setDemoJD() {
    this.jd = {
      id: "jd_demo",
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "Auckland, NZ",
      workType: "full-time",
      experience: {
        min: 3,
        max: 7,
        description: "3-7 years frontend development experience"
      },
      education: "Bachelor's degree or equivalent",
      skills: ["React", "TypeScript", "Node.js", "CSS", "JavaScript"],
      responsibilities: [
        "Build responsive web applications",
        "Collaborate with design team",
        "Optimize application performance"
      ],
      requirements: [
        "3+ years React experience",
        "Strong TypeScript knowledge",
        "Experience with modern build tools"
      ],
      salary: {
        min: 80000,
        max: 120000,
        currency: "NZD"
      },
      benefits: ["Health insurance", "Remote work options"],
      description: "Join our team as a Senior Frontend Developer",
      originalText: "We are hiring a Senior Frontend Developer...",
      parsedAt: new Date().toISOString()
    };
  }

  getJD() {
    return this.jd;
  }

  // Candidate operations
  setCandidates(candidatesData) {
    this.candidates = candidatesData;
  }

  getCandidates() {
    return this.candidates;
  }

  getCandidateById(id) {
    return this.candidates.find(candidate => candidate.id === id);
  }

  // Clear all data
  clear() {
    this.jd = null;
    this.candidates = [];
  }

  // Get storage status
  getStatus() {
    return {
      hasJD: !!this.jd,
      candidatesCount: this.candidates.length,
      lastUpdated: new Date().toISOString()
    };
  }
}

// Export singleton instance
module.exports = new Storage();