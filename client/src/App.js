import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HeroesPage from './components/HeroesPage';
import HeroPage from './components/HeroPage';
import './App.css';
import './styles/Common.css';
import './styles/HeroesPage.css';
import './styles/HeroPage.css';
import './styles/TextInput.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={HeroesPage}/>
          <Route path="/heroes/:name" component={HeroPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
