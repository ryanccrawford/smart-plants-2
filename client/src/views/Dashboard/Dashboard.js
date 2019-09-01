import React, { Component } from "react";
// FIREBASE DATABASE
import Firebase from 'firebase';
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
import {
    dailySalesChart,
    emailsSubscriptionChart,
    completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import axios from 'axios';
import { setInterval } from "timers";



Firebase.initializeApp(config);





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

        this.timer = null

    }

    ticker = () => {

        axios.get("/api/livedata/all").then(result => {
            let data = result.data
            let moist = data.moisture;
            let temp = ((parseFloat(data.sensorTempFehr) * (9 / 5)) + 32);
            let heatIndex = data.precipIntensity
            let humidity = data.humidity
            let other = data.windSpeed
            this.setState({
                moist: moist,
                temp: temp,
                heatIndex: heatIndex,
                humidity: humidity,
                other: other})
        }).catch(error => {
            throw error
        })
}
    componentDidMount() {
        setInterval(this.ticker, 2000);
       
    }

    render() {
        const classes = makeStyles(styles);
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={6} md={3}>
                        <DeviceDataGauge
                            Firebase={Firebase}
                            classes={classes}
                            name="Moisture"
                            icon={<Cloud />}
                            color="liteblue"
                            gColor="#4444ff"
                            value={this.state.moist}
                            max={100}
                            min={0}
                            customUnit={null}
                            isCustom={false}
                            isPercent={true}
                            isDegree={false}
                            isTemp={false}
                            isNumber={false}
                            scaleList={[
                                { scale: 5, quantity: 5, startColor: '#327aff', endColor: '#327aff' },
                                { scale: 5, quantity: 5, startColor: '#327aff', endColor: 'skyblue' },
                                { scale: 10, quantity: 5, startColor: 'skyblue', endColor: 'skyblue' }
                            ]}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3}>
                        <DeviceDataGauge
                            Firebase={Firebase}
                            classes={classes}
                            name="Humidity"
                            icon={(<Icon>brightness_low</Icon>)}
                            color="yellow"
                            gColor="#ffee00"
                            value={this.state.humidity}
                            max={100}
                            min={0}
                            customUnit={SVGFETurbulenceElement}
                            isCustom={false}
                            isPercent={true}
                            isDegree={false}
                            isTemp={false}
                            isNumber={false}
                         
                        />
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3}>
                        <DeviceDataGauge
                            Firebase={Firebase}
                            classes={classes}
                            name="Live Temperature"
                            icon={(<Icon>ac_unit</Icon>)}
                            color="blue"

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
                    <GridItem xs={12} sm={6} md={3}>
                        <DeviceDataGauge
                            Firebase={Firebase}
                            classes={classes}
                            name="Overall Health"
                            icon={(<Icon>healing</Icon>)}
                            color="red"
                            gColor="#ff3333"
                            value={80}
                            max={100}
                            min={0}
                            customUnit=" U"
                            isCustom={true}
                            isPercent={false}
                            isDegree={false}
                            isTemp={false}
                            isNumber={false}
                            scaleList={[
                                { scale: 5, quantity: 5, startColor: '#327aff', endColor: '#327aff' },
                                { scale: 5, quantity: 5, startColor: '#327aff', endColor: 'skyblue' },
                                { scale: 10, quantity: 5, startColor: 'skyblue', endColor: 'skyblue' }
                            ]}
                        />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                        <DeviceDataChart
                            name="Actual Rain Fall"
                            className="ct-chart"
                            data={dailySalesChart.data}
                            type="Line"
                            options={dailySalesChart.options}
                            listener={dailySalesChart.animation}
                            classes={classes}
                            icon={<Cloud />}
                            amount="55%"
                            message="Increase in rain fall over the last week."
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <DeviceDataChart
                            name="Actual Rain Fall"
                            className="ct-chart"
                            data={dailySalesChart.data}
                            type="Line"
                            options={dailySalesChart.options}
                            listener={dailySalesChart.animation}
                            classes={classes}
                            icon={<Cloud />}
                            amount="55%"
                            message="Increase in rain fall over the last week."
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <DeviceDataChart
                            name="Actual Rain Fall"
                            className="ct-chart"
                            data={dailySalesChart.data}
                            type="Line"
                            options={dailySalesChart.options}
                            listener={dailySalesChart.animation}
                            classes={classes}
                            icon={<Cloud />}
                            amount="55%"
                            message="Increase in rain fall over the last week."
                        />
                    </GridItem>
                </GridContainer>
            </div>
        )
    }

  
  
}
