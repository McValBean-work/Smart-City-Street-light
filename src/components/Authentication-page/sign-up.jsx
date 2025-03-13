import { Link } from "react-router-dom"
function SignUpForm(){
    return(
      <>
      <form id="SignUpForm" className="authentication-page-form">
      <h1 class="authentication-page-header">Welcome to Omni Street Lights</h1>
      <h2>Sign Up</h2>
      <div className="form-data">
      <label htmlFor="username">Username</label>
      <input type="text" placeholder= "Enter username" required/>
      <label htmlFor="signUpEmail">Email</label>
      <input type="email" placeholder="Enter email address" required/>
      <label htmlFor="first-password">Enter Password</label>
      <input type="password" placeholder="Enter password" required/>
      <label htmlFor="confirmPassword" >Confirm Password</label>
      <input type="password" placeholder="Confirm password" required/>
      <input type="submit" className="submit"/>
      <span className="form-bottom">Already Have An Account?<Link to="/Login" className="form-links">Login</Link></span>
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

  function SignUpPage(){
    return(
      <>
      <div className="authentication-page-grid">
      <div className="landing-page-form-div">
        <SignUpForm />
      </div>
      <AuthenticationHero />
      </div>
      </>
    );
  }

  export default SignUpPage;