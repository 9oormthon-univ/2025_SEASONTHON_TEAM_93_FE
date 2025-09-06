import axios from 'axios';

// 기본 axios 인스턴스 생성
const api = axios.create({
  baseURL: '/api', // Vite 프록시를 통해 백엔드에 접근
  timeout: 10000, // 10초 타임아웃
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (요청 전에 실행)
api.interceptors.request.use(
  config => {
    // 로컬 스토리지에서 토큰 가져오기
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('API 요청:', config);
    return config;
  },
  error => {
    console.error('요청 에러:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (응답 후에 실행)
api.interceptors.response.use(
  response => {
    console.log('API 응답:', response);
    return response;
  },
  error => {
    console.error('응답 에러:', error);

    // 401 에러 시 토큰 만료 처리
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      // 로그인 페이지로 리다이렉트
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export default api;
