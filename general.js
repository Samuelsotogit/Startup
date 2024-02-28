function check_login () {
    if (localStorage.getItem("userName")) {
    document.getElementById("username-link").textContent = localStorage.getItem("userName");
    create_dropdown_menu();
    }
}

function create_dropdown_menu() {
    // const dropdown = document.createElement("span");
    // dropdown.textContent="menu";
    // dropdown.className="material-symbols-outlined dropdown"
    // dropdown.id = "dropdown-menu";
    // parentDiv.appendChild(dropdown);

    const parentDiv = document.getElementsByClassName("nav-right")[0];
    const div = document.createElement("div");
    div.className = "dropdown";
    div.innerHTML = `<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    <span class="material-symbols-outlined">
        menu
        </span>
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Notifications</a></li>
    <li><button id="log_out-button" onclick="log_out()"> Log out</button></li>
  </ul>`
  parentDiv.appendChild(div);
}

check_login()



