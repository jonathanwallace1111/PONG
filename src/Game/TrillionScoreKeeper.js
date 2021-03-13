import React, { Component } from 'react'

export default class TrillionScoreKeeper extends Component {
    constructor(props){
        super(props); 

        this.state = {
            totalHitCount: this.props.totalHitCount,
        }

        this.message = ''; 
        this.totalMultiplier = 1;  
        this.hitMultiplier = 1;  
        this.prevTotalScore = 0;
        this.totalScore = 0;

        this.updateScore = this.updateScore.bind(this); 
        this.displayMessage = this.displayMessage.bind(this); 
     }

    componentDidUpdate(prevProps) {
        if (prevProps.totalHitCount !== this.props.totalHitCount) {
            this.setState({ totalHitCount: this.props.totalHitCount })
            this.updateScore() 
        }
    }   

    displayMessage(newMessage) { 
        this.message = newMessage; 
        setTimeout(() => {
            this.message = ''; 
        }, 2000); 
    }

    updateScore() { 
        if (this.state.totalHitCount !== 0 && this.state.totalHitCount % 3 === 0) {
            this.displayMessage('multiplier + 3'); 
            
            this.hitMultiplier += 3
        }

    
        this.totalScore += this.hitMultiplier; 
        
        if (JSON.stringify(this.totalScore).length > JSON.stringify(this.prevTotalScore).length) {
            this.displayMessage('Order of magnitude multipler')
            
            this.hitMultiplier *= 10; 
        }
        
        this.prevTotalScore = this.totalScore; 
        console.log(this.totalScore.length); 
    }

    render() {

        return (
            <div>
                <div className="score scoreDisplay">{this.totalScore}</div>
                <div className="score messageDisplay">{this.message}</div>
            </div>
        )
    }
}
