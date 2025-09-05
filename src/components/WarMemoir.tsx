import './WarMemoir.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 샘플 데이터
const sampleMemoirs = [
  {
    id: 1,
    title: '6.25 전쟁의 기억',
    date: '2025.08.30',
    description:
      '1950년 6월 25일, 북한의 남침으로 시작된 전쟁의 첫날을 기억합니다. 당시 나는 20세의 젊은 병사였고, 갑작스러운 전쟁 소식에 충격을 받았습니다.',
  },
  {
    id: 2,
    title: '인천상륙작전의 감동',
    date: '2025.08.29',
    description:
      '맥아더 장군의 인천상륙작전이 성공했을 때의 감동을 잊을 수 없습니다. 전세가 역전되는 순간을 목격했습니다.',
  },
  {
    id: 3,
    title: '동지들과의 우정',
    date: '2025.08.28',
    description:
      '전쟁터에서 만난 동지들과의 깊은 우정은 평생 잊지 못할 소중한 추억입니다. 함께 고생하며 나눈 이야기들...',
  },
  {
    id: 4,
    title: '겨울의 추위',
    date: '2025.08.27',
    description:
      '1950년 겨울의 혹독한 추위는 지금도 생생합니다. 얼어붙은 손발로도 끝까지 싸웠던 그날들을 기억합니다.',
  },
  {
    id: 5,
    title: '고향에 대한 그리움',
    date: '2025.08.26',
    description:
      '전쟁터에서 고향을 그리워하며 쓴 편지들. 가족들의 안부를 묻는 마음은 전쟁의 공포보다 더 컸습니다.',
  },
  {
    id: 6,
    title: '평화의 소중함',
    date: '2025.08.25',
    description:
      '전쟁을 경험한 후에야 알게 된 평화의 소중함. 후세들에게는 절대 이런 일이 일어나지 않기를 바랍니다.',
  },
  {
    id: 7,
    title: '휴전협정의 날',
    date: '2025.08.24',
    description:
      '1953년 7월 27일, 휴전협정이 체결된 그날의 감정은 복잡했습니다. 기쁨과 아쉬움이 교차했습니다.',
  },
  {
    id: 8,
    title: '귀향길',
    date: '2025.08.23',
    description:
      '전쟁이 끝나고 고향으로 돌아가는 길. 3년 만에 만나는 가족들의 모습은 잊을 수 없습니다.',
  },
  {
    id: 9,
    title: '전우들의 명복을 빌며',
    date: '2025.08.22',
    description:
      '전쟁에서 목숨을 잃은 전우들을 기리며. 그들의 희생이 헛되지 않도록 살아남은 우리의 사명을 느낍니다.',
  },
  {
    id: 10,
    title: '전쟁의 교훈',
    date: '2025.08.21',
    description:
      '6.25 전쟁을 통해 배운 교훈들. 자유와 평화의 소중함, 그리고 나라를 지키는 것의 의미를 깨달았습니다.',
  },
  {
    id: 11,
    title: '후세를 위한 기록',
    date: '2025.08.20',
    description:
      '이런 전쟁이 다시는 일어나지 않기를 바라며, 후세들에게 전해주고 싶은 이야기들을 기록합니다.',
  },
  {
    id: 12,
    title: '영웅들의 이야기',
    date: '2025.08.19',
    description:
      '전쟁터에서 목숨을 바쳐 싸운 영웅들의 이야기. 그들의 용기와 희생정신을 기억하고 싶습니다.',
  },
];

const WarMemoir = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 페이지당 6개 아이템 (2열 x 3행)
  const navigate = useNavigate();

  // 페이지네이션 계산
  const totalPages = Math.ceil(sampleMemoirs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMemoirs = sampleMemoirs.slice(startIndex, endIndex);

  // 페이지 변경 함수
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // 카드 클릭 핸들러
  const handleCardClick = (memoirId: number) => {
    navigate(`/memoir/${memoirId}`);
  };

  // 페이지네이션 버튼 생성
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    // 이전 버튼
    buttons.push(
      <button
        key='prev'
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
        key='next'
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
    <main className='war-memoir'>
      <div className='content-container'>
        <div className='content-grid'>
          {currentMemoirs.map(memoir => (
            <div
              key={memoir.id}
              className='content-card'
              onClick={() => handleCardClick(memoir.id)}
            >
              <div className='card-image'>
                <div className='image-placeholder'>이미지</div>
              </div>
              <div className='card-content'>
                <h3 className='card-title'>{memoir.title}</h3>
                <p className='card-date'>발간일 : {memoir.date}</p>
                <p className='card-description'>{memoir.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className='pagination'>{renderPaginationButtons()}</div>
      </div>
    </main>
  );
};

export default WarMemoir;
