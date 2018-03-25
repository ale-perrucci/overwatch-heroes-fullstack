import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Ability from './Ability';

class HeroPage extends Component {
  state = { hero: null };

  componentDidMount() {
    axios.get(`/api/heroes/${this.props.match.params.name}`)
    .then(res => {
      this.setState({ hero: res.data });
    })
    .catch(error => {
      console.log(error);
    });
  }

  printStars(difficulty) {
    const array = [];
    for(let i = 1; i <= 3; i++)
      array.push(difficulty >= i ? <span key={i} className="Star"/> : <span key={i} className="Star Star--empty"/>);
    
    return (
      <Fragment>
        {array}
      </Fragment>
    );
  }

  render() {
    const { hero } = this.state;
    
    if (!hero) {
      return null;
    }

    const portrait = hero.portrait_small;

    return (
      <div className="HeroPage">
        <div className="HeroPage__container">
          
          <div className="HeroPage__header">
            <img className="Portrait" src={portrait} alt={`${hero.name} portrait`} />
            <h1 className="HeroCard__name" >{hero.name}</h1>
          </div>
          
          <div style={{display:"flex", justifyContent:"space-between"}}>
            <div>
              <h1 className="Subtitle">Difficulty</h1>
              <div>
                {this.printStars(hero.difficulty)}
              </div>
            </div>
            <div>
              <h1 className="Subtitle" style={{display: "block", textAlign: "right"}}>Role</h1>
              <div className="HeroPage__role">
                <h2 style={{display: "inline-block"}}>{hero.role}</h2>
                <img className="RoleIcon" src={require(`../images/${hero.role}Icon.png`)} alt={hero.role}></img>
              </div>
            </div>
          </div>
        
          <div>
            <p className="HeroPage__description">{hero.description}</p>
          </div>

          <div>
            <h1 className="Subtitle" style={{textAlign: "left"}}>Abilities</h1>
            {hero.abilities.map(a => <Ability key={a.name} ability={a} />)}
          </div>
        </div>


        <div className="HeroPage__portrait-container">
          <img className="HeroPage__portrait" src={hero.portrait} alt="Hero portrait"/>
        </div>
      </div>
    );
  }
}

export default HeroPage;