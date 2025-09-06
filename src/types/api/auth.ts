import { ApiResponse } from './common';

// 사용자 정보
export interface User {
  id: number;
  email: string;
  name: string;
  profileImage?: string;
  createdAt: string;
}

// 인증 응답
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

// 로그인 요청
export interface LoginRequest {
  email: string;
  password: string;
}

// 회원가입 요청
export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

// API 응답 타입들
export type AuthResponseType = ApiResponse<AuthResponse>;
export type UserResponse = ApiResponse<User>;
