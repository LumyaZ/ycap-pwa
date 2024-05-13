import React, { useState } from 'react';
import './Main.css';
import chevron from '../../assets/chevron.png';

function Main() {
    const [temperature, setTemperature] = useState('hot');

    const toggleTemperature = () => {
        setTemperature(prevTemperature => (prevTemperature === 'hot' ? 'cold' : 'hot'));
      };

    const temperatureClass = temperature === 'hot' ? 'hot' : 'cold';


    return (
        <div className={`background background-${temperatureClass}`}>
            <div onClick={toggleTemperature}>
                {temperature === 'hot' ? 'Il fait chaud !' : 'Il fait froid !'}
            </div>
            <img src={chevron} alt="" />
        </div>
    );
}

export default Main;
