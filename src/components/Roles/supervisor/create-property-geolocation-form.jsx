import { toast } from "react-toastify";
import { useState, useEffect} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark} from "@fortawesome/free-solid-svg-icons/faCircleXmark";
import api from '../../api/axios-instance'

function NewGeolocationPropertyForm({ onClose }){

    const InitialNewPropertyState ={
    propertyId: "" ,
    address: "",
    lat: "" ,
    lng: "" ,
    propertyType : "",
    state: ""
    };

    const[newProperty, setNewProperty] = useState(InitialNewPropertyState);
    const [showGeolocationForm, setShowGeolocationForm] = useState(false);


    useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setNewProperty((prev) => ({
          ...prev,
          lat: latitude,
          lng: longitude
        }));
        setShowGeolocationForm(true); // <-- only show form after coords
      },
      (error) => {
        toast.error("Unable to fetch location.");
      }
    );
  } else {
    toast.error("Geolocation is not supported by this device");
  }
}, []);


async function NewPropertySubmit(e) {
  e.preventDefault();
  const formattedProperty =
  {
    propertyId: '',
    type: newProperty.propertyType,
    address : newProperty.address ,
      lat: newProperty.lat ,
      lng : newProperty.lng ,
    state : newProperty.state};

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
    console.log(newProperty);
    setNewProperty(InitialNewPropertyState);
    setShowGeolocationForm(false);
}

 
};

    return(
        <>
            {showGeolocationForm && (
                  <>
                  <div className='form-overlay'>
                  <div className="new-property-form-div">
                  <div>
                    <button onClick={() => {
                      setNewProperty(InitialNewPropertyState);
                      setShowGeolocationForm(false); onClose();}} className="close-button">
                      <FontAwesomeIcon icon={faCircleXmark} className='close-button-icon' />
                    </button>
                    <h1 className='create-property-header'>Create New Property</h1>
                    <form onSubmit={NewPropertySubmit} className="new-property-form">
                    <label htmlFor="address">Address</label>
                    <input type="text" placeholder="Enter address" value={newProperty.address}
                    onChange={(e) =>
                     setNewProperty(prev => ({...prev ,address: e.target.value}))}  />
                    <label htmlFor="lat">Lat:</label>
                    <input type="text" value={newProperty.lat} readOnly required/>
                    <label htmlFor="lng">Lng:</label>
                    <input type="text" value= {newProperty.lng} readOnly required/>
                    <label htmlFor="property-type">Property type</label>
                    <select name="property-type" value={newProperty.propertyType}
                    onChange={(e) =>
                     setNewProperty(prev => ({...prev ,propertyType: e.target.value}))}   required>
                      <option value="">select type</option>
                      <option value="streetlight">Streetlight </option>
                      <option value="bench">Bench</option>
                      <option value="garbage-bin">Garbage bin</option>
                    </select>
                    <label htmlFor="state">State</label>
                    <select name="state" value={newProperty.state} onChange={(e) =>
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
}







export default NewGeolocationPropertyForm;