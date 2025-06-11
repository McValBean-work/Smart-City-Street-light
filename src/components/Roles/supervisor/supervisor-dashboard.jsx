import '../../dashboard/dashboard.css'
import PropertyTable from "../property-table";
import TaskTable from "../task-table";
import ReportsTable from "../reports-table";

function SupervisorDashboard(){
    return(
        <>
        <div className="dashboard-layout">
            <PropertyTable />
            <TaskTable />
            <ReportsTable />
        </div>
        </>
    )

}




export default SupervisorDashboard;