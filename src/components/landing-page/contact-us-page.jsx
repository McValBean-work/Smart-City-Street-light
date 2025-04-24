import ContactUsForm from "./contact-us"
import LandingHeader from "./landing-header"
import Main from "../layout/main"
import Footer from "../layout/footer"
import '../layout/user-layout.css'

function ContactUsPage(){
    return (
        <>
        <div className="user-grid-layout">
        <LandingHeader />
        <Main>
         <ContactUsForm />
        </Main>
        <Footer />
        </div>
        </>
    )
}
export default ContactUsPage;