import React, { Component } from 'react'; 
import MenuItem from './MenuItem';

export default class MainMenu extends Component {
   constructor(props) { 
       super(props)
       this.state = {
        currentScreen: 'options',
        gameObject: {
          borderColor: "#ff0000",
          paddleColor: "#0000ff", 
          ballSpeed: "medium"
        }
      };
      
       this.setCurrentScreen = props.setCurrentScreen;
   }

    render() {
        return (
            <div className="menuWrapper">
                {console.log(this.props.gameObject)}
                <MenuItem clickHandler={this.setCurrentScreen} currentScreen={this.props.currentScreen} gameObject={this.props.gameObject} value='game' content='Start Game' /> 
                <MenuItem clickHandler={this.setCurrentScreen} value='highScores' content='High Scores' /> 
                <MenuItem clickHandler={this.setCurrentScreen} setGameObject={this.props.setGameObject} value='options' content='Options' /> 
            </div>
        )
    }
}
