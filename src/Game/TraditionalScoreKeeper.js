import React, { Component } from 'react'

export default class TraditionalScoreKeeper extends Component {
    constructor(props) {
        super(props); 
    }
    render() {
        return (
            <div>
                <div>Left Player: {this.props.gameStats.leftPaddleScore}</div>
                <div>Right Player: {this.props.gameStats.rightPaddleScore}</div>
                {this.props.gameStats.gameOver && <div>The Winner is {this.props.gameStats.winner}</div>}
            </div>
        )
    }
}
