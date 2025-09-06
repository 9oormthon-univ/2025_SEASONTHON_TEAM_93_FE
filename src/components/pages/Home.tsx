import React from 'react';
import MainSection from '../common/MainSection';
import Footer from '../common/Footer';
import '../../styles/pages/Home.css';

const Home: React.FC = () => {
  return (
    <div className='home-page'>
      <MainSection />
      <Footer />
    </div>
  );
};

export default Home;
