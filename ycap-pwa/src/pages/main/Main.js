import React, { useState, useEffect } from 'react';
import './Main.css';
import chevron from '../../assets/chevron.png';
import burger from '../../assets/burger.png';
import VerticalMenu from '../../components/vertical-menu/verticalMenu';
import croix from '../../assets/croix.png';
import cloudHot from '../../assets/cloud-hot.png';
import cloudCold from '../../assets/cloud-cold.png';
import iconRed from '../../assets/icons-portail/icon-red.png';
import { useParams } from 'react-router-dom';


async function loadPOIById(selectedPoiId) {
    try {
      const response = await fetch(
        `http://localhost:3000/pois/${selectedPoiId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        }
      );
  
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des informations utilisateur.');
      }
      
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error(error);
    }
  }

function Main() {
    const { id } = useParams();

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
        const fetchData = async () => {
            try {
                const data = await loadPOIById(id);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
        updateTemperature();
    }, [id]);

    useEffect(() => {
        const {distance, bearing} = calculateDistanceAndBearing(50.634970, 3.058020, 50.635281, 3.058740);
        console.log(distance);
        console.log(1);
        console.log(2);

        console.log(bearing);
    }, []);

    function calculateDistanceAndBearing(lat1, lon1, lat2, lon2) {
        const R = 6371e3; // Earth's radius in meters
        const φ1 = lat1 * Math.PI/180; // Convert latitude from degrees to radians
        const λ1 = lon1 * Math.PI/180; // Convert longitude from degrees to radians
        const φ2 = lat2 * Math.PI/180; // Convert latitude from degrees to radians
        const λ2 = lon2 * Math.PI/180; // Convert longitude from degrees to radians
    
        const Δφ = φ2 - φ1;
        const Δλ = λ2 - λ1;
    
        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                  Math.cos(φ1) * Math.cos(φ2) *
                  Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
        const distance = R * c; // in meters
    
        const y = Math.sin(Δλ) * Math.cos(φ2);
        const x = Math.cos(φ1)*Math.sin(φ2) -
                  Math.sin(φ1)*Math.cos(φ2)*Math.cos(Δλ);
        let bearing = Math.atan2(y, x) * 180/Math.PI;
    
        // Normalize to 0-360
        bearing = (bearing + 360) % 360;
    
        return { distance, bearing };
    }

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
