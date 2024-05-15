import React from "react";
import headHome from "../../assets/headHome.png";
import "./cardEasterEgg.css";

function CardEasteregg({ onInfoClick, isConditionCard, requestLocationPermission }) {
  const data = [
    {
      condition: true,
      description: "Nous n'avons pas disseminé d'easter eggs dans votre ville, mais cela ne saurait tarder !",
      buttons: [
        {
          label: 'Actualiser',
          onClick: onInfoClick
        }
      ]
    },
    {
      condition: false, 
      description: "Aïe !<br />Autorise l'accès à ta position afin de bénéficier d'une<br />expérience optimale !",
      buttons: [
        {
          label: 'Autoriser',
          onClick: requestLocationPermission,
        },
        {
          label: 'Ne pas autoriser',
          onClick: () => {}, 
        }
      ]
    }
  ];

  const currentData = data.find(item => item.condition === isConditionCard);

  return (
    <div className="card">
      <img className="image" src={headHome} alt="head home" />
      <div className="content">
        <p className="desc" dangerouslySetInnerHTML={{ __html: currentData.description }} />
        {currentData.buttons.map((button, index) => (
          <button key={index} className="button" onClick={button.onClick}>
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CardEasteregg;
