import { NavLink } from "react-router-dom";
import { useState } from 'react';
import './landing-header.css';
import MainIcon from '../../assets/images/omni-logo.webp';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBars, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
function NavBar(){

    const [showMobileMenu, setShowMobileMenu] = useState(false);
    
    return(
        <>
        <nav className="landing-navbar">
            <NavLink to="/landing-page" className='main-icon-link'>
            <img src={MainIcon} alt="omni street light" className="main-icon" />
            </NavLink>
            <button onClick={() => setShowMobileMenu(true)}>
                <FontAwesomeIcon icon={faBars} className='menubar'/>
            </button>
            
            <div>
            
            </div>
            <div className="user-nav-links">
                <NavLink to="/" className={({ isActive })=> isActive ? 'user-nav-link active' : 'user-nav-link' }>Home</NavLink>
                <NavLink to="/about" className={({ isActive })=> isActive ? 'user-nav-link active' : 'user-nav-link'}>About</NavLink>
                <NavLink to="/contact-us" className={({ isActive })=> isActive ? 'user-nav-link active' : 'user-nav-link'}>Contact Us</NavLink>
                <NavLink to="/faqs" className={({ isActive })=> isActive ? 'user-nav-link active' : 'user-nav-link'}>FAQs</NavLink>
            </div>
        </nav>
        { showMobileMenu && (
            <div className=" backdrop-blur-4 z-100000 w-full min-h-full absolute">
            <div className="flex-col p-4 w-full z-100001 absolute min-h-full bg-red-500 text-green-500 border-red-500">
            <div className='flex justify-between p-4'>
                <img src={MainIcon} alt="" className="w-1/2 flex"/>
                <button onClick={()=> setShowMobileMenu(false)}>
                    <FontAwesomeIcon icon={faCircleXmark} className='flex w-fit'/>
                </button>
            </div>
            <div className="flex flex-col">
                <NavLink to="/" className={({ isActive })=> isActive ? 'user-nav-link active' : 'user-nav-link' }>Home</NavLink>
                <NavLink to="/about" className={({ isActive })=> isActive ? 'user-nav-link active' : 'user-nav-link'}>About</NavLink>
                <NavLink to="/contact-us" className={({ isActive })=> isActive ? 'user-nav-link active' : 'user-nav-link'}>Contact Us</NavLink>
                <NavLink to="/faqs" className={({ isActive })=> isActive ? 'user-nav-link active' : 'user-nav-link'}>FAQs</NavLink>
            </div>
            </div>
            
            </div>
        )

        }
        
        </>
    )
}



function LandingHeader (){
    return(
            <NavBar />
    )
}

export default LandingHeader