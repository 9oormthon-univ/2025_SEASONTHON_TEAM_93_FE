import './WriteLetter.css';
import { useState } from 'react';

// 샘플 데이터
const veteranProjects = [
  {
    id: 1,
    title: '6.25 참전 용사 000',
    volunteers: 123,
    description: 'A redesign of the company website to modernize the look and feel and improve user experience.',
  },
  {
    id: 2,
    title: '6.25 참전 용사 001',
    volunteers: 89,
    description: 'A redesign of the company website to modernize the look and feel and improve user experience.',
  },
  {
    id: 3,
    title: '6.25 참전 용사 002',
    volunteers: 156,
    description: 'A redesign of the company website to modernize the look and feel and improve user experience.',
  },
  {
    id: 4,
    title: '6.25 참전 용사 003',
    volunteers: 234,
    description: 'A redesign of the company website to modernize the look and feel and improve user experience.',
  },
  {
    id: 5,
    title: '6.25 참전 용사 004',
    volunteers: 67,
    description: 'A redesign of the company website to modernize the look and feel and improve user experience.',
  },
  {
    id: 6,
    title: '6.25 참전 용사 005',
    volunteers: 178,
    description: 'A redesign of the company website to modernize the look and feel and improve user experience.',
  },
  {
    id: 7,
    title: '6.25 참전 용사 006',
    volunteers: 145,
    description: 'A redesign of the company website to modernize the look and feel and improve user experience.',
  },
  {
    id: 8,
    title: '6.25 참전 용사 007',
    volunteers: 201,
    description: 'A redesign of the company website to modernize the look and feel and improve user experience.',
  },
];

const WriteLetter = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 페이지당 8개 아이템 (2열 x 4행)

  // 페이지네이션 계산
  const totalPages = Math.ceil(veteranProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = veteranProjects.slice(startIndex, endIndex);

  // 페이지 변경 함수
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // 페이지네이션 버튼 생성
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    // 이전 버튼
    buttons.push(
      <button
        key="prev"
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
        key="next"
        className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span>&gt;</span>
      </button>
    );

    return buttons;
  };

  return (
    <main className='write-letter'>
      <div className='content-container'>
        <div className='projects-grid'>
          {currentProjects.map(project => (
            <div key={project.id} className='project-card'>
              <h3 className='project-title'>{project.title}</h3>
              <div className='volunteers-info'>
                <div className='volunteer-avatars'>
                  <div className='avatar'></div>
                  <div className='avatar'></div>
                  <div className='avatar'></div>
                </div>
                <span className='volunteer-count'>+{project.volunteers} Volunteers</span>
              </div>
              <p className='project-description'>{project.description}</p>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className='pagination'>
          {renderPaginationButtons()}
        </div>
      </div>
    </main>
  );
};

export default WriteLetter;
