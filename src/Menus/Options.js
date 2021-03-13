import React, { Component } from 'react'

export default class Options extends Component {
    constructor(props) { 
        super(props)

        this.ballSpeedRef = React.createRef(); 

        this.colorPalettes = {
            colorPalette1: {
                background: '#fec611',
                bordersAndPaddles: '#31358f',
                ball: '#eb8b2c',
                words: '#0470b8'
            },
            colorPalette2: {
                background: '#b52653',
                bordersAndPaddles: '#5fbd66',
                ball: '#e74a3d',
                words: '#275b95'
            },
            colorPalette3: {
                background: '#000000',
                bordersAndPaddles: '#ffffff',
                ball: '#ffffff',
                words: '#ffffff'
            }
        }



        this.backButtonHandler = this.backButtonHandler.bind(this); 
        this.setGameObjectValues = this.setGameObjectValues.bind(this); 
        this.changeColors = this.changeColors.bind(this); 
    }

    backButtonHandler() { 
        this.props.setCurrentScreen('mainMenu'); 
    }

    setGameObjectValues(e) {
        let selection = e.target.getAttribute('data-selection'); 
        let keyValuePair = selection.split(' '); 
        let key = keyValuePair[0]; 
        let value = keyValuePair[1]; 
        this.props.setGameObject(key, value); 
        console.log(this.props.gameObject); 
    }

    changeColors(e) { 
        let palette = e.target.getAttribute('data-selection'); 
    
        this.props.setGameObject('borderAndPaddleColor', this.colorPalettes[palette].bordersAndPaddles);  
        this.props.setGameObject('ballColor', this.colorPalettes[palette].ball); 
        
        document.getElementById('mainWrapper').style.backgroundColor = this.colorPalettes[palette].background;  
        document.getElementById('mainWrapper').style.color = this.colorPalettes[palette].words; 

        console.log(this.props.gameObject); 
    }

    render() {
        return (
            <div>
                <div>OPTIONS</div>
                <button onClick={this.backButtonHandler}>return to main menu</button>
                <div id="gameModeWrapper"> 
                    <div className="optionItem">Game Mode:</div>
                    <div data-selection="gameMode traditional" onClick={this.setGameObjectValues}>Traditional</div>
                    <div data-selection="gameMode trillion" onClick={this.setGameObjectValues}>Trillion</div>
                </div>
                <div id="playToWrapper">
                    <div className="optionItem">Play To: </div>
                    <div data-selection="playTo 5" className="optionItem" onClick={this.setGameObjectValues}>5</div>
                    <div data-selection="playTo 10" className="optionItem" onClick={this.setGameObjectValues}>10</div>
                    <div data-selection="playTo 21" className="optionItem" onClick={this.setGameObjectValues}>21</div>
                </div>
                <div id="ballSpeedWrapper">
                    <div className="optionItem">Ball Speed:</div>
                    <div data-selection="ballSpeed slow" className="optionItem" onClick={this.setGameObjectValues}>Slow</div>
                    <div data-selection="ballSpeed medium" className="optionItem" onClick={this.setGameObjectValues}>Medium</div>
                    <div data-selection="ballSpeed fast"className="optionItem" onClick={this.setGameObjectValues}>Fast</div>
                </div>
                <div id="colorWrapper">
                    <div className="optionItem">Color Palette: </div>
                    <div data-selection="colorPalette1" className="optionItem" onClick={this.changeColors}>Groovy</div>
                    <div data-selection="colorPalette2" className="optionItem" onClick={this.changeColors}>Snozberry</div>
                    <div data-selection="colorPalette3" className="optionItem" onClick={this.changeColors}>Mono</div>
                </div>
            </div>
        )
    }
}
