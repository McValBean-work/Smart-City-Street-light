import { Link } from "react-router-dom"
import './landing-header.css'
function NavBar(){
    return(
        <>
        <nav className="landing-navbar">
            <Link to="/" className="main-icon"></Link>
            <div className="nav-links">
                <Link to="/Home" className="nav-link">Home</Link>
                <Link to="/About" className="nav-link">About</Link>
                <Link to="/Contact-us"className="nav-link">Contact Us</Link>
                <Link to="/Login"className="nav-link" id="login-link">Login</Link>
                <Link to="/Sign-up"className="nav-link">Sign Up</Link>
            </div>
        </nav>
        </>
    )
}



function LandingHeader (){
    return(
        <>
            <NavBar />
        </>
    )
}

export default LandingHeader