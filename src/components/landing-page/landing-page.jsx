import './landing-page.css'
import Header from "../layout/header"
import Main from "../layout/main"


function LandingPageMainContent() {
    return (
        <>
        <div className="landing-page-main-background">
            <div className="landing-page-main-text">
                <h1 className="landing-page-main-h">Let's Take Care Of Our Community Together</h1>
                <p className="landing-page-main-p">
                This project is being undertaken so that maintenance of public property will be made faster and more convenient,for street lights in particular.
                </p>
                <p className="landing-page-main-p">
                    We highly believe that with your help our goal can be achieved so we urge you to join the OmniStreet lights community and help us light the path you walk on
                </p>
            </div>
            <div className="">

            </div>

        </div>
        </>
    )
}

function LandingPage(){
    return(
        <>
        <Header />
        <Main>
        <LandingPageMainContent />
        </Main>

        </>
    )
}

export default LandingPage;