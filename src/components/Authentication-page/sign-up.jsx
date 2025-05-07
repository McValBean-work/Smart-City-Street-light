import { Link } from "react-router-dom"
import './authentication-page.css'
import { useNavigate } from "react-router-dom"



// const firstName = document.getElementById("firstName").value
// const lastName = document.getElementById("lastName").value
// const userName = document.getElementById("userName").value
// const signUpEmail = document.getElementById("signUpEmail").value



function SignUpForm(){

const navigate = useNavigate();
 const SignUpSubmit = (e)=> {
  e.preventDefault()
  const firstPassword = document.getElementById("firstPassword").value
  const confirmPassword = document.getElementById("confirmPassword").value;

  if(firstPassword === confirmPassword){
    console.log("same password");
    navigate(-1);
  }
  else{
 alert("the two passwords are not the same");
  }
 }
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
      </select>
      <label htmlFor="firstName">First Name</label>
      <input type="text" placeholder="Enter first name" id="firstName" className="authentication-input" required />
      <label htmlFor="lastName">Last Name</label>
      <input type="text" placeholder="Enter last name" id="lastName" className="authentication-input" required/>
      <label htmlFor="username">Username</label>
      <input type="text" placeholder= "Enter username" id="userName" className="authentication-input" required/>
      <label htmlFor="signUpEmail">Email</label>
      <input type="email" placeholder= "Enter email address" id="signUpEmail" className="authentication-input" required/>
      <label htmlFor="firstPassword">Enter Password</label>
      <input type="password" placeholder="Enter password" id= "firstPassword" minLength="8" maxLength="30" className="authentication-input" required/>
      <label htmlFor="confirmPassword" >Confirm Password</label>
      <input type="password" placeholder="Confirm password" id="confirmPassword" minLength="8" maxLength="30" className="authentication-input" required/>
      <input type="submit" className="authentication-input submit"/>
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