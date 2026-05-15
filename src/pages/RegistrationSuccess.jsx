import "../App.css"
import { useNavigate, useLocation } from "react-router-dom"

function RegistrationSuccess() {

  const navigate = useNavigate()
  const location = useLocation()

  const event = location.state?.event

  if (!event) {
    return <h2>No event information found.</h2>
  }

  return (

    <div className="confirmation-page">

      <div className="confirmation-card">

        <h1>
          Registration Successful!
        </h1>

        <p>
          You have successfully signed up for the event.
        </p>

        <hr />

        <h2>
          Event Details
        </h2>

        <div className="confirmation-details">

          <h3>
            {event.eventName}
          </h3>

          <p>
            <strong>Date:</strong>{" "}
            {event.eventDate}
          </p>

          <p>
            <strong>Time:</strong>{" "}
            {event.eventTime || "8:00 AM - 2:00 PM"}
          </p>

          <p>
            <strong>Location:</strong>{" "}
            {event.location}
          </p>

        </div>

        <div className="confirmation-message">
          The confirmation with event address has been sent to your email.
        </div>

        <button
          className="continue-btn"
          onClick={() => navigate("/events")}
        >
          Continue
        </button>

      </div>

    </div>
  )
}

export default RegistrationSuccess