import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './components/landing-page/landing-page'
import AboutPage from './components/about/about-page'
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
          <Route path="/" element={<LandingPage />} />
          <Route path="About" element={<AboutPage />}/>
          <Route path="/portalLogin" element={<LoginPage />}/>
          <Route path="/portalSign-up" element={<SignUpPage />}/>
          <Route path="/portalForgot-password" element={<ForgotPasswordPage />}/>
          <Route path="/Report" element={<ReportForm />} />
          <Route path="/portal/Dashboard" element={<DashboardPage />} />

        </Routes>
      </Router>
    </>
  )
}

export default App;