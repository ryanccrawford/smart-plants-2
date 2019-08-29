import React, { Component } from "react";
// FIREBASE DATABASE
import Firebase from 'firebase';
import config from './config.js';
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// Components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
//Gagues
import Gauge from 'react-canvas-gauge';

export default class DeviceDataGauge extends Component {

    constructor(props) {
        super(props)
        Firebase.initializeApp(config.firebase);
        this.updateTimer = null;
        this.interval = this.props.interval || 1000
        //this.dataSource = this.props.dataSource
        this.colors = {
            "yellow":"warning",
            "green":"success",
            "red":"danger",
            "liteblue":"info",
            "blue":"primary",
            "litered":"rose",
            "white": "white"
        }

        this.state = {
            DeviceSensors: [],
            name: this.props.name,
            icon: this.props.icon,
            color: this.colors[this.props.color],
            value: this.props.value,
            stopTimer: this.props.stopTimer || false,
            timerIsRunning: this.props.timerIsRunning || false,
            max: this.props.max,
            min: this.props.min,
            customUnit: this.props.customUnit || null,
            isCustom: this.props.isCustom || false,
            isPercent: this.props.isPercent || false,
            isDegree: this.props.isDegree || false,
            isTemp: this.props.isTemp || false,
            isNumber: this.props.isNumber || true,
            scaleList: this.props.scalelist || [],
            updateValue: this.props.updateValue
        }

    }
    componentDidMount() {
        
        this.updateTimer = setTimeout(this.doStateChange, this.interval)
        this.getStateFromDatabase()
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevState !== this.state) {
            this.setStateFromDatabase()
        }

    }

    setStateFromDatabase = () => {
        Firebase.database().ref('/').set(this.state);
        console.log('DATA SAVED');
    }

    getStateFromDatabase = () => {
        let ref = Firebase.database().ref('/');
        ref.on('value', snapshot => {
            const state = snapshot.val();
            this.setState(state);
        });
        console.log('DATA RETRIEVED');
    }

    doStateChange = () => {

        

    }

    handleTick = () => {
        
        let name = this.refs.name.value;
        let value = this.refs.value.value;
        let deviceId = this.refs.deviceId.value;

        if (deviceId && name && value) {
            const { DeviceSensors } = this.state;
            const DeviceSensorsIndex = DeviceSensors.findIndex(data => {
                return data.deviceId === deviceId
            });
            DeviceSensors[DeviceSensorsIndex].name = name;
            DeviceSensors[DeviceSensorsIndex].value = value;
            this.setState({ DeviceSensors });
        }
        else if (name && value) {
            const deviceId = new Date().getTime().toString();
            const { DeviceSensors } = this.state;
            DeviceSensors.push({ deviceId, name, value })
            this.setState({ DeviceSensors });
        }

        this.refs.deviceId.value = '';
        this.refs.name.value = '';
        this.refs.value.value = '';
    }

    updateData = (DeviceSensors) => {
        this.refs.deviceId.value = DeviceSensors.deviceId;
        this.refs.name.value = DeviceSensors.name;
        this.refs.value.value = DeviceSensors.value;
    }

    

    render() {
        let unit = ""
        if (this.state.isDegree) {
            unit = " Degrees"
        }
        if (this.state.isNumber) {
            unit = " "
        }
        if (this.state.isPercent) {
            unit = " %"
        }
        if (this.state.isTemp) {
            unit = " " + decodeURI('%C2%B0C')
        }
        if (this.state.isCustom) {
            unit = " " + this.state.customUnit
        }
        

        return (
          
            <Card>
                <CardHeader color={this.state.color} stats icon>
                    <CardIcon color={this.state.color}>
                        <Icon>{this.state.icon}</Icon>
                    </CardIcon>
                    <div>
                        <Gauge
                            size={this.state.max}
                            title={this.state.name}
                            unit={unit}
                            scaleList={this.state.scaleList}
                            minValue={this.state.min}
                            value={parseFloat(this.state.currentData)}
                        />
                    </div>
                    <h3 className={classes.cardTitle}>
                        {this.state.value} <small>{unit}</small>
                    </h3>
                </CardHeader>
                <CardFooter stats>
                    <div className={classes.stats}>
                        <Danger>
                            <Warning />
                        </Danger>
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                            Actions
                </a>
                    </div>
                </CardFooter>
            </Card>
         
        )


    }
}