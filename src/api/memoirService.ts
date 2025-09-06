import api from './axiosConfig';

// 회고록 관련 API 서비스
export const memoirService = {
  // 회고록 목록 조회
  getMemoirs: async (page: number = 0, size: number = 6) => {
    try {
      const response = await api.get('/api/memoirs', {
        params: { page, size }
      });
      return response.data;
    } catch (error) {
      console.error('회고록 목록 조회 실패:', error);
      throw error;
    }
  },

  // 회고록 상세 조회
  getMemoirDetail: async (id: number) => {
    try {
      const response = await api.get(`/api/memoirs/${id}`);
      return response.data;
    } catch (error) {
      console.error('회고록 상세 조회 실패:', error);
      throw error;
    }
  },

  // 회고록 생성
  createMemoir: async (memoirData: any) => {
    try {
      const response = await api.post('/api/memoirs', memoirData);
      return response.data;
    } catch (error) {
      console.error('회고록 생성 실패:', error);
      throw error;
    }
  },

  // 회고록 수정
  updateMemoir: async (id: number, memoirData: any) => {
    try {
      const response = await api.put(`/api/memoirs/${id}`, memoirData);
      return response.data;
    } catch (error) {
      console.error('회고록 수정 실패:', error);
      throw error;
    }
  },

  // 회고록 삭제
  deleteMemoir: async (id: number) => {
    try {
      await api.delete(`/api/memoirs/${id}`);
    } catch (error) {
      console.error('회고록 삭제 실패:', error);
      throw error;
    }
  },
};
