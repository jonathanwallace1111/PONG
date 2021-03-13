import React, { Component } from 'react'
import TrillionScoreKeeper from './TrillionScoreKeeper'
import TraditionalScoreKeeper from './TraditionalScoreKeeper';

export default class Game extends Component {
    constructor(props) {
        super(props); 
        this.canvasRef = React.createRef();

        this.gameObject = props.gameObject; 

        this.stopGame = false;

        this.state = {
            leftPaddleWinCount: 0,
            rightPaddleWinCount: 0, 
            gameStats: {
                serve: false, 
                firstServe: true, 
                leftPaddleScore: 0, 
                rightPaddleScore: 0,
                gameOver: false,
                winner: null,
                totalHitCount: 0 
            }
        }



        this.controller = {
            up: false, 
            down: false
        }

        this.borders = {
           // color: props.gameObject.borderColor,
            top: {
                x1: null, 
                x2: null
            }, 
            bottom: {
                x1: null, 
                x2: null
            } 
        }

        this.paddles = {
            //color: props.gameObject.paddleColor, 
            size: 60, 
            left: {
                top: 270,
                movementHistory: [],
                isMoving: false,
                movementDirection: null, 
            },
            right: {
                top: 270,
                movementHistory: [],
                isMoving: false,
                movementDirection: null, 
                speed: 5
            }
        }

        this.ball = {
            speed: null,
            x: 370,
            y: 320, 
            angle: 210,
            radians: 0,
            xunits: 0,
            yunits: 0, 
            size: 10,
            direction: null,
            futureLocation: 270,
            passedFirstHit: false 
        }


        this.startGame = this.startGame.bind(this); 
        this.handleController = this.handleController.bind(this);
        this.updateBall = this.updateBall.bind(this); 
        this.getBallFutureLocation = this.getBallFutureLocation.bind(this); 
        this.update = this.update.bind(this); 
        this.draw = this.draw.bind(this); 
        this.gameLoop = this.gameLoop.bind(this); 
        this.backToMenu = this.backToMenu.bind(this); 
        this.restartGame = this.restartGame.bind(this); 
        this.setGameStats = this.setGameStats.bind(this); 
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleController); 
        document.addEventListener('keyup', this.handleController); 
        this.gameLoop(); 
    }

    setGameStats(key, value) {
        this.setState(prevState => {
          let gameStats = { ...prevState.gameStats};
          gameStats[key] = value; 
          return {gameStats}
        })
      }

    updateBall() {

        if (this.ball.passedFirstHit) {
            if (this.props.gameObject.ballSpeed === 'slow') {
                this.ball.speed = 3; 
           } else if (this.props.gameObject.ballSpeed === 'medium') {
                this.ball.speed = 5; 
           } else if (this.props.gameObject.ballSpeed === 'fast') {
                this.ball.speed = 8; 
           }
        }

        this.ball.angle = this.ball.angle % 360; 
        this.ball.radians = this.ball.angle * Math.PI / 180; 
        this.ball.xunits = Math.cos(this.ball.radians) * this.ball.speed; 
        this.ball.yunits = Math.sin(this.ball.radians) * this.ball.speed; 
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

    handleController(e) {
        if (e.type === 'keydown' && e.keyCode === 38) {
            if (this.controller.up === false) {
                this.paddles.left.movementHistory = []; 
            }

            this.controller.up = true;  
            this.paddles.left.isMoving = true; 
            this.movementDirection = 'up';
        } else if (e.type === 'keydown' && e.keyCode === 40) {
            if (this.controller.down === false) {
                this.paddles.left.movementHistory = []; 
            }

            this.controller.down = true; 
            this.paddles.left.isMoving = true;
            this.movementDirection = 'down';  
        } else if (e.type === 'keyup' && e.keyCode === 38) {
            this.paddles.left.movementHistory = [];
            this.controller.up = false; 
            this.paddles.left.isMoving = false; 
        } else if (e.type === 'keyup' && e.keyCode === 40) {
            this.paddles.left.movementHistory = []; 
            this.controller.down = false; 
            this.paddles.left.isMoving = false; 
        }
    }

    getBallFutureLocation() {

        let ballClone = {
            speed: this.ball.speed, 
            x: this.ball.x,
            y: this.ball.y,
            angle: this.ball.angle, 
            radians:this.ball.radians,
            xunits: this.ball.xunits,
            yunits: this.ball.yunits, 
            size: this.ball.size
        }

        while (ballClone.x <= 700) {

            ballClone.x += ballClone.xunits; 
            ballClone.y += ballClone.yunits; 

            //bounce off top and bottom. 
            if (ballClone.y <= 50 || ballClone.y >= 550) {
                ballClone.angle = 360 - ballClone.angle; 
                ballClone.angle = ballClone.angle % 360; 
                ballClone.radians = ballClone.angle * Math.PI / 180; 
                ballClone.xunits = Math.cos(ballClone.radians) * ballClone.speed; 
                ballClone.yunits = Math.sin(ballClone.radians) * ballClone.speed; 
            }
        }
            
        this.ball.futureLocation = ballClone.y; 
    }
  
    update() { 
        //left paddle mechanics 
        let leftPaddleBottom = this.paddles.left.top + this.paddles.size; 
        let leftMovementStreak = 0; 

        if (this.controller.up && this.paddles.left.top >= 50) {
            this.paddles.left.top -= 5; 
        }
        if (this.controller.down && leftPaddleBottom <= 550) {
            this.paddles.left.top += 5; 
        }
        
        let leftPaddleHistory = this.paddles.left.movementHistory; 
        leftPaddleHistory.push(this.paddles.left.isMoving); 
        if (leftPaddleHistory.length >= 60) {
            leftPaddleHistory.shift(); 
        }

        for (let i = 0; i < leftPaddleHistory.length; i++) { 
            let reverseHistory = leftPaddleHistory.reverse(); 
            if (reverseHistory[i] === true) {
                leftMovementStreak += 1; 
            } else {
                break; 
            }
        }

        // right paddle mechanics
        let rightPaddleBottom = this.paddles.right.top + this.paddles.size; 
        let rightPaddleMiddle = this.paddles.right.top + (this.paddles.size / 2); 

        // if (this.ball.futureLocation !== rightPaddleMiddle) {
        //     let diff = this.ball.futureLocation - rightPaddleMiddle; 
            
        //     if (Math.abs(diff) < 5) {
        //         this.paddles.right.top += diff; 
        //     } 

        //    if (Math.sign(diff) === 1) {
        //        this.paddles.right.top += 5
        //    } else if (Math.sign(diff) === -1) {
        //        this.paddles.right.top -= 5;
        //    }

        // }


        if (this.ball.y > rightPaddleMiddle && Math.floor(Math.random() * 6) === 2) {
            this.paddles.right.speed = 5; 
        }  else if (this.ball.y < rightPaddleMiddle && Math.floor(Math.random() * 6) === 2) {
            this.paddles.right.speed = -5; 
        }

        this.paddles.right.top += this.paddles.right.speed

        //links ball.y to right paddle
        // this.paddles.right.top = this.ball.y -30; 


        // ball mechanics
        let tempBallX = this.ball.x; 
        
        this.ball.x += this.ball.xunits; 
        this.ball.y += this.ball.yunits; 
    
        let ballTraveledArr = [];

        if (this.ball.x > tempBallX) {
            for (let i = tempBallX; i <= this.ball.x; i++) {
                ballTraveledArr.push(Math.floor(i)); 
            }
        } else if (tempBallX > this.ball.x) {
            for (let i = this.ball.x; i <= tempBallX; i++) {
                ballTraveledArr.push(Math.floor(i)); 
            }
        }

        // console.log(ballTraveledArr); 

        if (ballTraveledArr.includes(50) && this.ball.direction ==='left' && this.ball.y >= this.paddles.left.top && this.ball.y <= leftPaddleBottom) {
        
            

            if (leftMovementStreak >= 30 /* && leftMovementStreak < 45 */) {
                if (this.movementDirection === 'up') {
                    this.ball.angle = -68; 
                } else if (this.movementDirection ==='down') {
                    this.ball.angle = 68; 
                }
            }

            if (leftMovementStreak >= 15 && leftMovementStreak < 30) {
                if (this.movementDirection === 'up') {
                    this.ball.angle = -45; 
                } else if (this.movementDirection ==='down') {
                    this.ball.angle = 45; 
                }
            }

            if (leftMovementStreak > 0 && leftMovementStreak < 15) {
                if (this.movementDirection === 'up') {
                    this.ball.angle = -23; 
                } else if (this.movementDirection ==='down') {
                    this.ball.angle = 23; 
                }
            } 
            
            if (leftMovementStreak === 0) {
                this.ball.angle = 180 - this.ball.angle;   
            }

            let newHitCount = this.state.gameStats.totalHitCount + 1; 
            this.setGameStats('totalHitCount', newHitCount); 

            // this.setState({ totalHitCount: newHitCount })
           
            // this.setState(prevState => {
            //     let gameStats = { ...prevState.gameStats}; 
            //     gameStats.totalHitCount = newHitCount; 
            //     return {gameStats}
            // })

            
       
            this.ball.passedFirstHit = true; 
            this.updateBall(); 
            this.ball.direction = 'right'; 
            this.getBallFutureLocation(); 

        }

        //temp if (keeps ball bouncing even if I'm not playing)
        // if (this.ball.x <= 25) {
        //     this.ball.angle = 180 - this.ball.angle;   
        //     this.updateBall() 

        // }

        if (ballTraveledArr.includes(700) && this.ball.direction === 'right' && this.ball.y >= this.paddles.right.top && this.ball.y <= rightPaddleBottom) {
            this.ball.passedFirstHit = true; 
            this.ball.angle = 180 - this.ball.angle;
            this.updateBall(); 
            this.ball.direction = 'left'
        } 

        if (this.ball.x <= 0) {
            let newScore = this.state.gameStats.rightPaddleScore + 1;
            this.setGameStats('rightPaddleScore', newScore); 
            this.restartGame(); 
        }

        if (this.ball.x >= 750 - this.ball.size) {
            let newScore = this.state.gameStats.leftPaddleScore + 1; 
            this.setGameStats('leftPaddleScore', newScore); 
            this.restartGame(); 
        }


        if (this.ball.y <= 50 || this.ball.y >= 550) {
            this.ball.angle = 360 - this.ball.angle; 
            this.updateBall(); 
        }
    }

    draw() {
        const canvas = this.canvasRef.current; 
        const c = canvas.getContext('2d');
        let bordersAndPaddleColor = this.props.gameObject.borderAndPaddleColor; 
        let ballColor = this.props.gameObject.ballColor; 
        
        c.clearRect(0, 0, 750, 750); 

        //top border
        c.beginPath();
        c.moveTo(50, 50);
        c.lineTo( 700, 50)
        c.strokeStyle = bordersAndPaddleColor
        c.stroke(); 

        //bottom border
        c.beginPath(); 
        c.moveTo(50, 550);
        c.lineTo(700, 550);        
        c.strokeStyle = bordersAndPaddleColor; 
        c.stroke(); 

        //left paddle 
        c.lineWidth = 10; 

        c.beginPath(); 
        c.moveTo(50, this.paddles.left.top);
        c.lineTo(50, this.paddles.left.top + this.paddles.size);
        c.strokeStyle = bordersAndPaddleColor;
        c.stroke(); 

        //right paddle
        c.lineWidth = 10; 


        c.beginPath(); 
        c.moveTo(700, this.paddles.right.top);
        c.lineTo(700, this.paddles.right.top + this.paddles.size);
        c.strokeStyle = bordersAndPaddleColor 
        c.stroke(); 

        //ball
        c.fillStyle = ballColor; 
        c.fillRect(this.ball.x, this.ball.y, this.ball.size, this.ball.size); 
    }

    gameLoop() {
        if (!this.stopGame) {
            this.update(); 
            this.draw(); 
            requestAnimationFrame(this.gameLoop); 
        }
    }

    backToMenu() {
        this.stopGame = true; 
        this.props.setCurrentScreen('mainMenu'); 
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

        this.stopGame = false; 

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
        return (
            <div>

                {this.props.gameObject.gameMode === 'trillion' && <TrillionScoreKeeper gameStats={this.state.gameStats} />}
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
