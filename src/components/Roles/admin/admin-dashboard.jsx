import '../../dashboard/dashboard.css';
import PropertyTable from "../property-table";
import TaskTable from "../task-table";
import ReportsTable from '../reports-table';
import UserTable from '../user-table';



function AdminDashboard(){
    return(
      <>
      <div className="dashboard-layout">
         <PropertyTable />
          <ReportsTable />
          <TaskTable />
          <UserTable />
         


      </div>
      </>
    )
}

export default AdminDashboard;