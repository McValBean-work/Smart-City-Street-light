import './landing-page.css'
import LandingHeader from './landing-header';
import Main from "../layout/main"


function LandingPage (){
    return(
        <>
        <LandingHeader />
        <Main>
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
      <video autoPlay loop muted playsInline className="background-video">
        <source src="src\assets\videos\globe.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
            </div>
            </div>
        </Main>
        </>
    )
}
export default LandingPage;