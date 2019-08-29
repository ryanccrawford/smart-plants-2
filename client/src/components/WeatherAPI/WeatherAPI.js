import React, { Component } from 'react';
import Weather from 'weather-js';
import axios from 'axios';



export default class WeatherAPI extends Component {
    constructor(props) {
        super(props)
        this.interVal = null
        this.state = {
            weather: {},
            error: {},
            getWeather: this.props.getWeather || false,
            stopInterval: this.props.stop,
            startInterVal: this.props.start,
            interval: this.props.interval || 60000,
            isRunning: false

        }

    }

    clearInterval = () => {
        clearInterval(this.interval)
        this.setState({isRunning: false})

    }
    

    componentDidMount() {
        Weather.find({ search: 'Orlando, Florida', degreeType: 'F' }, (err, result) => {
            if (err) {
                this.setState({ error: err }, iniInterval)
            } else {
                this.setState({ weather: result }, iniInterval)
            }

            
     });

    }

    iniInterval = () => {
        this.interVal = setInterval(this.intervalFunction, this.state.interval)
    }

    intervalFunction = () => {

        Weather.find({ search: 'Orlando, Florida', degreeType: 'F' }, (err, result) => {
            if (err) {
                this.setState({ error: err })
            } else {
                this.setState({ weather: result })
            }

        })
    }
    componentDidUpdate() {


    }
    
    render() {

        return (
            <div>
                <p>{this.state.weather && this.state.isRunning ? "Weather API New Data Ready" : (null)}</p>
                <p>{this.state.isRunning ? "Running" : "Stopped"}</p>
            </div>
                )







    }








}