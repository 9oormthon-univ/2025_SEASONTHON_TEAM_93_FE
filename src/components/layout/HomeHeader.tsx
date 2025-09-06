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
            <div className='home-logo-icon'>
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
                <polyline points='9,22 9,12 15,12 15,22' />
              </svg>
            </div>
            <span className='home-logo-text'>영웅의 집</span>
          </Link>

          {/* 네비게이션 */}
          <nav className='home-nav'>
            <Link
              to='/'
              className={`home-nav-link ${isActiveLink('/') ? 'active' : ''}`}
            >
              <svg className='home-nav-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
                <polyline points='9,22 9,12 15,12 15,22' />
              </svg>
              Home
            </Link>
            <Link
              to='/donation'
              className={`home-nav-link ${isActiveLink('/donation') ? 'active' : ''}`}
            >
              <svg className='home-nav-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <circle cx='12' cy='12' r='10' />
                <path d='M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8' />
                <path d='M12 18V6' />
              </svg>
              후원하기
            </Link>
            <Link
              to='/home'
              className={`home-nav-link ${isActiveLink('/home') || isActiveLink('/war-memoir-detail') ? 'active' : ''}`}
            >
              <svg className='home-nav-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
                <polyline points='14,2 14,8 20,8' />
                <line x1='16' y1='13' x2='8' y2='13' />
                <line x1='16' y1='17' x2='8' y2='17' />
                <polyline points='10,9 9,9 8,9' />
              </svg>
              나의 참전 회고록
            </Link>
            <Link
              to='/write-letter'
              className={`home-nav-link ${isActiveLink('/write-letter') || isActiveLink('/write-detail') ? 'active' : ''}`}
            >
              <svg className='home-nav-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z' />
                <path d='M21 7L12 14 3 7' />
              </svg>
              편지쓰기
            </Link>
            <Link
              to='/mypage'
              className={`home-nav-link ${isActiveLink('/mypage') ? 'active' : ''}`}
            >
              <svg className='home-nav-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
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
