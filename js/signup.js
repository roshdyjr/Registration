var signupNameInput = document.querySelector("#signupName");
var signupEmailInput = document.querySelector("#signupEmail");
var signupPasswordInput = document.querySelector("#signupPassword");
var signupMsg = document.querySelector("#signupMsg");
var signupBtn = document.querySelector("#signupBtn");
var loadingIndicator = document.querySelector("#loadingIndicator");

signupBtn.addEventListener("click", function (e) {
  var name = signupNameInput.value.trim();
  var email = signupEmailInput.value.trim();
  var password = signupPasswordInput.value;

  if (
    validateInputs(name, email, password) &&
    validateEmail(email) &&
    validatePassword(password) &&
    !checkExistingUser(email)
  ) {
    registerUser(name, email, password);
  }
});

function signupErrorMsg() {
  signupMsg.classList.remove("text-success");
  signupMsg.classList.add("text-danger");
}

function signUpSuccessMsg() {
  signupMsg.classList.remove("text-danger");
  signupMsg.classList.add("text-success");
}

function clearForm() {
  signupNameInput.value = "";
  signupEmailInput.value = "";
  signupPasswordInput.value = "";
}

function validateInputs(name, email, password) {
  if (!name || !email || !password) {
    signupMsg.innerHTML = "All inputs are required";
    signupErrorMsg();
    return false;
  }
  return true;
}

function validateEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    signupMsg.innerHTML = "Please enter a valid email address";
    signupErrorMsg();
    return false;
  }
  return true;
}

function validatePassword(password) {
  var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  if (!passwordRegex.test(password)) {
    signupMsg.innerHTML =
      "Password must contain at least 8 characters, including uppercase, lowercase, and numbers";
    signupErrorMsg();
    return false;
  }
  return true;
}

function checkExistingUser(email) {
  var users = JSON.parse(localStorage.getItem("users")) || [];
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      signupMsg.innerHTML = "This email is already registered";
      signupErrorMsg();
      return true;
    }
  }
  return false;
}

function registerUser(name, email, password) {
  var newUser = {
    name: name,
    email: email,
    password: password,
  };
  var users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  clearForm();

  signUpSuccessMsg();
  signupMsg.innerHTML = "User registered successfully";
  loadingIndicator.classList.remove("d-none");

  setTimeout(function() {
    loadingIndicator.classList.add("d-none");
    window.location.href = "index.html";
  }, 2000);
}
