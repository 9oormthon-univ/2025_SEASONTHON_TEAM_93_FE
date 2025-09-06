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
  const [selectedDonation, setSelectedDonation] = useState<DonationItem | null>(null);

  // 임시 후원 데이터 (나중에 API로 대체)
  const donationItems: DonationItem[] = [
    {
      id: 1,
      title: "(재)혹 들어갈 곳)first title",
      description: "(내용이 생출 회역등) 차례에도는 화 명차하는 이끼하 경이간 어업중시 정마 생속히 설체미에는 분음 어업 ullamcorper",
      author: {
        name: "예윤",
        profileImage: undefined
      },
      period: "2023.06.30 ~ 2024.06.30",
      websiteUrl: "www.000000.00.000/000000"
    },
    {
      id: 2,
      title: "(재)혹 들어갈 곳)first title",
      description: "(내용이 생출 회역등) 차례에도는 화 명차하는 이끼하 경이간 어업중시 정마 생속히 설체미에는 분음 어업 ullamcorper",
      author: {
        name: "예윤",
        profileImage: undefined
      },
      period: "2023.06.30 ~ 2024.06.30",
      websiteUrl: "www.000000.00.000/000000"
    },
    {
      id: 3,
      title: "(재)혹 들어갈 곳)first title",
      description: "(내용이 생출 회역등) 차례에도는 화 명차하는 이끼하 경이간 어업중시 정마 생속히 설체미에는 분음 어업 ullamcorper",
      author: {
        name: "예윤",
        profileImage: undefined
      },
      period: "2023.06.30 ~ 2024.06.30",
      websiteUrl: "www.000000.00.000/000000"
    },
    {
      id: 4,
      title: "(재)혹 들어갈 곳)first title",
      description: "(내용이 생출 회역등) 차례에도는 화 명차하는 이끼하 경이간 어업중시 정마 생속히 설체미에는 분음 어업 ullamcorper",
      author: {
        name: "예윤",
        profileImage: undefined
      },
      period: "2023.06.30 ~ 2024.06.30",
      websiteUrl: "www.000000.00.000/000000"
    },
    {
      id: 5,
      title: "(재)혹 들어갈 곳)first title",
      description: "(내용이 생출 회역등) 차례에도는 화 명차하는 이끼하 경이간 어업중시 정마 생속히 설체미에는 분음 어업 ullamcorper",
      author: {
        name: "J",
        profileImage: undefined
      },
      period: "2023.06.30 ~ 2024.06.30",
      websiteUrl: "www.000000.00.000/000000"
    },
    {
      id: 6,
      title: "(재)혹 들어갈 곳)first title",
      description: "(내용이 생출 회역등) 차례에도는 화 명차하는 이끼하 경이간 어업중시 정마 생속히 설체미에는 분음 어업 ullamcorper",
      author: {
        name: "예윤",
        profileImage: undefined
      },
      period: "2023.06.30 ~ 2024.06.30",
      websiteUrl: "www.000000.00.000/000000"
    }
  ];

  // 후원한 단체 현황 데이터
  const donatedItems: DonationItem[] = [
    {
      id: 101,
      title: "(재)혹 들어갈 곳)first title",
      description: "(내용이 생출 회역등) 차례에도는 화 명차하는 이끼하 경이간 어업중시 정마 생속히 설체미에는 분음 어업 ullamcorper",
      author: {
        name: "예윤",
        profileImage: undefined
      },
      period: "2023.06.30 ~ 2024.06.30",
      websiteUrl: "www.000000.00.000/000000"
    },
    {
      id: 102,
      title: "(재)혹 들어갈 곳)first title",
      description: "(내용이 생출 회역등) 차례에도는 화 명차하는 이끼하 경이간 어업중시 정마 생속히 설체미에는 분음 어업 ullamcorper",
      author: {
        name: "예윤",
        profileImage: undefined
      },
      period: "2023.06.30 ~ 2024.06.30",
      websiteUrl: "www.000000.00.000/000000"
    },
    {
      id: 103,
      title: "(재)혹 들어갈 곳)first title",
      description: "(내용이 생출 회역등) 차례에도는 화 명차하는 이끼하 경이간 어업중시 정마 생속히 설체미에는 분음 어업 ullamcorper",
      author: {
        name: "예윤",
        profileImage: undefined
      },
      period: "2023.06.30 ~ 2024.06.30",
      websiteUrl: "www.000000.00.000/000000"
    },
    {
      id: 104,
      title: "(재)혹 들어갈 곳)first title",
      description: "(내용이 생출 회역등) 차례에도는 화 명차하는 이끼하 경이간 어업중시 정마 생속히 설체미에는 분음 어업 ullamcorper",
      author: {
        name: "J",
        profileImage: undefined
      },
      period: "2023.06.30 ~ 2024.06.30",
      websiteUrl: "www.000000.00.000/000000"
    }
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
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="pagination-btn prev-btn"
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
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="pagination-btn next-btn"
        >
          &gt;
        </button>
      );
    }

    return buttons;
  };

  return (
    <main className="donation-page">
      <div className="donation-container">
        <header className="donation-header">
          <div className="header-tabs">
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

        <div className="donation-grid">
          {currentItems.map((item) => (
            <div 
              key={item.id} 
              className="donation-card"
              onClick={() => handleCardClick(item)}
            >
              <div className="card-image-placeholder">
                {/* 이미지 영역 - 나중에 실제 이미지로 대체 */}
              </div>
              
              <div className="card-content">
                <div className="card-header">
                  <div className="author-info">
                    <div className="author-avatar">
                      {item.author.profileImage ? (
                        <img src={item.author.profileImage} alt={item.author.name} />
                      ) : (
                        <span className="avatar-text">{item.author.name}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <h3 className="card-title">{item.title}</h3>
                
                <div className="card-details">
                  <div className="period">
                    <span className="label">후원 기간:</span>
                    <span className="value">{item.period}</span>
                  </div>
                  
                  <p className="description">{item.description}</p>
                  
                  <div className="website-info">
                    <span className="label">후원 사이트:</span>
                    <span className="website-url">{item.websiteUrl}</span>
                  </div>
                </div>
                
                <button 
                  className="donate-button"
                  onClick={(e) => handleDonateClick(item, e)}
                >
                  {activeTab === 'donate' ? '후원하기' : '상세보기'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="pagination">
            {renderPaginationButtons()}
          </div>
        )}
      </div>

      {/* 후원 모달 */}
      <DonationModal
        isOpen={showDonationModal}
        onClose={handleCloseModal}
        donationData={selectedDonation ? {
          id: selectedDonation.id,
          title: selectedDonation.title,
          currentAmount: 63370000,
          targetAmount: 80000000,
          authorName: selectedDonation.author.name
        } : undefined}
      />
    </main>
  );
};

export default Donation;