import api from './axiosConfig';
import type { ApiResponse } from '../types/api/common';
import type { ReplyPageResponse, ReplyPageRequest, ReplyCreateRequest, Reply } from '../types/api/reply';

// 회고록 댓글 서비스
export const replyService = {
  // 회고록 댓글 목록 조회 (페이지네이션)
  getReplies: async (
    warMemoirId: number,
    pageRequest: ReplyPageRequest
  ): Promise<ApiResponse<ReplyPageResponse>> => {
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

    const response = await api.get<ApiResponse<ReplyPageResponse>>(
      `/warmemoir/${warMemoirId}/replies?${params.toString()}`
    );
    
    return response.data;
  },

  // 회고록 댓글 작성 (인증 필요)
  createReply: async (
    warMemoirId: number,
    replyData: ReplyCreateRequest
  ): Promise<ApiResponse<Reply>> => {
    const response = await api.post<ApiResponse<Reply>>(
      `/warmemoir/${warMemoirId}/replies`,
      replyData
    );
    
    return response.data;
  },

  // 회고록 댓글 수정 (인증 필요)
  updateReply: async (
    warMemoirId: number,
    replyId: number,
    replyData: ReplyCreateRequest
  ): Promise<ApiResponse<Reply>> => {
    const response = await api.put<ApiResponse<Reply>>(
      `/warmemoir/${warMemoirId}/replies/${replyId}`,
      replyData
    );
    
    return response.data;
  },

  // 회고록 댓글 삭제 (인증 필요)
  deleteReply: async (
    warMemoirId: number,
    replyId: number
  ): Promise<ApiResponse<string>> => {
    const response = await api.delete<ApiResponse<string>>(
      `/warmemoir/${warMemoirId}/replies/${replyId}`
    );
    
    return response.data;
  },
};
