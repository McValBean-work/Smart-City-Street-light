import SideBar from "../layout/sidebar";
import TopSection from "../dashboard/top-section";
import Main from "../layout/main";
import UserTable from "./user-table";

export default function UserManagementPage (){
    return(
        <>
        <div className="dashboard">
                <TopSection />
                <div className='dashboard-body'>
                    <SideBar />
                    <Main className='client-main'>
                        <UserTable />
                    </Main>
                </div>
            </div>
        </>
    )
}