import { ApiResponse } from './common';

// 편지 데이터
export interface LetterData {
  title: string;
  content: string;
  authorName: string;
  authorEmail: string;
  authorAddress?: string;
  authorPhone?: string;
  heroId: number;
}

// 편지 정보
export interface Letter {
  id: number;
  title: string;
  content: string;
  authorName: string;
  authorEmail: string;
  authorAddress?: string;
  authorPhone?: string;
  heroId: number;
  createdAt: string;
  updatedAt: string;
  status: 'pending' | 'delivered';
}

// 영웅 정보
export interface Hero {
  id: number;
  name: string;
  description: string;
  image?: string;
  createdAt: string;
}

// 편지 목록 아이템 (API 응답)
export interface LetterListItem {
  id: number;
  title: string;
  contentPreview: string;
  isCompleted: boolean;
  authorName: string;
  warMemoirTitle: string;
  createdAt: string;
  updatedAt: string;
}

// 편지 작성 요청 데이터
export interface LetterCreateRequest {
  title: string;
  content: string;
  warMemoirId: number;
}

export interface LetterUpdateRequest {
  title: string;
  content: string;
  warMemoirId: number;
}

// 편지 작성자 정보 (API 응답)
export interface LetterAuthor {
  id: number;
  name: string;
  email: string;
}

// 회고록 정보 (편지 작성 응답용)
export interface WarMemoirInfo {
  id: number;
  title: string;
}

// 편지 상세 정보 (작성 응답)
export interface LetterDetail {
  id: number;
  title: string;
  content: string;
  isCompleted: boolean;
  author: LetterAuthor;
  warMemoir: WarMemoirInfo;
  createdAt: string;
  updatedAt: string;
}

// 편지 페이지 요청 파라미터
export interface LetterPageRequest {
  page: number;
  size: number;
  sort?: string[];
}

// 편지 페이지 응답
export interface LetterPageResponse {
  totalPages: number;
  totalElements: number;
  pageable: {
    unpaged: boolean;
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    offset: number;
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
  };
  numberOfElements: number;
  size: number;
  content: LetterListItem[];
  number: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}

// API 응답 타입들
export type LetterResponse = ApiResponse<Letter>;
export type LetterListResponse = ApiResponse<Letter[]>;
export type LetterPageApiResponse = ApiResponse<LetterPageResponse>;
export type LetterCreateResponse = ApiResponse<LetterDetail>;
export type LetterUpdateResponse = ApiResponse<LetterDetail>;
export type HeroResponse = ApiResponse<Hero>;
export type HeroListResponse = ApiResponse<Hero[]>;
