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
        // 에러 시 샘플 데이터 사용
        setMemoir({
          id: parseInt(id),
          title: '6.25 전쟁의 기억',
          image: 'https://via.placeholder.com/800x400?text=6.25+전쟁의+기억',
          createdAt: '2025-08-30T00:00:00.000Z',
          updatedAt: '2025-08-30T00:00:00.000Z',
          sections: [
            {
              id: 1,
              sectionOrder: 1,
              title: '입대 과정',
              content:
                '1950년 6월, 갑작스러운 전쟁 소식을 듣고 입대하게 되었습니다. 당시 나는 20세의 젊은 병사였고, 갑작스러운 전쟁 소식에 충격을 받았습니다. 가족들과의 이별은 너무나 아쉬웠지만, 나라를 지키는 것이 우선이라고 생각했습니다.',
            },
            {
              id: 2,
              sectionOrder: 2,
              title: '전쟁터에서의 첫날',
              content:
                '전쟁터에 도착한 첫날의 기억은 지금도 생생합니다. 포성과 총성이 끊이지 않았고, 동료들의 얼굴에는 긴장감이 가득했습니다. 하지만 우리는 끝까지 싸울 것을 다짐했습니다.',
            },
            {
              id: 3,
              sectionOrder: 3,
              title: '동지들과의 우정',
              content:
                '전쟁터에서 만난 동지들과의 깊은 우정은 평생 잊지 못할 소중한 추억입니다. 함께 고생하며 나눈 이야기들, 서로를 격려하며 버텨낸 시간들이 있었기에 우리는 살아남을 수 있었습니다.',
            },
          ],
          replyCount: 5,
        });
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

        {/* 도움을 준 분들 섹션 */}
        <div className='helpers-section'>
          <h2 className='section-title'>도움을 준 분들</h2>
          <div className='helpers-grid'>
            <div className='helper-card'>
              <div className='helper-image'>
                <div className='image-placeholder'>이미지</div>
              </div>
              <h3 className='helper-name'>김상담</h3>
              <p className='helper-role'>심리상담가</p>
            </div>
            <div className='helper-card'>
              <div className='helper-image'>
                <div className='image-placeholder'>이미지</div>
              </div>
              <h3 className='helper-name'>이기록</h3>
              <p className='helper-role'>기록 전문가</p>
            </div>
            <div className='helper-card'>
              <div className='helper-image'>
                <div className='image-placeholder'>이미지</div>
              </div>
              <h3 className='helper-name'>박편집</h3>
              <p className='helper-role'>편집자</p>
            </div>
          </div>
        </div>

        {/* 댓글 섹션 */}
        <div className='comments-section'>
          <h2 className='section-title'>댓글 ({memoir.replyCount}개)</h2>

          {/* 기존 댓글들 */}
          <div className='comments-list'>
            <div className='comment'>
              <div className='comment-avatar'>
                <div className='avatar-placeholder'>로고</div>
              </div>
              <div className='comment-content'>
                <h4 className='comment-title'>감동적인 이야기입니다</h4>
                <p className='comment-meta'>김독자 | 2025.08.30</p>
                <p className='comment-text'>
                  영웅님의 이야기를 읽으며 많은 감동을 받았습니다. 평화의
                  소중함을 다시 한번 깨닫게 되었습니다.
                </p>
              </div>
            </div>

            <div className='comment'>
              <div className='comment-avatar'>
                <div className='avatar-placeholder'>로고</div>
              </div>
              <div className='comment-content'>
                <h4 className='comment-title'>고맙습니다</h4>
                <p className='comment-meta'>이감사 | 2025.08.29</p>
                <p className='comment-text'>
                  우리나라를 위해 희생해주신 모든 분들께 감사드립니다.
                  후세들에게 이런 이야기들이 전해져야 합니다.
                </p>
              </div>
            </div>
          </div>

          {/* 댓글 입력 */}
          <div className='comment-form'>
            <textarea
              placeholder='댓글을 입력해주세요.'
              className='comment-input'
            />
            <button className='comment-submit'>댓글 등록하기</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WarMemoirDetail;
