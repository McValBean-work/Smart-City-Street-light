import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import api from "../api/axios-instance";
import { toast } from "react-toastify";
import GetUsers from "./get-users";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function ReportsTable(){
  
    const CurrentUser = JSON.parse(localStorage.getItem("userData") || "{}");
  console.log(CurrentUser)

    const InitialNewTaskState = {
        reportId: null,
        propertyId: null,
        engineerId: "",
        assignedBy: CurrentUser.id,
      };
    
    const [newTask, setNewTask] = useState(InitialNewTaskState);
    const [allReports, setAllReports] = useState([]);
    const location = useLocation();
    const onDashboard = location.pathname === "/portal/dashboard"; 
    const [filteredReports, setFilteredReports] = useState([]);         
  const [loadingToast, setLoadingToast] = useState(false);
  const reportsToDisplay = onDashboard ? allReports.slice(-5) : filteredReports;
    
    const [filterText, setFilterText] = useState('');
    const [showAssignTaskForm, setShowAssignTaskForm] = useState(false);
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const [showPopUpId, setShowPopUpId] = useState(null);
    const [activeReportId, setActiveReportId] = useState(null);
    const [activeReport, setActiveReport] = useState(null);
    const [allProperties, setAllProperties] = useState([]);
    const [allTasks, setAllTasks] =useState([]);
    const Engineers = GetUsers().filter(user => user.role === 'engineer');
    
    

    async function getReports() {
        setLoadingToast(true);
        try {
          const res = await api.get("api/reports");
          setAllReports(res.data.reports);
          setFilteredReports(res.data.reports);
          console.log(res.data.reports)
        } catch (error) {
          console.log("Error fetching reports:", error);
        }
        finally{
          setLoadingToast(false);
        }
      }
      useEffect(() => {
          getReports();
        }, []);

        async function getTasks(){
                    const res = await api.get("api/tasks");
                    setAllTasks(res.data);
    }
         useEffect(()=>{
                getTasks();
                console.log(allTasks);
         },[]);

         async function getProperties(){
             setLoadingToast(true);
             try{
         const res = await api.get( "api/properties");
             setAllProperties(res.data);
             console.log(res.data);
             }
             catch(error){
               toast.error(error?.response?.data?.message || 'Error fetching properties')
             }
             finally{
               setLoadingToast(false);
             }
             
           }
           useEffect(()=>{
               getProperties();
               console.log("use effect get properties called");
             },[]);

        useEffect(() => {
          if (filterText && filterText =='assigned')  {
            const assignedReportsId = allTasks.map(task => task.report._id);
  setFilteredReports(allReports.filter(report => assignedReportsId.includes(report._id)));
} else if (filterText === 'unassigned') {
  const assignedReportsId = allTasks.map(task => task.report._id);
  setFilteredReports(allReports.filter(report => !assignedReportsId.includes(report._id)));
} 
else if (filterText === 'resolved') {
  const resolvedReportsId = allTasks.filter(task => task.status === "fixed").map(task => task.report._id);
  console.log(resolvedReportsId);
  setFilteredReports(allReports.filter(report => resolvedReportsId.includes(report._id)));
}else if (filterText === 'unresolved') {
  const resolvedReportsId = allTasks.filter(task => task.status !== "fixed").map(task => task.report._id);
  console.log(resolvedReportsId);
  setFilteredReports(allReports.filter(report => resolvedReportsId.includes(report._id)));
} else {
        setFilteredReports(allReports);
          }
        }, [filterText, allReports]);

        function handleReportOptionsClick(report,reportId, propertyId) {
          console.log(allProperties)
    console.log(report);
    console.log(propertyId);
    console.log(reportId);
    setActiveReport(report);
    setActiveReportId(reportId);
    const property = allProperties.find(p => p.propertyId === propertyId);
setNewTask(prev => ({ ...prev, reportId, propertyId: property?._id }));

  console.log(property);


    setShowPopUpId(prev => (prev === reportId ? null : reportId));
    localStorage.setItem('reportId', reportId);
  }

     async function handleAssignTaskSubmit(e) {
        e.preventDefault();
        console.log(activeReportId);
        console.log(newTask);
    
        try {
          setNewTask({
          reportId: newTask.reportId,
          propertyId: newTask.propertyId,
          engineerId: newTask.engineerId,
          assignedBy: CurrentUser?._id || "admin",
        });
        console.log(newTask)
          const response = await api.post("api/tasks/assign", newTask);
          console.log("Assigned Task:", response.data);
    
          setNewTask(InitialNewTaskState);
            setShowAssignTaskForm(false);
            setShowPopUpId(null);
            setActiveReportId(null);
            toast.success(response.data.message || 'Task assigned successfully')
        } catch (error) {
          console.log("Assign Task Error:", error);
          toast.error(error.response.data.message || 'Error assigning task');
        }
    finally{
        await getReports();
    }
    
      }
    
      async function handleDeleteReport() {
        console.log(activeReportId);
        try {
          const response = await api.delete(`api/report/${activeReportId}`);
          console.log("Deleted report:", response.data);
          getReports();
          toast.success(response.data.message || 'Report deleted Successfully')
        } catch (error) {
          console.log("Delete Report Error:", error);
          toast.error(error?.response?.data?.message || 'Error deleting report')
        }
        setShowDeletePrompt(false);
        setShowPopUpId(null);
        setActiveReportId(null);
      }

        return(
            <>
            <div className="table-div">
                <h1>{onDashboard ? 'Latest Reports' : (
        <>
        <select name='filterText'
        value={filterText}
        onChange={(e)=> setFilterText(e.target.value)}
        className="filter-select">
          <option value="all_reports">All Reports</option>
          <option value="assigned">Assigned</option>
          <option value="unassigned">Unassigned</option>
          <option value="resolved">Resolved</option>
          <option value="unresolved">Unresolved</option>
        </select>
        
        </>
      )
      }
        </h1>
            <table>
                  <thead>
                        <tr>
                            <th>Property ID</th>
                            <th>Submission Date</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(reportsToDisplay) && reportsToDisplay.map(report=> (
                            <tr key={report._id}>
                                <td>{report.propertyId}</td>
                                <td>{new Date(report.submittedAt.split('T')[0]).toLocaleDateString('en-us', {
                                   year: "numeric",
  month: "short",
  day: "2-digit"
                                })}</td>
                                <td>
                                    <span>
                                        {report.description}
                                    <button  onClick={() => {handleReportOptionsClick(report,report._id, report.propertyId); setActiveReportId(report._id)}} 
                                    className='more-options'>
                                        :
                                    </button>
                                    {showPopUpId === report._id && (
                    <div className='pop-up-div'>
                      <button onClick={() => {
                        setShowAssignTaskForm(true);
                        setShowPopUpId(null);
                      }}>
                        Assign task
                      </button>
                      <button
                        className="delete"
                        onClick={() => {
                          setShowDeletePrompt(true);
                          setShowPopUpId(null);
                          setActiveReportId(report._id);
                        }}>
                        Delete report
                      </button>
                      <button onClick={() => {setShowMoreInfo(true); setShowPopUpId(null); setActiveReport(report)}}>
                        More Info
                      </button>
                    </div>
                  )}
                                    </span>
                                    </td>

                            </tr>
                        ))}
                    </tbody>

                </table>

                {showAssignTaskForm && (
        <div className='form-overlay'>
          <div className="confirm-delete">

          <button onClick={()=> setShowAssignTaskForm(false)}
            className='close-pop-up-button'>X
            </button>

            <label>Assign to:</label>
            <select
              name="engineerId"
              value={newTask.engineerId}
              onChange={(e) =>
                setNewTask(prev => ({ ...prev, engineerId: e.target.value }))
              }
            >
              <option value="">Select Engineer</option>
              {Engineers.map(engineer => (
                <option key={engineer._id} value={engineer._id}>
                  {engineer.fullName}
                </option>
              ))}
            </select>
            <input type="submit" className='submit' value="Assign" onClick={handleAssignTaskSubmit} />
        </div>
        </div>

      )}

      {/* Delete Confirmation Prompt */}
      {showDeletePrompt && (
        <div className='form-overlay'>
           <div className="confirm-delete">
          <button
          onClick={()=> setShowDeletePrompt(false)}
          className='close-pop-up-button'>
            X
            </button>
            <div>
              <span>Are you sure you want to delete this report?</span>
          <button
            onClick={handleDeleteReport}
            className="confirm-delete-button">
            Confirm Delete
          </button>
            </div>
        </div>
        </div>

      )}
       {showMoreInfo &&(
    <div className="form-overlay">
      <div className="confirm-delete">
        <button onClick={()=> setShowMoreInfo(false)}
        className='close-pop-up-button'>
          X
        </button>
              <p className="property-id">
                  {activeReport.propertyId}
               </p>
                        
                            <p>
                              <span className='property-keys'>Description:</span>
                              {activeReport.description}
                              </p>
                              <p>
                                <span className="property-keys">Submitted At:</span>
                                {activeReport.submittedAt.split('T')[0]}
                              </p>

      </div>


    </div>
  )}
  {onDashboard && allReports.length > 5 && (
  
          <Link to='/portal/reports' className="view-more-link"> View more <FontAwesomeIcon icon={faArrowRight} /></Link>
        )
        } 
        {!onDashboard && (
          <>
          {filteredReports.length} out of {allReports.length}
          </>
        )}
            </div>
            </>
        )
}