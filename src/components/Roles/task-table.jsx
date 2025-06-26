import { useEffect, useState } from "react";
import api from "../api/axios-instance";
import '../dashboard/dashboard.css';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function TaskTable(){
    const CurrentUser = JSON.parse(localStorage.getItem("userData") || "{}");
    const [allTasks, setAllTasks] = useState([]);
    const location = useLocation();
    const onDashboard = location.pathname === "/portal/dashboard"; // or whatever your dashboard path is         
    const tasksToDisplay = onDashboard ? allTasks.slice(-5) : allTasks;
    const [showPopUpId , setShowPopUpId] = useState(null);
    const [showMoreInfo ,setShowMoreInfo] = useState(false);
    const [infoTask, setInfoTask] = useState(null);
    const [showUpdateStatePopUp,setShowUpdateStatePopUp] = useState(false);
    const [updatedTaskStatus , setUpdatedTaskStatus] = useState({status: null});
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);
    const [showCommentPopUp,setShowCommentPopUp] = useState(false);
     const [activeTaskId, setActiveTaskId] = useState(null);
    const [comment, setComment]= useState({
            text:null,
            userId:CurrentUser.id
         });

    async function getTasks(){
                    const res = await api.get("api/tasks");
                    setAllTasks(res.data);
    }
         useEffect(()=>{
                getTasks();
                console.log(allTasks);
         },[]);

         function HandleTaskOnClick(taskId){
        setActiveTaskId(taskId);
        setShowPopUpId(prev => (prev === taskId ? null : taskId));

    }

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

return(
    <>
    <div className="table-div">
        <h1>{onDashboard ? `New tasks: ` : `All tasks: `}  {tasksToDisplay.length}</h1>
    <table>
        <thead>
            <tr>
                <th>Property ID</th>
                <th>Date Assigned</th>
                <th>Assigned To</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {Array.isArray(tasksToDisplay) && tasksToDisplay.map(task =>(
                <tr key={task._id}>
                    <td>{task.property?.propertyId}</td>
                    <td>{task.updatedAt.split('T')[0]}</td>
                    <td>{task.assignedTo?.fullName}</td>
                    <td>
                        <span>
                            {task.status}
                            <button onClick={()=> HandleTaskOnClick(task._id)}
                            className="more-options"
                            >
                                :
                            </button>
                            {showPopUpId === task._id && (
                                            <div className='pop-up-div'>
                                                <button onClick={()=>
                                                {setShowCommentPopUp(true);
                                                setShowPopUpId(null);
                                                }}>Comment</button>
                                                <button onClick={()=>
                                                {setShowUpdateStatePopUp(true);
                                                setShowPopUpId(null);
                                                }}>
                                                Update state
                                                </button>
                                                <button onClick={()=> {
                                                        setShowDeletePrompt(true);
                                                        setShowPopUpId(null);
                                                 ;
                                                    }}>Delete Task
                                                    </button>
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
        </tbody>
    </table>
    {allTasks.length > 5 && onDashboard && (
  <>
  <Link to='/portal/tasks' className="view-more-link"> View more <FontAwesomeIcon icon={faArrowRight} /></Link>
  </>
)

}
    </div>
{showUpdateStatePopUp && (
                <>
                <div className='form-overlay'>
           <div className="confirm-delete">
           <button onClick={()=> setShowUpdateStatePopUp(false)}
            className='close-pop-up-button'>X</button>
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
            {showCommentPopUp && (
   <div className='form-overlay'>
     <div className='confirm-delete'>
      <button  onClick={()=>
         setShowCommentPopUp(false)}
          className='close-pop-up-button'>
            X
       </button>
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
{showDeletePrompt && (
    <>
    <div className='form-overlay'>
      <div className='confirm-delete'>
        <button onClick={() => setShowDeletePrompt(false)}
            className='close-pop-up-button'>
        X
      </button>
      <div>
        <span>Are you sure you want to delete this task?</span>
      <button onClick={ConfirmDelete} className="confirm-delete-button">Confirm delete</button>
      </div>
  </div>

    </div>
    </>
  )
}
{showMoreInfo && (
        <>
        <div className='form-overlay'>
            <div className='confirm-delete'>
            <p>
                <button onClick={()=> setShowMoreInfo(false)}
                    className='close-pop-up-button'>X</button>
            </p>

                <p className="property-id">
                    {infoTask.property.propertyId}

                </p>
                <p>
                    <span className="show-more-title">Type:</span>
                     {infoTask.property.type}
                    </p>
                <p>
                    <span className="show-more-title">Address:</span>
                     {infoTask.property.location.address}
                    </p>
                <p>
                    <span className="show-more-title">Description:</span> 
                    {infoTask.report.description}
                    </p>
                <p>
                    <span className="show-more-title">Status:</span> 
                    {infoTask.status}
                    </p>
                <p>
                    <span className="show-more-title">Assigned by:</span>
                     {infoTask.assignedBy.fullName}
                    </p>
                <p>
                    <span className="show-more-title">Assigned to:</span> 
                    {infoTask.assignedTo.fullName}
                    </p>
                <p>
                    <span className="show-more-title">Date Assigned:</span> 
                    {infoTask.updatedAt.split('T')[0]}
                    </p>
                <p>
                    <Link
                to ={`https://www.google.com/maps?q=${infoTask.property.location.coordinates.lat},${infoTask.property.location.coordinates.lng}`}
                target="_blank">
                Get directions to property
                </Link>
                </p>

        </div>

        </div>
        </>
    )
}

    </>
)
}