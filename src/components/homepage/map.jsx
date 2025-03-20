import React from "react";
import { MapContainer, TileLayer, Marker , Popup  } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import './map.css'
import '../../assets/icons/streetlight.svg'

function StreetLightMap(){
    const currentPosition = [7.9465, -1.0232];
    return(
        <div className="map-container-div">
        <MapContainer center={currentPosition} zoom={1} className="map-container" style={{ width: "100%", height: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" className="tile-layer" noWrap={true} />
            <Marker position={currentPosition} >
                <Popup>
                    <p>hi there</p>
                </Popup>
            </Marker>
            </MapContainer>
        </div>
    )
}

export default StreetLightMap;