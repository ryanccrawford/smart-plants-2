import React, { Component } from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Danger from "components/Typography/Danger.js"
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
import Gauge from 'react-svg-gauge';

export default class DeviceDataGauge extends Component {

    constructor(props) {
        super(props)
        this.colors = {
            "yellow":"warning",
            "green":"success",
            "red":"danger",
            "liteblue":"info",
            "blue":"primary",
            "litered":"rose",
            "white": "white"
        }
        let c = ""
        if (this.props.color.startsWith("#")) {
            c = this.props.color
        } else {
           c = this.colors[this.props.color]
        }
        this.state = {
            DeviceSensors: [],
            name: this.props.name,
            icon: this.props.icon,
            color: c ,
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
            updateValue: this.props.updateValue,
            types: this.props.types || "gauge"
        }

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
            unit = " " + decodeURI('%C2%B0F')
        }
        if (this.state.isCustom) {
            unit = " " + this.state.customUnit
        }

        const guageStyle = {
            display: 'inline-block',
            margin: '15px auto',
            width: '150px',
            height: '150px'
        }
        let gColor = "";
        if (parseInt(this.state.value) < 75) {
            gColor = "#0000ff";
        }
        if (parseInt(this.state.value) >= 75 && parseInt(this.state.value) < 80) {
            gColor = "#99ffff";
        }
        if (parseInt(this.state.value) >= 80 && parseInt(this.state.value) < 90) {
            gColor = "#ffff00";
        }
        if (parseInt(this.state.value) >= 90) {
            gColor = "#ff0000";
        }

        return (

            <Card>
                <CardHeader color={this.state.color} stats icon>
                    <CardIcon color={this.state.color}>
                        <Icon>{this.state.icon}</Icon>
                    </CardIcon>

                    <h3 className={this.props.classes.cardTitle}>
                        {this.state.value} <small>{unit}</small>
                    </h3><p className={this.props.classes.cardCategory}>{this.state.name}</p>
                </CardHeader>
                <CardBody>
                    {this.state.types !== "temp" ? (
                        <Gauge
                            width={"320"}
                            height={"320"}
                            color={this.props.gColor}
                            label={this.props.name}
                            max={this.props.max}
                            min={this.props.min}
                            value={this.props.value}
                    />) : (
                        <Gauge
                            width={"320"}
                                height={"320"}
                            label={this.props.name}
                            color={gColor}
                            value={this.props.value}
                            min={this.props.min}
                            max={this.props.max}

                            />
                        )}
                    </CardBody>
                <CardFooter stats>
                    <div className={this.props.classes.stats}>
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