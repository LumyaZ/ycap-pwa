import React, { useState, useEffect, useRef } from 'react';
import './Main.css';
import chevron from '../../assets/chevron.png';
import burger from '../../assets/burger.png';
import VerticalMenu from '../../components/vertical-menu/verticalMenu';
import croix from '../../assets/croix.png';
import cloudHot from '../../assets/cloud-hot.png';
import cloudCold from '../../assets/cloud-cold.png';
import iconRed from '../../assets/icons-portail/icon-red.png';
import { useParams } from 'react-router-dom';
import WebcamCapture from '../../components/WebcamCapture/WebcamCapture';
import ThreeScene from '../../components/ThreeScene/ThreeScene';

async function loadPOIById(selectedPoiId) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/pois/${selectedPoiId}`,
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
    return data;
  } catch (error) {
    console.error(error);
  }
}

function Main() {
  const { id } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [temperature, setTemperature] = useState('hot');
  const [distance, setDistance] = useState('x');
  const [bearing, setBearing] = useState(0);
  const [dataPoi, setDataPoi] = useState(null);  
  const [location, setLocation] = useState(null);  
  const [showAR, setShowAR] = useState(false);
  const watchId = useRef(null);

  const updateTemperature = (distance) => {
    setTemperature(distance < 500 ? 'hot' : 'cold');
  };

  const temperatureClass = temperature === 'hot' ? 'hot' : 'cold';

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPoi = await loadPOIById(id);
        setDataPoi(dataPoi);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const handleShowAR = () => {
    const cityDataStr = localStorage.getItem('cityData');
    if (cityDataStr) {
      const cityData = JSON.parse(cityDataStr);
      if (!cityData.pois.includes(dataPoi.Name)) {
        cityData.pois.push(dataPoi.Name);
        localStorage.setItem('cityData', JSON.stringify(cityData));
      }
    }
    setShowAR(true);
  };

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = (R * c) * 1000;
    return { distance };
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 1000,
      maximumAge: 0
    };

    watchId.current = navigator.geolocation.watchPosition(
      (position) => {
        const location = [position.coords.latitude, position.coords.longitude];
        setLocation(location);

        if (dataPoi) {
          const { distance } = calculateDistance(location[0], location[1], dataPoi.Latitude, dataPoi.Longitude);
          setDistance(distance.toFixed(0));
          updateTemperature(distance);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
      },
      options
    );

    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    };
  }, [dataPoi]);

  useEffect(() => {
    const handleOrientation = (event) => {
      const alpha = event.alpha;
      if (alpha !== null) {
        if (location && dataPoi) {
          const userLat = location[0];
          const userLng = location[1];
          const poiLat = dataPoi.Latitude;
          const poiLng = dataPoi.Longitude;

          const deltaLng = poiLng - userLng;
          const y = Math.sin(deltaLng) * Math.cos(poiLat);
          const x = Math.cos(userLat) * Math.sin(poiLat) -
            Math.sin(userLat) * Math.cos(poiLat) * Math.cos(deltaLng);
          let angle = Math.atan2(y, x);

          angle = angle * (180 / Math.PI);
          angle = (angle + 360) % 360;

          const heading = (alpha + angle) % 360;

          setBearing(heading);
        }
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [location, dataPoi]);

  const handleRedirect = () => {
    window.location.href = 'https://www.ynov.com';
  };

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
            <img src={chevron} alt="" style={{ transform: `rotate(${bearing}deg)` }}/>
          </div>

          {distance < 30 && (
            <button onClick={handleShowAR} className="ar-button">Cherchez le portail !</button>
          )}
        </div>
        <div className='background-pink-section'>
          <div className="left-zone">
            <img src={croix} alt="" className="centered-image-croix-main" />
          </div>
          <div className="middle-zone">
            {temperature === 'hot' ? (
              <div>
                <img src={cloudHot} alt="" className="centered-image-middle-main" />
                <div className="text-overlay-main">{`${distance} m, continuez !`}</div>
              </div>
            ) : (
              <div>
                <img src={cloudCold} alt="" className="centered-image-middle-main" />
                <div className="text-overlay-main">{`${distance} m, trop loin !`}</div>
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
          <button className="footer-main-button central-main" onClick={handleRedirect}>ynov.com</button>
          <button className="footer-main-button">i</button>
        </footer>
      </div>
      {showAR && (
        <div className="ar-container">
          <WebcamCapture />
          <ThreeScene modelUrl="/models/orb.glb" spawnModelUrl="/models/batiment.glb" />
          <button onClick={() => setShowAR(false)} className="close-button">Close AR</button>
        </div>
      )}

      <VerticalMenu isOpen={menuOpen} onClose={handleToggleMenu} />
    </div>
  );
}

export default Main;
