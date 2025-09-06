import '../../styles/pages/WriteLetter.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { letterService } from '../../services';
import type { LetterListItem } from '../../types/api';

const WriteLetter = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0); // API는 0부터 시작
  const [letters, setLetters] = useState<LetterListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const itemsPerPage = 8; // 페이지당 8개 아이템 (2열 x 4행)

  // 편지 목록 불러오기
  const fetchLetters = async (page: number = 0) => {
    try {
      setLoading(true);
      setError(null);

      const pageRequest = {
        page: page,
        size: itemsPerPage,
        sort: ["createdAt,desc"] // 최신순 정렬
      };

      const response = await letterService.getLetters(pageRequest);

      if (response.isSuccess && response.result) {
        setLetters(response.result.content);
        setTotalPages(response.result.totalPages);
        setTotalElements(response.result.totalElements);
        setCurrentPage(page);
      } else {
        setError('편지 목록을 불러오는데 실패했습니다.');
      }
    } catch (error) {
      setError('서버 연결에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 첫 번째 페이지 로드
  useEffect(() => {
    fetchLetters(0);
  }, []);

  // 페이지 변경 함수 (UI는 1부터 시작, API는 0부터 시작)
  const handlePageChange = (displayPage: number) => {
    const apiPage = displayPage - 1; // UI 페이지를 API 페이지로 변환
    if (apiPage >= 0 && apiPage < totalPages) {
      fetchLetters(apiPage);
    }
  };

  // 카드 클릭 함수
  const handleCardClick = (letterId: number) => {
    navigate(`/write-detail/${letterId}`);
  };

  // 페이지네이션 버튼 생성
  const renderPaginationButtons = () => {
    if (totalPages <= 1) return null;

    const buttons = [];
    const maxVisiblePages = 5;
    const displayCurrentPage = currentPage + 1; // API 페이지를 UI 페이지로 변환

    // 이전 버튼
    buttons.push(
      <button
        key='prev'
        className={`pagination-btn ${displayCurrentPage === 1 ? 'disabled' : ''}`}
        onClick={() => handlePageChange(displayCurrentPage - 1)}
        disabled={displayCurrentPage === 1}
      >
        <span>&lt;</span>
      </button>
    );

    // 페이지 번호 버튼들
    let startPage = Math.max(1, displayCurrentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`pagination-btn ${displayCurrentPage === i ? 'active' : ''}`}
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
        className={`pagination-btn ${displayCurrentPage === totalPages ? 'disabled' : ''}`}
        onClick={() => handlePageChange(displayCurrentPage + 1)}
        disabled={displayCurrentPage === totalPages}
      >
        <span>&gt;</span>
      </button>
    );

    return buttons;
  };

  // 로딩 상태
  if (loading) {
    return (
      <main className='write-letter'>
        <div className='content-container'>
          <div className='loading-state'>
            <div className='loading-spinner'></div>
            <p>편지 목록을 불러오는 중...</p>
          </div>
        </div>
      </main>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <main className='write-letter'>
        <div className='content-container'>
          <div className='error-state'>
            <h2>오류가 발생했습니다</h2>
            <p>{error}</p>
            <button onClick={() => fetchLetters(0)} className='retry-button'>
              다시 시도
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='write-letter'>
      <div className='content-container'>
        {/* 총 편지 수 표시 */}
        <div className='letters-header'>
          <h2>편지 목록</h2>
          <p>총 {totalElements}개의 편지가 있습니다.</p>
        </div>

        <div className='projects-grid'>
          {letters.length === 0 ? (
            <div className='empty-state'>
              <p>아직 편지가 없습니다.</p>
            </div>
          ) : (
            letters.map(letter => (
              <div
                key={letter.id}
                className='project-card'
                onClick={() => handleCardClick(letter.id)}
              >
                <h3 className='project-title'>{letter.title}</h3>
                <div className='letter-info'>
                  <div className='author-info'>
                    <span className='author-name'>작성자: {letter.authorName}</span>
                    <span className={`completion-status ${letter.isCompleted ? 'completed' : 'pending'}`}>
                      {letter.isCompleted ? '완료' : '진행중'}
                    </span>
                  </div>
                  <div className='memoir-title'>
                    관련 회고록: {letter.warMemoirTitle}
                  </div>
                </div>
                <p className='project-description'>{letter.contentPreview}</p>
                <div className='letter-date'>
                  {new Date(letter.createdAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className='pagination'>{renderPaginationButtons()}</div>
        )}
      </div>
    </main>
  );
};

export default WriteLetter;
