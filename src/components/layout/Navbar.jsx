import { Link } from "react-router-dom"
import './Navbar.css'
{/* import  { useState } from "react" */}
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot , faHome , faFile ,faRightFromBracket, faUserPlus, faListCheck} from "@fortawesome/free-solid-svg-icons";
function SideBar(){
    { /* const [activePage , setActivePage] = useState(); */}
    return(
        <>
        <nav className="sidebar">
            <div className="sidebar-links">
                <Link to="/" className="sidebar-link">
                <FontAwesomeIcon icon={faHome}  />
                <span>Dashboard</span>
                </Link>
                <Link to="/Tasks" className="sidebar-link">
                <FontAwesomeIcon icon={faListCheck}  />
                <span>Tasks</span>
                </Link>
                <Link to="/portal/dashboard" className="sidebar-link">
                <FontAwesomeIcon icon={faLocationDot}  />
                <span>Properties</span>
                </Link>
                <Link to="/Contact-us"className="sidebar-link">
                <FontAwesomeIcon icon={faFile}  />
                <span>Reports</span>
                </Link>
            </div>
            <div className="sidebar-links">
                <Link to="/Sign-Up" className="sidebar-link" >
                <FontAwesomeIcon icon={faUserPlus}  />
                <span>Create User</span>
                </Link>
            <Link to="/Login" className="sidebar-link">
                <FontAwesomeIcon icon={faRightFromBracket}  />
                <span>Logout</span>
                </Link>
            </div>
        </nav>
        </>
    )
}
export default SideBar