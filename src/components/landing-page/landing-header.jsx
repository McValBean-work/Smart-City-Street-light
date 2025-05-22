import { Link } from "react-router-dom"
import './landing-header.css'
import MainIcon from '../../assets/images/omni-logo.webp'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";
function NavBar(){
    return(
        <>
        <nav className="landing-navbar">
            <Link to="/landing page" className='main-icon-link'>
            <img src={MainIcon} alt="omni street light" className="main-icon" />
            </Link>
            <div>
            <FontAwesomeIcon icon={faBars} className='menubar' />
            </div>
            <div className="user-nav-links">
                <Link to="/" className="user-nav-link">Home</Link>
                <Link to="/about" className="user-nav-link">About</Link>
                <Link to="/contact-us" className="user-nav-link">Contact Us</Link>
                <Link to="/faqs" className="user-nav-link">FAQs</Link>
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