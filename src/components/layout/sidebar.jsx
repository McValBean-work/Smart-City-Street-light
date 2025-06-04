import { NavLink } from "react-router-dom"
import { Link } from "react-router-dom"
import './sidebar.css'
{/* import  { useState } from "react" */}
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot , faHome , faFile ,faRightFromBracket, faUserPlus, faListCheck} from "@fortawesome/free-solid-svg-icons";
function SideBar(){

    const logout=()=>{
        localStorage.clear();
        console.log(localStorage.getItem("role"));
    };

    return(
        <>
        <nav className="sidebar">
            <div className="sidebar-links">
                <NavLink to="/portal/dashboard" title="dashboard" className={({ isActive })=> isActive ? 'sidebar-link active' : 'sidebar-link'}>
                <FontAwesomeIcon icon={faHome}  />
                <span>Dashboard</span>
                </NavLink>
                <NavLink to="/portal/tasks" title="tasks" className={({ isActive })=> isActive ? 'sidebar-link active' : 'sidebar-link'}>
                <FontAwesomeIcon icon={faListCheck}  />
                <span>Tasks</span>
                </NavLink>
                <NavLink to="/portal/properties" title="properties" className={({ isActive })=> isActive ? 'sidebar-link active' : 'sidebar-link'}>
                <FontAwesomeIcon icon={faLocationDot}  />
                <span>Properties</span>
                </NavLink>
                <NavLink to="/portal/reports" title="view reports" className={({ isActive })=> isActive ? 'sidebar-link active' : 'sidebar-link'}>
                <FontAwesomeIcon icon={faFile}  />
                <span>Reports</span>
                </NavLink>
                <Link to="/sign-Up" title="create user" className="sidebar-link" >
                <FontAwesomeIcon icon={faUserPlus}  />
                <span>Create User</span>
                </Link>
            </div>
            <div className="sidebar-links">

            <Link to="/login" title="logout" onClick={logout} className="sidebar-link logout">
                <FontAwesomeIcon icon={faRightFromBracket}  />
                <span>Logout</span>
                </Link>
            </div>
        </nav>
        </>
    )
}
export default SideBar