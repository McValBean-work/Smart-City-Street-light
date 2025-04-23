import './report-form.css'
function ReportForm (){
 onsubmit

    return(
        <>
        <div className="report-form-div" id="reportFormDiv">
        <form action={onsubmit} id="reportForm" className="report-form">
            <label htmlFor="poleId">Pole ID</label>
            <input type="text" id="poleId" placeholder="pole id" className="report-form-input" required/>
            <label htmlFor="PoleLightId">Pole Light ID</label>
            <input type="text" id= "poleLightId" placeholder="pole light id" className="report-form-input"  required/>
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
        </>
    )
}

export default ReportForm