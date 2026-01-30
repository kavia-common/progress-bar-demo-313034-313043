import React from 'react';
import './ProgressBar.css';

// PUBLIC_INTERFACE
/**
 * ProgressBar component with smooth animation and theme support
 * @param {number} value - Progress value from 0 to 100
 * @param {boolean} isAnimating - Whether the progress bar is currently animating
 * @param {number} duration - Animation duration in milliseconds (default: 3000)
 * @param {function} onComplete - Callback function called when animation completes
 */
const ProgressBar = ({ 
  value = 0, 
  isAnimating = false, 
  duration = 3000, 
  onComplete 
}) => {
  const progressStyle = {
    width: `${Math.min(100, Math.max(0, value))}%`,
    transition: isAnimating ? `width ${duration}ms ease-out` : 'none'
  };

  // Call onComplete when animation finishes
  React.useEffect(() => {
    if (isAnimating && value >= 100 && onComplete) {
      const timer = setTimeout(onComplete, duration);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, value, duration, onComplete]);

  return (
    <div className="progress-container">
      <div className="progress-label">
        <span className="progress-text">Progress</span>
        <span className="progress-percentage">{Math.round(value)}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={progressStyle}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
