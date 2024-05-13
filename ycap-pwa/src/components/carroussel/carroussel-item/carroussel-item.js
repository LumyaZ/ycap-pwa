import React from 'react';
import './carroussel-item.css';

function CarouselItem() {
  return (
    <div className="carousel-item">
      <div className="square">
        <h3 className='item-title'>Red Point</h3>
        <button className='button-choice'>choisir</button>
      </div>
      <div className="small-square"></div>
      <div className="circle">
        <button className='button-info'>info</button>
      </div>
    </div>
  );
}

export default CarouselItem;
