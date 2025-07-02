import  { useEffect, useState, useRef } from "react";
import api from '../api/axios-instance'
import { GoogleMap,useJsApiLoader, MarkerF, InfoWindowF, Circle} from "@react-google-maps/api";
import './map.css'
import './dashboard.css'
import streetLightIcon from '../../assets/icons/streetlight.svg'
import bench from '../../assets/icons/bench.svg'
import garbageBin from '../../assets/icons/garbage-basket.svg'
import '../../assets/icons/streetlight.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark} from "@fortawesome/free-solid-svg-icons/faCircleXmark";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import NewGeolocationPropertyForm from '../Roles/supervisor/create-property-geolocation-form'
import getRole from "../Authentication-page/auth";








function StreetLightMap(){

const [showForm, setShowForm]= useState(false);
const [properties , setProperties] = useState([]);
const [mapZoom, setMapZoom] = useState(13);
const mapRef = useRef();
const [selectedMarker , setSelectedMarker] = useState();
const [showDeletePrompt, setShowDeletePrompt] = useState(false);
const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
const [currentPropertyId, setCurrentPropertyId] = useState(null);
const [updatedState, setUpdatedState] = useState({
  state:null
})
const role = getRole();





  async function getProperties(){
  const res = await api.get( "api/properties");
  setProperties(res.data);
  console.log(res.data);
}

useEffect(()=>{
  getProperties();
  console.log("use effect get properties called");
},[]);

const InitialNewPropertyState ={
    propertyId: "" ,
    address: "",
    lat: "" ,
    lng: "" ,
    propertyType : "",
    state: ""
    };
const [NewProperty , setNewProperty] = useState(InitialNewPropertyState
  );

const [ShowNewPropertyForm , setShowNewPropertyForm] = useState(false);

function HandleMarkerClick(children){
  setSelectedMarker(children);
}

function getRadiusForZoom(zoom) {
  const baseZoom = 15;
  const baseRadius = 200; // radius in meters
  return baseRadius * Math.pow(2, baseZoom - zoom);
}


async function HandleUpdateStateOnClick(propertyId){
  setCurrentPropertyId(propertyId);
  console.log(propertyId)
  const res = await api.get(`api/properties/${propertyId}`);
  console.log(res.data)
  setShowUpdatePrompt(true);

}
async function HandleDeleteButtonOnClick(propertyId){
  setCurrentPropertyId(propertyId);
  console.log(propertyId)
  const res = await api.get(`api/properties/${propertyId}`);
  console.log(res.data)
  setShowDeletePrompt(true);

}

async function UpdateStateSubmit(e){
  e.preventDefault()
  console.log(currentPropertyId)

  try{
    const res = await api.patch(`api/properties/${currentPropertyId}`,updatedState);
    console.log(res.data);
    toast.success(res.data.message || 'Property state updated')

    setUpdatedState({
      state:null
    });
    await getProperties();
    setShowDeletePrompt(false);
setShowUpdatePrompt(false);
setCurrentPropertyId(null);


  }
  catch(error){
    console.log(error);
    toast.error(error.response?.data?.message || 'Error updating property state')
  }

}
async function DeletePropertySubmit(e){
  e.preventDefault()
  console.log(currentPropertyId)

  try{
    const res = await api.delete(`api/properties/${currentPropertyId}`);
    console.log(res.data);
    toast.success(res.data.message || 'Property deleted')

    await getProperties();
    setShowDeletePrompt(false);
    setShowUpdatePrompt(false);
    setCurrentPropertyId(null);



  }
  catch(error){
    console.log(error);
    toast.error(error?.response?.data?.message || 'Error deleting property')
  }

}


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
    propertyId: '',
    type: NewProperty.propertyType,
    address : NewProperty.address ,
      lat: NewProperty.lat ,
      lng : NewProperty.lng ,
    state : NewProperty.state};

  try {
    const response = await api.post("api/properties", formattedProperty)
    console.log(response.data);
    console.log('properties refreshed')
    toast.success(response.data.message || 'Created new property')
    await getProperties();

}
catch(error){
  console.log("Error creating property" ,error);
  toast.error(error?.response?.data.message || 'Error creating property')
}

