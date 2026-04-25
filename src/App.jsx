import './App.css'
import NavbarLogo from './components/navbarLogo'
import Footer from './components/footer'
import Events from "./pages/Events"
import Details from "./pages/Details"
import Profile from "./pages/Profile"
import Confirmation from "./pages/Confirmation"
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import { Routes, Route, useNavigate } from "react-router-dom"

// 🔹 Signup Page
function SignupPage() {
  const navigate = useNavigate()

  return (
    <>
      <div className="introduction">
        <p className="welcome">
          Welcome to the Volunteer management system portal! Please create an
          account so you can see all of our amazing events!
        </p>
      </div>

      <div className="center">
        <div className="signup-login-rectangle">
          <h1 className="call-to-action">Create an Account</h1>

          <div>
            <input className="signup-page-input" placeholder="First Name" />
            <input className="signup-page-input" placeholder="Last Name" />
            <input className="signup-page-input" placeholder="Username" />
            <input className="signup-page-input" placeholder="E-mail" />
            <input className="signup-page-input" placeholder="Password" />
          </div>

          <button
            type="button"
            className="sign-up"
            onClick={() => navigate("/events")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  )
}

// 🔹 MAIN APP
function App() {
  return (
    <div className="app-container">

      <NavbarLogo />

      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/details" element={<Details />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>

      <Footer />

    </div>
  )
}

export default App