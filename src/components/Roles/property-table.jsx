import api from "../api/axios-instance";
import { useState, useEffect } from "react";
import '../dashboard/dashboard.css'
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function PropertyTable(){
  const location = useLocation();
  const onDashboard = location.pathname === "/portal/dashboard"; // or whatever your dashboard path is         
  const [properties, setProperties] = useState([]);
  const propertiesToDisplay = onDashboard ? properties.slice(-5) : properties;
  const [showPopUpId, setShowPopUpId] = useState(false);
  const [currentProperty, setCurrentProperty] = useState();
  const [showMoreInfoPopUp, setShowMoreInfoPopUp] = useState(false);
  const [showDeletePrompt , setShowDeletePrompt]= useState(false);
  const [showUpdatePopUp, setShowUpdatePopUp] = useState(false);
  const [updatedState, setUpdatedState]= useState({ state:null });

  async function getProperties(){
    const res = await api.get( "api/properties");
    setProperties(res.data);
    console.log(res.data);
  }
  useEffect(()=>{
    getProperties();
    console.log("use effect get properties called");
  },[]);

  function HandleMoreInfoOnClick(property){
    setShowMoreInfoPopUp(true);
    setCurrentProperty(property);
  }

  async function UpdateStateSubmit(e){
    e.preventDefault()
    console.log(currentProperty)

    try{
      const res = await api.patch(`api/properties/${currentProperty._id}`,updatedState);
      console.log(res.data);
      toast.success(res.data.message || 'Property state updated')

      setUpdatedState({
        state:null
      });
      await getProperties();
      setShowDeletePrompt(false);
  setShowUpdatePopUp(false);

    }
    catch(error){
      console.log(error);
      toast.error(error.response?.data?.message || 'Error updating property state')
    }

  }
  async function DeletePropertySubmit(e){
    e.preventDefault()
    console.log(currentProperty)

    try{
      const res = await api.delete(`api/properties/${currentProperty._id}`);
      console.log(res.data);
      toast.success(res.data.message || 'Property deleted')

      await getProperties();
      setShowDeletePrompt(false);
      setShowUpdatePopUp(false);
      setCurrentProperty(null);

    }
    catch(error){
      console.log(error);
      toast.error(error?.response?.data?.message || 'Error deleting property')
    }
    finally{
      setCurrentProperty(null);
    }

  }

  return(
    <div>
    <h1>{onDashboard ? `New Properties: ${propertiesToDisplay.length}` : `All properties: ${properties.length}`}</h1>
    <table>
      <thead>
        <tr>
          <th>Property ID</th>
          <th>Type</th>
          <th>Address</th>
          <th>State</th>
        </tr>

      </thead>
      <tbody>
        {Array.isArray(propertiesToDisplay) && propertiesToDisplay.map(property =>(
          <tr key={property._id}>
            <td>{property.propertyId}</td>
            <td>{property.type}</td>
            <td>{property.location.address}</td>
            <td>
              <span>{property.state}
                <button onClick={() => {setShowPopUpId(prev => (prev === property._id ? null : property._id)); setCurrentProperty(property)}}
                className='more-options'>:</button>
                {showPopUpId === property._id && (
                                    <div className='pop-up-div'>
                                      <button onClick={() => {setShowUpdatePopUp(true);
                                        setShowPopUpId(null);
                                      setCurrentProperty(property)}
                                      }>
                                        Update State
                                      </button>
                                      <button
                                        className="delete"
                                        onClick={() => {
                                         setShowDeletePrompt(true);
                                         setShowPopUpId(null)
                                         setCurrentProperty(property)
                                        }}>
                                        Delete
                                      </button>
                                      <button onClick={()=>
                                        {HandleMoreInfoOnClick(property);
                                         setShowPopUpId(null);
                                         setCurrentProperty(property)}}>
                                        More Info
                                      </button>
                                    </div>
                                  )}
                </span></td>
          </tr>

        ))

        }

      </tbody>
    </table>
    {
  showDeletePrompt && (
    <>
    <div className='form-overlay'>
      <div className='confirm-delete'>
        <button className="close-pop-up-button" onClick={() => setShowDeletePrompt(false)}>
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
  showUpdatePopUp &&(
    <>
    <div className='form-overlay'>
      <div className='confirm-delete'>
        <button className="close-pop-up-button" onClick={() => setShowUpdatePopUp(false)}>
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
{showMoreInfoPopUp && (
  <div className="form-overlay">
  <div className='confirm-delete'>
    <button className ='close-button' onClick={()=> setShowMoreInfoPopUp(false)}>X</button>

      <p className="property-id">
      <span>{currentProperty.propertyId}</span>
       </p>
                    <p>
                      <span className='property-keys'>Type:</span>
                    {currentProperty.type}
                    </p>
                    <p>
                      <span className='property-keys'>State:</span>
                      {currentProperty.state}
                      </p>
                    <p><span className='property-keys'>Address:</span>
                        {currentProperty.location.address}
                        </p>
                    <p><Link to ={`https://www.google.com/maps?q=${currentProperty.location.coordinates.lat},${currentProperty.location.coordinates.lng}`} target='_blank' >Get directions to property</Link></p>
    </div>
  </div>
)
}

{onDashboard && (
  <>
  <Link to='/portal/properties' className="view-more-link"> View more <FontAwesomeIcon icon={faArrowRight} /></Link>
  </>
)

}
    </div>
  )
}