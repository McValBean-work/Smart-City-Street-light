import Navbar from "../layout/Navbar"
import './dashboard.css'
import Main from "../layout/main"
import StreetLightMap from "./map";

function DashboardPage(){
    return(
<>
    <div className='dashboard-body'>
                <Navbar />
                <Main>
                    <StreetLightMap />
                </Main>
    </div>
</>
    )
}
export default DashboardPage;