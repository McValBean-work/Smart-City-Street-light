import { Link } from 'react-router-dom';
function LoginToHome(){
    const emailName = document.getElementById("loginEmail").value;
    const loginPassword = document.getElementById("loginPassword").value;

    console.log({emailName},{loginPassword});


}
function LoginForm(){
    return(
      <>
      <form action={LoginToHome} id="loginForm" className="authentication-page-form">
      <h1 class="authentication-page-header">OmniStreet Lights</h1>
      <h2>Please enter your account details</h2>
      <div className="form-data">
      <label htmlFor="loginEmail">Email</label>
      <input type="email" id="loginEmail" placeholder="Enter email address" required />
      <label htmlFor="loginPassword">Password</label>
      <input type="password" id="loginPassword" placeholder= "Enter password" required minLength="8" maxLength="30" autoComplete="true"/>
      <Link to="/Forgot-password" className='form-links'>Forgot password?</Link>
      < input type="submit" className='submit' />
      <span className="form-bottom">Don't Have An Account?
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