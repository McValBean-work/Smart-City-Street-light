import api from "../api/axios-instance";
import { useState, useEffect } from "react";
import '../dashboard/dashboard.css'

export default function PropertyTable(){
  const [properties, setProperties] = useState([]);

  async function getProperties(){
    const res = await api.get( "api/properties");
    setProperties(res.data);
    console.log(res.data);
  }
  useEffect(()=>{
    getProperties();
    console.log("use effect get properties called");
  },[]);
  return(
    <div>
    <h1>All properties: {properties.length}</h1>
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
        {Array.isArray(properties) && properties.map(property =>(
          <tr key={property._id}>
            <td>{property.propertyId}</td>
            <td>{property.type}</td>
            <td>{property.location.address}</td>
            <td>
              <span>{property.state}
                <button
                className='more-options'>:</button>
                </span></td>
          </tr>

        ))

        }

      </tbody>
    </table>
    </div>
  )
}