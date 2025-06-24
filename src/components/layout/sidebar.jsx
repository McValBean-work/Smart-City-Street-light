import { NavLink } from "react-router-dom"
import { Link } from "react-router-dom"
import getRole from "../Authentication-page/auth";
import './sidebar.css'
{/* import  { useState } from "react" */}
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot , faHome , faFile ,faRightFromBracket, faUserPlus, faListCheck, faUsers} from "@fortawesome/free-solid-svg-icons";
function SideBar(){
    const role = getRole();

    const logout=()=>{
        localStorage.clear();
        console.log(localStorage.getItem("role"));
    };

    const sidebarLinks = [
  { to: "/portal/dashboard", title: "dashboard", icon: faHome, label: "Dashboard" },
  { to: "/portal/tasks", title: "tasks", icon: faListCheck, label: "Tasks" },
  { to: "/portal/properties", title: "properties", icon: faLocationDot, label: "Properties" },
  { to: "/portal/reports", title: "view reports", icon: faFile, label: "Reports" },
];


    return(
        <>
        <nav className="sidebar">
            { role === 'admin' && (
                <>
                <div className="sidebar-links">
                <NavLink to="/portal/dashboard" title="dashboard" className={({ isActive })=> isActive ? 'sidebar-link active' : 'sidebar-link'}>
                <FontAwesomeIcon icon={faHome} className='sidebar-icon' />
                <span>Dashboard</span>
                </NavLink>
                <NavLink to="/portal/user-management" title="User management" className={({ isActive })=> isActive ? 'sidebar-link active' : 'sidebar-link'}>
                <FontAwesomeIcon icon={faUsers}  className='sidebar-icon'  />
                <span>User Management</span>
                </NavLink>
                <NavLink to="/portal/tasks" title="tasks" className={({ isActive })=> isActive ? 'sidebar-link active' : 'sidebar-link'}>
                <FontAwesomeIcon icon={faListCheck}  className='sidebar-icon'  />
                <span>Tasks</span>
                </NavLink>
                <NavLink to="/portal/properties" title="properties" className={({ isActive })=> isActive ? 'sidebar-link active' : 'sidebar-link'}>
                <FontAwesomeIcon icon={faLocationDot}  className='sidebar-icon'  />
                <span>Properties</span>
                </NavLink>
                <NavLink to="/portal/reports" title="view reports" className={({ isActive })=> isActive ? 'sidebar-link active' : 'sidebar-link'}>
                <FontAwesomeIcon icon={faFile}  className='sidebar-icon' />
                <span>Reports</span>
                </NavLink>
                <Link to="/sign-Up" title="create user" className="sidebar-link" >
                <FontAwesomeIcon icon={faUserPlus}  className='sidebar-icon' />
                <span>Create User</span>
                </Link>
            </div>
            <div className="sidebar-links">

            <Link to="/login" title="logout" onClick={logout} className="sidebar-link logout">
                <FontAwesomeIcon icon={faRightFromBracket}  className='sidebar-icon' />
                <span>Logout</span>
                </Link>
            </div>
                </>
            )
            }
            {role === 'supervisor' && (
                <>
                <div className="sidebar-links">
  {sidebarLinks.map(({ to, title, icon, label }) => (
    <NavLink
      key={to}
      to={to}
      title={title}
      className={({ isActive }) =>
        isActive ? "sidebar-link active" : "sidebar-link"
      }
    >
      <FontAwesomeIcon icon={icon} className="sidebar-icon" />
      <span>{label}</span>
    </NavLink>
  ))}
</div>

            <div className="sidebar-links">

            <Link to="/login" title="logout" onClick={logout} className="sidebar-link logout">
                <FontAwesomeIcon icon={faRightFromBracket}  className='sidebar-icon'  />
                <span>Logout</span>
                </Link>
            </div>
                </>
            )

            }
            {role === 'engineer' &&(
                <>
                <div className="sidebar-links">
                <NavLink to="/portal/dashboard" title="dashboard" className={({ isActive })=> isActive ? 'sidebar-link active' : 'sidebar-link'}>
                <FontAwesomeIcon icon={faHome}  className='sidebar-icon' />
                <span>Dashboard</span>
                </NavLink>
                <NavLink to="/portal/tasks" title="tasks" className={({ isActive })=> isActive ? 'sidebar-link active' : 'sidebar-link'}>
                <FontAwesomeIcon icon={faListCheck}  className='sidebar-icon' />
                <span>Tasks</span>
                </NavLink>
            </div>
            <div className="sidebar-links">

            <Link to="/login" title="logout" onClick={logout} className="sidebar-link logout">
                <FontAwesomeIcon icon={faRightFromBracket}  className='sidebar-icon' />
                <span>Logout</span>
                </Link>
            </div>
                </>
            )

            }
            </nav>
        </>
    )
}
export default SideBar