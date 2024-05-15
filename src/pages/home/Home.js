import React, { useEffect, useState } from 'react';
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
import CardEasteregg from '../../components/cardEasterEgg/cardEasterEgg.js';

  async function loadCities() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/cities/`,
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

  async function loadPOISById(poisId) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/pois/${poisId}`,
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

  async function loadPOISByCityId(cityId) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/pois/bycity/${cityId}`,
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


  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; 
    console.log(distance)
    return distance;
  }


function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [infoPortailOpen, setInfoPortailOpen] = useState(false);
  const [poisData, setPoisData] = useState([]);
  const [selectedPoiId, setSelectedPoiId] = useState(null); 
  const [poiData, setPoiData] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [error, setError] = useState(false);
  const [isConditionCard, setIsConditionCard] = useState(false);


    const handleToggleMenu = () => {
      setMenuOpen(!menuOpen);
    };

    const handleToggleInfoPortail = async (poiId) => {
      const data = await loadPOISById(poiId);
      setPoiData(data);
      setSelectedPoiId(poiId); 
      setInfoPortailOpen(!infoPortailOpen); 
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const loca = await getUserLocation();
    
          localStorage.setItem('userLatitude', loca[0]);
          localStorage.setItem('userLongitude', loca[1]);
    
          const cities = await loadCities();

    
          const filteredCities = cities.filter(city => {
            const distance = calculateDistance(loca[0], loca[1], city.Latitude, city.Longitude);
            return distance <= city.Reach;
          });
    
          if (filteredCities.length === 0) {
            setError(true)
            setIsConditionCard(true)
          }
    
          if (filteredCities.length > 0) {
            const pois = await loadPOISByCityId(filteredCities[0].ID);
            setPoisData(pois);
            setError(false)
            const city = filteredCities[0];
            const cityData = {
              cityName: city.CityName,
              pois: []
            };
            const existingCityDataStr = localStorage.getItem('cityData');
            if (!existingCityDataStr) {
                localStorage.setItem('cityData', JSON.stringify(cityData));
            }
          }
          

        }catch (error) {
          if (error === 1) { 
            setError(true);
            setIsConditionCard(false)
          }if(error ===2){
            setError(true)
            setIsConditionCard(true)
          }
          if(error === 3){
            setError(true)
          }
        }
      };
      fetchData();
    }, []); 
    
    const requestLocationPermission = async () => {
      try {
        const loca = await getUserLocation();
    
          localStorage.setItem('userLatitude', loca[0]);
          localStorage.setItem('userLongitude', loca[1]);
    
          const cities = await loadCities();
    
          const filteredCities = cities.filter(city => {
            const distance = calculateDistance(loca[0], loca[1], city.Latitude, city.Longitude);
            return distance <= city.Reach;
          });
    
          if (filteredCities.length === 0) {
            setError(true)
            setIsConditionCard(true)
          }
    
          if (filteredCities.length > 1) {
            alert("Plusieurs villes");
          }
    
          if (filteredCities.length === 1) {
            const pois = await loadPOISByCityId(filteredCities[0].ID);
            setPoisData(pois);
            setError(false)
            const city = filteredCities[0];
            const cityData = {
              cityName: city.CityName,
              pois: pois.map(poi => poi.Name)
            };
            localStorage.setItem('cityData', JSON.stringify(cityData));

          }
        setError(false);
      } catch (error) {
        setError(error);
      }
    };

    return (
      <div>
        <div className="background">
          {!error &&  (
          <div className="blue-section">
            <div className="header">
              <h2 className='header-title'>Helloaaaaaaaaaa there !</h2>
              <img src={arrow} alt="arrow" className='img-arrow-home'/>
            </div>
            <Concept/>
          </div>
          )}
          
          {!error  && (
          <div className="dark-blue-section">
            <div className='carroussel-position'>
              <div className="carroussel-scrolling">
                {poisData && poisData.map((poi) => (
                  <CarouselItem key={poi.ID} poi={poi} onInfoClick={handleToggleInfoPortail}/>
                ))}
              </div>
            </div>
          </div>
          )}
          {!error && (
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
          )}
          {error && (
            <div className="blue-section-with-error">
              <div className="header">
                <h2 className='header-title'>Hello there !</h2>
                <img src={arrow} alt="arrow" className='img-arrow-home'/>
              </div>
              <Concept/>
            </div>
          )}
          {error && (
            <div className='card-background'>
              <CardEasteregg isConditionCard={isConditionCard} requestLocationPermission={requestLocationPermission}/>
            </div>
          )}


        <footer className="footer">
          <button className="footer-button" onClick={handleToggleMenu}>
            <img src={burger} alt="" className="centered-image" />
          </button>
          <button className="footer-button central">ynov.com</button>
          <button className="footer-button">i</button>
        </footer>
        <VerticalMenu isOpen={menuOpen} onClose={handleToggleMenu} historyData={historyData}/>
        {infoPortailOpen && (
          <InfoPortail 
            isOpen={infoPortailOpen} 
            onClose={() => setInfoPortailOpen(false)} 
            selectedPoiId={selectedPoiId}  
            poiData={poiData}
          />
        )}
      </div>
    </div>
  );
}

  export default Home;
