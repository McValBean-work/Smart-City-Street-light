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
        <nav className="flex px-5 w-screen h-max justify-between items-center">
            <NavLink to="/landing-page" className='w-1/3 md:w-1/4 h-min p-0 m-0'>
            <img src={MainIcon} alt="Smart City Logo" className="w-full h-fit" />
            </NavLink>            
            <div>
                 <button onClick={() => setShowMobileMenu( prev => !prev )}
                className='flex sm:hidden w-full h-fit'>
                <FontAwesomeIcon icon={faBars}  />
            </button>
            
            </div>
            <div className="hidden sm:flex p-4 h-full w-min">
                <NavLink to="/" className={({ isActive })=> isActive ? 'user-nav-link active' : 'user-nav-link' }>Home</NavLink>
                <NavLink to="/about" className={({ isActive })=> isActive ? 'user-nav-link active' : 'user-nav-link'}>About</NavLink>
                <NavLink to="/contact-us" className={({ isActive })=> isActive ? 'user-nav-link active' : 'user-nav-link'}>Contact Us</NavLink>
                <NavLink to="/faqs" className={({ isActive })=> isActive ? 'user-nav-link active' : 'user-nav-link'}>FAQs</NavLink>
            </div>
        </nav>
        {showMobileMenu && (
            <div className="transition-all flex flex-col min-h-screen min-w-screen z-10000 bg-neutral-300 text-green-500 border-red-500 absolute" >
            <div className='flex w-full justify-between p-8 mb-10'>   
                <img src={MainIcon} alt="" className="w-1/2 h-min flex"/>
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