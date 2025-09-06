import '../../styles/pages/WarMemoir.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { memoirService } from '../../services';

// 타입 정의
interface Memoir {
  id: number;
  title: string;
  image: string;
  createdAt: string;
  replyCount: number;
  sectionCount: number;
}


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
        setError('서버 연결에 실패했습니다.');
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
