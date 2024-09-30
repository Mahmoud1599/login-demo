document.addEventListener("DOMContentLoaded", () => {
  var userMail = document.getElementById("myEmail");
  var userPassword = document.getElementById("myPassword");
  var userName = document.getElementById("username");
  var newUserMail = document.getElementById("regestEmail");
  var newUserPassword = document.getElementById("regestPassword");
  var signUp = document.getElementById("signUp");
  var signOut = document.getElementById("signout");
  var login = document.getElementById("login");

  var users = [];
  function showWarn(input) {
    input.classList.replace("d-none", "d-block");
  }
  function isExist(user) {
    var storageUsers = JSON.parse(localStorage.getItem("admin"));
    for (let i = 0; i < storageUsers.length; i++) {
      if (user.mail == storageUsers[i].mail) {
        return true;
      }
    }
    return false;
  }
  function isMailValid(user) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(user.mail);
  }

  function setUser() {
    var newUser = {
      name: userName.value,
      mail: newUserMail.value,
      pass: newUserPassword.value,
    };
    if (isExist(newUser)) {
      showWarn(existMail);
      return;
    }
    var local = JSON.parse(localStorage.getItem("admin")) || [];
    users = [...local, newUser];

    localStorage.setItem("admin", JSON.stringify(users));
    window.open("index.html", "target");
  }

  function checkUser() {
    var storageUsers = JSON.parse(localStorage.getItem("admin"));

    for (let user of storageUsers) {
      if (user.mail == userMail.value && user.pass == userPassword.value) {
        localStorage.setItem("currentuser", JSON.stringify(user));
        return true;
      }
    }
    return false;
  }

  function restart() {
    window.open("index.html", "target");
  }

  // ^ sign in page
  if (login) {
    let warnParagraph = userMail.nextElementSibling;
    login.addEventListener("click", () => {
      if (checkUser()) {
        window.open("welcome.html", "target");
      } else {
        showWarn(warnParagraph);
      }
    });
  }

  // ^ sign up page
  if (signUp) {
    var existMail = newUserMail.nextElementSibling;
    signUp.addEventListener("click", setUser);
  }

  //^ welocome page
  if (signOut) {
    let currentUser = JSON.parse(localStorage.getItem("currentuser"));
    console.log(currentUser);

    var welcomeMessage = signOut.nextElementSibling;
    console.log(welcomeMessage);

    welcomeMessage.innerHTML = ` Welcome ${currentUser.name}`;
    signOut.addEventListener("click", restart);
  }
});
