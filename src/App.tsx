import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header, HomeHeader, Home, Donation, WarMemoir, WarMemoirDetail, WriteLetter, WriteDetail, KakaoLogin, MyPage, AuthGuard, LoginSuccess } from './components';
import './App.css';

// 카카오 로그인 토큰 처리 컴포넌트
const TokenHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // warhero.site에서 접속했고 토큰이 있으면 localhost로 리다이렉트
    if (window.location.hostname === 'warhero.site' && window.location.search.includes('token=')) {
      const currentSearch = window.location.search;
      const newUrl = `http://localhost:5173/${currentSearch}`;
      
      // 즉시 리다이렉트
      window.location.replace(newUrl);
      return;
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const email = urlParams.get('email');
    const id = urlParams.get('id');

    // 카카오 로그인 성공 후 토큰이 있는 경우
    if (token && email && id) {
      try {
        // 토큰을 localStorage에 저장
        localStorage.setItem('accessToken', token);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userId', id);
        
        // React Router를 사용한 안전한 리다이렉트
        navigate('/', { replace: true });
      } catch (error) {
        // 에러 발생 시 로그인 페이지로 리다이렉트
        navigate('/login', { replace: true });
      }
    }
  }, [navigate, location]);

  return null;
};

function App() {
  return (
    <Router>
      <div className='app'>
        <TokenHandler />
        <AuthGuard>
          <Routes>
            <Route 
              path='/' 
              element={
                <>
                  <HomeHeader />
                  <Home />
                </>
              } 
            />
            <Route 
              path='/donation' 
              element={
                <>
                  <Header />
                  <Donation />
                </>
              } 
            />
            <Route 
              path='/memoir' 
              element={
                <>
                  <Header />
                  <WarMemoir />
                </>
              } 
            />
            <Route 
              path='/memoir/:id' 
              element={
                <>
                  <Header />
                  <WarMemoirDetail />
                </>
              } 
            />
            <Route 
              path='/write-letter' 
              element={
                <>
                  <Header />
                  <WriteLetter />
                </>
              } 
            />
            <Route 
              path='/write-detail/:id' 
              element={
                <>
                  <Header />
                  <WriteDetail />
                </>
              } 
            />
            <Route 
              path='/mypage' 
              element={
                <>
                  <Header />
                  <MyPage />
                </>
              } 
            />
            <Route path='/login' element={<KakaoLogin />} />
            <Route path='/login-success' element={<LoginSuccess />} />
            {/* 404 방지용 catch-all 라우트 */}
            <Route path='*' element={
              <>
                <Header />
                <div style={{ 
                  minHeight: 'calc(100vh - 140px)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  padding: '2rem',
                  marginTop: '180px'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <h1>페이지를 찾을 수 없습니다</h1>
                    <p>요청하신 페이지가 존재하지 않습니다.</p>
                    <button 
                      onClick={() => window.location.href = '/'}
                      style={{
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '1rem'
                      }}
                    >
                      홈으로 돌아가기
                    </button>
                  </div>
                </div>
              </>
            } />
          </Routes>
        </AuthGuard>
      </div>
    </Router>
  );
}

export default App;
