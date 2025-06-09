import  { useEffect, useState } from "react";
import api from '../api/axios-instance'
import { GoogleMap,useJsApiLoader, MarkerF, InfoWindowF} from "@react-google-maps/api";
import './map.css'
import streetLightIcon from '../../assets/icons/streetlight.svg'
import '../../assets/icons/streetlight.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons/faCircleXmark";
import { toast } from "react-toastify";








function StreetLightMap(){

const [properties , setProperties] = useState([]);
const [selectedMarker , setSelectedMarker] = useState();
const [showDeletePrompt, setShowDeletePrompt] = useState(false);
const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
const [currentPropertyId, setCurrentPropertyId] = useState(null);
const [updatedState, setUpdatedState] = useState({
  state:null
})




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
    toast.error(error.response?.data?.message || 'Error updatng poroperty state')
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


  console.log(NewProperty);
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
        {
              Array.isArray(properties) &&
              properties.map((property) => (
                <>
              <MarkerF
              key={property._id}
              icon={{url: streetLightIcon, scaledSize: new window.google.maps.Size(60, 60)}}
              position={{lat:property.location.coordinates.lat,
                lng:property.location.coordinates.lng}
              }
              onClick={() => {HandleMarkerClick(property._id);
}}
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
                    <p>This property, {property.propertyId} is {property.state}</p>
                      <button onClick={()=>{HandleUpdateStateOnClick(property._id)}}>
                          Update status
                        </button>
                        <button onClick={()=> {HandleDeleteButtonOnClick(property._id)}}>
                        Delete
                        </button>
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
        <div onClick={() => setShowDeletePrompt(false)}>
        X
      </div>

      <span>Are you sure you want to delete this property?</span>
      <button onClick={DeletePropertySubmit} className="confirm-delete-button"> Confirm delete</button>


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
        <div onClick={() => setShowUpdatePrompt(false)}>
        X
      </div>
      <select name="updatedState"
      value={updatedState.state}
      onChange ={ (e) =>(
      setUpdatedState(prev =>({...prev, state: e.target.value})))}
    id="">
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
      {ShowNewPropertyForm && (<MarkerF position={NewProperty} icon={{ url: streetLightIcon, scaledSize: new window.google.maps.Size(40, 40),}} />)}
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
          <option value="garbage bin">Garbage bin</option>
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

    </>
  )
  : (
    <p>Loading Map...</p>

  );

}

export default StreetLightMap;