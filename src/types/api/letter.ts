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

// API 응답 타입들
export type LetterResponse = ApiResponse<Letter>;
export type LetterListResponse = ApiResponse<Letter[]>;
export type HeroResponse = ApiResponse<Hero>;
export type HeroListResponse = ApiResponse<Hero[]>;
