import React from 'react';
import './verticalMenu.css';
import arrow from '../../assets/arrow.png';
import iconRed from '../../assets/icons-portail/icon-red.png';

function VerticalMenu({ isOpen, onClose }) {

  const cityData = JSON.parse(localStorage.getItem('cityData'));


  return (
    <div className={`vertical-menu ${isOpen ? 'open' : ''}`}>
        <div className='header-menu'>
            <button onClick={onClose} className="arrow-button">
                <img src={arrow} alt="Fleche" className='img-arrow'/>
            </button>
            <h2 className="title-vertical-menu">Historique des découvertes</h2>
        </div>
        
        <ul className="history-list">
        {cityData && cityData.pois.map((poiName, index) => (
          <li key={index} className="history-item">
            <div className="bullet-main">
              <img src={iconRed} alt="icon-red" className='icon-red-img'/>
            </div> 
            <span style={{ margin: '10px 20px' }}>{cityData.cityName} - {poiName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VerticalMenu;
