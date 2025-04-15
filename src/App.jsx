import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './components/landing-page/landing-page'
import LoginPage from './components/Authentication-page/login'
import SignUpPage from './components/Authentication-page/sign-up'
import ForgotPasswordPage from'./components/Authentication-page/forgot-password'
import HomePage from './components/homepage/homepage'
import ReportForm from './components/landing-page/report-form'

function App(){
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Report" element={<ReportForm />} />
          <Route path="/Login" element={<LoginPage />}/>
          <Route path="/Sign-up" element={<SignUpPage />}/>
          <Route path="/Forgot-password" element={<ForgotPasswordPage />}/>
          <Route path="/Home" element={<HomePage />} />

        </Routes>
      </Router>
    </>
  )
}

export default App;