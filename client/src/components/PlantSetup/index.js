import React, { Component } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import ImageCapture from './ImageCapture';

class PlantSetup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            plantName: ""
        }
    }

    componentDidMount() {
     

    }
    componentDidUpdate() {
     
    }

 



    render() {

        return (
            <div>
                <ImageCapture />
                <span>Or</span>
                <TextField
                    id="plant-name-typed"
                    label="Plant Household Common Name"
                    value={this.state.plantNameTyped}
                    onChange={handleChange('name')}
                    margin="normal"
                />
            </div>
        );


    }


}


export default PlantSetup;