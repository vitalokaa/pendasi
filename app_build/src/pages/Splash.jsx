import React, { useEffect } from 'react';
import './Splash.css';
import logo from '../assets/logo.png';
import bg from '../assets/bg.png';

export default function Splash({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2600);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="splash">
      <div className='splash-logo-content'>
        <div>
          <img src={logo} alt="Pendasi" className="splash-logo-img" />
        </div>
        <div className="splash-loader">
          <div className="splash-loader-bar" />
        </div>
      </div>
    </div>
  );
}
