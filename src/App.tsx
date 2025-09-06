import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import WarMemoir from './components/WarMemoir';
import WarMemoirDetail from './components/WarMemoirDetail';
import WriteLetter from './components/WriteLetter';
import WriteDetail from './components/WriteDetail';
import KakaoLogin from './components/KakaoLogin';
import './App.css';

function App() {
  return (
    <Router>
      <div className='app'>
        <Header />
        <Routes>
          <Route path='/' element={<KakaoLogin />} />
          <Route path='/home' element={<WarMemoir />} />
          <Route path='/memoir/:id' element={<WarMemoirDetail />} />
          <Route path='/write-letter' element={<WriteLetter />} />
          <Route path='/write-detail/:id' element={<WriteDetail />} />
          <Route path='/login' element={<KakaoLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
