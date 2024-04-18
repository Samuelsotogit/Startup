import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Landing() {
  const navigate = useNavigate();
  const [jokeText, setJoke] = React.useState('');
  // const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  // const [authState, setAuthState] = React.useState(currentAuthState);
  React.useEffect(() => {
    generate_joke()
    // check_created_account()
  }, []);

  function generate_joke() {
    fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit')
      .then(response => response.json())
      .then(data => {
        // Once the data is fetched, update the text content of the element with class 'landing-page-joke'
        const jokeText = (data.type === 'single') ? data.joke : `${data.setup} ${data.delivery}`;
        setJoke(jokeText);
      })
      .catch(error => {
        console.error('Error fetching joke:', error);
      });
  }
  return (
    <main className='container-fluid bg-secondary text-center'>
      <div className="image-container">
        <img src="dog-pic.jpg" alt="Dog"/>
        <h1 className="landing-h1">RizzedUp</h1>
      </div>
      <hr/>
      <div className="joke-div">
      <p className="landing-page-joke">{jokeText}</p>
      </div>
      <div className="landing-page-buttons">
        <button type="landing-page-login" className="btn btn-primary btn-sm" onClick={ () => navigate("/login") }>login</button>
        <button type="landing-page-sign-in" className="btn btn-secondary btn-sm" onClick={ () => navigate("/sign-in") }>sign-in</button>
      </div>
    </main>
  );
}