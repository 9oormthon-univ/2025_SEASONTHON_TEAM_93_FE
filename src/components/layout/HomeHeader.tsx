import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../styles/layout/HomeHeader.css';

const HomeHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const email = localStorage.getItem('userEmail');

    if (token && email) {
      setIsLoggedIn(true);
      setUserEmail(email);
    } else {
      setIsLoggedIn(false);
      setUserEmail('');
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setUserEmail('');
    navigate('/login');
  };

  const isActiveLink = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className='home-header'>
      <div className='home-header-container'>
        <div className='home-header-content'>
          {/* 로고 */}
          <Link to='/' className='home-logo'>
            <svg
              className='home-logo-icon'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              {/* 집 아이콘 */}
              <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
              <polyline points='9,22 9,12 15,12 15,22' />
              {/* 왼쪽 손 */}
              <path d='M2 16c0-2 1-3 2-3s2 1 2 3' strokeWidth='1.5' />
              <path d='M1 18c0-1 0.5-2 1.5-2s1.5 1 1.5 2' strokeWidth='1.5' />
              {/* 오른쪽 손 */}
              <path d='M22 16c0-2-1-3-2-3s-2 1-2 3' strokeWidth='1.5' />
              <path d='M23 18c0-1 0-2-1.5-2s-1.5 1-1.5 2' strokeWidth='1.5' />
            </svg>
            <span className='home-logo-text'>영웅의 집</span>
          </Link>

          {/* 네비게이션 */}
          <nav className='home-nav'>
            <Link
              to='/'
              className={`home-nav-link ${isActiveLink('/') ? 'active' : ''}`}
            >
              <svg
                className='home-nav-icon'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
                <polyline points='9,22 9,12 15,12 15,22' />
              </svg>
              Home
            </Link>
            <Link
              to='/donation'
              className={`home-nav-link ${isActiveLink('/donation') ? 'active' : ''}`}
            >
              <svg
                className='home-nav-icon'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
              </svg>
              후원하기
            </Link>
            <Link
              to='/home'
              className={`home-nav-link ${isActiveLink('/home') || isActiveLink('/war-memoir-detail') ? 'active' : ''}`}
            >
              <svg
                className='home-nav-icon'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />
              </svg>
              나의 참전 회고록
            </Link>
            <Link
              to='/write-letter'
              className={`home-nav-link ${isActiveLink('/write-letter') || isActiveLink('/write-detail') ? 'active' : ''}`}
            >
              <svg
                className='home-nav-icon'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
                <polyline points='14,2 14,8 20,8' />
                <line x1='16' y1='13' x2='8' y2='13' />
                <line x1='16' y1='17' x2='8' y2='17' />
                <polyline points='10,9 9,9 8,9' />
              </svg>
              편지쓰기
            </Link>
            <Link
              to='/mypage'
              className={`home-nav-link ${isActiveLink('/mypage') ? 'active' : ''}`}
            >
              <svg
                className='home-nav-icon'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
                <circle cx='12' cy='7' r='4' />
              </svg>
              마이페이지
            </Link>
          </nav>

          {/* 인증 섹션 */}
          <div className='home-auth-section'>
            {isLoggedIn ? (
              <div className='home-user-info'>
                <span className='home-user-email'>{userEmail}</span>
                <button onClick={handleLogout} className='home-logout-btn'>
                  로그아웃
                </button>
              </div>
            ) : (
              <Link to='/login' className='home-login-btn'>
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
