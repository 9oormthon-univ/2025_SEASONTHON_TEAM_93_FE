import './WarMemoirDetail.css';
import { useParams, useNavigate } from 'react-router-dom';

// 샘플 데이터 (WarMemoir와 동일)
const sampleMemoirs = [
  {
    id: 1,
    title: '6.25 전쟁의 기억',
    date: '2025.08.30',
    description:
      '1950년 6월 25일, 북한의 남침으로 시작된 전쟁의 첫날을 기억합니다. 당시 나는 20세의 젊은 병사였고, 갑작스러운 전쟁 소식에 충격을 받았습니다.',
    content: `
      <h3>소제목: 목차1</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <h3>소제목: 목차2</h3>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <h3>소제목: 목차3</h3>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
    `,
  },
  {
    id: 2,
    title: '인천상륙작전의 감동',
    date: '2025.08.29',
    description:
      '맥아더 장군의 인천상륙작전이 성공했을 때의 감동을 잊을 수 없습니다. 전세가 역전되는 순간을 목격했습니다.',
    content: `
      <h3>소제목: 목차1</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <h3>소제목: 목차2</h3>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <h3>소제목: 목차3</h3>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
    `,
  },
  {
    id: 3,
    title: '동지들과의 우정',
    date: '2025.08.28',
    description:
      '전쟁터에서 만난 동지들과의 깊은 우정은 평생 잊지 못할 소중한 추억입니다. 함께 고생하며 나눈 이야기들...',
    content: `
      <h3>소제목: 목차1</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <h3>소제목: 목차2</h3>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <h3>소제목: 목차3</h3>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
    `,
  },
  {
    id: 4,
    title: '겨울의 추위',
    date: '2025.08.27',
    description:
      '1950년 겨울의 혹독한 추위는 지금도 생생합니다. 얼어붙은 손발로도 끝까지 싸웠던 그날들을 기억합니다.',
    content: `
      <h3>소제목: 목차1</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <h3>소제목: 목차2</h3>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <h3>소제목: 목차3</h3>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
    `,
  },
  {
    id: 5,
    title: '고향에 대한 그리움',
    date: '2025.08.26',
    description:
      '전쟁터에서 고향을 그리워하며 쓴 편지들. 가족들의 안부를 묻는 마음은 전쟁의 공포보다 더 컸습니다.',
    content: `
      <h3>소제목: 목차1</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <h3>소제목: 목차2</h3>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <h3>소제목: 목차3</h3>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
    `,
  },
  {
    id: 6,
    title: '평화의 소중함',
    date: '2025.08.25',
    description:
      '전쟁을 경험한 후에야 알게 된 평화의 소중함. 후세들에게는 절대 이런 일이 일어나지 않기를 바랍니다.',
    content: `
      <h3>소제목: 목차1</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <h3>소제목: 목차2</h3>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <h3>소제목: 목차3</h3>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
    `,
  },
  {
    id: 7,
    title: '휴전협정의 날',
    date: '2025.08.24',
    description:
      '1953년 7월 27일, 휴전협정이 체결된 그날의 감정은 복잡했습니다. 기쁨과 아쉬움이 교차했습니다.',
    content: `
      <h3>소제목: 목차1</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <h3>소제목: 목차2</h3>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <h3>소제목: 목차3</h3>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
    `,
  },
  {
    id: 8,
    title: '귀향길',
    date: '2025.08.23',
    description:
      '전쟁이 끝나고 고향으로 돌아가는 길. 3년 만에 만나는 가족들의 모습은 잊을 수 없습니다.',
    content: `
      <h3>소제목: 목차1</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <h3>소제목: 목차2</h3>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <h3>소제목: 목차3</h3>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
    `,
  },
  {
    id: 9,
    title: '전우들의 명복을 빌며',
    date: '2025.08.22',
    description:
      '전쟁에서 목숨을 잃은 전우들을 기리며. 그들의 희생이 헛되지 않도록 살아남은 우리의 사명을 느낍니다.',
    content: `
      <h3>소제목: 목차1</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <h3>소제목: 목차2</h3>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <h3>소제목: 목차3</h3>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
    `,
  },
  {
    id: 10,
    title: '전쟁의 교훈',
    date: '2025.08.21',
    description:
      '6.25 전쟁을 통해 배운 교훈들. 자유와 평화의 소중함, 그리고 나라를 지키는 것의 의미를 깨달았습니다.',
    content: `
      <h3>소제목: 목차1</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <h3>소제목: 목차2</h3>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <h3>소제목: 목차3</h3>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
    `,
  },
  {
    id: 11,
    title: '후세를 위한 기록',
    date: '2025.08.20',
    description:
      '이런 전쟁이 다시는 일어나지 않기를 바라며, 후세들에게 전해주고 싶은 이야기들을 기록합니다.',
    content: `
      <h3>소제목: 목차1</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <h3>소제목: 목차2</h3>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <h3>소제목: 목차3</h3>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
    `,
  },
  {
    id: 12,
    title: '영웅들의 이야기',
    date: '2025.08.19',
    description:
      '전쟁터에서 목숨을 바쳐 싸운 영웅들의 이야기. 그들의 용기와 희생정신을 기억하고 싶습니다.',
    content: `
      <h3>소제목: 목차1</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <h3>소제목: 목차2</h3>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <h3>소제목: 목차3</h3>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
    `,
  },
];

const WarMemoirDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const memoir = sampleMemoirs.find(m => m.id === parseInt(id || '1'));

  if (!memoir) {
    return (
      <main className='war-memoir-detail'>
        <div className='content-container'>
          <div className='error-message'>
            <h2>찾을 수 없는 회고록입니다.</h2>
            <button onClick={() => navigate('/')} className='back-button'>
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
          <button onClick={() => navigate('/')} className='back-button'>
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
          <p className='detail-date'>발간일: {memoir.date}</p>
        </div>

        {/* 메인 이미지 */}
        <div className='detail-image'>
          <div className='image-placeholder'>이미지</div>
        </div>

        {/* 본문 내용 */}
        <div
          className='detail-content'
          dangerouslySetInnerHTML={{ __html: memoir.content }}
        />

        {/* 도움을 준 분들 섹션 */}
        <div className='helpers-section'>
          <h2 className='section-title'>도움을 준 분들</h2>
          <div className='helpers-grid'>
            <div className='helper-card'>
              <div className='helper-image'>
                <div className='image-placeholder'>이미지</div>
              </div>
              <h3 className='helper-name'>이름</h3>
              <p className='helper-role'>심리상담가</p>
            </div>
            <div className='helper-card'>
              <div className='helper-image'>
                <div className='image-placeholder'>이미지</div>
              </div>
              <h3 className='helper-name'>이름</h3>
              <p className='helper-role'>심리상담가</p>
            </div>
            <div className='helper-card'>
              <div className='helper-image'>
                <div className='image-placeholder'>이미지</div>
              </div>
              <h3 className='helper-name'>이름</h3>
              <p className='helper-role'>심리상담가</p>
            </div>
          </div>
        </div>

        {/* 댓글 섹션 */}
        <div className='comments-section'>
          <h2 className='section-title'>댓글</h2>

          {/* 기존 댓글들 */}
          <div className='comments-list'>
            <div className='comment'>
              <div className='comment-avatar'>
                <div className='avatar-placeholder'>로고</div>
              </div>
              <div className='comment-content'>
                <h4 className='comment-title'>댓글 제목</h4>
                <p className='comment-meta'>작성자 이름 | 작성날짜</p>
                <p className='comment-text'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>

            <div className='comment'>
              <div className='comment-avatar'>
                <div className='avatar-placeholder'>로고</div>
              </div>
              <div className='comment-content'>
                <h4 className='comment-title'>댓글 제목</h4>
                <p className='comment-meta'>작성자 이름 | 작성날짜</p>
                <p className='comment-text'>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
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
