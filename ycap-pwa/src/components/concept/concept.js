import React from 'react';
import './concept.css';

function Concept() {
  return (
    <div className="concept-container">
      <div className="concept-header">
        <h2  className='concept-header-title'>Concept</h2>
      </div>
      <div className="concept-content">
        <div className="sub-concept-1">
            <span className="sub-concept-number-1">1</span>
            <span className="sub-concept-txt">Texte du sous-concept 1</span>           
        </div>
        <div className="sub-concept-2">
          <span className="sub-concept-number-2">2</span> 
          <span className="sub-concept-txt">Texte du sous-concept 2</span>           
        </div>
        <div className="sub-concept-3">
          <span className="sub-concept-number-3">3</span> 
          <span className="sub-concept-txt">Texte du sous-concept 3</span>           
        </div>
      </div>
    </div>
  );
}

export default Concept;
