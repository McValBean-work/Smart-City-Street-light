import './App.css'

function LoginForm(){
    return(
        <>
      <form id="loginForm" className="landing-page-form">
      <h1 class="landing-page-header">Omni Street Lights</h1>
      <h2>Please enter your account details</h2>
      <div className="form-data">
      <label htmlFor="loginEmail" >Email</label>
      <input type="email" placeholder= "Enter email address" required />
      <label htmlFor="loginPassword" >Password</label>
      <input type="password" placeholder="Enter password" required/>
      <a href="#forgotPasswordForm">Forgot password?</a>
      <input type="submit" className='submit' />
      <a href="#signUpForm" className='form-bottom-links'> Don't Have An Account?</a>
      </div>
    </form>
    </>
    )
  }

  function SignUpForm(){
    return(
      <>
      
      <form id="SignUpForm" className="landing-page-form">
      <h1 class="landing-page-header">Welcome to Omni Street Lights </h1>
      <h2>Sign Up</h2>
      <div className="form-data">
      <label htmlFor="username">Username</label>
      <input type="text" placeholder= "Enter username" required/>
      <label htmlFor="signUpEmail">Email</label>
      <input type="email" placeholder="Enter email address" required />
      <label htmlFor="">Enter Password</label>
      <input type="password" placeholder="Enter password" required />
      <label htmlFor="confirmPassword" >Confirm Password</label>
      <input type="password" placeholder="Confirm password" required/>
      <input type="submit" className='submit' />
      <a href="#loginForm" className='form-bottom-links'> Already Have An Account?</a>
      </div>
    </form>
    </>
    )

  }

  function ForgotPasswordForm(){
    return(
      <>
      <form id="forgotPasswordForm" className="landing-page-form">
      <h2>Retrieve Password</h2>
      <div className="form-data">
      <label htmlFor="recoveryEmail" >Email</label>
      <input type="email" placeholder="Enter email address" required />
      <label htmlFor="recoveryPassword">Recovery password</label>
      <input type="password" placeholder="Enter sent Password" required/>
      <label htmlFor="newPassword">New password</label>
      <input type="password" placeholder="Enter new password" required />
      <label htmlFor="confirmNewPassword">Confirm new password</label>
      <input type="password" placeholder="Confirm new password" required />
      <input type="submit" className='submit' />
      <a href="#loginForm" className='form-bottom-links'>Remember Password? </a>
      </div>
     </form>
    </>
    )

  }
  function LandingPageHero(){
    return(
        <div className='landing-page-hero' ></div>
    )
  }
  function LandingPage(){
    return(
        <>
        <div className="landing-page-form-div">
        <LoginForm />
        <SignUpForm />
        <ForgotPasswordForm />
        </div>

        <LandingPageHero />
        </>
    )}



export default LandingPage;