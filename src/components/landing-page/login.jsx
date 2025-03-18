import { Link } from 'react-router-dom';

function LoginForm(){
    return(
      <>
      <form id="loginForm" className="landing-page-form">
      <h1 class="landing-page-header">OmniStreet Lights</h1>
      <h2>Please enter your account details</h2>
      <div className="form-data">
      <label htmlFor="loginEmail">Email</label>
      <input type="email" placeholder="Enter email address" required />
      <label htmlFor="loginPassword">Password</label>
      <input type="password" placeholder= "Enter password" required />
      <Link to="forgot-password">Forgot password?</Link>
      < input type="submit" className='submit' />
      <span> Don't Have An Account?
      <Link to="/sign-up" className="form-bottom-links">Sign the fuck up </Link>
       </span>
       </div>
    </form>
    </>
    )
  }

  export default LoginForm