import SideBar from "../layout/sidebar";
import TopSection from "../dashboard/top-section";
import Main from "../layout/main";
import '../dashboard/dashboard.css'


function UserInfo(){
    return(
        <>
        user info
        </>
    )
}

function UserInfoPage(){
    return(
        <>
        <div className="dashboard">
                <TopSection />
                <div className='dashboard-body'>
                    <SideBar />
                    <Main className='client-main'>
                        <UserInfo />
                    </Main>
                </div>
            </div>
        </>
    )
}

export default UserInfoPage;