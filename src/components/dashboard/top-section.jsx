import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'
import './top-section.css'
import getUser from '../Authentication-page/auth';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import OmniStreetLightIcon from '../../assets/images/omni-logo.webp'

function TopSection(){
    const role = getUser();
    return(
        <>
        <div className='top-section'>
            <div>
                <Link to="/">
                <img src={OmniStreetLightIcon} alt="" className='dashboard-icon' />
                </Link>

            </div>
            <div>
                <h1 className='role-name'>{role}</h1>
                <FontAwesomeIcon icon={faUserCircle} className='nav-link'/>
            </div>
        </div>
        </>
    )
}
export default TopSection;