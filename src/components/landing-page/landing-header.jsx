import { Link } from "react-router-dom"
import './landing-header.css'
import MainIcon from '../../assets/images/omni-logo.webp'
function NavBar(){
    return(
        <>
        <nav className="landing-navbar">
            <Link to="/LandingPage" className="main-icon"><img src={MainIcon} alt="omni street light"/>
            </Link>
            <div className="user-nav-links">
                <Link to="/" className="user-nav-link">Home</Link>
                <Link to="/About" className="user-nav-link">About</Link>
                <Link to="/Contact-us" className="user-nav-link">Contact Us</Link>
                <Link to="/FAQs" className="user-nav-link">FAQs</Link>
            </div>
        </nav>
        </>
    )
}



function LandingHeader (){
    return(
            <NavBar />
    )
}

export default LandingHeader