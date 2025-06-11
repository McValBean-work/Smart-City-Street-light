import '../../dashboard/dashboard.css'
import TaskTable from '../task-table';



function EngineerDashboard(){

    return(
        <>
        <div className="dashboard-layout">
            <TaskTable />
        </div>
        </>
    )

}




export default EngineerDashboard;