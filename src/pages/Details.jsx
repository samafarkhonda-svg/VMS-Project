import "../App.css"
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"

function Details() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [event, setEvent] = useState(null)
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:8080/api/events/${id}`, {
          credentials: "include"
        })
        const data = await response.json()
        setEvent(data)
        setIsRegistered(data.isRegistered || false)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchEvent()
  }, [id])

  const toggleRegistration = async () => {
    try {
      const response = await fetch(
        isRegistered
          ? `http://localhost:8080/api/register/${id}`
          : "http://localhost:8080/api/register",
        {
          method: isRegistered ? "DELETE" : "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: isRegistered ? null : JSON.stringify({ eventId: Number(id) }),
        }
      )

      if (!response.ok) {
        throw new Error("Failed")
      }

      setIsRegistered(!isRegistered)
      setEvent((prev) => ({
        ...prev,
        isRegistered: !prev.isRegistered,
      }))
    } catch (err) {
      console.error(err)
      alert("Request failed")
    }
  }

  if (loading || !event) {
    return <h2>Loading...</h2>
  }

  return (
    <div className="details-page">
      <div className="details-content">
        <img
          src={event.image}
          alt={event.eventName}
          className="details-image"
        />

        <h1>{event.eventName}</h1>

        <p>
          <strong>Date:</strong>{" "}
          {event.eventDate}
        </p>

        <p>
          <strong>Time:</strong>{" "}
          {event.eventTime}
        </p>

        <p>
          <strong>Location:</strong>{" "}
          {event.location}
        </p>

        <p className="details-description">
          {event.description}
        </p>

        <button
          className={`details-btn ${
            isRegistered ? "registered-btn" : ""
          }`}
          onClick={toggleRegistration}
        >
          {isRegistered ? "Unregister" : "Register"}
        </button>
      </div>
    </div>
  )
}

export default Details
