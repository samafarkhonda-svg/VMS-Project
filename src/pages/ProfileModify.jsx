import '../style.css'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { checkAuth } from "../services/authService";

function ProfileModify() {
  const navigate = useNavigate()
  
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyLogin = async () => {
      const data = await checkAuth();
      if (!data.success) {
        navigate("/login");
      }
    };
    verifyLogin();
  }, [navigate]);

  async function loadProfile() {
    try {
      const response = await fetch("http://localhost:8080/api/profile", {
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      document.getElementById("firstName").value = data.firstName || "";
      document.getElementById("lastName").value = data.lastName || "";
      document.getElementById("email").value = data.email || "";
      document.getElementById("phone").value = data.phone || "";
      document.getElementById("birthDate").value = data.birthDate || "";
      document.getElementById("address").value = data.address || "";
      document.getElementById("city").value = data.city || "";
      document.getElementById("state").value = data.state || "";
      document.getElementById("zip").value = data.zip || "";
      document.getElementById("bio").value = data.bio || "";

      if (data.imageUrl) {
        document.getElementById("profileImage").src = data.imageUrl;
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      alert("Failed to load profile. Please try again.");
    }
  }

  async function saveProfile() {
    const profile = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      birthDate: document.getElementById("birthDate").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      zip: document.getElementById("zip").value,
      bio: document.getElementById("bio").value
    };

    try {
      const response = await fetch("http://localhost:8080/api/profile", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert("Profile saved successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again.");
    }
  }

  async function loadRegisteredEvents() {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/events/registered", {
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const eventIds = data.eventIds || [];

      if (eventIds.length > 0) {
        const eventsList = document.getElementById("registeredEventsList");
        const noEventsMessage = document.getElementById("noEventsMessage");

        const eventDetailsPromises = eventIds.map(eventId =>
          fetch(`http://localhost:8080/api/events/${eventId}`, {
            credentials: "include"
          })
            .then(res => res.json())
            .catch(err => {
              console.error(`Error fetching event ${eventId}:`, err);
              return { id: eventId, title: `Event ${eventId}` };
            })
        );

        const eventDetails = await Promise.all(eventDetailsPromises);

        const eventsHTML = eventDetails
          .map(event => `<div style="padding: 8px; margin: 5px 0; background-color: #fff; border-left: 4px solid #ff9800; border-radius: 3px;">• ${event.title || `Event ${event.id}`}</div>`)
          .join("");

        if (noEventsMessage) noEventsMessage.style.display = "none";
        if (eventsList) eventsList.innerHTML = eventsHTML || "<p>No events found.</p>";
      } else {
        setRegisteredEvents([]);
      }
    } catch (error) {
      console.error("Error loading registered events:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
    loadRegisteredEvents();
  }, []);

  return (
    <div>
      <span className="account-management-wrapper">
        <div className="sidebar">  
          <div className="top-bar"> 
            <button className="back-btn" onClick={() => navigate(-1)}>←</button>  
            <span className="signout" onClick={handleSignOut}>sign out</span>  
          </div>
          <h2>Profile Photo</h2>
          <div className="photo-box"> 
            <img id="profileImage" src="images/profile.png" alt="Profile" />
          </div>
        </div>
        <div className="form-area">  
          <form>
            <div className="row">  
              <div className="field">  
                <label>First Name</label>
                <input type="text" id="firstName" /> 
              </div>
              <div className="field">  
                <label>Last Name</label>
                <input type="text" id="lastName" /> 
              </div>
            </div>

            <div className="field full">  
              <label>Email Address</label>
              <input type="email" id="email" />  
            </div>

            <div className="row">  
              <div className="field">  
                <label>Phone Number</label>
                <input type="tel" id="phone" />  
              </div>
              <div className="field">  
                <label>Birth Date</label>
                <input type="date" id="birthDate" />  
              </div>
            </div>
            <div className="field full"> 
              <label>Address</label>
              <input type="text" id="address" />  
            </div>
            <div className="row">  
              <div className="field">  
                <label>City</label>
                <input type="text" id="city" />  
              </div>
              <div className="field"> 
                <label>State</label>
                <input type="text" id="state" />  
              </div>
              <div className="field">  
                <label>Zip Code</label>
                <input type="text" id="zip" />  
              </div>
            </div>

            <div className="field full">  
              <label>Bio</label>
              <textarea id="bio" rows="3"></textarea>  
            </div>

            <div className="field full">  
              <label>Registered Events</label>
              <div id="registeredEventsList" style={{padding: 12, borderRadius: 10, minHeight: 60, background: '#e6c68b'}}>
                <p id="noEventsMessage">No events registered yet.</p>
              </div>
            </div>

            <div className="submit-row"> 
              <button type="button" className="save-btn" onClick={saveProfile}> 
                Save changes
              </button>
            </div>
          </form>
        </div>
      </span>
    </div>
  )
}

export default ProfileModify
