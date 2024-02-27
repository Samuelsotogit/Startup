function check_login () {
    if (localStorage.getItem("userName")) {
    document.getElementById("username-link").textContent = localStorage.getItem("userName");
    }
}

check_login()

// function log_out () {

// }