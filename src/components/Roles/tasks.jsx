import api from "../api/axios-instance"
import { useState, useEffect } from "react";
import SideBar from "../layout/sidebar";
import TopSection from "../dashboard/top-section";
import Main from "../layout/main";
import GetUsers from "./users";
import '../dashboard/dashboard.css'



function Tasks(){

     const [allTasks, setAllTasks] = useState([]);
     const [showPopUp , setShowPopUp] = useState(false);
     const [showDeletePrompt , setShowDeletePrompt] = useState(false);
     const totalTasks = allTasks.length;

        useEffect(()=>{
            async function getTasks(){
        const res = await api.get("api/tasks");
        setAllTasks(res.data);
        console.log(res.data);

    }

            getTasks();
            console.log("useEffect get all tasks");
    },[]);


    async function ConfirmDelete (children){
        const response = await api.delete(`api/tasks/${children}`);
        console.log(response.data);
    }

    function TaskOnClick(children){
        setShowPopUp(prev => !prev);
        console.log(children);
        localStorage.setItem('taskId', children);
    }


    return(
        <>
        <div className='dashboard-layout'>
            <div>
            <h1>All Tasks: {totalTasks} </h1>
            <table>
                <thead>
                    <tr>
                        <th>Property ID</th>
                        <th>Assigned By</th>
                        <th>Assigned to</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
{ Array.isArray(allTasks) &&
                     allTasks.map((task)=>(
                        <tr key={task._id}>
                            <td>{task.property.propertyId}</td>
                            <td>{task.assignedBy.fullName}</td>
                            <td>{task.assignedTo.fullName}</td>
                            <td>
                                <span>
                                    {task.status}
                                    <button className='more-options' onClick={() =>TaskOnClick}>:</button>
                                </span>
                            </td>
                            {showPopUp && (
                                <>
                                <div>
                                    <p>Update task</p>
                                    <span
                                    onClick={() => (
                                        setShowDeletePrompt(true))}>
                                        Delete task
                                    </span>
                                </div>
                                </>
                            )}
                            {showDeletePrompt && (
                    <>
                    <div className="confirm-delete-task">
                        <p>Are you sure you want to delete this task</p>
                        <button
                        className='confirm-delete'
                        onClick={ConfirmDelete(task._id)}> Confirm delete</button>
                    </div>
                    </>
                 )
            }

                        </tr>
                         ))
                         }
                          

                </tbody>
                        
            </table>
                        </div>
                <div>THIS IS THE SECOND DIV</div>

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