import { useState } from 'react';
import '../../styles/components/DonationModal.css';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  donationData?: {
    id: number;
    title: string;
    currentAmount: number;
    targetAmount: number;
    authorName: string;
  };
}

const DonationModal = ({
  isOpen,
  onClose,
  donationData,
}: DonationModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    customAmount: '',
    paymentMethod: 'card',
  });

  // 기본 후원 금액 옵션
  const amountOptions = [
    { value: '10000', label: '₩10,000' },
    { value: '30000', label: '₩30,000' },
    { value: '50000', label: '₩50,000' },
    { value: '100000', label: '₩100,000' },
  ];

  // 진행률 계산 (기본값 80%)
  const progressPercentage = donationData
    ? Math.round((donationData.currentAmount / donationData.targetAmount) * 100)
    : 80;

  const currentAmount = donationData?.currentAmount || 63370000;
  const targetAmount = donationData?.targetAmount || 80000000;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmountSelect = (amount: string) => {
    setFormData(prev => ({
      ...prev,
      amount,
      customAmount: '',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 폼 검증
    if (!formData.name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }

    if (!formData.email.trim()) {
      alert('이메일을 입력해주세요.');
      return;
    }

    const donationAmount = formData.customAmount || formData.amount;
    if (!donationAmount) {
      alert('후원 금액을 선택하거나 입력해주세요.');
      return;
    }

    // 실제로는 결제 API 호출
    alert(
      `후원이 접수되었습니다!\n이름: ${formData.name}\n금액: ₩${parseInt(donationAmount).toLocaleString()}`
    );
    onClose();

    // 폼 초기화
    setFormData({
      name: '',
      email: '',
      amount: '',
      customAmount: '',
      paymentMethod: 'card',
    });
  };

  if (!isOpen) return null;

  return (
    <div className='donation-modal-overlay' onClick={onClose}>
      <div className='donation-modal' onClick={e => e.stopPropagation()}>
        {/* 닫기 버튼 */}
        <button className='modal-close-btn' onClick={onClose}>
          ×
        </button>

        <div className='donation-modal-content'>
          {/* 왼쪽: 후원 폼 */}
          <div className='donation-form-section'>
            <div className='modal-header'>
              <div className='author-avatar'>
                <span className='avatar-text'>
                  {donationData?.authorName || '예윤'}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className='donation-form'>
              {/* 이름 입력 */}
              <div className='form-group'>
                <label className='form-label'>
                  이름 <span className='required'>*</span>
                </label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder='Your name'
                  className='form-input'
                  required
                />
              </div>

              {/* 이메일 입력 */}
              <div className='form-group'>
                <label className='form-label'>
                  이메일 <span className='required'>*</span>
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder='Your email'
                  className='form-input'
                  required
                />
              </div>

              {/* 후원 금액 선택 */}
              <div className='form-group'>
                <label className='form-label'>
                  후원 금액 <span className='required'>*</span>
                </label>
                <div className='amount-options'>
                  {amountOptions.map(option => (
                    <button
                      key={option.value}
                      type='button'
                      className={`amount-btn ${formData.amount === option.value ? 'active' : ''}`}
                      onClick={() => handleAmountSelect(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                {/* 직접 입력 */}
                <div className='custom-amount'>
                  <input
                    type='number'
                    name='customAmount'
                    value={formData.customAmount}
                    onChange={handleInputChange}
                    placeholder='직접 입력'
                    className='form-input custom-amount-input'
                    min='1000'
                  />
                </div>
              </div>

              {/* 결제 방법 */}
              <div className='form-group'>
                <label className='form-label'>결제 방법</label>
                <div className='payment-methods'>
                  <div className='payment-option'>
                    <div className='pay-logo'>●pay</div>
                    <div className='qr-code'>
                      {/* QR 코드 자리 */}
                      <div className='qr-placeholder'>
                        <div className='qr-pattern'></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 후원하기 버튼 */}
              <button type='submit' className='donation-submit-btn'>
                <span>후원하기</span>
                <span className='submit-icon'>✈</span>
              </button>
            </form>
          </div>

          {/* 오른쪽: 진행률 및 통계 */}
          <div className='donation-stats-section'>
            <div className='stats-background'>
              {/* 원형 진행률 차트 */}
              <div className='progress-chart'>
                <svg width='200' height='200' className='progress-svg'>
                  <circle
                    cx='100'
                    cy='100'
                    r='80'
                    fill='none'
                    stroke='rgba(255, 255, 255, 0.2)'
                    strokeWidth='8'
                  />
                  <circle
                    cx='100'
                    cy='100'
                    r='80'
                    fill='none'
                    stroke='#4FC3F7'
                    strokeWidth='8'
                    strokeLinecap='round'
                    strokeDasharray={`${2 * Math.PI * 80}`}
                    strokeDashoffset={`${2 * Math.PI * 80 * (1 - progressPercentage / 100)}`}
                    transform='rotate(-90 100 100)'
                    className='progress-circle'
                  />
                </svg>
                <div className='progress-text'>
                  <span className='progress-percentage'>
                    {progressPercentage}%
                  </span>
                </div>
              </div>

              {/* 후원 통계 */}
              <div className='donation-stats'>
                <div className='stats-amount'>
                  ₩{currentAmount.toLocaleString()} / ₩
                  {targetAmount.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
