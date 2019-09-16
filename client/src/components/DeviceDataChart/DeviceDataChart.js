import React, { Component } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import ArrowUpward from "@material-ui/icons/ArrowUpward";

// Components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
//Charts

export default class DeviceDataChart extends Component {

    constructor(props) {
        super(props)
        this.IconProp = this.props.icon
        //this.dataSource = this.props.dataSource
        this.colors = {
            "yellow": "warning",
            "green": "success",
            "red": "danger",
            "liteblue": "info",
            "blue": "primary",
            "litered": "rose",
            "white": "white"
        }

        this.state = {
            DeviceSensors: [],
            name: this.props.name,
            color: "green",
            data: this.props.data,
            type: this.props.type,
            updateValue: this.props.updateValue
        }

    }


    render() {

        return (

            <Card chart>
                <CardHeader style={{ backgroundColor: "green" }}>
                    <ChartistGraph
                        style={{ backgroundColor: "green" }}
                        className="ct-chart"
                        data={this.props.data}
                        type={this.props.type}
                        options={this.props.options}
                        listener={this.props.listener}
                    />
                </CardHeader>
                <CardBody>
                    <h4 className={this.props.classes.cardTitle}>{this.state.name}</h4>
                    <p className={this.props.classes.cardCategory}>
                        <span className={this.props.classes.successText}>
                            <ArrowUpward className={this.props.classes.upArrowCardCategory} /> {this.props.amount}
                        </span>{this.props.message}

                    </p>
                </CardBody>
                <CardFooter chart>
                    <div className={this.props.classes.stats}>
                        {this.props.IconProp} {this.props.message}
                    </div>
                </CardFooter>
            </Card>

        )


    }
}