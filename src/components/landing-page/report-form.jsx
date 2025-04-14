import './report-form.css'
function ReportForm (){

    return(
        <>
        <div className="report-form-div" id="reportFormDiv">
        <form action="" id="reportForm" className="report-form">
            <label htmlFor="poleId">Pole ID</label>
            <input type="text" id="poleId" placeholder="pole id" required/>
            <label htmlFor="PoleLightId">Pole Light ID</label>
            <input type="text" id= "poleLightId" placeholder="pole light id"  required/>
            <label htmlFor="Status">Status</label>
            <input type="text" placeholder="status" id="status" required/>
            <label htmlFor="description">Description</label>
            <input type="text" placeholder="description" id="description" required/>
            <label htmlFor="picture">Picture</label>
            <input type="image" id="picture" placeholder="submit photo here" />
        </form>
        </div>
        </>
    )
}

export default ReportForm