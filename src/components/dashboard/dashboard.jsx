import React from "react";
import './dashboard.css'
import getRole from "../Authentication-page/auth";
import AdminDashboard from "../Roles/admin/admin-dashboard";
import SupervisorDashboard from "../Roles/supervisor/supervisor-dashboard";
import EngineerDashboard from "../Roles/engineer/engineer-dashboard";
import TopSection from "./top-section";
import Main from "../layout/main";
import SideBar from "../layout/sidebar";

function Dashboard(){
    const role = getRole();
    return(
        <div className="dashboard">
        <TopSection />
        <div className="dashboard-body">

                <SideBar />
                <Main className='client-main'>
                    {role === 'admin' && <AdminDashboard />}
                    {role === 'supervisor' && <SupervisorDashboard />}
                    {role === 'engineer' && <EngineerDashboard />}

                </Main>
        </div>

        </div>
    )
}

export default Dashboard;