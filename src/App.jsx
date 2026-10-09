import React, { useState } from 'react';
import './index.css';

function App() {
  const [noPosition, setNoPosition] = useState({ top: '0px', left: '130px' });
  const [accepted, setAccepted] = useState(false);

  // Function to teleport the "No" button randomly when hovered/touched
  const moveNoButton = () => {
    const randomX = Math.floor(Math.random() * 220) - 110; 
    const randomY = Math.floor(Math.random() * 160) - 80;  
    setNoPosition({
      top: `${randomY}px`,
      left: `${randomX + 130}px`,
    });
  };

  return (
    <>
      <div className="hearts-bg">
        <div className="heart" style={{ left: '10%', animationDelay: '0s', width: '15px', height: '15px' }}></div>
        <div className="heart" style={{ left: '30%', animationDelay: '2s', width: '25px', height: '25px' }}></div>
        <div className="heart" style={{ left: '50%', animationDelay: '4s', width: '18px', height: '18px' }}></div>
        <div className="heart" style={{ left: '70%', animationDelay: '1s', width: '22px', height: '22px' }}></div>
        <div className="heart" style={{ left: '90%', animationDelay: '3s', width: '15px', height: '15px' }}></div>
      </div>

      <div className="container">
        {!accepted ? (
          <>
            <h1 className="title">For My Love ❤️</h1>
            <p className="question">Will you be mine forever?</p>
            <div className="buttons-wrapper">
              <button className="btn-yes" onClick={() => setAccepted(true)}>
                Yes! 🥰
              </button>
              <button
                className="btn-no"
                style={{ top: noPosition.top, left: noPosition.left }}
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
              >
                No 💔
              </button>
            </div>
          </>
        ) : (
          <div className="success-screen">
            <h1>Yay! 🎉</h1>
            <p>You've made me the happiest person in the world! I love you forever and always. ❤️</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;