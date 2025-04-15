const loginClick = () => {
  window.location.href = "./../files/login.html";
};

const regClick = () => {
  window.location.href = "./../files/registration.html";
};

document.getElementById("login-press")?.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "./../files/home.html";
});

const handleLogout = () => {
  window.location.href = "./../files/login.html";
};
