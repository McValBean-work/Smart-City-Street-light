import { Link } from 'react-router-dom';
import './authentication-page.css'
import { useNavigate } from 'react-router-dom';

function LoginForm(){
  const navigate = useNavigate();
  const LoginToHome = (e) => {
    e.preventDefault();
    
    navigate ("/portal/Dashboard");
    {/*const emailName = document.getElementById("loginEmail").value;
    const loginPassword = document.getElementById("loginPassword").value;

    console.log({emailName},{loginPassword});*/}
}
    return(
      <>
      <div className='Authentication-page-form-div'>
      <h1 className="authentication-page-header">OmniStreet Lights</h1>
      <h2>Please enter your account details</h2>
      <form action="" onSubmit={LoginToHome} id="loginForm" className="authentication-page-form">
      <div className="form-data">
      <label htmlFor="loginEmail">Email</label>
      <input type="email" id="loginEmail" placeholder="Enter email address"  required/>
      <label htmlFor="loginPassword">Password</label>
      <input type="password" id="loginPassword" placeholder= "Enter password" minLength="8" maxLength="30" autoComplete="true" required/>
      <Link to="/portalForgot-password" className='form-links'>Forgot password?</Link>
      <input type="submit" value="login" className='submit' />
       </div>
    </form>
    </div>
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