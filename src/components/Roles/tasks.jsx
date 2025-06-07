import api from "../api/axios-instance"
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import SideBar from "../layout/sidebar";
import TopSection from "../dashboard/top-section";
import Main from "../layout/main";
import GetUsers from "./users";
import getRole from "../Authentication-page/auth";
import '../dashboard/dashboard.css'

function Tasks(){
    const role = getRole();
    const CurrentUser = JSON.parse(localStorage.getItem("userData") || "{}");

     const [allTasks, setAllTasks] = useState([]);
     const [showPopUpId, setShowPopUpId] = useState(null);
     //const [showUpdateState, setShowUpdateState] = useState(false);
     const [activeTaskId, setActiveTaskId] = useState(null);
     const [currentUserTasks , setCurrentUserTasks] = useState([]);
     const totalTasks = allTasks.length;
     useEffect(()=>{
            async function getTasks(){
                const res = await api.get("api/tasks");
                setAllTasks(res.data);
                if(role === 'engineer'){
                    setCurrentUserTasks(res.data.filter((myTasks) =>
                        myTasks.assignedTo && myTasks.assignedTo.fullName === CurrentUser.fullName
                    ))
                }
            }
            getTasks();
     },[]);

    async function ConfirmDelete (){
        const response = await api.delete(`api/tasks/${activeTaskId}`);
        console.log(response.data)
    }

    function HandleUpdateButtonOnClick(){
        //setShowUpdateState(true);
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
            <h1>All Tasks: {role === 'engineer' ? currentUserTasks.length : totalTasks}</h1>
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
                    {Array.isArray(allTasks) && role === 'admin' &&
                        allTasks.map((task)=>(
                            <tr key={task._id}>
                                <td>{task.property?.propertyId}</td>
                                <td>{task.assignedBy?.fullName}</td>
                                <td>{task.assignedTo?.fullName}</td>
                                <td>
                                    <span>
                                        {task.status}
                                        <button
                                        className='more-options'
                                        onClick={() =>HandleTaskOnClick(task._id)}>:</button>
                                        {showPopUpId === task._id && (
                                            <div className='pop-up-div'>
                                                <span>Update state</span>
                                                {role === 'admin' && (
                                                    <span onClick={ConfirmDelete}>Delete Task</span>
                                                )}
                                                <span>
                                                <Link to='/portal/task/info'
                                                 title='view more'>
                                                More info
                                                </Link>
                                                </span>
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
                                <td>{myTask.assignedBy?.fullName}</td>
                                <td>{myTask.assignedTo?.fullName}</td>
                                <td>
                                    <span>
                                        {myTask.status}
                                        <button
                                        className='more-options'
                                        onClick={() =>HandleTaskOnClick(myTask._id)}>:</button>
                                        {showPopUpId === myTask._id && (
                                            <div className='pop-up-div'>
                                                <span>Update state</span>
                                                <span>
                                                <Link to='/portal/task/info'
                                                 title='view more'>
                                                More info
                                                </Link>
                                                </span>
                                            </div>
                                        )}
                                    </span>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {/*{showUpdateState && ()}*/}
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