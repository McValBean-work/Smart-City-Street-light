import Header from "../layout/header"
import './dashboard.css'
import Main from "../layout/main"
import StreetLightMap from "./map";

function DashboardPage(){
    return(
        <div className='homepage-body'>
        <Header />
        <Main>
            <StreetLightMap />
        </Main>
        </div>
    )
}
export default DashboardPage;