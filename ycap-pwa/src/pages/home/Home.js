import React from 'react';
import './Home.css';
import Concept from '../../components/concept/concept';

function Home() {
  return (
    <div>
      <div className="background">
        <div className="blue-section">
          <div className="header">
            <h2 className='header-title'>Titre du Header</h2>
          </div>
          <Concept/>
        </div>
        <div className="dark-blue-section"></div>
        <div className="pink-section"></div>


        
        <footer className="footer">
          <button className="footer-button">Bouton 1</button>
          <button className="footer-button central">Bouton 2</button>
          <button className="footer-button">Bouton 3</button>
        </footer>
      </div>
    </div>
  );
}

export default Home;
