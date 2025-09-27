import { Candidate } from '../types/candidate';

const API_BASE_URL = 'http://localhost:3002/api';

// API服务类
class ApiService {
  // 设置演示JD
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

  // 导入候选人数据
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

  // 获取候选人列表（简要信息）
  async getCandidatesSummary(): Promise<Candidate[]> {
    const response = await fetch(`${API_BASE_URL}/candidates?summary=true`);

    if (!response.ok) {
      throw new Error('Failed to get candidates list');
    }

    const result = await response.json();
    return result.data.candidates;
  }

  // 获取候选人详细信息
  async getCandidateDetails(candidateId: string): Promise<Candidate> {
    const response = await fetch(`${API_BASE_URL}/candidates/${candidateId}`);

    if (!response.ok) {
      throw new Error('Failed to get candidate details');
    }

    const result = await response.json();
    return result.data;
  }

  // 计算单个候选人匹配度
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

  // 批量计算所有候选人匹配度
  async batchCalculateMatches() {
    const response = await fetch(`${API_BASE_URL}/match/batch/all`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to batch calculate matches');
    }

    return response.json();
  }

  // 获取当前JD信息
  async getCurrentJD() {
    const response = await fetch(`${API_BASE_URL}/jd`);

    if (!response.ok) {
      throw new Error('Failed to get JD information');
    }

    return response.json();
  }

  // 初始化演示数据（设置JD + 导入候选人）
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

// 导出单例实例
export const apiService = new ApiService();
export default apiService;