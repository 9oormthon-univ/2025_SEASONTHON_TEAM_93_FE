// API 응답 타입 정의
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
  success: boolean;
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
  image: string;
  createdAt: string;
  replyCount: number;
  sectionCount: number;
}

export interface Pageable {
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
}

export interface Sort {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

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
