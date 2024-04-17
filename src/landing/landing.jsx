import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Landing() {
  const navigate = useNavigate();
  return (
    <main className='container-fluid bg-secondary text-center'>
      <div className="image-container">
        <img src="dog-pic.jpg" alt="Dog"/>
        <h1 className="landing-h1">RizzedUp</h1>
      </div>
      <hr/>
      <div className="joke-div">
      <p className="landing-page-joke">"I don't like shopping centers. Once you've seen one, you've seen the mall."</p>
      </div>
      <div className="landing-page-buttons">
        <button type="landing-page-login" className="btn btn-primary btn-sm" onClick={ () => navigate("/login") }>login</button>
        <button type="landing-page-sign-in" className="btn btn-secondary btn-sm" onClick={ () => navigate("/sign-in") }>sign-in</button>
      </div>
    </main>
  );
}