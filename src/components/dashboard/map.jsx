import React, { useState } from "react";
import api from'../api/axios-instance'
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import './map.css'
import streetLightIcon from '../../assets/icons/streetlight.svg'
import '../../assets/icons/streetlight.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons/faCircleXmark";








function StreetLightMap(){

const [NewProperty , setNewProperty] = useState(
  {
    lat: null ,
    lng : null ,
    propertyType : null,
    state: null
    });

const [ShowNewPropertyForm , setShowNewPropertyForm] = useState(false);
const [ShowToast , setShowToast] = useState(false);




function MapOnclick(e) {
const lat= e.latLng.lat();
const lng = e.latLng.lng();

setNewProperty(prev => ({ ...prev, lat, lng }));
setShowNewPropertyForm(true);




console.log("NewProperty (click):", { lat, lng });



};

async function NewPropertySubmit(e) {
  e.preventDefault();
  const formattedProperty =
  {
    type: NewProperty.propertyType,
    location : {
    address : 'hmm' ,
    coordinates:{
      lat: NewProperty.lat ,
      lng : NewProperty.lng ,
   }},
    state : NewProperty.state};

  try {
    const response = await api.post("api/properties" , formattedProperty)
    console.log(response.data);
}
catch(error){
  console.log("Error creating property" ,error);
}



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
        <select name="property-type" value={NewProperty.propertyType}
        onChange={(e) =>
         setNewProperty(prev => ({...prev ,propertyType: e.target.value}))}   required>
          <option value=""></option>
          <option value="Streetlight">Streetlight </option>
          <option value="Bench">Bench</option>
          <option value="Garbage bin">Garbage bin</option>
        </select>
        <label htmlFor="state">State</label>
        <select name="state" value={NewProperty.state} onChange={(e) =>
          setNewProperty( prev => ({...prev , state: e.target.value}))
        } >
          <option value=""></option>
          <option value="working">Working</option>
          <option value="notWorking">Not Working</option>
        </select>
        <input type="submit" value="Create New Property" className="new-property-submit" />

  </form>
  {ShowToast &&(
              <span className='new-property-toast'> {NewProperty.propertyType} added successfully</span>
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