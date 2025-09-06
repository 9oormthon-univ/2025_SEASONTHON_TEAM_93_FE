import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../../styles/components/LoginSuccess.css';

// 카카오 로그인 성공 처리를 위한 전용 컴포넌트
const LoginSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    const id = searchParams.get('id');

    if (token && email && id) {
      try {
        // 토큰 저장
        localStorage.setItem('accessToken', token);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userId', id);

        // 성공 메시지 표시 후 홈으로 이동
        alert('로그인이 완료되었습니다!');
        navigate('/', { replace: true });
      } catch (error) {
        alert('로그인 처리 중 오류가 발생했습니다.');
        navigate('/login', { replace: true });
      }
    } else {
      alert('로그인 정보가 올바르지 않습니다.');
      navigate('/login', { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <div>
        <div
          className='login-success-spinner'
          style={{
            width: '64px',
            height: '64px',
            border: '4px solid rgba(255,255,255,0.3)',
            borderTop: '4px solid white',
            borderRadius: '50%',
            margin: '0 auto 1rem',
          }}
        />
        <h1>로그인 처리 중...</h1>
        <p>잠시만 기다려주세요.</p>
      </div>
    </div>
  );
};

export default LoginSuccess;
