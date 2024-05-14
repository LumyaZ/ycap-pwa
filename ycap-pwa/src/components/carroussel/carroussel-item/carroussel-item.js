import './carroussel-item.css';
import React, { useEffect, useState }  from 'react';
import { Link } from 'react-router-dom';
import iconsRedCircle from '../../../assets/icons-portail/icons-red-circle.png';
import iconRed from '../../../assets/icons-portail/icon-red.png';


function CarouselItem({ poi, onInfoClick }) {
  const handleInfoClick = () => {
    onInfoClick(poi.ID); 
  };



  return (
    <div className="carousel-item">
      <div className="square">
        <div className='txt-item'>
          <span className='item-title' title={poi.Name}>{poi.Name}</span >
        </div>
        
        <Link to="/main" className='button-choice'>choisir</Link>
      </div>
      <div className="small-square">
        <div className="bullet-main">
          <img src={iconRed} alt="icon-red" className='icon-red-img'/>
        </div> 
      </div>
      <button className="circle" onClick={handleInfoClick}>info</button>
    </div>
  );
}

export default CarouselItem;
