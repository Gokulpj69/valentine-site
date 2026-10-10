import React, { useState, useRef } from 'react';
import './index.css';

function App() {
  const [phase, setPhase] = useState(1);
  const [blasts, setBlasts] = useState([]);
  
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [noPosition, setNoPosition] = useState({ top: '10px', left: '160px' });
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [noText, setNoText] = useState("No");

  const noPhrases = [
    "No", "Are you sure?", "Don't break my heart 🥺", 
    "I'm obsessed with you!", "Not an option!", "Is it poison? 🧪"
  ];

  const createBlast = (e, callback) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX || (rect.left + rect.width / 2);
    const y = e.clientY || (rect.top + rect.height / 2);

    const newParticles = Array.from({ length: 18 }).map((_, i) => {
      const angle = (i * 20) * (Math.PI / 180); 
      const speed = Math.random() * 90 + 70; 
      return {
        id: Date.now() + i,
        x,
        y,
        tx: Math.cos(angle) * speed,
        ty: Math.sin(angle) * speed,
        rot: Math.random() * 360,
        emoji: Math.random() > 0.5 ? '🌸' : '✨' 
      };
    });

    setBlasts(prev => [...prev, ...newParticles]);

    setTimeout(() => {
      setBlasts(prev => prev.filter(p => !newParticles.includes(p)));
      if (callback) callback();
    }, 600); 
  };

  const handleYesClick = (e, nextPhase) => {
    createBlast(e, () => setPhase(nextPhase));
  };

  const handleStartJourney = (e) => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }
    handleYesClick(e, 2);
  };

  const moveNoButton = (e) => {
    if (e && e.type === 'click') createBlast(e, null);

    const directions = [
      { top: '-70px', left: '-140px' },
      { top: '75px', left: '170px' },
      { top: '-60px', left: '160px' },
      { top: '80px', left: '-150px' },
      { top: '0px', left: '200px' },
      { top: '0px', left: '-200px' }
    ];
    
    const randomSpot = directions[Math.floor(Math.random() * directions.length)];
    setNoPosition(randomSpot);
    setYesButtonScale((prev) => Math.min(prev + 0.15, 1.8)); 
    
    const currentPhraseIndex = noPhrases.indexOf(noText);
    const nextPhraseIndex = (currentPhraseIndex + 1) % noPhrases.length;
    setNoText(noPhrases[nextPhraseIndex]);
  };

  const FallingPetals = () => (
    <div className="petals-bg">
      {[...Array(25)].map((_, i) => (
        <div 
          key={i} 
          className="petal-particle" 
          style={{ 
            left: `${Math.random() * 100}%`, 
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${Math.random() * 8 + 10}s`
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="app-wrapper">
      
      {/* Invisible Background Audio Element */}
      <audio ref={audioRef} loop>
        <source src="/bg-music.mp3" type="audio/mpeg" />
      </audio>

      <FallingPetals />

      {blasts.map(p => (
        <div key={p.id} className="blast-particle" style={{
          left: p.x, top: p.y,
          '--tx': `${p.tx}px`,
          '--ty': `${p.ty}px`,
          '--rot': `${p.rot}deg`
        }}>
          {p.emoji}
        </div>
      ))}

      {/* PHASE 1: THE WELCOME */}
      {phase === 1 && (
        <div key="phase-1" className="phase-container">
          <div className="glass-card">
            <div className="anime-image-container" style={{ maxWidth: '280px' }}>
              <img src="/maomao.jpg" alt="Maomao" className="anime-image" onError={(e) => e.target.style.display = 'none'} />
            </div>
            
            <h1 className="anime-title">Hey Nimmu...</h1>
            <p className="body-text">
              They say the most beautiful things in the palace are kept carefully hidden away. But the second you walked into my life, everything else just faded into the background.
              <br /><br />
              I built this little secret space just for you. Are you ready to step inside?
            </p>
            <button className="base-btn btn-yes" onClick={handleStartJourney}>
              Let's Go ✨
            </button>
          </div>
        </div>
      )}

      {/* PHASE 2: THE QUESTION */}
      {phase === 2 && (
        <div key="phase-2" className="phase-container">
          <div className="glass-card">
            <div className="gold-badge">🧪</div>
            <h1 className="anime-title" style={{ fontSize: '3.2rem' }}>Just One Question</h1>
            <p className="body-text">
              I was going to ask an apothecary for a cure, but honestly? I'm completely addicted to you, and I really don't want an antidote. I just want you by my side.
              <br /><br />
              <strong style={{ color: 'var(--imperial-gold)', fontSize: '1.3rem' }}>Will you be mine forever, Nimmu?</strong>
            </p>
            
            <div className="btn-wrapper">
              <button 
                className="base-btn btn-yes" 
                style={{ transform: `scale(${yesButtonScale})` }}
                onClick={(e) => handleYesClick(e, 3)}
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

      {/* PHASE 3: THE REVEAL */}
      {phase === 3 && (
        <div key="phase-3" className="phase-container">
          <div className="glass-card">
            <div className="gold-badge">🌙</div>
            <h1 className="anime-title">You're Incredible</h1>
            <p className="body-text">
              You really have no idea what you do to me, Nimmu. Thank you for your gorgeous smile, your wit, and for just being exactly who you are.
            </p>
            <div className="anime-note">
              "You know that look Jinshi gives Maomao? That utterly captivated, completely mesmerized look? Yeah... that's exactly how I look at you. Every single time." <br/><br/>— Yours, Gokul ❤️
            </div>
            <br />
            <button className="base-btn btn-yes" onClick={(e) => handleYesClick(e, 4)}>
              One Last Thing... 💫
            </button>
          </div>
        </div>
      )}

      {/* PHASE 4: CINEMATIC TRIBUTE WITH IMAGE[cite: 2] */}
      {phase === 4 && (
        <div key="phase-4" className="phase-container">
          <div className="glass-card phase-4-card">
            <div className="phase-4-content">
              
              <div className="anime-image-container">
                <img src="/jinshi-maomao.jpg" alt="Jinshi and Maomao" className="anime-image" />
              </div>

              <h1 className="tribute-title" style={{ fontSize: '4.5rem' }}>I Love You 3000</h1>
              <p className="tribute-subtitle">My favorite mystery & my perfect cure</p>
              
              <div className="body-text" style={{ fontStyle: 'italic', borderTop: '1.5px solid rgba(232, 197, 102, 0.3)', paddingTop: '25px', textAlign: 'left' }}>
                Honestly, Nimmu, I could spend a thousand lifetimes trying to figure you out, and I would love every single second of it. 
                <br /><br />
                You are the brightest part of my days, the reason I smile at my phone, and the only person I want holding my hand. Thank you for being my absolute favorite reality.
                <br /><br />
                <div style={{ textAlign: 'right' }}>
                  <strong style={{ color: 'var(--imperial-gold)', fontSize: '1.4rem' }}>— Gokul P Jith</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;