import React from 'react';
import './carroussel.css';
import CarouselItem from './carroussel-item/carroussel-item';

function Carroussel() {

  return (
    <div className='carroussel-position'>
      <div className="carroussel-scrolling">
        <CarouselItem />
      </div>
    </div>
    
  );
}

export default Carroussel;
