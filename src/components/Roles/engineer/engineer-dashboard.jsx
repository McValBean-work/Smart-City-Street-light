import TopSection from "../../dashboard/top-section";
import '../../dashboard/dashboard.css'
import SideBar from '../../layout/sidebar'
import Main from "../../layout/main";


function EngineerDashboardBody(){

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


function EngineerDashboard(){
    return(
        <div className="dashboard">
        <TopSection />
        <div className="dashboard-body">

                <SideBar />
                <Main className='client-main'>
                    <EngineerDashboardBody />
                </Main>
        </div>

        </div>
    )
}

export default EngineerDashboard;