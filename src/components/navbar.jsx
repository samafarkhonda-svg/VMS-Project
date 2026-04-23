function Navbar() {
    const loggedIn = false;
    if (loggedIn) {
    return (
        <nav>
            <div class="navbar">
                <div class="leftalign">
                    <div class="navlogo">✿</div>
                    <div class="navlinks"><a href="/">Volunteer Management System</a></div>
                    <div class="navlinks"><a href="./../pages/about">About</a></div>
                    <div class="navlinks"><a href="./../pages/events">Events</a></div>
                    <div class="navlinks"><a href="./../pages/partnerships">Partnerships</a></div>
                </div>
                <div class="rightalign">
                    <div class="navlinksusername"><a href="./../pages/account-management">USERNAME</a></div>
                    <a href="./../pages/logout"><div class="navbutton">Log Out</div></a>
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
                    <div class="navlinksusername"><a href="./../pages/login">Log In</a></div>
                    <a href="./../pages/signup"><div class="navbutton">Sign Up</div></a>
                </div>
            </div>
        </nav>
    );}
        
}
export default Navbar;