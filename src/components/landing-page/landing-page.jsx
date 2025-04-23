import './landing-page.css'
import LandingHeader from "./landing-header.jsx"
import Main from "../layout/main"
import ReportForm from "./report-form.jsx"

function LandingPage(){
    return(
        <>
        <LandingHeader />
        <Main>
        <ReportForm />
        </Main>
        </>
    )
}

export default LandingPage;