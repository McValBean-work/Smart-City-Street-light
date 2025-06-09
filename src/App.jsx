import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import {useEffect , useState} from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import getRole from './components/Authentication-page/auth'
import ProtectedRoute from './components/Roles/protected-routes';
import UnauthorizedPage from './components/Roles/unauthorized';
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

  const [role, setRole] = useState(null);

  // Get role on initial mount (e.g., refresh)
  useEffect(() => {
    const storedRole = getRole();
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  // Update role after login
  const handleLogin = () => {
    const updatedRole = getRole();
    setRole(updatedRole);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/landing page" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />}/>
          <Route path="/contact-Us" element={<ContactUsPage />}/>
          <Route path="/report" element={<ReportForm />} />
          <Route path="/login" element={<LoginPage onLogin ={handleLogin} />}/>
          <Route path="/sign-up" element={
            <ProtectedRoute allowedUsers={["admin"]} >
              <SignUpPage />
            </ProtectedRoute>
            } />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/portal/dashboard" element={
          role === "admin"
           ? <AdminDashboard />
          :role === "supervisor"
           ? <SupervisorDashboard />
          :role === "engineer"
          ? <EngineerDashboard />
          : <Navigate to="/login" /> } />
          <Route path="/portal/properties" element={
            <ProtectedRoute allowedUsers={["admin" ,"supervisor", "engineer"]} >
              <PropertiesPage />
            </ProtectedRoute>
            } />
          <Route path="/portal/tasks" element={
          <ProtectedRoute allowedUsers={["admin" ,"supervisor", "engineer"]} >
              <TasksPage />
          </ProtectedRoute>
            } />
          <Route path="/portal/reports" element={
            <ProtectedRoute allowedUsers={["admin" ,"supervisor"]} >
              <ReportsPage />
            </ProtectedRoute>
            } />

        </Routes>
      </Router>
      <ToastContainer
      position="top-right"
      autoClose={5000}
      style={{zIndex:10000}}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      toastStyle={{
        fontSize: '16px',
        padding: '16px',
        borderRadius: '8px'
      }}
      />
    </>
  )
}

export default App;