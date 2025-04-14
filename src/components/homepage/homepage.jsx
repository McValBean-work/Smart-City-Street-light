import Header from "../layout/header"
import './homepage.css'
import Main from "../layout/main"
import StreetLightMap from "./map";

function HomePage(){
    return(
        <div className='homepage-body'>
        <Header />
        <Main>
            <StreetLightMap />
        </Main>
        </div>
    )
}
export default HomePage;