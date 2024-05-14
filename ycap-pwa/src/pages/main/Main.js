import React, { useState, useEffect } from 'react';
import './Main.css';
import chevron from '../../assets/chevron.png';
import burger from '../../assets/burger.png';
import VerticalMenu from '../../components/vertical-menu/verticalMenu';
import croix from '../../assets/croix.png';
import cloudHot from '../../assets/cloud-hot.png';
import cloudCold from '../../assets/cloud-cold.png';
import iconRed from '../../assets/icons-portail/icon-red.png';

function Main() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [temperature, setTemperature] = useState('hot');
    const [distance, setDistance] = useState(1000); 

    const updateTemperature = () => {
        setTemperature(distance < 500 ? 'hot' : 'cold');
    };

    const toggleTemperature = () => {
        setTemperature(prevTemperature => (prevTemperature === 'hot' ? 'cold' : 'hot'));
      };
    const temperatureClass = temperature === 'hot' ? 'hot' : 'cold';

    const handleToggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        updateTemperature();
    }, []);

    return (
        <div>
            <div className='background-main'>
                <div className={`background-${temperatureClass}`}>
                    <div className="header-main">
                        <div className="rectangle-left-main">
                            <div className="bullet-main">
                                <img src={iconRed} alt="icon-red" className='icon-red-img'/>
                            </div> 
                            <h4 className='header-title-main'>Red point</h4>
                        </div>
                        <div className={`rectangle-right-main header-btn-${temperatureClass}`}>
                            {temperature === 'hot' ? (
                                <h4 className='header-title-main'>Chaud !</h4>
                            ) : (
                                <h4 className='header-title-main'>Froid !</h4>
                            )}
                        </div>
                    </div>
                                        
                    <div className='boussole-img'>
                        <img src={chevron} alt=""/>
                    </div>
                </div>
                <div className='background-pink-section'>
                    <div className="left-zone">
                        <img src={croix} alt="" className="centered-image-croix-main" />
                    </div>
                    <div className="middle-zone">
                        {temperature === 'hot' ? (
                            <div>
                                <img src={cloudHot} alt="" className="centered-image-middle-main" />
                                <div className="text-overlay-main">{`Distance : ${distance} m`}</div>
                            </div>
                            
                        ) : (
                            <div>
                            <img src={cloudCold} alt="" className="centered-image-middle-main" />
                                <div className="text-overlay-main">{`Distance 2 : ${distance} m`}</div>
                            </div>
                        )}
                    </div>
                    <div className="right-zone">
                        <img src={croix} alt="" className="centered-image-croix-main" />
                    </div>
                </div>
                <footer className="footer-main">
                    <button className="footer-main-button" onClick={handleToggleMenu}>
                        <img src={burger} alt="" className="centered-image" />
                    </button>
                    <button className="footer-main-button central-main">ynov.com</button>
                    <button className="footer-main-button">i</button>
                </footer>
            </div>
            <VerticalMenu isOpen={menuOpen} onClose={handleToggleMenu} />
        </div>
        
    );
}

export default Main;
