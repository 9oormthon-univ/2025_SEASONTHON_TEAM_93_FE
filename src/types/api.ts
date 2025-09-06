// API 응답 타입 정의
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

// 인증 관련 타입
export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImage?: string;
  role: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

// 회고록 관련 타입
export interface Memoir {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  viewCount: number;
  likeCount: number;
}

export interface CreateMemoirRequest {
  title: string;
  content: string;
  imageUrl?: string;
}

// 편지 관련 타입
export interface Letter {
  id: number;
  title: string;
  content: string;
  senderName: string;
  senderEmail: string;
  heroId: number;
  heroName: string;
  createdAt: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface CreateLetterRequest {
  title: string;
  content: string;
  senderName: string;
  senderEmail: string;
  heroId: number;
}

// 영웅 관련 타입
export interface Hero {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  volunteerCount: number;
  letterCount: number;
}
