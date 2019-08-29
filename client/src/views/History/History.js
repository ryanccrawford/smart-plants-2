import React from "react";
// @material-ui/core components
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
import Card from "components/Card/Card.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import DeviceDataChart from "components/DeviceDataChart/DeviceDataChart.js";
import {
    dailySalesChart,
    emailsSubscriptionChart,
    completedTasksChart
} from "variables/charts.js";
import { bugs, website, server } from "variables/general.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Plant Data</h4>
                            <p className={classes.cardCategoryWhite}>
                                Groth Rates for Milkweed in Near by Cities
            </p>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="primary"
                                tableHead={["Name", "Plant Type", "City", "Growth Rate"]}
                                tableData={[
                                    ["Dakota Rice", "Milkweed", "Miami", "0.5 Meters"],
                                    ["Minerva Hooper", "Milkweed", "West Side", "1 Meter"],
                                    ["Sage Rodriguez", "Milkweed", "East Side", "0.01 CM"],
                                    ["Philip Chaney", "Milkweed", "Overland Park", "N/A"],
                                    ["Doris Greene", "Milkweed", "Orlando", "N/A"],
                                    ["Mason Porter", "Milkweed", "Orlando", "55 MM"]
                                ]}
                            />
                        </CardBody>
                    </Card>
                </GridItem>

            </GridContainer>
        <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
                <CustomTabs
                    title="Tasks:"
                    headerColor="primary"
                    tabs={[
                        {
                            tabName: "Bugs",
                            tabIcon: BugReport,
                            tabContent: (
                                <Tasks
                                    checkedIndexes={[0, 3]}
                                    tasksIndexes={[0, 1, 2, 3]}
                                    tasks={bugs}
                                />
                            )
                        },
                        {
                            tabName: "Website",
                            tabIcon: Code,
                            tabContent: (
                                <Tasks
                                    checkedIndexes={[0]}
                                    tasksIndexes={[0, 1]}
                                    tasks={website}
                                />
                            )
                        },
                        {
                            tabName: "Server",
                            tabIcon: Cloud,
                            tabContent: (
                                <Tasks
                                    checkedIndexes={[1]}
                                    tasksIndexes={[0, 1, 2]}
                                    tasks={server}
                                />
                            )
                        }
                    ]}
                />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
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
            );
}
