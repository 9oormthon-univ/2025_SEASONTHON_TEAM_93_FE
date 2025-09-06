import { ApiResponse, Pageable, Sort } from './common';

// 회고록 기본 정보
export interface Memoir {
  id: number;
  title: string;
  image: string;
  createdAt: string;
  replyCount: number;
  sectionCount: number;
}

// 회고록 섹션
export interface MemoirSection {
  id: number;
  sectionOrder: number;
  title: string;
  content: string;
}

// 회고록 상세 정보
export interface MemoirDetail {
  id: number;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  sections: MemoirSection[];
  replyCount: number;
}

// 회고록 페이지 응답
export interface MemoirPageResponse {
  totalPages: number;
  totalElements: number;
  pageable: Pageable;
  numberOfElements: number;
  size: number;
  content: Memoir[];
  number: number;
  sort: Sort;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// API 응답 타입들
export type MemoirListResponse = ApiResponse<MemoirPageResponse>;
export type MemoirDetailResponse = ApiResponse<MemoirDetail>;
