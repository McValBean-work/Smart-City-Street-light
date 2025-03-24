import React from "react";
import { APIProvider, Map ,Marker } from "@vis.gl/react-google-maps";
import './map.css'
import '../../assets/icons/streetlight.svg'


function StreetLightMap(){
    const currentPosition = { lat:5.6358, lng:-0.1614 };
    const apiKey = "AIzaSyD48PVvwczR-cT2dsJ3qxrGWiASf42OSSs";
    return(
        <div className="map-container-div">
            <APIProvider apiKey={apiKey} className="map-container">
                <Map zoom={10} center={currentPosition}>
                    <Marker position ={currentPosition}>
                    </Marker>
                </Map>
            </APIProvider>
        </div>
    )
}

export default StreetLightMap;