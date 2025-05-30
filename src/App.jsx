import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import './App.css'
import getRole from './components/Authentication-page/auth'
import HomePage from './components/landing-page/home-page'
import LandingPage from './components/landing-page/landing-page'
import AboutPage from './components/about/about-page'
import ContactUsPage from './components/landing-page/contact-us-page'
import LoginPage from './components/Authentication-page/login'
import SignUpPage from './components/Authentication-page/sign-up'
import ForgotPasswordPage from'./components/Authentication-page/forgot-password'
import PropertiesPage from './components/dashboard/properties-page'
import ReportForm from './components/landing-page/report-form'
import AdminDashboard from './components/Roles/admin/admin-dashboard'
import SupervisorDashboard from './components/Roles/supervisor/supervisor-dashboard'
import EngineerDashboard from './components/Roles/engineer/engineer-dashboard'
import TasksPage from './components/Roles/tasks'
import ReportsPage from './components/Roles/reports'

function App(){
   const role = getRole();
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/landing page" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />}/>
          <Route path="/contact-Us" element={<ContactUsPage />}/>
          <Route path="/report" element={<ReportForm />} />
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/sign-Up" element={<SignUpPage />}/>
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/portal/dashboard" element={
          role === "admin"
           ? <AdminDashboard />
          :role === "supervisor"
           ? <SupervisorDashboard />
          :role === "engineer"
          ? <EngineerDashboard />
          : <Navigate to="/login" /> } />
          <Route path="/portal/properties" element={<PropertiesPage />} />
          <Route path="/portal/tasks" element={<TasksPage />} />
          <Route path="/portal/reports" element={<ReportsPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;