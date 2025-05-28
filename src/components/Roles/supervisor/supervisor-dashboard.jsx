import TopSection from "../../dashboard/top-section";
import '../../dashboard/dashboard.css'
import SideBar from "../../layout/sidebar";

function SupervisorDashboardBody(){

    return(
        <>
        <div className="dashboard-layout">
        <div className="supervisor-list">

        </div>
        <div className="engineer-list">

        </div>
    </div>
    <div className="task-chart"></div>
        </>
    )

}


function SupervisorDashboard(){
    return(
        <div className="dashboard">
        <TopSection />
        <div className="dashboard-body">

                <SideBar />
                <SupervisorDashboardBody />
        </div>

        </div>
    )
}

export default SupervisorDashboard;