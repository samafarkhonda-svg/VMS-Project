import { useNavigate } from "react-router-dom"
import { useState } from "react"
import "../App.css"

function Events() {
  const navigate = useNavigate()
  

  const events = [
  {
    id: "food",
    title: "Food Bank Volunteer Drive",
    date: "May 10, 2026",
    time: "8:00 AM – 2:00 PM",
    location: "Sacramento, CA",
    description:
      "Help us fight hunger in our community by lending a few hours of your time at the local food bank. Volunteers will sort and pack food donations, assist with distribution, and help ensure families in need receive essential supplies. This is a meaningful opportunity to make a direct and lasting impact on the lives of others.",
    image: "https://images.unsplash.com/photo-1542831371-d531d36971e6",
  },
  {
    id: "park",
    title: "Community Park Cleanup Day",
    date: "May 15, 2026",
    time: "9:00 AM – 1:00 PM",
    location: "Elk Grove Park",
    description:
      "Join us for a hands-on effort to restore and beautify our local parks. Volunteers will help collect litter, clear overgrown trails, and plant greenery across the grounds. Together, we can create cleaner, safer, and more enjoyable spaces for our community.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
  {
    id: "tutor",
    title: "After School Tutoring Program",
    date: "May 20, 2026",
    time: "3:00 PM – 6:00 PM",
    location: "Local School",
    description:
      "Make a lasting difference in a child's life by volunteering as a tutor in our after school program. Volunteers will work one-on-one or in small groups with students, helping them improve in subjects like math, reading, and science. No teaching experience is required,just patience, encouragement, and a willingness to help.",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350",
  },
]

  return (
    <div className="events-container">
      {events.map((event, index) => (
        <div key={index} className="event-row">

          {/* LEFT TEXT */}
          <div className="event-left">
            <h2>{event.title}</h2>
            <p>{event.description}</p>
          </div>

          {/* RIGHT SIDE */}
          <div className="event-right">
            <img src={event.image} alt="event" />

            <button
              className="event-btn"
              onClick={() => navigate(`/details/${event.id}`)}
            >
              Register
            </button>
          </div>

        </div>
      ))}
    </div>
  )
}

export default Events