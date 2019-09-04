import React, { Component } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import ImageCapture from 'components/ImageCapture';
import { FormControl } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import axios from 'axios';
require('dotenv').config();




class PlantSetup extends Component {

    constructor(props) {
        super(props)
        this.server = "";

        this.state = {
            isLoading: false,
            plantNameTyped: "",
            plantData: null,
            selectedIndex: 0,
            plantDetails: null,
            plants:[]
        }
        console.log(this.server)
    }

    componentDidMount() {
        this.setState({ plantNameTyped: "" ,selectedIndex: 0})

    }
    componentDidUpdate() {
        if (this.state.plantData && this.state.plantData != null) {
            console.log(this.state.plantData)
            this.getImageAvatar(this.state.plantData)
        }

    }



    handleChange = (e) => {
       // e.preventDefault();
        this.setState({ plantNameTyped: e.target.value });

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.lookUpPlant();

    }

    lookUpPlant = () => {

        this.setState({ isLoading: true },this.processPlant)

    }

    getImageAvatar = (plants) => {

        plants.forEach((plant) => {


            const endPoint = this.server + "plants/id/" + plant.id;
            axios.get(endPoint)
                .then((response) => {
                    let plantCard = this.plantData(response.data)
                    console.log(plantCard)
                    this.setState({ plants: [...this.state.plants, plantCard] })
                }

                ).catch((error) => {
                    return (null)
                });
        })
    }
    plantCard = (data) => {

        return (
            <GridItem xs={12} sm={12} md={4}>
            <Card profile>
                {data.images ? (
                    <CardAvatar profile >
                        <img src={data.images[0].url} alt="..." />
                    </CardAvatar >
                ) : (null)}

                <CardBody profile>
                    <h6>{data.main_species.common_name ? data.main_species.common_name.toUpperCase() : (<em>{data.scientific_name.toUpperCase()}</em>)}</h6>
                    {data.main_species.common_name ? (<h4><em>{data.scientific_name.toLowerCase()}</em></h4>) : (null)}
                    <p>
                        Testing
                            </p>
                    <Button
                        color="primary"
                        round
                        name={data.id}
                        onClick={this.handleListItemClick}
                    >
                        Select
                                     </Button>
                </CardBody>
            </Card>
        </GridItem>)
    }

    processPlant = () => {
        const endPoint = this.server + "plants/name/" + this.state.plantNameTyped;
        axios.get(endPoint)
            .then((response) => {
                console.log("Plant Name Look Up");
                console.log(response.data);

                this.setState({ isLoading: false, plantData: response.data })
            }).catch((error) => {
                this.setState({ isLoading: false }, () => { console.log(error) });
            });
    }


    render() {

        return (
            <Container maxWidth="sm">

            <div>
                <ImageCapture
                    processPlant={this.processPlant}
                />
                    <span style={{ textAlign: "center" }}>Or</span>
                <FormControl>
                    <TextField
                        className="active"
                    id="plant-name-typed"
                    l
                    value={this.state.plantNameTyped}
                    onChange={this.handleChange}
                    margin="normal"
                    />
                    <br/>
                    <button onClick={this.handleSubmit}>Find</button>
                    </FormControl>
                    <GridContainer>
                        {this.state.plants.map((item, index) => {

                            return item;

                        })}
                    </GridContainer>
                {this.state.isLoading ? (
                    <CircularProgress className={"progress"} color="secondary" />
                    ) : (null)}
                </div>
            </Container>

        );


    }


}


export default PlantSetup;