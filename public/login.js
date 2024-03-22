async function login() {
    const nameEl = document.querySelector("#username");
    const passwordEl = document.querySelector("#password");

    if (nameEl.value.trim() === "" || passwordEl.value.trim() === "") {
        alert("Please enter both username and password.");
        return;
    }
    localStorage.setItem('userName', nameEl.value);
    // localStorage.setItem('Password', passwordEl.value);
      try {
        let user = {
            username: nameEl.value,
            password: passwordEl.value
        }
        let response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify(user),
        });
        user = await response.json();
        window.location.href="main-feed.html";

      } catch {
        // If there was an error then just track scores locally
        console.log('Unable to find user');
      }
}