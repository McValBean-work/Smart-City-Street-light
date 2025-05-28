import React from "react"
import getRole from "./auth"
import AdminDashboard from "../Roles/admin/admin-dashboard";
import SupervisorDashboard from "../Roles/supervisor/supervisor-dashboard";
import { Navigate } from "react-router-dom";

export default function AuthLayout(){

    const role = getRole();
    return (
        <>
        {
            role === "admin" ? <AdminDashboard />
            :role === "supervisor" ? <SupervisorDashboard />
            :role === "engineer" ? <EngineerDashboard />
            :<Navigate to='/login' />
        }
        </>
    )
}