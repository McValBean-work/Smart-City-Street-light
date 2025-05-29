import TopSection from "../../dashboard/top-section";
import '../../dashboard/dashboard.css'
import SideBar from "../../layout/sidebar";
import Main from "../../layout/main"
//import api from "../../api/axios-instance"

function AdminDashboardBody(){

   {/* const [allUsers , setAllUsers] = useState([]);
        const [supervisors , setSupervisors] =useState([]);
        setSupervisors(allUsers.filter((user) => user.role === "supervisor");)
        const [engineers , setEngineers] =useState([]);
        setSupervisors(allUsers.filter((user) => user.role === "engineer");)
        const getUsers = async () => {
        const response = await api.get("api/users");
        setAllUsers(response.data);
        console.log(response.data);
    }*/}
    return(
        <>
        <div className="dashboard-layout">
        <div className="supervisor-list">
        <h1>This is the supervisor list div</h1>
       {/*} { Array.isArray(supervisors)}*/}
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