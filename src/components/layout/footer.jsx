import './footer.css'
import OmniLogo from '../../assets/images/omni-logo.webp'
function Footer(){
    return(
        <footer className="footer-main-div">
            <div className="footer-branding">
                <div className="footer-icon-div">
                    <img src={OmniLogo} alt="" className='footer-icon'/>
                </div>
            </div>
            <div className="footer-links-div">
                <p>| 
                    <a href="https://github.com/McValBean-work/Smart-City-Street-light" target="_blank">View on GitHub</a>
                </p>
            </div>
            <div className="footer-socials">

            </div>
            <div className="footer-copyright-info">
                <p>© 2025 Smart City Platform. All rights reserved.</p>
                <p>Created by Valentine McBean-Willis</p>

            </div>

        </footer>
    )
}

export default Footer