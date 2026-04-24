import './App.css'
import NavbarLogo from './components/navbarLogo'
import Footer from './components/footer'

function App() {
  return (
    <div className="page">
      <NavbarLogo />

      <div className="introduction">
        <p className="welcome">
          Welcome to the Volunteer management system portal! Please create an
          account so you can see all of our amazing events!
        </p>
      </div>

      <div className="center">
        <div className="signup-login-rectangle">
          <h1 className="call-to-action">Create an Account</h1>
          <form className="input-fields" action="/signup" method="POST">
            <div>
              <input className="signup-page-input" type="text" id="firstname" name="firstname" placeholder="First Name" />
              <input className="signup-page-input" type="text" id="lastname" name="lastname" placeholder="Last Name" />
              <input className="signup-page-input" type="text" id="username" name="username" placeholder="Username" />
              <input className="signup-page-input" type="email" id="email" name="email" placeholder="E-mail" />
              <input className="signup-page-input" type="password" id="password" name="password" placeholder="Password" />
            </div>
            <button type="submit" className="sign-up" onClick={() => window.location.href = '/signup-confirmation'}>
              Sign Up
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default App