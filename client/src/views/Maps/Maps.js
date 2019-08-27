import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const  marker = {
    path: "M 12 22 c 4.97 0 9 -4.03 9 -9 c -4.97 0 -9 4.03 -9 9 Z M 5.6 10.25 c 0 1.38 1.12 2.5 2.5 2.5 c 0.53 0 1.01 -0.16 1.42 -0.44 l -0.02 0.19 c 0 1.38 1.12 2.5 2.5 2.5 s 2.5 -1.12 2.5 -2.5 l -0.02 -0.19 c 0.4 0.28 0.89 0.44 1.42 0.44 c 1.38 0 2.5 -1.12 2.5 -2.5 c 0 -1 -0.59 -1.85 -1.43 -2.25 c 0.84 -0.4 1.43 -1.25 1.43 -2.25 c 0 -1.38 -1.12 -2.5 -2.5 -2.5 c -0.53 0 -1.01 0.16 -1.42 0.44 l 0.02 -0.19 C 14.5 2.12 13.38 1 12 1 S 9.5 2.12 9.5 3.5 l 0.02 0.19 c -0.4 -0.28 -0.89 -0.44 -1.42 -0.44 c -1.38 0 -2.5 1.12 -2.5 2.5 c 0 1 0.59 1.85 1.43 2.25 c -0.84 0.4 -1.43 1.25 -1.43 2.25 Z M 12 5.5 c 1.38 0 2.5 1.12 2.5 2.5 s -1.12 2.5 -2.5 2.5 S 9.5 9.38 9.5 8 s 1.12 -2.5 2.5 -2.5 Z M 3 13 c 0 4.97 4.03 9 9 9 c 0 -4.97 -4.03 -9 -9 -9 Z",
    fillColor: 'lightblue',
    fillOpacity: 1,
    scale: 3,
    strokeColor: 'white',
    strokeWeight: 2
};
export default class Maps extends Component {
    constructor(props) {
        super(props)
        this.state = {
            position: {},

        }
    }


    CurrentLocation = () => {
        const axios = require('axios');

        axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDLkkn7FQnQHR0uC7kJIvmPrOa-m-ixXPw', {}).then((result) => {
            const pos = {lat: 28.731801599999997, lng: -81.3072384 } || {lat: result.data.location.lat, lng: result.data.location.lng }
            console.log(pos)
            this.setState({ position: pos })

        }).catch(error => {
            console.log(error);

        })


    }

    CustomSkinMap = withScriptjs(
        withGoogleMap(() => (
            <GoogleMap
                defaultZoom={16}
                defaultCenter={this.state.position}
                defaultOptions={{
                    scrollwheel: true,
                    zoomControl: true,
                    styles: [
                        {
                            featureType: "water",
                            stylers: [
                                { saturation: 43 },
                                { lightness: -11 },
                                { hue: "#007FEF" }
                            ]
                        },
                        {
                            featureType: "road",
                            elementType: "geometry.fill",
                            stylers: [
                                { hue: "#ff0000" },
                                { saturation: -100 },
                                { lightness: 99 }
                            ]
                        },
                        {
                            featureType: "road",
                            elementType: "geometry.stroke",
                            stylers: [{ color: "#808080" }, { lightness: 54 }]
                        },
                        {
                            featureType: "landscape.man_made",
                            elementType: "geometry.fill",
                            stylers: [{ color: "#ece2d9" }]
                        },
                        {
                            featureType: "poi.park",
                            elementType: "geometry.fill",
                            stylers: [{ color: "#ccdca1" }]
                        },
                        {
                            featureType: "road",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#767676" }]
                        },
                        {
                            featureType: "road",
                            elementType: "labels.text.stroke",
                            stylers: [{ color: "#ffffff" }]
                        },
                        { featureType: "poi", stylers: [{ visibility: "off" }] },
                        {
                            featureType: "landscape.natural",
                            elementType: "geometry.fill",
                            stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
                        },
                        { featureType: "poi.park", stylers: [{ visibility: "off" }] },
                        {
                            featureType: "poi.sports_complex",
                            stylers: [{ visibility: "off" }]
                        },
                        { featureType: "poi.medical", stylers: [{ visibility: "off" }] },
                        {
                            featureType: "poi.business",
                            stylers: [{ visibility: "off" }]
                        }
                    ]
                }}
            >
                <Marker
                    icon={marker}
                    position={this.state.position} />
            </GoogleMap>
        ))
    );
    componentDidMount() {
        this.CurrentLocation();
    }
    render() {
        const CsM = this.CustomSkinMap
        return (
            <CsM
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDLkkn7FQnQHR0uC7kJIvmPrOa-m-ixXPw"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100vh` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        );
    }
}
