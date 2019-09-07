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
import ContainerDimensions from 'react-container-dimensions'
//Gagues
import Gauge from 'react-svg-gauge';
import Switch from "react-switch";

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
            types: this.props.types || "gauge",
            on: true,
            
        }

    }
    switchHandleChange = () => {
        this.setState({ on: !this.state.on });
    }
    valueFormatter = (value) => {

         return value + " %" 

    }



    percentFormatter = (value) => {

        return (value + " %")
                
    }
    tempFormatter = (value) => {

        return (value + decodeURI('%C2%B0F'))

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

        const valueStyle = {
            fontSize: '2em'
        }
        const topStyle = {
            fontSize: '3em'
        }
        let gColor = "";
        if (parseInt(this.props.value) < 75) {
            gColor = "#0000ff";
        }
        if (parseInt(this.props.value) >= 75 && parseInt(this.state.value) < 80) {
            gColor = "#99ffff";
        }
        if (parseInt(this.props.value) >= 80 && parseInt(this.state.value) < 90) {
            gColor = "#ffff00";
        }
        if (parseInt(this.props.value) >= 90) {
            gColor = "#ff0000";
        }
      
        return (

            <Card>
                <CardHeader color={this.state.color} style={{ display: 'inline-block' }} stats icon>
                    <CardIcon color={this.state.color}>
                        <Icon>{this.props.icon}</Icon>
                        <p style={{ display: 'inline-block', fontSize: '2em', fontWeight: '600', paddingRight: '10px', lineHeight : '-5em'}}>
                            {this.state.name}</p>
                    </CardIcon> 
                   
                </CardHeader>
                <CardBody>
                   <ContainerDimensions>
                        {({ width, height }) => (<Gauge 
                            width={(width / 1.1 ).toString()}
                            height={"300"}
                            color={this.state.on ? gColor : "#222222"}
                            label={""}
                            max={this.props.max}
                            min={this.props.min}
                            value={this.state.on ? this.props.value : 0}
                            valueLabelStyle={valueStyle}
                            topLabelStyle={topStyle}
                            valueFormatter={!this.props.isTemp ? this.percentFormatter : this.tempFormatter}
                        />
                        )
                        }
                            
                  </ContainerDimensions>
                    </CardBody>
                <CardFooter stats>
                    <div className={this.props.classes.stats}>
                        <label>
                            <span>Connection</span>
                            
                       
                        {this.state.on ? (
                           <div><Icon>{"compare_arrows"}</Icon><span> Connected</span></div>
                        ) : (
                                <Danger>
                                    <Warning /><span> Not Connected</span>
                                </Danger>)
                            }
                            <span>OFF </span> <Switch onChange={this.switchHandleChange} checked={this.state.on ? "checked" : ""} /> <span> ON</span>
                        </label>
                    </div>
                </CardFooter>
            </Card>

        )


    }
}