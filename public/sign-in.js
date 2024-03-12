function sign_in() {
    const nameEl = document.querySelector("#username");
    const emailEl = document.querySelector("#email");
    const passwordEl = document.querySelector("#password");

    if (emailEl.value.trim() === "" || passwordEl.value.trim() === "" || nameEl.value.trim() === "") {
        alert("Please enter both username and password.");
        return;
    }

    localStorage.setItem('username', nameEl.value);
    localStorage.setItem('email', emailEl.value);
    localStorage.setItem('Password', passwordEl.value);
    window.location.href="main-feed.html";
}