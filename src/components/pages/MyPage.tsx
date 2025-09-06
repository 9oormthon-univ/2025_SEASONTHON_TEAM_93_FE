import '../../styles/pages/MyPage.css';
import { useState } from 'react';

const MyPage = () => {
  const [activeSection, setActiveSection] = useState('작성 댓글');

  // 댓글 샘플 데이터
  const comments = [
    {
      id: 1,
      title: '감동적인 회고록이네요',
      author: '김민수',
      date: '2024년 12월 15일',
      status: 'pending',
      content: '어르신의 용기 있는 이야기에 깊은 감동을 받았습니다. 감사합니다.',
      memoirTitle: '1951년 겨울, 춘천에서의 기억',
    },
    {
      id: 2,
      title: '존경스럽습니다',
      author: '김민수',
      date: '2024년 12월 10일',
      status: 'delivered',
      deliveryDate: '2024.12.12',
      content: '나라를 지켜주신 덕분에 지금의 평화가 있다고 생각합니다.',
      memoirTitle: '부산 피난길에서 만난 사람들',
    },
    {
      id: 3,
      title: '평화의 소중함을 느꼈습니다',
      author: '김민수',
      date: '2024년 12월 5일',
      status: 'delivered',
      deliveryDate: '2024.12.07',
      content: '전쟁의 참혹함과 동시에 평화의 소중함을 다시 한번 깨달았습니다.',
      memoirTitle: '백마고지에서 보낸 100일',
    },
    {
      id: 4,
      title: '후세에게 전하고 싶은 이야기',
      author: '김민수',
      date: '2024년 11월 28일',
      status: 'delivered',
      deliveryDate: '2024.11.30',
      content: '이런 역사가 다시는 반복되지 않기를 바라며 댓글을 남깁니다.',
      memoirTitle: '서울 수복 작전의 기억',
    },
    {
      id: 5,
      title: '마음이 아픕니다',
      author: '김민수',
      date: '2024년 11월 20일',
      status: 'delivered',
      deliveryDate: '2024.11.22',
      content: '그 힘든 시절을 버텨내신 모든 분들께 진심으로 감사드립니다.',
      memoirTitle: '흥남 철수 작전과 피난민들',
    },
  ];

  // 편지 샘플 데이터
  const letters = [
    {
      id: 1,
      title: '감사의 마음을 담아',
      author: '김민수',
      date: '2024년 12월 15일',
      status: 'pending',
      content: '어르신께서 나라를 위해 희생하신 덕분에 지금의 평화가 있다고 생각합니다. 진심으로 감사드립니다.',
      veteranName: '박영수 어르신',
      memoirTitle: '1951년 겨울, 춘천에서의 기억',
    },
    {
      id: 2,
      title: '존경과 감사를 전합니다',
      author: '김민수',
      date: '2024년 12월 8일',
      status: 'delivered',
      deliveryDate: '2024.12.10',
      content: '어르신의 희생정신과 용기에 깊은 감동을 받았습니다. 건강하시길 바랍니다.',
      veteranName: '이철호 어르신',
      memoirTitle: '부산 피난길에서 만난 사람들',
    },
    {
      id: 3,
      title: '평화를 지켜주셔서 고맙습니다',
      author: '김민수',
      date: '2024년 11월 25일',
      status: 'delivered',
      deliveryDate: '2024.11.28',
      content: '전쟁의 아픔을 겪으시면서도 조국을 지켜주신 모든 분들께 감사드립니다.',
      veteranName: '최동진 어르신',
      memoirTitle: '백마고지에서 보낸 100일',
    },
  ];

  // 후원 현황 샘플 데이터
  const sponsorships = [
    {
      id: 1,
      title: '6.25 참전용사 의료지원 프로젝트',
      organization: '대한민국재향군인회',
      amount: '50,000원',
      date: '2024년 12월 15일',
      status: 'in_progress',
      description: '참전용사 어르신들의 의료비 지원을 위한 후원',
      progress: '79%',
    },
    {
      id: 2,
      title: '전쟁기념관 보존 및 교육 사업',
      organization: '전쟁기념사업회',
      amount: '30,000원',
      date: '2024년 11월 20일',
      status: 'completed',
      reviewDate: '2024.12.01',
      description: '평화교육 프로그램 운영 및 유물 보존 사업',
      progress: '100%',
    },
    {
      id: 3,
      title: '참전용사 생활지원 및 복지사업',
      organization: '국가보훈처',
      amount: '100,000원',
      date: '2024년 10월 15일',
      status: 'completed',
      reviewDate: '2024.11.30',
      description: '경제적 어려움을 겪는 참전용사 가정 지원',
      progress: '100%',
    },
    {
      id: 4,
      title: '참전용사 심리상담 및 치료지원',
      organization: '국립정신건강센터',
      amount: '25,000원',
      date: '2024년 9월 5일',
      status: 'completed',
      reviewDate: '2024.10.15',
      description: 'PTSD 치료 및 정신건강 회복 프로그램',
      progress: '100%',
    },
  ];

  const navigationItems = [
    '작성 댓글',
    '작성 편지',
    '후원 현황',
    '정보 수정',
    '문의하기',
    '증명서 발급',
  ];

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  // 댓글 렌더링 컴포넌트
  const renderComments = () => (
    <div className='content-list'>
      {comments.map(comment => (
        <div key={comment.id} className='content-item'>
          <div className='item-header'>
            <h3 className='item-title'>{comment.title}</h3>
            <div className='item-meta'>
              <span className='author'>{comment.author}</span>
              <span className='date'>{comment.date}</span>
            </div>
          </div>

          <div className='item-actions'>
            {comment.status === 'pending' ? (
              <div className='action-buttons'>
                <button className='btn-modify'>수정하기</button>
                <button className='btn-delete'>삭제하기</button>
              </div>
            ) : (
              <div className='delivery-status'>
                {comment.deliveryDate} 전달 완료
              </div>
            )}
          </div>

          <div className='read-more'>
            <a href='#' className='read-more-link'>
              Read more
              <svg
                className='arrow-icon'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M6 9l6 6 6-6' />
              </svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  );

  // 편지 렌더링 컴포넌트
  const renderLetters = () => (
    <div className='content-list'>
      {letters.map(letter => (
        <div key={letter.id} className='content-item'>
          <div className='item-header'>
            <h3 className='item-title'>{letter.title}</h3>
            <div className='item-meta'>
              <span className='author'>{letter.author}</span>
              <span className='date'>{letter.date}</span>
            </div>
          </div>

          <div className='item-actions'>
            {letter.status === 'pending' ? (
              <div className='action-buttons'>
                <button className='btn-modify'>수정하기</button>
                <button className='btn-delete'>삭제하기</button>
              </div>
            ) : (
              <div className='delivery-status'>
                {letter.deliveryDate} 전달 완료
              </div>
            )}
          </div>

          <div className='read-more'>
            <a href='#' className='read-more-link'>
              Read more
              <svg
                className='arrow-icon'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M6 9l6 6 6-6' />
              </svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  );

  // 후원 현황 렌더링 컴포넌트
  const renderSponsorships = () => (
    <div className='content-list'>
      {sponsorships.map(sponsorship => (
        <div key={sponsorship.id} className='content-item'>
          <div className='item-header'>
            <h3 className='item-title'>{sponsorship.title}</h3>
            <div className='item-meta'>
              <span className='author'>{sponsorship.author}</span>
              <span className='date'>{sponsorship.date}</span>
            </div>
          </div>

          <div className='item-actions'>
            {sponsorship.status === 'in_progress' ? (
              <div className='sponsorship-status'>후원 진행 중</div>
            ) : (
              <div className='sponsorship-buttons'>
                <button className='btn-review'>후원 후기 보러가기</button>
                <button className='btn-certificate'>증명서 발급</button>
              </div>
            )}
          </div>

          <div className='read-more'>
            <a href='#' className='read-more-link'>
              Read more
              <svg
                className='arrow-icon'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M6 9l6 6 6-6' />
              </svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  );

  // 정보 수정 렌더링 컴포넌트
  const renderProfileEdit = () => (
    <div className='profile-edit'>
      <h2>정보 수정</h2>
      <form className='profile-form'>
        <div className='form-group'>
          <label htmlFor='name'>이름</label>
          <input type='text' id='name' defaultValue='홍길동' />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>이메일</label>
          <input type='email' id='email' defaultValue='hong@example.com' />
        </div>
        <div className='form-group'>
          <label htmlFor='phone'>전화번호</label>
          <input type='tel' id='phone' defaultValue='010-1234-5678' />
        </div>
        <div className='form-group'>
          <label htmlFor='address'>주소</label>
          <input type='text' id='address' defaultValue='서울시 강남구' />
        </div>
        <button type='submit' className='btn-save'>
          저장하기
        </button>
      </form>
    </div>
  );

  // 문의하기 렌더링 컴포넌트
  const renderInquiry = () => (
    <div className='inquiry'>
      <h2>문의하기</h2>
      <form className='inquiry-form'>
        <div className='form-group'>
          <label htmlFor='inquiry-title'>제목</label>
          <input
            type='text'
            id='inquiry-title'
            placeholder='문의 제목을 입력해주세요'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='inquiry-content'>내용</label>
          <textarea
            id='inquiry-content'
            rows={8}
            placeholder='문의 내용을 입력해주세요'
          ></textarea>
        </div>
        <button type='submit' className='btn-submit'>
          문의하기
        </button>
      </form>
    </div>
  );

  // 증명서 발급 렌더링 컴포넌트
  const renderCertificate = () => (
    <div className='certificate'>
      <h2>증명서 발급</h2>
      <div className='certificate-list'>
        <div className='certificate-item'>
          <h3>후원 증명서</h3>
          <p>후원 내역을 확인할 수 있는 증명서입니다.</p>
          <button className='btn-download'>다운로드</button>
        </div>
        <div className='certificate-item'>
          <h3>봉사 증명서</h3>
          <p>봉사 활동 내역을 확인할 수 있는 증명서입니다.</p>
          <button className='btn-download'>다운로드</button>
        </div>
      </div>
    </div>
  );

  // 현재 섹션에 따른 콘텐츠 렌더링
  const renderContent = () => {
    switch (activeSection) {
      case '작성 댓글':
        return renderComments();
      case '작성 편지':
        return renderLetters();
      case '후원 현황':
        return renderSponsorships();
      case '정보 수정':
        return renderProfileEdit();
      case '문의하기':
        return renderInquiry();
      case '증명서 발급':
        return renderCertificate();
      default:
        return renderComments();
    }
  };

  return (
    <main className='my-page'>
      <div className='content-container'>
        <div className='main-content'>{renderContent()}</div>

        <div className='sidebar'>
          <nav className='sidebar-nav'>
            {navigationItems.map(item => (
              <div
                key={item}
                className={`nav-item ${activeSection === item ? 'active' : ''}`}
                onClick={() => handleSectionChange(item)}
              >
                {item}
              </div>
            ))}
          </nav>
          <div className='user-profile'>
            <div className='profile-avatar'>J</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyPage;
