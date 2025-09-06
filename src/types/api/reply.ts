// 회고록 댓글 관련 타입 정의

// 댓글 작성자 정보
export interface ReplyAuthor {
  id: number;
  name: string;
  email: string;
}

// 댓글 정보
export interface Reply {
  id: number;
  title: string;
  content: string;
  author: ReplyAuthor;
  createdAt: string;
  updatedAt: string;
}

// 댓글 페이지 요청 파라미터
export interface ReplyPageRequest {
  page: number;
  size: number;
  sort?: string[];
}

// 댓글 작성 요청
export interface ReplyCreateRequest {
  title: string;
  content: string;
}

// 댓글 페이지 응답
export interface ReplyPageResponse {
  totalPages: number;
  totalElements: number;
  pageable: {
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
  };
  numberOfElements: number;
  size: number;
  content: Reply[];
  number: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}
