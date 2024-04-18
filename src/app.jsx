import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { MainFeed } from './feed/feed';
import { Landing } from './landing/landing';
import { About } from './about/about';
import { SignIn } from './sign/sign-in';
import { useNavigate } from 'react-router-dom';

export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const navigate = useNavigate();
  
  async function log_out() {
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    // localStorage.removeItem("Password");
    try {
      let response = await fetch('/api/auth/logout', {
        method: 'DELETE',
        headers: {'content-type': 'application/json'},
      });
    } catch {
      // If there was an error then just track scores locally
      console.log('Unable to log out user');
    }
    navigate("/landing");
  }

  return (
    <div className='body bg-dark text-light'>
      <div className="flex-container">
        <header>
          <nav>
            <div className="navigation-bar">
              <div className="nav-left">
                <div>
                  <NavLink className='nav-link' to=''>
                    Rizzedup
                  </NavLink>
                </div>
                <div>
                  <NavLink className="nav-link" to="about">
                    About Us
                  </NavLink>
                </div>
              </div>
              <div className="nav-center">
                <div>
                  <NavLink className="nav-link" to="login">
                    Login
                  </NavLink>
                </div>
                <div>
                  <NavLink className="nav-link" to="sign-in">
                    Sign-in
                  </NavLink>
                </div>
              </div>
              <div className="nav-right">
                <div>
                  <NavLink className="nav-link" to="feed">
                    Feed
                  </NavLink>
                </div>
                <div>
                  {userName ? userName : 'profile'}
                </div>
                {userName ? (
                  <div>
                    <button id="log_out-button" onClick={log_out}>Log out</button>
                  </div>
                ) : null}
              </div>
            </div>
          </nav>
        </header>

        <Routes>
          <Route path='/' element={<Landing />} exact />
          <Route path='/login' element={<Login setUserName={setUserName}/>} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/feed' element={<MainFeed />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        
        <footer>
          <table>
            <tbody>
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
            </tbody>
          </table>
        </footer>
      </div>
    </div>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}




{/* <header>
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
</header> */}
