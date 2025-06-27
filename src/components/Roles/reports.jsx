import api from "../api/axios-instance";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideBar from "../layout/sidebar";
import TopSection from "../dashboard/top-section";
import Main from "../layout/main";
import GetUsers from './get-users';
import '../dashboard/dashboard.css';
import { toast } from "react-toastify";
import ReportsTable from './reports-table';



function ReportsPage() {
  return (
    <div className="dashboard">
      <TopSection />
      <div className='dashboard-body'>
        <SideBar />
        <Main className='client-main'>
          <ReportsTable />
        </Main>
      </div>
    </div>
  );
}

export default ReportsPage;
