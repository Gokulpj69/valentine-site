import React, { useState } from 'react';
import './index.css';

function App() {
  const [phase, setPhase] = useState(1);
  
  // Safe starting coordinates for the No button placed cleanly to the right
  const [noPosition, setNoPosition] = useState({ top: '10px', left: '150px' });
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [noText, setNoText] = useState("No");

  const noPhrases = [
    "No", "Are you sure?", "Think again, Nimmu", 
    "Don't break my heart", "Not an option!", "Nice try!"
  ];

  const moveNoButton = () => {
    const directions = [
      { top: '-60px', left: '-130px' },
      { top: '65px', left: '160px' },
      { top: '-50px', left: '150px' },
      { top: '70px', left: '-140px' },
      { top: '0px', left: '190px' },
      { top: '0px', left: '-190px' }
    ];
    
    const randomSpot = directions[Math.floor(Math.random() * directions.length)];
    setNoPosition(randomSpot);
    
    setYesButtonScale((prev) => Math.min(prev + 0.1, 1.6));
    
    const currentPhraseIndex = noPhrases.indexOf(noText);
    const nextPhraseIndex = (currentPhraseIndex + 1) % noPhrases.length;
    setNoText(noPhrases[nextPhraseIndex]);
  };

  const BackgroundParticles = () => (
    <div className="hearts-bg">
      {[...Array(15)].map((_, i) => (
        <div 
          key={i} 
          className="heart-particle" 
          style={{ 
            left: `${Math.random() * 95}%`, 
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${Math.random() * 5 + 6}s`
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="app-wrapper">
      <BackgroundParticles />

      {/* PHASE 1: HOME WELCOME */}
      {phase === 1 && (
        <div key="phase-1" className="phase-container">
          <div className="glass-card">
            <div className="gold-heart-badge">💖</div>
            <h1 className="script-title">For My Dearest Nimmu</h1>
            <p className="body-text">
              Some connections aren't just found; they are written in the stars and woven into code. 
              Are you ready to step right into Gokul’s heart?
            </p>
            <button className="base-btn btn-yes" onClick={() => setPhase(2)}>
              Step Inside ✨
            </button>
          </div>
        </div>
      )}

      {/* PHASE 2: THE MAIN QUESTION */}
      {phase === 2 && (
        <div key="phase-2" className="phase-container">
          <div className="glass-card">
            <div className="gold-heart-badge">👑</div>
            <h1 className="script-title" style={{ fontSize: '4.2rem' }}>A Special Question</h1>
            <p className="body-text">
              Out of all the paths in this world, my favorite one leads straight to you.<br />
              <strong>Will you be mine forever, Nimmu?</strong>
            </p>
            
            <div className="btn-wrapper">
              <button 
                className="base-btn btn-yes" 
                style={{ transform: `scale(${yesButtonScale})`, transition: 'transform 0.2s ease' }}
                onClick={() => setPhase(3)}
              >
                Yes! 🥰
              </button>
              <button
                className="base-btn btn-no"
                style={{ top: noPosition.top, left: noPosition.left }}
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
                onClick={moveNoButton}
              >
                {noText}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 3: CELEBRATION */}
      {phase === 3 && (
        <div key="phase-3" className="phase-container">
          <div className="glass-card">
            <div className="gold-heart-badge">✨</div>
            <h1 className="script-title">Forever Yours</h1>
            <p className="body-text">
              You just made me the luckiest person alive, Nimmu. 
              Thank you for filling my life with your grace, your smile, and your endless warmth.
            </p>
            <div className="love-note" style={{ marginBottom: '25px' }}>
              "In any universe, in any lifetime, my heart would always find its way back to you, Nimmu." — Forever yours, Gokul ❤️
            </div>
            <button className="base-btn btn-yes" onClick={() => setPhase(4)}>
              One More Thing... 💫
            </button>
          </div>
        </div>
      )}

      {/* PHASE 4: CINEMATIC "I LOVE NIMMU 3000" TRIBUTE */}
      {phase === 4 && (
        <div key="phase-4" className="phase-container">
          <div className="glass-card" style={{ maxWidth: '620px' }}>
            <div className="phase-4-content">
              <div className="tribute-badge">💖</div>
              <h1 className="tribute-title">I Love You 3000</h1>
              <p className="tribute-subtitle">Nimmu, across every reality & infinity</p>
              <div className="universe-quote">
                "Heroes might love their universes 3000, but my entire universe begins and ends with you, Nimmu. Thank you for being my absolute everything." <br /><br />
                <strong style={{ color: 'var(--gold-primary)' }}>— Gokul P Jith</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;