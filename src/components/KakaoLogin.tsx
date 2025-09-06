import './KakaoLogin.css';

const KakaoLogin = () => {
  const loginWithKakao = () => {
    // Spring Security OAuth2 Authorization 엔드포인트로 직접 리다이렉트
    window.location.href = 'http://warhero.site/oauth2/authorization/kakao';
  };

  return (
    <div className='kakao-login-container'>
      <div className='login-content'>
        <div className='logo-section'>
          <h1>영웅의 집</h1>
          <p>참전 용사님들과 소통하는 공간</p>
        </div>
        
        <div className='login-section'>
          <h2>로그인</h2>
          <p>카카오 계정으로 간편하게 로그인하세요</p>
          
          <button 
            className='kakao-login-btn'
            onClick={loginWithKakao}
          >
            <svg 
              className='kakao-icon' 
              viewBox='0 0 24 24' 
              fill='#000000'
            >
              <path d='M12 3C6.48 3 2 6.48 2 10.5c0 2.5 1.5 4.7 3.8 6.1L5 21l4.5-1.5c.8.2 1.6.3 2.5.3 5.52 0 10-3.48 10-7.5S17.52 3 12 3z'/>
            </svg>
            카카오로 로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default KakaoLogin;
