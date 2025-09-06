// 공통 API 응답 타입
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
  success: boolean;
}

// 페이지네이션 관련 타입
export interface Pageable {
  unpaged: boolean;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  offset: number;
  sort: Sort;
}

export interface Sort {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}
