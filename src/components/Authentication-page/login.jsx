import api from "../api/axios-instance";
import getRole from "./auth";
import { Link } from 'react-router-dom';
import './authentication-page.css'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye , faEyeSlash} from "@fortawesome/free-regular-svg-icons"
import { toast } from "react-toastify";
//import '../../index.jsx'



function LoginForm(){
  const navigate = useNavigate();
  const [showPassword , setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [loginCredentials , setLoginCredentials] = useState(
    {
      email: '' ,
      password: ''
    });

  const LoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try{
     console.log(loginCredentials);
     const response = await api.post('api/auth/login', loginCredentials);
     localStorage.setItem("userData", JSON.stringify(response.data.user));
     localStorage.setItem("authToken", response.data.token);
     localStorage.setItem("role", response.data.user.role);
     console.log(response.data);
     console.log('Hello', getRole());
     toast.success(response.data.message || 'Login successful');
     navigate("/portal/dashboard");
    }
    catch(error)
    {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Error logging in');
    }
    finally{
      setLoginCredentials({
      email: '' ,
      password: ''
    });
    setIsLoggingIn(false);
    }


}
    return(
      <>
      <div className="authentication-page-form-div">
        <form action="" onSubmit={LoginSubmit} id="loginForm" className="authentication-page-form">
        <h1>Smart City Platform</h1>
      <h2>Please enter your account details</h2>
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
      <div className='show-password-div'>
        <input
      type={showPassword ? 'text' : 'password'}
      id="loginPassword"
      value={loginCredentials.password}
      onChange={ (e) =>
        setLoginCredentials(prev => ({...prev , password: e.target.value}))
      }
      placeholder= "Enter password"
      minLength="8"
      maxLength="30"
      autoComplete="on"
      className="authentication-input" required/>
        <button type="button" className='show-password-button' onClick={()=> setShowPassword(prev =>!prev)}>
               <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}  />
              </button>
      </div>
      <Link to="/forgot-password" className='form-links'>Forgot password?</Link>
      <input type="submit" value={isLoggingIn? 'logging in...' : 'login'} className="authentication-input submit" />
       </div>
    </form>

      </div>
    </>
    )
  }

  function LoginPage(){
      return(
          <>
          <div className="authentication-page-form-div">
          <LoginForm />
          <div className='flex bg-blue-600 text-white font-medium px-30 w-100 m-60'>
            hi nigga

          </div>
          </div>
          </>
      );
    }

  export default LoginPage;