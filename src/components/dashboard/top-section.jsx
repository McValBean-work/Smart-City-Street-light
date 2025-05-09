import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './top-section.css'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import OmniStreetLightIcon from '../../assets/images/omni-logo.webp'

function TopSection(){
    return(
        <>
        <div className='top-section'>
            <div>
                {/*<h1 className='role-name'>Admin</h1>*/}
                <img src={OmniStreetLightIcon} alt="" className='dashboard-icon' />
            </div>
            <div>
                <input type="search" name="" id="" className="search-input" />
                <FontAwesomeIcon icon={faUserCircle} className='nav-link'/>
            </div>
        </div>
        </>
    )
}
export default TopSection;