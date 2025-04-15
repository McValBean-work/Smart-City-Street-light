import { Link } from "react-router-dom"
import './authentication-page.css'
function ForgotPasswordForm(){
    return(
      <>
      <form id="forgotPasswordForm" className="authentication-page-form">
      <h2>Retrieve Password</h2>
      <div className="form-data">
      <label htmlFor="recoveryEmail" >Email</label>
      <input type="email" placeholder="Enter email address" id="recoveryEmail" required />
      <label htmlFor="recoveryPassword">Recovery password</label>
      <input type="password" placeholder="Enter sent Password" id= "recoveryPassword" required/>
      <label htmlFor="newPassword">New password</label>
      <input type="password" placeholder= "Enter new password" id="newPassword"  required/>
      <label htmlFor="confirmNewPassword">Confirm new password</label>
      <input type="password" placeholder="Confirm new password" id="confirmNewPassword" required/>
      <input type="submit" className="submit" />
      <span className="form-bottom"> Remember password?<Link to="/Login" className="form-links">Login</Link></span>
      </div>
     </form>
    </>
    )
  }
  function AuthenticationHero(){
    return(
        <div className="authentication-page-hero-div">
          <div className="authentication-page-hero"></div>
        </div>
    );
  }
  function ForgotPasswordPage(){
    return(
      <>
      <div className="authentication-page-grid">
      <div className="landing-page-form-div">
        <ForgotPasswordForm />
      </div>
      <AuthenticationHero />
      </div>
      </>
    );
  }

  export default ForgotPasswordPage;