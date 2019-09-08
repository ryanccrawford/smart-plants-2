/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";
import CardFooter from "components/Card/CardFooter";

const useStyles = makeStyles(styles);

export default function Devices(props) {
    const classes = useStyles();
    console.log(props.devices);
  return (
      <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
              <Card>
                  <CardHeader color="primary">
                      <h4>Smart Plants 2 Devices</h4>
                      <p>Config, Add and Remove Devices.</p>
                  </CardHeader>
                  <CardBody></CardBody>
                  <CardFooter></CardFooter>
              </Card>
          </GridItem>
          {props.devices ? props.devices.map((index, device) => {


              return (

                  <GridItem xs={12} sm={6} md={4}>
                      <Card>
                          <CardHeader color="primary"></CardHeader>
                          <CardBody></CardBody>
                          <CardFooter></CardFooter>
                      </Card>
                  </GridItem>
             )

          }) : (null)}
         
    </GridContainer>
  );
}
