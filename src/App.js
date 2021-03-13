import React, { Component } from 'react'; 
import './styles.css';
import SplashScreen from './StandAloneScreens/SplashScreen'; 
import MainMenu from './Menus/MainMenu';
import HighScores from './Menus/HighScores';
import Options from './Menus/Options';
import Game from './Game/Game';



class App extends Component {
  constructor() { 
    super(); 
    this.state = {
      currentScreen: 'game',
      gameObject: {
        borderAndPaddleColor: "#00ff00",
        ballColor: "#0000ff", 
        ballSpeed: "fast", 
        gameMode: "traditional",
        playTo: "3"
      }
    };

    this.setCurrentScreen = this.setCurrentScreen.bind(this); 
    this.setGameObject = this.setGameObject.bind(this); 
  }; 

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({
  //       currentScreen: 'mainMenu'
  //     });
  //   }, 1000)
  // }

  setGameObject(key, value) {
    this.setState(prevState => {
      let gameObject = { ...prevState.gameObject};
      gameObject[key] = value; 
      return {gameObject}
    })
  }

  setCurrentScreen(newScreen) {
    this.setState({
      currentScreen: newScreen
    })
  }

  render() {
    return (
      <div id="mainWrapper"> 
          {this.state.currentScreen === 'splashScreen' && <SplashScreen />}
          {this.state.currentScreen === 'mainMenu' && <MainMenu gameObject={this.state.gameObject} currentScreen={this.state.currentScreen} setCurrentScreen={this.setCurrentScreen}/>}
          {this.state.currentScreen === 'game' && <Game currentScreen={this.state.currentScreen} gameObject={this.state.gameObject} setCurrentScreen={this.setCurrentScreen}/>}
          {this.state.currentScreen === 'highScores' && <HighScores />}
          {this.state.currentScreen === 'options' && <Options setGameObject={this.setGameObject} setCurrentScreen={this.setCurrentScreen} gameObject={this.state.gameObject} />}
      </div>
    )
  }
}

export default App;
