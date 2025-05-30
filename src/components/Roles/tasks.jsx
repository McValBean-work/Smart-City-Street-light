import api from "../api/axios-instance"
import { useState, useEffect } from "react";
import SideBar from "../layout/sidebar";
import TopSection from "../dashboard/top-section";
import Main from "../layout/main";
import '../dashboard/dashboard.css'



function Tasks(){

     const [allTasks, setAllTasks] = useState([]);
     const [showPopUp , setShowPopUp] = useState([]);
     const [showDeletePrompt , setShowDeletePrompt] = useState(false);
     const totalTasks = allTasks.length;

    async function getTasks(){
        const res = await api.get("api/tasks");
        setAllTasks(res.data);
        console.log(res.data);

    }

        useEffect(()=>{
            getTasks();
            console.log("useEffect get all tasks");
    },[]);


    const DeleteTask = async () => {
        setShowDeletePrompt(true);

    }
    async function ConfirmDelete (children){
        const response = await api.delete(`api/tasks/${children}`);
        console.log(response.data);
    }

    function ReportOnClick(){
        if(showPopUp(true)){
            setShowPopUp(false);
        }
        else{
            setShowPopUp(true);
        }
    }


    return(
        <>
        <div className='dashboard-layout'>
            <div>
            <h1>All Tasks: {totalTasks} </h1>
            <table>
                <tr>
                    <th>Task ID</th>
                    <th>Assigned By</th>
                    <th>Assigned to</th>
                    <th>Status</th>
                </tr>
                 { Array.isArray(allTasks) &&
                     allTasks.map((task)=>(
                        <tr key={task._id}>
                            <td>{task._id}</td>
                            <td>{task.assignedBy}</td>
                            <td>{task.updatedAt}</td>
                            <td>{task.status} </td>
                            <button className='more-options' onClick={ReportOnClick}>:</button>
                            { showPopUp && (
                                <>
                                <div>
                                    <button>Update task</button>
                                    <button
                                    onclick={DeleteTask(task._id)}>
                                        Delete task
                                    </button>
                                </div>
                                </>
                            )}
                        </tr>
                         ))
                         }

            </table>
            {
                 showDeletePrompt && (
                    <>
                    <div>
                        <p>Are you sure you want to delete this task</p>
                        <button className='confirm-delete' onClick={ConfirmDelete}> Confirm delete</button>
                    </div>
                    </>
                 )
            }
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
                    <Main>
                        <Tasks />
                    </Main>
                </div>
                </div>
        </>
    )
}

export default TasksPage;