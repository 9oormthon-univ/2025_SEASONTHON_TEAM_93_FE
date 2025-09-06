import React from 'react';
import '../../styles/components/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <p className='footer-text'>"밤새 쓰러질까 걱정되어 문을 열고 잠이 듭니다"</p>
        <div className='footer-actions'>
          <button className='footer-btn btn-secondary'>사연 보러 가기</button>
          <button className='footer-btn btn-primary'>후원하기</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
