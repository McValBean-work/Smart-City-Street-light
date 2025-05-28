import TopSection from "../../dashboard/top-section";
import '../../dashboard/dashboard.css'
import SideBar from "../../layout/sidebar";
import Main from "../../layout/main"

function AdminDashboardBody(){

    return(
        <>
        <div className="dashboard-layout">
        <div className="supervisor-list">
        <h1>This is the supervisor list div</h1>
        </div>
        <div className="engineer-list">
            <h1>this is the engineer list div</h1>
        </div>
    </div>
    <div className="task-chart">this is the list for All tasks</div>
        </>
    )

}


function AdminDashboard(){
    return(
        <div className="dashboard">
        <TopSection />
        <div className="dashboard-body">

                <SideBar />
                <Main>
                    <AdminDashboardBody />
                </Main>
        </div>
        </div>
    )
}

export default AdminDashboard;