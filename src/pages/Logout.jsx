import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";
import "../App.css";

export default function Logout() {
  const navigate = useNavigate();

  const handleGoToLogin = async () => {
    try {
      await logoutUser(); // call backend
      navigate("/login");
    } catch (error) {
      console.error("Logout failed");
    }
  };

  return (
    <div className="logout-page">
      {/* Header */}
      

      {/* Main Content */}
      <main className="logout-container">
        <h2>Log out Confirmation</h2>
        <p>You have been successfully logged out.</p>
        <button className="got-it-btn" onClick={handleGoToLogin}>
          Got It
        </button>
      </main>

      {/* Footer */}
      
    </div>
  );
}