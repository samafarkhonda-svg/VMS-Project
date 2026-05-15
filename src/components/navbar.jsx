import { useLocation } from "react-router-dom";

function Navbar() {
    let location = useLocation();
    
    const storedUser = localStorage.getItem("user")
    const user = storedUser ? JSON.parse(storedUser) : null
    const loggedIn = user !== null

    if (location.pathname == "/dashboard" || location.pathname == "/partnerships" || location.pathname == "/about" || location.pathname == "/events" || location.pathname == "/details/1" || location.pathname == "/details/2" || location.pathname == "/details/3" || location.pathname == "/details/4" || location.pathname == "/event-registration-confirmation") {
        if (loggedIn) {
            return (
                <nav>
                    <div className="navbar">
                        <div className="leftalign">
                            <div className="navlogo">✿</div>
                            <div className="navlinks"><a href="/dashboard">Volunteer Management System</a></div>
                            <div className="navlinks"><a href="/about">About</a></div>
                            <div className="navlinks"><a href="/events">Events</a></div>
                            <div className="navlinks"><a href="/partnerships">Partnerships</a></div>
                        </div>
                        <div className="rightalign">
                            <div className="navlinksusername"><a href="/profile">{user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase() + " " + user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1).toLowerCase()}</a></div>
                            <a href="/logout"><div className="navbutton">Log Out</div></a>
                        </div>
                    </div>
                </nav>
            );
        } else {
            return (
                <nav>
                    <div className="navbar">
                        <div className="leftalign">
                            <div className="navlogo">✿</div>
                            <div className="navlinks"><a href="/dashboard">Volunteer Management System</a></div>
                            <div className="navlinks"><a href="/about">About</a></div>
                            <div className="navlinks"><a href="/events">Events</a></div>
                            <div className="navlinks"><a href="/partnerships">Partnerships</a></div>
                        </div>
                        <div className="rightalign">
                            <div className="navlinksusername"><a href="/login">Log In</a></div>
                            <a href="/"><div className="navbutton">Sign Up</div></a>
                        </div>
                    </div>
                </nav>
            );
        }
    } else if (location.pathname == "/profile" || location.pathname == "/profile-modify") {
        return null;
    } else {
        return (
            <div className="header">
                <div className="header-center">
                    <div className="header-icon">✿</div>
                    <div className="header-title">Volunteer Management System</div>
                </div>
            </div>
        );
    }
}
export default Navbar