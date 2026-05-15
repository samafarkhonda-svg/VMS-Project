import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { checkAuth } from "../services/authService"
import "../App.css"

function Events() {

  const navigate = useNavigate()

  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {

  const verifyLogin = async () => {

    const data = await checkAuth()

    if (!data.success) {
      navigate("/login")
      return
    }

    fetchEvents()
  }

  verifyLogin()

  window.addEventListener("focus", fetchEvents)

  return () => {
    window.removeEventListener("focus", fetchEvents)
  }

}, [navigate])

  const fetchEvents = async () => {

    try {

      setLoading(true)

      const response = await fetch(
        "http://https://vms-backend-production.up.railway.app/api/events",
        {
          credentials: "include",
        }
      )

      if (!response.ok) {
        throw new Error("Failed to fetch events")
      }

      const data = await response.json()

      setEvents(data)
      setError(null)

    } catch (err) {

      console.error(err)
      setError("Failed to load events")

    } finally {

      setLoading(false)

    }
  }

  if (loading) {

    return (
      <div className="events-container">
        <p>Loading events...</p>
      </div>
    )
  }

  return (

    <div className="events-container">

      {error && (
        <p style={{ color: "orange" }}>
          {error}
        </p>
      )}

      {events.map((event) => (

        <div
          key={event.eventId}
          className="event-row"
        >

          <div className="event-left">

            <h2>{event.eventName}</h2>

            <p className="event-description">
              {event.description}
            </p>

          </div>

          <div className="event-right">

            <img
              src={event.image}
              alt={event.eventName}
            />

            <button
              className={`event-btn ${
                event.isRegistered
                  ? "registered-btn"
                  : ""
              }`}
              onClick={() =>
                navigate(`/details/${event.eventId}`)
              }
            >
              {event.isRegistered
                ? "Registered"
                : "Register"}
            </button>

          </div>

        </div>

      ))}

    </div>
  )
}

export default Events