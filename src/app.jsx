import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
//   <div className='body bg-dark text-light'>App will display here</div>
// This div used to include main inside of it. Check for errors in display.
  <div className="flex-container"> 
    <header>
      <nav>
        <div className="navigation-bar">
          <div className="nav-left">
              <span id="home-icon" className="material-symbols-outlined">
              home
              </span>
            <div><a href="index.html">RizzedUp</a></div>
            <div><a href="about-us.html">About Us</a></div>
          </div>
          <div className="nav-center">
            <div><a href="login.html">Login</a></div>
            <div><a href="sign-in.html">Sign in</a></div>
      </div>
        <div className="nav-right">
          <div><a href="main-feed.html">Feed</a></div>
          <div id="profile-link"><a id="username-link">Username</a></div>
          <span id="profile-icon" className="material-symbols-outlined">
            account_circle
            </span>
        </div>
      </div>
      </nav>
    </header>

<main>App components go here</main>

<footer>
<hr />
<table>
  <tr>
      <td>
          Creator: Samuel Soto
      </td>
  </tr>
  <tr>
    <td>
    <a href="https://github.com/Samuelsotogit/Startup.git">Github</a>
  </td>
</tr>
</table>
</footer>
</div>
);
}