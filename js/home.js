var logoutBtn = document.querySelector("#logoutBtn");
var logoutWarningContainer = document.querySelector(".logout-warning-container");
var closeBtn = document.querySelector("#closeBtn");
var cancelLogoutBtn = document.querySelector("#cancelLogout");
var confirmLogoutBtn = document.querySelector("#confirmLogout");

var currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser) {
    document.querySelector("#username").innerHTML = `Welcome ${currentUser.name}`
} else {
    window.location.href = "index.html";
}

logoutBtn.addEventListener("click", function (e) {
    e.preventDefault();
    logoutWarningContainer.classList.remove("d-none");
});

closeBtn.addEventListener("click", function () {
    logoutWarningContainer.classList.add("d-none");
});

cancelLogoutBtn.addEventListener("click", function () {
    logoutWarningContainer.classList.add("d-none");
});

confirmLogoutBtn.addEventListener("click", function () {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
});

