import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserName(user.name || user.fullName || user.username || "User");
      } catch (error) {
        console.log("Could not load user data");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/logout");
  };

  return (
    <div className="dash-page">
      <header className="dash-topbar">
        <div
          className="dash-topbar-brand"
          onClick={() => navigate("/dashboard")}
        >
          <span className="dash-topbar-icon">✿</span>
          <span className="dash-topbar-brand-text">
            Volunteer Management System
          </span>
        </div>

        <nav className="dash-topbar-nav">
          <button
            type="button"
            className="dash-topbar-link"
            onClick={() => navigate("/about")}
          >
            About
          </button>

          <button
            type="button"
            className="dash-topbar-link"
            onClick={() => navigate("/events")}
          >
            Events
          </button>

          <button
            type="button"
            className="dash-topbar-link"
            onClick={() => navigate("/partnerships")}
          >
            Partnerships
          </button>
        </nav>

        <div className="dash-topbar-right">
          <button
            type="button"
            className="dash-topbar-user"
            onClick={() => navigate("/account")}
          >
            {userName}
          </button>

          <button
            type="button"
            className="dash-topbar-logout"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </header>

      <main className="dash-main">
        <h1 className="dash-title">Volunteer Management System</h1>
        <p className="dash-welcome">Welcome!</p>

        <img
          src="/home.png"
          alt="Volunteer main"
          className="dash-hero-img"
        />

        <p className="dash-description">
          Our Volunteer Management System is designed to simplify the way
          organizations connect with passionate individuals who want to make a
          difference. Through an intuitive and user-friendly platform,
          volunteers can easily discover opportunities, sign up for events, and
          track their contributions, while coordinators can efficiently manage
          schedules, communicate with teams, and monitor impact in real time.
          Whether you're organizing a community cleanup, coordinating a
          fundraising event, or looking to give back, our system brings
          everything together in one place - making volunteering more
          accessible, organized, and impactful for everyone involved!
        </p>

        <section className="dash-opportunities">
          <div className="dash-op-text">
            <h2 className="dash-op-title">Discover New Opportunities</h2>
            <p className="dash-op-description">
              If you're a student, you can create an account and sign up for
              most volunteering events.
            </p>

            <div className="dash-btn-group">
              <button
                type="button"
                className="dash-action-btn"
                onClick={() => navigate("/events")}
              >
                View Open Events
              </button>

              <button
                type="button"
                className="dash-action-btn"
                onClick={() => navigate("/account")}
              >
                My Account
              </button>
            </div>
          </div>

          <div className="dash-op-img-wrap">
            <img
              src="/volunteer.png"
              alt="Volunteers working together"
              className="dash-op-img"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;