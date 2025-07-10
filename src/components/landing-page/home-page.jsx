import './home-page.css'
import LandingHeader from "./landing-header.jsx"
import Main from "../layout/main.jsx"
import ReportForm from "./report-form.jsx"
import '../layout/user-layout.css'
import Footer from '../layout/footer.jsx'

function HomePage(){
    return(
        <>
        <LandingHeader />
        <Main>
        <ReportForm />
        </Main>
        <Footer />
        </>
    )
}

export default HomePage;