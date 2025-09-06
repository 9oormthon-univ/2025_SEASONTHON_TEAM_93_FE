import api from './axiosConfig';
import type { ApiResponse } from '../types/api/common';
import type {
  LetterData,
  Letter,
  Hero,
  LetterResponse,
  LetterListResponse,
  LetterPageRequest,
  LetterPageApiResponse,
  LetterCreateRequest,
  LetterCreateResponse,
  LetterUpdateRequest,
  LetterUpdateResponse,
  HeroResponse,
  HeroListResponse,
} from '../types/api';

// 편지 관련 API 서비스
export const letterService = {
  // 전체 편지 목록 조회 (페이지네이션)
  getLetters: async (
    pageRequest: LetterPageRequest
  ): Promise<LetterPageApiResponse> => {
    const { page, size, sort } = pageRequest;
    
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    // sort 배열이 있으면 추가
    if (sort && sort.length > 0) {
      sort.forEach(sortItem => {
        params.append('sort', sortItem);
      });
    }

    const response = await api.get<LetterPageApiResponse>(
      `/letters?${params.toString()}`
    );
    
    return response.data;
  },

  // 편지 상세 조회
  getLetterDetail: async (id: number): Promise<LetterResponse> => {
    try {
      const response = await api.get(`/api/letters/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 편지 작성 (인증 필요)
  createLetter: async (
    letterData: LetterCreateRequest
  ): Promise<LetterCreateResponse> => {
    const response = await api.post<LetterCreateResponse>(
      '/letters',
      letterData
    );
    
    return response.data;
  },

  // 편지 수정
  updateLetter: async (
    id: number,
    letterData: Partial<LetterData>
  ): Promise<LetterResponse> => {
    try {
      const response = await api.put(`/api/letters/${id}`, letterData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 편지 수정 (인증 필요)
  updateLetter: async (
    letterId: number,
    letterData: LetterUpdateRequest
  ): Promise<LetterUpdateResponse> => {
    const response = await api.put<LetterUpdateResponse>(
      `/letters/${letterId}`,
      letterData
    );
    return response.data;
  },

  // 편지 삭제 (인증 필요)
  deleteLetter: async (letterId: number): Promise<ApiResponse<string>> => {
    const response = await api.delete<ApiResponse<string>>(
      `/letters/${letterId}`
    );
    
    return response.data;
  },

  // 영웅 목록 조회
  getHeroes: async (
    page: number = 0,
    size: number = 8
  ): Promise<HeroListResponse> => {
    try {
      const response = await api.get('/api/heroes', {
        params: { page, size },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 영웅 상세 조회
  getHeroDetail: async (id: number): Promise<HeroResponse> => {
    try {
      const response = await api.get(`/api/heroes/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};