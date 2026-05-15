import Navbar from './components/navbar'
import Footer from './components/footer'
import Events from "./pages/Events"
import Details from "./pages/Details"
import Profile from "./pages/Profile"
import ProfileModify from "./pages/ProfileModify"
import Confirmation from "./pages/Confirmation"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Logout from "./pages/Logout"
import ForgotPassword from "./pages/ForgotPassword"
import ForgotPasswordSent from "./pages/ForgotPasswordSent"
import ForgotPasswordEntry from "./pages/ForgotPasswordEntry"
import ForgotPasswordConfirm from "./pages/ForgotPasswordConfirm"
import LoginConfirmation from "./pages/LoginConfirmation"
import Partnership from "./pages/Partnership";
import About from './pages/About'
import { Routes, Route, useNavigate } from "react-router-dom"
import { useState } from "react"
import { signupUser } from "./services/authService"
import RegistrationSuccess from "./pages/RegistrationSuccess"
import './App.css'

// Signup Page
function SignupPage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => { //makes sure the user can't enter random inputs
    //checks if all fields are filled
    if (!formData.firstName || !formData.lastName || !formData.username || !formData.email || !formData.password) {
      alert("Please fill in all fields.")
      return
    }
  
    //first name and last name: letters only
    const nameRegex = /^[a-zA-Z]+$/
    if (!nameRegex.test(formData.firstName) || !nameRegex.test(formData.lastName)) {
      alert("First and last name can only contain letters.")
      return
    }
  
    //username: 5 to 25 characters, letters/numbers/underscores only, no spaces
    const usernameRegex = /^[a-zA-Z0-9_]{5,25}$/
    if (!usernameRegex.test(formData.username)) {
      alert("Username must be 3-25 characters and can only contain letters, numbers, and underscores. No spaces.")
      return
    }
  
    //common email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.")
      return
    }
  
    //password: at least 8 characters
    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters.")
      return
    }
  
    //password:at least one uppercase letter
    if (!/[A-Z]/.test(formData.password)) {
      alert("Password must contain at least one uppercase letter.")
      return
    }
  
    //password: at least one number
    if (!/[0-9]/.test(formData.password)) {
      alert("Password must contain at least one number.")
      return
    }
  
    //password: at least one symbol
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password)) {
      alert("Password must contain at least one symbol.")
      return
    }
  
    //stores new user's info in data variable
    setLoading(true)
    const data = await signupUser(formData)
    setLoading(false)
  
    if (data.success) {
      navigate("/confirmation", { state: { email: formData.email } })
    } else {
      alert(data.message || "Signup failed.")
    }
  }

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
            <input className="signup-page-input" placeholder="First Name" name="firstName" onChange={handleChange} />
            <input className="signup-page-input" placeholder="Last Name" name="lastName" onChange={handleChange} />
            <input className="signup-page-input" placeholder="Username" name="username" onChange={handleChange} />
            <input className="signup-page-input" placeholder="E-mail" name="email" onChange={handleChange} />
            
            <div className="password-wrapper">
              <input
                className="signup-page-input"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "◉" : "◎"}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="sign-up"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Processing..." : "Sign Up"}
          </button>

          <p className="already-have-account">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </div>
    </>
  )
}

function App() {
  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-modify" element={<ProfileModify />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/login-confirmation" element={<LoginConfirmation />} />
          <Route path="/registration-success" element={<RegistrationSuccess />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/forgot-password-sent" element={<ForgotPasswordSent />} />
          <Route path="/forgot-password-entry" element={<ForgotPasswordEntry />} />
          <Route path="/forgot-password-confirm" element={<ForgotPasswordConfirm />} />
          <Route path="/partnerships" element={<Partnership />} />
          <Route path="/about" element={<About/>} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App  
