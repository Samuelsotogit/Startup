function check_login () {
    if (localStorage.getItem("userName")) {
    document.getElementById("username-link").textContent = localStorage.getItem("userName");
    create_dropdown_menu();
    }
}

function check_created_account () {
  if (localStorage.getItem("email")) {
    document.getElementById("username-link").textContent = localStorage.getItem("username");
    create_dropdown_menu();
    }
}

function create_dropdown_menu() {
    const parentDiv = document.getElementsByClassName("nav-right")[0];
    const div = document.createElement("div");
    div.className = "dropdown";
    div.innerHTML = `<button id="triple-bar-container" class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    <span id="triple-bar" class="material-symbols-outlined">
        menu
        </span>
  </button>
  <ul id="menu-symbol" class="dropdown-menu" style="">
    <div class="center-x-y">
      <li><a class="dropdown-item" href="#">Notifications</a></li>
      <li><button id="log_out-button" onclick="log_out()"> Log out</button></li>
    </div>
  </ul>`
  parentDiv.appendChild(div);
}

function generate_joke() {
  fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit')
    .then(response => response.json())
    .then(data => {
      // Once the data is fetched, update the text content of the element with class 'landing-page-joke'
      const landingPageJokeElement = document.querySelector('.landing-page-joke');
      const jokeText = (data.type === 'single') ? data.joke : `${data.setup} ${data.delivery}`;
      landingPageJokeElement.textContent = jokeText;
      console.log(data)
    })
    .catch(error => {
      console.error('Error fetching joke:', error);
    });
}

generate_joke()
check_login()
check_created_account()

function goBack() {
  window.history.back();
  const back_button = document.getElementById("back-button");
  back_button.addEventListener("click", goBack()); 
}

function log_out () {
  localStorage.removeItem("userName");
  localStorage.removeItem("email");
  localStorage.removeItem("Password");
  window.location.href="index.html";
}


