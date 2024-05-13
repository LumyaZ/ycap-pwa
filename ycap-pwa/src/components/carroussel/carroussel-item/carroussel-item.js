import './carroussel-item.css';
import React, { useState } from 'react';
import InfoPortail from '../../info-portail/infoPortail';
function CarouselItem() {

  const [showInfo, setShowInfo] = useState(false);

  const handleInfoClick = () => {
    console.log('ok')
    setShowInfo(true);
  };

  const handleCloseInfo = () => {
    setShowInfo(false);
  };

  return (
    <div className="carousel-item">
      <div className="square">
        <h3 className='item-title'>Red Point</h3>
        <button className='button-choice'>choisir</button>
      </div>
      <div className="small-square"></div>
      <div className="circle">
        <button className='button-info' onClick={handleInfoClick}>info</button>
      </div>
      {showInfo && <InfoPortail onClose={handleCloseInfo} />}
    </div>
  );
}

export default CarouselItem;
