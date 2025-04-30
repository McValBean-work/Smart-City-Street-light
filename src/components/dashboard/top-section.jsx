import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './top-section.css'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

function TopSection(){
    return(
        <>
        <div className='top-section'>
         <input type="search" name="" id="" className="search-input" />
         <FontAwesomeIcon icon={faUserCircle} className='nav-link'/>
        </div>
        </>
    )
}
export default TopSection;