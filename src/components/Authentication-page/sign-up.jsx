import api from '../api/axios-instance'
import './authentication-page.css'
import { useNavigate } from "react-router-dom"
import { useState} from 'react'



// const firstName = document.getElementById("firstName").value
// const lastName = document.getElementById("lastName").value
// const userName = document.getElementById("userName").value
// const signUpEmail = document.getElementById("signUpEmail").value



function SignUpForm(){

const navigate = useNavigate();
const [showSignUpToast , setShowSignUpToast] = useState(false);
 const SignUpSubmit = (e)=> {
  e.preventDefault()
  api.post('/api/users' , {}).then()
  const firstPassword = document.getElementById("firstPassword").value
  const confirmPassword = document.getElementById("confirmPassword").value;
  setShowSignUpToast(true);

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
      <h2>Add New User</h2>
      <div className="form-data">
      <label htmlFor="role">Role:</label>
      <select name="role" className="authentication-input" required>
        <option value="Engineer">Engineer</option>
        <option value="Supervisor">Supervisor</option>
        <option value="Admin">Admin</option>
      </select>
      <label htmlFor="fullName">Full Name</label>
      <input type="text" placeholder="Enter full name" id="firstName" className="authentication-input" required />
      <label htmlFor="PhoneNumber">Phone Number</label>
      <input type="text" placeholder="+233" id="PhoneNumber" className="authentication-input" required/>
      <label htmlFor="signUpEmail">Email</label>
      <input type="email" placeholder= "Enter email address" id="signUpEmail" className="authentication-input" required/>
      <label htmlFor="firstPassword">Enter Password</label>
      <input type="password" placeholder="Enter password" id= "firstPassword" minLength="8" maxLength="30" className="authentication-input" required/>
      <label htmlFor="confirmPassword" >Confirm Password</label>
      <input type="password" placeholder="Confirm password" id="confirmPassword" minLength="8" maxLength="30" className="authentication-input" required/>
      <input type="submit" className="authentication-input submit"/>
      </div>
    </form>
    {showSignUpToast && (
      <>
      <span>Success, You created a new user</span>
      </>
    )}
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