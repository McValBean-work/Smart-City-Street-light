import { Link } from "react-router-dom"
import './header.css'
import '../../assets/icons/home.svg'
function NavBar(){
    return(
        <>
        <nav className="navbar">
            <Link to="/" className="nav-icon"></Link>
            <div className="nav-links">
                <Link to="/Home" className="nav-link"><img src="home.svg" alt="" /></Link>
                <Link to="/About" className="nav-link">About</Link>
                <Link to="/Contact-us"className="nav-link">Contact Us</Link>
                <Link to="/Login"className="nav-link" id="login-link">Login</Link>
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