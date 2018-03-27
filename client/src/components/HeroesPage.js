import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import logo from '../images/overwatch-logo.png';
import HeroCard from './HeroCard';
import TextInput from './TextInput';
import { loadHeroes, filterHeroes } from '../actions/heroes'; 

class HeroesPage extends Component {
  state = { 

  }
  
  loadHeroes = (number, resetArray) => {
    this.props.loadHeroes(number);
  }

  

  conditionalLoadHeroes = () => {
    console.log("load")
    const {isLoading, allHeroesLoaded} = this.props;
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 300) &&
      !isLoading && !allHeroesLoaded
    ) {
      this.loadHeroes(3, false);
    }
  }

  handleFilterChange = text => {
    this.props.filterHeroes(text);
  }


  attachScrollListener () {
    window.addEventListener('scroll', this.conditionalLoadHeroes, false);
    window.addEventListener('resize', this.conditionalLoadHeroes, false);
  }

  detachScrollListener () {
    window.removeEventListener('scroll', this.conditionalLoadHeroes, false);
    window.removeEventListener('resize', this.conditionalLoadHeroes, false);
  }

  componentDidMount() {
    this.loadHeroes(6, true);
    this.attachScrollListener();
  }

  componentWillUnmount() {
    this.detachScrollListener();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allHeroesLoaded === false && this.props.allHeroesLoaded === true)
      this.detachScrollListener();
    else if (prevProps.allHeroesLoaded === true && this.props.allHeroesLoaded === false)
      this.attachScrollListener();
      
    if (this.props.heroes.length > prevProps.heroes.length) {
      this.conditionalLoadHeroes();
    }
  }

  render() {
    const { heroes, filter } = this.props;

    return (
      <Fragment>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <TextInput label="Search" value={filter} onTextChange={this.handleFilterChange}/>
        <div className="HeroesList">
          {heroes.map(h => <HeroCard key={h._id} hero={h} />)}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { list, isLoading, allHeroesLoaded, filter } = state.heroes;
  const filteredList = list.filter(h => h.name.toLowerCase().startsWith(filter.toLowerCase()) || h.name_plain.toLowerCase().startsWith(filter.toLowerCase()));

  return {
    heroes: filteredList,
    isLoading,
    allHeroesLoaded,
    filter
  }
}

const mapDispatchToProps = (dispatch) => {
  return { 
    loadHeroes: (limit) => dispatch(loadHeroes(limit)),
    filterHeroes: (filter) => dispatch(filterHeroes(filter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeroesPage);