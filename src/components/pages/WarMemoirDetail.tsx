import '../../styles/pages/WarMemoirDetail.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { memoirService } from '../../services';

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
        console.error('회고록 상세 조회 실패:', err);
        setError('서버 연결에 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchMemoirDetail();
  }, [id]);

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
          <div className='comment-form'>
            <textarea
              placeholder='댓글을 입력해주세요.'
              className='comment-input'
              disabled
            />
            <button className='comment-submit' disabled>
              댓글 등록하기
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WarMemoirDetail;
