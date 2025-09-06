// 컴포넌트 관련 타입들

// 네비게이션 아이템
export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
}

// 페이지네이션 정보
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

// 폼 상태
export interface FormState<T> {
  data: T;
  errors: Record<keyof T, string>;
  isSubmitting: boolean;
  isValid: boolean;
}

// 모달 상태
export interface ModalState {
  isOpen: boolean;
  title?: string;
  content?: React.ReactNode;
}

// 알림 상태
export interface NotificationState {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  isVisible: boolean;
}
