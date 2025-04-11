const loginClick = () => {
  window.location.href = "./../login.html";
};

const regClick = () => {
  window.location.href = "./../registration.html";
};

document.getElementById("login-press").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "./../index.html";
});
