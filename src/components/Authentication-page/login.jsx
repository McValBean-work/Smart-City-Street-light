import { Link } from 'react-router-dom';
function LoginForm(){
    return(
      <>
      <form id="loginForm" className="authentication-page-form">
      <h1 class="authentication-page-header">OmniStreet Lights</h1>
      <h2>Please enter your account details</h2>
      <div className="form-data">
      <label htmlFor="loginEmail">Email</label>
      <input type="email" placeholder="Enter email address" required />
      <label htmlFor="loginPassword">Password</label>
      <input type="password" placeholder= "Enter password" required />
      <Link to="/Forgot-password" className='form-links'>Forgot password?</Link>
      < input type="submit" className='submit' />
      <span className="form-bottom"> Don't Have An Account?
      <Link to="/Sign-up" className="form-links">Sign up </Link>
       </span>
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

  function LoginPage(){
      return(
          <>
          <div className="authentication-page-grid">
          <div className="landing-page-form-div">
          <LoginForm />
          </div>
          <AuthenticationHero />
          </div>
          </>
      );
    }

  export default LoginPage;