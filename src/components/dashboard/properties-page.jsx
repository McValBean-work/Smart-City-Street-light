import SideBar from "../layout/sidebar"
import './dashboard.css'
import Main from "../layout/main"
import StreetLightMap from "./map";
import PropertyTable from "../Roles/property-table";
import TopSection from "./top-section";

function PropertiesPage(){
    return(
<>
   <div className='dashboard'>
    <TopSection />
    <div className='dashboard-body'>
                <SideBar />
                <Main className='client-main'>
                    <StreetLightMap />
                    <PropertyTable />
                </Main>
    </div>
    </div>
</>
    )
}
export default PropertiesPage;