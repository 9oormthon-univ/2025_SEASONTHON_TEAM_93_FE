import './WriteLetter.css';
import { useState } from 'react';

const WriteLetter = () => {
  const [formData, setFormData] = useState({
    recipient: '',
    title: '',
    content: '',
    senderName: '',
    senderEmail: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 편지 전송 로직
    console.log('편지 전송:', formData);
    alert('편지가 성공적으로 전송되었습니다!');
  };

  return (
    <main className='write-letter'>
      <div className='content-container'>
        <div className='letter-header'>
          <h1>영웅에게 편지쓰기</h1>
          <p>참전 용사님께 감사와 존경의 마음을 전해주세요</p>
        </div>

        <div className='letter-form-container'>
          <form onSubmit={handleSubmit} className='letter-form'>
            <div className='form-group'>
              <label htmlFor='recipient'>받는 분</label>
              <select
                id='recipient'
                name='recipient'
                value={formData.recipient}
                onChange={handleInputChange}
                required
              >
                <option value=''>받는 분을 선택해주세요</option>
                <option value='veteran1'>6.25 참전 용사 김영수님</option>
                <option value='veteran2'>6.25 참전 용사 이철수님</option>
                <option value='veteran3'>6.25 참전 용사 박민수님</option>
                <option value='veteran4'>6.25 참전 용사 최영희님</option>
                <option value='veteran5'>6.25 참전 용사 정수진님</option>
              </select>
            </div>

            <div className='form-group'>
              <label htmlFor='title'>편지 제목</label>
              <input
                type='text'
                id='title'
                name='title'
                value={formData.title}
                onChange={handleInputChange}
                placeholder='편지 제목을 입력해주세요'
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='content'>편지 내용</label>
              <textarea
                id='content'
                name='content'
                value={formData.content}
                onChange={handleInputChange}
                placeholder='참전 용사님께 전하고 싶은 마음을 자유롭게 작성해주세요...'
                rows={10}
                required
              />
            </div>

            <div className='sender-info'>
              <h3>보내는 분 정보</h3>
              <div className='form-row'>
                <div className='form-group'>
                  <label htmlFor='senderName'>이름</label>
                  <input
                    type='text'
                    id='senderName'
                    name='senderName'
                    value={formData.senderName}
                    onChange={handleInputChange}
                    placeholder='보내는 분의 이름'
                    required
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='senderEmail'>이메일</label>
                  <input
                    type='email'
                    id='senderEmail'
                    name='senderEmail'
                    value={formData.senderEmail}
                    onChange={handleInputChange}
                    placeholder='보내는 분의 이메일'
                    required
                  />
                </div>
              </div>
            </div>

            <div className='form-actions'>
              <button type='button' className='btn-secondary'>
                임시저장
              </button>
              <button type='submit' className='btn-primary'>
                편지 전송하기
              </button>
            </div>
          </form>

          <div className='letter-guidelines'>
            <h3>편지 작성 가이드라인</h3>
            <ul>
              <li>참전 용사님께 존경과 감사의 마음을 담아 작성해주세요</li>
              <li>개인정보나 민감한 내용은 포함하지 마세요</li>
              <li>정치적, 종교적 내용은 피해주세요</li>
              <li>
                편지는 검토 후 전달되며, 부적절한 내용은 전달되지 않을 수
                있습니다
              </li>
              <li>전송된 편지는 수정이 불가능하니 신중히 작성해주세요</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WriteLetter;
