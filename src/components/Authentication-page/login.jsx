import api from "../api/axios-instance";
import { Link } from 'react-router-dom';
import './authentication-page.css'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";



function LoginForm(){
  const navigate = useNavigate();
  const [loginCredentials , setLoginCredentials] = useState(
    {
      email: null ,
      password: null
    });

  const LoginSubmit = async (e) => {
    e.preventDefault();
    try{
      console.log(loginCredentials);
     const response = await api.post('api/auth/login', loginCredentials)
     localStorage.setItem("authToken", response.data.token)
     console.log(response.data.token);
     console.log(response.data);
     console.log('Hello', response.role);
      navigate ("/portal/dashboard")
    }
    catch(error)
    {
      console.log(error);
    }


}
    return(
      <>
      <div className='Authentication-page-form-div'>
      <h1 className="authentication-page-header">OmniStreet Lights</h1>
      <h2>Please enter your account details</h2>
      <form action="" onSubmit={LoginSubmit} id="loginForm" className="authentication-page-form">
      <div className="form-data">
      <label htmlFor="loginEmail">Email</label>
      <input type="email" 
      id="loginEmail"
      value={loginCredentials.email}
      onChange={ (e) =>
        setLoginCredentials(prev => ({...prev , email: e.target.value}))
      }
      placeholder="Enter email address"
      className="authentication-input"  required/>
      <label htmlFor="loginPassword">Password</label>
      <input
      type="password"
      id="loginPassword"
      value={loginCredentials.password}
      onChange={ (e) =>
        setLoginCredentials(prev => ({...prev , password: e.target.value}))
      }
      placeholder= "Enter password"
      minLength="8"
      maxLength="30"
      autoComplete="true"
      className="authentication-input" required/>
      <Link to="/portalForgot-password" className='form-links'>Forgot password?</Link>
      <input type="submit" value="login" className="authentication-input submit" />
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