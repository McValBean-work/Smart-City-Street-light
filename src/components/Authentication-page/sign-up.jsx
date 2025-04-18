import { Link } from "react-router-dom"
import './authentication-page.css'

function SignUpSubmit(e){
  e.preventDefault()

  const firstPassword = document.getElementById("firstPassword").value
  const confirmPassword = document.getElementById("confirmPassword").value;

// const firstName = document.getElementById("firstName").value
// const lastName = document.getElementById("lastName").value
// const userName = document.getElementById("userName").value
// const signUpEmail = document.getElementById("signUpEmail").value

  if(firstPassword === confirmPassword){
    console.log("same password");
  }
  else{
  console.log("the two passwords are not the same");
  }
}

function SignUpForm(){
    return(
      <>
      <form id="SignUpForm" onSubmit={SignUpSubmit} className="authentication-page-form">
      <h1 className="authentication-page-header">Welcome to Omni Street Lights</h1>
      <h2>Sign Up</h2>
      <div className="form-data">
      <label htmlFor="role">Role:</label>
      <select name="role" className="authentication-input" required>
        <option value="Worker">Worker</option>
        <option value="Supervisor">Supervisor</option>
        <option value="Admin">Admin</option>
        <label htmlFor="worker"></label>
        <input type="radio" name="role" id="" />
        <label htmlFor="supervisor"></label>
        <input type="radio" name="role" id="" />
        <label htmlFor="admin"></label>
        <input type="radio" name="role" id="" />
      </select>
      <label htmlFor="firstName">First Name</label>
      <input type="text" placeholder="Enter first name" id="firstName" required />
      <label htmlFor="lastName">Last Name</label>
      <input type="text" placeholder="Enter last name" id="lastName" required/>
      <label htmlFor="username">Username</label>
      <input type="text" placeholder= "Enter username" id="userName" required/>
      <label htmlFor="signUpEmail">Email</label>
      <input type="email" placeholder= "Enter email address" id="signUpEmail" required/>
      <label htmlFor="firstPassword">Enter Password</label>
      <input type="password" placeholder="Enter password" id= "firstPassword" minLength="8" maxLength="30" required/>
      <label htmlFor="confirmPassword" >Confirm Password</label>
      <input type="password" placeholder="Confirm password" id="confirmPassword" minLength="8" maxLength="30" required/>
      <input type="submit" className="submit"/>
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