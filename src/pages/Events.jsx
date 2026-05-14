import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { checkAuth } from "../services/authService";
import "../App.css"

const defaultEvents = [
  {
    id: "food",
    title: "Food Bank Volunteer Drive",
    date: "May 10, 2026",
    time: "8:00 AM – 2:00 PM",
    location: "Sacramento, CA",
    description:
      "Help us fight hunger in our community by lending a few hours of your time at the local food bank. Volunteers will sort and pack food donations, assist with distribution, and help ensure families in need receive essential supplies. This is a meaningful opportunity to make a direct and lasting impact on the lives of others.",
    image: "/food-drive-volunteer.png",
    isRegistered: false,
  },
  {
    id: "park",
    title: "Community Park Cleanup Day",
    date: "May 15, 2026",
    time: "9:00 AM – 1:00 PM",
    location: "Elk Grove Park",
    description:
      "Join us for a hands-on effort to restore and beautify our local parks. Volunteers will help collect litter, clear overgrown trails, and plant greenery across the grounds. Together, we can create cleaner, safer, and more enjoyable spaces for our community.",
    image: "/Community-park-cleanup.png",
    isRegistered: false,
  },
  {
    id: "tutor",
    title: "After School Tutoring Program",
    date: "May 20, 2026",
    time: "3:00 PM – 6:00 PM",
    location: "Local School",
    description:
      "Make a lasting difference in a child's life by volunteering as a tutor in our after school program. Volunteers will work one-on-one or in small groups with students, helping them improve in subjects like math, reading, and science. No teaching experience is required, just patience, encouragement, and a willingness to help.",
    image: "/After-school-tutoring.png",
    isRegistered: false,
  },
]

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
  }, [navigate])

  const fetchEvents = async () => {
    try {
      setLoading(true)

      const response = await fetch(
        "http://localhost:8080/api/events",
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

  const toggleRegistration = async (eventId, isRegistered) => {
    try {
      const response = await fetch(
        isRegistered
          ? `http://localhost:8080/api/register/${eventId}`
          : "http://localhost:8080/api/register",
        {
          method: isRegistered ? "DELETE" : "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },

          body: isRegistered
            ? null
            : JSON.stringify({ eventId }),
        }
      )

      if (!response.ok) {
        throw new Error("Registration update failed")
      }

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.eventId === eventId
            ? {
                ...event,
                isRegistered: !isRegistered,
              }
            : event
        )
      )
    } catch (err) {
      console.error(err)
      alert("Failed to update registration")
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
        <div key={event.eventId}className="event-row">
          <div className="event-left">
            <p>{event.description}</p>
          </div>

          <div className="event-right">
            <img src={event.image}alt={event.eventName}/>

            <button className={`event-btn ${event.isRegistered? "registered-btn": ""}`}onClick={() =>toggleRegistration(event.eventId,event.isRegistered)}>
              {event.isRegistered ? "Unregister": "Register"}
            </button>

            <button className="details-btn"onClick={() =>navigate(`/details/${event.eventId}`)}>
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Events
