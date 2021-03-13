import React, { Component } from 'react'

export default class MenuItem extends Component {
    constructor(props) {
        super(props)

        this.clickHandler = this.clickHandler.bind(this); 
    }
    
    clickHandler() {
        this.props.clickHandler(this.props.value)
    }

    render() {
        return (
            <div onClick={this.clickHandler} className="menuItem">{this.props.content}</div>
        )
    }
}
