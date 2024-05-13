import React from 'react';
import './Home.css';
import Concept from '../../components/concept/concept';
import Carroussel from '../../components/carroussel/carroussel';
import indicatorchoix from '../../assets/indicatorChoix.png';
import croix from '../../assets/croix.png';
import headHome from '../../assets/headHome.png';
import burger from '../../assets/burger.png';
import InfoPortail from '../../components/info-portail/infoPortail.js';

function Home() {
  return (
    <div>
      <div className="background">
        <div className="blue-section">
          <div className="header">
            <h2 className='header-title'>Hello there !</h2>
          </div>
          <Concept/>
        </div>
        <div className="dark-blue-section">
          <Carroussel />
        </div>
        <div className="pink-section">
          <div className="left-zone">
            <img src={croix} alt="" className="centered-image" />
          </div>
          <div className="middle-zone">
            <img src={indicatorchoix} alt="" className="centered-image-middle" />
            <img src={headHome} alt="" className='headHome-position'/>
            <div className="text-overlay">Choisis un easter egg</div>
          </div>
          <div className="right-zone">
            <img src={croix} alt="" className="centered-image" />
          </div>
        </div>

        <footer className="footer">
          <button className="footer-button">
            <img src={burger} alt="" className="centered-image" />
          </button>
          <button className="footer-button central">ynov.com</button>
          <button className="footer-button">i</button>
        </footer>
      </div>
      <InfoPortail title="Titre de l'Info" />
    </div>
  );
}

export default Home;
