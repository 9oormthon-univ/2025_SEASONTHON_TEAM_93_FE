import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/components/AuthGuard.css';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('accessToken');
      const isLoginPage = location.pathname === '/login';
      const isLoginSuccessPage = location.pathname === '/login-success';
      
      // 토큰이 있으면 인증됨
      if (token) {
        setIsAuthenticated(true);
        // 로그인 페이지에 있다면 홈으로 리다이렉트
        if (isLoginPage) {
          navigate('/', { replace: true });
        }
      } else {
        setIsAuthenticated(false);
        // 로그인 페이지가 아니라면 로그인 페이지로 리다이렉트
        if (!isLoginPage && !isLoginSuccessPage) {
          navigate('/login', { replace: true });
        }
      }
      
      setIsLoading(false);
    };

    checkAuthStatus();
  }, [navigate, location.pathname]);

  // 로딩 중이면 로딩 화면 표시
  if (isLoading) {
    return (
      <div className='loading-screen'>
        <div className='loading-spinner'>
          <div className='loading-logo'>
            <svg
              className='loading-icon'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              {/* 집 아이콘 */}
              <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
              <polyline points='9,22 9,12 15,12 15,22' />
            </svg>
            <h1 className='loading-title'>영웅의 집</h1>
          </div>
          <div className='loading-progress'>
            <div className='loading-bar'></div>
          </div>
          <p className='loading-text'>로그인 상태를 확인하고 있습니다...</p>
        </div>
      </div>
    );
  }

  // 로그인 페이지거나 인증된 상태면 children 렌더링
  if (location.pathname === '/login' || isAuthenticated) {
    return <>{children}</>;
  }

  // 그 외의 경우는 아무것도 렌더링하지 않음 (리다이렉트 중)
  return null;
};

export default AuthGuard;
