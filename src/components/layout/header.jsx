import { Link } from "react-router-dom"
import './header.css'
function NavBar(){
    return(
        <>
        <nav class="navbar">
            <div className="Omni-icon">
            <Link to="/" className="nav-icon">OmniStreet Lights</Link>
            </div>
            <div class="nav-links">
                <Link to="/Home" className="nav-link">Home</Link>
                <Link to="/About" className="nav-link">About</Link>
                <Link to="/Contact-us"className="nav-link">Contact Us</Link>
                <Link to="/Login"className="nav-link">Login</Link>
                <Link to="/Sign-up"className="nav-link">Sign Up</Link>
            </div>
        </nav>
        </>
    )
}


function Header (){
    return(
        <>
            <NavBar />
        </>
    )
}

export default Header