import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();
  function goBack() {
    window.history.back();
  }
  async function login() {
    const nameEl = document.querySelector("#username");
    const passwordEl = document.querySelector("#password");

    if (nameEl.value.trim() === "" || passwordEl.value.trim() === "") {
        alert("Please enter both username and password.");
        return;
    }
    localStorage.setItem('userName', nameEl.value);
    // localStorage.setItem('Password', passwordEl.value);
    let user = {
      username: nameEl.value,
      password: passwordEl.value
    }
    // error happening here.
    let response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(user),
    });
    if (response.ok) {
      localStorage.setItem('userName', user.username);
      // window.location.href="main-feed.html";
      navigate("/feed")
    }
    // configureWebSocket()
  }

  return (
    <main className='container-fluid bg-secondary text-center'>
      <div id="loginPage" className="login-main">
        <div className="rizzedup-header"><h2>RizzedUp</h2></div>
        <button className="back-button" onClick={goBack}>Previous</button>
        <div className="login-form">
          <div className="flex-item">
            <span id="login-icon" className="material-symbols-outlined">
              person
            </span>
          </div>
          <form className="flex-item" action="login.html" method="post">
            <label htmlFor="username"></label>
            <input type="text" id="username" name="username" placeholder="Enter a username" required />
            <br />
            <label htmlFor="password"></label>
            <input type="password" id="password" name="password" placeholder="Enter a password" required />
            <br />
          </form>
          <div className="flex-item">
            <div className="login-button">
              <button type="login" className="btn btn-primary btn-sm" onClick={login}>login</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
