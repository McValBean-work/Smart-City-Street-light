import { Link } from "react-router-dom"
import './header.css'
import '../../assets/icons/home.svg'
function NavBar(){
    return(
        <>
        <nav className="navbar">
            <div className="nav-links">
                <Link to="/Home" className="nav-link">
                <img src="src\assets\icons\home.svg" alt="" />
                </Link>
                <Link to="/About" className="nav-link">About</Link>
                <Link to="/Contact-us"className="nav-link">Contact Us</Link>
            </div>
        </nav>
        </>
    )
}
export default NavBar