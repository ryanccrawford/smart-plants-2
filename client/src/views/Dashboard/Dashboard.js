import React, { Component } from "react";
import Icon from "@material-ui/core/Icon";
// @material-ui/core
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { makeStyles } from "@material-ui/core/styles";

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
import ChartData from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import axios from 'axios';
import { setInterval } from "timers";



export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.user = {
            email: "ryan@test.com",
            devices: [3],

        }
        let devices = []
        for (let i = 0; i < this.user.devices.length; i++) {
            console.log("adding " + i)
            devices.push({
                DeviceId: this.user.devices[i],
                moist: 0,
                temp: 0,
                heatIndex: 0,
                humidity: 0,
                other: 0
            })
        }

        this.state = {
            device: devices
        }

        this.interval = null;
        console.log(this.weather);



    }

    ticker2 = () => {
        axios.get("/api/liveweather/32792").then((result, err) => {

            if (err) {
                console.log(err);
            }
            if (this.state.device && this.state.device.length > 0) {

                //  let temp_device = this.state.device[0];
                //  console.log(temp_device);
                //  let data = result[0];
                //  console.log(data);

            }

        });

    }


    ticker = () => {

        if (this.user.devices) {

            let numberOfDevices = this.user.devices.length

            for (let i = 0; i < numberOfDevices; i++) {
                let did = this.user.devices[i]
                let url = `/api/livedata/${did}`
                axios.get(url).then(result => {

                    console.log(result.data[0])
                    if (result.data[0]) {
                        //{id: 1, timeStamp: "2019-09-01 04:37:52", moisture: 0, light: 0, sensorTempFehr: 27, …}
                        this.setGauges(result.data[0], did)
                    }
                }).catch(error => {
                    throw error
                })

            }
        }
    }

    messageCB = (message) => {
        this.setGauges(message.data)
    }

    componentDidMount() {
        this.ticker2();
        this.interval = setInterval(this.ticker, 1000);
        this.interval2 = setInterval(this.ticker2, 10000);
    }

    setGauges = (data, id) => {

        console.log("set guages");
        console.log(data)
        let moist = (parseFloat(data.moisture) / 100);
        let temp = parseInt(((parseFloat(data.sensorTempFehr) * (9 / 5)) + 32));
        let heatIndex = parseFloat(data.heatIndex) / 100
        let humidity = parseFloat(data.humidity)
        let other = parseFloat(data.windSpeed)

        let tempState = this.state.device.filter((device, index) => {
            if (device.DeviceId && device.DeviceId === id) {
                return false;
            }
            return true;
        })

        let stateItem = {
            moist: moist,
            temp: temp,
            humidity: humidity,
            other: other,
            DeviceId: id
        }
        tempState.push(stateItem);
        console.log(tempState);
        this.setState({ device: tempState })

        return false;
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
                <Card style={{ backgroundColor: "rgb(51, 51, 51)" }}>
                    <CardHeader>
                        <CardIcon color={"#0000dd"}>

                            <h2 style={{ color: "white" }}> <Icon>{"devices"}</Icon> Device {this.user.devices[0].toString()}</h2>
                        </CardIcon>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>

                            <GridItem xs={12} sm={6} md={4}>

                                <DeviceDataGauge
                                    classes={classes}
                                    name="Moisture"
                                    icon={<Cloud />}
                                    color="liteblue"
                                    gColor={hexColor}
                                    value={parseInt(100 - this.state.device[0].moist)}
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
                                    value={this.state.device[0].humidity}
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
                                    value={this.state.device[0].temp}
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
                    </CardBody>
                </Card>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <DeviceDataChart
                            name="History Analytics"
                            style={{ backgroundColor: "lightblue" }}
                            data={ChartData.ChartDataRainOverTime.data}
                            type="Line"
                            options={ChartData.ChartDataRainOverTime.options}
                            listener={ChartData.ChartDataRainOverTime.animation}
                            classes={classes}
                            icon={<Cloud />}
                            amount="5%"
                            message=" Rain Over TIme"
                        />
                    </GridItem>

                </GridContainer>
            </div>
        )
    }



}
