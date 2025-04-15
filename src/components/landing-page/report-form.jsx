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
            <div className="status-div">
                {/*radio makes sure only one input is selected for inputs with the same name, in this case, status*/}
                <label htmlFor="working">Working</label>
            <input type="radio" name="status" id="working" value="working" required/>
            <label htmlFor="notWorking">Not Working</label>
            <input type="radio" name="status" id="notWorking" value="not working" required />
            </div>
            <label htmlFor="description">Description</label>
            <input type="text" placeholder="description" id="description" required/>
            <label htmlFor="picture">Picture (Optional)</label>
            <input type="file" id="picture" placeholder= "add picture here" className='picture-input' />
            <input type="submit" value="Submit" className="submit"/>
        </form>
        </div>
        </>
    )
}

export default ReportForm