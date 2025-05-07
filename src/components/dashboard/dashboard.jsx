import Navbar from "../layout/Navbar"
import './dashboard.css'
import Main from "../layout/main"
import StreetLightMap from "./map";
import TopSection from "./top-section";

function DashboardPage(){
    return(
<>
   <div className='dashboard'>
    <TopSection />
    <div className='dashboard-body'>

                <Navbar />
                <Main>
                    <StreetLightMap />
                </Main>
    </div>
    </div>
</>
    )
}
export default DashboardPage;