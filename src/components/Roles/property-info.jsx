import SideBar from "../layout/sidebar";
import TopSection from "../dashboard/top-section";
import Main from "../layout/main";
import '../dashboard/dashboard.css'


function PropertyInfo(){
    return(
        <>
        property info
        </>
    )
}

function PropertyInfoPage(){
    return(
        <>
        <div className="dashboard">
                <TopSection />
                <div className='dashboard-body'>
                    <SideBar />
                    <Main className='client-main'>
                        <PropertyInfo />
                    </Main>
                </div>
            </div>
        </>
    )
}

export default PropertyInfoPage;