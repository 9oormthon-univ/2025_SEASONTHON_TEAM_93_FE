import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import WarMemoir from './components/WarMemoir';
import WarMemoirDetail from './components/WarMemoirDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className='app'>
        <Header />
        <Routes>
          <Route path='/' element={<WarMemoir />} />
          <Route path='/memoir/:id' element={<WarMemoirDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
