import { Link } from "react-router-dom"
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot , faHome , faReceipt , faFile ,faRightFromBracket} from "@fortawesome/free-classic-svg-icons";
function NavBar(){
    return(
        <>
        <nav className="navbar">
            <div className="nav-links">
                <Link to="/Home" className="nav-link">
                <FontAwesomeIcon icon={faHome} size="2x" />
                </Link>
                <Link to="/About" className="nav-link">
                <FontAwesomeIcon icon={faLocationDot} size="2x" />
                </Link>
                <Link to="/Contact-us"className="nav-link">
                <FontAwesomeIcon icon={faReceipt} size="2x" />
                </Link>
                <Link to="/Contact-us"className="nav-link">
                <FontAwesomeIcon icon={faFile} size="2x" />
                
                </Link>
                
            </div>
            <div className="nav-links">
            <Link className="nav-link">
                <FontAwesomeIcon icon={faRightFromBracket} size="2x" />
                </Link>
            </div>
        </nav>
        </>
    )
}
export default NavBar