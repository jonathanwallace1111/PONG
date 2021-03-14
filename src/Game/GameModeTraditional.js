import React, { Component } from 'react'
import GameMasterClass from './GameMasterClass'
import TraditionalScoreKeeper from './TraditionalScoreKeeper';


export default class GameModeTraditional extends GameMasterClass {
    constructor(props) {
        super(props); 

    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleController); 
        document.addEventListener('keyup', this.handleController); 
        this.gameLoop(); 
    }

    startGame() {
 
        this.ball.speed = 3; 
        
        //ball starting angle
        let leftOrRightVar = Math.floor(Math.random() *2); 

        if (leftOrRightVar === 0) {
            let ballAngle = Math.floor(Math.random() * 91 + 135)
            this.ball.angle = ballAngle; 
            this.ball.direction = 'left'; 
        } else if (leftOrRightVar === 1) {

            let ballAngle = Math.floor(Math.random() * 46);
            let upOrDownVar = Math.floor(Math.random() * 2);
            if (upOrDownVar === 0) {
                ballAngle = -ballAngle; 
            }
            this.ball.angle = ballAngle; 
            this.ball.direction = 'right'; 
            // this.getBallFutureLocation(); 
        }

        this.updateBall(); 
        // call getBallFutureLocation if the angle goes right. 
        //  this.getBallFutureLocation(); 
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
        let tempPlayTo = this.props.gameObject.playTo; 
        let playTo = parseInt(tempPlayTo, 10)

        if (this.state.gameStats.leftPaddleScore >= playTo && this.state.gameStats.leftPaddleScore > this.state.gameStats.rightPaddleScore + 1) {

            this.setGameStats('winner', 'left');
            this.setGameStats('gameOver', true)
        } else if (this.state.gameStats.rightPaddleScore >= playTo && this.state.gameStats.rightPaddleScore > this.state.gameStats.leftPaddleScore +1) {

            this.setGameStats('winner', 'right');
            this.setGameStats('gameOver', true)
        }

        if (!this.state.gameStats.gameOver) {
            this.startGame(); 
        }

    }

    render() {
        console.log(this.state); 
        return (
            <div>
                <div>testing traditional mode Component </div>

                {/* {this.props.gameObject.gameMode === 'trillion' && <TrillionScoreKeeper gameStats={this.state.gameStats} />} */}
                <canvas ref={this.canvasRef} width={750} height={600}></canvas>
                <br/> 
                {this.props.gameObject.gameMode === 'traditional' && <TraditionalScoreKeeper gameStats={this.state.gameStats} />}
                <button onClick={this.startGame}>START GAME</button>
                <button onClick={this.backToMenu}>back to menu</button>
                <button onClick={this.restartGame}>restart game</button>
            </div>
        )
    }
}
