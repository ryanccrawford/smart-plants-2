import React, { Component } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import SelectItem from '../SelectItem';
require('dotenv').config();
const server = process.env.DEV_SERVER || process.env.PRODUCTION_SERVER || "http://localhost:3001"
class ImageCapture extends Component {

    constructor(props) {
        super(props)
        this.state = {
            file: null,
            labels: null,
            isLoading: false,
            plantName: "",
            plants: null
        }
    }

    onFormSubmit = (event) => {

        event.preventDefault();
        const formData = new FormData();

        formData.append('image', this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        this.setState({ isLoading: true }, () => { this.processImage(formData, config) })

    }

    processImage = (formData, config) => {

        axios.post( server + "vision", formData, config)
            .then((response) => {
                console.log("Vison API Returning");
                console.log(response.data);
                this.setState({ isLoading: false, labels: response.data.labels });
            }).catch((error) => {
                this.setState({ isLoading: false }, () => { console.log(error) });
            });
    }



    componentDidMount() {
        this.setState({ file: null, labels: null})

    }
    componentDidUpdate() {
        console.log("Component Did Update")
        console.log(this.state.labels)
        console.log(this.state.plantName)
    }

    onChange = (e) => {
        this.setState({ file: e.target.files[0] });
    }

    selectHandleChange = (event) => {
        console.log(event.target.value)
        const pname = event.target.value
        this.props.processPlant(pname)
        //this.setState({ plantName: pname});


    }



    render() {

        return (
            <div>
                {this.state.labels ? (
                    <div>
                        <img src={this.state.file} alt="..." />
                        <h3>Select the one that best matches your image:</h3>
                        <form>
                            <SelectItem
                                handleChange={this.selectHandleChange}
                                menuItems={this.state.labels}
                                name={"plantName"}
                                value={this.state.plantName}
                                label={"Plant"}
                                hint={"Select a name or enter your own"}
                            />
                        </form>
                     </div>) : (
                    <form method = "post" encType = "multipart/form-data" onSubmit = {this.onFormSubmit}>
                    <input type="file" accept="image/*" capture="camera" name="image" onChange={this.onChange} />
                {this.state.isLoading ? (
                    <CircularProgress className={"progress"} color="secondary" />
                ) : (
                        <input type="submit" value="upload" />
                    )}
                </form>
        )
    }
            </div>
        );


    }


}


export default ImageCapture;