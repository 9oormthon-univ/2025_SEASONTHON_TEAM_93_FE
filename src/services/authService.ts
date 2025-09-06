import api from './axiosConfig';
import type {
  AuthResponse,
  User,
  LoginRequest,
  SignupRequest,
  AuthResponseType,
  UserResponse,
} from '../types/api';

// 인증 관련 API 서비스
export const authService = {
  // 로그인 상태 확인
  checkAuth: async (): Promise<UserResponse> => {
    try {
      const response = await api.get('/api/auth/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 로그인
  login: async (loginData: LoginRequest): Promise<AuthResponseType> => {
    try {
      const response = await api.post('/api/auth/login', loginData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 회원가입
  signup: async (signupData: SignupRequest): Promise<AuthResponseType> => {
    try {
      const response = await api.post('/api/auth/signup', signupData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 로그아웃
  logout: async (): Promise<void> => {
    try {
      await api.post('/api/auth/logout');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userId');
      window.location.href = '/login';
    } catch (error) {
      // 에러가 있어도 로컬 스토리지는 정리
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userId');
      window.location.href = '/login';
    }
  },

  // 토큰 갱신
  refreshToken: async (): Promise<string> => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('리프레시 토큰이 없습니다.');
      }

      const response = await api.post('/api/auth/refresh', {
        refreshToken,
      });

      const { accessToken, refreshToken: newRefreshToken } = response.data as {
        accessToken: string;
        refreshToken: string;
      };
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      return accessToken;
    } catch (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userId');
      window.location.href = '/login';
      throw error;
    }
  },
};