import './MyPage.css';
import { useState } from 'react';

const MyPage = () => {
  const [activeSection, setActiveSection] = useState('작성 댓글');

  // 댓글 샘플 데이터
  const comments = [
    {
      id: 1,
      title: '댓글 title',
      author: '작성자',
      date: 'January 11, 2024',
      status: 'pending',
    },
    {
      id: 2,
      title: '댓글 title',
      author: '작성자',
      date: 'January 11, 2024',
      status: 'delivered',
      deliveryDate: '2025.08.30',
    },
    {
      id: 3,
      title: '댓글 title',
      author: '작성자',
      date: 'January 11, 2024',
      status: 'delivered',
      deliveryDate: '2025.08.30',
    },
    {
      id: 4,
      title: '댓글 title',
      author: '작성자',
      date: 'January 11, 2024',
      status: 'delivered',
      deliveryDate: '2025.08.30',
    },
  ];

  // 편지 샘플 데이터
  const letters = [
    {
      id: 1,
      title: '편지 title',
      author: '작성자',
      date: 'January 11, 2024',
      status: 'pending',
    },
    {
      id: 2,
      title: '편지 title',
      author: '작성자',
      date: 'January 11, 2024',
      status: 'delivered',
      deliveryDate: '2025.08.30',
    },
  ];

  // 후원 현황 샘플 데이터
  const sponsorships = [
    {
      id: 1,
      title: '000 참전용사',
      author: '작성자',
      date: 'January 11, 2024',
      status: 'in_progress',
    },
    {
      id: 2,
      title: '000 참전용사',
      author: '작성자',
      date: 'January 11, 2024',
      status: 'completed',
      reviewDate: '2025.08.30',
    },
    {
      id: 3,
      title: '000 참전용사',
      author: '작성자',
      date: 'January 11, 2024',
      status: 'completed',
      reviewDate: '2025.08.30',
    },
    {
      id: 4,
      title: '000 참전용사',
      author: '작성자',
      date: 'January 11, 2024',
      status: 'completed',
      reviewDate: '2025.08.30',
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
