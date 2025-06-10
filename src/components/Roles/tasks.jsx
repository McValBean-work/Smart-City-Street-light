import api from "../api/axios-instance"
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import SideBar from "../layout/sidebar";
import TopSection from "../dashboard/top-section";
import Main from "../layout/main";
import GetUsers from "./get-users";
import getRole from "../Authentication-page/auth";
import ObjectList from "./property-table";
import '../dashboard/dashboard.css'
import { toast } from "react-toastify";

function Tasks(){
    const role = getRole();
    const CurrentUser = JSON.parse(localStorage.getItem("userData") || "{}");

     const [allTasks, setAllTasks] = useState([]);
     const [showPopUpId, setShowPopUpId] = useState(null);
     const [showUpdateStatePopUp, setShowUpdateStatePopUp] = useState(false);
     const [updatedTaskStatus , setUpdatedTaskStatus] = useState({status: null});
     const [showDeletePrompt, setShowDeletePrompt] = useState(false);
     const [showCommentPopup, setShowCommentPopUp] = useState(false);
     const [showMoreInfo, setShowMoreInfo] =useState(false);
     const [infoTask, setInfoTask] = useState(null)
     const [comment, setComment]= useState({
        text:null,
        userId:CurrentUser.id
     });
     const [activeTaskId, setActiveTaskId] = useState(null);
     const [currentUserTasks , setCurrentUserTasks] = useState([]);

     async function getTasks(){
                const res = await api.get("api/tasks");
                setAllTasks(res.data);
                if(role === 'engineer'){
                    setCurrentUserTasks(res.data.filter((myTasks) =>
                        myTasks.assignedTo && myTasks.assignedTo.fullName === CurrentUser.fullName
                    ))
                }
                else if(role === "admin" || role === "supervisor"){
                    setCurrentUserTasks(res.data.filter((myTasks) =>
                        myTasks.assignedBy && myTasks.assignedBy.fullName === CurrentUser.fullName
                    ))

                }
            }

     useEffect(()=>{
            getTasks();
            console.log(allTasks);
     },[]);
     console.log(allTasks);

     async function HandleCommentSubmit(){
        console.log(comment);
        try{
             const response = await api.post(`api/tasks/${activeTaskId}/comment`, comment);
        console.log(response.data);
        toast.success(response.data.message || 'Comment successful');
        getTasks();
        }
        catch(error){
            console.log("unable to comment:", error)
            console.log(error?.response?.data?.message || 'Unable to comment')
        }
        finally{
            setComment({
                text: null,
                userId: CurrentUser.id
            })
        }
     }

    async function ConfirmDelete (){
        try{
        const response = await api.delete(`api/tasks/${activeTaskId}`);
        console.log(response.data);
        toast.success(response.data.message || 'Task deleted successfully')

        }
        catch(error){
            console.log(error)
            toast.error(error?.response?.data?.message || 'Error deleting Task')
        }
        finally{
            getTasks();
            setShowDeletePrompt(false);
        }
    }

    async function HandleUpdateStateSubmit(){
        console.log(updatedTaskStatus)
        try{
            const res = await api.patch(`api/tasks/${activeTaskId}`, updatedTaskStatus);
            console.log(res.data);
            toast.success(res.data.message || 'Task state updated successfully')
        }
    catch(error){
        console.log(error);
        toast.error(error?.response?.data?.message || 'Could not update task state')
    }
    finally{
        getTasks();
        setShowUpdateStatePopUp(false)
    }
    }
    function HandleTaskOnClick(taskId){
        setActiveTaskId(taskId);
        setShowPopUpId(prev => (prev === taskId ? null : taskId));
        localStorage.setItem('taskId', taskId);
    }

    return(
        <>
        <div className='dashboard-layout'>
            <div>
            <h1>My Tasks: {currentUserTasks.length} </h1>
            <table>
                <thead>
                    <tr>{['admin', 'supervisor'].includes(role) &&(
                        <>
                        <th>Property ID</th>
                        <th>Date Assigned</th>
                        <th>Assigned to</th>
                        <th>Status</th>
                        </>
                    )}
                    {role === 'engineer' &&(
                        <>
                        <th>Property ID</th>
                        <th>Description</th>
                        <th>Date Assigned</th>
                        <th>Status</th>
                        </>
                    )}

                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(currentUserTasks) && ['admin', 'supervisor'].includes(role) &&
                        currentUserTasks.map((task)=>(
                            <tr key={task._id}>
                                <td>{task.property?.propertyId}</td>
                                <td>{task.updatedAt.split("T")[0]}</td>
                                <td>{task.assignedTo?.fullName}</td>
                                <td>
                                    <span>
                                        {task.status}
                                        <button
                                        className='more-options'
                                        onClick={() =>HandleTaskOnClick(task._id)}>:</button>
                                        {showPopUpId === task._id && (
                                            <div className='pop-up-div'>
                                                <button onClick={()=>{setShowCommentPopUp(true);
                                                setShowPopUpId(null);
                                                }}>Comment</button>
                                                <button onClick={()=> {setShowUpdateStatePopUp(true);
                                                setShowPopUpId(null)
                                                }}>Update state</button>

                                                    <button onClick={()=> {
                                                        setShowDeletePrompt(true);
                                                        setShowPopUpId(null);
                                                 ;
                                                    }}>Delete Task</button>
                                                <button onClick={()=>{
                                                setShowMoreInfo(true);
                                                setInfoTask(task);
                                                setShowPopUpId(null);}}>
                                                More info
                                                </button>
                                            </div>

                                        )}
                                    </span>
                                </td>

                            </tr>
                        ))
                    }

                    {Array.isArray(currentUserTasks) && role === 'engineer' &&
                        currentUserTasks.map((myTask)=>(
                            <tr key={myTask._id}>
                                <td>{myTask.property?.propertyId}</td>
                                <td>{myTask.report.description}</td>
                                <td>{myTask.updatedAt.split('T')[0]}</td>
                                <td>
                                    <span>
                                        {myTask.status}
                                        <button
                                        className='more-options'
                                        onClick={() =>HandleTaskOnClick(myTask._id)}>:</button>
                                        {showPopUpId === myTask._id && (
                                            <div className='pop-up-div'>
                                                <button onClick={()=> {setShowUpdateStatePopUp(true);
                                                setShowPopUpId(null);
                                                }}>
                                                Update state
                                                </button>
                                                <button onClick={()=>
                                                    {setShowMoreInfo(true);
                                                    setInfoTask(myTask);
                                                    setShowPopUpId(null);
                                                    }}>
                                                More info
                                                </button>
                                            </div>
                                        )}

                                    </span>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {showUpdateStatePopUp && (
                <>
                <div className='form-overlay'>
           <div className="confirm-delete">
           <button onClick={()=> setShowUpdateStatePopUp(false)}>X</button>
          <select name="updatedTaskStatus"
          value={updatedTaskStatus.status}
           onChange={(e) => setUpdatedTaskStatus({status: e.target.value})}>
            <option value="">Select status</option>
            <option value='in_progress'>In progress</option>
            <option value='pending'>Pending</option>
            <option value='fixed'>Fixed</option>
            <option value='cannot_fix'>Cannot Fix</option>
          </select>
          <input type="submit"
            onClick={HandleUpdateStateSubmit}
            className="submit"
            value='Update State'
          />
        </div>
        </div>
                </>
            )}
            {showCommentPopup && (
                                   <div className='form-overlay'>
                                     <div className='confirm-delete'>
                                     <span
                                     onClick={()=>
                                    setShowCommentPopUp(false)}>
                                        X
                                    </span>

                                    <label htmlFor="comment">
                                                    Comment
                                                    </label>
                                                <textarea
                                                value={comment.text}
                                                onChange={(e) =>
                                                    setComment(prev => ({...prev, text: e.target.value}))} />

                                                <input type="submit" className='submit' onClick={HandleCommentSubmit} value="Comment" />

                                                </div>
                                            </div>
                                        )}
                                        {
  showDeletePrompt && (
    <>
    <div className='form-overlay'>
      <div className='confirm-delete'>
        <button onClick={() => setShowDeletePrompt(false)}>
        X
      </button>

      <span>Are you sure you want to delete this task?</span>
      <button onClick={ConfirmDelete} className="confirm-delete-button">Confirm delete</button>


      </div>

    </div>
    </>
  )
}
{
    showMoreInfo && (
        <>
        <div className='form-overlay'>
            <div className='confirm-delete'>
            <p>
                <button onClick={()=> setShowMoreInfo(false)}>X</button>
            </p>
            {['admin', 'supervisor'].includes(role) &&(
                <>
                <p>{infoTask.property.propertyId}</p>
                <p>{infoTask.property.type}</p>
                <p>{infoTask.property.location.address}</p>
                <p>{infoTask.report.description}</p>
                <p>{infoTask.status}</p>
                <p>{infoTask.assignedTo.fullName}</p>
                <p>{infoTask.updatedAt.split('T')[0]}</p>
                </>
            )

            }
            {showMoreInfo && role === 'engineer' && (
                <>
                <p>{infoTask.property.propertyId}</p>
                <p>{infoTask.property.type}</p>
                <p>{infoTask.property.location.address}</p>
                <p>{infoTask.report.description}</p>
                <p>{infoTask.status}</p>
                <p>{infoTask.assignedBy.fullName}</p>
                <p>{infoTask.updatedAt.split('T')[0]}</p>
                <p>
                    <Link
                to ={`https://www.google.com/maps?q=${infoTask.property.location.coordinates.lat},${infoTask.property.location.coordinates.lng}`}
                target="_blank">
                Get directions to property
                </Link>

                </p>
               
                </>
            )
            }
        </div>

        </div>
        </>
    )
}
            </div>
        </div>
        </>
    )
}

function TasksPage(){
    return(
        <>
            <div className="dashboard">
                <TopSection />
                <div className='dashboard-body'>
                    <SideBar />
                    <Main className='client-main'>
                        <Tasks />
                    </Main>
                </div>
            </div>
        </>
    )
}

export default TasksPage;