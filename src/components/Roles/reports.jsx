import api from "../api/axios-instance"
import { useState, useEffect } from "react";
import SideBar from "../layout/sidebar";
import TopSection from "../dashboard/top-section";
import Main from "../layout/main";
import '../dashboard/dashboard.css'



function Reports(){


     const [allReports, setAllReports] = useState([]);
     const [showPopUp , setShowPopUp] = useState(false);
     const totalReports = allReports.length;

    async function getReports(){
        const res = await api.get("api/reports");
        setAllReports(res.data.reports);
        console.log(res.data.reports);

    }

        useEffect(()=>{
            getReports();
            console.log("useEffect get all tasks");
    },[]);


    const ReportOnClick = ()=>{
        if(showPopUp(true)){
            setShowPopUp(false);
        }
        else{
            setShowPopUp(true);
        }
    }
     function AssignReportSubmit(children){
        return (
            <>
            <div>this is {children}</div>
            </>
        )
    }



    return(
        <>
        <div className='dashboard-layout'>
            <div>
            <h1>All reports : {totalReports}</h1>
            <table>
                <tr>
                    <th>Property Id</th>
                    <th>Description</th>
                </tr>
                 { Array.isArray(allReports) &&
                     allReports.map((report)=>(
                        <tr key={report._id} onClick={AssignReportSubmit(report._id)}>
                            <td>{report.propertyId}</td>
                            <td>{report.description}
                                <button className='more-options' onClick={ReportOnClick}>:</button>
                            </td>
                        </tr>
                         ))
                         }
                         
            </table>
                        </div>
                <div>THIS IS THE SECOND DIV</div>

        </div>

        </>
    )
}

function ReportsPage(){

    return(
        <>
            <div className="dashboard">
                <TopSection />
                <div className='dashboard-body'>
                    <SideBar />
                    <Main>
                        <Reports />
                    </Main>
                </div>
                </div>
        </>
    )
}

export default ReportsPage;