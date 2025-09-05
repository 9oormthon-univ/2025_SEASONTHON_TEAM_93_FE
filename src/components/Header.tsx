import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>Hero House</h1>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li><a href="#" className="nav-link">홈</a></li>
            <li><a href="#" className="nav-link">서비스</a></li>
            <li><a href="#" className="nav-link">소개</a></li>
            <li><a href="#" className="nav-link">문의</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
