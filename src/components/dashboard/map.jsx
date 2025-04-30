import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import './map.css'
import streetLightIcon from '../../assets/icons/streetlight.svg'
import '../../assets/icons/streetlight.css'



function StreetLightMap(){
  const center = {
    lat: 5.6358,
    lng: -0.1614,
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // <-- Make sure this is set
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName="map-container"
      center={center}
      zoom={13}
      options={
        {
        draggable: true,
        zoomControl: true,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        restriction: {
          latLngBounds: {
            north: 11.1784,
            south: 4.7371,
            west: -3.2625,
            east: 1.1996,
          },
          strictBounds: false,
        },
      }}
    >
      <Marker position={center} icon={{ url: streetLightIcon, scaledSize: new window.google.maps.Size(60, 60),}} />
    </GoogleMap>
  ) : (
    <p>Loading Map...</p>
  );

}

export default StreetLightMap;