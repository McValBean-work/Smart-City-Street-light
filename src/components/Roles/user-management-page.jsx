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
                    <Main className='flex flex-col p-1 bg-neutral-50 justify-center'>
                        <UserTable />
                    </Main>
                </div>
            </div>
        </>
    )
}