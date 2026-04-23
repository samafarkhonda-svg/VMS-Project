function Dashboard() {
  return (
    <div>
      <nav>
        <span> ✿ Volunteer Management System</span>
        <button>   Log Out</button>
      </nav>

      <main>
         
        <h1>Volunteer Management System</h1>
        <p>Welcome!</p>

        <img src="/home.png" alt="Volunteer main" />

        <p>
          Our Volunteer Management System is designed to simplify the way
          organizations connect with passionate individuals who want to make a
          difference.
        </p>

        <section>
          <h2>Discover New Opportunities</h2>
          <p>
            If you're a student, you can create an account and sign up for most
            volunteering events.
          </p>

          <button>View Open Events</button>
          <button>My Account</button>
        </section>

        <img src="/volunteer.png" alt="Volunteers working together" />
      </main>
    </div>
  );
}

export default Dashboard;