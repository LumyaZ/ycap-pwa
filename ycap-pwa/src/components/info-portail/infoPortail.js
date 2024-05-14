import './infoPortail.css';
import React from 'react';
import iconsRedCircle from '../../assets/icons-portail/icons-red-circle.png';

function InfoPortail({ isOpen, onClose }) {
  return (
    <div className={`info-portail ${isOpen ? 'open' : ''}`}>
      <div className="blue-background"></div>
      <div className="pink-background">
        <div className="info-box">
          <img src={iconsRedCircle} alt="" className='img-info-portail'/>

          <button className="close-button-info" onClick={onClose}><span className='circle-close-button-info'>X</span></button>
          <h2 className='title-info-portail'>Titre </h2>
          <p className='content-info-portail'>Contenu </p>
        </div>
      </div>
    </div>
  );
}

export default InfoPortail;
