import api from './axiosConfig';
import { ApiResponse, MemoirPageResponse } from '../types/api';

// 회고록 관련 API 서비스
export const memoirService = {
  // 회고록 목록 조회
  getMemoirs: async (page: number = 0, size: number = 6, sort?: string[]) => {
    try {
      const params: any = { page, size };
      if (sort && sort.length > 0) {
        params.sort = sort;
      }
      
      const response = await api.get<ApiResponse<MemoirPageResponse>>('/warmemoir', {
        params
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
      const response = await api.get(`/warmemoir/${id}`);
      return response.data;
    } catch (error) {
      console.error('회고록 상세 조회 실패:', error);
      throw error;
    }
  },

  // 회고록 생성
  createMemoir: async (memoirData: any) => {
    try {
      const response = await api.post('/warmemoir', memoirData);
      return response.data;
    } catch (error) {
      console.error('회고록 생성 실패:', error);
      throw error;
    }
  },

  // 회고록 수정
  updateMemoir: async (id: number, memoirData: any) => {
    try {
      const response = await api.put(`/warmemoir/${id}`, memoirData);
      return response.data;
    } catch (error) {
      console.error('회고록 수정 실패:', error);
      throw error;
    }
  },

  // 회고록 삭제
  deleteMemoir: async (id: number) => {
    try {
      await api.delete(`/warmemoir/${id}`);
    } catch (error) {
      console.error('회고록 삭제 실패:', error);
      throw error;
    }
  },
};
