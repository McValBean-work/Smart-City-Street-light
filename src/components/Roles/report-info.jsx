import api from '../api/axios-instance'
import { useState, useEffect} from 'react'
import SideBar from '../layout/sidebar';
import TopSection from '../dashboard/top-section';
import Main from '../layout/main';
import '../dashboard/dashboard.css'

function ReportInfoContent(){
    const reportId = localStorage.getItem("reportId");

    useEffect(() => {
        const getDetails = async () => {
            const response = await api.get(`api/report/${reportId}`);
            console.log(response.data.report);
            setReportDetails(response.data.report);
    }

        getDetails();
        console.log('ueEffect get report details was called');
    },[])

    const [reportDetails , setReportDetails] = useState([]);
    const [showAssignTaskForm , setShowAssignTaskForm] = useState(false);

    const InitialNewTaskState ={
        reportId: reportDetails.reportId,
        propertyId: reportDetails.propertyId,
        engineerId: null,
        assignedBy: null

    };
    //const [newTask , setNewTask] = useState(InitialNewTaskState);

    

    const AssignTaskSubmit = (e) => {
        e.preventDefault();

    }

    
    return (
        <>
                {reportDetails && (
                    <>
                    <div className='report-info-content'>
                        <h1>{reportDetails.propertyId}</h1>
                        <div>
                            <p>{reportDetails.description}</p>
                            <p>{reportDetails.submittedAt}</p>
                        </div>

                        <div>
                            <button onClick={() => setShowAssignTaskForm(true)}>
                                Assign as task
                                </button>
                                <button>
                                    Delete Report
                                </button>
                        </div>
                    </div>
                    { showAssignTaskForm && (
                        <>
                        <form onSubmit={AssignTaskSubmit}>
                            <label htmlFor="">Assign to</label>
                            <select name="engineers" id="">
                                {
                                    
                                }
                            </select>
                        </form>
                        </>
                    )}

                    </>
                )

                }
        </>
    )
}

function ReportInfoPage(){
    return(
        <>
            <div className="dashboard">
                <TopSection />
                <div className='dashboard-body'>
                    <SideBar />
                    <Main className='client-main'>
                        <ReportInfoContent />
                    </Main>
                </div>
            </div>
        </>
    )
}

export default ReportInfoPage;