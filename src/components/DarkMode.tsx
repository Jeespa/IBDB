import { useState, useEffect } from 'react';
import './DarkMode.css'

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleMode = () => {
    setIsDarkMode(!isDarkMode);
    console.log("mode switched")
  }
  
  useEffect(() => {
    const body = document.querySelector('body');
    if (isDarkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <button id='darkmode' onClick={handleToggleMode}>
      {isDarkMode ? <img src="/lightmode.png" alt="Toggle Light Mode" /> : <img src="/darkmode.png" alt="Toggle Dark Mode" />}
    </button>
  );
}

export default DarkModeToggle;