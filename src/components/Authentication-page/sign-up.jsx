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
const [newUser , setNewUser] = useState({
  fullName: null,
  email: null ,
  phoneNumber: null,
  role: null,
  password: null
});
const handleChange = (e)=>{
  const {name , value} = e.target;

    setNewUser(prev =>({...prev, [name]: value}))

}
 const SignUpSubmit = (e)=> {
  e.preventDefault()
  console.log(newUser);
  const firstPassword = document.getElementById("firstPassword").value
  const confirmPassword = document.getElementById("confirmPassword").value;


  if(firstPassword === confirmPassword){
    console.log("same password");
    api.post('/api/users' , newUser)
    setShowSignUpToast(true);
   setTimeout(navigate(-1), 5000) ;
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
      <select name="role"
      value={newUser.role}
      onChange={(e) =>
        setNewUser(prev =>({...prev, role: e.target.value}))
      }
      className="authentication-input" required>
        <option value=""></option>
        <option value="Engineer">Engineer</option>
        <option value="Supervisor">Supervisor</option>
        <option value="Admin">Admin</option>
      </select>
      <label htmlFor="fullName">Full Name</label>
      <input type="text"
      name="fullName"
      value={newUser.fullName}
      onChange={handleChange}
      placeholder="Enter full name"
      id="firstName"
      className="authentication-input" required />
      <label htmlFor="PhoneNumber">Phone Number</label>
      <input type="text"
      name='phoneNumber'
      value={newUser.phoneNumber}
      onChange={handleChange}
      placeholder="+233"
      id="PhoneNumber"
       className="authentication-input" required/>
      <label htmlFor="signUpEmail">Email</label>
      <input type="email"
      name='email'
      value={newUser.email}
      onChange={handleChange}
      placeholder= "Enter email address"
      id="signUpEmail"
      className="authentication-input" required/>
      <label htmlFor="firstPassword">Enter Password</label>
      <input type="password"
      name='password'
      value={newUser.password}
      onChange={handleChange}
      placeholder="Enter password"
      id= "firstPassword"
      minLength="8"
      maxLength="30"
      className="authentication-input" required/>
      <label htmlFor="confirmPassword" >Confirm Password</label>
      <input type="password"
      name='password'
      value={newUser.password}
      onChange={handleChange}
      placeholder="Confirm password"
      id="confirmPassword"
      minLength="8"
      maxLength="30"
      className="authentication-input" required/>
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