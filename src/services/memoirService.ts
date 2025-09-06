import api from './axiosConfig';
import type {
  Memoir,
  MemoirListResponse,
  MemoirDetailResponse,
} from '../types/api/memoir';

// 회고록 관련 API 서비스
export const memoirService = {
  // 회고록 목록 조회
  getMemoirs: async (
    page: number = 0,
    size: number = 6,
    sort?: string[]
  ): Promise<MemoirListResponse> => {
    try {
      const params: Record<string, unknown> = { page, size };
      if (sort && sort.length > 0) {
        params.sort = sort;
      }

      const response = await api.get<MemoirListResponse>('/warmemoir', {
        params,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 회고록 상세 조회
  getMemoirDetail: async (id: number): Promise<MemoirDetailResponse> => {
    try {
      const response = await api.get<MemoirDetailResponse>(`/warmemoir/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 회고록 생성
  createMemoir: async (
    memoirData: Omit<Memoir, 'id' | 'createdAt'>
  ): Promise<MemoirDetailResponse> => {
    const response = await api.post<MemoirDetailResponse>('/warmemoir', memoirData);
    return response.data;
  },

  // 회고록 수정
  updateMemoir: async (
    id: number,
    memoirData: Partial<Omit<Memoir, 'id' | 'createdAt'>>
  ): Promise<MemoirDetailResponse> => {
    const response = await api.put<MemoirDetailResponse>(`/warmemoir/${id}`, memoirData);
    return response.data;
  },

  // 회고록 삭제
  deleteMemoir: async (id: number): Promise<void> => {
    try {
      await api.delete(`/warmemoir/${id}`);
    } catch (error) {
      throw error;
    }
  },
};
