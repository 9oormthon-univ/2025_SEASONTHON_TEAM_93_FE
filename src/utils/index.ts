// 유틸리티 함수들
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ko-KR').format(date);
};

export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// 필요에 따라 추가 유틸리티 함수들을 여기에 정의하세요
