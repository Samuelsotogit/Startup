async function sign_in() {
  const nameEl = document.querySelector("#username");
  const emailEl = document.querySelector("#email");
  const passwordEl = document.querySelector("#password");

  if (emailEl.value.trim() === "" || passwordEl.value.trim() === "" || nameEl.value.trim() === "") {
      alert("Please enter both username and password.");
      return;
  }

  localStorage.setItem('username', nameEl.value);
  localStorage.setItem('email', emailEl.value);
  let user = {
    username: nameEl.value,
    email: emailEl.value,
    password: passwordEl.value
  }
  let response = await fetch('/api/auth/create', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(user),
  });
  if (response.ok) {
    localStorage.setItem('userName', user.username);
    window.location.href="main-feed.html";}
}