import { Link } from "react-router-dom"
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot , faHome , faReceipt , faFile ,faRightFromBracket, faUserPlus} from "@fortawesome/free-solid-svg-icons";
function SideBar(){
    return(
        <>
        <nav className="sidebar">
            <div className="sidebar-links">
                <Link to="/" className="sidebar-link">
                <FontAwesomeIcon icon={faHome}  />
                </Link>
                <Link to="/portal/Dashboard" className="sidebar-link">
                <FontAwesomeIcon icon={faLocationDot}  />
                </Link>
                <Link to="/Contact-us"className="sidebar-link">
                <FontAwesomeIcon icon={faReceipt}  />
                </Link>
                <Link to="/Contact-us"className="sidebar-link">
                <FontAwesomeIcon icon={faFile}  />
                </Link>
            </div>
            <div className="sidebar-links">
                <Link to="/Sign-Up" className="sidebar-link" >
                <FontAwesomeIcon icon={faUserPlus}  />
                </Link>
            <Link to="/Login" className="sidebar-link">
                <FontAwesomeIcon icon={faRightFromBracket}  />
                </Link>
            </div>
        </nav>
        </>
    )
}
export default SideBar