import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <h2>Event App</h2>
            <div>
                <Link to="/">Home</Link>
                <Link to="/events">Events</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
            </div>
        </nav>
    );
}
export default Navbar;