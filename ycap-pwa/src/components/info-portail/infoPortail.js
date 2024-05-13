import './infoPortail.css';
import React from 'react';

function InfoPortail({ onClose }) {

  

  return (
    <div className="info-portail">
      <div className="info-header">
        <h2>Titre de l'Info</h2>
        <button onClick={onClose}>Fermer</button>
      </div>
      <div className="info-content">
        Contenu de l'info
      </div>
    </div>
  );
}

export default InfoPortail;
