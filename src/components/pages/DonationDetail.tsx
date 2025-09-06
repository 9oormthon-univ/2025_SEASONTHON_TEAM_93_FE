import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DonationModal } from '../common';
import '../../styles/pages/DonationDetail.css';

interface DonationDetailData {
  id: number;
  title: string;
  description: string;
  detailContent: string;
  author: {
    name: string;
    profileImage?: string;
  };
  period: string;
  websiteUrl: string;
  images: string[];
  socialLinks: {
    facebook?: string;
    twitter?: string;
    pinterest?: string;
    email?: string;
  };
}

const DonationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [donationData, setDonationData] = useState<DonationDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDonationModal, setShowDonationModal] = useState(false);

  useEffect(() => {
    // 실제로는 API에서 데이터를 가져올 예정
    const fetchDonationDetail = async () => {
      setLoading(true);
      
      // 임시 데이터 (나중에 API 호출로 대체)
      const mockData: DonationDetailData = {
        id: parseInt(id || '1'),
        title: "제목 (후원하기)",
        description: "(재)혹 들어갈 곳)first title - 상세 설명",
        detailContent: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. and more recently with desktop publishing
software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is.`,
        author: {
          name: "예윤",
          profileImage: undefined
        },
        period: "2023.06.30 ~ 2024.06.30",
        websiteUrl: "www.000000.00.000/000000",
        images: [], // 이미지들은 나중에 실제 URL로 대체
        socialLinks: {
          facebook: "https://facebook.com/example",
          twitter: "https://twitter.com/example",
          pinterest: "https://pinterest.com/example",
          email: "mailto:example@email.com"
        }
      };

      // 실제 API 호출 시뮬레이션
      setTimeout(() => {
        setDonationData(mockData);
        setLoading(false);
      }, 500);
    };

    fetchDonationDetail();
  }, [id]);

  const handleBackClick = () => {
    navigate('/donation');
  };

  const handleDonateClick = () => {
    setShowDonationModal(true);
  };

  const handleCloseModal = () => {
    setShowDonationModal(false);
  };

  const handleSocialShare = (platform: string) => {
    const currentUrl = window.location.href;
    const title = donationData?.title || '';
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'pinterest':
        window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl)}&description=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${title}\n${currentUrl}`)}`;
        break;
    }
  };

  if (loading) {
    return (
      <div className="donation-detail-loading">
        <div className="loading-spinner">로딩 중...</div>
      </div>
    );
  }

  if (!donationData) {
    return (
      <div className="donation-detail-error">
        <h2>후원 정보를 찾을 수 없습니다.</h2>
        <button onClick={handleBackClick} className="back-button">
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <main className="donation-detail-page">
      <div className="donation-detail-container">
        {/* 뒤로가기 버튼 */}
        <div className="detail-header">
          <button onClick={handleBackClick} className="back-button">
            ← 목록으로
          </button>
        </div>

        {/* 제목 */}
        <h1 className="detail-title">{donationData.title}</h1>

        {/* 이미지 갤러리 */}
        <div className="image-gallery">
          <div className="main-image">
            {/* 메인 이미지 - 실제로는 donationData.images[0] 사용 */}
            <div className="image-placeholder main-placeholder">
              메인 이미지
            </div>
          </div>
          <div className="sub-images">
            <div className="image-placeholder sub-placeholder">
              서브 이미지 1
            </div>
            <div className="image-placeholder sub-placeholder">
              서브 이미지 2
            </div>
          </div>
        </div>

        {/* 소셜 공유 버튼들 */}
        <div className="social-share">
          <button 
            className="social-btn facebook-btn"
            onClick={() => handleSocialShare('facebook')}
          >
            facebook
          </button>
          <button 
            className="social-btn twitter-btn"
            onClick={() => handleSocialShare('twitter')}
          >
            Tweet
          </button>
          <button 
            className="social-btn pinterest-btn"
            onClick={() => handleSocialShare('pinterest')}
          >
            Pin
          </button>
          <button 
            className="social-btn email-btn"
            onClick={() => handleSocialShare('email')}
          >
            Email
          </button>
        </div>

        {/* 상세 내용 */}
        <div className="detail-content">
          <div className="content-text">
            {donationData.detailContent.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          <div className="content-sidebar">
            <div className="sidebar-image-placeholder">
              사이드바 이미지
            </div>
          </div>
        </div>

        {/* 후원하기 버튼 */}
        <div className="donate-action">
          <button 
            className="donate-main-button"
            onClick={handleDonateClick}
          >
            후원하기
          </button>
        </div>

        {/* 추가 정보 */}
        <div className="additional-info">
          <div className="info-item">
            <span className="info-label">후원 기간:</span>
            <span className="info-value">{donationData.period}</span>
          </div>
          <div className="info-item">
            <span className="info-label">후원 사이트:</span>
            <span className="info-value">{donationData.websiteUrl}</span>
          </div>
          <div className="info-item">
            <span className="info-label">담당자:</span>
            <span className="info-value">{donationData.author.name}</span>
          </div>
        </div>

        {/* 후원 모달 */}
        <DonationModal
          isOpen={showDonationModal}
          onClose={handleCloseModal}
          donationData={donationData ? {
            id: donationData.id,
            title: donationData.title,
            currentAmount: 63370000,
            targetAmount: 80000000,
            authorName: donationData.author.name
          } : undefined}
        />
      </div>
    </main>
  );
};

export default DonationDetail;
