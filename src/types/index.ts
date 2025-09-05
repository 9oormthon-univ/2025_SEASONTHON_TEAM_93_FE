// 공통 타입 정의
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// 필요에 따라 추가 타입들을 여기에 정의하세요
