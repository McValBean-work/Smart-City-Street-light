import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './components/landing-page/home-page'
import LandingPage from './components/landing-page/landing-page'
import AboutPage from './components/about/about-page'
import ContactUsPage from './components/landing-page/contact-us-page'
import LoginPage from './components/Authentication-page/login'
import SignUpPage from './components/Authentication-page/sign-up'
import ForgotPasswordPage from'./components/Authentication-page/forgot-password'
import DashboardPage from './components/dashboard/dashboard'
import ReportForm from './components/landing-page/report-form'

function App(){
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/About" element={<AboutPage />}/>
          <Route path="/Contact-Us" element={<ContactUsPage />}/>
          <Route path="/Report" element={<ReportForm />} />
          <Route path="/Login" element={<LoginPage />}/>
          <Route path="/Sign-Up" element={<SignUpPage />}/>
          <Route path="/Forgot-password" element={<ForgotPasswordPage />}/>
          <Route path="/portal/dashboard" element={<DashboardPage />} />

        </Routes>
      </Router>
    </>
  )
}

export default App;