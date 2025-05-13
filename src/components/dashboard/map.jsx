import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import './map.css'
import streetLightIcon from '../../assets/icons/streetlight.svg'
import '../../assets/icons/streetlight.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons/faCircleXmark";








function StreetLightMap(){

const [NewProperty , setNewProperty] = useState({lat: null , lng : null , propertyType : null});
const [ShowNewPropertyForm , setShowNewPropertyForm] = useState(false);
const [ShowToast , setShowToast] = useState(false);




function MapOnclick(e) {
const lat= e.latLng.lat();
const lng = e.latLng.lng();


setNewProperty({lat:lat, lng:lng});
setShowNewPropertyForm(true);




console.log("NewProperty (click):", { lat, lng });



};

function NewPropertySubmit(e) {
  e.preventDefault();
  setShowToast(true);
  console.log(NewProperty);
};

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
      {ShowNewPropertyForm && (<Marker position={NewProperty} icon={{ url: streetLightIcon, scaledSize: new window.google.maps.Size(60, 60),}} />)}
    </GoogleMap>
    {ShowNewPropertyForm && (
      <>
      <div className='form-overlay'>
      <div className="new-property-form-div">
      <div>
        <button onClick={() => {setShowNewPropertyForm(false); setShowToast(false);}} className="close-button">
          <FontAwesomeIcon icon={faCircleXmark} className='close-button-icon' />
        </button>

        <h1 className='create-property-header'>Create New Property</h1>
      <form onSubmit={NewPropertySubmit} className="new-property-form">
        <label htmlFor="lat">Lat:</label>
        <input type="text" value={NewProperty.lat} readOnly required/>
        <label htmlFor="lng">Lng:</label>
        <input type="text" value= {NewProperty.lng} readOnly required/>
        <label htmlFor="property-type">Property type</label>
        <select name="property-type" value={NewProperty.propertyType}onChange={(e) => setNewProperty(prev => ({...prev ,propertyType: e.target.value}))} required>
          <option value=""></option>
          <option value="streetlight">Streetlight </option>
          <option value="bench">Bench</option>
          <option value="garbage bin">Garbage bin</option>
        </select>
        <input type="submit" value="Create New Property" className="new-property-submit" />

  </form>
  {ShowToast &&(
              <span className='new-property-toast'>Success, new property created</span>
)}
      </div>
    </div>
    </div>

    </>
    )}

    </>
  )
  : (
    <p>Loading Map...</p>

  );

}

export default StreetLightMap;