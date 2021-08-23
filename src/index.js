import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calculator from './calculator';
import icons from './icons';

ReactDOM.render(
  <React.StrictMode>
    <Calculator />
    <div className="foot">
      <p>Developed by Francisco Ramalho</p>
      <div className="links">
        <a target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" href="https://linkedin.com/in/francisco-lapão-ramalho-8b882616b"><icons.LinkedIn /></a>
        <a target="_blank" rel="noopener noreferrer" aria-label="GitHub" href="https://github.com/FRamalh0"><icons.GitHub /></a>
      </div>
    </div>
    
  </React.StrictMode>,
  document.getElementById('root')
);