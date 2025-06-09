import TopSection from "../../dashboard/top-section";
import '../../dashboard/dashboard.css'
import SideBar from "../../layout/sidebar";
import Main from "../../layout/main";
import PropertyTable from "../property-table";
import TaskTable from "../task-table";
import ReportsTable from "../reports-table";

function SupervisorDashboardBody(){

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


function SupervisorDashboard(){
    return(
        <div className="dashboard">
        <TopSection />
        <div className="dashboard-body">

                <SideBar />
                <Main className='client-main'>
                     <SupervisorDashboardBody />
                </Main>
        </div>

        </div>
    )
}

export default SupervisorDashboard;