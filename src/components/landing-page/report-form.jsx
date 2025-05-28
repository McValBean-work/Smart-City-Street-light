import './report-form.css'
import Main from'../layout/main'
import { useState } from 'react'
import api from '../api/axios-instance'


function ReportForm (){

    const [reportFormData , setReportFormData] = useState(
    {
        propertyId:null,
        description: null,
    }
);
const handleChange = (e)=>{
    const {name , value} = e.target;

      setReportFormData(prev =>({...prev, [name]: value}))

  }

const reportSubmit = (e)=> {
e.preventDefault();
console.log(reportFormData);

api.post('/api/report' , reportFormData);

}

    return(
        <Main>
        <div className="form-div" id="FormDiv">
        <form onSubmit={reportSubmit} id="reportForm" className="report-form">
            <h1>Report Property</h1>
            <label htmlFor="propertyId">Property ID</label>
            <input type="text"
            id="propertyId"
            name="propertyId"
            value={reportFormData.propertyId}
            onChange={handleChange}
            placeholder="property id"
            className="report-form-input" required/>
            <label htmlFor="description">Description</label>
            <textarea name="description"
             id="description"
             value={reportFormData.description}
             onChange={handleChange}
             className="report-form-input"
             placeholder="type description here" rows="4" />
            <label htmlFor="media"> Picture/Video (Optional)</label>
            <input type="file"
            id="media"
            name="media"
            value={reportFormData.media}
            onChange={handleChange}
            placeholder= "add picture here"
            className="report-form-input picture-input" />
            <input type="submit" value="Submit" className="submit report-form-input" disabled/>
        </form>
        </div>
        </Main>
    )
}

export default ReportForm