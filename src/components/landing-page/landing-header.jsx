import { NavLink } from "react-router-dom"
import './landing-header.css'
import MainIcon from '../../assets/images/omni-logo.webp'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";
function NavBar(){
    return(
        <>
        <nav className="landing-navbar">
            <NavLink to="/landing page" className='main-icon-link'>
            <img src={MainIcon} alt="omni street light" className="main-icon" />
            </NavLink>
            <div>
            <FontAwesomeIcon icon={faBars} className='menubar' />
            </div>
            <div className="user-nav-links">
                <NavLink to="/" className={({ isActive })=> isActive ? 'user-nav-link active' : 'user-nav-link'}>Home</NavLink>
                <NavLink to="/about" className={({ isActive })=> isActive ? 'user-nav-link active' : 'user-nav-link'}>About</NavLink>
                <NavLink to="/contact-us" className={({ isActive })=> isActive ? 'user-nav-link active' : 'user-nav-link'}>Contact Us</NavLink>
                <NavLink to="/faqs" className={({ isActive })=> isActive ? 'user-nav-link active' : 'user-nav-link'}>FAQs</NavLink>
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