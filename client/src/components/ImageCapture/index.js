import React, { Component } from 'react';
import axios from 'axios';



class ImageCapture extends Component {

    constructor(props) {
        super(props)
        this.state = {
            file: null,
            message: ""

        }
    }

    onFormSubmit = (event) => {

        event.preventDefault();
        const formData = new FormData();
        console.log(this.state.file)
        formData.append('image', this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("http://10.0.0.12:3001/vision", formData, config)
            .then((response) => {
                console.log(response.data)
                this.setState({message: response.data})
            }).catch((error) => {
                console.log(error)
            }); 

    }


   
    onChange = (e) => {
        this.setState({ file: e.target.files[0] });
    }


    render() {

        return(
            <div>
                {this.state.message ? (<div>{JSON.stringify(this.state.message).toString()}</div>) : (null)}
                <form method="post" encType="multipart/form-data" onSubmit={this.onFormSubmit}>
                    <input type="file" accept="image/*" capture="camera" name="image" onChange={this.onChange}  />
                    <input type="submit" value="upload" />
                </form>
            </div>
        );


    }


}


export default ImageCapture;