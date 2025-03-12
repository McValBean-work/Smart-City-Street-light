import { Link } from "react-router-dom"
function ForgotPasswordForm(){
    return(
      <>
      <form id="forgotPasswordForm" className="landing-page-form">
      <h2>Retrieve Password</h2>
      <div className="form-data">
      <label htmlFor="recoveryEmail" >Email</label>
      <input type="email" placeholder="Enter email address" required />
      <label htmlFor="recoveryPassword">Recovery password</label>
      <input type="password" placeholder="Enter sent Password" required/>
      <label htmlFor="newPassword">New password</label>
      <input type="password" placeholder="Enter new password" required />
      <label htmlFor="confirmNewPassword">Confirm new password</label>
      <input type="password" placeholder="Confirm new password" required />
      <input type="submit" className='submit' />
      <span>Remember password?<Link to="/" className="form-bottom-links">Login</Link></span>
      </div>
     </form>
    </>
    )

  }
  export default ForgotPasswordForm