import api from './axiosConfig';

// 인증 관련 API 서비스
export const authService = {
  // 로그인 상태 확인
  checkAuth: async () => {
    try {
      const response = await api.get('/api/auth/me');
      return response.data;
    } catch (error) {
      console.error('인증 확인 실패:', error);
      throw error;
    }
  },

  // 로그아웃
  logout: async () => {
    try {
      await api.post('/api/auth/logout');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/';
    } catch (error) {
      console.error('로그아웃 실패:', error);
      // 에러가 있어도 로컬 스토리지는 정리
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/';
    }
  },

  // 토큰 갱신
  refreshToken: async () => {
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
      console.error('토큰 갱신 실패:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/';
      throw error;
    }
  },
};
