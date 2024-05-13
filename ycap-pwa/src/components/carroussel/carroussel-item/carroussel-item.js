import './carroussel-item.css';
import React from 'react';
import { Link } from 'react-router-dom';

function CarouselItem({ onInfoClick }) {
  const handleInfoClick = () => {
    onInfoClick(); 
  };

  return (
    <div className="carousel-item">
      <div className="square">
        <h3 className='item-title'>Red Point</h3>
        <Link to="/main" className='button-choice'>choisir</Link>
      </div>
      <div className="small-square"></div>
      <button className="circle" onClick={handleInfoClick}>info</button>
    </div>
  );
}

export default CarouselItem;
