import { useEffect, useState } from "react";
import api from "../api/axios-instance";
import '../dashboard/dashboard.css'

export default function TaskTable(){
    const [allTasks, setAllTasks] = useState([]);

    async function getTasks(){
                    const res = await api.get("api/tasks");
                    setAllTasks(res.data);
    }
         useEffect(()=>{
                getTasks();
                console.log(allTasks);
         },[]);
return(
    <>
    <div>
        <h1>All Tasks: {allTasks.length}</h1>
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
            {Array.isArray(allTasks) && allTasks.map(task =>(
                <tr key={task._id}>
                    <td>{task.property?.propertyId}</td>
                    <td>{task.updatedAt.split('T')[0]}</td>
                    <td>{task.assignedTo?.fullName}</td>
                    <td>
                        <span>
                            {task.status}
                            <button className="more-options">
                                :
                            </button>
                        </span>
                    </td>
                </tr>
            ))
            }
        </tbody>
    </table>
    </div>
    </>
)
}