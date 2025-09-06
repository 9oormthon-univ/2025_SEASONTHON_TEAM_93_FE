import './WarMemoir.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { memoirService } from '../api';

// 타입 정의
interface Memoir {
  id: number;
  title: string;
  image: string;
  createdAt: string;
  replyCount: number;
  sectionCount: number;
}

// 샘플 데이터
const sampleMemoirs: Memoir[] = [
  {
    id: 1,
    title: '6.25 전쟁의 기억',
    image: 'https://via.placeholder.com/300x200?text=6.25+전쟁의+기억',
    createdAt: '2025-08-30T00:00:00.000Z',
    replyCount: 15,
    sectionCount: 3,
  },
  {
    id: 2,
    title: '인천상륙작전의 감동',
    image: 'https://via.placeholder.com/300x200?text=인천상륙작전',
    createdAt: '2025-08-29T00:00:00.000Z',
    replyCount: 23,
    sectionCount: 5,
  },
  {
    id: 3,
    title: '동지들과의 우정',
    image: 'https://via.placeholder.com/300x200?text=동지들과의+우정',
    createdAt: '2025-08-28T00:00:00.000Z',
    replyCount: 8,
    sectionCount: 2,
  },
  {
    id: 4,
    title: '겨울의 추위',
    image: 'https://via.placeholder.com/300x200?text=겨울의+추위',
    createdAt: '2025-08-27T00:00:00.000Z',
    replyCount: 12,
    sectionCount: 4,
  },
  {
    id: 5,
    title: '고향에 대한 그리움',
    image: 'https://via.placeholder.com/300x200?text=고향에+대한+그리움',
    createdAt: '2025-08-26T00:00:00.000Z',
    replyCount: 19,
    sectionCount: 3,
  },
  {
    id: 6,
    title: '평화의 소중함',
    image: 'https://via.placeholder.com/300x200?text=평화의+소중함',
    createdAt: '2025-08-25T00:00:00.000Z',
    replyCount: 31,
    sectionCount: 6,
  },
  {
    id: 7,
    title: '휴전협정의 날',
    image: 'https://via.placeholder.com/300x200?text=휴전협정의+날',
    createdAt: '2025-08-24T00:00:00.000Z',
    replyCount: 27,
    sectionCount: 4,
  },
  {
    id: 8,
    title: '귀향길',
    image: 'https://via.placeholder.com/300x200?text=귀향길',
    createdAt: '2025-08-23T00:00:00.000Z',
    replyCount: 14,
    sectionCount: 3,
  },
  {
    id: 9,
    title: '전우들의 명복을 빌며',
    image: 'https://via.placeholder.com/300x200?text=전우들의+명복을+빌며',
    createdAt: '2025-08-22T00:00:00.000Z',
    replyCount: 45,
    sectionCount: 7,
  },
  {
    id: 10,
    title: '전쟁의 교훈',
    image: 'https://via.placeholder.com/300x200?text=전쟁의+교훈',
    createdAt: '2025-08-21T00:00:00.000Z',
    replyCount: 18,
    sectionCount: 3,
  },
  {
    id: 11,
    title: '후세를 위한 기록',
    image: 'https://via.placeholder.com/300x200?text=후세를+위한+기록',
    createdAt: '2025-08-20T00:00:00.000Z',
    replyCount: 22,
    sectionCount: 4,
  },
  {
    id: 12,
    title: '영웅들의 이야기',
    image: 'https://via.placeholder.com/300x200?text=영웅들의+이야기',
    createdAt: '2025-08-19T00:00:00.000Z',
    replyCount: 16,
    sectionCount: 3,
  },
];

const WarMemoir = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0); // API는 0부터 시작
  const [memoirs, setMemoirs] = useState<Memoir[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 6; // 페이지당 6개 아이템 (2열 x 3행)

  // API에서 회고록 데이터 가져오기
  useEffect(() => {
    const fetchMemoirs = async () => {
      try {
        setLoading(true);
        setError(null);

        // 프록시를 통한 실제 API 호출
        const response = await memoirService.getMemoirs(
          currentPage,
          itemsPerPage
        );

        if (response.isSuccess && response.result) {
          setMemoirs(response.result.content);
          setTotalPages(response.result.totalPages);
        } else {
          setError('데이터를 불러오는데 실패했습니다.');
        }
      } catch (err) {
        console.error('회고록 조회 실패:', err);
        setError('서버 연결에 실패했습니다.');
        // 에러 시 샘플 데이터 사용
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = sampleMemoirs.slice(startIndex, endIndex);

        setMemoirs(pageData);
        setTotalPages(Math.ceil(sampleMemoirs.length / itemsPerPage));
      } finally {
        setLoading(false);
      }
    };

    fetchMemoirs();
  }, [currentPage]);

  // 페이지 변경 함수 (API는 0부터 시작하므로 -1)
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page - 1);
    }
  };

  // 카드 클릭 핸들러
  const handleCardClick = (memoirId: number) => {
    navigate(`/memoir/${memoirId}`);
  };

  // 페이지네이션 버튼 생성
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    // 이전 버튼
    buttons.push(
      <button
        key='prev'
        className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <span>&lt;</span>
      </button>
    );

    // 페이지 번호 버튼들
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    // 다음 버튼
    buttons.push(
      <button
        key='next'
        className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span>&gt;</span>
      </button>
    );

    return buttons;
  };

  if (loading) {
    return (
      <main className='war-memoir'>
        <div className='content-container'>
          <div className='loading'>로딩 중...</div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className='war-memoir'>
        <div className='content-container'>
          <div className='error'>{error}</div>
        </div>
      </main>
    );
  }

  return (
    <main className='war-memoir'>
      <div className='content-container'>
        <div className='content-grid'>
          {memoirs.map(memoir => (
            <div
              key={memoir.id}
              className='content-card'
              onClick={() => handleCardClick(memoir.id)}
            >
              <div className='card-image'>
                {memoir.image ? (
                  <img src={memoir.image} alt={memoir.title} />
                ) : (
                  <div className='image-placeholder'>이미지</div>
                )}
              </div>
              <div className='card-content'>
                <h3 className='card-title'>{memoir.title}</h3>
                <p className='card-date'>
                  {new Date(memoir.createdAt).toLocaleDateString('ko-KR')}
                </p>
                <p className='card-description'>
                  댓글 {memoir.replyCount}개 • 섹션 {memoir.sectionCount}개
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className='pagination'>{renderPaginationButtons()}</div>
        )}
      </div>
    </main>
  );
};

export default WarMemoir;
