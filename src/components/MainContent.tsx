import './MainContent.css';

const MainContent = () => {
  return (
    <main className='main-content'>
      <div className='content-container'>
        <div className='content-grid'>
          {/* 카드 1 */}
          <div className='content-card'>
            <div className='card-image'>
              <div className='image-placeholder'>이미지</div>
            </div>
            <div className='card-content'>
              <h3 className='card-title'>(제목 들어갈 곳)first title</h3>
              <p className='card-date'>발간일 : 2025.08.30</p>
              <p className='card-description'>
                (간단한 내용 들어갈 곳)Faucibus sit eu magna dui turpis
                facilisis tincidunt purus vel. Venenatis lorem turpis nullam id
                mauris vel dignissim. Pharetra ac sit ullamcorper
              </p>
            </div>
          </div>

          {/* 카드 2 */}
          <div className='content-card'>
            <div className='card-image'>
              <div className='image-placeholder'>이미지</div>
            </div>
            <div className='card-content'>
              <h3 className='card-title'>(제목 들어갈 곳)second title</h3>
              <p className='card-date'>발간일 : 2025.08.29</p>
              <p className='card-description'>
                (간단한 내용 들어갈 곳)Faucibus sit eu magna dui turpis
                facilisis tincidunt purus vel. Venenatis lorem turpis nullam id
                mauris vel dignissim. Pharetra ac sit ullamcorper
              </p>
            </div>
          </div>

          {/* 카드 3 */}
          <div className='content-card'>
            <div className='card-image'>
              <div className='image-placeholder'>이미지</div>
            </div>
            <div className='card-content'>
              <h3 className='card-title'>(제목 들어갈 곳)third title</h3>
              <p className='card-date'>발간일 : 2025.08.28</p>
              <p className='card-description'>
                (간단한 내용 들어갈 곳)Faucibus sit eu magna dui turpis
                facilisis tincidunt purus vel. Venenatis lorem turpis nullam id
                mauris vel dignissim. Pharetra ac sit ullamcorper
              </p>
            </div>
          </div>

          {/* 카드 4 */}
          <div className='content-card'>
            <div className='card-image'>
              <div className='image-placeholder'>이미지</div>
            </div>
            <div className='card-content'>
              <h3 className='card-title'>(제목 들어갈 곳)fourth title</h3>
              <p className='card-date'>발간일 : 2025.08.27</p>
              <p className='card-description'>
                (간단한 내용 들어갈 곳)Faucibus sit eu magna dui turpis
                facilisis tincidunt purus vel. Venenatis lorem turpis nullam id
                mauris vel dignissim. Pharetra ac sit ullamcorper
              </p>
            </div>
          </div>

          {/* 카드 5 */}
          <div className='content-card'>
            <div className='card-image'>
              <div className='image-placeholder'>이미지</div>
            </div>
            <div className='card-content'>
              <h3 className='card-title'>(제목 들어갈 곳)fifth title</h3>
              <p className='card-date'>발간일 : 2025.08.26</p>
              <p className='card-description'>
                (간단한 내용 들어갈 곳)Faucibus sit eu magna dui turpis
                facilisis tincidunt purus vel. Venenatis lorem turpis nullam id
                mauris vel dignissim. Pharetra ac sit ullamcorper
              </p>
            </div>
          </div>

          {/* 카드 6 */}
          <div className='content-card'>
            <div className='card-image'>
              <div className='image-placeholder'>이미지</div>
            </div>
            <div className='card-content'>
              <h3 className='card-title'>(제목 들어갈 곳)sixth title</h3>
              <p className='card-date'>발간일 : 2025.08.25</p>
              <p className='card-description'>
                (간단한 내용 들어갈 곳)Faucibus sit eu magna dui turpis
                facilisis tincidunt purus vel. Venenatis lorem turpis nullam id
                mauris vel dignissim. Pharetra ac sit ullamcorper
              </p>
            </div>
          </div>
        </div>

        {/* 페이지네이션 */}
        <div className='pagination'>
          <button className='pagination-btn'>
            <span>&lt;</span>
          </button>
          <button className='pagination-btn active'>1</button>
          <button className='pagination-btn'>2</button>
          <button className='pagination-btn'>3</button>
          <button className='pagination-btn'>4</button>
          <button className='pagination-btn'>5</button>
          <button className='pagination-btn'>
            <span>&gt;</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
