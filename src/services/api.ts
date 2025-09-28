import { Candidate } from '../types/candidate';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

// API Service Class
class ApiService {
  // Set demonstration JD
  async setDemoJD() {
    const response = await fetch(`${API_BASE_URL}/jd/demo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to set demo JD');
    }

    return response.json();
  }

  // Import candidate data
  async importCandidates() {
    const response = await fetch(`${API_BASE_URL}/candidates/import`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to import candidates data');
    }

    return response.json();
  }

  // Retrieve candidate list (brief information)
  async getCandidatesSummary(): Promise<Candidate[]> {
    const response = await fetch(`${API_BASE_URL}/candidates?summary=true`);

    if (!response.ok) {
      throw new Error('Failed to get candidates list');
    }

    const result = await response.json();
    return result.data.candidates;
  }

  // Retrieve candidate's detailed information
  async getCandidateDetails(candidateId: string): Promise<Candidate> {
    const response = await fetch(`${API_BASE_URL}/candidates/${candidateId}`);

    if (!response.ok) {
      throw new Error('Failed to get candidate details');
    }

    const result = await response.json();
    return result.data;
  }

  // Calculate the match degree of a single candidate
  async calculateCandidateMatch(candidateId: string) {
    const response = await fetch(`${API_BASE_URL}/match/${candidateId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to calculate candidate match');
    }

    return response.json();
  }

  // Batch calculate the match degree of all candidates
  async batchCalculateMatches() {
    const response = await fetch(`${API_BASE_URL}/match/batch/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to batch calculate matches');
    }

    return response.json();
  }

  // Parse JD text
  async parseJD(jdText: string) {
    const response = await fetch(`${API_BASE_URL}/jd/parse`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jdText }),
    });

    if (!response.ok) {
      throw new Error('Failed to parse JD');
    }

    return response.json();
  }

  // Retrieve current JD information
  async getCurrentJD() {
    const response = await fetch(`${API_BASE_URL}/jd`);

    if (!response.ok) {
      throw new Error('Failed to get JD information');
    }

    return response.json();
  }

  // Retrieve JD status
  async getJDStatus() {
    const response = await fetch(`${API_BASE_URL}/jd/status`);

    if (!response.ok) {
      throw new Error('Failed to get JD status');
    }

    return response.json();
  }

  // Initialize demonstration data (set JD + import candidates)
  async initDemoData() {
    try {
      await this.setDemoJD();
      await this.importCandidates();
      return { success: true, message: 'Demo data initialized successfully' };
    } catch (error) {
      throw new Error(`Failed to initialize demo data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const apiService = new ApiService();
export default apiService;