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
import WebcamCapture from '../WebcamCapture/WebcamCapture';
import ThreeScene from '../ThreeScene/ThreeScene';

async function getUserLocation() {
  const options = {
    enableHighAccuracy: true,
    timeout: 1000,
    maximumAge: 0,
  };
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          resolve([position.coords.latitude, position.coords.longitude]);
        },
        function(error) {
          let errorMessage;
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "User denied the request for Geolocation.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage = "The request to get user location timed out.";
              break;
            case error.UNKNOWN_ERROR:
              errorMessage = "An unknown error occurred.";
              break;
            default:
              errorMessage = "An unknown error occurred.";
          }
          reject(new Error(errorMessage));
        },
        options
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}

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
  const [distance, setDistance] = useState('x');
  const [bearing, setBearing] = useState(0);
  const [dataPoi, setDataPoi] = useState(null);  
  const [location, setLocation] = useState(null);  
  const [showAR, setShowAR] = useState(false);
  const webcamRef = useRef(null);

  const updateTemperature = (distance) => {
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
        const dataPoi = await loadPOIById(id);
        setDataPoi(dataPoi)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const handleShowAR = () => {
    console.log("euh")
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
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = (R * c) * 1000; // Distance in meters
    return { distance };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getUserLocation()
        .then(location => {
          setLocation(location);
          console.log(dataPoi)               
          const { distance } = calculateDistance(location[0], location[1], dataPoi.Latitude, dataPoi.Longitude);
          setDistance(distance.toFixed(0));
          updateTemperature(distance);
        })
        .catch(error => console.error('Error getting location:', error));
    }, 1000);
    return () => clearInterval(interval);
  }, [location, dataPoi, distance, bearing]);

  useEffect(() => {
    const updateBearing = () => {
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

        setBearing(angle);
      }
    };

    updateBearing();
  }, [location, dataPoi]);

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
                                      
          <div className='boussole-img' >
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
          <button className="footer-main-button central-main">ynov.com</button>
          <button className="footer-main-button">i</button>
        </footer>
      </div>
      {showAR && (
        <div className="ar-container">
          <WebcamCapture ref={webcamRef} />
          <ThreeScene modelUrl="../../assets/portail/portal_1.gltf" />
        </div>
      )}
      <VerticalMenu isOpen={menuOpen} onClose={handleToggleMenu} />
    </div>
  );
}

export default Main;
