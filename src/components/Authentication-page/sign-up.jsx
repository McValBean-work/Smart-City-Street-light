import { Link } from "react-router-dom"

function FormSubmit() {
  
}

function SignUpForm(){
    return(
      <>
      <form id="SignUpForm" className="authentication-page-form">
      <h1 class="authentication-page-header">Welcome to Omni Street Lights</h1>
      <h2>Sign Up</h2>
      <div className="form-data">
      <label htmlFor="firstName">First Name</label>
      <input type="text" placeholder="Enter first name" id="firstName" required />
      <label htmlFor="lastName">Last Name</label>
      <input type="text" placeholder="Enter last name" id="lastName" />
      <label htmlFor="username">Username</label>
      <input type="text" placeholder= "Enter username" id="Username" required/>
      <label htmlFor="signUpEmail">Email</label>
      <input type="email" placeholder= "Enter email address" id="signUpEmail" required/>
      <label htmlFor="firstPassword">Enter Password</label>
      <input type="password" placeholder="Enter password" id= "firstPassword" required/>
      <label htmlFor="confirmPassword" >Confirm Password</label>
      <input type="password" placeholder="Confirm password" id="confirmPassword" required/>
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