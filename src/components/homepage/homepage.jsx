import Header from "../layout/header"
import Main from "../layout/main"
import StreetLightMap from "./map";

function HomePage(){
    return(
        <>
        <Header />
        <Main>
            <StreetLightMap />
        </Main>
        </>
    )
}
export default HomePage;