async function login() {
    const nameEl = document.querySelector("#username");
    const passwordEl = document.querySelector("#password");

    if (nameEl.value.trim() === "" || passwordEl.value.trim() === "") {
        alert("Please enter both username and password.");
        return;
    }
    localStorage.setItem('userName', nameEl.value);
    // localStorage.setItem('Password', passwordEl.value);
      window.location.href="main-feed.html";
}