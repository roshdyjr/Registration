var signinEmailInput = document.querySelector("#signinEmail");
var signinPasswordInput = document.querySelector("#signinPassword");
var signinMsg = document.querySelector("#signinMsg");
var loginBtn = document.querySelector("#loginBtn");

loginBtn.addEventListener("click", function (e) {
  var email = signinEmailInput.value.trim();
  var password = signinPasswordInput.value;

  if (validateInputs(email, password)) {
    loginUser(email, password);
  }
});

function validateInputs(email, password) {
  if (!email || !password) {
    signinMsg.innerHTML = "Please enter both Email and Password";
    signinErrorMsg();
    return false;
  }
  return true;
}

function loginUser(email, password) {
  var users = JSON.parse(localStorage.getItem("users")) || [];
  var userCredentials;
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      if (users[i].password === password) {
        userCredentials = users[i];
        break;
      }
    }
  }

  if (userCredentials) {
    localStorage.setItem("currentUser", JSON.stringify(userCredentials));
    clearForm();
    signinMsg.innerHTML = "Success! You will be redirected shortly";
    signinSuccessMsg();
    loadingIndicator.classList.remove("d-none");
    setTimeout(function () {
      loadingIndicator.classList.add("d-none");
      window.location.href = "home.html";
    }, 2000);
  } else {
    signinMsg.innerHTML = "Invalid Email or Password";
  }
}

function clearForm() {
  signinEmailInput.value = "";
  signinPasswordInput.value = "";
}

function signinErrorMsg() {
  signinMsg.classList.remove("text-success");
  signinMsg.classList.add("text-danger");
}

function signinSuccessMsg() {
  signinMsg.classList.remove("text-danger");
  signinMsg.classList.add("text-success");
}

