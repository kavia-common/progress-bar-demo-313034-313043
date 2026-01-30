import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // PUBLIC_INTERFACE
  const startProgress = () => {
    setIsAnimating(true);
    setProgress(100);
  };

  // PUBLIC_INTERFACE
  const handleProgressComplete = () => {
    setIsAnimating(false);
    // Reset after a short delay to show completion
    setTimeout(() => {
      setProgress(0);
    }, 1000);
  };

  // PUBLIC_INTERFACE
  const resetProgress = () => {
    setIsAnimating(false);
    setProgress(0);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        
        <div className="progress-card">
          <h1 className="card-title">Progress Bar Demo</h1>
          <p className="card-subtitle">
            Click the button below to start the progress animation
          </p>
          
          <ProgressBar
            value={progress}
            isAnimating={isAnimating}
            duration={3000}
            onComplete={handleProgressComplete}
          />
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              className="start-button"
              onClick={startProgress}
              disabled={isAnimating}
              style={{ flex: 1 }}
            >
              {isAnimating ? 'Running...' : 'Start Progress'}
            </button>
            <button 
              className="start-button"
              onClick={resetProgress}
              disabled={isAnimating}
              style={{ 
                flex: '0 0 auto', 
                backgroundColor: 'var(--text-secondary)',
                minWidth: '80px'
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
