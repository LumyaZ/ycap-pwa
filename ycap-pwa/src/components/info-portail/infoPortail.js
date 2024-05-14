import './infoPortail.css';
import React, { useEffect, useState }  from 'react';
import iconsRedCircle from '../../assets/icons-portail/icons-red-circle.png';



function InfoPortail({ isOpen, onClose, selectedPoiId, poiData }) {
 


  return (
    <div className={`info-portail ${isOpen ? 'open' : ''}`}>
      <div className="blue-background"></div>
      <div className="pink-background">
        <div className="info-box">
          <img src={iconsRedCircle} alt="" className='img-info-portail'/>
          
          <button className="close-button-info" onClick={onClose}><span className='circle-close-button-info'>X</span></button>
          <h2 className='title-info-portail'>{poiData.Name}</h2>
          <p className='content-info-portail'>{poiData.Description}</p>
        </div>
      </div>
    </div>
  );
}

export default InfoPortail;
