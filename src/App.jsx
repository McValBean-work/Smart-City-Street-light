import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginForm from './components/landing-page/login'
import SignUpForm from './components/landing-page/sign-up'
import ForgotPasswordForm from'./components/landing-page/forgot-password'

function App(){
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Routes>
      </Router>
    </>
  )
}

  function LandingPageHero(){
    return(
        <div className="landing-page-hero-div">
          <div className="landing-page-hero"></div>
        </div>
    );
  }

  function LandingPage(){
    return(
        <>
        <div className="landing-page-form-div">
        <LoginForm />
        </div>
        <LandingPageHero />
        </>
    );
  }

function SignUpPage(){
  return(
    <>
    <div className="landing-page-form-div">
      <SignUpForm />
    </div>
    <LandingPageHero />
    </>
  );
}

function ForgotPasswordPage(){
  return(
    <>
    <div className="landing-page-form-div">
      <ForgotPasswordForm />
    </div>
    <LandingPageHero />
    </>
  );
}

export default App;