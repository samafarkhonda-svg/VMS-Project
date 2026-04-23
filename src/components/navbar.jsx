function Navbar() {
    const loggedIn = false;
    if (loggedIn) {
    return (
        <nav>
            <div class="navbar">
                <div class="leftalign">
                    <div class="navlogo">✿</div>
                    <div class="navlinks"><a href="/">Volunteer Management System</a></div>
                    <div class="navlinks"><a href="/events">About</a></div>
                    <div class="navlinks"><a href="/login">Events</a></div>
                    <div class="navlinks"><a href="/signup">Partnerships</a></div>
                </div>
                <div class="rightalign">
                    <div class="navlinksusername">USERNAME</div>
                    <a href="/login"><div class="navbutton">Log Out</div></a>
                </div>
            </div>
        </nav>
    );}
    else{
    return (
        <nav>
            <div class="navbar">
                <div class="leftalign">
                    <div class="navlogo">✿</div>
                    <div class="navlinks"><a href="/">Volunteer Management System</a></div>
                    <div class="navlinks"><a href="/events">About</a></div>
                    <div class="navlinks"><a href="/login">Events</a></div>
                    <div class="navlinks"><a href="/signup">Partnerships</a></div>
                </div>
                <div class="rightalign">
                    <div class="navlinksusername">Log In</div>
                    <a href="/login"><div class="navbutton">Sign Up</div></a>
                </div>
            </div>
        </nav>
    );}
        
}
export default Navbar;