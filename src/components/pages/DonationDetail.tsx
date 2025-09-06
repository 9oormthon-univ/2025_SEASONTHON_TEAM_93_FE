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
  const [donationData, setDonationData] = useState<DonationDetailData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [showDonationModal, setShowDonationModal] = useState(false);

  useEffect(() => {
    // 후원 프로젝트 상세 정보 가져오기
    const fetchDonationDetail = async () => {
      setLoading(true);

      // 샘플 데이터
      const donationId = parseInt(id || '1');
      const donationProjects = [
        {
          id: 1,
          title: '6.25 참전용사 의료지원 프로젝트',
          description:
            '고령의 참전용사들을 위한 전문 의료진 파견 및 의료비 지원 사업',
          detailContent: `우리나라의 자유와 평화를 지키기 위해 목숨을 걸고 싸우신 6.25 참전용사 어르신들이 고령으로 인해 각종 질병과 의료비 부담으로 어려움을 겪고 계십니다.

본 프로젝트는 이러한 어르신들께 전문 의료진을 파견하여 정기적인 건강검진과 치료 서비스를 제공하고, 경제적 부담을 덜어드리기 위해 의료비를 지원하는 사업입니다.

▶ 주요 지원 내용
• 월 1회 전문의 방문 진료 서비스
• 정기 건강검진 (연 2회)
• 응급의료비 100% 지원
• 만성질환 치료비 80% 지원
• 재활치료 및 물리치료 서비스

▶ 지원 현황 (2024년 기준)
• 지원 대상: 6.25 참전용사 500명
• 총 모금 목표: 8억원
• 현재 모금액: 6억 3천만원 (79% 달성)
• 의료진 파견: 전국 15개 지역

어르신들의 건강한 노후를 위해 여러분의 따뜻한 마음을 모아주세요. 작은 정성이 모여 큰 사랑이 됩니다.`,
          author: {
            name: '대한민국재향군인회',
            profileImage: undefined,
          },
          period: '2024.01.01 ~ 2024.12.31',
          websiteUrl: 'www.koreanveterans.or.kr',
          contact: '02-123-4567',
        },
        {
          id: 2,
          title: '전쟁기념관 보존 및 교육 사업',
          description:
            '후세에게 평화의 소중함을 전하기 위한 전쟁기념관 유물 보존과 청소년 평화교육',
          detailContent: `전쟁의 참혹함과 평화의 소중함을 후세에 올바르게 전달하기 위해 전쟁기념관의 소중한 유물들을 보존하고, 청소년들에게 살아있는 역사교육을 제공하는 사업입니다.

▶ 사업 목표
• 전쟁 관련 유물 및 자료의 디지털화 보존
• 청소년 대상 평화교육 프로그램 운영
• 참전용사 구술사 기록 및 보존
• 평화통일 의식 확산

▶ 주요 활동
• 유물 보존 및 복원: 연간 100점 이상
• 청소년 교육: 월 500명 대상 프로그램 운영
• 체험학습: VR/AR 기술을 활용한 전쟁체험
• 평화 캠프: 방학 중 1박 2일 평화캠프 운영

▶ 기대 효과
역사를 잊은 민족에게 미래는 없습니다. 우리의 아픈 역사를 기억하고 평화의 소중함을 깨달을 때, 진정한 평화통일의 기반이 마련될 것입니다.`,
          author: {
            name: '전쟁기념사업회',
            profileImage: undefined,
          },
          period: '2024.03.01 ~ 2025.02.28',
          websiteUrl: 'www.warmemorial.or.kr',
          contact: '02-789-0123',
        },
      ];

      const baseData = donationProjects.find(p => p.id === donationId) || donationProjects[0];

      const detailData: DonationDetailData = {
        ...baseData,
        images: [],
        socialLinks: {
          facebook: 'https://facebook.com/koreanveterans',
          twitter: 'https://twitter.com/koreanveterans',
          pinterest: 'https://pinterest.com/koreanveterans',
          email: 'mailto:support@koreanveterans.or.kr',
        },
      };

      // 데이터 로딩 시뮬레이션
      setTimeout(() => {
        setDonationData(detailData);
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
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
          '_blank'
        );
        break;
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`,
          '_blank'
        );
        break;
      case 'pinterest':
        window.open(
          `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl)}&description=${encodeURIComponent(title)}`,
          '_blank'
        );
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${title}\n${currentUrl}`)}`;
        break;
    }
  };

  if (loading) {
    return (
      <div className='donation-detail-loading'>
        <div className='loading-spinner'>로딩 중...</div>
      </div>
    );
  }

  if (!donationData) {
    return (
      <div className='donation-detail-error'>
        <h2>후원 정보를 찾을 수 없습니다.</h2>
        <button onClick={handleBackClick} className='back-button'>
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <main className='donation-detail-page'>
      <div className='donation-detail-container'>
        {/* 뒤로가기 버튼 */}
        <div className='detail-header'>
          <button onClick={handleBackClick} className='back-button'>
            ← 목록으로
          </button>
        </div>

        {/* 제목 */}
        <h1 className='detail-title'>{donationData.title}</h1>

        {/* 이미지 갤러리 */}
        <div className='image-gallery'>
          <div className='main-image'>
            <img src='/src/components/img/H1.jpg' alt='메인 이미지' />
          </div>
          <div className='sub-images'>
            <img src='/src/components/img/H2.jpg' alt='서브 이미지 1' />
            <img src='/src/components/img/H3.jpeg' alt='서브 이미지 2' />
          </div>
        </div>

        {/* 소셜 공유 버튼들 */}
        <div className='social-share'>
          <button
            className='social-btn facebook-btn'
            onClick={() => handleSocialShare('facebook')}
          >
            facebook
          </button>
          <button
            className='social-btn twitter-btn'
            onClick={() => handleSocialShare('twitter')}
          >
            Tweet
          </button>
          <button
            className='social-btn pinterest-btn'
            onClick={() => handleSocialShare('pinterest')}
          >
            Pin
          </button>
          <button
            className='social-btn email-btn'
            onClick={() => handleSocialShare('email')}
          >
            Email
          </button>
        </div>

        {/* 상세 내용 */}
        <div className='detail-content'>
          <div className='content-text'>
            {donationData.detailContent.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className='content-sidebar'>
            {/* 사이드바 이미지 제거 - 움직임 문제로 인해 */}
          </div>
        </div>

        {/* 후원하기 버튼 */}
        <div className='donate-action'>
          <button className='donate-main-button' onClick={handleDonateClick}>
            후원하기
          </button>
        </div>

        {/* 추가 정보 */}
        <div className='additional-info'>
          <div className='info-item'>
            <span className='info-label'>후원 기간:</span>
            <span className='info-value'>{donationData.period}</span>
          </div>
          <div className='info-item'>
            <span className='info-label'>후원 사이트:</span>
            <span className='info-value'>{donationData.websiteUrl}</span>
          </div>
          <div className='info-item'>
            <span className='info-label'>담당자:</span>
            <span className='info-value'>{donationData.author.name}</span>
          </div>
        </div>

        {/* 후원 모달 */}
        <DonationModal
          isOpen={showDonationModal}
          onClose={handleCloseModal}
          donationData={
            donationData
              ? {
                  id: donationData.id,
                  title: donationData.title,
                  currentAmount: 63370000,
                  targetAmount: 80000000,
                  authorName: donationData.author.name,
                }
              : undefined
          }
        />
      </div>
    </main>
  );
};

export default DonationDetail;
