import TopSection from "../../dashboard/top-section";
import { useState , useEffect } from "react";
import '../../dashboard/dashboard.css'
import SideBar from "../../layout/sidebar";
import Main from "../../layout/main"
import api from "../../api/axios-instance"

function AdminDashboardBody(){
 const [allUsers , setAllUsers] = useState([]);
        const [supervisors , setSupervisors] =useState([]);
        const [engineers , setEngineers] =useState([]);
        const totalUsers = allUsers.length;

        async function getUsers() {
        const response = await api.get("api/users");
        setAllUsers(response.data.accounts);
        console.log(response.data.accounts);

        setSupervisors(allUsers.filter( user => (user.role === "supervisor")))
        setEngineers(allUsers.filter( user => (user.role === "engineer")))
    }
     console.log(supervisors);
     console.log(engineers);

        useEffect(()=>{
            getUsers();
            console.log("useEffect get users called");
            },[]);

    return(
        <>
        <div className="dashboard-layout">
        <div className="supervisor-list">
        <h1>All Users : {totalUsers}</h1>
        <table>
            <tr>
                <th>Role</th>
                <th>FullName</th>
                <th>Email Address</th>
            </tr>
             { Array.isArray(allUsers) &&
       allUsers.map((user)=>(
        <tr>
            <td>{user.role}</td>
            <td>{user.fullName}</td>
            <td>{user.email}</td>
        </tr>
        ))
       }
        </table>
        </div>
        <div className="engineer-list">
            <h1>this is the engineer list div</h1>
        </div>
    </div>
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