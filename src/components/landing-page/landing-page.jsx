import './landing-page.css'
import LandingHeader from "./landing-header.jsx"
import Main from "../layout/main"
import { Link } from 'react-router-dom'





function LandingPageMainContent() {
    return (
        <>
        <div className="main-background">
            <div className="landing-page-main-text">
            <h1 className="landing-page-main-h">Let’s Work Together to Brighten Our Community</h1>
            <p className="landing-page-main-p">
            This project aims to make the maintenance of public property, especially streetlights, faster, more efficient, and more convenient for everyone.
            </p>
            <p className="landing-page-main-p">
            We firmly believe that with your support, we can achieve our goal of safer, well-lit streets. Join the OmniStreet Lights community today and help us light the path we all walk on.
            <Link to= "/Report" className="report-button" id= "reportFormButton">Report</Link>
            </p> 
            </div>
            <div className="landing-main-background">
            </div>

        </div>
        </>
    )
}

function LandingPage(){
    return(
        <>
        <LandingHeader />
        <Main>
        <LandingPageMainContent />
        </Main>
        </>
    )
}

export default LandingPage;