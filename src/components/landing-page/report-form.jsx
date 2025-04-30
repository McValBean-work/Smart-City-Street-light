import './report-form.css'
import Main from'../layout/main'
function ReportForm (){

    return(
        <Main>
        <div className="report-form-div" id="reportFormDiv">
        <form action={onsubmit} id="reportForm" className="report-form">
            {/*<h1>Help Us Light The Path You Walk On</h1>*/}
            <label htmlFor="propertyId">Property ID</label>
            <input type="text" id="propertyId" placeholder="property id" className="report-form-input" required/>
            <label htmlFor="Status">Status</label>
            <select name="" id="" className="report-form-input">
                <option value="Working">Working</option>
                <option value="Not-working">Not working</option>
            </select>
            <label htmlFor="description">Description</label>
            <textarea name="" id="description" className="report-form-input"  placeholder="type description here" rows="4" />
            <label htmlFor="picture/video">Picture/Video (Optional)</label>
            <input type="file" id="picture/video" placeholder= "add picture here" className="report-form-input picture-input" />
            <input type="submit" value="Submit" className="submit report-form-input" />
        </form>
        </div>
        </Main>
    )
}

export default ReportForm