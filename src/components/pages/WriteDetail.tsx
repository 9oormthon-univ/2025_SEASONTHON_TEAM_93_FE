import '../../styles/pages/WriteDetail.css';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { letterService } from '../../services';
import type { LetterCreateRequest } from '../../types/api';

const WriteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id || !formData.title.trim() || !formData.content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    // 로그인 토큰 확인
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    try {
      setSubmitting(true);
      
      const letterData: LetterCreateRequest = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        warMemoirId: parseInt(id),
      };

      const response = await letterService.createLetter(letterData);
      
      if (response.isSuccess && response.result) {
        alert(`편지가 성공적으로 전송되었습니다!\n"${response.result.warMemoir.title}"에 대한 편지가 작성되었습니다.`);
        navigate('/write-letter');
      } else {
        alert('편지 전송에 실패했습니다: ' + response.message);
      }
    } catch (error) {
      alert('편지 전송 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackClick = () => {
    navigate('/write-letter');
  };

  return (
    <main className='write-detail'>
      <div className='content-container'>
        <div className='letter-header'>
          <h1>회고록 #{id}에 편지 쓰기</h1>
          <p>참전 영웅에게 당신의 마음을 전달해보세요!</p>
          <p>작성된 편지는 검토 후 영웅에게 전달됩니다.</p>
        </div>

        <form onSubmit={handleSubmit} className='letter-form'>

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
              disabled={submitting}
            >
              뒤로가기
            </button>
            <button 
              type='submit' 
              className='btn-send'
              disabled={submitting || !formData.title.trim() || !formData.content.trim()}
            >
              <span>{submitting ? '편지 전송 중...' : '마음 전달하기'}</span>
              {!submitting && (
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
              )}</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default WriteDetail;
