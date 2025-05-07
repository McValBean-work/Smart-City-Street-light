import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import './map.css'
import streetLightIcon from '../../assets/icons/streetlight.svg'
import '../../assets/icons/streetlight.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons/faCircleXmark";





function NewPropertySubmit(e) {
  e.preventDefault();
  console.log("success, created new property");


}

function StreetLightMap(){

const [NewProperty , setNewProperty] = useState({lat: null , lng : null});
const [ShowNewPropertyForm , setShowNewPropertyForm] = useState(false);

function MapOnclick(e) {
const Lat= e.latLng.lat();
const Lng = e.latLng.lng();


setNewProperty({lat:Lat, lng:Lng});
setShowNewPropertyForm(true);



console.log({NewProperty});




}
  const center = {
    lat: 5.6358,
    lng: -0.1614,
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // <-- Make sure this is set
  });

  return isLoaded ? (
    <>
    <GoogleMap
      mapContainerClassName="map-container"
      center={center}
      zoom={13}
      onClick={MapOnclick}
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
    {ShowNewPropertyForm && (
      <div className='form-overlay'>
      <div className="new-property-form-div">
        <button onClick={() => setShowNewPropertyForm(false)} className="close-button">
          <FontAwesomeIcon icon={faCircleXmark} className='close-button-icon' />
        </button>
      <div>
        <h1>Create New Property</h1>
      <form onSubmit={NewPropertySubmit} className="new-property-form">
        <label htmlFor="lat">Lat:</label>
        <input type="text" value={NewProperty.lat} read-only required/>
        <label htmlFor="lng">Lng:</label>
        <input type="text" value= {NewProperty.lng} read-only required/>
        <label htmlFor="property-type">Property type</label>
        <select name="property-type" required>
          <option value="streetlight">streetlight </option>
          <option value="bench">bench</option>
          <option value="garbage bin">Garbage bin</option>
        </select>
        <input type="submit" value="Create New Property" className="new-property-submit" />
      </form>
      </div>
    </div>
    </div>
    )}

    </>
  )
  : (
    <p>Loading Map...</p>

  );

}

export default StreetLightMap;