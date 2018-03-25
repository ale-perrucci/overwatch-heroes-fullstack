import React from 'react';

const Ability = (props) => {
  const { ability } = props;

  return (
    <div className="Ability">
      <div className="Ability__image-container" >
        <img className="Ability__image" src={ability.image} alt={ability.name}/>
      </div>
      <div className="Ability__body">
        <h1 className="Ability__name">{ability.name}</h1>
        <p className="Ability__description">{ability.description}</p>
      </div>
    </div>
  );
}

export default Ability;