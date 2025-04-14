import React from "react";
import { APIProvider, Map ,Marker } from "@vis.gl/react-google-maps";
import './map.css'
import '../../assets/icons/streetlight.svg'


function StreetLightMap(){
    const currentPosition = { lat:5.6358, lng:-0.1614 };
    const googleApiKey = import.meta.env;
    return(
        <div className="map-container-div">
            <APIProvider apiKey={googleApiKey.VITE_GOOGLE_MAPS_API_KEY} className="map-container">
                <Map minZoom={3} maxZoom={20} center={currentPosition}>
                    <Marker position ={currentPosition}>
                    </Marker>
                </Map>
            </APIProvider>
        </div>
    )
}

export default StreetLightMap;