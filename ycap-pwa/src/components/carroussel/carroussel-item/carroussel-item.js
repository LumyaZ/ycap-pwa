import './carroussel-item.css';
import React from 'react';

function CarouselItem({ onInfoClick }) {

  const handleInfoClick = () => {
    console.log("ok")
    onInfoClick(); 
  };

  return (
    <div className="carousel-item">
      <div className="square">
        <h3 className='item-title'>Red Point</h3>
        <button className='button-choice'>choisir</button>
      </div>
      <div className="small-square"></div>
      <button className="circle" onClick={handleInfoClick}>info</button>
    </div>
  );
}

export default CarouselItem;
