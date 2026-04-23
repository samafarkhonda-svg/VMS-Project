import "../App.css"

function Details() {
  return (
    <div className="details-page">

      <div className="details-content">

        <img
          className="details-image"
          src="https://images.unsplash.com/photo-1542831371-d531d36971e6"
          alt="Food Drive"
        />

        <h1>Food Bank Volunteer Drive</h1>

        <p className="details-description">
          This organization helps people during disasters and emergencies.
        </p>

        <p>
          <strong>Location:</strong> Sacramento, CA
        </p>

        <div className="details-list">
          <strong>Available Opportunities:</strong>

          <ul>
            <li>Food Distribution</li>
            <li>Event Support</li>
            <li>Shelter Help</li>
          </ul>
        </div>

        <button className="details-btn">Register</button>

      </div>
    </div>
  )
}

export default Details