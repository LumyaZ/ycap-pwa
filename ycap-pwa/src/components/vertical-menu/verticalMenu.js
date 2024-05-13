import React from 'react';
import './verticalMenu.css';
import arrow from '../../assets/arrow.png';

function VerticalMenu({ isOpen, onClose }) {
  return (
    <div className={`vertical-menu ${isOpen ? 'open' : ''}`}>
        <div className='header-menu'>
            <button onClick={onClose} className="arrow-button">
                <img src={arrow} alt="Fleche" className='img-arrow'/>
            </button>
            <h2 className="title-vertical-menu">Historique des découvertes</h2>
        </div>
        
        <ul className="history-list">
            <li className="history-item">
                <div className="bullet"></div> 
                <p className="item-text">Texte de l'item 1</p> 
            </li>
            <li className="history-item">
                <div className="bullet"></div> 
                <p className="item-text">Texte de l'item 2</p>
            </li>
            <li className="history-item">
                <div className="bullet"></div> 
                <p className="item-text">Texte de l'item 1</p> 
            </li>
            <li className="history-item">
                <div className="bullet"></div> 
                <p className="item-text">Texte de l'item 2</p>
            </li>
            <li className="history-item">
                <div className="bullet"></div> 
                <p className="item-text">Texte de l'item 1</p> 
            </li>
            <li className="history-item">
                <div className="bullet"></div> 
                <p className="item-text">Texte de l'item 2</p>
            </li>
            <li className="history-item">
                <div className="bullet"></div> 
                <p className="item-text">Texte de l'item 1</p> 
            </li>
            <li className="history-item">
                <div className="bullet"></div> 
                <p className="item-text">Texte de l'item 2</p>
            </li>
            <li className="history-item">
                <div className="bullet"></div> 
                <p className="item-text">Texte de l'item 1</p> 
            </li>
            <li className="history-item">
                <div className="bullet"></div> 
                <p className="item-text">Texte de l'item 2</p>
            </li>
            <li className="history-item">
                <div className="bullet"></div> 
                <p className="item-text">Texte de l'item 1</p> 
            </li>
            <li className="history-item">
                <div className="bullet"></div> 
                <p className="item-text">Texte de l'item 2</p>
            </li>
        </ul>
    </div>
  );
}

export default VerticalMenu;
