import React, { Component } from 'react'
import GameMasterClass from './GameMasterClass'
import TrillionScoreKeeper from './TrillionScoreKeeper'


export default class GameModeTrillion extends GameMasterClass {
    constructor(props) {
        super(props) 
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleController); 
        document.addEventListener('keyup', this.handleController); 
        this.setGameStats('livesRemaining', 3)
        this.gameLoop(); 
    }

    startGame() {
        this.ball.speed = 3; 
        let ballAngle = Math.floor(Math.random() * 91 + 135)
        this.ball.angle = ballAngle; 
        this.ball.direction = 'left'; 
        this.updateBall(); 
    }

    restartGame() {
        this.ball = {
            speed: null,
            x: 370,
            y: 320, 
            angle: null,
            radians: 0,
            xunits: 0,
            yunits: 0, 
            size: 10,
            direction: null,
            futureLocation: 270 
        }

        // this.stopGame = false; 

        this.ball.passedFirstHit = false; 


        //features to add
        //save high score when game over. Enter name. Then show highscores. 
        //keep track of remaining lives. 
        //if out of lives, gameOver
        //display remaining lives. 
        //setGameStats('gameOver', true)

        if (!this.state.gameStats.gameOver) {
            this.startGame(); 
        }

    }

    render() {
        return (
            <div>
                <div>testing trillion mode component</div>

                {this.props.gameObject.gameMode === 'trillion' && <TrillionScoreKeeper gameStats={this.state.gameStats} />}
                <canvas ref={this.canvasRef} width={750} height={600}></canvas>
                <br/> 
                {/* {this.props.gameObject.gameMode === 'traditional' && <TraditionalScoreKeeper gameStats={this.state.gameStats} />} */}
                <button onClick={this.startGame}>START GAME</button>
                <button onClick={this.backToMenu}>back to menu</button>
                <button onClick={this.restartGame}>restart game</button>
            </div>
        )
    }
}
