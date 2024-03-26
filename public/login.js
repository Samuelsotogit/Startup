// figure out a way to not be able to login unless user has an email.

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
    window.location.href="main-feed.html";}
}


