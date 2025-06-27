import api from "../api/axios-instance"
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import SideBar from "../layout/sidebar";
import TopSection from "../dashboard/top-section";
import Main from "../layout/main";
import GetUsers from "./get-users";
import getRole from "../Authentication-page/auth";
import ObjectList from "./property-table";
import TaskTable from './task-table';
import '../dashboard/dashboard.css'
import { toast } from "react-toastify";


function TasksPage(){
    return(
        <>
            <div className="dashboard">
                <TopSection />
                <div className='dashboard-body'>
                    <SideBar />
                    <Main className='client-main'>
                        <TaskTable />
                    </Main>
                </div>
            </div>
        </>
    )
}

export default TasksPage;