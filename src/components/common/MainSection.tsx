import React from 'react';
import '../../styles/components/MainSection.css';

const MainSection: React.FC = () => {
  return (
    <main className='MainSection'>
      <img 
        src='/mockdata.jpg' 
        alt='메인 이미지' 
        className='main-image'
      />
    </main>
  );
};

export default MainSection;
