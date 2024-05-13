import React, { useState }  from 'react';
import './Home.css';
import Concept from '../../components/concept/concept';
import indicatorchoix from '../../assets/indicatorChoix.png';
import croix from '../../assets/croix.png';
import headHome from '../../assets/headHome.png';
import burger from '../../assets/burger.png';
import VerticalMenu from '../../components/vertical-menu/verticalMenu';
import arrow from '../../assets/arrow.png';
import CarouselItem from '../../components/carroussel/carroussel-item/carroussel-item.js';
import InfoPortail from '../../components/info-portail/infoPortail.js';

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [infoPortailOpen, setInfoPortailOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleToggleInfoPortail = () => {
    console.log('dqdqdqdqd')
    setInfoPortailOpen(!infoPortailOpen);
  };

  return (
    <div>
      <div className="background">
        <div className="blue-section">
          <div className="header">
            <h2 className='header-title'>Hello there !</h2>
            <img src={arrow} alt="arrow" className='img-arrow-home'/>
          </div>
          <Concept/>
        </div>
        <div className="dark-blue-section">
          <div className='carroussel-position'>
            <div className="carroussel-scrolling">
              <CarouselItem onInfoClick={handleToggleInfoPortail}/>
              <CarouselItem onInfoClick={handleToggleInfoPortail}/>
              <CarouselItem onInfoClick={handleToggleInfoPortail}/>
              <CarouselItem onInfoClick={handleToggleInfoPortail}/>
              <CarouselItem onInfoClick={handleToggleInfoPortail}/>
              <CarouselItem onInfoClick={handleToggleInfoPortail}/>
            </div>
          </div>
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
          <button className="footer-button" onClick={handleToggleMenu}>
            <img src={burger} alt="" className="centered-image" />
          </button>
          <button className="footer-button central">ynov.com</button>
          <button className="footer-button">i</button>
        </footer>
        <VerticalMenu isOpen={menuOpen} onClose={handleToggleMenu} />
        <InfoPortail isOpen={infoPortailOpen} onClose={handleToggleInfoPortail} />

      </div>
    </div>
  );
}

export default Home;
