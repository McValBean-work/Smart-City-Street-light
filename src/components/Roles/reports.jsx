import api from "../api/axios-instance";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideBar from "../layout/sidebar";
import TopSection from "../dashboard/top-section";
import Main from "../layout/main";
import GetUsers from './users';
import '../dashboard/dashboard.css';

function Reports() {
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
  const [allProperties, setAllProperties] = useState([]);
  const [showPopUpId, setShowPopUpId] = useState(null);
  const [showAssignTaskForm, setShowAssignTaskForm] = useState(false);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [activeReportId, setActiveReportId] = useState(null);

  const Engineers = GetUsers().filter(user => user.role === 'engineer');
  const totalReports = allReports.length;

  useEffect(() => {
    getReports();
  }, []);

  async function getReports() {
    try {
      const res = await api.get("api/reports");
      setAllReports(res.data.reports);
      console.log(res.data.reports)
    } catch (error) {
      console.log("Error fetching reports:", error);
    }
  }

  useEffect(() => {
    getProperties();
  }, []);

  async function getProperties() {
    try {
      const res = await api.get("api/properties");
      setAllProperties(res.data);
      console.log(res.data)
    } catch (error) {
      console.log("Error fetching properties:", error);
    }
  }

  function handleReportOptionsClick(reportId, propertyId) {
    console.log(propertyId);
    console.log(reportId);
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
    } catch (error) {
      console.log("Assign Task Error:", error);
    }


  }

  async function handleDeleteReport() {
    console.log(activeReportId);
    try {
      const response = await api.delete(`api/report/${activeReportId}`);
      console.log("Deleted report:", response.data);
      getReports();
    } catch (error) {
      console.log("Delete Report Error:", error);
    }

    setShowDeletePrompt(false);
    setShowPopUpId(null);
    setActiveReportId(null);
  }

  return (
    <div className='dashboard-layout'>
        <div>
            <h1>All reports : {totalReports}</h1>
      <table>
        <thead>
          <tr>
            <th>Property Id</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(allReports) && allReports.map(report => (
            <tr key={report._id}>
              <td>{report.propertyId}</td>
              <td>
                <span>
                  {report.description}
                  <button
                    className='more-options'
                    onClick={() => {handleReportOptionsClick(report._id, report.propertyId); setActiveReportId(report._id)}}
                  >
                    :
                  </button>

                  {showPopUpId === report._id && (
                    <div className='pop-up-div'>
                      <span onClick={() => {
                        setShowAssignTaskForm(true);
                        setShowPopUpId(null);
                      }}>
                        Assign task
                      </span>
                      <span
                        className="delete"
                        onClick={() => {
                          setShowDeletePrompt(true);
                          setShowPopUpId(null);
                          setActiveReportId(report._id);
                        }}
                      >
                        Delete report
                      </span>
                      <span>
                        <Link to='/portal/report/info'>More Info</Link>
                      </span>
                    </div>
                  )}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

        </div>

      {/* Assign Task Form */}
      {showAssignTaskForm && (
        <div className='form-overlay'>
          <div className="assign-task-form">
            <div>
              <button onClick={()=> setShowAssignTaskForm(false)}>x</button>
            </div>
          <form onSubmit={handleAssignTaskSubmit}>
            <label>Assign to: {activeReportId}</label>
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
            <input type="submit" value="Assign" />
          </form>
        </div>
        </div>

      )}

      {/* Delete Confirmation Prompt */}
      {showDeletePrompt && (
        <div className='form-overlay'>
           <div className="confirm-delete">
            <div>
              <button onClick={()=> setShowDeletePrompt(false)}>x</button>
            </div>
          <span>Are you sure you want to delete this report?</span>
          <button
            onClick={handleDeleteReport}
            className="confirm-delete-button"
          >
            Confirm Delete
          </button>
        </div>
        </div>

      )}
    </div>
  );
}

function ReportsPage() {
  return (
    <div className="dashboard">
      <TopSection />
      <div className='dashboard-body'>
        <SideBar />
        <Main className='client-main'>
          <Reports />
        </Main>
      </div>
    </div>
  );
}

export default ReportsPage;
