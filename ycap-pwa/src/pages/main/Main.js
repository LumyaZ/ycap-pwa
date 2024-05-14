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

async function getUserLocation() {
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
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  }

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
    const [distance, setDistance] = useState('x');
    const [bearing, setBearing] = useState(0);
    const [dataPoi, setDataPoi] = useState(null);  
    const [location, setLocation] = useState(null);  
    const [showAR, setShowAR] = useState(false);

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
        console.log('test')
        setShowAR(true);
    };


    function calculateDistanceAndBearing(lat1, lon1, lat2, lon2) {
        const R = 6371e3;
        const φ1 = lat1 * Math.PI/180; 
        const λ1 = lon1 * Math.PI/180; 
        const φ2 = lat2 * Math.PI/180; 
        const λ2 = lon2 * Math.PI/180; 
    
        const Δφ = φ2 - φ1;
        const Δλ = λ2 - λ1;
    
        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                  Math.cos(φ1) * Math.cos(φ2) *
                  Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
        const distance = R * c;
    
        const y = Math.sin(Δλ) * Math.cos(φ2);
        const x = Math.cos(φ1)*Math.sin(φ2) -
                  Math.sin(φ1)*Math.cos(φ2)*Math.cos(Δλ);
        let bearing = Math.atan2(y, x) * 180/Math.PI;
    
        bearing = (bearing + 360) % 360;
        
        return { distance, bearing };
    }

    //code arjs
    <div>
        <div style={{margin: 0, overflow: 'hidden'}}>
            <script src='https://aframe.io/releases/0.9.2/aframe.min.js'></script>
            <script src="https://raw.githack.com/jeromeetienne/AR.js/master/aframe/build/aframe-ar.min.js"></script>
            <script src="https://raw.githack.com/donmccurdy/aframe-extras/master/dist/aframe-extras.loaders.min.js"></script>
            <script>
                THREEx.ArToolkitContext.baseURL = 'https://raw.githack.com/jeromeetienne/ar.js/master/three.js/'
            </script>
        </div>

        <a-scene
            vr-mode-ui="enabled: false"
            embedded
            arjs='sourceType: webcam; sourceWidth:1280; sourceHeight:960; displayWidth: 1280; displayHeight: 960; debugUIEnabled: false;'>
            
            <a-camera gps-camera rotation-reader></a-camera>
            <a-entity gltf-model=".\assets\portail\portal_1.gltf" rotation="0 90 0" scale="4 4 4" gps-entity-place="longitude: 3.065570; latitude: 50.640530;" animation-mixer/>
        </a-scene>
    </div>

    useEffect(() => {
        getUserLocation()
                .then(location => {
                    setLocation(location);                    
                    const {distance, bearing} = calculateDistanceAndBearing(location[0], location[1], dataPoi.Latitude, dataPoi.Longitude);
                    setDistance(distance.toFixed(0));
                    setBearing(bearing.toFixed(0));
                    updateTemperature(distance);
                })
                .catch(error => console.error('Error getting location:', error));
        const interval = setInterval(() => {
            getUserLocation()
                .then(location => {
                    setLocation(location);                    
                    const {distance, bearing} = calculateDistanceAndBearing(location[0], location[1], dataPoi.Latitude, dataPoi.Longitude);
                    setDistance(distance.toFixed(0));
                    setBearing(bearing.toFixed(0));
                    updateTemperature(distance);
                })
                .catch(error => console.error('Error getting location:', error));
        }, 3000);
        return () => clearInterval(interval);
    }, [location, dataPoi, distance, bearing]);

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

                    <button onClick={handleShowAR}>test</button>
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
                <div>
                    <div style={{margin: 0, overflow: 'hidden'}}>
                        <script src='https://aframe.io/releases/0.9.2/aframe.min.js'></script>
                        <script src="https://raw.githack.com/jeromeetienne/AR.js/master/aframe/build/aframe-ar.min.js"></script>
                        <script src="https://raw.githack.com/donmccurdy/aframe-extras/master/dist/aframe-extras.loaders.min.js"></script>
                        <script>
                            THREEx.ArToolkitContext.baseURL = 'https://raw.githack.com/jeromeetienne/ar.js/master/three.js/'
                        </script>
                    </div>
        
                    <a-scene
                        vr-mode-ui="enabled: false"
                        embedded
                        arjs='sourceType: webcam; sourceWidth:1280; sourceHeight:960; displayWidth: 1280; displayHeight: 960; debugUIEnabled: false;'>
                        
                        <a-camera gps-camera rotation-reader></a-camera>
                        <a-entity gltf-model=".\assets\portail\portal_1.gltf" rotation="0 90 0" scale="4 4 4" gps-entity-place="longitude: 3.065570; latitude: 50.640530;" animation-mixer/>
                    </a-scene>
                </div>
            )}
            <VerticalMenu isOpen={menuOpen} onClose={handleToggleMenu} />
        </div>
        
    );
}

export default Main;
