import './WriteDetail.css';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const WriteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    title: '',
    content: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  const handleBackClick = () => {
    navigate('/write-letter');
  };

  return (
    <main className='write-detail'>
      <div className='content-container'>
        <div className='letter-header'>
          <h1>6.25 참전 영웅 {id?.padStart(3, '0')}</h1>
          <p>영웅에게 당신의 마음을 전달해보세요!</p>
          <p>선정된 편지는 영웅에게 직접 전달됩니다.</p>
        </div>

        <form onSubmit={handleSubmit} className='letter-form'>
          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='name'>이름</label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                placeholder='Your Name'
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>이메일</label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                placeholder='Your Email'
                required
              />
            </div>
          </div>

          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='address'>주소</label>
              <input
                type='text'
                id='address'
                name='address'
                value={formData.address}
                onChange={handleInputChange}
                placeholder='Your Address'
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='phone'>Phone</label>
              <input
                type='tel'
                id='phone'
                name='phone'
                value={formData.phone}
                onChange={handleInputChange}
                placeholder='010-0000-0000'
                required
              />
            </div>
          </div>

          <div className='form-group'>
            <label htmlFor='title'>제목*</label>
            <input
              type='text'
              id='title'
              name='title'
              value={formData.title}
              onChange={handleInputChange}
              placeholder='Title...'
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='content'>내용*</label>
            <textarea
              id='content'
              name='content'
              value={formData.content}
              onChange={handleInputChange}
              placeholder='Type Your Message Here...'
              rows={8}
              required
            />
          </div>

          <div className='form-actions'>
            <button
              type='button'
              className='btn-back'
              onClick={handleBackClick}
            >
              뒤로가기
            </button>
            <button type='submit' className='btn-send'>
              <span>마음 전달하기</span>
              <svg
                className='send-icon'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <line x1='22' y1='2' x2='11' y2='13' />
                <polygon points='22,2 15,22 11,13 2,9 22,2' />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default WriteDetail;
