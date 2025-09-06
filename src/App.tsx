import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Home, Donation, WarMemoir, WarMemoirDetail, WriteLetter, WriteDetail, KakaoLogin, MyPage } from './components';
import './App.css';

function App() {
  return (
    <Router>
      <div className='app'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/donation' element={<Donation />} />
          <Route path='/memoir' element={<WarMemoir />} />
          <Route path='/memoir/:id' element={<WarMemoirDetail />} />
          <Route path='/write-letter' element={<WriteLetter />} />
          <Route path='/write-detail/:id' element={<WriteDetail />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/login' element={<KakaoLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
