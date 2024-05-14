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

async function loadUserCities() {
  try {
    const response = await fetch(
      `http://localhost:3000/cities/`,
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

async function loadUserPOISById() {
  try {
    const response = await fetch(
      `http://localhost:3000/pois/bycity/1`,
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

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [infoPortailOpen, setInfoPortailOpen] = useState(false);
  const [poisData, setPoisData] = useState([]);
  const [selectedPoiId, setSelectedPoiId] = useState(null); 
  const [poiData, setPoiData] = useState(null);
  const [historyData, setHistoryData] = useState([]);

  const handleToggleMenu = () => {

    /*const ville = 'NomDeVotreVille';
    const poi = 'NomDeVotrePOI';

    localStorage.setItem('ville', ville);
    localStorage.setItem('poi', poi);

    const storedVille = localStorage.getItem('ville');
    const storedPOI = localStorage.getItem('poi');

    if (storedVille && storedPOI) {
      setHistoryData([{ ville: storedVille, poi: storedPOI }]);
    }*/

    setMenuOpen(!menuOpen);
  };

  const handleToggleInfoPortail = async (poiId) => {
    setSelectedPoiId(poiId); 
    setInfoPortailOpen(!infoPortailOpen); 

    const data = await loadPOIById(poiId);
    setPoiData(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadUserPOISById();
      await loadUserCities();
      console.log(data)
      setPoisData(data);
    };
    fetchData();
  }, []);

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
              {poisData.map((poi) => (
                <CarouselItem key={poi.ID} poi={poi} onInfoClick={handleToggleInfoPortail}/>
              ))}
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
