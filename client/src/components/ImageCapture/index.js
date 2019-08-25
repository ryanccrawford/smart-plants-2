import React, { Component } from 'react';




class ImageCapture extends Component {

    constructor(props) {
        super(props)
        this.state = {
            imageFile: ""

        }
    }


    render() {

        return(
            <div>
                <form action="/upload" method="post" enctype="multipart/form-data">
                    <input type="file" accept="image/*" capture="camera" name="image" />
                    <input type="submit" value="upload" />
                </form>
            </div>
        );


    }


}


export default ImageCapture;