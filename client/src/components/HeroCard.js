import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const HeroCard = (props) => {
  const { hero } = props;
  const bgImage = hero.portrait;
  const portrait = hero.portrait_small;

  function printStars(difficulty) {
    const array = [];
    for(let i = 1; i <= 3; i++)
      array.push(difficulty >= i ? <span key={i} className="Star"/> : <span key={i} className="Star Star--empty"/>);
    
    return (
      <Fragment>
        {array}
      </Fragment>
    );
  }


  return (
    <div className="HeroCard" >
      <div className="HeroCard__background" style={{backgroundImage:`url(${bgImage})`}} />
      <div className="HeroCard__header">
        <Link to={`/heroes/${hero.name_plain}`}><img className="Portrait" src={portrait} alt={`${hero.name} portrait`} /></Link>
        <h1 className="HeroCard__name" ><Link to={`/heroes/${hero.name_plain}`}>{hero.name}</Link></h1>
        <div>
          <h1 className="Subtitle">Difficulty</h1>
          <div>
            {printStars(hero.difficulty)}
          </div>
          <div className="HeroCard__role">
            <h1 className="Subtitle" style={{display: "inline-block"}}>Role</h1>
            <img className="RoleIcon" src={require(`../images/${hero.role}Icon.png`)} alt={hero.role}></img>
          </div>
        </div>
      </div>
      <div className="HeroCard__description">
        <p>{hero.description}</p>
      </div>
      <div className="HeroCard__button-container">
          <Link className="Button" to={`/heroes/${hero.name_plain}`}>Details</Link>
        </div>
    </div>
  );
};

export default HeroCard;