import './MyPage.css';
import { useState } from 'react';

const MyPage = () => {
  const [activeSection, setActiveSection] = useState('작성 댓글');

  // 샘플 데이터
  const comments = [
    {
      id: 1,
      title: '편지 title',
      author: '작성자',
      date: 'January 11, 2024',
      status: 'pending'
    },
    {
      id: 2,
      title: '편지 title',
      author: '작성자',
      date: 'January 11, 2024',
      status: 'delivered',
      deliveryDate: '2025.08.30'
    },
    {
      id: 3,
      title: '편지 title',
      author: '작성자',
      date: 'January 11, 2024',
      status: 'delivered',
      deliveryDate: '2025.08.30'
    },
    {
      id: 4,
      title: '편지 title',
      author: '작성자',
      date: 'January 11, 2024',
      status: 'delivered',
      deliveryDate: '2025.08.30'
    }
  ];

  const navigationItems = [
    '작성 댓글',
    '작성 편지',
    '후원 현황',
    '정보 수정',
    '문의하기',
    '증명서 발급'
  ];

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <main className='my-page'>
      <div className='content-container'>
        <div className='main-content'>
          <div className='content-list'>
            {comments.map((comment) => (
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
                    <svg className='arrow-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                      <path d='M6 9l6 6 6-6'/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='sidebar'>
          <nav className='sidebar-nav'>
            {navigationItems.map((item) => (
              <div
                key={item}
                className={`nav-item ${activeSection === item ? 'active' : ''}`}
                onClick={() => handleSectionChange(item)}
              >
                {item}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </main>
  );
};

export default MyPage;
