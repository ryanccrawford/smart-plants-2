import React, { Component }  from "react";
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





export default class DeviceData extends Component {

    constructor(props) {
        super(props)
        this.updateTimer = null;
        this.interval = this.props.interval || 1000
        this.dataSource = this.props.dataSource
        this.state = {
            name: this.props.name,
            icon: this.props.icon,
            headerColor: this.props.headerColor,
            currentData: 0,
            max: this.props.max,
            min: this.props.min,
            isPercent: this.props.isPercent,
            
        }

    }
    componentDidMount() {
        this.updateTimer = setTimeout(this.doStateChange, this.interval)

    }

    doStateChange = () => {

        

    }

    render() {
        return (
            <Card>
                <CardHeader color="warning" stats icon>
                    <CardIcon color="warning">
                        <Icon>content_copy</Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>Used Space</p>
                    <h3 className={classes.cardTitle}>
                        49/50 <small>GB</small>
                    </h3>
                </CardHeader>
                <CardFooter stats>
                    <div className={classes.stats}>
                        <Danger>
                            <Warning />
                        </Danger>
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                            Get more space
                </a>
                    </div>
                </CardFooter>
            </Card>

        )


    }
}