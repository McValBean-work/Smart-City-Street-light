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
                <Map minZoom={3} maxZoom={20} center={currentPosition}  gestureHandling="auto" disableDefaultUI={false} options={{
    restriction: {
      latLngBounds: {
        north: 11.1784,   // Top edge of Ghana
        south: 4.7371,    // Bottom edge
        west: -3.2625,    // Left edge
        east: 1.1996      // Right edge
      },
      strictBounds: true,
    },
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  }}>
                    <Marker position ={currentPosition} disable>
                    </Marker>
                </Map>
            </APIProvider>
        </div>
    )
}

export default StreetLightMap;