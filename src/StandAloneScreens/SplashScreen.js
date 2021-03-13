import React from 'react'
// import ScreensParent from 'ScreensParent'

export default class SplashScreen extends React.Component {
    constructor(props) {
        super(props)
        this.time = 0; 
        this.message = "WELCOME TO PONG"
    }
     

    render() {
        return (
            <div>
                {this.message}
            </div>
        )
    }
}
