import React, { Component } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import ImageCapture from '../ImageCapture';
import { FormControl } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

class PlantSetup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            plantNameTyped: "",
            plantData: null,
            selectedIndex: 0
        }
    }

    componentDidMount() {
        this.setState({ plantNameTyped: "" ,selectedIndex: 0})

    }
    componentDidUpdate() {

    }

    handleListItemClick = (event, index) => {
        this.setState({ selectedIndex: index});
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
        const endPoint = "http://10.0.0.12:3001/plants/name/" + this.state.plantNameTyped;
        axios.get(endPoint)
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
            <Container maxWidth="sm">
               
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
                    <List component="nav" aria-label="main mailbox folders">
                
                {this.state.plantData ? (this.state.plantData.map((plant, index) => {
                

                        return (
                      
                                <ListItem
                                key={index}
                                button
    
                                selected={this.state.selectedIndex === parseInt(index)}
                                data-link={plant.link}
                                onClick={(event) => this.handleListItemClick(index)}
                                >
                                <ListItemText primary={(plant.common_name ? plant.common_name.toUpperCase() : (<em>{plant.scientific_name.toUpperCase()}</em>))}
                                    secondary={(plant.common_name ? <em>{plant.scientific_name.toLowerCase()}</em> : (""))} />
                                </ListItem>
                            
                            )
                      
                    })) : (null)}
                            </List>
                {this.state.isLoading ? (
                    <CircularProgress className={"progress"} color="secondary" />
                    ) : (null)}
                </div>
            </Container>

        );


    }


}


export default PlantSetup;