finally{
  setShowNewPropertyForm(false);
  setNewProperty(InitialNewPropertyState);
  console.log(NewProperty);
}

  
};

  const center = {
    lat: 5.6358,
    lng: -0.1614,
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // <-- this is for your api key in your env file that we cannot type out directly
  });

  return isLoaded ? (
    <>
    <p>Click on map to add new property or <button onClick={()=> setShowForm(true)}
      style={{color:'blue'}}> use your location </button></p>

    <GoogleMap
      mapContainerClassName="map-container"
      center={center}
      zoom={mapZoom}
      onZoomChanged={() => {
    const newZoom = mapRef.current?.getZoom();
    if (newZoom !== undefined) setMapZoom(newZoom);
  }}
      onClick={ ['admin', 'supervisor'].includes(role) && MapOnclick}
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
        {
              Array.isArray(properties) &&
              properties.map((property) => (
                <>
                <Circle
              center={{
                lat:property.location.coordinates.lat, 
                lng:property.location.coordinates.lng
              }}
              radius={getRadiusForZoom(mapZoom)}
              options={{
                fillColor: property.state === 'working' ? 'green' : 'red',
                fillOpacity:0.6,
                zIndex:0
              }} />
              <MarkerF
              key={property._id}
              icon={property.type === 'garbage-bin' ? {url: garbageBin, scaledSize: new google.maps.Size(40,40)}
              :property.type === 'bench' ? {url: bench, scaledSize: new google.maps.Size(60,40)}
              : {url: streetLightIcon, scaledSize: new google.maps.Size(40,40)}
              }
              position={{lat:property.location.coordinates.lat,
                lng:property.location.coordinates.lng}
              }
              onClick={() => {HandleMarkerClick(property._id);
}}
zIndex={1}
              >
              </MarkerF>
              
               {
                selectedMarker === property._id &&(
                <InfoWindowF
                onCloseClick={() => setSelectedMarker(null)}
                position={{lat:property.location.coordinates.lat,
                lng:property.location.coordinates.lng}
              } >

                    <>
                    <p className="property-id">{property.propertyId}</p>
                    <p><span className='show-more-title'>Type:</span>
                    {property.type}
                    </p>
                    <p>
                      <span className='show-more-title'>State:</span>
                      {property.state}
                      </p>
                    <p><span className='show-more-title'>Address:</span>
                        {property.location.address}
                        </p>
                    <p>
                      <button onClick={()=>{HandleUpdateStateOnClick(property._id)}}
                        className='update-btn'>
                          Update
                        </button>
                        {['admin','supervisor'].includes(role) && <button onClick={()=> {HandleDeleteButtonOnClick(property._id)}}
                          className="delete-btn">
                        Delete
                        </button>}
                    </p>
                      <p><Link to ={`https://www.google.com/maps?q=${property.location.coordinates.lat},${property.location.coordinates.lng}`} target='_blank' >Get directions to property</Link></p>
                        </>

                </InfoWindowF>

                )

              }
              </>

            )
            )
          }
          {
  showDeletePrompt && (
    <>
    <div className='form-overlay'>
      <div className='confirm-delete'>
        <button onClick={() => setShowDeletePrompt(false)}
          className="close-pop-up-button">
        X
      </button>
      <div>
        <span>Are you sure you want to delete this property?</span>
      <button onClick={DeletePropertySubmit} className="confirm-delete-button">
         Confirm delete
      </button>
      </div>
      </div>

    </div>
    </>
  )
}
{
  showUpdatePrompt &&(
    <>
    <div className='form-overlay'>
      <div className='confirm-delete'>
        <button onClick={() => setShowUpdatePrompt(false)}
          className='close-pop-up-button'>
        X
      </button>
      <select name="updatedState"
      value={updatedState.state}
      onChange ={ (e) =>(
      setUpdatedState(prev =>({...prev, state: e.target.value})))}>

    <option value="">Select State</option>
    <option value="working">Working</option>
    <option value="damaged">Damaged</option>
    <option value="pending">Pending</option>
    <option value="under_repair">Under repair</option>
    <option value="fixed">Fixed</option>
    </select>
    <button onClick={UpdateStateSubmit} className='submit'>
      Update State
    </button>


      </div>
    </div>
    </>
  )
}
      {ShowNewPropertyForm && (<MarkerF position={NewProperty} />)}
    </GoogleMap>
    {ShowNewPropertyForm && (
      <>
      <div className='form-overlay'>
      <div className="new-property-form-div">
      <div>
        <button onClick={() => {
          setNewProperty(InitialNewPropertyState);
          setShowNewPropertyForm(false);}} className="close-button">
          <FontAwesomeIcon icon={faCircleXmark} className='close-button-icon' />
        </button>

        <h1 className='create-property-header'>Create New Property</h1>
      <form onSubmit={NewPropertySubmit} className="new-property-form">
        <label htmlFor="address">Address</label>
        <input type="text" placeholder="Enter address" value={NewProperty.address}
        onChange={(e) =>
         setNewProperty(prev => ({...prev ,address: e.target.value}))}  />
        <label htmlFor="lat">Lat:</label>
        <input type="text" value={NewProperty.lat} readOnly required/>
        <label htmlFor="lng">Lng:</label>
        <input type="text" value= {NewProperty.lng} readOnly required/>
        <label htmlFor="property-type">Property type</label>
        <select name="property-type" value={NewProperty.propertyType}
        onChange={(e) =>
         setNewProperty(prev => ({...prev ,propertyType: e.target.value}))}   required>
          <option value="">select type</option>
          <option value="streetlight">Streetlight </option>
          <option value="bench">Bench</option>
          <option value="garbage-bin">Garbage bin</option>
        </select>
        <label htmlFor="state">State</label>
        <select name="state" value={NewProperty.state} onChange={(e) =>
          setNewProperty( prev => ({...prev , state: e.target.value}))
        } >
          <option value="">select state</option>
          <option value="working">Working</option>
          <option value="damaged">Damaged</option>
        </select>
        <input type="submit" value="Create New Property" className="new-property-submit" />

  </form>

      </div>
    </div>
    </div>

    </>
    )}
    {showForm && (
      <>
      <NewGeolocationPropertyForm onClose={() => setShowForm(false)} />
      </>
    )}

    </>
  )
  : (
    <p>Loading Map...</p>

  );

}

export default StreetLightMap;