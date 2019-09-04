import React, { Component } from "react";
// FIREBASE DATABASE
import config from './config.js';
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


// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import DeviceDataGauge from "components/DeviceDataGauge/DeviceDataGauge.js";
import DeviceDataChart from "components/DeviceDataChart/DeviceDataChart.js";
import dailyPlantData from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import axios from 'axios';
import { setInterval } from "timers";
import WeatherAPI from "components/WeatherAPI/WeatherAPI.js"

export default class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            moist: 0,
            temp: 0,
            heatIndex: 0,
            humidity: 0,
            other: 0
        }

        this.interval = null;
       
     


    }

    ticker = () => {

        axios.get("/api/livedata").then(result => {
         
            let data = result.data[0]
            console.log(data)
            //{id: 1, timeStamp: "2019-09-01 04:37:52", moisture: 0, light: 0, sensorTempFehr: 27, …}
            this.setGauges(data)
           
        }).catch(error => {
            throw error
        })

      
    }

    messageCB = (message) => {
        this.setGauges(message.data)
    }

    componentDidMount() {
        this.interval =  setInterval(this.ticker, 1000);
 
    }

    setGauges = (data) => {
        console.log(data)
        let moist = (parseFloat(data.moisture) / 100) ;
        let temp = parseInt(((parseFloat(data.sensorTempFehr) * (9 / 5)) + 32));
        let heatIndex = parseFloat(data.precipIntensity) / 100
        let humidity = parseFloat(data.humidity)
        let other = parseFloat(data.windSpeed)
        this.setState({
            moist: moist,
            temp: temp,
            heatIndex: heatIndex,
            humidity: humidity,
            other: other
        })

    }
    componentWillUnmount() {

        clearInterval(this.interval);

    }

    render() {
        const classes = makeStyles(styles);
        let currentVal = parseInt(this.state.moist);
        let hexColor = "#0000FF"
        if (currentVal > 0) {
            let mColor = ((1677200 / currentVal) * 100);
             hexColor = "#" + mColor.toString(16);
        }
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={6} md={4}>
                       
                        <DeviceDataGauge
                            classes={classes}
                            name="Moisture"
                            icon={<Cloud />}
                            color="liteblue"
                            gColor={hexColor}
                            value={this.state.moist}
                            max={100}
                            min={0}
                            customUnit={null}
                            isCustom={false}
                            isPercent={true}
                            isDegree={false}
                            isTemp={false}
                            isNumber={false}
                            
                        />
                    </GridItem>
                    <GridItem xs={12} sm={6} md={4}>
                        <DeviceDataGauge
                           
                            classes={classes}
                            name="Humidity"
                            icon={(<Icon>brightness_low</Icon>)}
                            color="yellow"
                            gColor="#ffee00"
                            value={this.state.humidity}
                            max={100}
                            min={0}
                            customUnit={""}
                            isCustom={false}
                            isPercent={true}
                            isDegree={false}
                            isTemp={false}
                            isNumber={false}
                            on={true}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={6} md={4}>
                        <DeviceDataGauge
                           
                            classes={classes}
                            name="Temp"
                            icon={(<Icon>ac_unit</Icon>)}
                            color="blue"
                            on={true}
                            value={this.state.temp}
                            max={110}
                            min={-20}
                            types={"temp"}
                            customUnit={null}
                            isCustom={false}
                            isPercent={false}
                            isDegree={false}
                            isTemp={true}
                            isNumber={false}
                            
                        />
                    </GridItem>
                   
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <DeviceDataChart
                            name="History Analytics"
                            style={{ backgroundColor: "green"}}
                            data={dailyPlantData.data}
                            type="Line"
                            options={dailyPlantData.options}
                            listener={dailyPlantData.animation}
                            classes={classes}
                            icon={<Cloud />}
                            amount="5%"
                            message="Rain vs. Soil Moisture"
                        />
                    </GridItem>
                   
                </GridContainer>
            </div>
        )
    }

  
  
}
