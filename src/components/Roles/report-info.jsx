import api from '../api/axios-instance'
import { useState, useEffect} from 'react'
import SideBar from '../layout/sidebar';
import TopSection from '../dashboard/top-section';
import Main from '../layout/main';
import '../dashboard/dashboard.css'

function ReportInfoContent(){
    const [reportDetails , setReportDetails] = useState([]);

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
    return (
        <>
                {reportDetails && (
                    <>
                    <div className='report-info-content'>
                        <h1>{reportDetails.propertyId}</h1>
                    </div>

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