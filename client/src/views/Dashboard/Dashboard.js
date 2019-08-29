import React from "react";
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
import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
                  <DeviceDataGauge
                      name="Soil Moisture Level"
                      icon={() => (<Store/>)}
                      color="green"
                      value={687}
                      max={1024}
                      min={0}
                      customUnit=" Mu"
                      isCustom={true}
                      isPercent={false}
                      isDegree={false}
                      isTemp={false}
                      isNumber={false}
                      scaleList={[{ scale: 10, quantity: 4, startColor: '#327aff', endColor: '#327aff' },
                            { scale: 5, quantity: 4, startColor: '#327aff', endColor: 'orange' },
                            { scale: 20, quantity: 4, startColor: 'orange', endColor: 'red' }]}
                   />
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
                  <DeviceDataGauge
                      name="Soil Moisture Level"
                      icon={() => (<Store />)}
                      color="green"
                      value={687}
                      max={1024}
                      min={0}
                      customUnit=" Mu"
                      isCustom={true}
                      isPercent={false}
                      isDegree={false}
                      isTemp={false}
                      isNumber={false}
                      scaleList={[{ scale: 10, quantity: 4, startColor: '#327aff', endColor: '#327aff' },
                      { scale: 5, quantity: 4, startColor: '#327aff', endColor: 'orange' },
                      { scale: 20, quantity: 4, startColor: 'orange', endColor: 'red' }]}

                  />
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
                  <DeviceDataGauge
                      name="Soil Moisture Level"
                      icon={() => (<Store />)}
                      color="green"
                      value={687}
                      max={1024}
                      min={0}
                      customUnit=" Mu"
                      isCustom={true}
                      isPercent={false}
                      isDegree={false}
                      isTemp={false}
                      isNumber={false}
                      scaleList={[{ scale: 10, quantity: 4, startColor: '#327aff', endColor: '#327aff' },
                      { scale: 5, quantity: 4, startColor: '#327aff', endColor: 'orange' },
                      { scale: 20, quantity: 4, startColor: 'orange', endColor: 'red' }]}

                  />
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
                  <DeviceDataGauge
                      name="Soil Moisture Level"
                      icon={() => (<Store />)}
                      color="green"
                      value={687}
                      max={1024}
                      min={0}
                      customUnit=" Mu"
                      isCustom={true}
                      isPercent={false}
                      isDegree={false}
                      isTemp={false}
                      isNumber={false}
                      scaleList={[{ scale: 10, quantity: 4, startColor: '#327aff', endColor: '#327aff' },
                      { scale: 5, quantity: 4, startColor: '#327aff', endColor: 'orange' },
                      { scale: 20, quantity: 4, startColor: 'orange', endColor: 'red' }]}

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
                      icon={<Cloud/>}
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
