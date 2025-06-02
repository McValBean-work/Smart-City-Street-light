import api from "../api/axios-instance"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideBar from "../layout/sidebar";
import TopSection from "../dashboard/top-section";
import Main from "../layout/main";
import '../dashboard/dashboard.css'



function Reports(){


     const [allReports, setAllReports] = useState([]);
     const [showPopUp , setShowPopUp] = useState(false);
     const [showAssignTaskForm , setShowAssignTaskForm] = useState(false);
     const totalReports = allReports.length;

    async function getReports(){
        const res = await api.get("api/reports");
        setAllReports(res.data.reports);
        console.log(res.data.reports);

    }

        useEffect(() => {
            getReports();
            console.log("useEffect get all tasks");
    },[]);


    function ReportOnClick (children) {
        setShowPopUp(true);
        console.log(children);
        localStorage.setItem('reportId', children)
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
                        <tr key={report._id}>
                            <td>{report.propertyId}</td>
                            <td>{report.description}
                                <button className='more-options'
                                onClick={() => ReportOnClick(report._id)}>
                                : </button>
                            </td>
                        </tr>
                         ))
                         }
            </table>
             {
                showPopUp && (
                    <>
                    <div className ='pop-up-div'>
                        <span>
                             <Link to='/portal/report/info'>
                             More Info
                             </Link>
                             </span>
                        <span onClick={() => setShowAssignTaskForm(true)}>Assign task</span>
                        <span className="delete">Delete report</span>
                    </div>
                    </>
                )
            }
            { showAssignTaskForm && (
                <>
                    <div>
                        <form action="">
                            <label htmlFor="">Assign to</label>
                            <select name="" id="">
                                {(
                                    <option value=""></option>

                            )}
                            </select>
                            <label htmlFor=""></label>
                            <input type="text" placeholder='add comment' />
                            <label htmlFor=""></label>
                        </form>
                    </div>
                </>
            )

            }
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
                    <Main className='client-main'>
                        <Reports />
                    </Main>
                </div>
                </div>
        </>
    )
}

export default ReportsPage;