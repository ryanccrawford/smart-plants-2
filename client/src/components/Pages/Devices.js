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
require('dotenv').config();
const server = process.env.DEV_SERVER || process.env.PRODUCTION_SERVER || "http://localhost:3001"

class Devices extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {


    }
    componentDidUpdate() {

    }

    handleChange = (e) => {


    }

    handleSubmit = (e) => {


    }


    render() {

        return (
            <Container maxWidth="sm">


            </Container>

        );


    }


}


export default Device;