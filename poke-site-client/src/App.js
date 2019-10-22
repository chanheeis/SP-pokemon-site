//Module import part
import React,{Component} from 'react';

//Component import part
import PokeSearch from './Components/PokeSearch';
import PokeList from './Components/PokeList';
import PokeSurvey from './Components/PokeSurvey';

//Page static config import part
import './css/App.css';

class App extends Component{
  render(){
    return(
      <div id="app">
        <div id="header">
          <h1>Pokemon Search Site</h1>
        </div>
        <div id="content">
          <PokeList/>
        </div>
        <div id="sideNav">
          <PokeSearch/>
          <PokeSurvey/>
        </div>
      </div>
    )
  }
}

export default App;
