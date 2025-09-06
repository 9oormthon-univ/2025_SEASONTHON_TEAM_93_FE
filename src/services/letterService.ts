import api from './axiosConfig';
import type {
  LetterData,
  Letter,
  Hero,
  LetterResponse,
  LetterListResponse,
  HeroResponse,
  HeroListResponse,
} from '../types/api';

// 편지 관련 API 서비스
export const letterService = {
  // 편지 목록 조회 (영웅별)
  getLetters: async (
    heroId: number,
    page: number = 0,
    size: number = 8
  ): Promise<LetterListResponse> => {
    try {
      const response = await api.get(`/api/letters/hero/${heroId}`, {
        params: { page, size },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
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

  // 편지 작성
  createLetter: async (letterData: LetterData): Promise<LetterResponse> => {
    try {
      const response = await api.post('/api/letters', letterData);
      return response.data;
    } catch (error) {
      throw error;
    }
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

  // 편지 삭제
  deleteLetter: async (id: number): Promise<void> => {
    try {
      await api.delete(`/api/letters/${id}`);
    } catch (error) {
      throw error;
    }
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