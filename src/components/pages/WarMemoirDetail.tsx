import '../../styles/pages/WarMemoirDetail.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { memoirService, replyService } from '../../services';
import type { ReplyCreateRequest } from '../../types/api/reply';

// 타입 정의 (memoirService와 동일)
interface MemoirSection {
  id: number;
  sectionOrder: number;
  title: string;
  content: string;
}

interface MemoirDetail {
  id: number;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  sections: MemoirSection[];
  replyCount: number;
}

const WarMemoirDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [memoir, setMemoir] = useState<MemoirDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 댓글 작성 관련 상태
  const [replyTitle, setReplyTitle] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);

  useEffect(() => {
    const fetchMemoirDetail = async () => {
      if (!id) {
        setError('잘못된 회고록 ID입니다.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await memoirService.getMemoirDetail(parseInt(id));

        if (response.isSuccess && response.result) {
          setMemoir(response.result);
        } else {
          setError('회고록을 불러오는데 실패했습니다.');
        }
      } catch (err) {
        setError('서버 연결에 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchMemoirDetail();
  }, [id]);

  // 댓글 작성 핸들러
  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id || !replyTitle.trim() || !replyContent.trim()) {
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
      setSubmittingReply(true);
      
      const replyData: ReplyCreateRequest = {
        title: replyTitle.trim(),
        content: replyContent.trim(),
      };

      const response = await replyService.createReply(parseInt(id), replyData);
      
      if (response.isSuccess) {
        alert('댓글이 성공적으로 작성되었습니다.');
        // 입력 필드 초기화
        setReplyTitle('');
        setReplyContent('');
        // 회고록 데이터 새로고침 (댓글 수 업데이트)
        window.location.reload();
      } else {
        alert('댓글 작성에 실패했습니다: ' + response.message);
      }
    } catch (error) {
      alert('댓글 작성 중 오류가 발생했습니다.');
    } finally {
      setSubmittingReply(false);
    }
  };

  if (loading) {
    return (
      <main className='war-memoir-detail'>
        <div className='content-container'>
          <div className='loading'>로딩 중...</div>
        </div>
      </main>
    );
  }

  if (error || !memoir) {
    return (
      <main className='war-memoir-detail'>
        <div className='content-container'>
          <div className='error-message'>
            <h2>{error || '찾을 수 없는 회고록입니다.'}</h2>
            <button onClick={() => navigate('/home')} className='back-button'>
              목록으로 돌아가기
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='war-memoir-detail'>
      <div className='content-container'>
        {/* 헤더 영역 */}
        <div className='detail-header'>
          <button onClick={() => navigate('/home')} className='back-button'>
            ← 목록으로 돌아가기
          </button>
          <div className='header-actions'>
            <button className='letter-button'>
              해당 영웅에게 바로 편지쓰기
            </button>
          </div>
        </div>

        {/* 제목 및 메타 정보 */}
        <div className='detail-meta'>
          <h1 className='detail-title'>{memoir.title}</h1>
          <p className='detail-date'>
            발간일: {new Date(memoir.createdAt).toLocaleDateString('ko-KR')}
          </p>
          <p className='detail-updated'>
            수정일: {new Date(memoir.updatedAt).toLocaleDateString('ko-KR')}
          </p>
        </div>

        {/* 메인 이미지 */}
        <div className='detail-image'>
          {memoir.image ? (
            <img src={memoir.image} alt={memoir.title} />
          ) : (
            <div className='image-placeholder'>이미지</div>
          )}
        </div>

        {/* 섹션별 내용 */}
        <div className='detail-content'>
          {memoir.sections
            .sort((a, b) => a.sectionOrder - b.sectionOrder)
            .map(section => (
              <div key={section.id} className='content-section'>
                <h2 className='section-title'>{section.title}</h2>
                <div className='section-content'>
                  {section.content.split('\n').map((paragraph, index) => (
                    <p key={index} className='section-paragraph'>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* 도움을 준 분들 섹션 - API 연동 필요 시 활성화 */}
        {/* 
        <div className='helpers-section'>
          <h2 className='section-title'>도움을 준 분들</h2>
          <div className='helpers-grid'>
            // API에서 도움을 준 분들 데이터를 받아와서 렌더링
          </div>
        </div>
        */}

        {/* 댓글 섹션 - 향후 댓글 API 연동 */}
        <div className='comments-section'>
          <h2 className='section-title'>댓글 ({memoir.replyCount}개)</h2>

          {/* 댓글 목록 - replyService를 사용하여 실제 댓글 데이터 표시 */}
          <div className='comments-list'>
            <p className='comments-placeholder'>
              아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
            </p>
          </div>

          {/* 댓글 입력 폼 */}
          <form className='comment-form' onSubmit={handleReplySubmit}>
            <input
              type='text'
              placeholder='댓글 제목을 입력해주세요.'
              className='comment-title-input'
              value={replyTitle}
              onChange={(e) => setReplyTitle(e.target.value)}
              disabled={submittingReply}
              required
            />
            <textarea
              placeholder='댓글 내용을 입력해주세요.'
              className='comment-input'
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              disabled={submittingReply}
              rows={4}
              required
            />
            <button 
              type='submit'
              className='comment-submit'
              disabled={submittingReply || !replyTitle.trim() || !replyContent.trim()}
            >
              {submittingReply ? '댓글 작성 중...' : '댓글 등록하기'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default WarMemoirDetail;
