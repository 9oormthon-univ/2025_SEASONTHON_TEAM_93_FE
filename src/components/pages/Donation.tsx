import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DonationModal } from '../common';
import '../../styles/pages/Donation.css';

interface DonationItem {
  id: number;
  title: string;
  description: string;
  author: {
    name: string;
    profileImage?: string;
  };
  period: string;
  websiteUrl: string;
  imageUrl?: string;
}

const Donation = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'donate' | 'status'>('donate');
  const itemsPerPage = 6; // 2열 x 3행

  // 모달 상태
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<DonationItem | null>(
    null
  );

  // 임시 후원 데이터 (나중에 API로 대체)
  const donationItems: DonationItem[] = [
    {
      id: 1,
      title: '6.25 참전용사 의료지원 프로젝트',
      description:
        '고령의 참전용사들을 위한 전문 의료진 파견 및 의료비 지원 사업입니다. 어르신들의 건강한 노후를 위해 정기 건강검진과 치료비를 지원합니다.',
      author: {
        name: '대한민국재향군인회',
        profileImage: undefined,
      },
      period: '2024.01.01 ~ 2024.12.31',
      websiteUrl: 'www.koreanveterans.or.kr',
    },
    {
      id: 2,
      title: '전쟁기념관 보존 및 교육 사업',
      description:
        '후세에게 평화의 소중함을 전하기 위한 전쟁기념관 유물 보존과 청소년 평화교육 프로그램을 운영합니다. 역사를 잊지 않는 평화교육에 동참해주세요.',
      author: {
        name: '전쟁기념사업회',
        profileImage: undefined,
      },
      period: '2024.03.01 ~ 2025.02.28',
      websiteUrl: 'www.warmemorial.or.kr',
    },
    {
      id: 3,
      title: '참전용사 생활지원 및 복지사업',
      description:
        '경제적 어려움을 겪고 계시는 참전용사 가정에 생활비, 주거비, 의료비 등을 지원하여 어르신들의 안정된 생활을 돕는 복지사업입니다.',
      author: {
        name: '국가보훈처',
        profileImage: undefined,
      },
      period: '2024.01.01 ~ 2024.12.31',
      websiteUrl: 'www.mpva.go.kr',
    },
    {
      id: 4,
      title: '참전용사 구술사 기록 프로젝트',
      description:
        '전쟁의 생생한 증언을 후세에 전하기 위해 참전용사 어르신들의 경험담을 기록하고 보존하는 역사 기록 프로젝트입니다.',
      author: {
        name: '한국전쟁사연구소',
        profileImage: undefined,
      },
      period: '2024.06.01 ~ 2025.05.31',
      websiteUrl: 'www.koreanwar.or.kr',
    },
    {
      id: 5,
      title: '참전용사 가족 지원 프로그램',
      description:
        '참전용사 자녀 및 손자녀를 위한 장학금 지원과 가족 상담 서비스를 제공하여 참전용사 가정의 복지 향상을 도모합니다.',
      author: {
        name: '참전용사복지재단',
        profileImage: undefined,
      },
      period: '2024.02.01 ~ 2024.12.31',
      websiteUrl: 'www.veteranswelfare.or.kr',
    },
    {
      id: 6,
      title: '평화통일 교육 및 홍보사업',
      description:
        '분단의 아픔을 치유하고 평화통일에 대한 국민적 공감대 형성을 위한 교육 프로그램과 홍보 활동을 전개합니다.',
      author: {
        name: '통일교육원',
        profileImage: undefined,
      },
      period: '2024.01.01 ~ 2024.12.31',
      websiteUrl: 'www.uniedu.go.kr',
    },
    {
      id: 7,
      title: '참전용사 추모사업 및 기념시설 건립',
      description:
        '조국을 위해 희생하신 참전용사들을 기리는 추모비 건립과 기념관 운영을 통해 그분들의 희생정신을 기억하고 감사를 표합니다.',
      author: {
        name: '호국보훈가족회',
        profileImage: undefined,
      },
      period: '2024.05.01 ~ 2025.04.30',
      websiteUrl: 'www.patrioticfamily.or.kr',
    },
    {
      id: 8,
      title: '참전용사 심리상담 및 치료지원',
      description:
        '전쟁 트라우마로 고통받는 참전용사들을 위한 전문 심리상담과 PTSD 치료 프로그램을 제공하여 정신건강 회복을 지원합니다.',
      author: {
        name: '국립정신건강센터',
        profileImage: undefined,
      },
      period: '2024.04.01 ~ 2025.03.31',
      websiteUrl: 'www.ncmh.go.kr',
    },
  ];

  // 후원한 단체 현황 데이터
  const donatedItems: DonationItem[] = [
    {
      id: 101,
      title: '6.25 참전용사 의료지원 프로젝트',
      description:
        '총 후원금액: 5,240만원 | 지원받은 참전용사: 143명 | 의료비 지원률: 98% 달성하여 성공적으로 마감되었습니다.',
      author: {
        name: '대한민국재향군인회',
        profileImage: undefined,
      },
      period: '2023.01.01 ~ 2023.12.31 (완료)',
      websiteUrl: 'www.koreanveterans.or.kr',
    },
    {
      id: 102,
      title: '참전용사 생활지원 및 복지사업',
      description:
        '총 후원금액: 3,800만원 | 지원가정: 89가정 | 월평균 지원액: 42만원으로 어르신들의 안정된 생활에 큰 도움이 되었습니다.',
      author: {
        name: '국가보훈처',
        profileImage: undefined,
      },
      period: '2023.01.01 ~ 2023.12.31 (완료)',
      websiteUrl: 'www.mpva.go.kr',
    },
    {
      id: 103,
      title: '전쟁기념관 보존 및 교육 사업',
      description:
        '총 후원금액: 2,650만원 | 교육참여 청소년: 2,847명 | 유물보존: 67점으로 평화교육 확산에 기여했습니다.',
      author: {
        name: '전쟁기념사업회',
        profileImage: undefined,
      },
      period: '2023.03.01 ~ 2024.02.28 (완료)',
      websiteUrl: 'www.warmemorial.or.kr',
    },
    {
      id: 104,
      title: '참전용사 추모사업 및 기념시설 건립',
      description:
        '총 후원금액: 8,920만원 | 건립된 추모비: 3개소 | 참여 유족: 456명으로 뜻깊은 추모공간을 조성했습니다.',
      author: {
        name: '호국보훈가족회',
        profileImage: undefined,
      },
      period: '2022.05.01 ~ 2023.04.30 (완료)',
      websiteUrl: 'www.patrioticfamily.or.kr',
    },
    {
      id: 105,
      title: '참전용사 가족 지원 프로그램',
      description:
        '총 후원금액: 4,320만원 | 장학생: 67명 | 가족상담: 234회 진행하여 참전용사 가정의 복지 향상에 기여했습니다.',
      author: {
        name: '참전용사복지재단',
        profileImage: undefined,
      },
      period: '2023.02.01 ~ 2023.12.31 (완료)',
      websiteUrl: 'www.veteranswelfare.or.kr',
    },
  ];

  // 현재 활성 탭에 따라 데이터 선택
  const allItems = activeTab === 'donate' ? donationItems : donatedItems;
  const totalPages = Math.ceil(allItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = allItems.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTabChange = (tab: 'donate' | 'status') => {
    setActiveTab(tab);
    setCurrentPage(1); // 탭 변경 시 첫 페이지로 리셋
  };

  const handleCardClick = (item: DonationItem) => {
    // 카드 클릭 시 상세 페이지로 이동
    navigate(`/donation/${item.id}`);
  };

  const handleDonateClick = (item: DonationItem, e: React.MouseEvent) => {
    // 이벤트 버블링 방지 (카드 클릭과 중복 방지)
    e.stopPropagation();

    if (activeTab === 'donate') {
      // 후원하기 탭에서는 모달 열기
      setSelectedDonation(item);
      setShowDonationModal(true);
    } else {
      // 후원한 단체 현황에서는 상세 페이지로 이동
      navigate(`/donation/${item.id}`);
    }
  };

  const handleCloseModal = () => {
    setShowDonationModal(false);
    setSelectedDonation(null);
  };

  const renderPaginationButtons = () => {
    if (totalPages <= 1) return null;

    const buttons = [];

    // 이전 버튼
    if (currentPage > 1) {
      buttons.push(
        <button
          key='prev'
          onClick={() => handlePageChange(currentPage - 1)}
          className='pagination-btn prev-btn'
        >
          &lt;
        </button>
      );
    }

    // 페이지 번호 버튼들
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    // 다음 버튼
    if (currentPage < totalPages) {
      buttons.push(
        <button
          key='next'
          onClick={() => handlePageChange(currentPage + 1)}
          className='pagination-btn next-btn'
        >
          &gt;
        </button>
      );
    }

    return buttons;
  };

  return (
    <main className='donation-page'>
      <div className='donation-container'>
        <header className='donation-header'>
          <div className='header-tabs'>
            <button
              className={`tab-button ${activeTab === 'donate' ? 'active' : ''}`}
              onClick={() => handleTabChange('donate')}
            >
              후원하기
            </button>
            <button
              className={`tab-button ${activeTab === 'status' ? 'active' : ''}`}
              onClick={() => handleTabChange('status')}
            >
              후원한 단체 현황
            </button>
          </div>
        </header>

        <div className='donation-grid'>
          {currentItems.map(item => (
            <div
              key={item.id}
              className='donation-card'
              onClick={() => handleCardClick(item)}
            >
              <div className='card-image-placeholder'>
                {/* 이미지 영역 - 나중에 실제 이미지로 대체 */}
              </div>

              <div className='card-content'>
                <div className='card-header'>
                  <div className='author-info'>
                    <div className='author-avatar'>
                      {item.author.profileImage ? (
                        <img
                          src={item.author.profileImage}
                          alt={item.author.name}
                        />
                      ) : (
                        <span className='avatar-text'>{item.author.name}</span>
                      )}
                    </div>
                  </div>
                </div>

                <h3 className='card-title'>{item.title}</h3>

                <div className='card-details'>
                  <div className='period'>
                    <span className='label'>후원 기간:</span>
                    <span className='value'>{item.period}</span>
                  </div>

                  <p className='description'>{item.description}</p>

                  <div className='website-info'>
                    <span className='label'>후원 사이트:</span>
                    <span className='website-url'>{item.websiteUrl}</span>
                  </div>
                </div>

                <button
                  className='donate-button'
                  onClick={e => handleDonateClick(item, e)}
                >
                  {activeTab === 'donate' ? '후원하기' : '상세보기'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className='pagination'>{renderPaginationButtons()}</div>
        )}
      </div>

      {/* 후원 모달 */}
      <DonationModal
        isOpen={showDonationModal}
        onClose={handleCloseModal}
        donationData={
          selectedDonation
            ? {
                id: selectedDonation.id,
                title: selectedDonation.title,
                currentAmount: 63370000,
                targetAmount: 80000000,
                authorName: selectedDonation.author.name,
              }
            : undefined
        }
      />
    </main>
  );
};

export default Donation;
