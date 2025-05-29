import SideBar from "../layout/sidebar"
import './dashboard.css'
import Main from "../layout/main"
import StreetLightMap from "./map";
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
                </Main>
    </div>
    </div>
</>
    )
}
export default PropertiesPage;