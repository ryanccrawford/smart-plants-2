import React, { Component } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import ImageCapture from '../ImageCapture';
import { FormControl } from '@material-ui/core';

class PlantSetup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            plantNameTyped: "",
            plantData: {}
        }
    }

    componentDidMount() {
        this.setState({ plantNameTyped: "" })

    }
    componentDidUpdate() {

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

    processPlant = () => {
        const endPoint = "http://192.168.1.3:3001/plants/name/" + this.state.plantNameTyped;
        axios.post(endPoint)
            .then((response) => {
                console.log("Plant Name Look Up");
                console.log(response.data);
                this.setState({ isLoading: false, plantData: response.data });
            }).catch((error) => {
                this.setState({ isLoading: false }, () => { console.log(error) });
            });
    }

    render() {

        return (
            <div>
                <ImageCapture
                    processPlant={this.processPlant}
                />
                <span>Or</span>
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
                {this.state.isLoading ? (
                    <CircularProgress className={"progress"} color="secondary" />
                ) : (null)}
            </div>
        );


    }


}


export default PlantSetup;