import '../../styles/pages/WriteLetter.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { letterService } from '../../services';
import type { LetterListItem } from '../../types/api/letter';

const WriteLetter = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0); // API는 0부터 시작
  const [letters, setLetters] = useState<LetterListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const itemsPerPage = 8; // 페이지당 8개 아이템 (2열 x 4행)

  // 편지 삭제 관련 상태
  const [deletingLetterId, setDeletingLetterId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [letterToDelete, setLetterToDelete] = useState<LetterListItem | null>(
    null
  );

  // 편지 수정 관련 상태
  const [editingLetterId, setEditingLetterId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editWarMemoirId, setEditWarMemoirId] = useState<number>(0);
  const [updatingLetter, setUpdatingLetter] = useState(false);

  // 편지 목록 불러오기
  const fetchLetters = async (page: number = 0) => {
    try {
      setLoading(true);
      setError(null);

      const pageRequest = {
        page: page,
        size: itemsPerPage,
        sort: ['createdAt,desc'], // 최신순 정렬
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

  // 편지 삭제 모달 열기
  const openDeleteModal = (letter: LetterListItem) => {
    // 본인이 작성한 편지만 삭제 가능하도록 체크
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail !== letter.authorName) {
      alert('본인이 작성한 편지만 삭제할 수 있습니다.');
      return;
    }
    setLetterToDelete(letter);
    setShowDeleteModal(true);
  };

  // 편지 삭제 모달 닫기
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setLetterToDelete(null);
  };

  // 편지 삭제 확인
  const handleDeleteLetter = async () => {
    if (!letterToDelete) return;

    // 로그인 토큰 확인
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    try {
      setDeletingLetterId(letterToDelete.id);

      const response = await letterService.deleteLetter(letterToDelete.id);

      if (response.isSuccess) {
        alert('편지가 성공적으로 삭제되었습니다.');

        // 편지 목록에서 해당 편지 제거
        setLetters(prevLetters =>
          prevLetters.filter(letter => letter.id !== letterToDelete.id)
        );

        // 총 편지 수 업데이트
        setTotalElements(prev => prev - 1);

        // 모달 닫기
        closeDeleteModal();

        // 현재 페이지에 편지가 없으면 이전 페이지로
        if (letters.length === 1 && currentPage > 0) {
          fetchLetters(currentPage - 1);
        }
      } else {
        alert('편지 삭제에 실패했습니다: ' + response.message);
      }
    } catch (error) {
      alert('편지 삭제 중 오류가 발생했습니다.');
    } finally {
      setDeletingLetterId(null);
    }
  };

  // 편지 수정 모드 시작
  const startEditLetter = (letter: LetterListItem) => {
    // 본인이 작성한 편지만 수정 가능하도록 체크
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail !== letter.authorName) {
      alert('본인이 작성한 편지만 수정할 수 있습니다.');
      return;
    }

    setEditingLetterId(letter.id);
    setEditTitle(letter.title);
    setEditContent(letter.contentPreview);
    setEditWarMemoirId(1);
  };

  // 편지 수정 취소
  const cancelEditLetter = () => {
    setEditingLetterId(null);
    setEditTitle('');
    setEditContent('');
    setEditWarMemoirId(0);
  };

  // 편지 수정 제출
  const handleEditLetterSubmit = async (letterId: number) => {
    if (!editTitle.trim() || !editContent.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    // 로그인 토큰 확인
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    try {
      setUpdatingLetter(true);

      const updateData = {
        title: editTitle.trim(),
        content: editContent.trim(),
        warMemoirId: editWarMemoirId,
      };

      const response = await letterService.updateLetter(letterId, updateData);

      if (response.isSuccess && response.result) {
        alert('편지가 성공적으로 수정되었습니다.');

        // 편지 목록에서 해당 편지 업데이트
        setLetters(prevLetters =>
          prevLetters.map(letter =>
            letter.id === letterId
              ? {
                  ...letter,
                  title: response.result!.title,
                  contentPreview:
                    response.result!.content.length > 100
                      ? response.result!.content.substring(0, 100) + '...'
                      : response.result!.content,
                  updatedAt: response.result!.updatedAt,
                }
              : letter
          )
        );

        // 수정 모드 종료
        cancelEditLetter();
      } else {
        alert('편지 수정에 실패했습니다: ' + response.message);
      }
    } catch (error) {
      alert('편지 수정 중 오류가 발생했습니다.');
    } finally {
      setUpdatingLetter(false);
    }
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
    let startPage = Math.max(
      1,
      displayCurrentPage - Math.floor(maxVisiblePages / 2)
    );
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
            letters.map(letter => {
              const userEmail = localStorage.getItem('userEmail');
              const canDelete = userEmail === letter.authorName;

              return (
                <div key={letter.id} className='project-card'>
                  {editingLetterId === letter.id ? (
                    // 수정 모드 UI
                    <div className='edit-letter-form'>
                      <input
                        type='text'
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        className='edit-title-input'
                        placeholder='편지 제목을 입력해주세요.'
                        disabled={updatingLetter}
                      />
                      <textarea
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        className='edit-content-input'
                        placeholder='편지 내용을 입력해주세요.'
                        rows={6}
                        disabled={updatingLetter}
                      />
                      <div className='edit-letter-actions'>
                        <button
                          onClick={() => handleEditLetterSubmit(letter.id)}
                          className='save-edit-button'
                          disabled={
                            updatingLetter ||
                            !editTitle.trim() ||
                            !editContent.trim()
                          }
                        >
                          {updatingLetter ? '수정 중...' : '수정 완료'}
                        </button>
                        <button
                          onClick={cancelEditLetter}
                          className='cancel-edit-button'
                          disabled={updatingLetter}
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  ) : (
                    // 일반 표시 모드 UI
                    <>
                      <div
                        className='card-content-area'
                        onClick={() => handleCardClick(letter.id)}
                      >
                        <h3 className='project-title'>{letter.title}</h3>
                        <div className='letter-info'>
                          <div className='author-info'>
                            <span className='author-name'>
                              작성자: {letter.authorName}
                            </span>
                            <span
                              className={`completion-status ${letter.isCompleted ? 'completed' : 'pending'}`}
                            >
                              {letter.isCompleted ? '완료' : '진행중'}
                            </span>
                          </div>
                          <div className='memoir-title'>
                            관련 회고록: {letter.warMemoirTitle}
                          </div>
                        </div>
                        <p className='project-description'>
                          {letter.contentPreview}
                        </p>
                        <div className='letter-date'>
                          {new Date(letter.createdAt).toLocaleDateString(
                            'ko-KR',
                            {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            }
                          )}
                          {letter.updatedAt !== letter.createdAt && (
                            <span className='updated-indicator'> (수정됨)</span>
                          )}
                        </div>
                      </div>

                      {/* 수정/삭제 버튼 (본인 편지만) */}
                      {canDelete && (
                        <div className='letter-actions'>
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              startEditLetter(letter);
                            }}
                            className='edit-letter-button'
                            disabled={
                              updatingLetter || deletingLetterId === letter.id
                            }
                          >
                            ✏️ 수정
                          </button>
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              openDeleteModal(letter);
                            }}
                            className='delete-letter-button'
                            disabled={
                              updatingLetter || deletingLetterId === letter.id
                            }
                          >
                            {deletingLetterId === letter.id
                              ? '삭제 중...'
                              : '🗑️ 삭제'}
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className='pagination'>{renderPaginationButtons()}</div>
        )}

        {/* 편지 삭제 확인 모달 */}
        {showDeleteModal && letterToDelete && (
          <div className='modal-overlay' onClick={closeDeleteModal}>
            <div className='delete-modal' onClick={e => e.stopPropagation()}>
              <div className='modal-header'>
                <h3>편지 삭제</h3>
              </div>
              <div className='modal-content'>
                <p>정말로 이 편지를 삭제하시겠습니까?</p>
                <div className='letter-preview'>
                  <strong>"{letterToDelete.title}"</strong>
                  <p>{letterToDelete.contentPreview}</p>
                  <div className='letter-meta'>
                    <span>회고록: {letterToDelete.warMemoirTitle}</span>
                    <span>
                      작성일:{' '}
                      {new Date(letterToDelete.createdAt).toLocaleDateString(
                        'ko-KR'
                      )}
                    </span>
                  </div>
                </div>
                <p className='warning-text'>
                  삭제된 편지는 복구할 수 없습니다.
                </p>
              </div>
              <div className='modal-actions'>
                <button
                  onClick={closeDeleteModal}
                  className='cancel-delete-button'
                  disabled={deletingLetterId === letterToDelete.id}
                >
                  취소
                </button>
                <button
                  onClick={handleDeleteLetter}
                  className='confirm-delete-button'
                  disabled={deletingLetterId === letterToDelete.id}
                >
                  {deletingLetterId === letterToDelete.id
                    ? '삭제 중...'
                    : '삭제하기'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default WriteLetter;
