import '../style.css'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"; 
import { checkAuth } from "../services/authService";

function Profile() {
  const navigate = useNavigate()
  const [registeredEvents, setRegisteredEvents] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [profileData, setProfileData] = useState({}); 
  
  useEffect(() => {
    const verifyLogin = async () => {
      const data = await checkAuth();
      if (!data.success) {
        navigate("/login");
      }
    };
    verifyLogin();
  }, [navigate]);

  const modifyProfile = async () => {
    navigate("/profile-modify")
  }

  // ✅ ADDED: Sign out handler
  const handleSignOut = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/logout", {
        method: "POST",
        credentials: "include"
      });
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  // Load profile from backend
  async function loadProfile() {
    try {
      const response = await fetch("http://localhost:8080/api/profile", {
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProfileData(data);

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

  // Load registered events from backend
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
          .map(event => `<div style="padding: 8px; margin: 3px 0;">• ${event.title || `Event ${event.id}`}</div>`)
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

  // ✅ FIXED: Use useEffect instead of window.addEventListener
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
                <input type="text" id="firstName" readOnly />  
              </div>
              <div className="field">  
                <label>Last Name</label>
                <input type="text" id="lastName" readOnly />
              </div>
            </div>

            <div className="field full">  
              <label>Email Address</label>
              <input type="text" id="email" readOnly /> 
            </div>

            <div className="row"> 
              <div className="field">  
                <label>Phone Number</label>
                <input type="text" id="phone" readOnly />  
              </div>
              <div className="field">  
                <label>Birth Date</label>
                <input type="text" id="birthDate" readOnly /> 
              </div>
            </div>
            <div className="field full">  
              <label>Address</label>
              <input type="text" id="address" readOnly />
            </div>
            <div className="row">  
              <div className="field">  
                <label>City</label>
                <input type="text" id="city" readOnly />
              </div>
              <div className="field">  
                <label>State</label>
                <input type="text" id="state" readOnly /> 
              </div>
              <div className="field">  
                <label>Zip Code</label>
                <input type="text" id="zip" readOnly />
              </div>
            </div>

            <div className="field full">  
              <label>Bio</label>
              <textarea id="bio" readOnly></textarea> 
            </div>

            <div className="field full">  
              <label>Registered Events</label>
              <div id="registeredEventsList" style={{padding: 12, borderRadius: 10, minHeight: 60, background: '#e6c68b'}}>
                <p id="noEventsMessage">No events registered yet.</p>
              </div>
            </div>

            <div className="submit-row">  
              <button className="save-btn" onClick={modifyProfile}>  
                Edit Profile
              </button>
            </div>
          </form>
        </div>
      </span>
    </div>
  )
}

export default Profile
