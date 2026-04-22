<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sign Up - Volunteer Management System</title>
  <link rel="stylesheet" href="style.css" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
    rel="stylesheet"
  />
  <div className="header">
    <div className="header-center">
      <div className="header-icon">✿</div>
      <div className="header-title">Volunteer Management System</div>
    </div>
  </div>
  <div className="introduction">
    <p className="welcome">
      Welcome to the Volunteer management system portal! Please create an
      account so you can see all of our amazing events!
    </p>
  </div>
  <div className="center">
    <div className="signup-login-rectangle">
      <h1 className="call-to-action">Create an Account</h1>
      <form action="/signup" method="POST" />
      <div className="input-fields">
        <input
          className="signup-page-input"
          type="text"
          id="firstname"
          name="firstname"
          placeholder="First Name"
        />
        <input
          className="signup-page-input"
          type="text"
          id="lastname"
          name="lastname"
          placeholder="Last Name"
        />
        <input
          className="signup-page-input"
          type="text"
          id="username"
          name="username"
          placeholder="Username"
        />
        <input
          className="signup-page-input"
          type="email"
          id="email"
          name="email"
          placeholder="E-mail"
        />
        <input
          className="signup-page-input"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
      </div>
      <button
        type="submit"
        onclick="window.location.href='signup-confirmation.html'"
        className="sign-up"
      >
        Sign Up
      </button>
    </div>
  </div>
  <div className="footer">
    <span className="footer-title">✿ Volunteer Management System</span>
    <span>Thank you for visiting!</span>
  </div>
</>
