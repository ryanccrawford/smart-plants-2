import React, { Component } from 'react';

import Container from '@material-ui/core/Container';

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